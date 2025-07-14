import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RegistrationStepShow({ registrationstep, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تفاصيل خطوة التسجيل</h2>}
        >
            <Head title="تفاصيل خطوة التسجيل" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">تفاصيل خطوة التسجيل</h2>
                                <div>
                                    <Link
                                        href={route('registrationstep.edit', registrationstep.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                    >
                                        تعديل
                                    </Link>
                                    <Link
                                        href={route('registrationstep.index')}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        رجوع
                                    </Link>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold">{registrationstep.step_name}</h3>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">الوصف</h4>
                                <p className="text-gray-700 whitespace-pre-line">{registrationstep.description}</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">الخطوات الفرعية</h4>
                                {/* <p className="text-gray-700">{Array.isArray(registrationstep.sub_step) ? registrationstep.sub_step.join(', ') : ''}</p> */}

                                {Array.isArray(registrationstep.sub_step) && registrationstep.sub_step.length > 0 ? (
                                    <ol className="list-decimal list-inside space-y-1">
                                        {registrationstep.sub_step.map((sub, idx) => (
                                            <li key={idx}>{sub}</li>
                                        ))}
                                    </ol>
                                ) : (
                                    <span className="text-gray-400">لا يوجد خطوات فرعية</span>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
