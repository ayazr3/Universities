// import React from "react";
// import "./EngineeringCollege.css";

// export default function EngineeringCollege({ stats, name, image }) {
//   return (
//     <div className="college-container">
//       <h1 className="college-title">{name}</h1>
//       <div className="stats-row">
//         {stats.map((item, idx) => (
//           <div
//             className={`stat-card ${item.isLink ? 'stat-link' : ''}`}
//             key={idx}
//             style={{ borderColor: item.color }}
//           >
//             <div className="stat-value" style={{ color: item.color }}>
//               {item.isLink ? (
//                 <a href={item.value} target="_blank" rel="noopener noreferrer">
//                   رابط موقع الكلية الرسمي 
//                 </a>
//               ) : (
//                 item.value
//               )}
//             </div>
//             {item.label && <div className="stat-label">{item.label}
//               </div>}
//           </div>
//         ))}
//       </div>
//       <div className="hero-section">
//         <img src={image} alt={name} className="hero-image" />
//       </div>
//     </div>
//   );
// }


import React from "react";
import "./EngineeringCollege.css";

export default function EngineeringCollege({ stats, name, image }) {
  return (
    <div className="college-container">
      <h1 className="college-title">{name}</h1>
      <div className="stats-row">
        {stats.map((item, idx) => (
          <div
            className={`stat-card ${item.isLink ? 'stat-link' : ''}`}
            key={idx}
            style={{ borderColor: item.color }}
          >
            <div className="stat-value" style={{ color: item.color }}>
              {item.isLink ? (
                <a href={item.value} target="_blank" rel="noopener noreferrer">
                  رابط موقع الكلية الرسمي
                </a>
              ) : (
                item.value
              )}
            </div>
            {item.label && <div className="stat-label">{item.label}</div>}
          </div>
        ))}
      </div>
      <div className="hero-section">
        <img src={image} alt={name} className="hero-image" />
      </div>
    </div>
  );
}
