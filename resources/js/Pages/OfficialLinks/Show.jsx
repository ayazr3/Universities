import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function OfficialLinkShow({ officialLink, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل الرابط الرسمي</h2>}
    >
      <Head title="تفاصيل الرابط الرسمي" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div
          className="modern-card"
          style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: "#fff" }}
        >
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{officialLink.entity_name}</h2>

          <div className="card-detail-item">
            <span className="label">الرابط:</span>
            <a
              href={officialLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="table-link"
              style={{ direction: 'ltr', fontWeight: '500', marginRight: 8 }}
            >
              {officialLink.link}
            </a>
          </div>

          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link
              href={route('official-links.edit', officialLink.id)}
              className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
            >
              تعديل
            </Link>
            <Link
              href={route('official-links.index')}
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
