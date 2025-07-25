import React from 'react';
import './DamascusUniversityHeader.css';

const DamascusUniversityHeader = ({ governorateName }) => {
  return (
    <div className="damascus-uni-container">
      <div className="header-section">
        <div className="main-content">
          <div className="title-section">
            <div className="graduation-icon">🎓</div>
            <h1 className="main-title">كليات جامعة {governorateName}</h1>
          </div>
          <p className="subtitleee">اكتشف مستقبلك الأكاديمي في أعرق جامعات الشرق الأوسط</p>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-icon">🏛️</div>
              <span className="stat-text">تأسست عام 1903</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <span className="stat-text">أكثر من 150,000 طالب</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <span className="stat-text">20+ كلية متخصصة</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <h2 className="choose-title">اختر كليتك المستقبلية</h2>
        <p className="choose-description">
          استكشف الكليات المتنوعة واختر التخصص الذي يناسب طموحاتك وأهدافك المهنية
        </p>
        <div className="underline"></div>
      </div>
    </div>
  );
};

export default DamascusUniversityHeader;
