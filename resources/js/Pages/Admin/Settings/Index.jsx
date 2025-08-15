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

export default function SettingIndex({ auth, settings, stats }) {
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف هذا الإعداد؟")) {
      Inertia.delete(route('settings.destroy', id));
    }
  };

  // بحث نصي في اسم الموقع أو الوصف (يمكن توسيعه حسب الحاجة)
  const filteredSettings = settings.filter(setting =>
    setting.site_name?.toLowerCase().includes(search.toLowerCase()) ||
    setting.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إدارة الإعدادات" />
      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>

        {/* عنوان الصفحة وزر الإضافة */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم الإعدادات</span>
          <Link href={route('settings.create')} className="add-btn">
            إضافة إعداد جديد
          </Link>
        </div>

        {/* شريط البحث */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="ابحث في اسم الموقع أو الوصف..."
            className="search-input"
            aria-label="بحث"
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
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي الإعدادات</div>
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
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>إعدادات جديدة هذا الأسبوع</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول الإعدادات */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم الموقع</th>
              <th className="col-image">الشعار</th>
              <th className="col-description">الوصف</th>
              <th className="col-location">الموقع (خريطة)</th>
              <th className="col-url">رابط الموقع</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSettings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ color: '#b3b3b3', fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد إعدادات للعرض.
                </td>
              </tr>
            ) : (
              filteredSettings.map(setting => (
                <tr key={setting.id}>
                  {/* اسم الموقع */}
                  <td className="col-name" title={setting.site_name}>
                    {truncateWords(setting.site_name)}
                  </td>

                  {/* الشعار */}
                  <td className="col-image">
                    {setting.logo ? (
                      <img
                        src={setting.logo.startsWith('http') ? setting.logo : `/storage/${setting.logo}`}
                        alt={setting.site_name}
                        className="table-image"
                        style={{ maxHeight: 60, objectFit: 'contain' }}
                      />
                    ) : 'لا يوجد'}
                  </td>

                  {/* الوصف */}
                  <td className="col-description" title={setting.description}>
                    {truncateWords(setting.description)}
                  </td>

                  {/* الموقع */}
                  <td className="col-location" style={{ minWidth: "160px", maxWidth: 180 }}>
                    <SettingMap
                      lat={setting.location?.lat || 24.7136}
                      lng={setting.location?.lng || 46.6753}
                      editable={false}
                      height={120}
                    />
                  </td>

                  {/* رابط الموقع */}
                  <td className="col-url">
                    <a
                      href={setting.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-link"
                    >
                      زيارة
                    </a>
                  </td>

                  {/* الإجراءات */}
                  <td>
                    <div className="actions-cell">
                      <Link href={route('settings.show', setting.id)} title="عرض">👁️</Link>
                      <Link href={route('settings.edit', setting.id)} title="تعديل">✏️</Link>
                      <button
                        type="button"
                        title="حذف"
                        onClick={() => handleDelete(setting.id)}
                      >
                        🗑️
                      </button>
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
