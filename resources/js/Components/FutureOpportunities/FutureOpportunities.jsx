import React from "react";
import "./FutureOpportunities.css";
import "./AcademicPrograms.css";

const FutureOpportunities = ({ futureOpportunities }) => {
  return (
    <section>
    <section className="future-opportunities-container">
      <div className="future-opportunities-content">
        <h1 className="main-titlew">الفرص المستقبلية</h1>
        <p className="subtitlew">
          اكتشف الطرق المهنية المتاحة لخريجي الاختصاص  .
        </p>
      </div>
        <div className="job-opportunities-link">
        <span className="icon-briefcase" />
        <span>الفرص الوظيفية</span>
      </div>
</section>
      <div className="programs-container">
        <div className="animated-bg"></div>
        <div className="programs-grid">
          {futureOpportunities && futureOpportunities.length > 0 ? (
            futureOpportunities.map((item, idx) => (
              <div
                className="program-card"
                key={item.id}
                style={{ animationDelay: `${idx * 0.18}s` }}
              >
                <div className="icon">
                  {/* عرض صورة الأيقونة بالمساحة المخصصة */
                  /* الحفاظ على شكل وحجم الأيقونة ضمن التصميم */}
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    loading="lazy"
                  />
                </div>
                <div className="program-info">
                  <h3>{item.name}</h3><br />
                  <p>{item.details}</p>
                </div>
              </div>
            ))
          ) : (
            <p>لا توجد فرص مستقبلية متاحة حالياً.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FutureOpportunities;
