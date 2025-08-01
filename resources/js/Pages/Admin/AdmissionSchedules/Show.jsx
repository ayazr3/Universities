import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AdmissionScheduleShow({ admissionSchedule, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل جدول القبول</h2>}
    >
      <Head title="تفاصيل جدول القبول" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div
          className="modern-card"
          style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: '#fff' }}
        >

          {/* العنوان */}
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{admissionSchedule.title}</h2>

          {/* التفاصيل */}
          <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
            <span className="label" style={{ marginBottom: '5px' }}>التفاصيل:</span>
            <p className="text-gray-700 whitespace-pre-line" style={{ margin: 0 }}>{admissionSchedule.body}</p>
          </div>

          {/* التاريخ */}
          <div className="card-detail-item">
            <span className="label">التاريخ:</span>
            <span>{new Date(admissionSchedule.date).toLocaleDateString('ar-EG')}</span>
          </div>

          {/* المسؤول */}
          <div className="card-detail-item">
            <span className="label">المسؤول:</span>
            <span>{admissionSchedule.name}</span>
          </div>

          {/* الملف المرفق */}
          {admissionSchedule.file_url && (
            <div className="card-detail-item" style={{ flexDirection: 'column', gap: 0 }}>
              <span className="label" style={{ marginBottom: '5px' }}>الملف المرفق:</span>
              <a
                href={`/storage/${admissionSchedule.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="table-link"
                style={{ fontWeight: '500', direction: 'ltr', marginRight: 8 }}
              >
                عرض الملف
              </a>
            </div>
          )}

          {/* أزرار التعديل والرجوع */}
          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link
              href={route('admissionSchedule.edit', admissionSchedule.id)}
              className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
            >
              تعديل
            </Link>
            <Link
              href={route('admissionSchedule.index')}
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
