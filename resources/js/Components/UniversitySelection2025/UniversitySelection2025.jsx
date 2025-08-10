import React from "react";
import "./UniversitySelection2025.css";

const UniversitySelection2025 = ({
  admissionFile,
  year,
  totalSpecializationsCount,
  universityCentersCount,
}) => {
  return (
    <div className="us2025-main-bg">
      <div className="us2025-content-wrapper">
        <div className="us2025-welcome-card us2025-fade-in">
          <div className="us2025-icon-user"></div>
          <h2>مرحباً بكم</h2>
          <p>في مستقبلكم الأكاديمي</p>
          <div className="us2025-download-btn">
            {admissionFile ? (
              <a
                href={admissionFile}
                target="_blank"
                rel="noopener noreferrer"
                className="us2025-icon-download"
                title="تحميل ملف المفاضلة"
              />
            ) : (
              // عرض زر تحميل معطل أو نص فقط
              <span className="us2025-icon-download" title="لا يوجد ملف للتحميل حالياً" style={{opacity: 0.5, cursor: "default"}} />
            )}
          </div>
        </div>

        <div className="us2025-info-section us2025-slide-in">
          <h1 className="direction">
            مفاضلة الجامعة <br /><span>{year}-{Number(year) + 1}</span>

          </h1>
          <p>
            ابدأ رحلتك الأكاديمية معنا. تعرف على جميع التفاصيل حول مواعيد التقديم، الخطوات المطلوبة، ومراكز التسجيل المتاحة.
          </p>

          {/* زر تحميل الملف بأكمله */}
          {admissionFile ? (
            <button
              className="us2025-primary-btn"
              onClick={() => window.open(admissionFile, "_blank")}
            >
              تحميل ملف المفاضلة
            </button>
          ) : (
            <button className="us2025-primary-btn" disabled>
              لا يوجد ملف للتحميل
            </button>
          )}

          <div className="us2025-stats">
            <div>
              <span>+{totalSpecializationsCount}</span>
              <p>تخصص أكاديمي</p>
            </div>
            <div>
              <span>{universityCentersCount}</span>
              <p>مراكز التقديم </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySelection2025;
