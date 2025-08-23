import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AdmissionScheduleEdit({ admissionSchedule, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: admissionSchedule.title || '',
    body: admissionSchedule.body || '',
    date: admissionSchedule.date || '',
    name: admissionSchedule.name || '',
    file_url: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.file_url) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('date', data.date);
      formData.append('name', data.name);
      formData.append('file_url', data.file_url);
      formData.append('_method', 'PUT');

      Inertia.post(route('admissionSchedule.update', admissionSchedule.id), formData, {
        preserveScroll: true,
      });
    } else {
      put(route('admissionSchedule.update', admissionSchedule.id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="تعديل مواعيد القبول" />
      <form
        className="modern-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form-title">تعديل مواعيد القبول</h2>

        {/* العنوان */}
        <div className="form-group">
          <label htmlFor="title">عنوان الموعد</label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            required
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <p className="input-error">{errors.title}</p>}
        </div>

        {/* التفاصيل */}
        <div className="form-group">
          <label htmlFor="body">التفاصيل</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            value={data.body}
            onChange={(e) => setData('body', e.target.value)}
            required
            className={errors.body ? 'input-error' : ''}
          />
          {errors.body && <p className="input-error">{errors.body}</p>}
        </div>

        {/* التاريخ */}
        <div className="form-group">
          <label htmlFor="date">تاريخ الموعد</label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            onChange={(e) => setData('date', e.target.value)}
            required
            className={errors.date ? 'input-error' : ''}
          />
          {errors.date && <p className="input-error">{errors.date}</p>}
        </div>

        {/* المسؤول */}
        <div className="form-group">
          <label htmlFor="name">اسم المسؤول</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        {/* الملف */}
        <div className="form-group">
          <label htmlFor="file_url">ملف المفاضلة (اختياري)</label>
          <input
            type="file"
            id="file_url"
            name="file_url"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setData('file_url', e.target.files[0])}
            className={errors.file_url ? 'input-error' : ''}
          />
          {admissionSchedule.file_url && !data.file_url && (
            <p style={{ marginTop: '8px' }}>
              الملف الحالي:{' '}
              <a
                href={`/storage/${admissionSchedule.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="table-link"
              >
                عرض الملف
              </a>
            </p>
          )}
          {errors.file_url && <p className="input-error">{errors.file_url}</p>}
        </div>

        {/* أزرار التنفيذ */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? 'جاري التحديث...' : 'تحديث الجدول'}
          </button>
          <Link
            href={route('admissionSchedule.index')}
            className="back-link"
            style={{ alignSelf: 'center' }}
          >
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
