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

export default function Index({ auth, top_students, specializations, governorates, stats }) {
  // حالات الفلاتر والبحث
  const [search, setSearch] = useState("");
  const [filterGovernorate, setFilterGovernorate] = useState("");
  const [filterCollege, setFilterCollege] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");

  // قوائم مفلترة للكليات والتخصصات
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const allColleges = [...new Map(specializations.map(s => [s.college?.id, s.college])).values()].filter(c => c);

  // تحديث قائمة الكليات بناء على المحافظة المختارة
  useEffect(() => {
    if (filterGovernorate === "") setFilteredColleges(allColleges);
    else {
      const collegesInGov = allColleges.filter(college => college.governorate?.id.toString() === filterGovernorate);
      setFilteredColleges(collegesInGov);
    }
  }, [filterGovernorate, allColleges]);

  // تحديث قائمة التخصصات بناء على الكلية المختارة
  useEffect(() => {
    if (filterCollege === "") setFilteredSpecializations(specializations);
    else {
      const specsInCollege = specializations.filter(spec => spec.college?.id.toString() === filterCollege);
      setFilteredSpecializations(specsInCollege);
      if (!specsInCollege.some(spec => spec.id.toString() === filterSpecialization)) {
        setFilterSpecialization("");
      }
    }
  }, [filterCollege, specializations, filterSpecialization]);

  // فلترة الطلاب محلياً
  const filteredStudents = top_students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());

    const matchesGovernorate = !filterGovernorate || student.specialization?.college?.governorate?.id?.toString() === filterGovernorate;
    const matchesCollege = !filterCollege || student.specialization?.college?.id?.toString() === filterCollege;
    const matchesSpecialization = !filterSpecialization || student.specialization?.id?.toString() === filterSpecialization;

    return matchesSearch && matchesGovernorate && matchesCollege && matchesSpecialization;
  });

  // حذف طالب
  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف الطالب؟")) {
      Inertia.delete(`/admintopstudents/${id}`);
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="الطلاب الأوائل" />
      <div className="modern-table-container" style={{ maxWidth: "95%", margin: "40px auto" }}>
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم الطلاب الأوائل</span>
          <Link href="/admintopstudents/create" className="add-btn">
            إضافة طالب أول
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

          {/* اختيار الكلية */}
          <select className="filter-select" value={filterCollege} onChange={e => setFilterCollege(e.target.value)}>
            <option value="">الكلية</option>
            {filteredColleges.map(college => (
              <option key={college.id} value={college.id}>{college.name}</option>
            ))}
          </select>

          {/* اختيار التخصص */}
          <select className="filter-select" value={filterSpecialization} onChange={e => setFilterSpecialization(e.target.value)}>
            <option value="">التخصص</option>
            {filteredSpecializations.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>

          {/* حقل البحث */}
          <input
            type="text"
            placeholder="بحث بالاسم..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />

          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* جدول الطلاب */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>التخصص</th>
              <th>الكلية</th>
              <th>المحافظة</th>
              <th>المعدل التراكمي</th>
              <th>الترتيب</th>
              <th>سنة التخرج</th>
              <th>الصورة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: 20, fontWeight: "bold", color: "#b3b3b3" }}>
                  لا يوجد طلاب للعرض.
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.specialization?.name || "-"}</td>
                  <td>{student.specialization?.college?.name || "-"}</td>
                  <td>{student.specialization?.college?.governorate?.name || "-"}</td>
                  <td>{student.gpa.toFixed(2)}</td>
                  <td>{student.rank}</td>
                  <td>{student.graduation_year}</td>
                  <td>
                    {student.image ? (
                      <img
                        src={`/storage/${student.image}`}
                        alt={student.name}
                        style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : ("-")}
                  </td>
                  <td>
                    <div className="col-actions" style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <Link href={`/admintopstudents/${student.id}`} title="عرض">👁️</Link>
                      <Link href={`/admintopstudents/${student.id}/edit`} title="تعديل">✏️</Link>
                      <button onClick={() => handleDelete(student.id)} type="button" title="حذف">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
