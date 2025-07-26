// import React from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function TermEdit({ term, auth }) {
//   const { data, setData, put, processing, errors } = useForm({
//     title: term.title || '',
//     content: term.content || '',
//     type: term.type || 'termsofservice',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     put(route('terms.update', term.id));
//   };

//   return (
//     <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل الشرط</h2>}>
//       <Head title="تعديل الشرط" />
//       <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
//         <div className="bg-white shadow-sm sm:rounded-lg p-6">
//           <form onSubmit={handleSubmit}>

//             <div className="mb-4">
//               <label htmlFor="title" className="block text-gray-700 font-bold mb-2">العنوان</label>
//               <input
//                 id="title"
//                 type="text"
//                 value={data.title}
//                 onChange={e => setData('title', e.target.value)}
//                 className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
//               />
//               {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="content" className="block text-gray-700 font-bold mb-2">المحتوى</label>
//               <textarea
//                 id="content"
//                 value={data.content}
//                 onChange={e => setData('content', e.target.value)}
//                 rows={5}
//                 className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.content ? 'border-red-500' : ''}`}
//               />
//               {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="type" className="block text-gray-700 font-bold mb-2">نوع الشرط</label>
//               <select
//                 id="type"
//                 value={data.type}
//                 onChange={e => setData('type', e.target.value)}
//                 className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.type ? 'border-red-500' : ''}`}
//               >
//                 <option value="termsofservice">شروط الخدمة</option>
//                 <option value="privacypolicy">سياسة الخصوصية</option>
//               </select>
//               {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
//             </div>

//             <div className="flex items-center justify-between">
//               <button type="submit" disabled={processing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 {processing ? 'جاري التحديث...' : 'تحديث الشرط'}
//               </button>
//               <Link href={route('terms.index')} className="text-blue-500 hover:text-blue-700">رجوع</Link>
//             </div>

//           </form>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function TermEdit({ term, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: term.title || '',
    content: term.content || '',
    type: term.type || 'termsofservice',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('terms.update', term.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل الشرط</h2>}
    >
      <Head title="تعديل الشرط" />
      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="modern-form" noValidate>
            <h2 className="form-title">تعديل الشرط</h2>

            {/* العنوان */}
            <div className="form-group">
              <label htmlFor="title">العنوان</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className={errors.title ? "input-error" : ""}
                required
                autoFocus
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            {/* المحتوى */}
            <div className="form-group">
              <label htmlFor="content">المحتوى</label>
              <textarea
                id="content"
                name="content"
                rows={5}
                value={data.content}
                onChange={e => setData('content', e.target.value)}
                className={errors.content ? "input-error" : ""}
                required
              />
              {errors.content && <p className="error-text">{errors.content}</p>}
            </div>

            {/* النوع */}
            <div className="form-group">
              <label htmlFor="type">نوع الشرط</label>
              <select
                id="type"
                name="type"
                value={data.type}
                onChange={e => setData('type', e.target.value)}
                className={errors.type ? "input-error" : ""}
                required
              >
                <option value="" disabled>اختر النوع</option>
                <option value="termsofservice">شروط الخدمة</option>
                <option value="privacypolicy">سياسة الخصوصية</option>
              </select>
              {errors.type && <p className="error-text">{errors.type}</p>}
            </div>

            {/* أزرار الإجراءات */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginTop: 24 }}>
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
                style={{ minWidth: 120 }}
              >
                {processing ? 'جاري التحديث...' : 'تحديث الشرط'}
              </button>
              <Link href={route('terms.index')} className="modern-link" style={{ alignSelf: 'center' }}>
                رجوع
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
