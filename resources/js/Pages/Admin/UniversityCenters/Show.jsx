import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, universityCenter }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل المركز - ${universityCenter.name}`} />

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
          direction: 'rtl',
          fontSize: 16,
          color: '#34495e',
        }}
      >
        <h1 className="form-title" style={{ fontSize: '1.7rem', marginBottom: 22 }}>
          {universityCenter.name}
        </h1>

        <dl>
          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>المحافظة:</dt>
          <dd>{universityCenter.governorate?.name || '--'}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الوصف:</dt>
          <dd style={{ whiteSpace: 'pre-line', marginTop: 0 }}>{universityCenter.description}</dd>
        </dl>

        <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
          <Link
            href={route('adminuniversitycenters.edit', universityCenter.id)}
            className="action-btn edit-btn"
            style={{ minWidth: '100px' }}
          >
            تعديل
          </Link>
          <Link
            href={route('adminuniversitycenters.index')}
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
