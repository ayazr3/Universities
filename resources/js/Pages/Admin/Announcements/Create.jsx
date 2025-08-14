import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

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
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title">إضافة إعلان جديد</h2>}
    >
      <Head title="إنشاء إعلان جديد" />

      <form
        onSubmit={handleSubmit}
        className="modern-form"
        encType="multipart/form-data"
        noValidate
      >
        <h2 className="form-title">إنشاء إعلان جديد</h2>

        {/* العنوان */}
        <div className="form-group">
          <label htmlFor="title">العنوان</label>
          <input
            id="title"
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className={errors.title ? "input-error" : ""}
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
            rows="3"
            value={data.summary}
            onChange={e => setData('summary', e.target.value)}
            className={errors.summary ? "input-error" : ""}
            required
          ></textarea>
          {errors.summary && <p className="error-text">{errors.summary}</p>}
        </div>

        {/* الناشر */}
        <div className="form-group">
          <label htmlFor="publisher">جهة النشر</label>
          <input
            id="publisher"
            type="text"
            value={data.publisher}
            onChange={e => setData('publisher', e.target.value)}
            className={errors.publisher ? "input-error" : ""}
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
            onChange={e => setData('image', e.target.files[0])}
            className={errors.image ? "input-error" : ""}
          />
          {errors.image && <p className="error-text">{errors.image}</p>}
        </div>

        {/* تاريخ النشر */}
        <div className="form-group">
          <label htmlFor="publish_date">تاريخ النشر</label>
          <input
            id="publish_date"
            type="date"
            value={data.publish_date}
            onChange={e => setData('publish_date', e.target.value)}
            className={errors.publish_date ? "input-error" : ""}
            required
          />
          {errors.publish_date && <p className="error-text">{errors.publish_date}</p>}
        </div>

        {/* التفاصيل */}
        <div className="form-group">
          <label htmlFor="details">التفاصيل</label>
          <textarea
            id="details"
            rows="5"
            value={data.details}
            onChange={e => setData('details', e.target.value)}
            className={errors.details ? "input-error" : ""}
            required
          ></textarea>
          {errors.details && <p className="error-text">{errors.details}</p>}
        </div>

        {/* الأزرار */}
        <div className="form-group" style={{ display: "flex", gap: "12px" }}>
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
            className="cancel-btn"
            style={{
              background: "#eaf4ff",
              color: "#3a8dde",
              borderRadius: "10px",
              padding: "14px 20px",
              fontWeight: "bold",
              display: "inline-block",
              textAlign: "center",
              flex: 1
            }}
          >
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
