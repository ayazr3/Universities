import React, { useState } from "react";
import "./ComputerEngineering.css";

const ComputerEngineering = ({ specialization }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="ce-container">
      <div className="ce-bg-overlay"></div>
      <div className="ce-content">
        <h1 className="ce-titles">ما هو تخصص {specialization.name}؟</h1>
        <div className="ce-desc-wrapper">
          <p className="ce-desc">{specialization.summary}</p>
          {isExpanded && (
            <p className="ce-desc ce-desc-expanded">{specialization.details}</p>
          )}
        </div>
        <button
          className="ce-expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "إخفاء التفاصيل" : "إظهار التفاصيل"}
        </button>
      </div>
    </section>
  );
};

export default ComputerEngineering;
