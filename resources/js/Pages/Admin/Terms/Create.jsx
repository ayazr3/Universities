import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function TermCreate({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    type: 'termsofservice',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('terms.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة شرط جديد</h2>}>
      <Head title="إضافة شرط جديد" />
      <div className="modern-form" style={{ maxWidth: 520 }}>
        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              className={errors.title ? 'input-error' : ''}
              autoFocus
              required
            />
            {errors.title && <p className="input-error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="content">المحتوى</label>
            <textarea
              id="content"
              rows={5}
              value={data.content}
              onChange={e => setData('content', e.target.value)}
              className={errors.content ? 'input-error' : ''}
              required
            />
            {errors.content && <p className="input-error">{errors.content}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="type">نوع الشرط</label>
            <select
              id="type"
              value={data.type}
              onChange={e => setData('type', e.target.value)}
              className={errors.type ? 'input-error' : ''}
              required
            >
              <option value="termsofservice">شروط الخدمة</option>
              <option value="privacypolicy">سياسة الخصوصية</option>
            </select>
            {errors.type && <p className="input-error">{errors.type}</p>}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button type="submit" disabled={processing} className="submit-btn" style={{ flex: 1 }}>
              {processing ? 'جاري الحفظ...' : 'حفظ الشرط'}
            </button>
            <Link href={route('terms.index')} className="back-link" style={{ alignSelf: 'center' }}>
              رجوع
            </Link>
          </div>

        </form>
      </div>
    </AuthenticatedLayout>
  );
}
