import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import SettingMap from '@/Components/SettingMap'; // استيراد مكون الخريطة
import '@/Components/Admin/Style/Style.css';

export default function Show({ auth, college }) {
  console.log('COLLEGE PROPS', college);

  // فك تحويل نص location إن كان موجود كـ string
  const location =
    typeof college.location === 'string' ? JSON.parse(college.location) : college.location;

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={college.name} />
      <div
        className="panel"
        style={{
          maxWidth: 700,
          margin: '40px auto',
          padding: 20,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 12px 24px rgba(58,141,222,0.15)',
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        <h1 className="form-title" style={{ marginBottom: 20 }}>
          {college.name}
        </h1>
        <div className="details-grid" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 220px' }}>
            {college.image && (
              <img
                src={`/storage/${college.image}`}
                alt={college.name}
                style={{ width: '100%', borderRadius: 14, marginBottom: 14, border: '1px solid #eee' }}
              />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <dl style={{ direction: 'rtl', fontSize: 16, color: '#34495e' }}>
              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>المحافظة:</dt>
              <dd>{college.governorate?.name ?? '--'}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>سنة التأسيس:</dt>
              <dd>{college.establishment_year}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>عدد الطلاب:</dt>
              <dd>{college.student_count}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الرابط الرسمي:</dt>
              <dd
                style={{
                  maxWidth: '100%',
                  overflowWrap: 'break-word', // يتيح لف النص داخل الحدود
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                <a
                  href={college.official_link}
                  target="_blank"
                  rel="noopener"
                  className="official-link"
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    color: '#3a8dde',
                    textDecoration: 'underline',
                    fontWeight: '500',
                    direction: 'ltr',
                  }}
                >
                  {college.official_link}
                </a>
              </dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>هل كلية؟</dt>
              <dd>{college.college ? 'نعم' : 'لا'}</dd>

              <dt style={{ fontWeight: 'bold', marginTop: 8 }}>الموقع (خط العرض وخط الطول):</dt>
              <dd>
                {location
                  ? `خط العرض: ${location.lat}, خط الطول: ${location.lng}`
                  : 'لا يوجد موقع'}
              </dd>
            </dl>
          </div>
        </div>

        {/* عرض الخريطة */}
        {location && (
          <div className="section" style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 8, color: '#2c3e50' }}>الموقع على الخريطة</h3>
            <SettingMap lat={location.lat} lng={location.lng} editable={false} height={300} />
          </div>
        )}

        <div className="section" style={{ marginTop: 30 }}>
          <h3 style={{ marginBottom: 8, color: '#2c3e50' }}>الملخص</h3>
          <div style={{ color: '#34495e', fontSize: 16, lineHeight: 1.5 }}>{college.summary}</div>
        </div>

        <div className="section" style={{ marginTop: 20 }}>
          <h3 style={{ marginBottom: 8, color: '#2c3e50' }}>التفاصيل</h3>
          <div style={{ color: '#34495e', fontSize: 16, lineHeight: 1.5 }}>{college.details}</div>
        </div>

        <div style={{ marginTop: 30 }}>
          <Link
            href={route('Admincolleges.index')}
            className="back-link"
            style={{ color: '#3a8dde', textDecoration: 'underline', fontWeight: 'bold' }}
          >
            رجوع
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
