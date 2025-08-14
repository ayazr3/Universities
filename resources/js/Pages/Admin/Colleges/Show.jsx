import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function FaqShow({ faq, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل السؤال الشائع - ${faq.question}`} />

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
        <h1 className="form-title" style={{ marginBottom: 22, fontSize: '1.7rem' }}>
          {faq.question}
        </h1>

        {/* التفاصيل (الإجابة) */}
        <div className="details-grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الإجابة:</dt>
              <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>
                {faq.answer}
              </dd>
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
            href={route('faq.edit', faq.id)}
            className="submit-btn"
            style={{
              display: 'inline-block',
              textAlign: 'center',
              padding: '12px 20px',
              borderRadius: 8
            }}
          >
            تعديل
          </Link>
          <Link
            href={route('faq.index')}
            style={{
              color: "#3a8dde",
              textDecoration: "underline",
              background: "#eaf4ff",
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: "15px",
              fontWeight: "bold",
              minWidth: "100px",
              textAlign: "center"
            }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
