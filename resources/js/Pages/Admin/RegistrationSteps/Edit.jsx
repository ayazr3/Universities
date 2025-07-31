import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function RegistrationStepEdit({ registrationstep, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    step_name: registrationstep.step_name || '',
    description: registrationstep.description || '',
    sub_step: registrationstep.sub_step || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('registrationstep.update', registrationstep.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل خطوة التسجيل</h2>}
    >
      <Head title="تعديل خطوة التسجيل" />

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="modern-form" noValidate>
            <h2 className="form-title">تعديل خطوة التسجيل</h2>

            {/* اسم الخطوة */}
            <div className="form-group">
              <label htmlFor="step_name">اسم الخطوة</label>
              <input
                type="text"
                id="step_name"
                name="step_name"
                value={data.step_name}
                onChange={e => setData('step_name', e.target.value)}
                className={errors.step_name ? "input-error" : ""}
                required
                autoFocus
              />
              {errors.step_name && <p className="error-text">{errors.step_name}</p>}
            </div>

            {/* الوصف */}
            <div className="form-group">
              <label htmlFor="description">الوصف</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className={errors.description ? "input-error" : ""}
                required
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>

            {/* الخطوات الفرعية */}
            <div className="form-group">
              <label htmlFor="sub_step">الخطوات الفرعية (افصل بينها بفاصلة)</label>
              <input
                type="text"
                id="sub_step"
                name="sub_step"
                value={Array.isArray(data.sub_step) ? data.sub_step.join(',') : ''}
                onChange={e => setData('sub_step', e.target.value.split(',').map(s => s.trim()))}
                className={errors.sub_step ? "input-error" : ""}
                placeholder="مثلاً: خطوة 1, خطوة 2, خطوة 3"
              />
              {errors.sub_step && <p className="error-text">{errors.sub_step}</p>}
            </div>

            {/* أزرار الإجراء */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginTop: 24 }}>
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
                style={{ minWidth: 120 }}
              >
                {processing ? 'جاري التحديث...' : 'تحديث الخطوة'}
              </button>
              <Link href={route('registrationstep.index')} className="modern-link" style={{ alignSelf: 'center' }}>
                رجوع
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
