import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import "@/Components/Admin/Style/Style.css";

export default function Edit({ auth, top_student, governorates, colleges, specializations }) {
  const { data, setData } = useForm({
    specialization_id: top_student.specialization_id || "",
    name: top_student.name || "",
    image: null,
    gpa: top_student.gpa || "",
    rank: top_student.rank || "",
    graduation_year: top_student.graduation_year || "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    top_student.specialization?.college?.governorate_id?.toString() || ""
  );
  const [selectedCollege, setSelectedCollege] = useState(
    top_student.specialization?.college_id?.toString() || ""
  );
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);
  // تغيير الحقول
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") setData(name, files[0]);
    else setData(name, value);
  };
  useEffect(() => {
    if (selectedGovernorate) {
      setFilteredColleges(colleges.filter((c) => c.governorate_id.toString() === selectedGovernorate));
    } else {
      setFilteredColleges(colleges);
    }
  }, [selectedGovernorate, colleges]);

  useEffect(() => {
    if (selectedCollege) {
      setFilteredSpecializations(specializations.filter((s) => s.college_id.toString() === selectedCollege));
    } else {
      setFilteredSpecializations(specializations);
    }
  }, [selectedCollege, specializations]);

  const handleGovernorateChange = (e) => {
    setSelectedGovernorate(e.target.value);
    setSelectedCollege("");
    setData("specialization_id", "");
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setData("specialization_id", "");
  };



//   formData.append('_method', 'PUT');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route("admintopstudents.update", { admintopstudent: top_student.id }), {
//       preserveScroll: true,
//       forceFormData: true,
//     });
//   };
// إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    const formData = new FormData();
    // باقي الحقول
    for (const key of [
      'specialization_id',
      'name',
      'gpa',
      'rank',
      'graduation_year',
    ]) {
      formData.append(key, data[key]);
    }
    // الصورة - إذا رفع ملف جديد
    if (data.image) {
      formData.append('image', data.image);
    }
    // _method لتحويل post إلى put
    formData.append('_method', 'PUT');

    Inertia.post(route('admintopstudents.update', top_student.id), formData, {
      preserveScroll: true,
      onError: (errs) => setErrors(errs),
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تعديل الطالب - ${top_student.name}`} />

      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">تعديل بيانات الطالب</h2>

        {/* المحافظة */}
        <div className="form-group">
          <label>المحافظة</label>
          <select value={selectedGovernorate} onChange={handleGovernorateChange} required>
            <option value="">اختر المحافظة</option>
            {governorates.map((gov) => (
              <option key={gov.id} value={gov.id.toString()}>
                {gov.name}
              </option>
            ))}
          </select>
        </div>

        {/* الكلية */}
        <div className="form-group">
          <label>الكلية</label>
          <select value={selectedCollege} onChange={handleCollegeChange} required>
            <option value="">اختر الكلية</option>
            {filteredColleges.map((col) => (
              <option key={col.id} value={col.id.toString()}>
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
          <label>الصورة (يمكن رفع صورة جديدة)</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className={errors.image ? "input-error" : ""} />
          {top_student.image && (
            <img src={`/storage/${top_student.image}`} alt={top_student.name} style={{ marginTop: 10, width: 100, borderRadius: 8 }} />
          )}
          {errors.image && <p className="input-error">{errors.image}</p>}
        </div>

        {/* المعدل التراكمي */}
        <div className="form-group">
          <label>المعدل التراكمي (GPA)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
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
          <label>الترتيب</label>
          <input
            type="number"
            min="1"
            name="rank"
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
            {processing ? "جاري التحديث..." : "تحديث البيانات"}
          </button>
          <Link href={route("admintopstudents.index")} className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
