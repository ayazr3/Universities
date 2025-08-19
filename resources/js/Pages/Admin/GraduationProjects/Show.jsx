// import React from "react";
// import { Head, Link } from "@inertiajs/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import "@/Components/Admin/Style/Style.css";

// export default function Show({ graduation_project, auth }) {
//   const teamMembers = JSON.parse(graduation_project.team_members || "[]");
//   const images = JSON.parse(graduation_project.project_images || "[]");

//   return (
//     <AuthenticatedLayout user={auth.user}>
//       <Head title={`تفاصيل مشروع - ${graduation_project.name}`} />
//       <div className="panel" style={{ maxWidth: 750, margin: '40px auto', padding: 20, background: '#fff', borderRadius: 12 }}>
//         <h1 className="form-title" style={{ marginBottom: 22, fontSize: '1.7rem' }}>{graduation_project.name}</h1>
//         <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
//           <dt>المحافظة:</dt>
//           <dd>{graduation_project.specialization?.college?.governorate?.name || "--"}</dd>
//           <dt>الكلية:</dt>
//           <dd>{graduation_project.specialization?.college?.name || "--"}</dd>
//           <dt>التخصص:</dt>
//           <dd>{graduation_project.specialization?.name || "--"}</dd>
//           <dt>الوصف:</dt>
//           <dd style={{ whiteSpace: "pre-line", margin: 0 }}>{graduation_project.description}</dd>
//           <dt>ملف البحث النهائي:</dt>
//           <dd>
//             <a href={`/storage/${graduation_project.thesis_file}`} target="_blank" rel="noopener noreferrer">
//               تنزيل الملف
//             </a>
//           </dd>
//           <dt>صور المشروع:</dt>
//           <dd>
//             {images.length === 0 ? "--" :
//               images.map((img, i) => (
//                 <img key={i} src={`/storage/${img}`} style={{ maxWidth: 120, marginRight: 6, marginBottom: 5, borderRadius: 4 }} alt={`project-img-${i}`} />
//               ))}
//           </dd>
//           <dt>سنة التخرج:</dt>
//           <dd>{graduation_project.graduation_year}</dd>
//           <dt>المشرف:</dt>
//           <dd>{graduation_project.supervisor}</dd>
//           <dt>أعضاء الفريق:</dt>
//           <dd>
//             <ul>{teamMembers.map((m, i) => <li key={i}>{m}</li>)}</ul>
//           </dd>
//         </dl>
//         <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: "center" }}>
//           <Link href={route('admingraduation_projects.edit', { admingraduation_project: graduation_project.id })} className="action-btn edit-btn" style={{ minWidth: 100 }}>
//             تعديل
//           </Link>
//           <Link href={route('admingraduation_projects.index')} className="action-btn view-btn" style={{ background: '#e2e8f0', color: '#3059d5', minWidth: 100 }}>
//             رجوع
//           </Link>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }


import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import "@/Components/Admin/Style/Style.css";

export default function Show({ graduation_project, auth }) {
  const teamMembers = JSON.parse(graduation_project.team_members || "[]");
  const images = JSON.parse(graduation_project.project_images || "[]");

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل مشروع - ${graduation_project.name}`} />
      <div
        className="panel"
        style={{
          maxWidth: 750,
          margin: "40px auto",
          padding: 20,
          background: "#fff",
          borderRadius: 12,
        }}
      >
        <h1 className="form-title" style={{ marginBottom: 22, fontSize: "1.7rem" }}>
          {graduation_project.name}
        </h1>
        <dl style={{ direction: "rtl", fontSize: 16, color: "#34495e" }}>
          <dt>المحافظة:</dt>
          <dd>{graduation_project.specialization?.college?.governorate?.name || "--"}</dd>
          <dt>الكلية:</dt>
          <dd>{graduation_project.specialization?.college?.name || "--"}</dd>
          <dt>التخصص:</dt>
          <dd>{graduation_project.specialization?.name || "--"}</dd>
          <dt>الوصف:</dt>
          <dd style={{ whiteSpace: "pre-line", margin: 0 }}>{graduation_project.description}</dd>
          <dt>ملف البحث النهائي:</dt>
          <dd>
            <a href={`/storage/${graduation_project.thesis_file}`} target="_blank" rel="noopener noreferrer">
              تنزيل الملف
            </a>
          </dd>
          <dt>صور المشروع:</dt>
          <dd style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {images.length === 0 ? (
              "--"
            ) : (
              images.map((img, i) => (
                <img
                  key={i}
                  src={`/storage/${img}`}
                  style={{ maxWidth: 120, borderRadius: 4 }}
                  alt={`project-img-${i}`}
                />
              ))
            )}
          </dd>
          <dt>سنة التخرج:</dt>
          <dd>{graduation_project.graduation_year}</dd>
          <dt>المشرف:</dt>
          <dd>{graduation_project.supervisor}</dd>
          <dt>أعضاء الفريق:</dt>
          <dd>
            {teamMembers.length > 0 ? (
              <ol className="sub-steps-list" style={{ paddingLeft: "20px", margin: 0 }}>
                {teamMembers.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ol>
            ) : (
              <span style={{ color: "#b3b3b3" }}>لا يوجد أعضاء</span>
            )}
          </dd>
        </dl>
        <div
          className="actions-cell"
          style={{ marginTop: "2.5rem", justifyContent: "center", display: "flex", gap: 12 }}
        >
          <Link
            href={route("admingraduation_projects.edit", { admingraduation_project: graduation_project.id })}
            className="action-btn edit-btn"
            style={{ minWidth: 100 }}
          >
            تعديل
          </Link>
          <Link
            href={route("admingraduation_projects.index")}
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
