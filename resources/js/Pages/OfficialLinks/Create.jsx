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
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة رابط رسمي جديد</h2>}>
      <Head title="إضافة رابط رسمي جديد" />
      <div
        style={{
          minHeight: '100vh',
          background: 'rgb(179 194 215)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="modern-form"
          style={{ width: '100%', maxWidth: 520 }}
          noValidate
        >
          <h2 className="form-title" style={{ marginBottom: 16, marginTop: 0 }}>
            إدخال بيانات الرابط الرسمي
          </h2>

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
            {errors.entity_name && <div className="error-text">{errors.entity_name}</div>}
          </div>

          {/* الرابط */}
          <div className="form-group">
            <label htmlFor="link">الرابط</label>
            <input
              id="link"
              type="text"
              value={data.link}
              onChange={e => setData('link', e.target.value)}
              className={errors.link ? 'input-error' : ''}
              required
            />
            {errors.link && <div className="error-text">{errors.link}</div>}
          </div>

          {/* أزرار الإجراء */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
            }}
          >
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
              className="modern-link"
              style={{
                marginLeft: 16,
                fontWeight: 'bold',
                textDecoration: 'underline',
                background: '#eaf4ff',
                borderRadius: 7,
                padding: '11px 15px',
                fontSize: '15px',
                textAlign: 'center',
                color: '#3a8dde',
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
