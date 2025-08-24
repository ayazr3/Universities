import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import "@/Components/Admin/Style/Style.css";

export default function Create({ auth, governorates, colleges, specializations }) {
  const { data, setData, post, processing, errors } = useForm({
    specialization_id: "",
    name: "",
    image: null,
    gpa: "",
    rank: "",
    graduation_year: "",
  });

  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [filteredSpecializations, setFilteredSpecializations] = useState(specializations);

  // فلترة الكليات حسب المحافظة المختارة
  useEffect(() => {
    if (!selectedGovernorate) setFilteredColleges(colleges);
    else setFilteredColleges(colleges.filter(c => c.governorate_id === parseInt(selectedGovernorate)));
    setSelectedCollege("");
    setData("specialization_id", "");
  }, [selectedGovernorate]);

  // فلترة التخصصات بعد اختيار الكلية
  useEffect(() => {
    if (!selectedCollege) setFilteredSpecializations(specializations);
    else setFilteredSpecializations(specializations.filter(s => s.college_id === parseInt(selectedCollege)));
    setData("specialization_id", "");
  }, [selectedCollege]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") setData(name, files[0]);
    else setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admintopstudents.store"), { forceFormData: true });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة طالب أول" />

      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">إضافة طالب أول جديد</h2>

        {/* المحافظة */}
        <div className="form-group">
          <label>المحافظة</label>
          <select value={selectedGovernorate} onChange={e => setSelectedGovernorate(e.target.value)} required>
            <option value="">اختر المحافظة</option>
            {governorates.map(gov => (<option key={gov.id} value={gov.id}>{gov.name}</option>))}
          </select>
        </div>

        {/* الكلية */}
        <div className="form-group">
          <label>الكلية</label>
          <select value={selectedCollege} onChange={e => setSelectedCollege(e.target.value)} required>
            <option value="">اختر الكلية</option>
            {filteredColleges.map(col => (<option key={col.id} value={col.id}>{col.name}</option>))}
          </select>
        </div>

        {/* التخصص */}
        <div className="form-group">
          <label>التخصص</label>
          <select name="specialization_id" value={data.specialization_id} onChange={handleChange} required>
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map(spec => (<option key={spec.id} value={spec.id}>{spec.name}</option>))}
          </select>
          {errors.specialization_id && <p className="input-error">{errors.specialization_id}</p>}
        </div>

        {/* الاسم */}
        <div className="form-group">
          <label>الاسم</label>
          <input
            type="text"
            name="name"
            maxLength={100}
            value={data.name}
            onChange={handleChange}
            required
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        {/* الصورة */}
        <div className="form-group">
          <label>صورة الطالب</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className={errors.image ? "input-error" : ""}
          />
          {errors.image && <p className="input-error">{errors.image}</p>}
        </div>

        {/* المعدل */}
        <div className="form-group">
          <label>المعدل التراكمي (GPA)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            name="gpa"
            value={data.gpa}
            onChange={handleChange}
            required
            className={errors.gpa ? "input-error" : ""}
          />
          {errors.gpa && <p className="input-error">{errors.gpa}</p>}
        </div>

        {/* الترتيب */}
        <div className="form-group">
          <label>ترتيب الطالب</label>
          <input
            type="number"
            name="rank"
            min="1"
            value={data.rank}
            onChange={handleChange}
            required
            className={errors.rank ? "input-error" : ""}
          />
          {errors.rank && <p className="input-error">{errors.rank}</p>}
        </div>

        {/* سنة التخرج */}
        <div className="form-group">
          <label>سنة التخرج</label>
          <input
            type="number"
            name="graduation_year"
            value={data.graduation_year}
            onChange={handleChange}
            required
            className={errors.graduation_year ? "input-error" : ""}
          />
          {errors.graduation_year && <p className="input-error">{errors.graduation_year}</p>}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? "جاري الحفظ..." : "حفظ البيانات"}
          </button>
          <Link href={route("admintopstudents.index")} className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
