import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function OfficialLinkIndex({ auth, officialLinks, stats }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="form-title" style={{ marginBottom: 0 }}>
          الروابط الرسمية
        </h2>
      }
    >
      <Head title="الروابط الرسمية" />

      <div className="modern-table-container">
        <div
          className="filter-bar"
          style={{ justifyContent: 'space-between', marginBottom: '30px' }}
        >
          <h2 className="form-title" style={{ margin: 0, fontSize: '22px' }}>
            قائمة الروابط الرسمية
          </h2>
          <Link href={route('official-links.create')} className="add-btn">
            إضافة رابط جديد
          </Link>
        </div>

        {/* كروت الإحصائيات */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              background: '#eaf4ff',
              padding: '16px 24px',
              borderRadius: '14px',
              minWidth: '160px',
              textAlign: 'center',
              flex: '1',
            }}
          >
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>
              إجمالي الروابط
            </div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#2c3e50' }}>
              {stats.total}
            </div>
          </div>
          <div
            style={{
              background: '#e7ffe9',
              padding: '16px 24px',
              borderRadius: '14px',
              minWidth: '160px',
              textAlign: 'center',
              flex: '1',
            }}
          >
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>
              الروابط الحديثة
            </div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>
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
            {officialLinks.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    color: '#b3b3b3',
                    fontWeight: 'bold',
                    padding: '40px 0',
                    textAlign: 'center',
                  }}
                >
                  لا توجد روابط حاليا
                </td>
              </tr>
            ) : (
              officialLinks.map(link => (
                <tr key={link.id}>
                  <td className="truncate" style={{ maxWidth: '230px' }} title={link.entity_name}>
                    {link.entity_name}
                  </td>
                  <td>
                    {link.link ? (
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link"
                      >
                        زيارة
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <Link
                        title="عرض"
                        href={route('official-links.show', link.id)}
                        className="action-btn view-btn"
                      >
                        👁️
                      </Link>
                      <Link
                        title="تعديل"
                        href={route('official-links.edit', link.id)}
                        className="action-btn edit-btn"
                      >
                        ✏️
                      </Link>
                      <Link
                        title="حذف"
                        href={route('official-links.destroy', link.id)}
                        method="delete"
                        as="button"
                        className="action-btn delete-btn"
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
