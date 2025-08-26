import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Edit({ auth, universityCenter, governorates }) {
  const [data, setData] = useState({
    governorate_id: universityCenter.governorate_id || '',
    name: universityCenter.name || '',
    description: universityCenter.description || '',
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    Inertia.put(route('adminuniversitycenters.update', universityCenter.id), data, {
      onError: (errs) => {
        setErrors(errs);
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="تعديل مركز جامعي" />

      <form className="modern-form" onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">تعديل بيانات المركز الجامعي</h2>

        {/* اختيار المحافظة */}
        <div className="form-group">
          <label htmlFor="governorate_id">المحافظة</label>
          <select
            id="governorate_id"
            name="governorate_id"
            value={data.governorate_id}
            onChange={handleChange}
            required
            className={errors.governorate_id ? 'input-error' : ''}
          >
            <option value="" disabled>
              اختر المحافظة
            </option>
            {governorates.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.governorate_id && <p className="input-error">{errors.governorate_id}</p>}
        </div>

        {/* اسم المركز */}
        <div className="form-group">
          <label htmlFor="name">اسم المركز</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        {/* وصف المركز */}
        <div className="form-group">
          <label htmlFor="description">الوصف</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={data.description}
            onChange={handleChange}
            required
            className={errors.description ? 'input-error' : ''}
          ></textarea>
          {errors.description && <p className="input-error">{errors.description}</p>}
        </div>

        {/* زر التحديث */}
        <button type="submit" className="submit-btn" disabled={processing}>
          {processing ? 'جاري التحديث...' : 'تحديث البيانات'}
        </button>

        <Link
          href={route('adminuniversitycenters.index')}
          className="back-link"
          style={{
            display: 'inline-block',
            marginTop: 16,
            color: '#3a8dde',
            textDecoration: 'underline',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%',
          }}
        >
          رجوع لقائمة المراكز الجامعية
        </Link>
      </form>
    </AuthenticatedLayout>
  );
}
