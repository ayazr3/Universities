import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function TermShow({ term, auth }) {
  // دالة تحويل كود النوع إلى الاسم المعرب
  const getTypeName = (type) => {
    switch (type) {
      case 'termsofservice': return 'شروط الخدمة';
      case 'privacypolicy': return 'سياسة الخصوصية';
      default: return type;
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل الشرط</h2>}
    >
      <Head title="تفاصيل الشرط" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div
          className="modern-card"
          style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: '#fff' }}
        >
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{term.title}</h2>

          <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
            <span className="label" style={{ marginBottom: 4 }}>المحتوى:</span>
            <p className="whitespace-pre-wrap" style={{ margin: 0 }}>{term.content}</p>
          </div>

          <div className="card-detail-item">
            <span className="label">النوع:</span>
            <span>{getTypeName(term.type)}</span>
          </div>

          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link
              href={route('terms.edit', term.id)}
              className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
            >
              تعديل
            </Link>
            <Link
              href={route('terms.index')}
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
