// File: resources/js/Pages/GraduationProjectsPage.jsx
import React, { useState, useEffect } from "react";
import "../Components/GraduationProjects/GraduationProjects.css"
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { usePage } from "@inertiajs/react";

  
export default function GraduationProjectsPage({ projects }) {
 const { props } = usePage();
  const { quickLinks } = props;

  const [selectedImage, setSelectedImage] = useState(
    projects.length && Array.isArray(projects[0].project_images) && projects[0].project_images.length
      ? projects[0].project_images[0]
      : null
  );

  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const [comments, setComments] = useState(
    projects.length ? projects[0].comments : []
  );
  const [commentInput, setCommentInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (projects.length) {
      const selectedProject = projects[selectedProjectIdx];
      if (
        Array.isArray(selectedProject.project_images) &&
        selectedProject.project_images.length > 0
      ) {
        setSelectedImage(selectedProject.project_images[0]);
      } else {
        setSelectedImage(null);
      }
      setComments(selectedProject.comments || []);
    }
  }, [selectedProjectIdx, projects]);

  const handleProjectSelect = (e) => {
    setSelectedProjectIdx(Number(e.target.value));
  };

  const handleAddComment = async () => {
    if (commentInput.trim() !== '' && nameInput.trim() !== '') {
      try {
        await axios.post('/graduation-projects/comments', {
          name: nameInput,
          content: commentInput,
          graduation_project_id: projects[selectedProjectIdx].id,
          specialization_id: projects[selectedProjectIdx].specialization_id,
        });
        setCommentInput('');
        setNameInput('');
        const res = await axios.get(`/graduation-projects/${projects[selectedProjectIdx].id}/comments`);
        setComments(res.data);
      } catch (error) {
        alert('حدث خطأ أثناء إرسال التعليق.');
      }
    } else {
      alert('يرجى إدخال الاسم والتعليق.');
    }
  };

  if (projects.length === 0) return <p>لا يوجد مشاريع لهذه السنة.</p>;

  const project = projects[selectedProjectIdx];
  const gallery = Array.isArray(project.project_images) ? project.project_images : [];


  let teamNames = "";
  try {
    if (typeof project.team_members === "string") {
      // قد تكون مخزنة كـ JSON string في قاعدة البيانات
      teamNames = JSON.parse(project.team_members).join(" - ");
    } else if (Array.isArray(project.team_members)) {
      teamNames = project.team_members.join(" - ");
    } else {
      teamNames = project.team_members || "";
    }
  } catch {
    teamNames = project.team_members || "";
  }

  return (
    <>
    <Navbar/>
   
    <div className="shs-dashboard">
      <aside className="shs-sidebar">
        <section className="shs-project-info shs-animated-fadein">
          <h3>معلومات المشروع</h3>
          <div>
            <div>
              <span>الكلية:</span> {project.specialization?.college?.name || ""}
            </div>
            <div>
              <span>المشرف:</span> {project.supervisor}
            </div>
            <div>
              <span>سنة التخرج:</span> {project.graduation_year}
            </div>
            <div>
              <span>المحافظة:</span> {project.specialization?.college?.governorate?.name || ""}
            </div>
          </div>
        </section>

        {projects.length > 1 && (
          <select className="shs-project-select" onChange={handleProjectSelect} value={selectedProjectIdx}>
            {projects.map((p, index) => (
              <option key={p.id} value={index}>{p.name}</option>
            ))}
          </select>
        )}
      </aside>

      <main className="shs-main-content">
        <header className="shs-project-header shs-animated-fadein">
          <div className="shs-project-title">
            <div  className="shs-project-title-name">
            <span className="shs-category-badge">مشروع تخرج</span>
            <h1>{project.name}</h1>
            </div>
              <div className="shs-project-meta">
                <span> {project.specialization?.name || ""}</span>
                <span>{project.graduation_year}</span>
                <span>{teamNames}</span>
              </div>
    
          
          <div className="shs-project-actions">
            <a href={project.thesis_file} className="shs-btn-download" target="_blank" rel="noopener noreferrer">
              تحميل الوثيقة
            </a>
          </div>
          </div>
        </header>

        <section className="shs-project-description shs-animated-fadein">
          <h3><span role="img" aria-label="وصف">🩺</span> وصف المشروع</h3>
          <div className="shs-description-card">
            <p>{project.description}</p>
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
                className={`shs-gallery-img ${selectedImage === img ? "shs-selected" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          {selectedImage && (
            <div className="shs-selected-image-container">
              <img src={selectedImage} alt="الصورة المختارة" className="shs-selected-image" />
            </div>
          )}
        </section>

        <section className="shs-comments-section shs-animated-fadein">
          <h3><span role="img" aria-label="تعليقات">💬</span> التعليقات</h3>
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
                    <span className="shs-comment-date">{new Date(comment.created_at).toLocaleString()}</span>
                  </div>
                  <div className="shs-comment-text">{comment.content}</div>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
     <Footer quickLinks={quickLinks} />
    </>
  );
}
