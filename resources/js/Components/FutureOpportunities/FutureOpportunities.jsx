import React from "react";
import "./FutureOpportunities.css";

const FutureOpportunities = ({ specialization }) => {
  if (!specialization) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <section className="future-opportunities-container">
      <div className="future-opportunities-content">
        <h1 className="main-titlew">
          الفرص المستقبلية - {specialization.name_graduate_future || 'خريجي التخصص'}
        </h1>
        <p className="subtitlew">
          اكتشف الطرق المهنية المتاحة لخريجي {specialization.name}.
        </p>
        
        <div className="graduate-future-content">
          <div className="future-description">
            <h3>المجالات المهنية المتاحة:</h3>
            <div className="future-text">
              {specialization.graduate_future}
            </div>
          </div>
        </div>
      </div>
      
      <div className="job-opportunities-link">
        <span className="icon-briefcase" />
        <span>الفرص الوظيفية لخريجي {specialization.name}</span>
      </div>
    </section>
  );
};

export default FutureOpportunities;
