import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import { FaBell, FaUser } from "react-icons/fa";
import "../Components/Admin/Dashboard.css";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
     const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

    return (
        <div className="dashboard-app">
            <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        &#9776;
      </button>
            {/* الشريط الجانبي */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <span className="sidebar-title">طريقك الجامعي</span>
                </div>
                <div className="sidebar-section">
                    <span className="section-title">المحتوى الأساسي</span>
                    <ul>
                        <li><a href={route('governorates.index')} className={route().current('governorates.index') ? "active" : ""}>المحافظات</a></li>
                        <li><a href={route('Admincolleges.index')} className={route().current('Admincolleges.index') ? "active" : ""}>الكليات</a></li>
                        <li><a href={route('adminspecializations.index')} className={route().current('adminspecializations.index') ? "active" : ""}>الإختصاصات</a></li>
                        <li><a href={route('admincourses.index')} className={route().current('admincourses.index') ? "active" : ""}>المقررات الدراسية</a></li>
                    </ul>
                </div>
                <div className="sidebar-section">
                    <span className="section-title">المحتوى الداعم</span>
                    <ul>
                        <li><a href={route('guidances.index')} className={route().current('guidances.index') ? "active" : ""}>التوجيه والدعم</a></li>
                        <li><a href={route('faq.index')} className={route().current('faq.index') ? "active" : ""}>الأسئلة الشائعة</a></li>
                        <li><a href={route('admintopstudents.index')} className={route().current('admintopstudents.index') ? "active" : ""}>الطلاب الأوائل</a></li>
                        <li><a href={route('admingraduation_projects.index')} className={route().current('admingraduation_projects.index') ? "active" : ""}>المشاريع</a></li>
                        <li><a href={route('adminuniversitycenters.index')} className={route().current('adminuniversitycenters.index') ? "active" : ""}>المراكز الجامعية</a></li>
                        <li><a href={route('announcement.index')} className={route().current('announcements.index') ? "active" : ""}>الإعلانات</a></li>
                        <li><a href={route('registrationstep.index')} className={route().current('registrationstep.index') ? "active" : ""}>خطوات التسجيل</a></li>
                        <li><a href={route('admissionSchedule.index')} className={route().current('admissionSchedule.index') ? "active" : ""}>المواعيد</a></li>
                    </ul>
                </div>
                <div className="sidebar-section">
                    <span className="section-title">إدارة النظام</span>
                    <ul>
                        <li><a href={route('settings.index')} className={route().current('settings.index') ? "active" : ""}>الإعدادات العامة</a></li>
                        <li><a href={route('official-links.index')} className={route().current('official-links.index') ? "active" : ""}>الروابط الرسمية</a></li>
                        <li><a href={route('terms.index')} className={route().current('terms.index') ? "active" : ""}>السياسات</a></li>
                    </ul>
                </div>
            </aside>

            {/* المحتوى الرئيسي */}
            <main className="main-contentt">
                {/* الشريط العلوي */}
                <header className="topbar">
                    <div>
                        <h1 className="main-title">لوحة التحكم الرئيسية</h1>
                        <p className="main-desc">مرحباً بك في نظام إدارة دليل الطالب.</p>
                    </div>
                    <div className="user-bar">
                        <span className="notif-dot"></span>
                        <div className="profile">
                            <span className="profile-icon">👤</span>
                            <div className="stHeaderActions">
                                {/* <FaBell className="stIcon" /> */}
                                <motion.div
                                    className="stUser"
                                    whileHover={{ scale: 1.07 }}
                                    transition={{ type: "spring", stiffness: 320 }}
                                >
                                    {/* <FaUser /> */}
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}
                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>{children}</main>
            </main>
        </div>
    );
}
