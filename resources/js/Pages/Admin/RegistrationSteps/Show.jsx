import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function RegistrationStepShow({ registrationstep, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل خطوة التسجيل</h2>}
    >
      <Head title="تفاصيل خطوة التسجيل" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div
          className="modern-card"
          style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: "#fff" }}
        >

          {/* عنوان الخطوة */}
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{registrationstep.step_name}</h2>

          {/* الوصف */}
          <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
            <span className="label" style={{ marginBottom: '5px' }}>الوصف:</span>
            <p className="text-gray-700 whitespace-pre-line" style={{ margin: 0 }}>
              {registrationstep.description}
            </p>
          </div>

          {/* الخطوات الفرعية */}
          <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px', marginTop: 16 }}>
            <span className="label" style={{ marginBottom: '5px' }}>الخطوات الفرعية:</span>
            {Array.isArray(registrationstep.sub_step) && registrationstep.sub_step.length > 0 ? (
              <ol className="list-decimal list-inside space-y-1" style={{ paddingInlineStart: '20px', margin: 0 }}>
                {registrationstep.sub_step.map((sub, idx) => (
                  <li key={idx}>{sub}</li>
                ))}
              </ol>
            ) : (
              <span className="text-gray-400">لا يوجد خطوات فرعية</span>
            )}
          </div>

          {/* أزرار الإجراءات */}
          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
            <Link
              href={route('registrationstep.edit', registrationstep.id)}
              className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
            >
              تعديل
            </Link>
            <Link
              href={route('registrationstep.index')}
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
