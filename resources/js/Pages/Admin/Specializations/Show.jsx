import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function Show({ specialization, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل التخصص - ${specialization.name}`} />

      <div
        className="panel"
        style={{
          maxWidth: 750,
          margin: '40px auto',
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 12px 24px rgba(58,141,222,0.15)',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        <h1 className="form-title" style={{ marginBottom: 22, fontSize: '1.7rem' }}>
          {specialization.name}
        </h1>

        <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الكلية:</dt>
          <dd>{specialization.college?.name || '--'}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>المحافظة:</dt>
          <dd>{specialization.college?.governorate?.name || '--'}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الملخص:</dt>
          <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>{specialization.summary}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>التفاصيل:</dt>
          <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>{specialization.details}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>العنوان:</dt>
          <dd>{specialization.title}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>نوع الدرجة:</dt>
          <dd>{specialization.degree_type}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>عدد سنوات الدراسة:</dt>
          <dd>{specialization.academic_year_number}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الأيقونة:</dt>
          <dd>
            {specialization.icon ? (
              <img
                src={specialization.icon.startsWith('http') ? specialization.icon : `/storage/${specialization.icon}`}
                alt={specialization.name}
                style={{ maxWidth: 150, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            ) : (
              '--'
            )}
          </dd>
        </dl>

        <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
          <Link
            href={route('adminspecializations.edit', { adminspecialization: specialization.id })}
            className="action-btn edit-btn"
            style={{ minWidth: 100 }}
          >
            تعديل
          </Link>
          <Link
            href={route('adminspecializations.index')}
            className="action-btn view-btn"
            style={{ background: '#e2e8f0', color: '#3059d5', minWidth: 100 }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
