import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import "@/Components/Admin/Style/Style.css";

export default function Create({ auth, governorates, colleges, specializations }) {
  const { data, setData, post, processing, errors } = useForm({
    specialization_id: "",
    name: "",
    details: "",
    icon: null,
  });

  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [filteredSpecializations, setFilteredSpecializations] = useState(specializations);

  useEffect(() => {
    if (selectedGovernorate === "") setFilteredColleges(colleges);
    else setFilteredColleges(colleges.filter(c => c.governorate_id === parseInt(selectedGovernorate)));
    setSelectedCollege("");
    setData("specialization_id", "");
  }, [selectedGovernorate]);

  useEffect(() => {
    if (selectedCollege === "") setFilteredSpecializations(specializations);
    else setFilteredSpecializations(specializations.filter(s => s.college_id === parseInt(selectedCollege)));
    setData("specialization_id", "");
  }, [selectedCollege]);

  const handleChange = e => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setData(name, files[0]);
    } else {
      setData(name, value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    post(route("adminfutureopportunities.store"), { forceFormData: true });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة آفاق مستقبلية" />
      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">إضافة آفاق مستقبلية جديدة</h2>
        <div className="form-group">
          <label>المحافظة</label>
          <select required value={selectedGovernorate} onChange={e => setSelectedGovernorate(e.target.value)}>
            <option value="">اختر المحافظة</option>
            {governorates.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>الكلية</label>
          <select required value={selectedCollege} onChange={e => setSelectedCollege(e.target.value)} disabled={!selectedGovernorate}>
            <option value="">اختر الكلية</option>
            {filteredColleges.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>التخصص</label>
          <select name="specialization_id" required value={data.specialization_id} onChange={handleChange} disabled={!selectedCollege}>
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.specialization_id && <p className="input-error">{errors.specialization_id}</p>}
        </div>

        <div className="form-group">
          <label>اسم الآفاق المستقبلية</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} maxLength={100} required className={errors.name ? "input-error" : ""} />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>التفاصيل</label>
          <textarea name="details" rows={4} value={data.details} onChange={handleChange} required className={errors.details ? "input-error" : ""} />
          {errors.details && <p className="input-error">{errors.details}</p>}
        </div>

        <div className="form-group">
          <label>أيقونة (رفع صورة)</label>
          <input type="file" name="icon" accept="image/*" onChange={handleChange} required className={errors.icon ? "input-error" : ""} />
          {errors.icon && <p className="input-error">{errors.icon}</p>}
        </div>

        {data.icon && typeof data.icon === 'string' ? (
          <img src={`/storage/${data.icon}`} alt="icon preview" style={{ width: 100, height: 'auto', marginBottom: 10 }} />
        ) : null}

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? "جاري الحفظ..." : "حفظ البيانات"}
          </button>
          <Link href={route("adminfutureopportunities.index")} className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
