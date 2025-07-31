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
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة خطوة تسجيل جديدة</h2>}>
      <Head title="إضافة خطوة تسجيل جديدة" />
      <div
        style={{
          minHeight: "100vh",
          background: "rgb(179 194 215)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: '1rem',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="modern-form"
          style={{ width: '100%', maxWidth: 520 }}
          noValidate
        >
          <h2 className="form-title" style={{ marginTop: 0, marginBottom: 16 }}>
            إدخال بيانات خطوة التسجيل
          </h2>

          {/* اسم الخطوة */}
          <div className="form-group">
            <label htmlFor="step_name">اسم الخطوة</label>
            <input
              type="text"
              id="step_name"
              className={errors.step_name ? "input-error" : ""}
              value={data.step_name}
              onChange={e => setData('step_name', e.target.value)}
              autoFocus
              required
            />
            {errors.step_name && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.step_name}</div>}
          </div>

          {/* الوصف */}
          <div className="form-group">
            <label htmlFor="description">الوصف</label>
            <textarea
              id="description"
              rows={5}
              className={errors.description ? "input-error" : ""}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              required
            />
            {errors.description && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.description}</div>}
          </div>

          {/* الخطوات الفرعية */}
          <div className="form-group">
            <label htmlFor="sub_step">الخطوات الفرعية (افصل بينها بفاصلة)</label>
            <input
              type="text"
              id="sub_step"
              className={errors.sub_step ? "input-error" : ""}
              value={data.sub_step.join(',')}
              onChange={e => setData('sub_step', e.target.value.split(',').map(s => s.trim()))}
              placeholder="مثلاً: خطوة 1, خطوة 2, خطوة 3"
            />
            {errors.sub_step && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.sub_step}</div>}
          </div>

          {/* أزرار الإجراء */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <button
              type="submit"
              disabled={processing}
              className="submit-btn"
              style={{ flex: 1 }}
            >
              {processing ? "جاري الحفظ..." : "حفظ الخطوة"}
            </button>
            <Link
              href={route('registrationstep.index')}
              style={{
                color: "#3a8dde",
                fontWeight: "bold",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 7,
                padding: "11px 15px",
                fontSize: "15px",
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
