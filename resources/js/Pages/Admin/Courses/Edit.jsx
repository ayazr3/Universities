import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import "@/Components/Admin/Style/Style.css";

export default function Edit({ auth, course, governorates, colleges, specializations }) {
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    course.specialization?.college?.governorate_id?.toString() || ""
  );
  const [selectedCollege, setSelectedCollege] = useState(
    course.specialization?.college_id?.toString() || ""
  );
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const { data, setData, put, processing, errors } = useForm({
    specialization_id: course.specialization_id || "",
    name: course.name || "",
    description: course.description || "",
    file: null,
    academic_year_number: course.academic_year_number || "",
  });

  useEffect(() => {
    if (selectedGovernorate) {
      setFilteredColleges(
        colleges.filter((c) => c.governorate_id.toString() === selectedGovernorate)
      );
    } else {
      setFilteredColleges(colleges);
    }
  }, [selectedGovernorate, colleges]);

  useEffect(() => {
    if (selectedCollege) {
      setFilteredSpecializations(
        specializations.filter((s) => s.college_id.toString() === selectedCollege)
      );
    } else {
      setFilteredSpecializations(specializations);
    }
  }, [selectedCollege, specializations]);

  const handleGovernorateChange = (e) => {
    const govId = e.target.value;
    setSelectedGovernorate(govId);
    setSelectedCollege("");
    setData("specialization_id", "");
  };

  const handleCollegeChange = (e) => {
    const collegeId = e.target.value;
    setSelectedCollege(collegeId);
    setData("specialization_id", "");
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setData(name, files[0]);
    } else {
      setData(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("specialization_id", data.specialization_id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("academic_year_number", data.academic_year_number);
    if (data.file) {
      formData.append("file", data.file);
    }
    formData.append("_method", "PUT");

    Inertia.post(route("admincourses.update", { admincourse: course.id }), formData, {
      preserveScroll: true,
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تعديل مقرر - ${course.name}`} />

      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">تعديل المقرر الدراسي</h2>

        {/* المحافظة */}
        <div className="form-group">
          <label>المحافظة</label>
          <select value={selectedGovernorate} onChange={handleGovernorateChange} required>
            <option value="">اختر المحافظة</option>
            {governorates.map((g) => (
              <option key={g.id} value={g.id.toString()}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* الكلية */}
        <div className="form-group">
          <label>الكلية</label>
          <select value={selectedCollege} onChange={handleCollegeChange} required>
            <option value="">اختر الكلية</option>
            {filteredColleges.map((c) => (
              <option key={c.id} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* التخصص */}
        <div className="form-group">
          <label>التخصص</label>
          <select
            name="specialization_id"
            value={data.specialization_id}
            onChange={handleChange}
            required
          >
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
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
            value={data.name}
            onChange={handleChange}
            maxLength={100}
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

        {/* ملف المقرر الجديد */}
        <div className="form-group">
          <label>ملف المقرر (يمكن رفع ملف جديد)</label>
          <input type="file" name="file" onChange={handleChange} />
          {course.file_url && (
            <a
              href={`/storage/${course.file_url}`}
              target="_blank"
              className="mt-2 mb-2 block"
              rel="noreferrer"
            >
              تحميل الملف الحالي
            </a>
          )}
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
          {errors.academic_year_number && (
            <p className="input-error">{errors.academic_year_number}</p>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? "جاري التحديث..." : "تحديث البيانات"}
          </button>
          <Link href="/admincourses" className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
