// FAQ.js
import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null); // هنا يحدد رقم المحافظة المفتوحة

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">مراكز التسجيل على المفاضلة</h1>
      </div>

      <div className="faq-content">
        {data.map((governorate, index) => (
          <div key={governorate.id} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="question-number">{index + 1}</span>
              <span className="question-text">
                {governorate.name} - عدد المراكز: {governorate.centers_count}
              </span>
              <span className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <CentersList isActive={activeIndex === index} centers={governorate.centers} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CentersList = ({ isActive, centers }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div
      className="faq-answer-wrapper"
      style={{ height: `${height}px` }}
    >
      <div ref={contentRef} className="faq-answer">
        {centers.length === 0 ? (
          <p>لا توجد مراكز في هذه المحافظة.</p>
        ) : (
          centers.map((center) => (
            <div key={center.id} style={{ marginBottom: '0.75rem' }}>
              <strong>{center.name}</strong>
              <p>{center.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQ;
