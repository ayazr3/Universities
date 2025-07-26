import React from 'react';
import './EducationalVideos.css';

const EducationalVideos = ({ videos = [] }) => {
  return (
    <div className="educational-videos-container">
      <h2 className="main-title">مقاطع الفيديو التعليمية</h2>
      <p className="subtitleeeee">
        شاهد مجموعة مختارة من أفضل مقاطع الفيديو التعليمية في مجال التكنولوجيا وتصميم المواقع.
      </p>
      <div className="videos-list">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <div className="video-image-wrapper">
              <img src={video.image ?? 'https://via.placeholder.com/400x300'} alt={video.title} className="video-image" />
              <span className="video-duration">{video.duration ?? ''}</span>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description || video.desc || ''}</p>
              {video.link && <a href={video.link} className="video-button" target="_blank" rel="noopener noreferrer">شاهد المزيد</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalVideos;
