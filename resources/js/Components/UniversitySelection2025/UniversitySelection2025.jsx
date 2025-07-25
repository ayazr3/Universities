import React from "react";
import "./UniversitySelection2025.css";

const UniversitySelection2025 = () => {
  return (
    <div className="us2025-main-bg">
      <div className="us2025-content-wrapper">
        <div className="us2025-welcome-card us2025-fade-in">
          <div className="us2025-icon-user"></div>
          <h2>مرحباً بكم</h2>
          <p>في مستقبلكم الأكاديمي</p>
          <div className="us2025-download-btn">
            <span className="us2025-icon-download"></span>
          </div>
        </div>
        <div className="us2025-info-section us2025-slide-in">
          <h1>
            مفاضلة الجامعة <span>2024-2025</span>
          </h1>
          <p>
            ابدأ رحلتك الأكاديمية معنا. تعرف على جميع التفاصيل حول مواعيد التقديم، الخطوات المطلوبة، ومراكز التسجيل المتاحة.
          </p>
          <button className="us2025-primary-btn">تحميل ملف المفاضلة</button>
          <div className="us2025-stats">
            <div>
              <span>+50</span>
              <p>تخصص أكاديمي</p>
            </div>
            <div>
              <span>15</span>
              <p>مركز تقديم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySelection2025;
