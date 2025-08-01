import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css'; // تأكد من مسار ملف الستايل

export default function AnnouncementCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    summary: '',
    publisher: '',
    image: null,
    publish_date: '',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('announcement.store'), {
      forceFormData: true, // لأن لدينا ملف صورة
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title">إضافة إعلان جديد</h2>}
    >
      <Head title="إنشاء إعلان جديد" />

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
          encType="multipart/form-data"
          noValidate
        >
          <h2 className="form-title" style={{ marginTop: 0, marginBottom: 16 }}>
            إنشاء إعلان جديد
          </h2>

          {/* العنوان */}
          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              id="title"
              type="text"
              className={errors.title ? "input-error" : ""}
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              required
              autoFocus
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          {/* الملخص */}
          <div className="form-group">
            <label htmlFor="summary">الملخص</label>
            <textarea
              id="summary"
              className={errors.summary ? "input-error" : ""}
              value={data.summary}
              onChange={e => setData('summary', e.target.value)}
              rows={3}
              required
            />
            {errors.summary && <p className="error-text">{errors.summary}</p>}
          </div>

          {/* الناشر */}
          <div className="form-group">
            <label htmlFor="publisher">الناشر</label>
            <input
              id="publisher"
              type="text"
              className={errors.publisher ? "input-error" : ""}
              value={data.publisher}
              onChange={e => setData('publisher', e.target.value)}
              required
            />
            {errors.publisher && <p className="error-text">{errors.publisher}</p>}
          </div>

          {/* الصورة */}
          <div className="form-group">
            <label htmlFor="image">الصورة</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className={errors.image ? "input-error" : ""}
              onChange={e => setData('image', e.target.files[0])}
            />
            {errors.image && <p className="error-text">{errors.image}</p>}
          </div>

          {/* تاريخ النشر */}
          <div className="form-group">
            <label htmlFor="publish_date">تاريخ النشر</label>
            <input
              id="publish_date"
              type="date"
              className={errors.publish_date ? "input-error" : ""}
              value={data.publish_date}
              onChange={e => setData('publish_date', e.target.value)}
              required
            />
            {errors.publish_date && <p className="error-text">{errors.publish_date}</p>}
          </div>

          {/* التفاصيل */}
          <div className="form-group">
            <label htmlFor="details">التفاصيل</label>
            <textarea
              id="details"
              className={errors.details ? "input-error" : ""}
              value={data.details}
              onChange={e => setData('details', e.target.value)}
              rows={5}
              required
            />
            {errors.details && <p className="error-text">{errors.details}</p>}
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
              {processing ? "جاري الحفظ..." : "حفظ الإعلان"}
            </button>
            <Link
              href={route('announcement.index')}
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
