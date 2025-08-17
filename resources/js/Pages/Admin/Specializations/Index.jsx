import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import '@/Components/Admin/Style/Style.css';

const truncateWords = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function Index({ auth, specializations, governorates, stats }) {
  const [search, setSearch] = useState('');
  const [filterGovernorate, setFilterGovernorate] = useState('');
  const [filterCollege, setFilterCollege] = useState('');
  const [filterDegree, setFilterDegree] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);

  // جلب جميع الكليات (بما تحتويه التخصصات)
  const allColleges = [...new Map(specializations.map(s => [s.college?.id, s.college])).values()].filter(c => c);

  // تحديث قائمة الكليات عند تغيير المحافظة المختارة
  useEffect(() => {
    if (filterGovernorate === '') {
      setFilteredColleges(allColleges);
    } else {
      const filtered = allColleges.filter(college => college.governorate?.id.toString() === filterGovernorate);
      setFilteredColleges(filtered);

      // إذا الكلية المحددة حاليا ليست ضمن الكليات المصفاة، امسحها
      if (!filtered.some(col => col.id.toString() === filterCollege)) {
        setFilterCollege('');
      }
    }
  }, [filterGovernorate, allColleges, filterCollege]);

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف التخصص؟")) {
      Inertia.delete(`/adminspecializations/${id}`);
    }
  };

  // فلترة التخصصات حسب البحث والكلية ونوع الدرجة والمحافظة
  const filteredSpecializations = specializations.filter(s => {
    const matchesSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.summary?.toLowerCase().includes(search.toLowerCase()) ||
      s.college?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesCollege = filterCollege === '' || (s.college?.id.toString() === filterCollege);
    const matchesDegree = filterDegree === '' || s.degree_type.toLowerCase().includes(filterDegree.toLowerCase());
    const matchesGovernorate = filterGovernorate === '' || (s.college?.governorate?.id.toString() === filterGovernorate);

    return matchesSearch && matchesCollege && matchesDegree && matchesGovernorate;
  });

  const degreeTypes = [...new Set(specializations.map(s => s.degree_type))];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="التخصصات" />

      <div className="modern-table-container" style={{ maxWidth: '85%', margin: '40px auto' }}>

        <div className="table-header-bar">
          <span className="dashboard-title">لوحة تحكم التخصصات</span>
          <Link href={route('adminspecializations.create')} className="add-btn">
            إضافة تخصص
          </Link>
        </div>

        {/* شريط الفلاتر والبحث */}
        <div className="filter-bar" style={{ marginBottom: '20px', overflow: 'auto', clear: 'both', display: 'flex', gap: 10, flexWrap: 'wrap' }}>

          {/* اختيار المحافظة */}
          <select
            className="filter-select"
            aria-label="المحافظة"
            value={filterGovernorate}
            onChange={e => setFilterGovernorate(e.target.value)}
          >
            <option value="">المحافظة</option>
            {governorates.map(gov => (
              <option key={gov.id} value={gov.id}>{gov.name}</option>
            ))}
          </select>

          {/* اختيار الكلية بعد تصفية حسب المحافظة */}
          <select
            className="filter-select"
            aria-label="الكلية"
            value={filterCollege}
            onChange={e => setFilterCollege(e.target.value)}
          >
            <option value="">الكلية</option>
            {filteredColleges.map(college => (
              <option key={college.id} value={college.id}>{college.name}</option>
            ))}
          </select>

          {/* اختيار نوع الدرجة */}
          <select
            className="filter-select"
            aria-label="نوع الدرجة"
            value={filterDegree}
            onChange={e => setFilterDegree(e.target.value)}
          >
            <option value="">نوع الدرجة</option>
            {degreeTypes.map(degree => (
              <option key={degree} value={degree}>{degree}</option>
            ))}
          </select>

          {/* حقل البحث */}
          <input
            type="text"
            placeholder="بحث عن تخصص أو كلية أو ملخص..."
            className="search-input"
            aria-label="بحث"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />

          <button type="button" className="search-btn" onClick={() => { /* يمكن إضافة عند الحاجة */ }}>
            بحث
          </button>
        </div>

       {/* إحصائيات */}
         <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
           <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي التخصصات</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#2c3e50' }}>{stats.total}</div>
          </div>

          <div style={{
            background: '#e7ffe9',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>تخصصات جديدة هذا الأسبوع</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم التخصص</th>
              <th className="col-college">الكلية</th>
              <th className="col-governorate">المحافظة</th> {/* عمود المحافظة جديد */}
              <th className="col-summary">ملخص</th>
              <th className="col-degree">نوع الدرجة</th>
              <th className="col-year">عدد سنوات الدراسة</th>
              <th className="col-icon">أيقونة التخصص</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpecializations.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ color: '#b3b3b3', fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد تخصصات للعرض.
                </td>
              </tr>
            ) : (
              filteredSpecializations.map(spec => (
                <tr key={spec.id}>
                  <td className="col-name" title={spec.name}>{truncateWords(spec.name, 8)}</td>
                  <td className="col-college">{spec.college?.name || '--'}</td>
                  <td className="col-governorate">{spec.college?.governorate?.name || '--'}</td> {/* عرض المحافظة */}
                  <td className="col-summary" title={spec.summary}>{truncateWords(spec.summary)}</td>
                  <td className="col-degree">{spec.degree_type}</td>
                  <td className="col-year">{spec.academic_year_number}</td>
                  <td className="col-icon">
                    {spec.icon && (
                      <img
                        src={spec.icon.startsWith('http') ? spec.icon : `/storage/${spec.icon}`}
                        alt={`icon-${spec.name}`}
                        style={{ width: 40, height: 40, objectFit: 'contain' }}
                      />
                    )}
                  </td>
                  <td>
                    <div className="col-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Link href={route('adminspecializations.show', spec.id)} title="عرض">👁️</Link>
                      <Link href={route('adminspecializations.edit', spec.id)} title="تعديل">✏️</Link>
                      <button
                        type="button"
                        title="حذف"
                        onClick={() => handleDelete(spec.id)}
                      >🗑️</button>
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
