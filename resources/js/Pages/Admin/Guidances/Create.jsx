import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css'

export default function GuidanceCreate({ auth, colleges }) {
  const { data, setData, post, processing, errors } = useForm({
    college_id: '',
    title: '',
    image: null,
    description: '',
    link: '',
    type: 'article',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('guidances.store'), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">إضافة توجيه جديد</h2>}>
      <Head title="إضافة توجيه جديد" />
      <div style={{
        minHeight: "100vh", background: "rgb(179 194 215)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <form
          className="modern-form"
          style={{width:'100%',maxWidth:"520px"}}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="form-title" style={{marginBottom:16, marginTop:0}}>إدخال بيانات التوجيه</h2>

          {/* عنوان التوجيه */}
          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              id="title"
              type="text"
              className={errors.title ? "input-error" : ""}
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              autoFocus
              required
            />
            {errors.title && <div style={{color:"#e74c3c", fontSize:"13px"}}>{errors.title}</div>}
          </div>

          {/* الصورة */}
          <div className="form-group">
            <label htmlFor="image">الصورة (اختياري)</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={e => setData('image', e.target.files[0])}
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <div style={{color:"#e74c3c", fontSize:"13px"}}>{errors.image}</div>}
          </div>

          {/* الوصف */}
          <div className="form-group">
            <label htmlFor="description">الوصف</label>
            <textarea
              id="description"
              rows={4}
              className={errors.description ? "input-error" : ""}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              required
            />
            {errors.description && <div style={{color:"#e74c3c", fontSize:"13px"}}>{errors.description}</div>}
          </div>

          {/* الرابط */}
          <div className="form-group">
            <label htmlFor="link">رابط (اختياري)</label>
            <input
              id="link"
              type="url"
              className={errors.link ? "input-error" : ""}
              value={data.link}
              onChange={e => setData('link', e.target.value)}
              placeholder="https://example.com"
            />
            {errors.link && <div style={{color:"#e74c3c", fontSize:"13px"}}>{errors.link}</div>}
          </div>

          {/* نوع التوجيه */}
          <div className="form-group">
            <label htmlFor="type">نوع التوجيه</label>
            <select
              id="type"
              className={errors.type ? "input-error" : ""}
              value={data.type}
              onChange={e => setData('type', e.target.value)}
              required
            >
              <option value="article">مقالة</option>
              <option value="booke">كتاب</option>
              <option value="video">فيديو</option>
              <option value="advice">نصيحة</option>
            </select>
            {errors.type && <div style={{color:"#e74c3c", fontSize:"13px"}}>{errors.type}</div>}
          </div>

          {/* أزرار الإجراء */}
          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10
          }}>
            <button
              className="submit-btn"
              type="submit"
              disabled={processing}
              style={{flex:1}}
            >
              {processing ? 'جاري الحفظ...' : 'حفظ التوجيه'}
            </button>
            <Link
              href={route('guidances.index')}
              style={{
                color: "#3a8dde",
                fontWeight: "bold",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 7,
                padding: "11px 15px",
                fontSize: "15px"
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
