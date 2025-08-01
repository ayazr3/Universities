import React, { useState } from "react";
import "./Specialties.css";
// استيراد الأيقونات إذا أردت، أو تستقبل أيقونات من السيرفر لكن أبسط تعطي أيقونة افتراضية هنا
import { FaComputer } from "react-icons/fa6";
import { Link } from "@inertiajs/react";

export default function Specialties({ specializations }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (idx) => {
    if (window.innerWidth <= 768) {
      setActiveIndex(idx === activeIndex ? null : idx);
    }
  };

  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // أيقونة افتراضية لكل تخصص لإبراز الشكل، يمكن تعديل حسب الحاجة
  const defaultIcon = <FaComputer />;

  return (
    <section className="specialties-section">
      <h2 className="main-titlee">التخصصات المتوفرة</h2>
      <p className="subtitleeeee">
        استكشف مجموعة متنوعة من التخصصات الهندسية المتقدمة التي تؤهلك لسوق العمل
      </p>
      <div className="row_cards">
        {specializations && specializations.length > 0 ? (
          specializations.map((item, idx) => (
            <div
              className={`specialty-card${activeIndex === idx ? " active" : ""}`}
              key={item.id}
              onClick={() => handleCardClick(idx)}
            >
              <span
                className="icon"
                style={{ background: "#102C57", boxShadow: `0 4px 11px #102C57` }}
              >
                {defaultIcon}
              </span>
              <div>
                <h3 className="card-titlee">{item.name}</h3>
                <p className="card-descc">{item.summary}</p>
                <button
                  className={`card-btn${activeIndex === idx ? " show" : ""}`}
                  tabIndex={activeIndex === idx ? 0 : -1}
                >
                  استكشف التخصص
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد تخصصات متوفرة لهذه الكلية.</p>
        )}
      </div>
    </section>
  );
}


