// import React from 'react';
// import { Head, Link } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// export default function Index({ announcements, stats }) {
//     return (
//         <>
            // <Head title="الإعلانات" />
            // {/* إضافة header */}
            // <header className="bg-white shadow">
            //     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            //         <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم - الإعلانات</h1>
            //     </div>
            // </header>
            // <div className="py-12">
            //     <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            //         <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            //             <div className="p-6 bg-white border-b border-gray-200">
            //                 <div className="flex justify-between mb-6">
            //                     <h2 className="text-2xl font-bold">قائمة الإعلانات</h2>
            //                     <Link
            //                         href={route('announcement.create')}
            //                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            //                     >
            //                         إنشاء إعلان جديد
            //                     </Link>
            //                 </div>

            //                 <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            //                     <div className="bg-blue-50 p-4 rounded-lg">
            //                         <h3 className="text-lg font-semibold">إجمالي الإعلانات</h3>
            //                         <p className="text-2xl">{stats.total}</p>
            //                     </div>
            //                     <div className="bg-green-50 p-4 rounded-lg">
            //                         <h3 className="text-lg font-semibold">الإعلانات الحديثة</h3>
            //                         <p className="text-2xl">{stats.recent}</p>
            //                     </div>
            //                 </div>

            //                 <div className="overflow-x-auto">
            //                     <table className="min-w-full divide-y divide-gray-200">
            //                         <thead className="bg-gray-50">
            //                             <tr>
            //                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
            //                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الناشر</th>
            //                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ النشر</th>
            //                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            //                             </tr>
            //                         </thead>
            //                         <tbody className="bg-white divide-y divide-gray-200">
            //                             {announcements.map((announcement) => (
            //                                 <tr key={announcement.id}>
            //                                     <td className="px-6 py-4 whitespace-nowrap">
            //                                         <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
            //                                         <div className="text-sm text-gray-500">{announcement.summary}</div>
            //                                     </td>
            //                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.publisher}</td>
            //                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.publish_date}</td>
            //                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            //                                         <Link
            //                                             href={route('announcement.show', announcement.id)}
            //                                             className="text-blue-600 hover:text-blue-900 mr-3"
            //                                         >
            //                                             عرض
            //                                         </Link>
            //                                         <Link
            //                                             href={route('announcement.edit', announcement.id)}
            //                                             className="text-indigo-600 hover:text-indigo-900 mr-3"
            //                                         >
            //                                             تعديل
            //                                         </Link>
            //                                         <Link
            //                                             href={route('announcement.destroy', announcement.id)}
            //                                             method="delete"
            //                                             as="button"
            //                                             className="text-red-600 hover:text-red-900"
            //                                         >
            //                                             حذف
            //                                         </Link>
            //                                     </td>
            //                                 </tr>
            //                             ))}
            //                         </tbody>
            //                     </table>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
//         </>
//     );
// }

// Index.layout = page => <AppLayout children={page} />;
// resources/js/Pages/Cars/Index.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AnnouncementIndex({ auth, announcements, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">الإعلانات</h2>}
        >
            <Head title="الإعلانات" />
            {/* إضافة header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم - الإعلانات</h1>
                </div>
            </header>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">قائمة الإعلانات</h2>
                                <Link
                                    href={route('announcement.create')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    إنشاء إعلان جديد
                                </Link>
                            </div>

                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">إجمالي الإعلانات</h3>
                                    <p className="text-2xl">{stats.total}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">الإعلانات الحديثة</h3>
                                    <p className="text-2xl">{stats.recent}</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الناشر</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ النشر</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {announcements.map((announcement) => (
                                            <tr key={announcement.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
                                                    {/* <div className="text-sm text-gray-500">{announcement.summary}</div> */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.publisher}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.publish_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('announcement.show', announcement.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        عرض
                                                    </Link>
                                                    <Link
                                                        href={route('announcement.edit', announcement.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        تعديل
                                                    </Link>
                                                    <Link
                                                        href={route('announcement.destroy', announcement.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        حذف
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
