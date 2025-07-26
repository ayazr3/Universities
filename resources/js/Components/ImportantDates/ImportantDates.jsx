import React from "react";
import "./ImportantDates.css";

const dates = [
  {
    title: "بداية التقديم",
    date: "١٥ يوليو ٢٠٢٤",
    time: "٩:٠٠ صباحاً",
    desc: "فتح باب التقديم لجميع التخصصات",
    status: "done",
  },
  {
    title: "آخر موعد للتقديم",
    date: "٣٠ أغسطس ٢٠٢٤",
    time: "١١:٥٩ مساءً",
    desc: "الموعد النهائي لتقديم البيانات",
    status: "pending",
  },
  {
    title: "إعلان النتائج الأولية",
    date: "١٥ سبتمبر ٢٠٢٤",
    time: "١٠:٠٠ صباحاً",
    desc: "نتائج المفاضلة الأولية",
    status: "pending",
  },
  {
    title: "فترة الاعتراضات",
    date: "١٦ - ٢٠ سبتمبر ٢٠٢٤",
    time: "طوال اليوم",
    desc: "تقديم الاعتراضات على النتائج",
    status: "pending",
  },
  {
    title: "النتائج النهائية",
    date: "٢٥ سبتمبر ٢٠٢٤",
    time: "١٠:٠٠ صباحاً",
    desc: "إعلان نتائج المفاضلة النهائية",
    status: "pending",
  },
  {
    title: "بداية التسجيل",
    date: "١ أكتوبر ٢٠٢٤",
    time: "٩:٠٠ صباحاً",
    desc: "بدء تسجيل الطلاب المقبولين",
    status: "pending",
  },
];

export default function ImportantDates() {
  return (
    <div className="important-dates-container">
      <h1 className="main-title">المواعيد المهمة</h1>
      <p className="subtitlee">
        تابع جميع المواعيد المهمة للمفاضلة الجامعية ولا تفوت أي موعد نهائي
      </p>
      <div className="dates-list">
        {dates.map((item, idx) => (
          <div
            key={idx}
            className={`date-card ${item.status} animate-fade-in`}
            style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
          >
            <div className="date-header">
              <span className="date-title">{item.title}</span>
              <span
                className={`status-icon ${
                  item.status === "done" ? "done" : "pending"
                }`}
              >
                {item.status === "done" ? "✔" : "⏲"}
              </span>
            </div>
            <div className="date-info">
              <span className="date-date">{item.date}</span>
              <span className="date-time">{item.time}</span>
            </div>
            <div className="date-desc">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="footer-alert animate-pop">
        ينتهي التقديم خلال ١٠ يوماً - لا تتأخر!
      </div>
    </div>
  );
}
