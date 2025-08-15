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
    <AuthenticatedLayout user={auth.user}>
      <Head title="تعديل خطوة التسجيل" />

      <form
        className="modern-form"
        onSubmit={handleSubmit}
        noValidate
        style={{ maxWidth: 520 }}
      >
        <h2 className="form-title">تعديل خطوة التسجيل</h2>

        {/* اسم الخطوة */}
        <div className="form-group">
          <label htmlFor="step_name">اسم الخطوة</label>
          <input
            type="text"
            id="step_name"
            name="step_name"
            value={data.step_name}
            onChange={(e) => setData('step_name', e.target.value)}
            required
            className={errors.step_name ? 'input-error' : ''}
          />
          {errors.step_name && <p className="input-error">{errors.step_name}</p>}
        </div>

        {/* الوصف */}
        <div className="form-group">
          <label htmlFor="description">الوصف</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            required
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <p className="input-error">{errors.description}</p>}
        </div>

        {/* الخطوات الفرعية */}
        <div className="form-group">
          <label htmlFor="sub_step">الخطوات الفرعية (افصل بينها بفاصلة)</label>
          <input
            type="text"
            id="sub_step"
            name="sub_step"
            value={
              Array.isArray(data.sub_step)
                ? data.sub_step.join(',')
                : ''
            }
            onChange={(e) =>
              setData(
                'sub_step',
                e.target.value.split(',').map((s) => s.trim())
              )
            }
            placeholder="مثلاً: خطوة 1, خطوة 2, خطوة 3"
            className={errors.sub_step ? 'input-error' : ''}
          />
          {errors.sub_step && <p className="input-error">{errors.sub_step}</p>}
        </div>

        {/* أزرار */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? 'جاري التحديث...' : 'تحديث الخطوة'}
          </button>
          <Link
            href={route('registrationstep.index')}
            className="back-link"
            style={{ alignSelf: 'center' }}
          >
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
