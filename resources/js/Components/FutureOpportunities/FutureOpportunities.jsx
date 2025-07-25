import React from "react";
import "./FutureOpportunities.css";

const FutureOpportunities = () => {
  return (
    <section className="future-opportunities-container">
      <div className="future-opportunities-content">
        <h1 className="main-titlew">الفرص المستقبلية</h1>
        <p className="subtitlew">اكتشف الطرق المهنية المتاحة لخريجي تقنيات الحاسوب.</p>
      </div>
      <div className="job-opportunities-link">
        <span className="icon-briefcase" />
        <span>الفرص الوظيفية</span>
      </div>
    </section>
  );
};

export default FutureOpportunities;
