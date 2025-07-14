import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function OfficialLinkShow({ officialLink, auth }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تفاصيل الرابط الرسمي</h2>}>
      <Head title="تفاصيل الرابط الرسمي" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{officialLink.entity_name}</h2>
          <div className="mb-4">
            <strong>الرابط:</strong> <a href={officialLink.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{officialLink.link}</a>
          </div>
          <div className="flex gap-2">
            <Link href={route('official-links.edit', officialLink.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">تعديل</Link>
            <Link href={route('official-links.index')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">رجوع</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
