import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import SettingMap from '@/Components/SettingMap';

export default function SettingIndex({ auth, settings, stats }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">الإعدادات</h2>}>
      <Head title="الإعدادات" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">قائمة الإعدادات</h2>
            <Link href={route('settings.create')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">إضافة إعداد جديد</Link>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">إجمالي الإعدادات</h3>
              <p className="text-2xl">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">الإعدادات الحديثة</h3>
              <p className="text-2xl">{stats.recent}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {settings.map(setting => (
                  <tr key={setting.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{setting.site_name}</td>
                    <td className="px-6 py-4" style={{ maxWidth: 180 }}>
                      <SettingMap lat={setting.location?.lat || 24.7136} lng={setting.location?.lng || 46.6753} editable={false} height={120} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={route('settings.show', setting.id)} className="text-blue-600 hover:text-blue-900 mr-3">عرض</Link>
                      <Link href={route('settings.edit', setting.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">تعديل</Link>
                      <Link href={route('settings.destroy', setting.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">حذف</Link>
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
