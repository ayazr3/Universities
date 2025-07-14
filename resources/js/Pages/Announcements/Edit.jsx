import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AnnouncementEdit({ announcement ,auth }) {
    const { data, setData, put, processing, errors } = useForm({
        title: announcement.title,
        summary: announcement.summary,
        publisher: announcement.publisher,
        image: null,
        publish_date: announcement.publish_date,
        details: announcement.details
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('announcement.update', announcement.id));
    };

    return (
        <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">إضافة سيارة جديدة</h2>}
        >
            <Head title="تعديل الإعلان" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">تعديل الإعلان</h2>

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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                                        الملخص
                                    </label>
                                    <textarea
                                        id="summary"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.summary ? 'border-red-500' : ''}`}
                                        value={data.summary}
                                        onChange={(e) => setData('summary', e.target.value)}
                                    />
                                    {errors.summary && <p className="text-red-500 text-xs italic">{errors.summary}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
                                        الناشر
                                    </label>
                                    <input
                                        id="publisher"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.publisher ? 'border-red-500' : ''}`}
                                        value={data.publisher}
                                        onChange={(e) => setData('publisher', e.target.value)}
                                    />
                                    {errors.publisher && <p className="text-red-500 text-xs italic">{errors.publisher}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                        الصورة (اتركه فارغًا للحفاظ على الصورة الحالية)
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    {announcement.image && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">الصورة الحالية:</p>
                                            <img
                                                src={`/storage/${announcement.image}`}
                                                alt="Current"
                                                className="h-20 w-auto mt-1"
                                            />
                                        </div>
                                    )}
                                    {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publish_date">
                                        تاريخ النشر
                                    </label>
                                    <input
                                        id="publish_date"
                                        type="date"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.publish_date ? 'border-red-500' : ''}`}
                                        value={data.publish_date}
                                        onChange={(e) => setData('publish_date', e.target.value)}
                                    />
                                    {errors.publish_date && <p className="text-red-500 text-xs italic">{errors.publish_date}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                                        التفاصيل
                                    </label>
                                    <textarea
                                        id="details"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.details ? 'border-red-500' : ''}`}
                                        value={data.details}
                                        onChange={(e) => setData('details', e.target.value)}
                                        rows="5"
                                    />
                                    {errors.details && <p className="text-red-500 text-xs italic">{errors.details}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={processing}
                                    >
                                        {processing ? 'جاري التحديث...' : 'تحديث الإعلان'}
                                    </button>
                                    <Link
                                        href={route('announcement.index')}
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

//Edit.layout = page => <AuthenticatedLayout children={page} />;
