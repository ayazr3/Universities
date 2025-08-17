// import React from "react";
// import "./computerEngineeringHero.css";
// import { Link, router } from '@inertiajs/react';

// const ComputerEngineeringHero = ({ collegeName, title, degreeType, academicYears ,specializationId }) => {


//   const handleProjectSelect = (e) => {
//     if (e.target.value !== "") {
//       router.visit("/Projects");
//     }
//   };

//   return (
//     <section className="ce-hero">
//       <header className="ce-navbar">
//         <nav className="ce-navlinks">
    
//           <Link href={`/specializations/${specializationId}/top-students`} className="ce-link">
//               اوائل الكلية
//           </Link>

//           <select className="ce-projects-list" onChange={handleProjectSelect} defaultValue="">
//             <option value="" disabled>
//               مشاريع التخرج
//             </option>
//             <option value="project1">2023-2024</option>
//             <option value="project2">2024-2025</option>
//             <option value="project3">2025-2026</option>
//           </select>
//         </nav>
//       </header>

//       <div className="ce-content">
//         <div className="ce-title-row">
//           <span className="ce-icon ce-icon-left">{"<>"}</span>
//           <h1 className="ce-titlee">{collegeName}</h1>
//           <span className="ce-icon ce-icon-right">🧠</span>
//         </div>

//         <div className="ce-subtitle">{title}</div>

//         <div className="ce-tags">
//           <span className="ce-tag ce-tag-lightning">{title}</span>
//           <span className="ce-tag">{degreeType}</span>
//           <span className="ce-tag">{academicYears} سنوات</span>
//         </div>

//         <div className="ce-scroll-indicator">
//           <span className="ce-scroll-dot"></span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ComputerEngineeringHero;


import React, { useEffect, useState } from "react";
import "./computerEngineeringHero.css";
import { Link, router } from '@inertiajs/react';
import axios from "axios";

const ComputerEngineeringHero = ({ collegeName, title, degreeType, academicYears, specializationId }) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    axios.get(`/specializations/${specializationId}/graduation-projects/years`)
      .then(res => setYears(res.data));
  }, [specializationId]);

  const handleProjectSelect = (e) => {
    if (e.target.value !== "") {
      setSelectedYear(e.target.value);
      router.visit(`/specializations/${specializationId}/graduation-projects/${e.target.value}`);
    }
  };

  return (
    <section className="ce-hero">
      <header className="ce-navbar">
        <nav className="ce-navlinks">
          <Link href={`/specializations/${specializationId}/top-students`} className="ce-link">
            اوائل الكلية
          </Link>
          <select className="ce-projects-list" onChange={handleProjectSelect} defaultValue="">
            <option value="" disabled>
              مشاريع التخرج
            </option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </nav>
      </header>
      <div className="ce-content">
        <div className="ce-title-row">
          <span className="ce-icon ce-icon-left">{"<>"}</span>
          <h1 className="ce-titlee">{collegeName}</h1>
          <span className="ce-icon ce-icon-right">🧠</span>
        </div>
        <div className="ce-subtitle">{title}</div>
        <div className="ce-tags">
          <span className="ce-tag ce-tag-lightning">{title}</span>
          <span className="ce-tag">{degreeType}</span>
          <span className="ce-tag">{academicYears} سنوات</span>
        </div>
        <div className="ce-scroll-indicator">
          <span className="ce-scroll-dot"></span>
        </div>
      </div>
    </section>
  );
};

export default ComputerEngineeringHero;
