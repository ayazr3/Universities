import React from "react";
import { FaCode, FaRobot } from 'react-icons/fa';
import { GiCyberEye } from 'react-icons/gi';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { SiTensorflow } from 'react-icons/si';
import "./AcademicPrograms.css";

// أيقونات افتراضية يمكن ربطها بأنواع مختلفة من التخصصات
const getIconBySpecialization = (specializationName) => {
  const name = specializationName?.toLowerCase() || '';
  
  if (name.includes('حاسوب') || name.includes('برمجة')) {
    return <FaCode />;
  } else if (name.includes('أمن')) {
    return <GiCyberEye />;
  } else if (name.includes('ذكاء') || name.includes('آلي')) {
    return <SiTensorflow />;
  } else if (name.includes('ميكاترونكس') || name.includes('روبوت')) {
    return <FaRobot />;
  } else if (name.includes('بيانات')) {
    return <BiBarChartAlt2 />;
  } else {
    return <FaCode />; // أيقونة افتراضية
  }
};

export default function AcademicPrograms({ specialization }) {
  if (!specialization) {
    return <div>جاري التحميل...</div>;
  }

  // إنشاء برنامج واحد بناءً على بيانات التخصص
  const program = {
    title: specialization.name,
    duration: `${specialization.academic_year_number} سنوات`,
    desc: specialization.summary,
    icon: getIconBySpecialization(specialization.name),
    degree_type: specialization.degree_type
  };

  return (
    <div className="programs-container">
      <div className="animated-bg"></div>
      <h2 className="programs-title">البرنامج الأكاديمي</h2>
      
      <div className="programs-grid">
        <div className="program-card main-program">
          <div className="icon">
            {program.icon}
          </div>
          <div className="program-info">
            <h3>{program.title}</h3>
            <span className="duration">{program.duration}</span>
            <span className="degree-type">{program.degree_type}</span>
            <p>{program.desc}</p>
          </div>
        </div>
      </div>

      <div className="program-details">
        <h3>تفاصيل البرنامج:</h3>
        <div className="details-grid">
          <div className="detail-item">
            <strong>مدة الدراسة:</strong> {specialization.academic_year_number} سنوات
          </div>
          <div className="detail-item">
            <strong>نوع الدرجة:</strong> {specialization.degree_type}
          </div>
          <div className="detail-item">
            <strong>الكلية:</strong> {specialization.college?.name}
          </div>
        </div>
      </div>
    </div>
  );
}
