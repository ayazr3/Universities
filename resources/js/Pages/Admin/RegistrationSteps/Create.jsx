import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

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
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة خطوة تسجيل جديدة" />

      <div className="modern-form" style={{ maxWidth: 520 }}>
        <h2 className="form-title">إضافة خطوة تسجيل جديدة</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* اسم الخطوة */}
          <div className="form-group">
            <label htmlFor="step_name">اسم الخطوة</label>
            <input
              type="text"
              id="step_name"
              value={data.step_name}
              onChange={(e) => setData('step_name', e.target.value)}
              className={errors.step_name ? 'input-error' : ''}
              required
            />
            {errors.step_name && <p className="input-error">{errors.step_name}</p>}
          </div>

          {/* الوصف */}
          <div className="form-group">
            <label htmlFor="description">الوصف</label>
            <textarea
              id="description"
              rows={5}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className={errors.description ? 'input-error' : ''}
              required
            />
            {errors.description && <p className="input-error">{errors.description}</p>}
          </div>

          {/* الخطوات الفرعية */}
          <div className="form-group">
            <label htmlFor="sub_step">الخطوات الفرعية (افصل بينها بفاصلة)</label>
            <input
              type="text"
              id="sub_step"
              value={data.sub_step.join(',')}
              onChange={(e) =>
                setData('sub_step', e.target.value.split(',').map((s) => s.trim()))
              }
              placeholder="مثلاً: خطوة 1, خطوة 2, خطوة 3"
              className={errors.sub_step ? 'input-error' : ''}
            />
            {errors.sub_step && <p className="input-error">{errors.sub_step}</p>}
          </div>

          {/* أزرار */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              type="submit"
              className="submit-btn"
              disabled={processing}
              style={{ flex: 1 }}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ الخطوة'}
            </button>
            <Link
              href={route('registrationstep.index')}
              className="back-link"
              style={{
                alignSelf: 'center',
                color: '#3a8dde',
                textDecoration: 'underline',
                fontWeight: 'bold',
                padding: '12px 20px',
              }}
            >
              رجوع
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
