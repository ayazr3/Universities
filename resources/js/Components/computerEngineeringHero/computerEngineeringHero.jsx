import React from "react";
import "./computerEngineeringHero.css";
import { Link, useNavigate } from "react-router";

const ComputerEngineeringHero = ({ title = "تقنيات الحاسوب" }) => {
  const navigate = useNavigate();

  const handleProjectSelect = (e) => {
    if (e.target.value !== "") {
      navigate("/Projects");
    }
  };

  return (
    <section className="ce-hero">
      <header className="ce-navbar">
        <nav className="ce-navlinks">
          <Link to={"/TheFirsts"} className="ce-link">
            اوائل الكلية
          </Link>
          <select className="ce-projects-list" onChange={handleProjectSelect} defaultValue="">
            <option value="" disabled>
              مشاريع التخرج
            </option>
            <option value="project1">2023-2024</option>
            <option value="project2">2024-2025</option>
            <option value="project3">2025-2026</option>
          </select>
        </nav>
      </header>
      <div className="ce-content">
        <div className="ce-title-row">
          <span className="ce-icon ce-icon-left">{"<>"}</span>
          <h1 className="ce-titlee">{title}</h1>
          <span className="ce-icon ce-icon-right">🧠</span>
        </div>
        <div className="ce-subtitle">Computer Engineering</div>
        <div className="ce-tags">
          <span className="ce-tag ce-tag-lightning">العلوم التطبيقة ⚡</span>
          <span className="ce-tag">بكالوريوس</span>
          <span className="ce-tag">٤ سنوات</span>
        </div>
        <div className="ce-scroll-indicator">
          <span className="ce-scroll-dot"></span>
        </div>
      </div>
    </section>
  );
};

export default ComputerEngineeringHero;
