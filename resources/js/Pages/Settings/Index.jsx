import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css'; // تأكد من المسار الصحيح

export default function SettingIndex({ auth, settings, stats }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title" style={{ marginBottom: 0 }}>الإعدادات</h2>}>
      <Head title="الإعدادات" />

      <div className="modern-table-container">

        {/* شريط الفلترة وزر الإضافة */}
        <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="form-title" style={{ margin: 0, fontSize: '22px' }}>قائمة الإعدادات</h2>
          <Link href={route('settings.create')} className="add-btn">
            إضافة إعداد جديد
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
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>الإعدادات الحديثة</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>اسم الموقع</th>
              <th>الموقع</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {settings.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ color: '#b3b3b3', fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد إعدادات حالياً
                </td>
              </tr>
            ) : (
              settings.map(setting => (
                <tr key={setting.id}>
                  <td className="truncate" style={{ maxWidth: '230px' }} title={setting.site_name}>
                    {setting.site_name}
                  </td>
                  <td style={{ maxWidth: 180 }}>
                    <SettingMap lat={setting.location?.lat || 24.7136} lng={setting.location?.lng || 46.6753} editable={false} height={120} />
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link href={route('settings.show', setting.id)} className="action-btn view-btn" title="عرض">👁️</Link>
                      <Link href={route('settings.edit', setting.id)} className="action-btn edit-btn" title="تعديل">✏️</Link>
                      <Link
                        href={route('settings.destroy', setting.id)}
                        method="delete"
                        as="button"
                        className="action-btn delete-btn"
                        title="حذف"
                        confirm="هل أنت متأكد من حذف هذا الإعداد؟"
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
