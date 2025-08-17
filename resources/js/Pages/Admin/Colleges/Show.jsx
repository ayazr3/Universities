import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css';

export default function CollegeShow({ college, auth }) {
  // إذا كان location نص JSON نحوله
  const location =
    typeof college.location === 'string'
      ? JSON.parse(college.location)
      : college.location || { lat: 24.7136, lng: 46.6753 };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`تفاصيل الكلية - ${college.name}`} />

      <div
        className="panel"
        style={{
          maxWidth: 750,
          margin: '40px auto',
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 12px 24px rgba(58,141,222,0.15)',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        {/* العنوان */}
        <h1 className="form-title" style={{ marginBottom: 22, fontSize: '1.7rem' }}>
          {college.name}
        </h1>

        {/* التفاصيل */}
        <div className="details-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>المحافظة:</dt>
              <dd>{college.governorate?.name || '--'}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>ملخص النص:</dt>
              <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>{college.summary}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>التفاصيل:</dt>
              <dd style={{ whiteSpace: 'pre-line', margin: 0 }}>{college.details}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>سنة التأسيس:</dt>
              <dd>{college.establishment_year || '--'}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>عدد الطلاب:</dt>
              <dd>{college.student_count || '--'}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الرابط الرسمي:</dt>
              <dd>
                {college.official_link ? (
                  <a
                    href={college.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="table-link"
                  >
                    زيارة
                  </a>
                ) : (
                  '--'
                )}
              </dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>هل هي كلية؟</dt>
              <dd>{college.college ? 'نعم' : 'لا'}</dd>
            </dl>
          </div>

          {/* صورة الكلية إن وجدت */}
          {college.image && (
            <div>
              <img
                src={college.image.startsWith('http') ? college.image : `/storage/${college.image}`}
                alt={college.name}
                style={{
                  width: 200,
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          )}
        </div>

        {/* الموقع على الخريطة */}
        <div style={{ marginTop: 20 }}>
          <dt style={{ fontWeight: 'bold', marginBottom: 8 }}>الموقع على الخريطة:</dt>
          <SettingMap
            lat={location.lat || 24.7136}
            lng={location.lng || 46.6753}
            editable={false}
            height={250}
          />
        </div>

        {/* أزرار تعديل ورجوع */}
        <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
          <Link
            href={route('Admincolleges.edit', college.id)}
            className="action-btn edit-btn"
              style={{ minWidth: '100px' }}
          >
            تعديل
          </Link>
          <Link
            href={route('Admincolleges.index')}
            className="action-btn view-btn"
              style={{ background: '#e2e8f0', color: '#3059d5', minWidth: '100px' }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
