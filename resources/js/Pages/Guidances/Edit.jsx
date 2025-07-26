import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css'

export default function GuidanceEdit({ guidance, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: guidance.title || '',
    description: guidance.description || '',
    link: guidance.link || '',
    type: guidance.type || '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.image) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('link', data.link);
      formData.append('type', data.type);
      formData.append('image', data.image);
      formData.append('_method', 'PUT');
      Inertia.post(route('guidances.update', guidance.id), formData, {
        preserveScroll: true,
      });
    } else {
      put(route('guidances.update', guidance.id), {
        preserveScroll: true,
      });
    }
  };


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل التوجيه</h2>}
    >
      <Head title="تعديل التوجيه" />

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="modern-form">
            <h2 className="form-title">تعديل التوجيه</h2>

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
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            {/* الصورة */}
            <div className="form-group">
              <label htmlFor="image">الصورة (اتركها إن لم ترغب بالتعديل)</label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={e => setData('image', e.target.files[0])}
                className={errors.image ? "input-error" : ""}
              />
              {guidance.image && !data.image && (
                <div className="mt-2">
                  <p className="current-image-note">الصورة الحالية:</p>
                  <img src={`/storage/${guidance.image}`} alt="الصورة الحالية" style={{height:'60px', borderRadius:'5px', marginTop:'8px'}} />
                </div>
              )}
              {errors.image && <p className="error-text">{errors.image}</p>}
            </div>

            {/* الوصف */}
            <div className="form-group">
              <label htmlFor="description">الوصف</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className={errors.description ? "input-error" : ""}
                required
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>

            {/* الرابط */}
            <div className="form-group">
              <label htmlFor="link">الرابط (اختياري)</label>
              <input
                type="url"
                id="link"
                name="link"
                value={data.link}
                onChange={e => setData('link', e.target.value)}
                className={errors.link ? "input-error" : ""}
                placeholder="https://example.com"
              />
              {errors.link && <p className="error-text">{errors.link}</p>}
            </div>

            {/* النوع */}
            <div className="form-group">
              <label htmlFor="type">نوع التوجيه</label>
              <select
                id="type"
                name="type"
                value={data.type}
                onChange={e => setData('type', e.target.value)}
                className={errors.type ? "input-error" : ""}
                required
              >
                <option value="" disabled>اختر النوع</option>
                <option value="article">مقالة</option>
                <option value="book">كتاب</option>
                <option value="video">فيديو</option>
                <option value="advice">نصيحة</option>
              </select>
              {errors.type && <p className="error-text">{errors.type}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', gap: '2rem', marginTop: 24 }}>
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
                style={{ minWidth: 120 }}
              >
                {processing ? 'جاري التحديث...' : 'تحديث التوجيه'}
              </button>
              <Link href={route('guidances.index')} className="modern-link">
                رجوع
              </Link>
            </div>

          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
