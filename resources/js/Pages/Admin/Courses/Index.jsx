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

export default function Index({ auth, courses, specializations, governorates, stats }) {
    const [search, setSearch] = useState("");
    const [filterGovernorate, setFilterGovernorate] = useState("");
    const [filterCollege, setFilterCollege] = useState("");
    const [filterSpecialization, setFilterSpecialization] = useState("");

    const [filteredColleges, setFilteredColleges] = useState([]);
    const [filteredSpecializations, setFilteredSpecializations] = useState([]);

    const allColleges = [...new Map(specializations.map(s => [s.college?.id, s.college])).values()].filter(c => c);

    useEffect(() => {
        if (!filterGovernorate) setFilteredColleges(allColleges);
        else setFilteredColleges(allColleges.filter(c => c.governorate?.id.toString() === filterGovernorate));
        // إعادة تعيين الكلية إذا لم تعد ضمن القائمة
        if (!filteredColleges.some(c => c.id.toString() === filterCollege)) setFilterCollege("");
    }, [filterGovernorate]);

    useEffect(() => {
        if (!filterCollege) setFilteredSpecializations(specializations);
        else setFilteredSpecializations(specializations.filter(s => s.college?.id.toString() === filterCollege));
        if (!filteredSpecializations.some(s => s.id.toString() === filterSpecialization)) setFilterSpecialization("");
    }, [filterCollege]);

    // تصفية الكورسات محليًا (اختياري إذا لم تفعل البحث من السيرفر)
    const filteredCourses = courses.filter(course => {
        const matchSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
                            course.description.toLowerCase().includes(search.toLowerCase());

        const matchGov = !filterGovernorate || course.specialization?.college?.governorate?.id?.toString() === filterGovernorate;
        const matchCollege = !filterCollege || course.specialization?.college?.id?.toString() === filterCollege;
        const matchSpec = !filterSpecialization || course.specialization?.id?.toString() === filterSpecialization;

        return matchSearch && matchGov && matchCollege && matchSpec;
    });

    const handleDelete = id => {
        if (confirm("هل أنت متأكد من حذف المشروع؟")) {
         Inertia.delete(`/admincourses/${id}`);
        }
      };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="المقررات الدراسية" />
            <div className="modern-table-container" style={{ maxWidth: "95%", margin: "40px auto" }}>
                    <div className="table-header-bar">
                      <span className="dashboard-title">لوحة تحكم المقررات الدراسية </span>
                      <Link href="/admincourses/create" className="add-btn">
                        إضافة  مقرر دراسي
                      </Link>
                    </div>
            {/* شريط الفلاتر */}
            <div className="filter-bar"  style={{ marginBottom: 20, overflow: "auto", clear: "both", display: "flex", gap: 10, flexWrap: "wrap" }}>
                <select className="filter-select"  onChange={e => setFilterGovernorate(e.target.value)} value={filterGovernorate}>
                    <option value="">المحافظة</option>
                    {governorates.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                <select className="filter-select" onChange={e => setFilterCollege(e.target.value)} value={filterCollege}>
                    <option value="">الكلية</option>
                    {filteredColleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select className="filter-select" onChange={e => setFilterSpecialization(e.target.value)} value={filterSpecialization}>
                    <option value="">التخصص</option>
                    {filteredSpecializations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input className="search-input" type="text" placeholder="ابحث بالمقرر..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {/* الإحصائيات */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ background: "#eaf4ff", padding: "16px 24px", borderRadius: 14, minWidth: 160, textAlign: "center", flex: 1 }}>
            <div style={{ fontWeight: "700", color: "#26547c", marginBottom: 4 }}>عدد المقررات الكلي</div>
            <div style={{ fontWeight: "800", fontSize: 22, color: "#2c3e50" }}>{stats.total}</div>
          </div>
          <div style={{ background: "#e7ffe9", padding: "16px 24px", borderRadius: 14, minWidth: 160, textAlign: "center", flex: 1 }}>
            <div style={{ fontWeight: "700", color: "#229363", marginBottom: 4 }}>جديد هذا الأسبوع</div>
            <div style={{ fontWeight: "800", fontSize: 22, color: "#27ae60" }}>{stats.recent}</div>
          </div>
        </div>

            {/* جدول عرض المقررات */}
            <table className="modern-table">
                <thead>
                    <tr>
                        <th className="col-name">اسم المقرر</th>
                        <th className="col-specialization">التخصص</th>
                        <th className="col-college">الكلية</th>
                        <th className="col-governorate">المحافظة</th>
                        <th className="col-graduation_year">السنة الأكاديمية</th>
                        <th className="col-actions">إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: "center", fontWeight: "bold", padding: "40px 0", color: "#b3b3b3" }}>لا توجد مقررات للعرض.</td></tr>
                    ) : filteredCourses.map(course => (
                        <tr key={course.id}>
                            <td className="col-name" title={course.name}>{truncateWords(course.name)}</td>
                            <td className="col-specialization">{truncateWords(course.specialization?.name || "--")}</td>
                            <td className="col-college">{truncateWords(course.specialization?.college?.name || "--")}</td>
                            <td className="col-governorate">{truncateWords(course.specialization?.college?.governorate?.name || "--")}</td>
                            <td className="col-graduation_year">{course.academic_year_number}</td>
                            <td>
                                <div className="col-actions" style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                                    <Link href={`/admincourses/${course.id}`} title="عرض">👁️</Link>
                                    <Link href={`/admincourses/${course.id}/edit`} title="تعديل">✏️</Link>
                                    <button type="button" title="حذف" onClick={() => handleDelete(project.id)}>🗑️</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AuthenticatedLayout>
    );
}
