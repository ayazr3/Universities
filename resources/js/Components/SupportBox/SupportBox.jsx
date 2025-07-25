import React from "react";
import "./SupportBox.css";
import { Link } from "react-router";

const SupportBox = () => (
  
  <div className="support-container">
    <div className="support-card">
      <div className="support-icon">
        <div className="icon-circle">
          <span className="question-mark">؟</span>
        </div>
      </div>
      <h2 className="support-title">لم تجد إجابة سؤالك؟</h2>
      <p className="support-desc">
        فريق الدعم متاح للإجابة على جميع استفساراتكم الإضافية وتقديم المساعدة المطلوبة
      </p>
      <div className="support-actions">

       <Link to={'/chatAi'}> <button className="support-btn primary">الدردشة المباشرة</button></Link>
      </div>
      <div className="support-footer">
      </div>
    </div>
  </div>
);

export default SupportBox;
