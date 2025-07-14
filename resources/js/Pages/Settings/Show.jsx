import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingMap from '@/Components/SettingMap';

export default function SettingShow({ setting, auth }) {
  const lat = setting.location?.lat || 24.7136;
  const lng = setting.location?.lng || 46.6753;

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تفاصيل الإعداد</h2>}>
      <Head title="تفاصيل الإعداد" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{setting.site_name}</h2>
          <div className="mb-4">
            <strong>رابط الشعار:</strong> {setting.logo}
          </div>
          <div className="mb-4">
            <strong>رابط الموقع:</strong> <a href={setting.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{setting.url}</a>
          </div>
          <div className="mb-4">
            <strong>الوصف:</strong>
            <p className="whitespace-pre-line">{setting.description}</p>
          </div>
          <div className="mb-4">
            <strong>الموقع على الخريطة:</strong>
            <SettingMap lat={lat} lng={lng} editable={false} height={300} />
          </div>
          <div className="flex gap-2">
            <Link href={route('settings.edit', setting.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">تعديل</Link>
            <Link href={route('settings.index')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">رجوع</Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
