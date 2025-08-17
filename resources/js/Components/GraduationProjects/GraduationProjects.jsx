import React, { useState } from "react";
import "./GraduationProjects.css"
import Images1 from '../../assets/images/college/Images1.jpg'
import Images2 from '../../assets/images/college/Images2.jpg'
import Images3 from '../../assets/images/college/Images3.jpg'

const gallery = [Images1, Images2, Images3];

export default function SmartHospitalSystem() {
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const handleAddComment = () => {
    if (commentInput.trim() !== '' && nameInput.trim() !== '') {
      setComments([
        ...comments,
        {
          name: nameInput.trim(),
          text: commentInput.trim(),
          date: new Date().toLocaleString()
        }
      ]);
      setCommentInput('');
      setNameInput('');
    } else {
      alert('يرجى إدخال الاسم والتعليق.');
    }
  };

  return (
    <div className="shs-dashboard">
      <aside className="shs-sidebar">
        <section className="shs-project-info shs-animated-fadein">
          <h3>معلومات المشروع</h3>
          <div>
            <div>
              <span>الكلية:</span> التطبيقية/تقنيات الحاسوب
            </div>
            <div>
              <span>المشرف:</span> د.م صفاء سراقبي
            </div>
            <div>
              <span>سنة التخرج:</span> 2023
            </div>
            <div>
              <span>المحافظة:</span> دمشق
            </div>
          </div>
        </section>
      </aside>
      <main className="shs-main-content">
        <header className="shs-project-header shs-animated-fadein">
          <div className="shs-project-title">
            <span className="shs-category-badge">مشروع تخرج</span>
            <h1>نظام سترة طبية متطورة</h1>
          </div>
          <div className="shs-project-meta">
         
            <span>جامعة دمشق</span>
            <span>2023</span>
            <span>هشام فرحان الحسن - علا خالد الصيطري - جودي إبراهيم حفي</span>
          </div>
          <div className="shs-project-actions">
            <button className="shs-btn-download">تحميل الوثيقة (128)</button>
          </div>
        </header>

        {/* قسم وصف المشروع - منسق */}
        <section className="shs-project-description shs-animated-fadein">
          <h3>
            <span role="img" aria-label="وصف">🩺</span> وصف المشروع
          </h3>
          <div className="shs-description-card">
            <p>
              يهدف هذا المشروع إلى تطوير <span className="highlight">نظام بزة طبية متطورة</span> تساعد في مراقبة الحالة الصحية للمرضى بشكل دقيق وفعال.
              يتضمن النظام أجهزة استشعار متقدمة وبرمجيات لتحليل البيانات الطبية في الوقت الحقيقي،
              مما يسهل على الأطباء اتخاذ القرارات السريعة والصحيحة.
            </p>
            <ul>
              <li>مراقبة مستمرة لمؤشرات المريض الحيوية</li>
              <li>تنبيهات فورية للحالات الحرجة</li>
              <li>واجهة استخدام سهلة للأطباء والممرضين</li>
            </ul>
          </div>
        </section>

        <section className="shs-project-gallery shs-animated-gallery">
          <h3>صور المشروع</h3>
          <div className="shs-gallery">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`صورة المشروع ${i + 1}`}
                className={`shs-gallery-img ${selectedImage === img ? 'shs-selected' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="shs-selected-image-container">
            <img src={selectedImage} alt="الصورة المختارة" className="shs-selected-image" />
          </div>
        </section>

        {/* قسم التعليقات - منسق */}
        <section className="shs-comments-section shs-animated-fadein">
          <h3>
            <span role="img" aria-label="تعليقات">💬</span> التعليقات
          </h3>
          <div className="shs-comment-input-container">
            <input
              type="text"
              placeholder="اسمك"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="shs-input shs-input-name"
              maxLength={30}
            />
            <input
              type="text"
              placeholder="أضف تعليقك هنا..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="shs-input shs-input-comment"
              maxLength={120}
            />
            <button className="shs-btn-comment" onClick={handleAddComment}>
              <span role="img" aria-label="إرسال">🚀</span> إرسال
            </button>
          </div>
          <ul className="shs-comments-list">
            {comments.length === 0 ? (
              <li className="shs-no-comments">لا توجد تعليقات بعد.</li>
            ) : (
              comments.map((comment, index) => (
                <li key={index} className="shs-comment-card">
                  <div className="shs-comment-header">
                    <span className="shs-comment-avatar">{comment.name[0]}</span>
                    <span className="shs-comment-name">{comment.name}</span>
                    <span className="shs-comment-date">{comment.date}</span>
                  </div>
                  <div className="shs-comment-text">{comment.text}</div>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
