import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SettingMap from '@/Components/SettingMap';
import '@/Components/Admin/Style/Style.css';

export default function Create({ auth, governorates }) {
  const { data, setData, post, processing, errors } = useForm({
    governorate_id: '',
  name: '',
  image: null,
  summary: '',
  details: '',
  // location ثابت
  location: { lat: 24.7136, lng: 46.6753 },
  establishment_year: '',
  student_count: '',
  official_link: '',
  college: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === 'checkbox') setData(name, checked);
    else if (type === 'file') setData(name, files[0]);
    else setData(name, value);
  };

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
    // تأكد من إرسال location كـ JSON string للبلد
    post(route('Admincolleges.store'), {
      forceFormData: true,
      // نقل location كنص JSON
      onBefore: () => {
        setData('location', JSON.stringify(data.location));
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="إضافة كلية" />
      <div className="modern-form">
        <h1 className="form-title">إضافة كلية جديدة</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="form-group">
            <label htmlFor="name">اسم الكلية</label>
            <input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <p className="input-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="image">صورة الكلية</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className={errors.image ? 'input-error' : ''}
            />
            {errors.image && <p className="input-error">{errors.image}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="summary">الملخص</label>
            <textarea
              id="summary"
              name="summary"
              value={data.summary}
              onChange={handleChange}
              required
              className={errors.summary ? 'input-error' : ''}
              rows={3}
            />
            {errors.summary && <p className="input-error">{errors.summary}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="details">التفاصيل</label>
            <textarea
              id="details"
              name="details"
              value={data.details}
              onChange={handleChange}
              required
              className={errors.details ? 'input-error' : ''}
              rows={6}
            />
            {errors.details && <p className="input-error">{errors.details}</p>}
          </div>

          {/* حقل البحث عن الموقع */}
          <div className="form-group relative">
            <label htmlFor="location_search">البحث عن موقع</label>
            <input
              id="location_search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="ابحث عن مدينة أو موقع"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searchLoading}
              className="absolute top-8 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              {searchLoading ? 'جاري البحث...' : 'بحث'}
            </button>

            {searchResults.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full max-h-48 overflow-auto mt-1 shadow-lg">
                {searchResults.map((result) => (
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
            {searchError && <p className="text-red-500 text-xs italic mt-1">{searchError}</p>}
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
            <div className="flex gap-4 mt-2">
              <input
                type="number"
                step="any"
                value={data.location.lat}
                onChange={(e) =>
                  setData('location', { ...data.location, lat: parseFloat(e.target.value) })
                }
                placeholder="خط العرض"
                className="border px-2 py-1 rounded w-1/2"
              />
              <input
                type="number"
                step="any"
                value={data.location.lng}
                onChange={(e) =>
                  setData('location', { ...data.location, lng: parseFloat(e.target.value) })
                }
                placeholder="خط الطول"
                className="border px-2 py-1 rounded w-1/2"
              />
            </div>
            {errors.location && typeof errors.location === 'string' && (
              <p className="text-red-500 text-xs italic">{errors.location}</p>
            )}
          </div>

          {/* بقية الحقول */}
          <div className="form-group">
            <label htmlFor="location">المحافظة</label>
            <select
              id="governorate_id"
              name="governorate_id"
              value={data.governorate_id}
              onChange={handleChange}
              required
              className={errors.governorate_id ? 'input-error' : ''}
            >
              <option value="">اختر المحافظة</option>
              {governorates.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.governorate_id && <p className="input-error">{errors.governorate_id}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="establishment_year">سنة التأسيس</label>
            <input
              id="establishment_year"
              type="number"
              name="establishment_year"
              value={data.establishment_year}
              onChange={handleChange}
              min={1800}
              max={2100}
              required
              className={errors.establishment_year ? 'input-error' : ''}
            />
            {errors.establishment_year && <p className="input-error">{errors.establishment_year}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="student_count">عدد الطلاب</label>
            <input
              id="student_count"
              type="number"
              name="student_count"
              value={data.student_count}
              onChange={handleChange}
              min={0}
              required
              className={errors.student_count ? 'input-error' : ''}
            />
            {errors.student_count && <p className="input-error">{errors.student_count}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="official_link">الرابط الرسمي</label>
            <input
              id="official_link"
              type="url"
              name="official_link"
              value={data.official_link}
              onChange={handleChange}
              required
              className={errors.official_link ? 'input-error' : ''}
            />
            {errors.official_link && <p className="input-error">{errors.official_link}</p>}
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="college"
                checked={data.college}
                onChange={handleChange}
              />
              هل هي كلية؟
            </label>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button type="submit" className="submit-btn" disabled={processing}>
              {processing ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <Link
              href={route('Admincolleges.index')}
              className="back-link"
              style={{ alignSelf: 'center', marginLeft: 10 }}
            >
              رجوع
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
