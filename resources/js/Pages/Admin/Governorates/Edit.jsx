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
    <AuthenticatedLayout user={auth.user} header={<h2>تعديل المحافظة</h2>}>
      <Head title="تعديل المحافظة" />
      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="modern-form" noValidate>
            <h2 className="form-title">تعديل اسم المحافظة</h2>
            <div className="form-group">
              <label htmlFor="name">اسم المحافظة</label>
              <input
                type="text" id="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className={errors.name ? 'input-error' : ''}
                required autoFocus
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div style={{
              display: "flex", gap: "12px", justifyContent: "space-between",
              alignItems: "center", marginTop: 16,
            }}>
              <button type="submit" disabled={processing} className="submit-btn" style={{ flex: 1 }}>
                {processing ? "جاري التحديث..." : "تحديث"}
              </button>
              <Link href={route('governorates.index')} className="modern-link" style={{ alignSelf: 'center' }}>
                رجوع
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
