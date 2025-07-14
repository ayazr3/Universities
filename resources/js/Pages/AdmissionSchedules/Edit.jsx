import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdmissionScheduleEdit({ admissionSchedule, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        title: admissionSchedule.title || '',
        body: admissionSchedule.body || '',
        date: admissionSchedule.date || '',
        name: admissionSchedule.name || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admissionSchedule.update', admissionSchedule.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل جدول القبول</h2>}
        >
            <Head title="تعديل جدول القبول" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">تعديل جدول القبول</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        العنوان
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                                        التفاصيل
                                    </label>
                                    <textarea
                                        id="body"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.body ? 'border-red-500' : ''}`}
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        rows="5"
                                    />
                                    {errors.body && <p className="text-red-500 text-xs italic">{errors.body}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                        التاريخ
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? 'border-red-500' : ''}`}
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                    />
                                    {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        المسؤول
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={processing}
                                    >
                                        {processing ? 'جاري التحديث...' : 'تحديث الجدول'}
                                    </button>
                                    <Link
                                        href={route('admissionSchedule.index')}
                                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                    >
                                        رجوع
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
