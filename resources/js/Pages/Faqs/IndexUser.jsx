import "./FAQ.css";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

const Faq = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <Navbar/>
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">الأسئلة الشائعة</h1>
      </div>

      <div className="faq-content">
        {faqs.map((item, index) => (
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
    <Footer/>
    </>
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
    <div className={`faq-item ${isActive ? "active" : ""}`}>
      <button className="faq-question" onClick={onClick}>
        <span className="question-number">{index}</span>
        <span className="question-text">{question}</span>
        <span className={`faq-icon ${isActive ? "rotate" : ""}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 9l-7 7-7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="faq-answer-wrapper" style={{ height: `${height}px` }}>
        <div ref={contentRef} className="faq-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
