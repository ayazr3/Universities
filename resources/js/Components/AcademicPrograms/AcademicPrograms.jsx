import React from "react";
import { FaCode, FaRobot } from 'react-icons/fa';
import { GiCyberEye } from 'react-icons/gi';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { SiTensorflow } from 'react-icons/si';

import "./AcademicPrograms.css";

const programs = [
  {
    title: "تطوير البرمجيات",
    duration: "",
    desc: "العمل كمبرمج أو مطور تطبيقات ويب وموبايل.",
    icon: <FaCode />
  },
  {
    title: "الأمن السيبراني",
    duration: "",
    desc: "حماية الأنظمة والشبكات من الهجمات الإلكترونية.",
    icon: <GiCyberEye />
  },
  {
    title: "تحليل البيانات",
    duration: "",
    desc: "استخراج رؤى من البيانات الضخمة لاتخاذ قرارات استراتيجية",
    icon: <BiBarChartAlt2 />
  },
  {
    title: "الذكاء الاصطناعي والتعلم الآلي",
    duration: "",
    desc: "تصميم أنظمة ذكية تتعلم وتتطور ذاتياً.",
    icon: <SiTensorflow />
  },
];

export default function AcademicPrograms({ specialization }) {
  return (
    <div className="programs-container">
      <div className="animated-bg"></div>
      <div className="programs-grid">
        {programs.map((prog, idx) => (
          <div className="program-card" key={idx} style={{ animationDelay: `${idx * 0.18}s` }}>
            <div className="icon">
              {prog.icon}
            </div>
            <div className="program-info">
              <h3>{prog.title}</h3>
              <span className="duration">{prog.duration}</span>
              <p>{prog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
