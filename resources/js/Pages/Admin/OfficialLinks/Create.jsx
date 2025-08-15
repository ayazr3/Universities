import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function OfficialLinkCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    entity_name: '',
    link: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('official-links.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة رابط رسمي جديد" />
      <div className="modern-form" style={{ maxWidth: 520 }}>
        <h2 className="form-title">إضافة رابط رسمي جديد</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* اسم الجهة */}
          <div className="form-group">
            <label htmlFor="entity_name">اسم الجهة</label>
            <input
              id="entity_name"
              type="text"
              value={data.entity_name}
              onChange={e => setData('entity_name', e.target.value)}
              className={errors.entity_name ? 'input-error' : ''}
              autoFocus
              required
            />
            {errors.entity_name && <p className="input-error">{errors.entity_name}</p>}
          </div>

          {/* الرابط */}
          <div className="form-group">
            <label htmlFor="link">الرابط</label>
            <input
              id="link"
              type="url"
              value={data.link}
              onChange={e => setData('link', e.target.value)}
              className={errors.link ? 'input-error' : ''}
              required
            />
            {errors.link && <p className="input-error">{errors.link}</p>}
          </div>

          {/* الأزرار */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              type="submit"
              disabled={processing}
              className="submit-btn"
              style={{ flex: 1 }}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ الرابط'}
            </button>
            <Link
              href={route('official-links.index')}
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
