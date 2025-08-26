import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "@/Components/Admin/Style/Style.css";

export default function Show({ future_opportunity, auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل آفاق مستقبلية - ${future_opportunity.name}`} />
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
          {future_opportunity.name}
        </h1>

        <dl style={{ fontSize: 16, color: "#34495e" }}>
          <dt>المحافظة:</dt>
          <dd>{future_opportunity.specialization?.college?.governorate?.name || "--"}</dd>

          <dt>الكلية:</dt>
          <dd>{future_opportunity.specialization?.college?.name || "--"}</dd>

          <dt>التخصص:</dt>
          <dd>{future_opportunity.specialization?.name || "--"}</dd>

          <dt>التفاصيل:</dt>
          <dd style={{ whiteSpace: "pre-line", margin: 0 }}>{future_opportunity.details}</dd>

          <dt>الأيقونة:</dt>
          <dd>
            {future_opportunity.icon ? (
              <img src={`/storage/${future_opportunity.icon}`} alt="Icon" style={{ maxWidth: 120, borderRadius: 6 }} />
            ) : (
              "--"
            )}
          </dd>
        </dl>

        <div
          className="actions-cell"
          style={{ marginTop: "2.5rem", justifyContent: "center", display: "flex", gap: 12 }}
        >
          <Link
            href={route("adminfutureopportunities.edit", { adminfutureopportunity: future_opportunity.id })}
            className="action-btn edit-btn"
            style={{ minWidth: 100 }}
          >
            تعديل
          </Link>
          <Link
            href={route("adminfutureopportunities.index")}
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
