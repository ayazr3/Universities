
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SettingMap from '@/Components/SettingMap';

export default function SettingEdit({ setting, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    site_name: setting.site_name || '',
    logo: setting.logo || '',
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

  // دالة البحث في Nominatim
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1&accept-language=ar`
      );
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      setSearchError('حدث خطأ أثناء البحث. حاول مرة أخرى.');
    } finally {
      setSearchLoading(false);
    }
  };

  // عند اختيار نتيجة البحث
  const handleSelectLocation = (location) => {
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lon);
    setData('location', { lat, lng });
    setSearchResults([]);
    setSearchQuery(location.display_name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('settings.update', setting.id));
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">تعديل الإعداد</h2>}>
      <Head title="تعديل الإعداد" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <form onSubmit={handleSubmit}>

            {/* اسم الموقع */}
            <div className="mb-4">
              <label htmlFor="site_name" className="block text-gray-700 font-bold mb-2">اسم الموقع</label>
              <input
                id="site_name"
                type="text"
                value={data.site_name}
                onChange={e => setData('site_name', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.site_name ? 'border-red-500' : ''}`}
              />
              {errors.site_name && <p className="text-red-500 text-xs italic">{errors.site_name}</p>}
            </div>

            {/* رابط الشعار */}
            <div className="mb-4">
              <label htmlFor="logo" className="block text-gray-700 font-bold mb-2">رابط الشعار</label>
              <input
                id="logo"
                type="text"
                value={data.logo}
                onChange={e => setData('logo', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.logo ? 'border-red-500' : ''}`}
              />
              {errors.logo && <p className="text-red-500 text-xs italic">{errors.logo}</p>}
            </div>

            {/* رابط الموقع */}
            <div className="mb-4">
              <label htmlFor="url" className="block text-gray-700 font-bold mb-2">رابط الموقع</label>
              <input
                id="url"
                type="text"
                value={data.url}
                onChange={e => setData('url', e.target.value)}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.url ? 'border-red-500' : ''}`}
              />
              {errors.url && <p className="text-red-500 text-xs italic">{errors.url}</p>}
            </div>

            {/* الوصف */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">الوصف</label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={5}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
            </div>

            {/* حقل البحث عن الموقع */}
            <div className="mb-4 relative">
              <label htmlFor="location_search" className="block text-gray-700 font-bold mb-2">البحث عن موقع</label>
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

              {/* عرض نتائج البحث */}
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
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">الموقع على الخريطة</label>
              <SettingMap lat={data.location.lat} lng={data.location.lng} setLatLng={handleLatLng} editable={true} height={300} />
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  step="any"
                  value={data.location.lat}
                  onChange={e => setData('location', { ...data.location, lat: parseFloat(e.target.value) })}
                  placeholder="خط العرض"
                  className="border px-2 py-1 rounded w-1/2"
                />
                <input
                  type="number"
                  step="any"
                  value={data.location.lng}
                  onChange={e => setData('location', { ...data.location, lng: parseFloat(e.target.value) })}
                  placeholder="خط الطول"
                  className="border px-2 py-1 rounded w-1/2"
                />
              </div>
              {(errors.location && typeof errors.location === 'string') && (
                <p className="text-red-500 text-xs italic">{errors.location}</p>
              )}
            </div>

            {/* أزرار التحديث والرجوع */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {processing ? 'جاري التحديث...' : 'تحديث الإعداد'}
              </button>
              <Link href={route('settings.index')} className="text-blue-500 hover:text-blue-700">رجوع</Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
