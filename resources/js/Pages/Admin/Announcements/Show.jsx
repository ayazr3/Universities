import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AnnouncementShow({ announcement, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل الإعلان</h2>}
    >
      <Head title="تفاصيل الإعلان" />

      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div className="modern-card" style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: "#fff" }}>

          {/* عنوان الإعلان */}
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{announcement.title}</h2>

          {/* بيانات الناشر */}
          <div className="card-detail-item">
            <span className="label">نشر بواسطة:</span>
            <span>{announcement.publisher}</span>
          </div>

          {/* تاريخ النشر */}
          <div className="card-detail-item">
            <span className="label">تاريخ النشر:</span>
            <span>{announcement.publish_date}</span>
          </div>

          {/* الصورة */}
          {announcement.image && (
            <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
              <span className="label">الصورة:</span>
              <img
                src={`/storage/${announcement.image}`}
                alt={announcement.title}
                className="table-image"
                style={{ maxHeight: 160 }}
              />
            </div>
          )}

          {/* الملخص */}
          {announcement.summary && (
            <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
              <span className="label">الملخص:</span>
              <p className="text-gray-700 whitespace-pre-line" style={{ margin: 0 }}>{announcement.summary}</p>
            </div>
          )}

          {/* التفاصيل */}
          {announcement.details && (
            <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
              <span className="label">التفاصيل:</span>
              <p className="text-gray-700 whitespace-pre-line" style={{ margin: 0 }}>{announcement.details}</p>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link
              href={route('announcement.edit', announcement.id)}
              className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
            >
              تعديل
            </Link>
            <Link
              href={route('announcement.index')}
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
