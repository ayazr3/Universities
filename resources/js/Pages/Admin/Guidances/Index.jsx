import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

// تقصير النص بعد عدد كلمات
const truncateWords = (text = '', wordLimit = 4) => {
  const words = text?.trim().split(/\s+/);
  if (!words) return '';
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function GuidanceIndex({ auth, guidances, stats }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // حذف التوجيه
  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف التوجيه؟")) {
      Inertia.delete(route('guidances.destroy', id));
    }
  };

  // الفلترة حسب البحث والنوع
  const filteredGuidances = guidances.filter(g =>
    (g.title?.toLowerCase().includes(search.toLowerCase()) ||
      g.description?.toLowerCase().includes(search.toLowerCase()) ||
      g.type?.toLowerCase().includes(search.toLowerCase()))
    &&
    (typeFilter ? g.type === typeFilter : true)
  );

  // للحصول على الأنواع الفريدة وحذف التكرار
  const allTypes = Array.from(new Set(guidances.map(g => g.type).filter(Boolean)));

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="التوجيهات والدعم" />
      <div className="modern-table-container" style={{ maxWidth: '90%', margin: '40px auto' }}>
        {/* رأس الصفحة */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم التوجيهات والدعم</span>
          <Link href={route('guidances.create')} className="add-btn">
            إضافة توجيه جديد
          </Link>
        </div>

        {/* الفلاتر والبحث */}
        <div className="filter-bar" style={{marginBottom:'20px', overflow:'auto', clear:'both'}}>
          <select
            className="filter-select"
            aria-label="اختر النوع"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            style={{minWidth:'120px'}}
          >
            <option value="">الكل (حسب النوع)</option>
            {allTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="بحث عن التوجيه ..."
            className="search-input"
            aria-label="بحث"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* كروت الإحصائيات (اختياري) */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي التوجيهات</div>
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
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>التوجيهات الحديثة</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول بنفس تنظيمك الحديث */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="colTitle">العنوان</th>
              <th className="colDesc">الوصف</th>
              <th className="colType">النوع</th>
              <th className="colLink">الرابط</th>
              <th className="colActions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuidances.length === 0 ? (
              <tr>
                <td colSpan="5" style={{
                  color: '#b3b3b3',
                  fontWeight: 'bold',
                  padding: '40px 0',
                  textAlign: 'center'
                }}>
                  لا توجد توجيهات حاليا
                </td>
              </tr>
            ) : (
              filteredGuidances.map(guidance => (
                <tr key={guidance.id}>
                  <td className="colTitle" title={guidance.title}>{truncateWords(guidance.title ?? '')}</td>
                  <td className="colDesc" title={guidance.description}>{truncateWords(guidance.description ?? '')}</td>
                  <td className="colType">{truncateWords(guidance.type ?? '')}</td>
                  <td className="colLink">
                    {guidance.link &&
                      <a
                        href={guidance.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link"
                      >زيارة</a>
                    }
                  </td>
                  <td className="colActions">
                    <button className="icon-btn" title="عرض"
                      onClick={() => window.location.href = route('guidances.show', guidance.id)}>
                      👁️
                    </button>
                    <button className="icon-btn" title="تعديل"
                      onClick={() => window.location.href = route('guidances.edit', guidance.id)}>
                      ✏️
                    </button>
                    <button className="icon-btn" title="حذف"
                      onClick={() => handleDelete(guidance.id)}>
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
