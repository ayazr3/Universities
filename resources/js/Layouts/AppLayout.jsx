import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AppLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* شريط التنقل العلوي */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* الجزء الأيسر من الشريط */}
                        <div className="flex">
                            {/* الشعار */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* روابط التنقل الرئيسية (لأجهزة الكمبيوتر) */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('welcome')} active={route().current('welcome')}>
                                    الرئيسية
                                </NavLink>
                                <NavLink href={route('cars.index')} active={route().current('cars.index')}>
                                    معرض السيارات
                                </NavLink>
                                <NavLink href={route('about')} active={route().current('about')}>
                                    عن الموقع
                                </NavLink>
                                <NavLink href={route('contact')} active={route().current('contact')}>
                                    اتصل بنا
                                </NavLink>
                            </div>
                        </div>

                        {/* الجزء الأيمن من الشريط (روابط تسجيل الدخول/التسجيل) */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="flex space-x-4">
                                <Link
                                    href={route('login')}
                                    className="text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    إنشاء حساب
                                </Link>
                            </div>
                        </div>

                        {/* زر القائمة المنسدلة (للأجهزة المحمولة) */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* القائمة المنسدلة (للأجهزة المحمولة) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('welcome')} active={route().current('welcome')}>
                            الرئيسية
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('cars.index')} active={route().current('cars.index')}>
                            معرض السيارات
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('about')} active={route().current('about')}>
                            عن الموقع
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('contact')} active={route().current('contact')}>
                            اتصل بنا
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('login')}>تسجيل الدخول</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')}>إنشاء حساب</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* عنوان الصفحة */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* المحتوى الرئيسي */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            {/* تذييل الصفحة */}
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                                <span className="ml-2 text-xl font-semibold text-gray-800">موقع السيارات</span>
                            </Link>
                        </div>
                        <div className="flex space-x-6">
                            <Link href={route('about')} className="text-gray-600 hover:text-gray-900">
                                عن الموقع
                            </Link>
                            <Link href={route('contact')} className="text-gray-600 hover:text-gray-900">
                                اتصل بنا
                            </Link>
                            <Link href={route('privacy')} className="text-gray-600 hover:text-gray-900">
                                سياسة الخصوصية
                            </Link>
                            <Link href={route('terms')} className="text-gray-600 hover:text-gray-900">
                                الشروط والأحكام
                            </Link>
                        </div>
                    </div>
                    <div className="mt-6 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} موقع السيارات. جميع الحقوق محفوظة.
                    </div>
                </div>
            </footer>
        </div>
    );
}
