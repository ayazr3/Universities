import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RegistrationStepCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        step_name: '',
        description: '',
        sub_step: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('registrationstep.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">إضافة خطوة تسجيل جديدة</h2>}
        >
            <Head title="إضافة خطوة تسجيل جديدة" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">إضافة خطوة تسجيل جديدة</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="step_name">
                                        اسم الخطوة
                                    </label>
                                    <input
                                        id="step_name"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.step_name ? 'border-red-500' : ''}`}
                                        value={data.step_name}
                                        onChange={(e) => setData('step_name', e.target.value)}
                                    />
                                    {errors.step_name && <p className="text-red-500 text-xs italic">{errors.step_name}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        الوصف
                                    </label>
                                    <textarea
                                        id="description"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="5"
                                    />
                                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sub_step">
                                        الخطوات الفرعية (افصل بينها بفاصلة)
                                    </label>
                                    <input
                                        id="sub_step"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.sub_step ? 'border-red-500' : ''}`}
                                        value={data.sub_step.join(',')}
                                        onChange={(e) => setData('sub_step', e.target.value.split(','))}
                                    />
                                    {errors.sub_step && <p className="text-red-500 text-xs italic">{errors.sub_step}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={processing}
                                    >
                                        {processing ? 'جاري الحفظ...' : 'حفظ الخطوة'}
                                    </button>
                                    <Link
                                        href={route('registrationstep.index')}
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
