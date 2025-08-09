import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function GovernorateCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('governorates.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة محافظة" />
      <form
        className="modern-form"
        style={{
          margin: '40px auto',
          width: '100%',
          maxWidth: 480,
          minHeight: 0,
        }}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form-title" style={{ marginBottom: 30, fontSize: 32 }}>إضافة محافظة جديدة</h2>

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
          {errors.name && (
            <div className="input-error" style={{ marginTop: 4 }}>{errors.name}</div>
          )}
        </div>

        {/* أزرار التنفيذ */}
        <button
          type="submit"
          className="submit-btn"
          disabled={processing}
          style={{ width: '100%', margin: '15px 0 8px 0' }}
        >
          {processing ? "جاري الحفظ..." : "حفظ المحافظة"}
        </button>

        <Link
          href={route('governorates.index')}
          className="back-link"
          style={{
            display: 'inline-block',
            width: '100%',
            color: "#3a8dde",
            textDecoration: "underline",
            fontWeight: "bold",
            textAlign: "center",
            margin: "6px 0 0 0",
          }}
        >
          رجوع إلى جدول المحافظات
        </Link>
      </form>
    </AuthenticatedLayout>
  );
}
