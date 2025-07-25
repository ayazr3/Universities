import React from 'react';
import './BooksSection.css';

const BooksSection = ({ books = [] }) => {
  return (
    <section className="books-section">
      <h2 className="books-title">الكتب المُوصى بها</h2>
      <p className="books-desc">
        مجموعة مختارة من أفضل الكتب التقنية التي ستساعدك في تطوير مهاراتك ومعرفتك
      </p>

      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-img-wrap">
              <img src={book.image ?? 'https://via.placeholder.com/400x300'} alt={book.title} className="book-img" />
              <span className="book-rating">
                {/* مثال: يمكنك اضافة تصنيف لو متوفر */}
                4.7 <span className="star">★</span>
              </span>
            </div>
            <div className="book-info">
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author ?? ''}</div>
              <div className="book-desc">{book.description || book.desc || ''}</div>
              <div className="book-pages">{book.pages ?? ''}</div>
              {book.link && <a href={book.link} className="book-btn" target="_blank" rel="noopener noreferrer">اقرأ الكتاب</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BooksSection;
