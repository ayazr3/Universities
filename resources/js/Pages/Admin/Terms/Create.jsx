import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function TermCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    type: 'termsofservice',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('terms.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة شرط جديد</h2>}>
      <Head title="إضافة شرط جديد" />
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
            إدخال بيانات الشرط
          </h2>

          {/* العنوان */}
          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              className={errors.title ? "input-error" : ""}
              autoFocus
              required
            />
            {errors.title && <div className="error-text">{errors.title}</div>}
          </div>

          {/* المحتوى */}
          <div className="form-group">
            <label htmlFor="content">المحتوى</label>
            <textarea
              id="content"
              rows={5}
              value={data.content}
              onChange={e => setData('content', e.target.value)}
              className={errors.content ? "input-error" : ""}
              required
            />
            {errors.content && <div className="error-text">{errors.content}</div>}
          </div>

          {/* نوع الشرط */}
          <div className="form-group">
            <label htmlFor="type">نوع الشرط</label>
            <select
              id="type"
              value={data.type}
              onChange={e => setData('type', e.target.value)}
              className={errors.type ? "input-error" : ""}
              required
            >
              <option value="termsofservice">شروط الخدمة</option>
              <option value="privacypolicy">سياسة الخصوصية</option>
            </select>
            {errors.type && <div className="error-text">{errors.type}</div>}
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
              {processing ? "جاري الحفظ..." : "حفظ الشرط"}
            </button>
            <Link
              href={route('terms.index')}
              className="modern-link"
              style={{
                color: "#3a8dde",
                fontWeight: "bold",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 7,
                padding: "11px 15px",
                fontSize: "15px",
                textAlign: 'center',
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
