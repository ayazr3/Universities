import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function FaqIndex({ auth, faqs, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">الأسئلة الشائعة</h2>}
        >
            <Head title="الأسئلة الشائعة" />

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم - الأسئلة الشائعة</h1>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">قائمة الأسئلة الشائعة</h2>
                                <Link
                                    href={route('faq.create')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    إضافة سؤال جديد
                                </Link>
                            </div>

                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">إجمالي الأسئلة</h3>
                                    <p className="text-2xl">{stats.total}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">الأسئلة الحديثة</h3>
                                    <p className="text-2xl">{stats.recent}</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السؤال</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجابة</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {faqs.map((faq) => (
                                            <tr key={faq.id}>
                                                <td className="px-6 py-4 whitespace-normal max-w-xs text-sm text-gray-900">{faq.question}</td>
                                                <td className="px-6 py-4 whitespace-normal max-w-xs text-sm text-gray-700">{faq.answer}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('faq.show', faq.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        عرض
                                                    </Link>
                                                    <Link
                                                        href={route('faq.edit', faq.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        تعديل
                                                    </Link>
                                                    <Link
                                                        href={route('faq.destroy', faq.id)}
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
