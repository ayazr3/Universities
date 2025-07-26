import React from 'react';
import './TechTips.css';

const TechTips = ({ advices = [] }) => {
  return (
    <div className="tech-tips-container">
      <h1 className="main-title">النصائح التقنية</h1>
      <p className="subtitleeeee">
        نصائح قيمة ومفيدة لتطوير مهاراتك التقنية وتحسين أدائك في البرمجة والتصميم
      </p>

      {advices.map((tip) => (
        <div className="tip-box" key={tip.id}>
          <div className="tip-header">
            
          </div>
          <h2 className="tip-headline">{tip.title}</h2>
          <hr className="divider" />
          <p className="tip-description">{tip.description || tip.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default TechTips;
