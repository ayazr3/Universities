import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function RegistrationStepIndex({ auth, steps, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">خطوات التسجيل</h2>}
        >
            <Head title="خطوات التسجيل" />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم - خطوات التسجيل</h1>
                </div>
            </header>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">قائمة خطوات التسجيل</h2>
                                <Link
                                    href={route('registrationstep.create')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    إضافة خطوة جديدة
                                </Link>
                            </div>
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">إجمالي الخطوات</h3>
                                    <p className="text-2xl">{stats.total}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold">الخطوات الحديثة</h3>
                                    <p className="text-2xl">{stats.recent}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخطوة</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخطوات الفرعية</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {steps.map((step) => (
                                            <tr key={step.id}>
                                                <td className="px-6 py-4 whitespace-normal max-w-xs text-sm text-gray-900">
                                                    {step.step_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-normal max-w-xs text-sm text-gray-700">
                                                    {step.description.length > 100 ?
                                                        `${step.description.substring(0, 100)}...` :
                                                        step.description
                                                    }
                                                </td>
                                                {/* <td className="px-6 py-4 whitespace-normal max-w-xs text-sm text-gray-700">
                                                    {Array.isArray(step.sub_step) ? step.sub_step.join(', ') : ''}
                                                </td> */}

                                                {Array.isArray(step.sub_step) && step.sub_step.length > 0 ? (
                                                    <ol className="list-decimal list-inside space-y-1">
                                                        {step.sub_step.map((sub, idx) => (
                                                            <li key={idx}>{sub}</li>
                                                        ))}
                                                    </ol>
                                                ) : (
                                                    <span className="text-gray-400">لا يوجد خطوات فرعية</span>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('registrationstep.show', step.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        عرض
                                                    </Link>
                                                    <Link
                                                        href={route('registrationstep.edit', step.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        تعديل
                                                    </Link>
                                                    <Link
                                                        href={route('registrationstep.destroy', step.id)}
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
