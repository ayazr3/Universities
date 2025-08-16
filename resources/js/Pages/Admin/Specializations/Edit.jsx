import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import '@/Components/Admin/Style/Style.css';

export default function Edit({ auth, specialization, colleges }) {
  const [data, setData] = useState({
    college_id: specialization.college_id || '',
    name: specialization.name || '',
    summary: specialization.summary || '',
    details: specialization.details || '',
    title: specialization.title || '',
    icon: null, // تحميل أيقونة جديدة
    degree_type: specialization.degree_type || '',
    academic_year_number: specialization.academic_year_number || '',
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    const formData = new FormData();

    for (const key of ['college_id', 'name', 'summary', 'details', 'title', 'degree_type', 'academic_year_number']) {
      formData.append(key, data[key]);
    }

    if (data.icon) {
      formData.append('icon', data.icon);
    }

    formData.append('_method', 'PUT'); // تحويل POST إلى PUT

    Inertia.post(route('adminspecializations.update', { adminspecialization: specialization.id }), formData, {
      onError: (errs) => {
        setErrors(errs);
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      },
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تعديل التخصص - ${specialization.name}`} />

      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">تعديل بيانات التخصص</h2>

        {/* اختيار الكلية */}
        <div className="form-group">
          <label htmlFor="college_id">الكلية</label>
          <select
            id="college_id"
            name="college_id"
            value={data.college_id}
            onChange={handleChange}
            required
            className={errors.college_id ? 'input-error' : ''}
          >
            <option value="" disabled>اختر الكلية</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>{college.name}</option>
            ))}
          </select>
          {errors.college_id && <p className="input-error">{errors.college_id}</p>}
        </div>

        {/* اسم التخصص */}
        <div className="form-group">
          <label htmlFor="name">اسم التخصص</label>
          <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            maxLength={100}
            required
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        {/* الملخص */}
        <div className="form-group">
          <label htmlFor="summary">الملخص</label>
          <textarea
            id="summary"
            name="summary"
            rows={3}
            value={data.summary}
            onChange={handleChange}
            required
            className={errors.summary ? 'input-error' : ''}
          />
          {errors.summary && <p className="input-error">{errors.summary}</p>}
        </div>

        {/* التفاصيل */}
        <div className="form-group">
          <label htmlFor="details">التفاصيل</label>
          <textarea
            id="details"
            name="details"
            rows={6}
            value={data.details}
            onChange={handleChange}
            required
            className={errors.details ? 'input-error' : ''}
          />
          {errors.details && <p className="input-error">{errors.details}</p>}
        </div>

        {/* العنوان */}
        <div className="form-group">
          <label htmlFor="title">العنوان</label>
          <input
            id="title"
            type="text"
            name="title"
            maxLength={255}
            value={data.title}
            onChange={handleChange}
            required
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <p className="input-error">{errors.title}</p>}
        </div>

        {/* الأيقونة */}
        <div className="form-group">
          <label htmlFor="icon">أيقونة التخصص (صورة جديدة)</label>
          <input
            id="icon"
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleChange}
            className={errors.icon ? 'input-error' : ''}
          />
          {!data.icon && specialization.icon && (
            <img
              src={specialization.icon.startsWith('http') ? specialization.icon : `/storage/${specialization.icon}`}
              alt={specialization.name}
              style={{ width: 100, marginTop: 8, borderRadius: 6 }}
            />
          )}
          {errors.icon && <p className="input-error">{errors.icon}</p>}
        </div>

        {/* نوع الدرجة */}
        <div className="form-group">
          <label htmlFor="degree_type">نوع الدرجة</label>
          <input
            id="degree_type"
            type="text"
            name="degree_type"
            maxLength={100}
            value={data.degree_type}
            onChange={handleChange}
            required
            className={errors.degree_type ? 'input-error' : ''}
          />
          {errors.degree_type && <p className="input-error">{errors.degree_type}</p>}
        </div>

        {/* عدد سنوات الدراسة */}
        <div className="form-group">
          <label htmlFor="academic_year_number">عدد سنوات الدراسة</label>
          <input
            id="academic_year_number"
            type="number"
            name="academic_year_number"
            min={1}
            value={data.academic_year_number}
            onChange={handleChange}
            required
            className={errors.academic_year_number ? 'input-error' : ''}
          />
          {errors.academic_year_number && <p className="input-error">{errors.academic_year_number}</p>}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="submit" disabled={processing} className="submit-btn">
            {processing ? 'جاري التحديث...' : 'تحديث البيانات'}
          </button>
          <Link href={route('adminspecializations.index')} className="back-link" style={{ alignSelf: 'center', marginLeft: 10 }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
