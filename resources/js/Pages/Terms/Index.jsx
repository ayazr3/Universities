import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function TermIndex({ auth, terms, stats }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>الشروط</h2>}
    >
      <Head title="الشروط" />

      <div className="modern-table-container">

        {/* شريط الفلترة وزر الإضافة */}
        <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="form-title" style={{ margin: 0, fontSize: '22px' }}>قائمة الشروط</h2>
          <Link href={route('terms.create')} className="add-btn">
            إضافة شرط جديد
          </Link>
        </div>

        {/* كروت الإحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي الشروط</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#2c3e50' }}>{stats.total}</div>
          </div>
          <div style={{
            background: '#e7ffe9',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>الشروط الحديثة</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>المحتوى</th>
              <th>النوع</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {terms.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: '#b3b3b3', fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد شروط حاليا
                </td>
              </tr>
            ) : (
              terms.map(term => (
                <tr key={term.id}>
                  <td className="truncate" style={{ maxWidth: '230px' }} title={term.title}>
                    {term.title}
                  </td>
                  <td className="truncate" style={{ maxWidth: '300px' }} title={term.content}>
                    {term.content.length > 100 ? `${term.content.substring(0, 100)}...` : term.content}
                  </td>
                  <td>
                    {term.type === 'termsofservice' ? 'شروط الخدمة' : 'سياسة الخصوصية'}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('terms.show', term.id)}
                        className="action-btn view-btn"
                      >
                        👁️
                      </Link>
                      <Link
                        title="تعديل"
                        href={route('terms.edit', term.id)}
                        className="action-btn edit-btn"
                      >
                        ✏️
                      </Link>
                      <Link
                        title="حذف"
                        href={route('terms.destroy', term.id)}
                        method="delete"
                        as="button"
                        className="action-btn delete-btn"
                        confirm="هل أنت متأكد من حذف هذا الشرط؟"
                      >
                        🗑️
                      </Link>
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
