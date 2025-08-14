import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AdmissionScheduleIndex({ auth, schedules, stats }) {

  const [search, setSearch] = useState('');

  // دالة لحذف الجدول
  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الجدول؟')) {
      Inertia.delete(route('admissionSchedule.destroy', id));
    }
  };

  // تقصير النص لعدد كلمات محدد
  const truncateWords = (text, wordLimit = 4) => {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // تصفية الجداول بالبحث
  const filteredSchedules = schedules.filter(schedule =>
    schedule.title?.toLowerCase().includes(search.toLowerCase()) ||
    schedule.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="جداول القبول" />

      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>

        {/* رأس الصفحة */}
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم جداول القبول</span>
          <Link href={route('admissionSchedule.create')} className="add-btn">
            + إضافة جدول جديد
          </Link>
        </div>

        {/* شريط البحث */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="بحث عن جدول..."
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
            background: "#eaf4ff",
            padding: "16px 24px",
            borderRadius: "14px",
            minWidth: "160px",
            textAlign: "center",
            flex: "1"
          }}>
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>إجمالي الجداول</div>
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
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>الجداول الحديثة</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول جداول القبول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">العنوان</th>
              <th className="col-summary">التفاصيل</th>
              <th className="col-date">التاريخ</th>
              <th className="col-manager">المسؤول</th>
              <th className="col-file">الملف</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد جداول حالياً
                </td>
              </tr>
            ) : (
              filteredSchedules.map(schedule => (
                <tr key={schedule.id}>
                  <td className="col-name" title={schedule.title}>{truncateWords(schedule.title)}</td>
                  <td className="col-summary" title={schedule.body}>{truncateWords(schedule.body)}</td>
                  <td className="col-date">{new Date(schedule.date).toLocaleDateString('ar-EG')}</td>
                  <td className="col-manager">{schedule.name}</td>
                  <td className="col-file">
                    {schedule.file_url ? (
                      <a
                        href={`/storage/${schedule.file_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link"
                      >
                        عرض الملف
                      </a>
                    ) : (
                      <span style={{ color: '#999', fontSize: '13px' }}>لا يوجد ملف</span>
                    )}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link href={route('admissionSchedule.show', schedule.id)} title="عرض">👁️</Link>
                      <Link href={route('admissionSchedule.edit', schedule.id)} title="تعديل" >✏️</Link>
                      <button
                        type="button"
                        title="حذف"
                        onClick={() => handleDelete(schedule.id)}
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
