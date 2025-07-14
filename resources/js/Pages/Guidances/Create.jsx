import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function GuidanceCreate({ auth, colleges }) {
  const { data, setData, post, processing, errors } = useForm({
    college_id: '',
    title: '',
    image: null,
    description: '',
    link: '',
    type: 'article',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('guidances.store'), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">إضافة توجيه جديد</h2>}>
      <Head title="إضافة توجيه جديد" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">العنوان</label>
              <input
                id="title"
                type="text"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
            </div>
             <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">الصورة (اختياري)</label>
                <input
                id="image"
                type="file"
                accept="image/*"
                onChange={e => setData('image', e.target.files[0])}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
                />
                {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">الوصف</label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="link" className="block text-gray-700 font-bold mb-2">الرابط (اختياري)</label>
              <input
                id="link"
                type="text"
                value={data.link}
                onChange={e => setData('link', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.link ? 'border-red-500' : ''}`}
              />
              {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">نوع التوجيه</label>
              <select
                id="type"
                value={data.type}
                onChange={e => setData('type', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.type ? 'border-red-500' : ''}`}
              >
                <option value="article">مقال</option>
                <option value="booke">كتاب</option>
                <option value="video">فيديو</option>
                <option value="advice">نصيحة</option>
              </select>
              {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {processing ? 'جاري الحفظ...' : 'حفظ التوجيه'}
              </button>
              <Link href={route('guidances.index')} className="text-blue-500 hover:text-blue-700">رجوع</Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
