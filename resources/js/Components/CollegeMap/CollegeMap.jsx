import React from "react";
import "./CollegeMap.css";

export default function CollegeMap({ location, name, address }) {
  // const coords = location ? JSON.parse(location) : { lat: 33.483333, lng: 36.298333 };
  const coords = location || { lat: 33.483333, lng: 36.298333 };

  return (
    <div className="college-map-container">
      <h2 className="college-title">موقع الكلية</h2>
      <div className="map-outer">
        <iframe
          className="map-frame"
          title="college-location"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01},${coords.lat - 0.01},${coords.lng + 0.01},${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat},${coords.lng}`}
          allowFullScreen
        ></iframe>
        <div className="college-info-card animate-pop">
          <div className="info-content">
            <span className="info-title">{name}</span>
            <span className="info-desc">{address}</span>
          </div>
          <span className="info-pin">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="10" r="4" fill="#e74c3c" />
              <path d="M12 2C7 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-3-8-8-8zm0 10a2 2 0 110-4 2 2 0 010 4z" fill="#e74c3c" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
