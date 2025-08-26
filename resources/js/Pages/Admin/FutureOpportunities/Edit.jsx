import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import "@/Components/Admin/Style/Style.css";

export default function Edit({ auth, future_opportunity, governorates, colleges, specializations }) {
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    future_opportunity.specialization?.college?.governorate_id?.toString() || ""
  );
  const [selectedCollege, setSelectedCollege] = useState(
    future_opportunity.specialization?.college_id?.toString() || ""
  );
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const { data, setData, errors, processing } = useForm({
    specialization_id: future_opportunity.specialization_id || "",
    name: future_opportunity.name || "",
    details: future_opportunity.details || "",
    icon: null,
  });

  useEffect(() => {
    if (selectedGovernorate) {
      setFilteredColleges(colleges.filter(c => c.governorate_id.toString() === selectedGovernorate));
    } else {
      setFilteredColleges(colleges);
    }
  }, [selectedGovernorate, colleges]);

  useEffect(() => {
    if (selectedCollege) {
      setFilteredSpecializations(specializations.filter(s => s.college_id.toString() === selectedCollege));
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
    formData.append("details", data.details);
    if (data.icon) {
      formData.append("icon", data.icon);
    }
    formData.append("_method", "PUT");

    Inertia.post(route("adminfutureopportunities.update", { adminfutureopportunity: future_opportunity.id }), formData, {
      preserveScroll: true,
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تعديل آفاق مستقبلية - ${future_opportunity.name}`} />
      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">تعديل آفاق مستقبلية</h2>

        <div className="form-group">
          <label>المحافظة</label>
          <select value={selectedGovernorate} onChange={handleGovernorateChange} required>
            <option value="">اختر المحافظة</option>
            {governorates.map(g => (
              <option key={g.id} value={g.id.toString()}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>الكلية</label>
          <select value={selectedCollege} onChange={handleCollegeChange} required disabled={!selectedGovernorate}>
            <option value="">اختر الكلية</option>
            {filteredColleges.map(c => (
              <option key={c.id} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>التخصص</label>
          <select
            name="specialization_id"
            value={data.specialization_id}
            onChange={handleChange}
            required
            disabled={!selectedCollege}
          >
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.specialization_id && <p className="input-error">{errors.specialization_id}</p>}
        </div>

        <div className="form-group">
          <label>اسم الآفاق المستقبلية</label>
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

        <div className="form-group">
          <label>التفاصيل</label>
          <textarea
            name="details"
            rows={4}
            value={data.details}
            onChange={handleChange}
            required
            className={errors.details ? "input-error" : ""}
          />
          {errors.details && <p className="input-error">{errors.details}</p>}
        </div>

        <div className="form-group">
          <label>أيقونة (رفع صورة جديدة)</label>
          <input
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleChange}
            className={errors.icon ? "input-error" : ""}
          />
          {errors.icon && <p className="input-error">{errors.icon}</p>}
          {data.icon && typeof data.icon === "string" && (
            <img src={`/storage/${data.icon}`} alt="icon preview" style={{ width: 100, marginTop: 10 }} />
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? "جاري التحديث..." : "تحديث البيانات"}
          </button>
          <Link href={route("adminfutureopportunities.index")} className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
