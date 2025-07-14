import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function OfficialLinkEdit({ officialLink, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    entity_name: officialLink.entity_name || '',
    link: officialLink.link || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('official-links.update', officialLink.id));
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل الرابط الرسمي</h2>}>
      <Head title="تعديل الرابط الرسمي" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="entity_name" className="block text-gray-700 font-bold mb-2">اسم الجهة</label>
              <input
                id="entity_name"
                type="text"
                value={data.entity_name}
                onChange={e => setData('entity_name', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.entity_name ? 'border-red-500' : ''}`}
              />
              {errors.entity_name && <p className="text-red-500 text-xs italic">{errors.entity_name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="link" className="block text-gray-700 font-bold mb-2">الرابط</label>
              <input
                id="link"
                type="text"
                value={data.link}
                onChange={e => setData('link', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.link ? 'border-red-500' : ''}`}
              />
              {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {processing ? 'جاري التحديث...' : 'تحديث الرابط'}
              </button>
              <Link href={route('official-links.index')} className="text-blue-500 hover:text-blue-700">رجوع</Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
