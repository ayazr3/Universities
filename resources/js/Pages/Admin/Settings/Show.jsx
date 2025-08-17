import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css';

export default function SettingShow({ setting, auth }) {
  const lat = setting.location?.lat || 24.7136;
  const lng = setting.location?.lng || 46.6753;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="form-title" style={{ marginBottom: 0 }}>تفاصيل الإعداد</h2>}
    >
      <Head title="تفاصيل الإعداد" />
      <div
        className="modern-table-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh' }}
      >
        <div
          className="modern-card"
          style={{
            maxWidth: 490,
            width: '100%',
            margin: '40px 0',
            padding: '36px 32px',
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 18px #e8f1ff70'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <h2 className="form-title" style={{ fontSize: '1.25rem', marginBottom: 6 }}>{setting.site_name}</h2>
              {setting.logo &&
                <img
                  src={setting.logo.startsWith('http') ? setting.logo : `/storage/${setting.logo}`}
                  alt="شعار الموقع"
                  style={{
                    maxHeight: 80,
                    maxWidth: 200,
                    objectFit: 'contain',
                    display: 'block',
                    margin: '10px auto 0 auto',
                    borderRadius: 6,
                    border: '1px solid #f0f0f0',
                    background: '#fafbfc'
                  }}
                />
              }
            </div>

            <div className="card-detail-item">
              <span className="label">رابط الموقع:</span>
              <a
                href={setting.url}
                target="_blank"
                rel="noopener noreferrer"
                className="table-link"
                style={{ direction: 'ltr', fontWeight: '500', marginRight: 8 }}
              >
                {setting.url}
              </a>
            </div>

            <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
              <span className="label" style={{ marginBottom: 4 }}>الوصف:</span>
              <p className="whitespace-pre-line" style={{
                margin: 0,
                background: '#f5f8fc',
                borderRadius: 7,
                padding: '12px 14px',
                minHeight: 38
              }}>{setting.description}</p>
            </div>

            <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
              <span className="label" style={{ marginBottom: 4 }}>الموقع على الخريطة:</span>
              <SettingMap lat={lat} lng={lng} editable={false} height={280} />
            </div>

            <div className="actions-cell" style={{ marginTop: '2rem', justifyContent: 'center' }}>
              <Link
                href={route('settings.edit', setting.id)}
                className="action-btn edit-btn"
                style={{ minWidth: '100px' }}
              >
                تعديل
              </Link>
              <Link
                href={route('settings.index')}
                className="action-btn view-btn"
                style={{ background: '#e2e8f0', color: '#3059d5', minWidth: '100px' }}
              >
                رجوع
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
