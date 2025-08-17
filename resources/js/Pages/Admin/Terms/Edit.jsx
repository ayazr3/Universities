import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function TermEdit({ term, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: term.title || '',
    content: term.content || '',
    type: term.type || 'termsofservice',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('terms.update', term.id), { preserveScroll: true });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">تعديل الشرط</h2>}>
      <Head title="تعديل الشرط" />
      <div className="modern-form" style={{ maxWidth: 520 }}>
        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              type="text"
              id="title"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              className={errors.title ? 'input-error' : ''}
              required
              autoFocus
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
              {processing ? 'جاري التحديث...' : 'تحديث الشرط'}
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
