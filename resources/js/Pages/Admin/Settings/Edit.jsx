import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css';

export default function SettingEdit({ setting, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    site_name: setting.site_name || '',
    logo: null, // لتعديل صورة الشعار (ملف)
    url: setting.url || '',
    location: setting.location || { lat: 24.7136, lng: 46.6753 },
    description: setting.description || '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleLatLng = ({ lat, lng }) => {
    setData('location', { lat, lng });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5&addressdetails=1&accept-language=ar`
      );
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      setSearchError('حدث خطأ أثناء البحث. حاول مرة أخرى.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectLocation = (location) => {
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lon);
    setData('location', { lat, lng });
    setSearchResults([]);
    setSearchQuery(location.display_name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('settings.update', setting.id), {
      forceFormData: true,  // مهم لرفع الملفات
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="form-title">تعديل الإعداد</h2>}>
      <Head title="تعديل الإعداد" />
      <div className="modern-form" style={{ maxWidth: 520 }}>
        <form onSubmit={handleSubmit} noValidate>
          {/* اسم الموقع */}
          <div className="form-group">
            <label htmlFor="site_name">اسم الموقع</label>
            <input
              id="site_name"
              type="text"
              value={data.site_name}
              onChange={e => setData('site_name', e.target.value)}
              className={errors.site_name ? 'input-error' : ''}
              autoFocus
              required
            />
            {errors.site_name && <p className="input-error">{errors.site_name}</p>}
          </div>

          {/* الشعار */}
          <div className="form-group">
            <label htmlFor="logo">الشعار (صورة جديدة أو اتركها فارغة للاحتفاظ بالقيمة القديمة)</label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              onChange={e => setData('logo', e.target.files[0])}
              className={errors.logo ? 'input-error' : ''}
            />
            {errors.logo && <p className="input-error">{errors.logo}</p>}
            {setting.logo && !data.logo && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={setting.logo.startsWith('http') ? setting.logo : `/storage/${setting.logo}`}
                  alt="الشعار الحالي"
                  style={{ maxHeight: 80, objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          {/* رابط الموقع */}
          <div className="form-group">
            <label htmlFor="url">رابط الموقع</label>
            <input
              id="url"
              type="text"
              value={data.url}
              onChange={e => setData('url', e.target.value)}
              className={errors.url ? 'input-error' : ''}
              required
            />
            {errors.url && <p className="input-error">{errors.url}</p>}
          </div>

          {/* الوصف */}
          <div className="form-group">
            <label htmlFor="description">الوصف</label>
            <textarea
              id="description"
              rows={5}
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              className={errors.description ? 'input-error' : ''}
              required
            />
            {errors.description && <p className="input-error">{errors.description}</p>}
          </div>

          {/* البحث عن الموقع */}
          <div className="form-group relative">
            <label htmlFor="location_search">البحث عن موقع</label>
            <input
              id="location_search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="ابحث عن مدينة أو موقع"

            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searchLoading}
              className="search-btn"
              style={{ marginTop: '8px' }}
            >
              {searchLoading ? 'جاري البحث...' : 'بحث'}
            </button>

            {searchResults.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full max-h-48 overflow-auto mt-1 shadow-lg">
                {searchResults.map(result => (
                  <li
                    key={result.place_id}
                    onClick={() => handleSelectLocation(result)}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}

            {searchError && <p className="input-error">{searchError}</p>}
          </div>

          {/* الخريطة */}
          <div className="form-group">
            <label>الموقع على الخريطة</label>
            <SettingMap
              lat={data.location.lat}
              lng={data.location.lng}
              setLatLng={handleLatLng}
              editable={true}
              height={300}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input
                type="number"
                step="any"
                value={data.location.lat}
                onChange={e => setData('location', { ...data.location, lat: parseFloat(e.target.value) })}
                placeholder="خط العرض"
              />
              <input
                type="number"
                step="any"
                value={data.location.lng}
                onChange={e => setData('location', { ...data.location, lng: parseFloat(e.target.value) })}
                placeholder="خط الطول"
              />
            </div>
            {errors.location && typeof errors.location === 'string' && (
              <p className="input-error">{errors.location}</p>
            )}
          </div>

          {/* أزرار الحفظ والرجوع */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              type="submit"
              disabled={processing}
              className="submit-btn"
              style={{ flex: 1 }}
            >
              {processing ? 'جاري التحديث...' : 'تحديث الإعداد'}
            </button>
            <Link
              href={route('settings.index')}
              className="back-link"
              style={{
                alignSelf: 'center',
                color: '#3a8dde',
                textDecoration: 'underline',
                fontWeight: 'bold',
                padding: '12px 20px',
              }}
            >
              رجوع
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
