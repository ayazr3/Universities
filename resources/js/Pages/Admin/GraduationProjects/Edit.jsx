import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import "@/Components/Admin/Style/Style.css";

export default function Edit({ auth, graduation_project, governorates, colleges, specializations }) {
  // تحويل project_images إلى مصفوفة سليمة
  const initialOldImages = React.useMemo(() => {
    try {
      return Array.isArray(graduation_project.project_images)
        ? graduation_project.project_images
        : JSON.parse(graduation_project.project_images || "[]");
    } catch {
      return [];
    }
  }, [graduation_project.project_images]);

  // معالجة team_members إلى مصفوفة سليمة
  const safeTeamMembers = React.useMemo(() => {
    try {
      return Array.isArray(graduation_project.team_members)
        ? graduation_project.team_members
        : JSON.parse(graduation_project.team_members || "[]");
    } catch {
      return [];
    }
  }, [graduation_project.team_members]);

  // حالات الصور القديمة؛ نتحكم بها محليًا للعرض والتحديث
  const [oldImages, setOldImages] = useState(initialOldImages);
  // الصور المحذوفة سوف نرسلها للباك اند
  const [deletedImages, setDeletedImages] = useState([]);

  const [selectedGovernorate, setSelectedGovernorate] = useState(
    graduation_project.specialization?.college?.governorate_id?.toString() || ""
  );
  const [selectedCollege, setSelectedCollege] = useState(
    graduation_project.specialization?.college_id?.toString() || ""
  );
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const { data, setData, put, post, processing, errors } = useForm({
  specialization_id: graduation_project.specialization_id || "",
  name: graduation_project.name || "",
  description: graduation_project.description || "",
  thesis_file: null,
  project_images: [],
  graduation_year: graduation_project.graduation_year || "",
  team_members: safeTeamMembers.length ? safeTeamMembers : [""],
  supervisor: graduation_project.supervisor || "",
});


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

  const removeTeamMember = (idx) => {
    const members = [...data.team_members];
    members.splice(idx, 1);
    setData("team_members", members);
  };

  // حذف صورة قديمة من العرض وإضافتها للحذف
  const handleDeleteOldImage = (imgName) => {
    setOldImages((prev) => prev.filter((img) => img !== imgName));
    setDeletedImages((prev) => [...prev, imgName]);
  };

  const handleDeleteAllOldImages = () => {
    setDeletedImages((prev) => [...prev, ...oldImages]);
    setOldImages([]);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('specialization_id', data.specialization_id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('graduation_year', data.graduation_year);
    formData.append('supervisor', data.supervisor);

    data.team_members.forEach((val, i) => {
      formData.append(`team_members[${i}]`, val);
    });

    if (data.thesis_file) {
      formData.append('thesis_file', data.thesis_file);
    }

    if (data.project_images.length > 0) {
      data.project_images.forEach(file => {
        formData.append('project_images[]', file);
      });
    }

    // ارسل الصور القديمة كعناصر منفصلة في مصفوفة
    oldImages.forEach(img => {
      formData.append('existing_images[]', img);
    });

    // أرسل الصور المحذوفة كسلسلة JSON
    formData.append('deleted_images', JSON.stringify(deletedImages));

    formData.append('_method', 'PUT');

    Inertia.post(route('admingraduation_projects.update', { admingraduation_project: graduation_project.id }), formData, {
      preserveScroll: true,
      forceFormData: true,
    });
  };





  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تعديل مشروع - ${graduation_project.name}`} />
      <form className="modern-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>

        <h2 className="form-title">تعديل مشروع التخرج</h2>

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
          <select name="specialization_id" value={data.specialization_id} onChange={handleChange} required>
            <option value="">اختر التخصص</option>
            {filteredSpecializations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.specialization_id && <p className="input-error">{errors.specialization_id}</p>}
        </div>

        {/* الحقول الأخرى */}
        <div className="form-group">
          <label>اسم المشروع</label>
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

        <div className="form-group">
          <label>ملف البحث النهائي (يمكن رفع ملف جديد)</label>
          <input type="file" name="thesis_file" accept=".pdf,.docx" onChange={handleChange} />
          {graduation_project.thesis_file && (
            <a href={`/storage/${graduation_project.thesis_file}`} target="_blank" className="mt-2 mb-2 block" rel="noreferrer">
              تحميل الملف الحالي
            </a>
          )}
          {errors.thesis_file && <p className="input-error">{errors.thesis_file}</p>}
        </div>

        {/* صور المشروع مع إمكانية حذف كل صورة */}
        <div className="form-group">
          <label>صور المشروع (يمكن اختيار أكثر من صورة جديدة)</label>
          <input type="file" name="project_images" accept="image/*" multiple onChange={handleChange} />
          {errors.project_images && <p className="input-error">{errors.project_images}</p>}
          <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {oldImages.length === 0 && data.project_images.length === 0 ? (
              <p>لا توجد صور حالياً.</p>
            ) : (
              <>
                {oldImages.map((img, i) => (
                  <div key={i} style={{ position: "relative", display: "inline-block" }}>
                    <img
                      src={`/storage/${img}`}
                      alt={`project-img-${i}`}
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteOldImage(img)}
                      style={{
                        position: "absolute",
                        top: 2,
                        left: 2,
                        background: "rgba(255,40,40,0.87)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: 18,
                        lineHeight: "22px",
                      }}
                      title="حذف الصورة"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* زر لحذف كل الصور القديمة دفعة واحدة */}
          {oldImages.length > 0 && (
            <button type="button" onClick={() => setOldImages([]) || setDeletedImages([...deletedImages, ...oldImages])} style={{ marginTop: 8 }}>
              حذف كل الصور القديمة
            </button>
          )}
        </div>

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

        <div className="form-group">
          <label>أعضاء الفريق</label>
          {data.team_members.map((member, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="text" value={member} onChange={(e) => handleTeamMemberChange(idx, e.target.value)} required />
              {data.team_members.length > 1 && (
                <button type="button" onClick={() => removeTeamMember(idx)} style={{ color: "red" }}>
                  -
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTeamMember} style={{ marginTop: 4 }}>
            إضافة عضو
          </button>
          {errors.team_members && <p className="input-error">{errors.team_members}</p>}
        </div>

        <div className="form-group">
          <label>اسم المشرف</label>
          <input
            type="text"
            name="supervisor"
            value={data.supervisor}
            onChange={handleChange}
            maxLength={100}
            required
            className={errors.supervisor ? "input-error" : ""}
          />
          {errors.supervisor && <p className="input-error">{errors.supervisor}</p>}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" className="submit-btn" disabled={processing}>
            {processing ? "جاري التحديث..." : "تحديث البيانات"}
          </button>
          <Link href="/admingraduation_projects" className="back-link" style={{ alignSelf: "center" }}>
            رجوع
          </Link>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
