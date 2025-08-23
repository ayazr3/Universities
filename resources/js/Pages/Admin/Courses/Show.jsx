import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "@/Components/Admin/Style/Style.css";

export default function Show({ course, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل المقرر - ${course.name}`} />

      <div
        className="panel"
        style={{
          maxWidth: 750,
          margin: "40px auto",
          padding: 20,
          background: "#fff",
          borderRadius: 12,
          direction: "rtl",
        }}
      >
        <h1 className="form-title" style={{ marginBottom: 22, fontSize: "1.7rem" }}>
          {course.name}
        </h1>
        <dl style={{ fontSize: 16, color: "#34495e" }}>
          <dt>المحافظة:</dt>
          <dd>{course.specialization?.college?.governorate?.name || "--"}</dd>

          <dt>الكلية:</dt>
          <dd>{course.specialization?.college?.name || "--"}</dd>

          <dt>التخصص:</dt>
          <dd>{course.specialization?.name || "--"}</dd>

          <dt>الوصف:</dt>
          <dd style={{ whiteSpace: "pre-line", margin: 0 }}>{course.description}</dd>

          <dt>ملف المقرر:</dt>
          <dd>
            {course.file_url ? (
              <a href={`/storage/${course.file_url}`} target="_blank" rel="noopener noreferrer">
                تحميل الملف
              </a>
            ) : (
              "--"
            )}
          </dd>

          <dt>السنة الأكاديمية:</dt>
          <dd>{course.academic_year_number || "--"}</dd>
        </dl>

        <div
          className="actions-cell"
          style={{ marginTop: "2.5rem", justifyContent: "center", display: "flex", gap: 12 }}
        >
          <Link
            href={route("admincourses.edit", { admincourse: course.id })}
            className="action-btn edit-btn"
            style={{ minWidth: 100 }}
          >
            تعديل
          </Link>
          <Link
            href={route("admincourses.index")}
            className="action-btn view-btn"
            style={{ background: "#e2e8f0", color: "#3059d5", minWidth: 100 }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
