import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AdmissionScheduleShow({ admissionSchedule, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل موعد القبول - ${admissionSchedule.title}`} />

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
          {admissionSchedule.title}
        </h1>

        {/* التفاصيل */}
        <div className="details-grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>التفاصيل:</dt>
              <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>
                {admissionSchedule.body}
              </dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>التاريخ:</dt>
              <dd>{new Date(admissionSchedule.date).toLocaleDateString('ar-EG')}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>المسؤول:</dt>
              <dd>{admissionSchedule.name}</dd>

              {admissionSchedule.file_url && (
                <>
                  <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الملف المرفق:</dt>
                  <dd>
                    <a
                      href={`/storage/${admissionSchedule.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-link"
                      style={{ fontWeight: '500', direction: 'ltr' }}
                    >
                      عرض الملف
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </div>

        {/* أزرار تعديل ورجوع */}
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
    </AuthenticatedLayout>
  );
}
