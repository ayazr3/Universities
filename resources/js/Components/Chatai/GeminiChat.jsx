import React, { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import "./GeminiChat.css";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyABjsUmcdWQemcUCSKDtKvegcpzuBCpHCU",
});

const GeminiChat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // تخزين قائمة الأسئلة والردود
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const basePrompt =
    "أنت مساعد ذكي متخصص في توجيه طلاب البكالوريا في اختيار التخصص الجامعي المناسب. مهمتك:\n\n" +
    "1. تقديم معلومات دقيقة ومفصلة عن كل كلية في كل محافظة، تشمل شرح التخصصات، مميزات وعيوب كل اختصاص، " +
    "مجالاته المستقبلية، مقررات السنة، مشاريع التخرج، وملفات الأطروحات القابلة للتحميل.\n\n" +
    "2. الإجابة عن الأسئلة الشائعة المتعلقة بالتوجيه، إجراءات التقديم، مواعيد المفاضلة، والمصادر التعليمية (كتب، مقالات، فيديوهات).\n\n" +
    "3. بناءً على بيانات الطالب التالية: العمر، الشهادة الحاصل عليها، معدله في البكالوريا، هواياته، المواد التي يتفوق بها ويحبها، ومحافظته، " +
    "قم بتحليل هذه المعلومات وتنبأ له بالتخصص الجامعي الأنسب له مع شرح موجز يوضح الأسباب.\n\n" +
    "4. إذا طلب المستخدم الانتقال إلى قسم معين في الموقع (مثل: \"أرني تخصصات كلية الطب\" أو \"انتقل إلى قسم الأسئلة الشائعة\"), " +
    "فقم بتوجيهه بشكل واضح إلى ذلك القسم.\n\n" +
    "5. اجاباتك يجب أن تكون دقيقة، محددة، وموضوعية،,ومختصرة مع تجنب المعلومات العامة أو الغامضة.\n\n" +
    "السؤال أو الطلب: {user_input}";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const currentQuestion = userInput.trim();
      const fullPrompt = basePrompt.replace("{user_input}", currentQuestion);

      const apiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });

      console.log(apiResponse);

      setChatHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: apiResponse.text || "عذراً، لم أتلقَ ردًا.",
        },
      ]);

      setUserInput(""); // تفريغ مربع الإدخال بعد الإرسال
    } catch (err) {
      console.error("حدث خطأ أثناء الاتصال بـ Gemini:", err);
      setError(`حدث خطأ: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // لتمرير المحتوى تلقائيًا إلى آخر رسالة
  const chatAreaRef = useRef(null);
  React.useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  return (
    <div className="gemini-chat-container">
      <div className="gemini-header">
        المساعد الشخصي الخاص بالموقع
      </div>

      <div className="chat-area" ref={chatAreaRef}>
        {chatHistory.length === 0 && !isLoading && !error && (
          <div className="welcome-message">
            <div className="welcome-icon">🤖</div>
            <h3>مرحبًا! كيف يمكنني مساعدتك ؟</h3>
            <p>اكتب سؤالك في المربع أدناه وسأقدم لك الإجابة المناسبة</p>
          </div>
        )}

        {chatHistory.map(({ question, answer }, index) => (
          <React.Fragment key={index}>
            <div className="response-container user">
              <div className="response-header"></div>
              <div>{question}</div>
            </div>
            <div className="response-container ai">
              <div className="response-header">جيميني:</div>
              <div className="response-content">
                {answer.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>جاري معالجة سؤالك...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>⛔ {error}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك هنا..."
            disabled={isLoading}
            rows="1"
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className={isLoading ? "disabled" : ""}
            aria-label="إرسال السؤال"
          >
            {isLoading ? (
              <span className="sending">جاري الإرسال...</span>
            ) : (
              <>
                <span>إرسال</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </>
            )}
          </button>
        </div>
        <div className="input-hint">اضغط على زر الإرسال أو Enter لإرسال السؤال</div>
      </form>
    </div>
  );
};

export default GeminiChat;
