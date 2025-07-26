import React, { useState } from "react";
import "./StudyPlan.css";

const yearsData = [ /* بيانات السنوات كما في السؤال تضعها كما هي */ ];

const StudyPlan = () => {
  const [selectedYear, setSelectedYear] = useState(0);

  return (
    <div className="study-plan-bg">
      <div className="study-plan-container">
        <h1 className="study-plan-title">الخطة الدراسية</h1>
        <p className="study-plan-subtitle">استكشف المقررات الدراسية عبر السنوات الأربع</p>
        <div className="study-plan-tabs">
          {yearsData.map((year, idx) => (
            <button
              key={year.label}
              className={`tab-btn ${selectedYear === idx ? "active" : ""}`}
              onClick={() => setSelectedYear(idx)}
            >
              {year.label}
            </button>
          ))}
        </div>
        <div className="study-plan-cards-outer">
          <div className="study-plan-cards fade-in">
            <div className="year-info">
              <span className="year-title">{yearsData[selectedYear].label}</span>
              <span className="year-semester">الفصل الأول والثاني</span>
            </div>
            <div className="cards-list">
              {yearsData[selectedYear].cards.map((card, i) => (
                <div
                  className="study-card slide-up"
                  key={i}
                  style={{ animationDelay: `${i * 0.15 + 0.15}s` }}
                >
                  <div className="card-content">
                    <div className="card-title">{card.title}</div>
                    <div className="card-desc">{card.desc}</div>
                  </div>
                  <div className="card-actions">
                    <button className="download-btn" title="تحميل">
                      {/* أيقونة التحميل */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
                        <path d="M7 11l5 5l5 -5"/>
                        <path d="M12 4l0 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
