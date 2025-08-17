import React, { useState } from "react";
import "./StudyPlan.css";

const StudyPlan = ({ courses = [] }) => {
const [selectedYear, setSelectedYear] = useState(1);

  

  const yearsGrouped = {};

  if (courses.length > 0) {
    courses.forEach((course) => {
      if (!yearsGrouped[course.academic_year_number]) {
        yearsGrouped[course.academic_year_number] = [];
      }
      yearsGrouped[course.academic_year_number].push(course);
    });
  }

  const yearLabels = {
    1: "السنة الأولى",
    2: "السنة الثانية",
    3: "السنة الثالثة",
    4: "السنة الرابعة",
    5: "السنة الخامسة",
  };

  if (Object.keys(yearsGrouped).length === 0) {
    return (
      <div className="study-plan-bg">
        <div className="study-plan-container">
          <h1 className="study-plan-title">الخطة الدراسية</h1>
          <p className="study-plan-subtitle">لا توجد مقررات دراسية متاحة حالياً.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="study-plan-bg">
      <div className="study-plan-container">
        <h1 className="study-plan-title">الخطة الدراسية</h1>
        <p className="study-plan-subtitle">استكشف المقررات الدراسية</p>
        <div className="study-plan-tabs">
          {Object.keys(yearsGrouped).map((year) => (
            <button
              key={year}
              className={`tab-btn ${parseInt(year) === selectedYear ? "active" : ""}`}
              onClick={() => setSelectedYear(parseInt(year))}
            >
              {yearLabels[year] || `السنة ${year}`}
            </button>
          ))}
        </div>

        <div className="study-plan-cards-outer">
          <div className="study-plan-cards fade-in">
            <div className="year-info">
              <span className="year-title">{yearLabels[selectedYear]}</span>
              <span className="year-semester">الفصل الأول والثاني</span>
            </div>
            <div className="cards-list">
              {(yearsGrouped[selectedYear] && yearsGrouped[selectedYear].length > 0) ? (
                yearsGrouped[selectedYear].map((course, i) => (
                  <div
                    className="study-card slide-up"
                    key={course.id}
                    style={{ animationDelay: `${i * 0.15 + 0.15}s` }}
                  >
                    <div className="card-content">
                      <div className="card-title">{course.name}</div>
                      <div className="card-desc">{course.description}</div>
                    </div>
                    <div className="card-actions">
                      <a
                        className="download-btn"
                        href={course.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        title="تحميل ملف المادة"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                          <polyline points="7 11 12 16 17 11" />
                          <line x1="12" y1="4" x2="12" y2="16" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>لا توجد مقررات لهذه السنة.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
