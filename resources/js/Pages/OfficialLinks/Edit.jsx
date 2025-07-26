import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function OfficialLinkEdit({ officialLink, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    entity_name: officialLink.entity_name || '',
    link: officialLink.link || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('official-links.update', officialLink.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل الرابط الرسمي</h2>}
    >
      <Head title="تعديل الرابط الرسمي" />

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="modern-form">
            <h2 className="form-title">تعديل الرابط الرسمي</h2>

            {/* اسم الجهة */}
            <div className="form-group">
              <label htmlFor="entity_name">اسم الجهة</label>
              <input
                id="entity_name"
                type="text"
                name="entity_name"
                value={data.entity_name}
                onChange={e => setData('entity_name', e.target.value)}
                className={errors.entity_name ? "input-error" : ""}
                required
              />
              {errors.entity_name && <p className="error-text">{errors.entity_name}</p>}
            </div>

            {/* الرابط */}
            <div className="form-group">
              <label htmlFor="link">الرابط</label>
              <input
                id="link"
                type="url"
                name="link"
                value={data.link}
                onChange={e => setData('link', e.target.value)}
                className={errors.link ? "input-error" : ""}
                placeholder="https://example.com"
                required
              />
              {errors.link && <p className="error-text">{errors.link}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', gap: '2rem', marginTop: 24 }}>
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
                style={{ minWidth: 120 }}
              >
                {processing ? 'جاري التحديث...' : 'تحديث الرابط'}
              </button>
              <Link href={route('official-links.index')} className="modern-link">
                رجوع
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
