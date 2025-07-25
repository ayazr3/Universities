import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "ما هي الوثائق المطلوبة للتقديم؟",
      answer: "يمكنك اختيار حي أو تخصصات مختلفة ويتم ترتيبها حسب الأولوية. سيتم توزيعك على التخصص الأول المتاح حسب معدلك والمقاعد المتوفرة. نتيح بالتنوع في الاختيارات لزيادة فرص القبول."
    },
    {
      id: 2,
      question: "كم عدد التخصصات التي يمكنني اختيارها؟",
      answer: "يمكنك اختيار عدة تخصصات حسب الأولوية المطلوبة في النظام."
    },
    {
      id: 3,
      question: "كيف يتم احتساب المعدل المكافئ؟",
      answer: "يتم حساب المعدل المكافئ وفقاً للمعايير المحددة من قبل الجامعة."
    },
    {
      id: 4,
      question: "هل يمكنني تعديل طلبي بعد الإرسال؟",
      answer: "نعم، يمكن تعديل الطلب خلال الفترة المحددة للتقديم."
    },
    {
      id: 5,
      question: "ما هي رسوم التقديم وكيف أدفعها؟",
      answer: "تختلف رسوم التقديم حسب التخصص المطلوب."
    },
    {
      id: 6,
      question: "هل يوجد مقاعد مخصصة لذوي الإعاقة؟",
      answer: "نعم، توجد مقاعد مخصصة لذوي الإعاقة وفقاً للقوانين المعمول بها."
    },
    {
      id: 7,
      question: "ماذا لو لم أحصل على قبول في أي تخصص؟",
      answer: "في حالة عدم الحصول على قبول، يمكنك التقديم في الدورات اللاحقة."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">مراكز التسجيل على المفاضلة </h1>
        {/* <p className="faq-subtitle">إجابات شاملة عن أكثر الأسئلة تكراراً حول المفاضلة والتقديم</p> */}
      </div>
      
      <div className="faq-content">
        {faqData.map((item, index) => (
          <FAQItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isActive={activeIndex === index}
            onClick={() => toggleFAQ(index)}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, isActive, onClick, index }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <button className="faq-question" onClick={onClick}>
        <span className="question-number">{index}</span>
        <span className="question-text">{question}</span>
        <span className={`faq-icon ${isActive ? 'rotate' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      
      <div 
        className="faq-answer-wrapper"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="faq-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
