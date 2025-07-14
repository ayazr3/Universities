import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TermShow({ term, auth }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تفاصيل الشرط</h2>}>
      <Head title="تفاصيل الشرط" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{term.title}</h2>
          <div className="mb-4 whitespace-pre-wrap">{term.content}</div>
          <div className="mb-4">
            <strong>النوع:</strong> {term.type === 'termsofservice' ? 'شروط الخدمة' : 'سياسة الخصوصية'}
          </div>
          <div className="flex gap-2">
            <Link href={route('terms.edit', term.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">تعديل</Link>
            <Link href={route('terms.index')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">رجوع</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
