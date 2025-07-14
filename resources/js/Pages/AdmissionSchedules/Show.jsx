import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdmissionScheduleShow({ admissionSchedule, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تفاصيل جدول القبول</h2>}
        >
            <Head title="تفاصيل جدول القبول" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">تفاصيل جدول القبول</h2>
                                <div>
                                    <Link
                                        href={route('admissionSchedule.edit', admissionSchedule.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                    >
                                        تعديل
                                    </Link>
                                    <Link
                                        href={route('admissionSchedule.index')}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        رجوع
                                    </Link>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-semibold">{admissionSchedule.title}</h3>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">التفاصيل</h4>
                                <p className="text-gray-700 whitespace-pre-line">{admissionSchedule.body}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">التاريخ</h4>
                                <p className="text-gray-700">{new Date(admissionSchedule.date).toLocaleDateString('ar-EG')}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">المسؤول</h4>
                                <p className="text-gray-700">{admissionSchedule.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
