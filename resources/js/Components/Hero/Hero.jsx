import React from "react";
import { LuGraduationCap } from "react-icons/lu";

// لاحظ استيراد الصورة من مجلد public عبر path نسبي مباشر
import "./hero.css";
import { Link } from "@inertiajs/react";

const Hero = ({ totalSpecializationsCount,onExploreClick }) => {
  return (
    <div className="hero">
      <div className="h-left_side">
        <div className="image">
          {/* استخدم المسار النسبي للصورة الموجودة في public */}
          <img src="/images/R.jpeg" alt="hero" />
        </div>
      </div>
      <div className="h_right_side">
        <h1>أختر مسارك الجامعي</h1>
        <h3>بثقة وحماس</h3>
        <h5>
          منصة متكاملة تساعدك في أستكشاف اختصاصك الجامعي , فهم المقررات <br />
          و الحصول على دعم مخصص لاختيار اختصاصك المفضل
        </h5>
        <div className="h-btn">
          <Link
          href={route('chat.ai')}   
          onClick={() => setMenuOpen(false)}
          className={window.location.pathname === "/chat-ai" ? "active" : ""}
        >
          <span className="list_span"> احصل على استشارة</span>
        </Link>
          {/* <span className="first_span"> استكشف التخصص</span>
  */}
          <span className="first_span" onClick={onExploreClick} style={{ cursor: "pointer" }}>
          استكشف التخصص
        </span>

        </div>
        <div className="Groups">
          <div className="iconGroup">
            <span>
              <span>+{totalSpecializationsCount}</span>
              <span>تخصص جامعي</span>
            </span>
            <LuGraduationCap />
          </div>
          <div className="iconGroup">
            <span>
              <span>50+</span>
              <span>استشارة طلابية</span>
            </span>
            <LuGraduationCap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
