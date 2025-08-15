import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function RegistrationStepShow({ registrationstep, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل خطوة التسجيل - ${registrationstep.step_name}`} />

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
        {/* عنوان الخطوة */}
        <h1 className="form-title" style={{ marginBottom: 22, fontSize: '1.7rem' }}>
          {registrationstep.step_name}
        </h1>

        {/* التفاصيل */}
        <div className="details-grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>

              {/* الوصف */}
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الوصف:</dt>
              <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>
                {registrationstep.description}
              </dd>

              {/* الخطوات الفرعية */}
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الخطوات الفرعية:</dt>
              <dd>
                {Array.isArray(registrationstep.sub_step) && registrationstep.sub_step.length > 0 ? (
                  <ol className="sub-steps-list">
                    {registrationstep.sub_step.map((sub, idx) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ol>
                ) : (
                  <span style={{ color: '#b3b3b3' }}>لا يوجد خطوات فرعية</span>
                )}
              </dd>

            </dl>
          </div>
        </div>

        {/* أزرار تعديل ورجوع */}
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
    </AuthenticatedLayout>
  );
}
