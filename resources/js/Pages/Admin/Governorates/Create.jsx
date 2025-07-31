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
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة محافظة</h2>}>
      <Head title="إضافة محافظة" />
      <div
        style={{
          minHeight: "100vh", background: "rgb(179 194 215)", display: "flex",
          alignItems: "center", justifyContent: "center", padding: '1rem',
        }}
      >
        <form onSubmit={handleSubmit} className="modern-form" style={{ width: '100%', maxWidth: 520 }} noValidate>
          <h2 className="form-title" style={{ marginTop: 0, marginBottom: 16 }}>
            بيانات المحافظة
          </h2>
          <div className="form-group">
            <label htmlFor="name">اسم المحافظة</label>
            <input
              type="text" id="name"
              className={errors.name ? "input-error" : ""}
              value={data.name}
              onChange={e => setData('name', e.target.value)} autoFocus required
            />
            {errors.name && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.name}</div>}
          </div>
          <div style={{
            display: "flex", gap: "12px", justifyContent: "space-between",
            alignItems: "center", marginTop: 16,
          }}>
            <button type="submit" disabled={processing} className="submit-btn" style={{ flex: 1 }}>
              {processing ? "جاري الحفظ..." : "حفظ"}
            </button>
            <Link
              href={route('governorates.index')}
              style={{
                color: "#3a8dde", fontWeight: "bold", textDecoration: "underline",
                background: "#eaf4ff", borderRadius: 7, padding: "11px 15px", fontSize: "15px",
                textAlign: "center"
              }}
            >رجوع</Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
