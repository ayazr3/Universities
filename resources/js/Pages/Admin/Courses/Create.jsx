import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import "@/Components/Admin/Style/Style.css";

export default function Create({ auth, governorates, colleges, specializations }) {
  const { data, setData, post, processing, errors } = useForm({
    specialization_id: "",
    name: "",
    description: "",
    file: null,
    academic_year_number: "",
  });

  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [filteredSpecializations, setFilteredSpecializations] = useState(specializations);

  // تصفية الكليات حسب المحافظة
  useEffect(() => {
    if (selectedGovernorate === "") setFilteredColleges(colleges);
    else setFilteredColleges(colleges.filter((c) => c.governorate_id === parseInt(selectedGovernorate)));
    setSelectedCollege("");
    setData("specialization_id", "");
  }, [selectedGovernorate]);

  // تصفية التخصصات حسب الكلية
  useEffect(() => {
    if (selectedCollege === "") setFilteredSpecializations(specializations);
    else setFilteredSpecializations(specializations.filter((s) => s.college_id === parseInt(selectedCollege)));
    setData("specialization_id", "");
  }, [selectedCollege]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setData(name, files[0]);
    } else {
      setData(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admincourses.store"), { forceFormData: true });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة مقرر دراسي" />

      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">إضافة مقرر دراسي جديد</h2>

        {/* المحافظة */}
        <div className="form-group">
          <label>المحافظة</label>
          <select value={selectedGovernorate} onChange={(e) => setSelectedGovernorate(e.target.value)} required>
            <option value="">اختر المحافظة</option>
            {governorates.map((gov) => (
              <option key={gov.id} value={gov.id}>
                {gov.name}
              </option>
            ))}
          </select>
        </div>

        {/* الكلية */}
        <div className="form-group">
          <label>الكلية</label>
          <select value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)} required>
            <option value="">اختر الكلية</option>
            {filteredColleges.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* التخصص */}
        <div className="form-group">
          <label>التخصص</label>
          <select name="specialization_id" value={data.specialization_id} onChange={handleChange} required>
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
          {errors.specialization_id && <p className="input-error">{errors.specialization_id}</p>}
        </div>

        {/* اسم المقرر */}
        <div className="form-group">
          <label>اسم المقرر</label>
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

        {/* الوصف */}
        <div className="form-group">
          <label>الوصف</label>
          <textarea
            name="description"
            rows={4}
            value={data.description}
            onChange={handleChange}
            required
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && <p className="input-error">{errors.description}</p>}
        </div>

        {/* ملف المقرر */}
        <div className="form-group">
          <label>ملف المقرر (PDF, DOCX)</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.docx"
            onChange={handleChange}
            required
            className={errors.file ? "input-error" : ""}
          />
          {errors.file && <p className="input-error">{errors.file}</p>}
        </div>

        {/* السنة الأكاديمية */}
        <div className="form-group">
          <label>السنة الأكاديمية</label>
          <input
            type="number"
            name="academic_year_number"
            value={data.academic_year_number}
            onChange={handleChange}
            required
            className={errors.academic_year_number ? "input-error" : ""}
          />
          {errors.academic_year_number && <p className="input-error">{errors.academic_year_number}</p>}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? "جاري الحفظ..." : "حفظ البيانات"}
          </button>
          <Link href={route("admincourses.index")} className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
