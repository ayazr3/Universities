import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import "@/Components/Admin/Style/Style.css";

export default function Create({ auth, governorates, colleges, specializations }) {
  const { data, setData, post, processing, errors } = useForm({
    specialization_id: "",
    name: "",
    description: "",
    thesis_file: null,
    project_images: [],
    graduation_year: "",
    team_members: [],
    supervisor: "",
  });

  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [filteredSpecializations, setFilteredSpecializations] = useState(specializations);

  // تصفية الكليات حسب المحافظة
  useEffect(() => {
    if (selectedGovernorate === "") setFilteredColleges(colleges);
    else setFilteredColleges(colleges.filter(c => c.governorate_id === parseInt(selectedGovernorate)));
    setSelectedCollege("");
    setData("specialization_id", "");
  }, [selectedGovernorate]);

  // تصفية التخصصات حسب الكلية
  useEffect(() => {
    if (selectedCollege === "") setFilteredSpecializations(specializations);
    else setFilteredSpecializations(specializations.filter(s => s.college_id === parseInt(selectedCollege)));
    setData("specialization_id", "");
  }, [selectedCollege]);

  const handleChange = e => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      if (name === "project_images") setData(name, Array.from(files));
      else setData(name, files[0]);
    } else {
      setData(name, value);
    }
  };

  const handleTeamMemberChange = (idx, value) => {
    const members = [...data.team_members];
    members[idx] = value;
    setData("team_members", members);
  };
  const addTeamMember = () => setData("team_members", [...data.team_members, ""]);
  const removeTeamMember = idx => {
    let members = [...data.team_members];
    members.splice(idx, 1);
    setData("team_members", members);
  };

  const handleSubmit = e => {
    e.preventDefault();
    post(route('admingraduation_projects.store'), { forceFormData: true });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة مشروع تخرج" />
      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <h2 className="form-title">إضافة مشروع تخرج جديد</h2>
        {/* المحافظة */}
        <div className="form-group">
          <label>المحافظة</label>
          <select required value={selectedGovernorate} onChange={e => setSelectedGovernorate(e.target.value)}>
            <option value="">اختر المحافظة</option>
            {governorates.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
        {/* الكلية */}
        <div className="form-group">
          <label>الكلية</label>
          <select required value={selectedCollege} onChange={e => setSelectedCollege(e.target.value)}>
            <option value="">اختر الكلية</option>
            {filteredColleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        {/* التخصص */}
        <div className="form-group">
          <label>التخصص</label>
          <select name="specialization_id" required value={data.specialization_id} onChange={handleChange}>
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {errors.specialization_id && <p className="input-error">{errors.specialization_id}</p>}
        </div>
        {/* اسم المشروع */}
        <div className="form-group">
          <label>اسم المشروع</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} maxLength={100} required className={errors.name ? 'input-error' : ''} />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>
        {/* الوصف */}
        <div className="form-group">
          <label>الوصف</label>
          <textarea name="description" rows={4} value={data.description} onChange={handleChange} required className={errors.description ? 'input-error' : ''}></textarea>
          {errors.description && <p className="input-error">{errors.description}</p>}
        </div>
        {/* ملف البحث النهائي */}
        <div className="form-group">
          <label>ملف البحث النهائي (PDF أو DOCX)</label>
          <input type="file" name="thesis_file" accept=".pdf,.docx" onChange={handleChange} required className={errors.thesis_file ? 'input-error' : ''} />
          {errors.thesis_file && <p className="input-error">{errors.thesis_file}</p>}
        </div>
        {/* صور المشروع */}
        <div className="form-group">
          <label>صور المشروع (يمكن اختيار أكثر من صورة)</label>
          <input type="file" name="project_images" accept="image/*" onChange={handleChange} multiple required className={errors.project_images ? 'input-error' : ''} />
          {errors.project_images && <p className="input-error">{errors.project_images}</p>}
        </div>
        {/* سنة التخرج */}
        <div className="form-group">
          <label>سنة التخرج</label>
          <input type="number" name="graduation_year" value={data.graduation_year} onChange={handleChange} required />
          {errors.graduation_year && <p className="input-error">{errors.graduation_year}</p>}
        </div>
        {/* أعضاء الفريق */}
        <div className="form-group">
        <label>أعضاء الفريق (افصل بينهم بفواصل)</label>
        <input
            type="text"
            name="team_members"
            value={data.team_members}
            onChange={e => setData('team_members', e.target.value)}
            placeholder="مثلاً: أحمد، محمد، سارة"
            className={errors.team_members ? 'input-error' : ''}
            required
        />
        {errors.team_members && <p className="input-error">{errors.team_members}</p>}
        </div>
        {/* المشرف */}
        <div className="form-group">
          <label>اسم المشرف</label>
          <input type="text" name="supervisor" value={data.supervisor} onChange={handleChange} maxLength={100} required className={errors.supervisor ? 'input-error' : ''} />
          {errors.supervisor && <p className="input-error">{errors.supervisor}</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? 'جاري الحفظ...' : 'حفظ البيانات'}
          </button>
          <Link href={route('admingraduation_projects.index')} className="back-link" style={{ alignSelf: 'center' }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
