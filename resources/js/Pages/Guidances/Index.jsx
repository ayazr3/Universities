import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css'

export default function GuidanceIndex({ auth, guidances, stats }) {
  return (
    <AuthenticatedLayout user={auth.user} header={
      <h2 className="form-title" style={{marginBottom: 0}}>التوجيهات والدعم</h2>
    }>
      <Head title="التوجيهات والدعم" />
      <div className="modern-table-container">
        <div className="filter-bar" style={{justifyContent: 'space-between', marginBottom: '30px'}}>
          <h2 className="form-title" style={{margin: 0, fontSize: "22px"}}>قائمة التوجيهات</h2>
          <Link
            href={route('guidances.create')}
            className="add-btn"
          >
            إضافة توجيه جديد
          </Link>
        </div>

        {/* كرت الإحصائيات */}
        <div style={{display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap'}}>
          <div style={{
              background: "#eaf4ff",
              padding: "16px 24px",
              borderRadius: "14px",
              minWidth: "160px",
              textAlign: "center",
              flex: "1"
          }}>
            <div style={{fontWeight: "700", color: "#26547c", marginBottom: 4}}>إجمالي التوجيهات</div>
            <div style={{fontWeight: "800", fontSize: "22px", color: "#2c3e50"}}>{stats.total}</div>
          </div>
          <div style={{
              background: "#e7ffe9",
              padding: "16px 24px",
              borderRadius: "14px",
              minWidth: "160px",
              textAlign: "center",
              flex: "1"
          }}>
            <div style={{fontWeight: "700", color: "#229363", marginBottom: 4}}>التوجيهات الحديثة</div>
            <div style={{fontWeight: "800", fontSize: "22px", color: "#27ae60"}}>{stats.recent}</div>
          </div>
        </div>

        {/* الجدول */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>العنوان</th>
              <th>النوع</th>
              <th>الرابط</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {guidances.length === 0 ? (
              <tr>
                <td colSpan={4} style={{color: "#b3b3b3",fontWeight:'bold', padding:'40px 0'}}>لا توجد توجيهات حاليا</td>
              </tr>
            ): guidances.map(guidance => (
              <tr key={guidance.id}>
                <td className="truncate" style={{maxWidth:'230px'}} title={guidance.title}>{guidance.title}</td>
                <td>{guidance.type}</td>
                <td>
                  {guidance.link &&
                    <a
                      href={guidance.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-link"
                    >
                      زيارة
                    </a>
                  }
                </td>
                <td>
                  <div className="actions-cell">
                    <Link
                      title="عرض"
                      href={route('guidances.show', guidance.id)}
                      className="action-btn view-btn"
                    >👁️</Link>
                    <Link
                      title="تعديل"
                      href={route('guidances.edit', guidance.id)}
                      className="action-btn edit-btn"
                    >✏️</Link>
                    <Link
                      title="حذف"
                      href={route('guidances.destroy', guidance.id)}
                      method="delete"
                      as="button"
                      className="action-btn delete-btn"
                    >🗑️</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
