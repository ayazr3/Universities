import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function AdmissionScheduleCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    body: '',
    date: '',
    name: '',
    file_url: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admissionSchedule.store'), {
      forceFormData: true, // ضروري لإرسال الملفات بشكل صحيح
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة جدول قبول جديد</h2>}>
      <Head title="إضافة جدول قبول جديد" />
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
          encType="multipart/form-data"
          className="modern-form"
          style={{ width: '100%', maxWidth: 520 }}
          noValidate
        >
          <h2 className="form-title" style={{ marginTop: 0, marginBottom: 16 }}>
            إدخال بيانات جدول القبول
          </h2>

          {/* العنوان */}
          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              type="text"
              id="title"
              className={errors.title ? "input-error" : ""}
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              autoFocus
              required
            />
            {errors.title && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.title}</div>}
          </div>

          {/* التفاصيل */}
          <div className="form-group">
            <label htmlFor="body">التفاصيل</label>
            <textarea
              id="body"
              rows={5}
              className={errors.body ? "input-error" : ""}
              value={data.body}
              onChange={e => setData('body', e.target.value)}
              required
            />
            {errors.body && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.body}</div>}
          </div>

          {/* التاريخ */}
          <div className="form-group">
            <label htmlFor="date">التاريخ</label>
            <input
              type="date"
              id="date"
              className={errors.date ? "input-error" : ""}
              value={data.date}
              onChange={e => setData('date', e.target.value)}
              required
            />
            {errors.date && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.date}</div>}
          </div>

          {/* المسؤول */}
          <div className="form-group">
            <label htmlFor="name">المسؤول</label>
            <input
              type="text"
              id="name"
              className={errors.name ? "input-error" : ""}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              required
            />
            {errors.name && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.name}</div>}
          </div>

          {/* الملف */}
          <div className="form-group">
            <label htmlFor="file_url">الملف (اختياري)</label>
            <input
              type="file"
              id="file_url"
              accept=".pdf,.doc,.docx,.txt"
              className={errors.file_url ? "input-error" : ""}
              onChange={e => setData('file_url', e.target.files[0])}
            />
            {errors.file_url && <div style={{ color: "#e74c3c", fontSize: "13px" }}>{errors.file_url}</div>}
          </div>

          {/* أزرار الإجراء */}
          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}>
            <button
              type="submit"
              disabled={processing}
              className="submit-btn"
              style={{ flex: 1 }}
            >
              {processing ? "جاري الحفظ..." : "حفظ الجدول"}
            </button>
            <Link
              href={route('admissionSchedule.index')}
              style={{
                color: "#3a8dde",
                fontWeight: "bold",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 7,
                padding: "11px 15px",
                fontSize: "15px",
                textAlign: "center"
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
