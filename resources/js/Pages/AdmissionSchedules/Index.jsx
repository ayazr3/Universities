import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AdmissionScheduleIndex({ auth, schedules, stats }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>جداول القبول</h2>}
    >
      <Head title="جداول القبول" />

      <div className="modern-table-container">

        {/* شريط الفلترة وزر الإضافة */}
        <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 className="form-title" style={{ margin: 0, fontSize: "22px" }}>قائمة جداول القبول</h2>
          <Link
            href={route('admissionSchedule.create')}
            className="add-btn"
          >
            إضافة جدول جديد
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

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>التفاصيل</th>
              <th>التاريخ</th>
              <th>المسؤول</th>
              <th>الملف</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد جداول حالياً
                </td>
              </tr>
            ) : (
              schedules.map(schedule => (
                <tr key={schedule.id}>
                  <td className="truncate" style={{ maxWidth: '230px' }} title={schedule.title}>
                    {schedule.title}
                  </td>
                  <td className="truncate" style={{ maxWidth: '300px' }} title={schedule.body}>
                    {schedule.body.length > 100 ? schedule.body.substring(0, 100) + '...' : schedule.body}
                  </td>
                  <td>{new Date(schedule.date).toLocaleDateString('ar-EG')}</td>
                  <td>{schedule.name}</td>
                  <td>
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
                      <span style={{ color: '#b3b3b3' }}>لا يوجد ملف</span>
                    )}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('admissionSchedule.show', schedule.id)}
                        className="action-btn view-btn"
                      >👁️</Link>
                      <Link
                        title="تعديل"
                        href={route('admissionSchedule.edit', schedule.id)}
                        className="action-btn edit-btn"
                      >✏️</Link>
                      <Link
                        title="حذف"
                        href={route('admissionSchedule.destroy', schedule.id)}
                        method="delete"
                        as="button"
                        className="action-btn delete-btn"
                        confirm="هل أنت متأكد من حذف هذا الجدول؟"
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
