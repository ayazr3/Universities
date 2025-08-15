import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

// دالة لتقصير النص
const truncateWords = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function RegistrationStepIndex({ auth, steps, stats }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="خطوات التسجيل" />

      <div className="modern-table-container" style={{ maxWidth: '90%', margin: '40px auto' }}>

        {/* العنوان وزر الإضافة */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم خطوات التسجيل على المفاضلة</span>
          <Link href={route('registrationstep.create')} className="add-btn">
            إضافة خطوة
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
              <th className="colStepTitle">اسم الخطوة</th>
              <th className="colStepSummary">الوصف</th>
              <th className="colStepSubSteps">الخطوات الفرعية</th>
              <th className="colStepActions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {steps.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد خطوات تسجيل حالياً
                </td>
              </tr>
            ) : (
              steps.map(step => (
                <tr key={step.id}>
                  <td className="colStepTitle" title={step.step_name}>
                    {truncateWords(step.step_name)}
                  </td>
                  <td className="colStepSummary" title={step.description}>
                    {truncateWords(step.description)}
                  </td>
                  <td className="colStepSubSteps" title={Array.isArray(step.sub_step) ? step.sub_step.join(', ') : ''}>
                    {Array.isArray(step.sub_step) && step.sub_step.length > 0
                      ? truncateWords(step.sub_step.join(', '), 4)
                      : <span style={{ color: "#b3b3b3" }}>لا يوجد خطوات فرعية</span>}
                  </td>
                  <td className="colStepActions">
                    <Link
                      href={route('registrationstep.show', step.id)}
                      title="عرض"
                      className="icon-btn"
                    >👁️</Link>
                    <Link
                      href={route('registrationstep.edit', step.id)}
                      title="تعديل"
                      className="icon-btn"
                    >✏️</Link>
                    <Link
                      href={route('registrationstep.destroy', step.id)}
                      method="delete"
                      as="button"
                      title="حذف"
                      className="icon-btn"
                      onClick={() => confirm('هل أنت متأكد من الحذف؟')}
                    >🗑️</Link>
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
