import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css'; // تأكد من مسار ملف CSS

export default function FaqIndex({ auth, faqs, stats }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>الأسئلة الشائعة</h2>}
    >
      <Head title="الأسئلة الشائعة" />

      <div className="modern-table-container">

        {/* شريط الفلترة مع زر الإضافة */}
        <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="form-title" style={{ margin: 0, fontSize: "22px" }}>قائمة الأسئلة الشائعة</h2>
          <Link href={route('faq.create')} className="add-btn">
            إضافة سؤال جديد
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
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>إجمالي الأسئلة</div>
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
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>الأسئلة الحديثة</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>السؤال</th>
              <th>الإجابة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0' }}>
                  لا توجد أسئلة شائعة حالياً
                </td>
              </tr>
            ) : (
              faqs.map(faq => (
                <tr key={faq.id}>
                  <td className="truncate" style={{ maxWidth: '300px' }} title={faq.question}>
                    {faq.question}
                  </td>
                  <td className="truncate" style={{ maxWidth: '400px' }} title={faq.answer}>
                    {faq.answer}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('faq.show', faq.id)}
                        className="action-btn view-btn"
                      >👁️</Link>
                      <Link
                        title="تعديل"
                        href={route('faq.edit', faq.id)}
                        className="action-btn edit-btn"
                      >✏️</Link>
                      <Link
                        title="حذف"
                        href={route('faq.destroy', faq.id)}
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
