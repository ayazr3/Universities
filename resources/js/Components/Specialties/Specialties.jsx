import React, { useState } from "react";
import "./Specialties.css";
import { FaComputer } from "react-icons/fa6";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { TbRobot } from "react-icons/tb";
import { Link } from "@inertiajs/react";

const specialtiesData = [
  {
    icon: <FaComputer />,
    title: "تقنيات الحاسوب",
    desc: "تأهيل فنيين في تركيب وصيانة وتشغيل الحواسيب والشبكات والبرمجيات.",
    link: "/Jurisdiction",
  },
  {
    icon: <MdEnergySavingsLeaf />,
    title: "طاقات متجددة",
    desc: "دراسة وتطبيق مصادر الطاقة النظيفة كالطاقة الشمسية.",
    link: null,
  },
  {
    icon: <TbRobot />,
    title: "ميكاترونكس",
    desc: "دمج الميكانيكا والإلكترونيات والتحكم لتطوير الأنظمة الذكية.",
    link: null,
  },
];

export default function Specialties() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (idx) => {
    if (window.innerWidth <= 768) {
      setActiveIndex(idx === activeIndex ? null : idx);
    }
  };

  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="specialties-section">
      <h2 className="main-titlee">التخصصات المتوفرة</h2>
      <p className="subtitleeeee">
        استكشف مجموعة متنوعة من التخصصات الهندسية المتقدمة التي تؤهلك لسوق العمل
      </p>
      <div className="row_cards">
        {specialtiesData.map((item, idx) => (
          <div
            className={`specialty-card${activeIndex === idx ? " active" : ""}`}
            key={idx}
            onClick={() => handleCardClick(idx)}
          >
            <span
              className="icon"
              style={{ background: "#102C57", boxShadow: `0 4px 11px #102C57` }}
            >
              {item.icon}
            </span>
            <div>
              <h3 className="card-titlee">{item.title}</h3>
              <p className="card-descc">{item.desc}</p>
              {item.link ? (
                <Link to={item.link} onClick={topScroll}>
                  <button
                    className={`card-btn${activeIndex === idx ? " show" : ""}`}
                    tabIndex={activeIndex === idx ? 0 : -1}
                  >
                    استكشف التخصص
                  </button>
                </Link>
              ) : (
                <button
                  className={`card-btn${activeIndex === idx ? " show" : ""}`}
                  tabIndex={activeIndex === idx ? 0 : -1}
                >
                  استكشف التخصص
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
