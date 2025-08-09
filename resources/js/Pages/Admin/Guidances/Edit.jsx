import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '@/Components/Admin/Style/Style.css';

export default function GuidanceEdit({ guidance, auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: guidance.title || '',
    description: guidance.description || '',
    link: guidance.link || '',
    type: guidance.type || '',
    image: null,
    isGeneral: guidance.isGeneral ?? '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('link', data.link);
    formData.append('type', data.type);
    formData.append('isGeneral', data.isGeneral);
    if (data.image) formData.append('image', data.image);
    formData.append('_method', 'PUT');
    Inertia.post(route('guidances.update', guidance.id), formData, {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="تعديل التوجيه" />
      <div style={{
        minHeight: "100vh",
        background: "#edf2ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <form
          className="modern-form"
          style={{width:'100%',maxWidth:"480px"}}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="form-title" style={{marginBottom:24, marginTop:0, fontSize:"28px"}}>
            تعديل بيانات الإرشاد
          </h2>

          {/* العنوان */}
          <div className="form-group">
            <label htmlFor="title">العنوان</label>
            <input
              type="text"
              id="title"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              required
              className={errors.title ? "input-error" : ""}
              autoFocus
            />
            {errors.title && <div className="error-text">{errors.title}</div>}
          </div>

          {/* الصورة */}
          <div className="form-group">
            <label htmlFor="image">صورة (في حال أردت التعديل فقط)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={e => setData('image', e.target.files[0])}
              className={errors.image ? "input-error" : ""}
            />
            {guidance.image && !data.image && (
              <div style={{marginTop:'7px', textAlign:'right'}}>
                <div style={{fontSize:'13px', color:'#34495e', marginBottom:'2px'}}>الصورة الحالية:</div>
                <img src={`/storage/${guidance.image}`} alt="الصورة الحالية" style={{height:'60px', borderRadius:'5px', marginTop:'3px'}} />
              </div>
            )}
            {errors.image && <div className="error-text">{errors.image}</div>}
          </div>

          {/* الوصف */}
          <div className="form-group">
            <label htmlFor="description">وصف نصي</label>
            <textarea
              id="description"
              rows={4}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              required
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <div className="error-text">{errors.description}</div>}
          </div>

          {/* الرابط */}
          <div className="form-group">
            <label htmlFor="link">رابط المقال أو الكتاب أو الفيديو (اختياري)</label>
            <input
              type="url"
              id="link"
              value={data.link}
              placeholder="https://example.com"
              onChange={e => setData('link', e.target.value)}
              className={errors.link ? "input-error" : ""}
            />
            {errors.link && <div className="error-text">{errors.link}</div>}
          </div>

          {/* نوع الإرشاد */}
          <div className="form-group">
            <label htmlFor="type">نوع الإرشاد</label>
            <select
              id="type"
              value={data.type}
              onChange={e => setData('type', e.target.value)}
              required
              className={errors.type ? "input-error" : ""}
            >
              <option value="" disabled>اختر النوع</option>
              <option value="article">مقالة</option>
              <option value="book">كتاب</option>
              <option value="video">فيديو</option>
              <option value="advice">نصيحة</option>
            </select>
            {errors.type && <div className="error-text">{errors.type}</div>}
          </div>

          {/* عام (isGeneral) */}
          {/* <div className="form-group">
            <label htmlFor="isGeneral">عام</label>
            <select
              id="isGeneral"
              value={data.isGeneral}
              onChange={e => setData('isGeneral', e.target.value)}
              required
              className={errors.isGeneral ? "input-error" : ""}
            >
              <option value="" disabled>هل هو لكلية بحد ذاتها أم للموقع كامل؟</option>
              <option value="لكلية">لكلية بحد ذاتها</option>
              <option value="للموقع">للموقع كامل</option>
            </select>
            {errors.isGeneral && <div className="error-text">{errors.isGeneral}</div>}
          </div> */}


          <div style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15
          }}>
            <button
              className="submit-btn"
              type="submit"
              disabled={processing}
              style={{ flex: 1 }}
            >
              {processing ? 'جاري التحديث...' : 'تحديث البيانات'}
            </button>
            <Link
              href={route('guidances.index')}
              style={{
                color: "#3a8dde",
                textDecoration: "underline",
                background: "#eaf4ff",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: "15px",
                fontWeight: "bold",
                minWidth: "83px",
                textAlign: "center"
              }}>
              رجوع
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
