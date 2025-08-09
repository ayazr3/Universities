import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css';

const truncateWords = (text, wordLimit = 4) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function Index({ auth, colleges, stats }) {
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف الكلية؟")) {
      Inertia.delete(route('Admincolleges.destroy', id));
    }
  };

  // بحث نصي في اسم أو ملخص أو المحافظة (اختياري)
//   const filteredColleges = colleges.filter(college =>
//     college.name?.toLowerCase().includes(search.toLowerCase()) ||
//     (college.summary?.toLowerCase()?.includes(search.toLowerCase()))
//   );

    // بحث نصي في اسم الكلية  أو المحافظة
    const filteredColleges = colleges.filter(college =>
    college.name?.toLowerCase().includes(search.toLowerCase()) ||
    college.governorate?.name?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="الكليات" />
      <div className="modern-table-container" style={{ maxWidth: '98%', margin: '40px auto' }}>

        {/* العنوان وزر الإضافة */}
        <div className="table-header-bar">
          <span className="dashboard-title">الكليات</span>
          <Link href={route('Admincolleges.create')} className="add-btn">
            إضافة كلية
          </Link>
        </div>

        {/* شريط البحث والفلاتر (تستطيع حذف الفلاتر إذا لم تردها) */}
        <div className="filter-bar">
          {/* فلاتر بإمكانك إظهارها لاحقًا */}
          <input
            type="text"
            placeholder="بحث عن كلية..."
            className="search-input"
            aria-label="بحث"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">بحث</button>
        </div>

        {/* إحصائيات الكليات */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#eaf4ff',
            padding: '16px 24px',
            borderRadius: '14px',
            minWidth: '160px',
            textAlign: 'center',
            flex: '1',
          }}>
            <div style={{ fontWeight: '700', color: '#26547c', marginBottom: 4 }}>إجمالي الكليات</div>
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
            <div style={{ fontWeight: '700', color: '#229363', marginBottom: 4 }}>كليات جديدة هذا الأسبوع</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#27ae60' }}>{stats.recent}</div>
          </div>
        </div>

        {/* جدول الكليات */}
        <table className="modern-table">
          <thead>
            <tr>
              <th className="col-name">اسم الكلية</th>
              <th className="col-image">الصورة</th>
              <th className="col-governorate">المحافظة</th>
              <th className="col-summary">ملخص النص</th>
              <th className="col-location">الموقع (خريطة)</th>
              <th className="col-established">سنة التأسيس</th>
              {/* <th className="col-students">عدد الطلاب</th> */}
              <th className="col-website">الرابط الرسمي</th>
              <th className="col-actions">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ color: '#b3b3b3', fontWeight: 'bold', padding: '40px 0', textAlign: 'center' }}>
                  لا توجد كليات للعرض.
                </td>
              </tr>
            ) : (
              filteredColleges.map(college => (
                <tr key={college.id}>
                  {/* اسم الكلية */}
                  <td className="col-name" title={college.name}>
                    {truncateWords(college.name)}
                  </td>
                  {/* صورة الكلية */}
                  <td className="col-image">
                    {college.image && (
                      <img
                        src={college.image.startsWith('http') ? college.image : `/storage/${college.image}`}
                        alt={college.name}
                        className="table-image"
                      />
                    )}
                  </td>
                  <td className="col-governorate">
                    {college.governorate?.name || '--'}
                  </td>

                  {/* ملخص النص إن وجد */}
                  <td className="col-summary" title={college.summary}>
                    {truncateWords(college.summary || '')}
                  </td>
                  {/* موقع الكلية كخريطة */}
                  <td className="col-location" style={{ minWidth: "160px", maxWidth: 180 }}>
                    <SettingMap
                      lat={college.location?.lat || 24.7136}
                      lng={college.location?.lng || 46.6753}
                      editable={false}
                      height={120}
                    />
                  </td>
                  {/* سنة التأسيس */}
                  <td className="col-established">{college.establishment_year || '--'}</td>
                  {/* عدد الطلاب */}
                  {/* <td className="col-students">{college.student_count || '--'}</td> */}
                  {/* الرابط الرسمي */}
                  <td className="col-website">
                    {college.official_link &&
                      <a
                        href={college.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link"
                      >
                        زيارة
                      </a>
                    }
                  </td>
                  {/* الإجراءات */}
                  <td>
                    <div className="actions-cell">
                      <Link href={route('Admincolleges.show', college.id)}  title="عرض">👁️</Link>
                      <Link href={route('Admincolleges.edit', college.id)}  title="تعديل">✏️</Link>
                      <button
                        type="button"

                        title="حذف"
                        onClick={() => handleDelete(college.id)}
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
