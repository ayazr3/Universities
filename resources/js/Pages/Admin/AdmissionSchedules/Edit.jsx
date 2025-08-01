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
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل جدول القبول</h2>}
    >
      <Head title="تعديل جدول القبول" />

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="modern-form" noValidate>
            <h2 className="form-title">تعديل جدول القبول</h2>

            {/* العنوان */}
            <div className="form-group">
              <label htmlFor="title">العنوان</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className={errors.title ? 'input-error' : ''}
                required
                autoFocus
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            {/* التفاصيل */}
            <div className="form-group">
              <label htmlFor="body">التفاصيل</label>
              <textarea
                id="body"
                name="body"
                rows={5}
                value={data.body}
                onChange={e => setData('body', e.target.value)}
                className={errors.body ? 'input-error' : ''}
                required
              />
              {errors.body && <p className="error-text">{errors.body}</p>}
            </div>

            {/* التاريخ */}
            <div className="form-group">
              <label htmlFor="date">التاريخ</label>
              <input
                type="date"
                id="date"
                name="date"
                value={data.date}
                onChange={e => setData('date', e.target.value)}
                className={errors.date ? 'input-error' : ''}
                required
              />
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>

            {/* المسؤول */}
            <div className="form-group">
              <label htmlFor="name">المسؤول</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className={errors.name ? 'input-error' : ''}
                required
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* الملف */}
            <div className="form-group">
              <label htmlFor="file_url">الملف (اختياري)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                id="file_url"
                name="file_url"
                className={errors.file_url ? 'input-error' : ''}
                onChange={e => setData('file_url', e.target.files[0])}
              />
              {admissionSchedule.file_url && !data.file_url && (
                <p className="current-file-note" style={{ marginTop: '8px' }}>
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
              {errors.file_url && <p className="error-text">{errors.file_url}</p>}
            </div>

            {/* أزرار الإجراء */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
                marginTop: 24,
              }}
            >
              <button type="submit" disabled={processing} className="submit-btn" style={{ minWidth: 120 }}>
                {processing ? 'جاري التحديث...' : 'تحديث الجدول'}
              </button>
              <Link href={route('admissionSchedule.index')} className="modern-link" style={{ alignSelf: 'center' }}>
                رجوع
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
