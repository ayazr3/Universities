import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TermIndex({ auth, terms, stats }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">الشروط</h2>}>
      <Head title="الشروط" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm sm:rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">قائمة الشروط</h2>
            <Link href={route('terms.create')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">إضافة شرط جديد</Link>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">إجمالي الشروط</h3>
              <p className="text-2xl">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">الشروط الحديثة</h3>
              <p className="text-2xl">{stats.recent}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المحتوى</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {terms.map(term => (
                  <tr key={term.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{term.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{term.content}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {term.type === 'termsofservice' ? 'شروط الخدمة' : 'سياسة الخصوصية'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={route('terms.show', term.id)} className="text-blue-600 hover:text-blue-900 mr-3">عرض</Link>
                      <Link href={route('terms.edit', term.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">تعديل</Link>
                      <Link href={route('terms.destroy', term.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">حذف</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
