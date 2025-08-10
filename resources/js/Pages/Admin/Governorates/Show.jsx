import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GovernorateShow({ governorate, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل ${governorate.name}`} />

      <div
        className="panel"
        style={{
          maxWidth: 600,
          margin: '40px auto',
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 12px 24px rgba(58,141,222,0.15)',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        {/* عنوان المحافظة */}
        <h1 className="form-title" style={{ marginBottom: 20 }}>
          {governorate.name}
        </h1>

        {/* تفاصيل المحافظة */}
        <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e', marginBottom: 30 }}>
          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>اسم المحافظة</dt>
          <dd>{governorate.name}</dd>

          <dt style={{ fontWeight: 'bold', marginTop: 8 }}>تاريخ الإنشاء</dt>
          <dd>{new Date(governorate.created_at).toLocaleDateString('ar-EG')}</dd>
        </dl>

        {/* أزرار الإجراءات */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
          <Link
            href={route('governorates.edit', governorate.id)}
            className="action-btn edit-btn"
            style={{ minWidth: 100, textAlign: 'center' }}
          >
            تعديل
          </Link>

          <Link
            href={route('governorates.index')}
            className="action-btn view-btn"
            style={{
              background: '#eaf4ff',
              color: '#3059d5',
              minWidth: 100,
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
