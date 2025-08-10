import React from "react";
import "./FutureOpportunities.css";

const FutureOpportunities = ({ specialization }) => {
  return (
    <section className="future-opportunities-container">
      <div className="future-opportunities-content">
        <h1 className="main-titlew">
          الفرص المستقبلية في {specialization.name_graduate_future}
        </h1>
        <p className="subtitlew">
          {specialization.graduate_future}
        </p>
      </div>
      <div className="job-opportunities-link">
        <span className="icon-briefcase" />
        <span>الفرص الوظيفية</span>
      </div>
    </section>
  );
};

export default FutureOpportunities;
