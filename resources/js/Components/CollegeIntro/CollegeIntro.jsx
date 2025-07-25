import React from "react";
import "./CollegeIntro.css";

const CollegeIntro = ({ summary }) => (
  <section className="college-intro-container">
    <div className="college-intro-header">
      <h2 className="college-intro-title">نبذة عن الكلية </h2>
    </div>
    <p className="college-intro-desc">{summary}</p>
  </section>
);

export default CollegeIntro;
