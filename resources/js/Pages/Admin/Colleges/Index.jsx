// import React from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, useForm } from '@inertiajs/react';
// import '@/Components/Admin/Style/Style.css';

// export default function Index({ auth, colleges, stats }) {
//   const { delete: destroy } = useForm();

//   const handleDelete = (id) => {
//     if (confirm("هل أنت متأكد من حذف الكلية؟")) {
//       destroy(route('Admincolleges.destroy', id));
//     }
//   };

//   return (
//     <AuthenticatedLayout user={auth.user}>
//       <Head title="الكليات" />
//       <div className="modern-table-container">
//         <div className="table-header-bar" style={{ marginBottom: 20 }}>
//           <h1 className="dashboard-title">الكليات</h1>
//           <Link href={route('Admincolleges.create')} className="add-btn">
//             إضافة كلية
//           </Link>
//         </div>

//         <div className="stats-row" style={{ marginBottom: 20, color: '#34495e', fontSize: 16, display: 'flex', gap: 20 }}>
//           <div>الإجمالي: <b>{stats.total}</b></div>
//           <div>جديدة آخر أسبوع: <b>{stats.recent}</b></div>
//         </div>

//         <table className="modern-table" style={{ minWidth: 700 }}>
//           <thead>
//             <tr>
//               <th className="col-num">#</th>
//               <th className="col-image">الصورة</th>
//               <th className="col-name">الاسم</th>
//               <th className="col-location">المحافظة</th>
//               <th className="col-established">تاريخ التأسيس</th>
//               <th className="col-students">عدد الطلاب</th>
//               <th className="col-actions">خيارات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {colleges.length > 0 ? colleges.map((college, idx) => (
//               <tr key={college.id}>
//                 <td className="col-num">{idx + 1}</td>
//                 <td className="col-image">
//                   {college.image && (
//                     <img
//                         src={
//                             college.image && college.image.startsWith('http')
//                             ? college.image
//                             : college.image
//                             ? `/storage/${college.image}`
//                             : '/images/college-placeholder.png' // صورة افتراضية إن لم توجد صورة
//                         }
//                         alt={college.name}
//                         style={{ width: '100%', borderRadius: 14, marginBottom: 14, border: '1px solid #eee' }}
//                     />
//                   )}
//                 </td>
//                 <td className="col-name">{college.name}</td>
//                 <td className="col-location">{college.governorate?.name ?? '--'}</td>
//                 <td className="col-established">{college.establishment_year}</td>
//                 <td className="col-students">{college.student_count}</td>
//                 <td className="col-actions actions-cell">
//                   <Link href={route('Admincolleges.show', college.id)} className="action-btn view-btn" title="عرض">
//                     عرض
//                   </Link>
//                   <Link href={route('Admincolleges.edit', college.id)} className="action-btn edit-btn" title="تعديل">
//                     تعديل
//                   </Link>
//                   <button
//                     type="button"
//                     className="action-btn delete-btn"
//                     title="حذف"
//                     onClick={() => handleDelete(college.id)}
//                   >
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan={7} style={{ textAlign: 'center', color: '#757575' }}>
//                   لا توجد بيانات
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // لا تستورد Inertia من هنا
import { Inertia } from '@inertiajs/inertia'; // استورد Inertia من هذا المسار الصحيح
import '@/Components/Admin/Style/Style.css';



export default function Index({ auth, colleges, stats }) {

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف الكلية؟")) {
      Inertia.delete(route('Admincolleges.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="الكليات" />
      <div className="modern-table-container">
        <div className="table-header-bar" style={{ marginBottom: 20 }}>
          <h1 className="dashboard-title">الكليات</h1>
          <Link href={route('Admincolleges.create')} className="add-btn">
            إضافة كلية
          </Link>
        </div>

        <div className="stats-row" style={{ marginBottom: 20, color: '#34495e', fontSize: 16, display: 'flex', gap: 20 }}>
          <div>الإجمالي: <b>{stats.total}</b></div>
          <div>جديدة آخر أسبوع: <b>{stats.recent}</b></div>
        </div>

        <table className="modern-table" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th className="col-num">#</th>
              <th className="col-image">الصورة</th>
              <th className="col-name">الاسم</th>
              <th className="col-location">المحافظة</th>
              <th className="col-established">تاريخ التأسيس</th>
              <th className="col-students">عدد الطلاب</th>
              <th className="col-actions">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {colleges.length > 0 ? colleges.map((college, idx) => (
              <tr key={college.id}>
                <td className="col-num">{idx + 1}</td>
                <td className="col-image">
                  {college.image && (
                    <img
                      src={
                        college.image.startsWith('http')
                          ? college.image
                          : `/storage/${college.image}`
                      }
                      alt={college.name}
                      style={{ width: '100%', borderRadius: 14, marginBottom: 14, border: '1px solid #eee' }}
                    />
                  )}
                </td>
                <td className="col-name">{college.name}</td>
                <td className="col-location">{college.governorate?.name ?? '--'}</td>
                <td className="col-established">{college.establishment_year}</td>
                <td className="col-students">{college.student_count}</td>
                <td className="col-actions actions-cell">
                  <Link href={route('Admincolleges.show', college.id)} className="action-btn view-btn" title="عرض">
                    عرض
                  </Link>
                  <Link href={route('Admincolleges.edit', college.id)} className="action-btn edit-btn" title="تعديل">
                    تعديل
                  </Link>
                  <button
                    type="button"
                    className="action-btn delete-btn"
                    title="حذف"
                    onClick={() => handleDelete(college.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#757575' }}>
                  لا توجد بيانات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
