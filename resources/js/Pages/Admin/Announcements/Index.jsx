import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AnnouncementIndex({ auth, announcements, stats }) {

  // دالة لتقصير النص
  const truncateWords = (text, wordLimit = 4) => {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={null}
    >
      <Head title="الإعلانات" />

      <div className="modern-table-container" style={{ maxWidth: '90%', margin: '40px auto' }}>

        {/* رأس الجدول */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم الإعلانات</span>
          <Link href={route('announcement.create')} className="add-btn">
            + إضافة إعلان
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

        {/* جدول الإعلانات */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="colAdvTitle">العنوان</th>
              <th className="colAdvSummary">الملخص</th>
              <th className="colAdvPublisher">جهة النشر</th>
              <th className="colAdvDetails">تاريخ النشر</th>
              <th className="colAdvImage">الصورة</th>
              <th className="colAdvActions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد إعلانات حالياً
                </td>
              </tr>
            ) : (
              announcements.map(announcement => (
                <tr key={announcement.id}>
                  <td className="colAdvTitle" title={announcement.title}>{truncateWords(announcement.title)}</td>
                  <td className="colAdvSummary" title={announcement.summary}>{truncateWords(announcement.summary)}</td>
                  <td className="colAdvPublisher">{truncateWords(announcement.publisher)}</td>
                  <td className="colAdvDetails">{announcement.publish_date}</td>
                  <td className="colAdvImage">
                    {announcement.image ? (
                      <img src={`/storage/${announcement.image}`} alt="صورة الإعلان" className="table-image" />
                    ) : (
                      <span style={{ color: '#999', fontSize: '13px' }}>لا توجد صورة</span>
                    )}
                  </td>
                  <td className="colAdvActions">
                    <Link
                      title="عرض"
                      href={route('announcement.show', announcement.id)}
                      className="icon-btn"
                    >
                      👁️
                    </Link>
                    <Link
                      title="تعديل"
                      href={route('announcement.edit', announcement.id)}
                      className="icon-btn"
                    >
                      ✏️
                    </Link>
                    <Link
                      title="حذف"
                      href={route('announcement.destroy', announcement.id)}
                      method="delete"
                      as="button"
                      className="icon-btn"
                    >
                      🗑️
                    </Link>
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
