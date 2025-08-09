// import React from 'react';
// import { Head, Link } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import '@/Components/Admin/Style/Style.css';

// export default function GovernoratesIndex({ auth, governorates, stats }) {
//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={<h2 className="form-title" style={{ marginBottom: 0 }}>المحافظات</h2>}
//     >
//       <Head title="المحافظات" />
//       <div className="modern-table-container">
//         {/* شريط الإحصائيات وزر الإضافة */}
//         <div className="filter-bar" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
//           <h2 className="form-title" style={{ margin: 0, fontSize: "22px" }}>قائمة المحافظات</h2>
//           <Link href={route('governorates.create')} className="add-btn">إضافة محافظة</Link>
//         </div>
//         <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
//           <div style={{
//             background: "#eaf4ff", padding: "16px 24px", borderRadius: "14px",
//             minWidth: "160px", textAlign: "center", flex: "1"
//           }}>
//             <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>عدد المحافظات</div>
//             <div style={{ fontWeight: "800", fontSize: "22px", color: "#2c3e50" }}>{stats.total}</div>
//           </div>
//           <div style={{
//             background: "#e7ffe9", padding: "16px 24px", borderRadius: "14px", minWidth: "160px",
//             textAlign: "center", flex: "1"
//           }}>
//             <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>الجديدة (7 أيام)</div>
//             <div style={{ fontWeight: "800", fontSize: "22px", color: "#27ae60" }}>{stats.recent}</div>
//           </div>
//         </div>
//         <table className="modern-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>اسم المحافظة</th>
//               <th>أنشئت في</th>
//               <th>الإجراءات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {governorates.length === 0 ? (
//               <tr>
//                 <td colSpan={4} style={{ color: "#b3b3b3", fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
//                   لا يوجد محافظات حالياً
//                 </td>
//               </tr>
//             ) : (
//               governorates.map((gov, i) => (
//                 <tr key={gov.id}>
//                   <td>{i + 1}</td>
//                   <td>{gov.name}</td>
//                   <td>{new Date(gov.created_at).toLocaleDateString('ar-EG')}</td>
//                   <td>
//                     <div className="actions-cell">
//                       <Link href={route('governorates.show', gov.id)} className="action-btn view-btn">👁️</Link>
//                       <Link href={route('governorates.edit', gov.id)} className="action-btn edit-btn">✏️</Link>
//                       <Link
//                         href={route('governorates.destroy', gov.id)}
//                         method="delete" as="button"
//                         className="action-btn delete-btn"
//                         confirm="هل أنت متأكد من حذف هذه المحافظة؟"
//                       >🗑️</Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GovernoratesIndex({ auth, governorates, stats }) {
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه المحافظة؟')) {
      Inertia.delete(route('governorates.destroy', id));
    }
  };

  // فلترة حسب البحث
  const filtered = governorates.filter(gov =>
    gov.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="المحافظات" />
      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>

        {/* العنوان + زر الإضافة */}
        <div className="table-header-bar">
          <span className="dashboard-title">المحافظات</span>
          <Link href={route('governorates.create')} className="add-btn">إضافة محافظة</Link>
        </div>

        {/* البحث */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="بحث عن محافظة..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* الإحصائيات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: "#eaf4ff", padding: "16px 24px", borderRadius: "14px",
            minWidth: "160px", textAlign: "center", flex: "1"
          }}>
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>إجمالي المحافظات</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#2c3e50" }}>{stats.total}</div>
          </div>
          <div style={{
            background: "#e7ffe9", padding: "16px 24px", borderRadius: "14px",
            minWidth: "160px", textAlign: "center", flex: "1"
          }}>
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>الجديدة (7 أيام)</div>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول المحافظات */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم المحافظة</th>
              <th className="col-date">أنشئت في</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ color: "#b3b3b3", fontWeight: "bold", padding: "40px 0", textAlign: "center" }}>
                  لا توجد محافظات مطابقة
                </td>
              </tr>
            ) : (
              filtered.map((gov) => (
                <tr key={gov.id}>
                  <td className="col-name">{gov.name}</td>
                  <td className="col-date">{new Date(gov.created_at).toLocaleDateString('ar-EG')}</td>
                  <td className="col-actions">
                    <div className="actions-cell">
                      <Link href={route('governorates.show', gov.id)} >👁️</Link>
                      <Link href={route('governorates.edit', gov.id)} >✏️</Link>
                      <button
                        onClick={() => handleDelete(gov.id)}
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
