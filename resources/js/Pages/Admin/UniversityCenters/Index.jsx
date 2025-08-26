import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css';

const truncateWords = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function Index({ auth, universityCenters, stats }) {
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف المركز؟")) {
      Inertia.delete(route('adminuniversitycenters.destroy', id));
    }
  };

  const filteredCenters = universityCenters.filter(center =>
    center.name?.toLowerCase().includes(search.toLowerCase()) ||
    center.governorate?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="المراكز الجامعية" />
      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>

        <div className="table-header-bar">
          <span className="dashboard-title">المراكز الجامعية</span>
          <Link href={route('adminuniversitycenters.create')} className="add-btn">
            إضافة مركز جديد
          </Link>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="بحث عن مركز أو محافظة..."
            className="search-input"
            aria-label="بحث"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">بحث</button>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي المراكز</div>
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
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>مراكز جديدة هذا الأسبوع</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم المركز</th>
              <th className="col-description">الوصف</th>
              <th className="col-governorate">المحافظة</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredCenters.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ color: '#b3b3b3', fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد مراكز للعرض.
                </td>
              </tr>
            ) : (
              filteredCenters.map(center => (
                <tr key={center.id}>
                  <td className="col-name" title={center.name}>{truncateWords(center.name)}</td>
                  <td className="col-description" title={center.description}>{truncateWords(center.description)}</td>
                  <td className="col-governorate">{center.governorate?.name || '--'}</td>
                  <td>
                    <div className="actions-cell">
                      <Link href={route('adminuniversitycenters.show', center.id)} title="عرض">👁️</Link>
                      <Link href={route('adminuniversitycenters.edit', center.id)} title="تعديل">✏️</Link>
                      <button type="button" title="حذف" onClick={() => handleDelete(center.id)}>🗑️</button>
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
