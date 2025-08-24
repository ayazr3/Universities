import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "@/Components/Admin/Style/Style.css";

export default function Show({ top_student, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل الطالب - ${top_student.name}`} />
      <div
        className="panel"
        style={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 20,
          background: "#fff",
          borderRadius: 12,
          direction: "rtl",
          fontSize: 16,
          color: "#34495e",
        }}
      >
        <h1 className="form-title" style={{ marginBottom: 20 }}>
          {top_student.name}
        </h1>
        <dl>
          <dt>المحافظة:</dt>
          <dd>{top_student.specialization?.college?.governorate?.name || "--"}</dd>

          <dt>الكلية:</dt>
          <dd>{top_student.specialization?.college?.name || "--"}</dd>

          <dt>التخصص:</dt>
          <dd>{top_student.specialization?.name || "--"}</dd>

          <dt>المعدل التراكمي:</dt>
          <dd>{top_student.gpa.toFixed(2)}</dd>

          <dt>الترتيب:</dt>
          <dd>{top_student.rank}</dd>

          <dt>سنة التخرج:</dt>
          <dd>{top_student.graduation_year}</dd>

          <dt>الصورة:</dt>
          <dd>
            {top_student.image ? (
              <img
                src={`/storage/${top_student.image}`}
                alt={top_student.name}
                style={{ width: 120, borderRadius: 12 }}
              />
            ) : (
              "--"
            )}
          </dd>
        </dl>

        <div
          className="actions-cell"
          style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 12 }}
        >
          <Link href={route("admintopstudents.edit", { admintopstudent: top_student.id })} className="action-btn edit-btn" style={{ minWidth: 100 }}>
            تعديل
          </Link>
          <Link href={route("admintopstudents.index")} className="action-btn view-btn" style={{minWidth: 100, background: "#e2e8f0", color: "#3059d5"}}>
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
