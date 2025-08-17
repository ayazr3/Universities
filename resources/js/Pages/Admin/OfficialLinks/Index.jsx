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

export default function OfficialLinkIndex({ auth, officialLinks, stats }) {
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف هذا الرابط؟")) {
      Inertia.delete(route('official-links.destroy', id));
    }
  };

  const filteredLinks = officialLinks.filter(link =>
    link.entity_name?.toLowerCase().includes(search.toLowerCase())
    || link.link?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="الروابط الرسمية" />
      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>
        {/* الهيدر وزر الإضافة */}
        <div className="table-header-bar">
          <span className="dashboard-title">قائمة الروابط الرسمية</span>
          <Link href={route('official-links.create')} className="add-btn">
            إضافة رابط جديد
          </Link>
        </div>

        {/* بار البحث */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="بحث بالجهة أو الرابط..."
            className="search-input"
            aria-label="بحث"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* كروت الإحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff', padding: '16px 24px', borderRadius: 14,
            minWidth: 160, textAlign: 'center', flex: '1'
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>
              إجمالي الروابط
            </div>
            <div style={{ fontWeight: '800', fontSize: 22, color: '#2c3e50' }}>
              {stats.total}
            </div>
          </div>
          <div style={{
            background: '#e7ffe9', padding: '16px 24px', borderRadius: 14,
            minWidth: 160, textAlign: 'center', flex: '1'
          }}>
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>
              الروابط الحديثة
            </div>
            <div style={{ fontWeight: '800', fontSize: 22, color: '#27ae60' }}>
              {stats.recent}
            </div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>اسم الجهة</th>
              <th>الرابط</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    color: '#b3b3b3', fontWeight: 'bold',
                    padding: '40px 0', textAlign: 'center'
                  }}
                >
                  لا توجد روابط حاليا
                </td>
              </tr>
            ) : (
              filteredLinks.map(link => (
                <tr key={link.id}>
                  <td className="truncate" style={{ maxWidth: 230 }} title={link.entity_name}>
                    {truncateWords(link.entity_name)}
                  </td>
                  <td>
                    {link.link ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link"
                      >زيارة</a>
                    ) : '—'}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('official-links.show', link.id)}
                        
                      >👁️</Link>
                      <Link
                        title="تعديل"
                        href={route('official-links.edit', link.id)}

                      >✏️</Link>
                      <button
                        type="button"
                        title="حذف"

                        onClick={() => handleDelete(link.id)}
                      >🗑️</button>
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
