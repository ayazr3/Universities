import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function RegistrationStepIndex({ auth, steps, stats }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>خطوات التسجيل</h2>}
    >
      <Head title="خطوات التسجيل" />

      <div className="modern-table-container">

        {/* شريط الفلترة وزر الإضافة */}
        <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="form-title" style={{ margin: 0, fontSize: "22px" }}>قائمة خطوات التسجيل</h2>
          <Link
            href={route('registrationstep.create')}
            className="add-btn"
          >
            إضافة خطوة جديدة
          </Link>
        </div>

        {/* كروت الإحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: "#eaf4ff",
            padding: "16px 24px",
            borderRadius: "14px",
            minWidth: "160px",
            textAlign: "center",
            flex: "1"
          }}>
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>إجمالي الخطوات</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#2c3e50" }}>{stats.total}</div>
          </div>
          <div style={{
            background: "#e7ffe9",
            padding: "16px 24px",
            borderRadius: "14px",
            minWidth: "160px",
            textAlign: "center",
            flex: "1"
          }}>
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>الخطوات الحديثة</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>الخطوة</th>
              <th>الوصف</th>
              <th>الخطوات الفرعية</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {steps.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: "#b3b3b3", fontWeight:'bold', padding:'40px 0', textAlign: 'center' }}>
                  لا توجد خطوات تسجيل حالياً
                </td>
              </tr>
            ) : (
              steps.map(step => (
                <tr key={step.id}>
                  <td className="truncate" style={{ maxWidth: '230px' }} title={step.step_name}>
                    {step.step_name}
                  </td>
                  <td className="truncate" style={{ maxWidth: '300px' }} title={step.description}>
                    {step.description.length > 100 ? step.description.substring(0, 100) + "..." : step.description}
                  </td>
                  <td className="truncate" style={{ maxWidth: '300px' }} title={Array.isArray(step.sub_step) ? step.sub_step.join(', ') : ''}>
                    {Array.isArray(step.sub_step) && step.sub_step.length > 0 ? step.sub_step.join(', ') : <span style={{color:"#b3b3b3"}}>لا يوجد خطوات فرعية</span>}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('registrationstep.show', step.id)}
                        className="action-btn view-btn"
                      >👁️</Link>
                      <Link
                        title="تعديل"
                        href={route('registrationstep.edit', step.id)}
                        className="action-btn edit-btn"
                      >✏️</Link>
                      <Link
                        title="حذف"
                        href={route('registrationstep.destroy', step.id)}
                        method="delete"
                        as="button"
                        className="action-btn delete-btn"
                      >🗑️</Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </AuthenticatedLayout>
  );
}
