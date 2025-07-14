// import React from 'react';
// import { Head, Link, useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// export default function Create() {
//     const { data, setData, post, processing, errors } = useForm({
//         title: '',
//         summary: '',
//         publisher: '',
//         image: null,
//         publish_date: '',
//         details: ''
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(route('announcement.store'));
//     };

//     return (
//         <>
//             <Head title="إنشاء إعلان جديد" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 bg-white border-b border-gray-200">
//                             <h2 className="text-2xl font-bold mb-6">إنشاء إعلان جديد</h2>

//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                                         العنوان
//                                     </label>
//                                     <input
//                                         id="title"
//                                         type="text"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
//                                         value={data.title}
//                                         onChange={(e) => setData('title', e.target.value)}
//                                     />
//                                     {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
//                                         الملخص
//                                     </label>
//                                     <textarea
//                                         id="summary"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.summary ? 'border-red-500' : ''}`}
//                                         value={data.summary}
//                                         onChange={(e) => setData('summary', e.target.value)}
//                                     />
//                                     {errors.summary && <p className="text-red-500 text-xs italic">{errors.summary}</p>}
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
//                                         الناشر
//                                     </label>
//                                     <input
//                                         id="publisher"
//                                         type="text"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.publisher ? 'border-red-500' : ''}`}
//                                         value={data.publisher}
//                                         onChange={(e) => setData('publisher', e.target.value)}
//                                     />
//                                     {errors.publisher && <p className="text-red-500 text-xs italic">{errors.publisher}</p>}
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                                         الصورة
//                                     </label>
//                                     <input
//                                         id="image"
//                                         type="file"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
//                                         onChange={(e) => setData('image', e.target.files[0])}
//                                     />
//                                     {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publish_date">
//                                         تاريخ النشر
//                                     </label>
//                                     <input
//                                         id="publish_date"
//                                         type="date"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.publish_date ? 'border-red-500' : ''}`}
//                                         value={data.publish_date}
//                                         onChange={(e) => setData('publish_date', e.target.value)}
//                                     />
//                                     {errors.publish_date && <p className="text-red-500 text-xs italic">{errors.publish_date}</p>}
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
//                                         التفاصيل
//                                     </label>
//                                     <textarea
//                                         id="details"
//                                         className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.details ? 'border-red-500' : ''}`}
//                                         value={data.details}
//                                         onChange={(e) => setData('details', e.target.value)}
//                                         rows="5"
//                                     />
//                                     {errors.details && <p className="text-red-500 text-xs italic">{errors.details}</p>}
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                         disabled={processing}
//                                     >
//                                         {processing ? 'جاري الحفظ...' : 'حفظ الإعلان'}
//                                     </button>
//                                     <Link
//                                         href={route('announcement.index')}
//                                         className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//                                     >
//                                         رجوع
//                                     </Link>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// Create.layout = page => <AuthenticatedLayout children={page} />;






// resources/js/Pages/Cars/Create.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AnnouncementCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
        description: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('announcement.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">إضافة سيارة جديدة</h2>}
        >
            <Head title="إنشاء إعلان جديد" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">إنشاء إعلان جديد</h2>

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
                                        الصورة
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
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
                                        {processing ? 'جاري الحفظ...' : 'حفظ الإعلان'}
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
