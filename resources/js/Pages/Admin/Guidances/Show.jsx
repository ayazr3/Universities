import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GuidanceShow({ guidance, auth }) {
  // دالة تحويل كود النوع لاسم معرب
  const getTypeName = (type) => {
    switch (type) {
      case 'article': return 'مقالة';
      case 'book': return 'كتاب';
      case 'video': return 'فيديو';
      case 'advice': return 'نصيحة';
      default: return type;
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{marginBottom: 0}}>تفاصيل التوجيه</h2>}
    >
      <Head title="تفاصيل التوجيه" />
      <div className="modern-table-container" style={{display: 'flex', justifyContent:'center', alignItems: 'flex-start', minHeight:'70vh'}}>
        <div className="modern-card" style={{maxWidth: 480, width: '100%', margin: '40px 0', padding:'32px 28px', background: "#fff"}}>

          <h2 className="form-title" style={{fontSize:'1.4rem'}}>{guidance.title}</h2>
          <div className="card-detail-item">
            <span className="label">النوع:</span>
            <span>{getTypeName(guidance.type)}</span>
          </div>
          <div className="card-detail-item">
            <span className="label">الوصف:</span>
            <span>{guidance.description}</span>
          </div>
          {guidance.link && (
            <div className="card-detail-item">
              <span className="label">الرابط:</span>
              <a
                href={guidance.link}
                target="_blank"
                rel="noopener noreferrer"
                className="table-link"
                style={{ direction: 'ltr', fontWeight: '500', marginRight: 8 }}
              >
                {guidance.link}
              </a>
            </div>
          )}
          {guidance.image && (
            <div className="card-detail-item" style={{flexDirection:'column', gap:0}}>
              <span className="label" style={{marginBottom:'5px'}}>الصورة:</span>
              <img
                src={`/storage/${guidance.image}`}
                alt={guidance.title}
                style={{height:100, borderRadius: '8px', boxShadow: '0 1px 8px #eee'}}
              />
            </div>
          )}

          <div className="actions-cell" style={{marginTop:'2.5rem', justifyContent:'center'}}>
            <Link
              href={route('guidances.edit', guidance.id)}
              className="action-btn edit-btn"
              style={{minWidth:'100px'}}
            >
              تعديل
            </Link>
            <Link
              href={route('guidances.index')}
              className="action-btn view-btn"
              style={{background:'#e2e8f0', color:'#3059d5', minWidth:'100px'}}
            >
              رجوع
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
