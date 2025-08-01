import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function FaqShow({ faq, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل السؤال الشائع</h2>}
    >
      <Head title="تفاصيل السؤال الشائع" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div className="modern-card" style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: "#fff" }}>

          {/* عنوان السؤال */}
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{faq.question}</h2>

          {/* محتوى الإجابة */}
          <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
            <span className="label" style={{ marginBottom: '5px' }}>الإجابة:</span>
            <p className="text-gray-700 whitespace-pre-line" style={{ margin: 0 }}>{faq.answer}</p>
          </div>

          {/* أزرار الإجراءات */}
          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link
              href={route('faq.edit', faq.id)}
              className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
            >
              تعديل
            </Link>
            <Link
              href={route('faq.index')}
              className="action-btn view-btn"
              style={{ background: '#e2e8f0', color: '#3059d5', minWidth: '100px' }}
            >
              رجوع
            </Link>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
