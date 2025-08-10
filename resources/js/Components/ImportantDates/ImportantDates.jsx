import React from "react";
import "./ImportantDates.css";

const ImportantDates = ({ dates }) => {
  if (!dates || dates.length < 2) {
    return (
      <div className="important-dates-container">
        <h1 className="main-title">المواعيد المهمة</h1>
        <p className="subtitlee">
          تابع جميع المواعيد المهمة للمفاضلة الجامعية ولا تفوت أي موعد نهائي
        </p>
        <div className="dates-list">
          {dates.map((item, idx) => {
            const status = new Date(item.date) < new Date() ? "done" : "pending";

            return (
              <div
                key={idx}
                className={`date-card ${status} animate-fade-in`}
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <div className="date-header">
                  <span className="date-title">{item.title}</span>
                  <span className={`status-icon ${status}`}>
                    {status === "done" ? "✔" : "⏲"}
                  </span>
                </div>
                <div className="date-info">
                  <span className="date-date">{item.date}</span>
                  <span className="date-time">{item.name}</span>
                </div>
                <div className="date-desc">{item.body}</div>
              </div>
            );
          })}
        </div>
        <div className="footer-alert animate-pop">
          لا توجد مواعيد   
        </div>
      </div>
    );
  }

  // حساب الفرق بالأيام بين أول تاريخ وثاني تاريخ
  const firstDate = new Date(dates[0].date);
  const secondDate = new Date(dates[1].date);
  const diffTime = secondDate - firstDate; // بالميلي ثانية
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // تحويل للايام

  return (
    <div className="important-dates-container">
      <h1 className="main-title">المواعيد المهمة</h1>
      <p className="subtitlee">
        تابع جميع المواعيد المهمة للمفاضلة الجامعية ولا تفوت أي موعد نهائي
      </p>
      <div className="dates-list">
        {dates.map((item, idx) => {
          const status = new Date(item.date) < new Date() ? "done" : "pending";

          return (
            <div
              key={idx}
              className={`date-card ${status} animate-fade-in`}
              style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
            >
              <div className="date-header">
                <span className="date-title">{item.title}</span>
                <span className={`status-icon ${status}`}>
                  {status === "done" ? "✔" : "⏲"}
                </span>
              </div>
              <div className="date-info">
                <span className="date-date">{item.date}</span>
                <span className="date-time">{item.name}</span>
              </div>
              <div className="date-desc">{item.body}</div>
            </div>
          );
        })}
      </div>
      <div className="footer-alert animate-pop">
        ينتهي التقديم بعد {diffDays} يوماً
      </div>
    </div>
  );
};

export default ImportantDates;
