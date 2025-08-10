import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function GuidanceCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    image: null,
    description: '',
    link: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('guidances.store'), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة توجيه جديد" />
      <div style={{
        minHeight: "100vh", background: "#edf2ff",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <form
          className="modern-form"
          style={{ width: '100%', maxWidth: "480px" }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="form-title" style={{ marginBottom: 24, marginTop: 0, fontSize: "28px" }}>
            إدخال بيانات الإرشاد
          </h2>

          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              type="text"
              id="title"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              required
              className={errors.title ? "input-error" : ""}
              autoFocus
            />
            {errors.title && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="image">صورة (اختياري)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={e => setData('image', e.target.files[0])}
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.image}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">وصف نصي</label>
            <textarea
              id="description"
              rows={4}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              required
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.description}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="link">رابط المقال أو الكتاب أو الفيديو (اختياري)</label>
            <input
              type="url"
              id="link"
              value={data.link}
              placeholder="https://example.com"
              onChange={e => setData('link', e.target.value)}
              className={errors.link ? "input-error" : ""}
            />
            {errors.link && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.link}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="type">نوع الإرشاد</label>
            <select
              id="type"
              value={data.type}
              onChange={e => setData('type', e.target.value)}
              required
              className={errors.type ? "input-error" : ""}
            >
              <option value="" disabled>
                اختر النوع
              </option>
              <option value="article">مقالة</option>
              <option value="booke">كتاب</option>
              <option value="video">فيديو</option>
              <option value="advice">نصيحة</option>
            </select>
            {errors.type && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.type}</div>}
          </div>

          <div style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10
          }}>
            <button
              className="submit-btn"
              type="submit"
              disabled={processing}
              style={{ flex: 1 }}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ البيانات'}
            </button>
            <Link
              href={route('guidances.index')}
              style={{
                color: "#3a8dde",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: "15px",
                fontWeight: "bold",
                minWidth: "83px",
                textAlign: "center"
              }}>
              رجوع
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
