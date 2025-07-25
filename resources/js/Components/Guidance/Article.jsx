import React from 'react';
import './Article.css';

const ArticlesMiniPage = ({ articles = [] }) => {
  return (
    <div className="knowledge-mini">
      <main>
        <h1 className="main-title-mini">المقالات</h1>
        <p className="subtitle-mini">
          اكتشف مجموعة متنوعة من المقالات التقنية والتعليمية المكتوبة بعناية لإثراء معرفتك
        </p>
        <div className="articles-list-mini">
          {articles.map((art) => (
            <div className="article-card-mini" key={art.id}>
              <img src={art.image ?? 'https://via.placeholder.com/400x300'} alt={art.title} className="article-img-mini" />
              <div className="article-content-mini">
                <span className="article-time-mini">{art.created_at ? new Date(art.created_at).toLocaleDateString('ar-EG') : ''}</span>
                <h2 className="article-title-mini">{art.title}</h2>
                <p className="article-desc-mini">{art.description}</p>
                {art.link && <a href={art.link} className="more-btn-mini" target="_blank" rel="noopener noreferrer">اقرأ المزيد</a>}
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="lovable-badge-mini">
        <span>Edit with <b>Lovable</b></span>
      </div>
    </div>
  );
};

export default ArticlesMiniPage;
