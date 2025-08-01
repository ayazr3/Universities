import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GovernorateShow({ governorate, auth }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2>تفاصيل المحافظة</h2>}>
      <Head title="تفاصيل المحافظة" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div
          className="modern-card"
          style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: '#fff' }}
        >
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{governorate.name}</h2>
          <div className="card-detail-item">
            <span className="label">تاريخ الإنشاء:</span>
            <span>{new Date(governorate.created_at).toLocaleDateString('ar-EG')}</span>
          </div>
          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link href={route('governorates.edit', governorate.id)} className="action-btn edit-btn" style={{ minWidth: '100px' }}>
              تعديل
            </Link>
            <Link
              href={route('governorates.index')}
              className="action-btn view-btn"
              style={{ background: '#e2e8f0', color: '#3059d5', minWidth: '100px' }}
            >رجوع</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
