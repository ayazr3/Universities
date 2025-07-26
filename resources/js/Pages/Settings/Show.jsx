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
          style={{ maxWidth: 480, width: '100%', margin: '40px 0', padding: '32px 28px', background: '#fff' }}
        >
          <h2 className="form-title" style={{ fontSize: '1.4rem' }}>{setting.site_name}</h2>

          <div className="card-detail-item">
            <span className="label">رابط الشعار:</span>
            <span>{setting.logo}</span>
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
            <p className="whitespace-pre-line" style={{ margin: 0 }}>{setting.description}</p>
          </div>

          <div className="card-detail-item" style={{ flexDirection: 'column', gap: '8px' }}>
            <span className="label" style={{ marginBottom: 4 }}>الموقع على الخريطة:</span>
            <SettingMap lat={lat} lng={lng} editable={false} height={300} />
          </div>

          <div className="actions-cell" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
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
    </AuthenticatedLayout>
  );
}
