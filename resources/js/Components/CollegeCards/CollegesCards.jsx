import { router } from '@inertiajs/react';

import React from 'react';
import './CollegeCards.css';

const CollegeCards = ({ colleges }) => {
  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="college-cards-container">
      {colleges.map((college) => (
        <div key={college.id} className="college-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${college.image})` }}
          ></div>
          <div className="card-content">
            <h3 className="college-name">{college.name}</h3>
            <p className="college-description">{college.summary}</p>
            <div className="college-info">
              <div className="info-item">
                <span className="info-icon">📅</span>
                <span className="info-text">{college.establishment_year}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">👥</span>
                <span className="info-text">{college.student_count} طالب</span>
              </div>
            </div>
           <button
            className="details-button"
            onClick={() => {
              router.visit(`/universities/${college.id}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            عرض التفاصيل ←
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollegeCards;