import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GuidanceShow({ guidance, auth }) {
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
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل الإرشاد - ${guidance.title}`} />

      <div
        className="panel"
        style={{
          maxWidth: 700,
          margin: '40px auto',
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 12px 24px rgba(58,141,222,0.15)',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        {/* العنوان */}
        <h1 className="form-title" style={{ marginBottom: 20, fontSize: '1.8rem' }}>
          {guidance.title}
        </h1>

        {/* صورة + بيانات */}
        <div className="details-grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {/* صورة الإرشاد */}
          <div style={{ flex: '0 0 220px' }}>
            {guidance.image && (
              <img
                src={`/storage/${guidance.image}`}
                alt={guidance.title}
                style={{
                  width: '100%',
                  borderRadius: 14,
                  marginBottom: 14,
                  border: '1px solid #eee'
                }}
              />
            )}
          </div>

          {/* التفاصيل */}
          <div style={{ flex: 1 }}>
            <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>النوع:</dt>
              <dd>{getTypeName(guidance.type)}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الوصف:</dt>
              <dd style={{ whiteSpace: 'pre-line' }}>{guidance.description}</dd>

              {guidance.link && (
                <>
                  <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الرابط:</dt>
                  <dd
                    style={{
                      maxWidth: '100%',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                  >
                    <a
                      href={guidance.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="official-link"
                      style={{
                        display: 'inline-block',
                        color: '#3a8dde',
                        textDecoration: 'underline',
                        fontWeight: '500',
                        direction: 'ltr'
                      }}
                    >
                      {guidance.link}
                    </a>
                  </dd>
                </>
              )}

              {/* إذا كان لديك خاصية isGeneral */}
              {guidance.isGeneral && (
                <>
                  <dt style={{ fontWeight: 'bold', marginTop: 8 }}>عام:</dt>
                  <dd>{guidance.isGeneral === 'للموقع' ? 'للموقع كامل' : 'لكلية بحد ذاتها'}</dd>
                </>
              )}
            </dl>
          </div>
        </div>

        {/* أزرار تعديل ورجوع */}
        <div style={{
          marginTop: 30,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
        }}>
          <Link
            href={route('guidances.edit', guidance.id)}
            className="submit-btn"
            style={{
              display: 'inline-block',
              textAlign: 'center',
              padding: '12px 20px',
              borderRadius: 8,
              maxWidth: "50%"
            }}
          >
            تعديل
          </Link>
          <Link
            href={route('guidances.index')}
            style={{
              color: "#3a8dde",
              textDecoration: "underline",
              fontWeight: "bold",
              background: "#eaf4ff",
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: "15px",
              minWidth: "100px",
              textAlign: "center",

            }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
