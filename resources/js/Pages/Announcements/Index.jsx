import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css'; // تأكد من مسار ملف الستايل

export default function AnnouncementIndex({ auth, announcements, stats }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>الإعلانات</h2>}
    >
      <Head title="الإعلانات" />

      <div className="modern-table-container">

        {/* شريط الفلترة وزر الإضافة */}
        <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="form-title" style={{ margin: 0, fontSize: "22px" }}>قائمة الإعلانات</h2>
          <Link
            href={route('announcement.create')}
            className="add-btn"
          >
            إنشاء إعلان جديد
          </Link>
        </div>

        {/* كرت الإحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: "#eaf4ff",
            padding: "16px 24px",
            borderRadius: "14px",
            minWidth: "160px",
            textAlign: "center",
            flex: "1"
          }}>
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>إجمالي الإعلانات</div>
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
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>الإعلانات الحديثة</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>الناشر</th>
              <th>تاريخ النشر</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign:'center' }}>
                  لا توجد إعلانات حالياً
                </td>
              </tr>
            ) : (
              announcements.map(announcement => (
                <tr key={announcement.id}>
                  <td className="truncate" style={{ maxWidth: '230px' }} title={announcement.title}>
                    {announcement.title}
                  </td>
                  <td>{announcement.publisher}</td>
                  <td>{announcement.publish_date}</td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('announcement.show', announcement.id)}
                        className="action-btn view-btn"
                      >👁️</Link>
                      <Link
                        title="تعديل"
                        href={route('announcement.edit', announcement.id)}
                        className="action-btn edit-btn"
                      >✏️</Link>
                      <Link
                        title="حذف"
                        href={route('announcement.destroy', announcement.id)}
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
