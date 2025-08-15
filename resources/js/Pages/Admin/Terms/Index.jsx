// resources/js/Pages/Admin/Terms/Index.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import '@/Components/Admin/Style/Style.css';

const truncateWords = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function TermIndex({ auth, terms, stats }) {
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الشرط؟')) {
      Inertia.delete(route('terms.destroy', id));
    }
  };

  const filteredTerms = terms.filter(term =>
    term.title?.toLowerCase().includes(search.toLowerCase()) ||
    term.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إدارة الشروط" />
      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>

        {/* عنوان الصفحة وزر الإضافة */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم الشروط</span>
          <Link href={route('terms.create')} className="add-btn">إضافة شرط جديد</Link>
        </div>

        {/* شريط البحث */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="ابحث في العنوان أو المحتوى..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* إحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1'
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
            flex: '1'
          }}>
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>الشروط الحديثة</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>المحتوى</th>
              <th>النوع</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredTerms.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '40px 0', textAlign: 'center', fontWeight: 'bold', color: '#b3b3b3' }}>
                  لا توجد شروط للعرض.
                </td>
              </tr>
            ) : (
              filteredTerms.map(term => (
                <tr key={term.id}>
                  <td title={term.title}>{truncateWords(term.title)}</td>
                  <td title={term.content}>{truncateWords(term.content)}</td>
                  <td>{term.type === 'termsofservice' ? 'شروط الخدمة' : 'سياسة الخصوصية'}</td>
                  <td>
                    <div className="actions-cell">
                      <Link href={route('terms.show', term.id)} title="عرض">👁️</Link>
                      <Link href={route('terms.edit', term.id)} title="تعديل">✏️</Link>
                      <button type="button" title="حذف" onClick={() => handleDelete(term.id)}>🗑️</button>
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
