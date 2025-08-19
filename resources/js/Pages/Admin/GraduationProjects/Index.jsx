import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import "@/Components/Admin/Style/Style.css";

const truncateWords = (text, wordLimit = 4) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function Index({ auth, graduation_projects, specializations, governorates, stats }) {
  // حالات الفلاتر والبحث
  const [search, setSearch] = useState("");
  const [filterGovernorate, setFilterGovernorate] = useState("");
  const [filterCollege, setFilterCollege] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");

  // قوائم مفلترة للكليات والتخصصات (تعتمد على اختيار المحافظة والكلية)
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  // استخراج الكليات الفريدة من التخصصات
  const allColleges = [...new Map(specializations.map(s => [s.college?.id, s.college])).values()].filter(c => c);

  // تحديث قائمة الكليات بناء على المحافظة المختارة
  useEffect(() => {
    if (filterGovernorate === "") {
      setFilteredColleges(allColleges);
    } else {
      const collegesInGov = allColleges.filter(college => college.governorate?.id.toString() === filterGovernorate);
      setFilteredColleges(collegesInGov);
      // إعادة تعيين الكلية إذا لم تعد ضمن القائمة المفلترة
    //   if (!collegesInGov.some(col => col.id.toString() === filterCollege)) {
    //     setFilterCollege("");
    //   }
    }
  }, [filterGovernorate, allColleges, filterCollege]);

  // تحديث قائمة التخصصات بناء على الكلية المختارة
  useEffect(() => {
    if (filterCollege === "") {
      setFilteredSpecializations(specializations);
    } else {
      const specsInCollege = specializations.filter(spec => spec.college?.id.toString() === filterCollege);
      setFilteredSpecializations(specsInCollege);
      // إعادة تعيين التخصص إذا لم يعد ضمن القائمة المفلترة
      if (!specsInCollege.some(spec => spec.id.toString() === filterSpecialization)) {
        setFilterSpecialization("");
      }
    }
  }, [filterCollege, specializations, filterSpecialization]);



  // فلترة مشاريع التخرج محلياً (اختياري، يعتمد على بيانات الصفحة إذا لم يتم جلبها من السيرفر)
  const filteredProjects = graduation_projects.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesGovernorate = filterGovernorate === "" || p.specialization?.college?.governorate?.id?.toString() === filterGovernorate;
    const matchesCollege = filterCollege === "" || p.specialization?.college?.id?.toString() === filterCollege;
    const matchesSpecialization = filterSpecialization === "" || p.specialization?.id?.toString() === filterSpecialization;

    return matchesSearch && matchesGovernorate && matchesCollege && matchesSpecialization;
  });

  // حذف مشروع تخرج
  const handleDelete = id => {
    if (confirm("هل أنت متأكد من حذف المشروع؟")) {
     Inertia.delete(`/admingraduation_projects/${id}`);
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="مشاريع التخرج" />
      <div className="modern-table-container" style={{ maxWidth: "95%", margin: "40px auto" }}>
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم مشاريع التخرج</span>
          <Link href="/admingraduation_projects/create" className="add-btn">
            إضافة مشروع تخرج
          </Link>
        </div>

        {/* شريط الفلاتر والبحث */}
        <div className="filter-bar" style={{ marginBottom: 20, overflow: "auto", clear: "both", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {/* اختيار المحافظة */}
          <select className="filter-select" value={filterGovernorate} onChange={e => setFilterGovernorate(e.target.value)}>
            <option value="">المحافظة</option>
            {governorates.map(gov => (
              <option key={gov.id} value={gov.id}>{gov.name}</option>
            ))}
          </select>

          {/* اختيار الكلية بعد فلترتها حسب المحافظة */}
          <select className="filter-select" value={filterCollege} onChange={e => setFilterCollege(e.target.value)}>
            <option value="">الكلية</option>
            {filteredColleges.map(college => (
              <option key={college.id} value={college.id}>{college.name}</option>
            ))}
          </select>

          {/* اختيار التخصص بعد فلترته حسب الكلية */}
          <select className="filter-select" value={filterSpecialization} onChange={e => setFilterSpecialization(e.target.value)}>
            <option value="">التخصص</option>
            {filteredSpecializations.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>

          {/* حقل بحث نصي عام */}
          <input
            type="text"
            placeholder="بحث عن مشروع..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />

          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* الإحصائيات */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ background: "#eaf4ff", padding: "16px 24px", borderRadius: 14, minWidth: 160, textAlign: "center", flex: 1 }}>
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>عدد المشاريع الكلي</div>
            <div style={{ fontWeight: "800", fontSize: 22, color: "#2c3e50" }}>{stats.total}</div>
          </div>
          <div style={{ background: "#e7ffe9", padding: "16px 24px", borderRadius: 14, minWidth: 160, textAlign: "center", flex: 1 }}>
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>جديد هذا الأسبوع</div>
            <div style={{ fontWeight: "800", fontSize: 22, color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول مشاريع التخرج */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم المشروع</th>
              <th className="col-specialization">التخصص</th>
              <th className="col-college">الكلية</th>
              <th className="col-governorate">المحافظة</th>
              <th className="col-graduation_year">السنة</th>
              <th className="col-supervisor">المشرف</th>
              <th className="col-members">أسماء الطلاب</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold", padding: "40px 0", color: "#b3b3b3" }}>
                  لا توجد مشاريع للعرض.
                </td>
              </tr>
            ) : (
              filteredProjects.map(project => {
                const members = JSON.parse(project.team_members || "[]");
                return (
                  <tr key={project.id}>
                    <td className="col-name" title={project.name}>{truncateWords(project.name)}</td>
                    <td className="col-specialization">{truncateWords(project.specialization?.name || "--")}</td>
                    <td className="col-college">{truncateWords(project.specialization?.college?.name || "--")}</td>
                    <td className="col-governorate">{truncateWords(project.specialization?.college?.governorate?.name || "--")}</td>
                    <td className="col-graduation_year">{truncateWords(project.graduation_year)}</td>
                    <td className="col-supervisor">{truncateWords(project.supervisor)}</td>
                    <td className="col-members">
                      {members.length > 0 ? (
                        <ol style={{ paddingLeft: 20, margin: 0 }}>
                          {members.map((member, idx) => (
                            <li key={idx}>{member}</li>
                          ))}
                        </ol>
                      ) : (
                        <span style={{ color: "#b3b3b3" }}>لا يوجد أعضاء</span>
                      )}
                    </td>
                    <td>
                      <div className="col-actions" style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <Link href={`/admingraduation_projects/${project.id}`} title="عرض">👁️</Link>
                        <Link href={`/admingraduation_projects/${project.id}/edit`} title="تعديل">✏️</Link>
                        <button type="button" title="حذف" onClick={() => handleDelete(project.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
