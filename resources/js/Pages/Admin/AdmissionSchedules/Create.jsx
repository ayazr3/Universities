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
      forceFormData: true, // ضروري لإرسال الملفات
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة جدول قبول جديد" />

      <div className="modern-form" style={{ maxWidth: 520 }}>
        <h2 className="form-title">إضافة جدول قبول جديد</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>

          {/* العنوان */}
          <div className="form-group">
            <label htmlFor="title">عنوان الجدول</label>
            <input
              type="text"
              id="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className={errors.title ? 'input-error' : ''}
              required
            />
            {errors.title && <p className="input-error">{errors.title}</p>}
          </div>

          {/* التفاصيل */}
          <div className="form-group">
            <label htmlFor="body">التفاصيل</label>
            <textarea
              id="body"
              rows={5}
              value={data.body}
              onChange={(e) => setData('body', e.target.value)}
              className={errors.body ? 'input-error' : ''}
              required
            />
            {errors.body && <p className="input-error">{errors.body}</p>}
          </div>

          {/* التاريخ */}
          <div className="form-group">
            <label htmlFor="date">تاريخ الجدول</label>
            <input
              type="date"
              id="date"
              value={data.date}
              onChange={(e) => setData('date', e.target.value)}
              className={errors.date ? 'input-error' : ''}
              required
            />
            {errors.date && <p className="input-error">{errors.date}</p>}
          </div>

          {/* المسؤول */}
          <div className="form-group">
            <label htmlFor="name">اسم المسؤول</label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className={errors.name ? 'input-error' : ''}
              required
            />
            {errors.name && <p className="input-error">{errors.name}</p>}
          </div>

          {/* الملف */}
          <div className="form-group">
            <label htmlFor="file_url">ملف الجدول (اختياري)</label>
            <input
              type="file"
              id="file_url"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => setData('file_url', e.target.files[0])}
              className={errors.file_url ? 'input-error' : ''}
            />
            {errors.file_url && <p className="input-error">{errors.file_url}</p>}
          </div>

          {/* أزرار */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              type="submit"
              className="submit-btn"
              disabled={processing}
              style={{ flex: 1 }}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ الجدول'}
            </button>
            <Link
              href={route('admissionSchedule.index')}
              className="back-link"
              style={{
                alignSelf: 'center',
                color: '#3a8dde',
                textDecoration: 'underline',
                fontWeight: 'bold',
                padding: '12px 20px',
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
