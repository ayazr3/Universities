import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '@/Components/Admin/Style/Style.css';

export default function Create({ auth, colleges, governorates }) {
  const { data, setData, post, processing, errors } = useForm({
    college_id: '',
    name: '',
    summary: '',
    details: '',
    title: '',
    icon: null,
    degree_type: '',
    academic_year_number: '',
  });

  const [selectedGovernorate, setSelectedGovernorate] = useState('');
    const [filteredColleges, setFilteredColleges] = useState(colleges);

    const handleGovernorateChange = (e) => {
    const govId = e.target.value;
    setSelectedGovernorate(govId);
    const newFiltered = colleges.filter(c => c.governorate_id === parseInt(govId));
    setFilteredColleges(newFiltered);
    setData('college_id', ''); // Reset selected college
    };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setData(name, files[0]);
    } else {
      setData(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('adminspecializations.store'), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة تخصص" />
      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">إضافة تخصص جديد</h2>

        {/* الكلية */}
        {/* <div className="form-group">
          <label htmlFor="college_id">الكلية</label>
          <select
            id="college_id"
            name="college_id"
            value={data.college_id}
            onChange={handleChange}
            required
            className={errors.college_id ? 'input-error' : ''}
          >
            <option value="">اختر الكلية</option>
            {colleges.map(college => (
              <option key={college.id} value={college.id}>{college.name}</option>
            ))}
          </select>
          {errors.college_id && <p className="input-error">{errors.college_id}</p>}
        </div> */}
        {/* اختيار المحافظة */}
        <div className="form-group">
        <label htmlFor="governorate_id">المحافظة</label>
        <select
            id="governorate_id"
            name="governorate_id"
            value={selectedGovernorate}
            onChange={handleGovernorateChange}
            required
        >
            <option value="">اختر المحافظة</option>
            {governorates.map(gov => (
            <option key={gov.id} value={gov.id}>{gov.name}</option>
            ))}
        </select>
        </div>

        {/* اختيار الكلية بعد التصفية */}
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
            <option value="">اختر الكلية</option>
            {filteredColleges.map(college => (
            <option key={college.id} value={college.id}>{college.name}</option>
            ))}
        </select>
        {errors.college_id && <p className="input-error">{errors.college_id}</p>}
        </div>
        {/* اسم التخصص */}
        <div className="form-group">
          <label htmlFor="name">اسم التخصص</label>
          <input
            type="text"
            id="name"
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
          ></textarea>
          {errors.summary && <p className="input-error">{errors.summary}</p>}
        </div>

        {/* التفاصيل */}
        <div className="form-group">
          <label htmlFor="details">تفاصيل التخصص</label>
          <textarea
            id="details"
            name="details"
            rows={6}
            value={data.details}
            onChange={handleChange}
            required
            className={errors.details ? 'input-error' : ''}
          ></textarea>
          {errors.details && <p className="input-error">{errors.details}</p>}
        </div>

        {/* العنوان */}
        <div className="form-group">
          <label htmlFor="title">العنوان</label>
          <input
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            maxLength={255}
            required
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <p className="input-error">{errors.title}</p>}
        </div>

        {/* الأيقونة */}
        <div className="form-group">
          <label htmlFor="icon">أيقونة التخصص (صورة)</label>
          <input
            type="file"
            id="icon"
            name="icon"
            accept="image/*"
            onChange={handleChange}
            required
            className={errors.icon ? 'input-error' : ''}
          />
          {errors.icon && <p className="input-error">{errors.icon}</p>}
        </div>

        {/* نوع الدرجة */}
        <div className="form-group">
          <label htmlFor="degree_type">نوع الدرجة</label>
          <input
            type="text"
            id="degree_type"
            name="degree_type"
            value={data.degree_type}
            onChange={handleChange}
            maxLength={100}
            required
            className={errors.degree_type ? 'input-error' : ''}
          />
          {errors.degree_type && <p className="input-error">{errors.degree_type}</p>}
        </div>

        {/* عدد سنوات الدراسة */}
        <div className="form-group">
          <label htmlFor="academic_year_number">عدد سنوات الدراسة</label>
          <input
            type="number"
            id="academic_year_number"
            name="academic_year_number"
            min="1"
            value={data.academic_year_number}
            onChange={handleChange}
            required
            className={errors.academic_year_number ? 'input-error' : ''}
          />
          {errors.academic_year_number && <p className="input-error">{errors.academic_year_number}</p>}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? 'جاري الحفظ...' : 'حفظ البيانات'}
          </button>
          <Link href={route('adminspecializations.index')} className="back-link" style={{ alignSelf: 'center' }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
