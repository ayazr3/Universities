import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

// دالة تقصير النصوص الطويلة
const truncateWords = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function FaqIndex({ auth, faqs, stats }) {
  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف السؤال؟")) {
      Inertia.delete(route('faq.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="الأسئلة الشائعة" />
      <div className="modern-table-container" style={{ maxWidth: '85%', margin: '40px auto' }}>

        {/* رأس الصفحة */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم الأسئلة الشائعة</span>
          <Link href={route('faq.create')} className="add-btn">
            إضافة سؤال
          </Link>
        </div>

        {/* كروت الإحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1'
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي الأسئلة</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#2c3e50' }}>{stats.total}</div>
          </div>
          <div style={{
            background: '#e7ffe9',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1'
          }}>
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>الأسئلة الحديثة</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول الأسئلة */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-question">السؤال</th>
              <th className="col-answer">الإجابة</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد أسئلة شائعة حالياً
                </td>
              </tr>
            ) : (
              faqs.map(faq => (
                <tr key={faq.id}>
                  <td className="col-question" title={faq.question}>{truncateWords(faq.question)}</td>
                  <td className="col-answer" title={faq.answer}>{truncateWords(faq.answer)}</td>
                  <td className="col-actions">
                    <button
                      className="icon-btn"
                      title="عرض"
                      onClick={() => Inertia.visit(route('faq.show', faq.id))}
                    >
                      👁️
                    </button>
                    <button
                      className="icon-btn"
                      title="تعديل"
                      onClick={() => Inertia.visit(route('faq.edit', faq.id))}
                    >
                      ✏️
                    </button>
                    <button
                      className="icon-btn"
                      title="حذف"
                      onClick={() => handleDelete(faq.id)}
                    >
                      🗑️
                    </button>
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
