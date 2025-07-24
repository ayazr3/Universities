// import React from 'react';
// import { Head, Link, useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// export default function GuidanceEdit({ guidance, auth }) {
//   const { data, setData, put, processing, errors } = useForm({
//     title: guidance.title,
//     image: null,
//     description: guidance.description,
//     link: guidance.link || '',
//     type: guidance.type,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     put(route('guidances.update', guidance.id), {

//     });
//   };

//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل التوجيه</h2>}
//     >
//       <Head title="تعديل التوجيه" />

//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 bg-white border-b border-gray-200">
//               <h2 className="text-2xl font-bold mb-6">تعديل التوجيه</h2>

//               <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 {/* العنوان */}
//                 <div className="mb-4">
//                   <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
//                     العنوان
//                   </label>
//                   <input
//                     id="title"
//                     type="text"
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       errors.title ? 'border-red-500' : ''
//                     }`}
//                     value={data.title}
//                     onChange={(e) => setData('title', e.target.value)}
//                   />
//                   {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
//                 </div>

//                 {/* الصورة */}
//                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                                         الصورة (اتركه فارغًا للحفاظ على الصورة الحالية)
//                                     </label>
//                                     <input
//                                         id="image"
//                                         type="file"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
//                                         onChange={(e) => setData('image', e.target.files[0])}
//                                     />
//                                     {guidance.image && (
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">الصورة الحالية:</p>
//                                             <img
//                                                 src={`/storage/${guidance.image}`}
//                                                 alt="Current"
//                                                 className="h-20 w-auto mt-1"
//                                             />
//                                         </div>
//                                     )}
//                                     {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
//                                 </div>

//                 {/* الوصف */}
//                 <div className="mb-4">
//                   <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
//                     الوصف
//                   </label>
//                   <textarea
//                     id="description"
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       errors.description ? 'border-red-500' : ''
//                     }`}
//                     value={data.description}
//                     onChange={(e) => setData('description', e.target.value)}
//                     rows={4}
//                   />
//                   {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
//                 </div>

//                 {/* الرابط */}
//                 <div className="mb-4">
//                   <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
//                     الرابط (اختياري)
//                   </label>
//                   <input
//                     id="link"
//                     type="text"
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       errors.link ? 'border-red-500' : ''
//                     }`}
//                     value={data.link}
//                     onChange={(e) => setData('link', e.target.value)}
//                   />
//                   {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
//                 </div>

//                 {/* النوع */}
//                 <div className="mb-4">
//                   <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
//                     نوع التوجيه
//                   </label>
//                   <select
//                     id="type"
//                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                       errors.type ? 'border-red-500' : ''
//                     }`}
//                     value={data.type}
//                     onChange={(e) => setData('type', e.target.value)}
//                   >
//                     <option value="article">مقال</option>
//                     <option value="booke">كتاب</option>
//                     <option value="video">فيديو</option>
//                     <option value="advice">نصيحة</option>
//                   </select>
//                   {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
//                 </div>

//                 {/* أزرار الإرسال والرجوع */}
//                 <div className="flex items-center justify-between">
//                   <button
//                     type="submit"
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     disabled={processing}
//                   >
//                     {processing ? 'جاري التحديث...' : 'تحديث التوجيه'}
//                   </button>
//                   <Link
//                     href={route('guidances.index')}
//                     className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//                   >
//                     رجوع
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }


import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function GuidanceEdit({ guidance, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: guidance.title,
    image: null,
    description: guidance.description,
    link: guidance.link || '',
    type: guidance.type,
  });

  // التعديل الأهم: طريقة إرسال البيانات
  const handleSubmit = (e) => {
    e.preventDefault();

    // أنشئ FormData لإرسال الملفات مع البيانات
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('link', data.link);
    formData.append('type', data.type);

    // إذا اختار المستخدم صورة جديدة أرسلها
    if (data.image) {
      formData.append('image', data.image);
    }

    // استخدم Inertia put مع forceFormData لإرسال البيانات بشكل صحيح
    put(route('guidances.update', guidance.id), {
      data: formData,
      forceFormData: true,
      onError: () => {
        // يمكنك إضافة أي منطق عند وجود أخطاء
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل التوجيه</h2>}
    >
      <Head title="تعديل التوجيه" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h2 className="text-2xl font-bold mb-6">تعديل التوجيه</h2>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* العنوان */}
                  <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                      العنوان
                    </label>
                    <input
                      id="title"
                      type="text"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                  </div>

                  {/* الرابط */}
                  <div>
                    <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
                      الرابط (اختياري)
                    </label>
                    <input
                      id="link"
                      type="text"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.link ? 'border-red-500' : ''}`}
                      value={data.link}
                      onChange={(e) => setData('link', e.target.value)}
                    />
                    {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
                  </div>

                  {/* النوع */}
                  <div>
                    <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
                      نوع التوجيه
                    </label>
                    <select
                      id="type"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.type ? 'border-red-500' : ''}`}
                      value={data.type}
                      onChange={(e) => setData('type', e.target.value)}
                    >
                      <option value="article">مقال</option>
                      <option value="booke">كتاب</option>
                      <option value="video">فيديو</option>
                      <option value="advice">نصيحة</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
                  </div>

                  {/* الصورة */}
                  <div>
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                      الصورة (اتركه فارغًا للحفاظ على الصورة الحالية)
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
                      onChange={(e) => setData('image', e.target.files[0])}
                    />
                    {guidance.image && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">الصورة الحالية:</p>
                        <img
                          src={`/storage/${guidance.image}`}
                          alt="Current"
                          className="h-20 w-auto mt-1"
                        />
                      </div>
                    )}
                    {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
                  </div>

                  {/* الوصف */}
                  <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                      الوصف
                    </label>
                    <textarea
                      id="description"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      rows={4}
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                  </div>
                </div>

                {/* أزرار الإرسال والرجوع */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={processing}
                  >
                    {processing ? 'جاري التحديث...' : 'تحديث التوجيه'}
                  </button>
                  <Link
                    href={route('guidances.index')}
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                    رجوع
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
