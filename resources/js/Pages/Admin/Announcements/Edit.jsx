import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function AnnouncementEdit({ announcement, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: announcement.title || '',
    summary: announcement.summary || '',
    publisher: announcement.publisher || '',
    image: null,
    publish_date: announcement.publish_date || '',
    details: announcement.details || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.image) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('summary', data.summary);
      formData.append('publisher', data.publisher);
      formData.append('publish_date', data.publish_date);
      formData.append('details', data.details);
      formData.append('image', data.image);
      formData.append('_method', 'PUT');

      Inertia.post(route('announcement.update', announcement.id), formData, {
        preserveScroll: true,
      });
    } else {
      put(route('announcement.update', announcement.id), { preserveScroll: true });
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل الإعلان</h2>}
    >
      <Head title="تعديل الإعلان" />

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="modern-form" noValidate>
            <h2 className="form-title">تعديل الإعلان</h2>

            {/* العنوان */}
            <div className="form-group">
              <label htmlFor="title">العنوان</label>
              <input
                type="text"
                id="title"
                name="title"
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
                name="summary"
                rows={3}
                value={data.summary}
                onChange={e => setData('summary', e.target.value)}
                className={errors.summary ? "input-error" : ""}
                required
              />
              {errors.summary && <p className="error-text">{errors.summary}</p>}
            </div>

            {/* الناشر */}
            <div className="form-group">
              <label htmlFor="publisher">الناشر</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={data.publisher}
                onChange={e => setData('publisher', e.target.value)}
                className={errors.publisher ? "input-error" : ""}
                required
              />
              {errors.publisher && <p className="error-text">{errors.publisher}</p>}
            </div>

            {/* الصورة */}
            <div className="form-group">
              <label htmlFor="image">الصورة (اتركه فارغًا للحفاظ على الصورة الحالية)</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={e => setData('image', e.target.files[0])}
                className={errors.image ? "input-error" : ""}
              />
              {announcement.image && !data.image && (
                <div className="mt-2">
                  <p className="current-image-note">الصورة الحالية:</p>
                  <img
                    src={`/storage/${announcement.image}`}
                    alt="الصورة الحالية"
                    className="rounded"
                    style={{ height: '60px', marginTop: '8px' }}
                  />
                </div>
              )}
              {errors.image && <p className="error-text">{errors.image}</p>}
            </div>

            {/* تاريخ النشر */}
            <div className="form-group">
              <label htmlFor="publish_date">تاريخ النشر</label>
              <input
                type="date"
                id="publish_date"
                name="publish_date"
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
                name="details"
                rows={5}
                value={data.details}
                onChange={e => setData('details', e.target.value)}
                className={errors.details ? "input-error" : ""}
                required
              />
              {errors.details && <p className="error-text">{errors.details}</p>}
            </div>

            {/* أزرار الإجراء */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginTop: 24 }}>
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
                style={{ minWidth: 120 }}
              >
                {processing ? 'جاري التحديث...' : 'تحديث الإعلان'}
              </button>
              <Link href={route('announcement.index')} className="modern-link">
                رجوع
              </Link>
            </div>

          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
