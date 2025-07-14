import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function FaqEdit({ faq, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question,
        answer: faq.answer,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('faq.update', faq.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل سؤال شائع</h2>}
        >
            <Head title="تعديل سؤال شائع" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">تعديل السؤال الشائع</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                                        السؤال
                                    </label>
                                    <input
                                        id="question"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.question ? 'border-red-500' : ''}`}
                                        value={data.question}
                                        onChange={(e) => setData('question', e.target.value)}
                                    />
                                    {errors.question && <p className="text-red-500 text-xs italic">{errors.question}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                        الإجابة
                                    </label>
                                    <textarea
                                        id="answer"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.answer ? 'border-red-500' : ''}`}
                                        value={data.answer}
                                        onChange={(e) => setData('answer', e.target.value)}
                                        rows="5"
                                    />
                                    {errors.answer && <p className="text-red-500 text-xs italic">{errors.answer}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={processing}
                                    >
                                        {processing ? 'جاري التحديث...' : 'تحديث السؤال'}
                                    </button>
                                    <Link
                                        href={route('faq.index')}
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
