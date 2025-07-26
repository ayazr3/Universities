import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import { FaBell, FaUser } from "react-icons/fa";
import styles from "../Components/Admin/Dashboard.module.css";
export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        // <div className="min-h-screen bg-gray-100">
        //     <nav className="bg-white border-b border-gray-100">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //             <div className="flex justify-between h-16">
        //                 <div className="flex">
        //                     <div className="shrink-0 flex items-center">
        //                         <Link href="/">
        //                             <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
        //                         </Link>
        //                     </div>

        //                     <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
        //                         <NavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                             Dashboard
        //                         </NavLink>
        //                         <NavLink href={route('announcement.index')} active={route().current('announcements.index')}>
        //                             Announcements
        //                         </NavLink>
        //                         <NavLink href={route('faq.index')} active={route().current('announcements.index')}>
        //                             Faq
        //                         </NavLink>
        //                         <NavLink href={route('admissionSchedule.index')} active={route().current('announcements.index')}>
        //                             AdmissionSchedule
        //                         </NavLink>
        //                         <NavLink href={route('registrationstep.index')} active={route().current('announcements.index')}>
        //                             RegistrationStep
        //                         </NavLink>
        //                         <NavLink href={route('settings.index')} active={route().current('announcements.index')}>
        //                             Settings
        //                         </NavLink>
        //                         <NavLink href={route('official-links.index')} active={route().current('announcements.index')}>
        //                             Official Links
        //                         </NavLink>
        //                         <NavLink href={route('terms.index')} active={route().current('announcements.index')}>
        //                             Terms
        //                         </NavLink>
        //                         <NavLink href={route('guidances.index')} active={route().current('announcements.index')}>
        //                             Guidances
        //                         </NavLink>
        //                     </div>
        //                 </div>

        //                 <div className="hidden sm:flex sm:items-center sm:ms-6">
        //                     <div className="ms-3 relative">
        //                         <Dropdown>
        //                             <Dropdown.Trigger>
        //                                 <span className="inline-flex rounded-md">
        //                                     <button
        //                                         type="button"
        //                                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
        //                                     >
        //                                         {user.name}

        //                                         <svg
        //                                             className="ms-2 -me-0.5 h-4 w-4"
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             viewBox="0 0 20 20"
        //                                             fill="currentColor"
        //                                         >
        //                                             <path
        //                                                 fillRule="evenodd"
        //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                 clipRule="evenodd"
        //                                             />
        //                                         </svg>
        //                                     </button>
        //                                 </span>
        //                             </Dropdown.Trigger>

        //                             <Dropdown.Content>
        //                                 <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
        //                                 <Dropdown.Link href={route('logout')} method="post" as="button">
        //                                     Log Out
        //                                 </Dropdown.Link>
        //                             </Dropdown.Content>
        //                         </Dropdown>
        //                     </div>
        //                 </div>

        //                 <div className="-me-2 flex items-center sm:hidden">
        //                     <button
        //                         onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
        //                         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        //                     >
        //                         <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        //                             <path
        //                                 className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                             <path
        //                                 className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
        //             <div className="pt-2 pb-3 space-y-1">
        //                 <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                     Dashboard
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('announcement.index')} active={route().current('announcements.index')}>
        //                     Announcements
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('faq.index')} active={route().current('announcements.index')}>
        //                     Faq
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('admissionSchedule.index')} active={route().current('announcements.index')}>
        //                     AdmissionSchedule
        //                 </ResponsiveNavLink>

        //                 <ResponsiveNavLink href={route('registrationstep.index')} active={route().current('announcements.index')}>
        //                     RegistrationStep
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('settings.index')} active={route().current('announcements.index')}>
        //                     Settings
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('official-links.index')} active={route().current('announcements.index')}>
        //                     Official Links
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('terms.index')} active={route().current('announcements.index')}>
        //                     Terms
        //                 </ResponsiveNavLink>
        //                 <ResponsiveNavLink href={route('guidances.index')} active={route().current('announcements.index')}>
        //                     Guidances
        //                 </ResponsiveNavLink>
        //             </div>

        //             <div className="pt-4 pb-1 border-t border-gray-200">
        //                 <div className="px-4">
        //                     <div className="font-medium text-base text-gray-800">{user.name}</div>
        //                     <div className="font-medium text-sm text-gray-500">{user.email}</div>
        //                 </div>

        //                 <div className="mt-3 space-y-1">
        //                     <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
        //                     <ResponsiveNavLink method="post" href={route('logout')} as="button">
        //                         Log Out
        //                     </ResponsiveNavLink>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>

        //     {header && (
        //         <header className="bg-white shadow">
        //             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        //         </header>
        //     )}

        //     <main>{children}</main>
        // </div>
        <div className={styles.stGuideDashboard}>
                <div className={styles.stWaveTop}>
                    <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff2" d="M0,160 C480,220 960,100 1440,180 L1440,0 L0,0 Z" />
                    </svg>
                </div>

                <aside className={styles.stSidebar}>
                    <div className={styles.stSidebarHeader}>
                        <ul><li>دليل الطالب</li></ul>
                    </div>
                    <nav>
                        <ul>
                            <li><a href={route('announcement.index')} active={route().current('announcements.index')}>المحافظات</a></li>
                            <li ><a href={route('announcement.index')} active={route().current('announcements.index')}>الكليات</a></li>
                            <li ><a href={route('announcement.index')} active={route().current('announcements.index')}>الإختصاصات</a></li>
                            <li ><a href={route('announcement.index')} active={route().current('announcements.index')}>المقررات الدراسية</a></li>
                            <li ><a href={route('guidances.index')} active={route().current('guidances.index')}>التوجيه والدعم</a></li>
                            <li ><a href={route('faq.index')} active={route().current('faq.index')}>الأسئلة الشائعة</a></li>
                            <li  ><a href={route('announcement.index')} active={route().current('announcements.index')}>الطلاب الأوائل </a></li>
                            <li ><a href={route('announcement.index')} active={route().current('announcements.index')}>المشاريع </a></li>
                            <li ><a href={route('announcement.index')} active={route().current('announcements.index')}>الإعلانات </a></li>
                            <li ><a href={route('registrationstep.index')} active={route().current('registrationstep.index')}>خطوات التسجيل </a></li>
                            <li ><a href={route('admissionSchedule.index')} active={route().current('admissionSchedule.index')}>المواعيد </a></li>
                            <li ><a href={route('settings.index')} active={route().current('settings.index')}>الإعدادات العامة </a></li>
                            <li ><a href={route('official-links.index')} active={route().current('official-links.index')}>الروابط الرسمية </a></li>
                            <li ><a href={route('terms.index')} active={route().current('terms.index')}> السياسات </a> </li>
                        </ul>
                    </nav>
                </aside>

                <main className={styles.stMainContent}>
                    <header className={styles.stHeader}>
                        <div>
                            <h2>لوحة التحكم الرئيسية</h2>
                            <span className={styles.stWelcome}>مرحباً بك في نظام إدارة دليل الطالب</span>
                        </div>
                        <div className={styles.stHeaderActions}>
                            <FaBell className={styles.stIcon} />
                            <motion.div
                                className={styles.stUser}
                                whileHover={{ scale: 1.07 }}
                                transition={{ type: "spring", stiffness: 320 }}
                            >
                                <FaUser />
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
                    </header>
                    <main>{children}</main>
                    {/* <section className={styles.stStatsGrid}>
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                className={styles.stStatCard}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.12, duration: 0.5, type: "spring" }}
                                style={{
                                    borderBottom: `10px solid ${stat.color}`,
                                    boxShadow: `0 6px 40px ${stat.color}55`
                                }}
                                whileHover={{ scale: 1.05, rotate: -1 }}
                            >
                                <motion.span
                                    className={styles.stStatIcon}
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {stat.icon}
                                </motion.span>
                                <div>
                                    <div className={styles.stStatValue}>{stat.value}</div>
                                    <div className={styles.stStatLabel}>{stat.label}</div>
                                    <div
                                        className={styles.stStatChange}
                                        style={{ color: stat.change.startsWith('-') ? '#ef4444' : '#4ade80' }}
                                    >
                                        {stat.change}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </section>

                    <section className={styles.stChartSection}>
                        <div className={styles.stChartPlaceholder}>
                            <span>نمو المحتوى - آخر 6 أشهر</span>
                        </div>
                    </section>

                    <section className={styles.stQuickActions}>
                        <h3>إجراءات سريعة</h3>
                        <div className={styles.stActionsGrid}>
                            {quickActions.map((action, idx) => (
                                <motion.button
                                    key={action.label}
                                    className={styles.stActionBtn}
                                    whileHover={{ scale: 1.08, boxShadow: "0 18px 48px #0005", rotate: 1 }}
                                    transition={{ type: "spring", stiffness: 420 }}
                                >
                                    <div className={styles.stActionLabel}>{action.label}</div>
                                    <div className={styles.stActionDesc}>{action.desc}</div>
                                </motion.button>
                            ))}
                        </div>
                    </section> */}
                </main>
            </div>
    );
}
