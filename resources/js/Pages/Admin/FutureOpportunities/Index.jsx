import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";
import "@/Components/Admin/Style/Style.css";


export default function Index({ auth, future_opportunities, specializations, governorates, stats, filters }) {
  const [search, setSearch] = useState(filters.search || '');
  const [filterGovernorate, setFilterGovernorate] = useState(filters.governorate_id || '');
  const [filterCollege, setFilterCollege] = useState(filters.college_id || '');
  const [filterSpecialization, setFilterSpecialization] = useState(filters.specialization_id || '');

  const allColleges = [...new Map(specializations.map(s => [s.college?.id, s.college])).values()].filter(c => c);

  const [filteredColleges, setFilteredColleges] = useState(allColleges);
  const [filteredSpecializations, setFilteredSpecializations] = useState(specializations);

  useEffect(() => {
    if (!filterGovernorate) setFilteredColleges(allColleges);
    else setFilteredColleges(allColleges.filter(c => c.governorate?.id.toString() === filterGovernorate));
    setFilterCollege('');
    setFilterSpecialization('');
  }, [filterGovernorate]);

  useEffect(() => {
    if (!filterCollege) setFilteredSpecializations(specializations);
    else setFilteredSpecializations(specializations.filter(s => s.college_id.toString() === filterCollege));
    setFilterSpecialization('');
  }, [filterCollege]);

  const filteredOpportunities = future_opportunities.filter(fo => {
    const matchesSearch = fo.name.toLowerCase().includes(search.toLowerCase());
    const matchesGovernorate = !filterGovernorate || fo.specialization?.college?.governorate?.id?.toString() === filterGovernorate;
    const matchesCollege = !filterCollege || fo.specialization?.college_id?.toString() === filterCollege;
    const matchesSpecialization = !filterSpecialization || fo.specialization_id.toString() === filterSpecialization;
    return matchesSearch && matchesGovernorate && matchesCollege && matchesSpecialization;
  });
  const handleDelete = id => {
          if (confirm("هل أنت متأكد من حذف المشروع؟")) {
           Inertia.delete(`/adminfutureopportunities/${id}`);
          }
        };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="الآفاق المستقبلية" />
      <div className="modern-table-container" style={{ maxWidth: '95%', margin: '40px auto' }}>
        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم الآفاق المستقبلية</span>
          <Link href="/adminfutureopportunities/create" className="add-btn">إضافة آفاق مستقبلية</Link>
        </div>

        <div className="filter-bar" style={{ marginBottom: 20, overflow: 'auto', clear: 'both', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select className="filter-select" value={filterGovernorate} onChange={e => setFilterGovernorate(e.target.value)}>
            <option value="">المحافظة</option>
            {governorates.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>

          <select className="filter-select" value={filterCollege} onChange={e => setFilterCollege(e.target.value)} disabled={!filterGovernorate}>
            <option value="">الكلية</option>
            {filteredColleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select className="filter-select" value={filterSpecialization} onChange={e => setFilterSpecialization(e.target.value)} disabled={!filterCollege}>
            <option value="">التخصص</option>
            {filteredSpecializations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <input
            type="text"
            placeholder="بحث عن تخصص..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <div style={{ background: '#eaf4ff', padding: '16px 24px', borderRadius: 14, minWidth: 160, textAlign: 'center', flex: 1 }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>عدد الآفاق الكلي</div>
            <div style={{ fontWeight: '800', fontSize: 22, color: '#2c3e50' }}>{stats.total}</div>
          </div>
          <div style={{ background: '#e7ffe9', padding: '16px 24px', borderRadius: 14, minWidth: 160, textAlign: 'center', flex: 1 }}>
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>جديد هذا الأسبوع</div>
            <div style={{ fontWeight: '800', fontSize: 22, color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم الآفاق المستقبلية</th>
              <th className="col-specialization">التخصص</th>
              <th className="col-college">الكلية</th>
              <th className="col-governorate">المحافظة</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", fontWeight: "bold", padding: "40px 0", color: "#b3b3b3" }}>
                  لا توجد آفاق لعرضها.
                </td>
              </tr>
            ) : (
              filteredOpportunities.map(fo => (
                <tr key={fo.id}>
                  <td>{fo.name}</td>
                  <td>{fo.specialization?.name || '--'}</td>
                  <td>{fo.specialization?.college?.name || '--'}</td>
                  <td>{fo.specialization?.college?.governorate?.name || '--'}</td>
                  <td>
                    <div className="col-actions" style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <Link href={`/adminfutureopportunities/${fo.id}`} title="عرض">👁️</Link>
                      <Link href={`/adminfutureopportunities/${fo.id}/edit`} title="تعديل">✏️</Link>
                      <button type="button" title="حذف" onClick={() => handleDelete(fo.id)}>🗑️</button>
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
