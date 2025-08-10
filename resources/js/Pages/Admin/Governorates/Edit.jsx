import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GovernorateEdit({ governorate, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    name: governorate.name || '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    put(route('governorates.update', governorate.id));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="تعديل المحافظة" />

      <form
        className="modern-form"
        onSubmit={handleSubmit}
        noValidate
        style={{ maxWidth: 480, margin: '40px auto' }}
      >
        <h2 className="form-title">تعديل بيانات المحافظة</h2>

        {/* حقل اسم المحافظة */}
        <div className="form-group">
          <label htmlFor="name">اسم المحافظة</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            required
            className={errors.name ? 'input-error' : ''}
            autoFocus
          />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        {/* زر الحفظ */}
        <button
          type="submit"
          className="submit-btn"
          disabled={processing}
          style={{ width: '100%', marginTop: 10 }}
        >
          {processing ? 'جاري التحديث...' : 'تحديث المحافظة'}
        </button>

        {/* زر الرجوع */}
        <Link
          href={route('governorates.index')}
          className="back-link"
          style={{
            display: 'inline-block',
            width: '100%',
            textAlign: 'center',
            marginTop: 16,
            color: '#3a8dde',
            textDecoration: 'underline',
            fontWeight: 'bold'
          }}
        >
          رجوع إلى جدول المحافظات
        </Link>
      </form>
    </AuthenticatedLayout>
  );
}
