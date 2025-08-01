import React, { useState, useEffect } from "react";
import "./StudyPlan.css";

const StudyPlan = ({ coursesByYear = [], specialization }) => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [yearsData, setYearsData] = useState([]);

  useEffect(() => {
    if (coursesByYear && coursesByYear.length > 0) {
      setYearsData(coursesByYear);
    }
  }, [coursesByYear]);

  const handleDownload = (fileUrl, courseName) => {
    if (fileUrl) {
      // إنشاء رابط للتحميل
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = courseName || 'course-material';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('لا يوجد ملف متاح للتحميل');
    }
  };

  if (!yearsData || yearsData.length === 0) {
    return (
      <div className="study-plan-container">
        <h1 className="study-plan-title">الخطة الدراسية</h1>
        <p>لا توجد مقررات متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="study-plan-bg">
      <div className="study-plan-container">
        <h1 className="study-plan-title">
          الخطة الدراسية - {specialization?.name}
        </h1>
        <p className="study-plan-subtitle">
          استكشف المقررات الدراسية عبر السنوات الأربع
        </p>
        
        <div className="study-plan-tabs">
          {yearsData.map((year, idx) => (
            <button
              key={idx}
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
              <span className="year-title">
                {yearsData[selectedYear]?.label}
              </span>
              <span className="year-semester">الفصل الأول والثاني</span>
            </div>
            
            <div className="cards-list">
              {yearsData[selectedYear]?.cards?.map((card, i) => (
                <div
                  className="study-card slide-up"
                  key={card.id}
                  style={{ animationDelay: `${i * 0.15 + 0.15}s` }}
                >
                  <div className="card-content">
                    <div className="card-title">{card.title}</div>
                    <div className="card-desc">{card.desc}</div>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(card.file_url, card.title)}
                      title="تحميل مواد المقرر"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128"
                        height="128"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" fill="#333333" />
                        <path d="M7 11l5 5l5 -5" fill="#333333" />
                        <path d="M12 4l0 12" fill="#333333" />
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
