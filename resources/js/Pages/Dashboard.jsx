// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import { motion } from "framer-motion";
// import { FaBell, FaUser } from "react-icons/fa";
// import styles from "../Components/Admin/Dashboard.module.css";




// const stats = [
//   { label: "الكليات", value: 45, icon: "🎓", change: "+12%", color: "#7c3aed" },
//   { label: "الاختصاصات", value: 156, icon: "📚", change: "+8%", color: "#06b6d4" },
//   { label: "المقالات", value: 89, icon: "📰", change: "+15%", color: "#ec4899" },
//   { label: "الإعلانات النشطة", value: 12, icon: "📢", change: "-3%", color: "#f59e42" }
// ];

// const quickActions = [
//   { label: "إضافة إعلان", desc: "انشر إعلان جديد للطلاب" },
//   { label: "إضافة اختصاص جديد", desc: "أضف اختصاص جديد للطلاب" },
//   { label: "إضافة مقال", desc: "اكتب مقال وتوجيهي جديد" },
//   { label: "إضافة كلية", desc: "أضف كلية جديدة للنظام" }
// ];


// export default function Dashboard({ auth }) {
//     return (

//         <AuthenticatedLayout
//             user={auth.user}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
//         >


//             {/* //  <div className="py-12">
//             //     <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//             //         <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//             //             <div className="p-6 text-gray-900">You're logged in!</div>

//             //         </div>
//             //     </div>
//             // </div> */}

//             <div className={styles.stGuideDashboard}>

//       <div className={styles.stWaveTop}>
//         <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path fill="#fff2" d="M0,160 C480,220 960,100 1440,180 L1440,0 L0,0 Z" />
//         </svg>
//       </div>


//       <aside className={styles.stSidebar}>
//         <div className={styles.stSidebarHeader}>
//            <ul><li> دليل الطالب</li></ul>
//         </div>
//         <nav>
//           <ul>
//             <li>المحافظات</li>
//             <li>الكليات</li>
//             <li>الاختصاصات</li>
//             <li>المقررات الدراسية</li>
//             <li>التوجيه والدعم</li>
//             <li>الأسئلة الشائعة</li>
//             <li>الطلاب الأوائل</li>
//             <li>المشاريع</li>
//             <li>الإعلانات</li>
//             <li>الإعدادات العامة</li>
//             <li>الروابط الرسمية</li>
//           </ul>
//         </nav>
//       </aside>


//       <main className={styles.stMainContent}>

//         <header className={styles.stHeader}>
//           <div>
//             <h2>لوحة التحكم الرئيسية</h2>
//             <span className={styles.stWelcome}>مرحباً بك في نظام إدارة دليل الطالب</span>
//           </div>
//           <div className={styles.stHeaderActions}>
//             <FaBell className={styles.stIcon} />
//             <motion.div
//               className={styles.stUser}
//               whileHover={{ scale: 1.07 }}
//               transition={{ type: "spring", stiffness: 320 }}
//             >
//               <FaUser />
//               <span>المدير</span>
//             </motion.div>
//           </div>
//         </header>


//         <section className={styles.stStatsGrid}>
//           {stats.map((stat, idx) => (
//             <motion.div
//               key={stat.label}
//               className={styles.stStatCard}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.12, duration: 0.5, type: "spring" }}
//               style={{
//                 borderBottom: `10px solid ${stat.color}`,
//                 boxShadow: `0 6px 40px ${stat.color}55`
//               }}
//               whileHover={{ scale: 1.05, rotate: -1 }}
//             >
//               <motion.span
//                 className={styles.stStatIcon}
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 {stat.icon}
//               </motion.span>
//               <div>
//                 <div className={styles.stStatValue}>{stat.value}</div>
//                 <div className={styles.stStatLabel}>{stat.label}</div>
//                 <div className={styles.stStatChange} style={{ color: stat.change.startsWith('-') ? '#ef4444' : '#4ade80' }}>
//                   {stat.change}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </section>


//         <section className={styles.stChartSection}>
//           <div className={styles.stChartPlaceholder}>
//             <span>نمو المحتوى - آخر 6 أشهر</span>

//           </div>
//         </section>


//         <section className={styles.stQuickActions}>
//           <h3>إجراءات سريعة</h3>
//           <div className={styles.stActionsGrid}>
//             {quickActions.map((action, idx) => (
//               <motion.button
//                 key={action.label}
//                 className={styles.stActionBtn}
//                 whileHover={{ scale: 1.08, boxShadow: "0 18px 48px #0005", rotate: 1 }}
//                 transition={{ type: "spring", stiffness: 420 }}
//               >
//                 <div className={styles.stActionLabel}>{action.label}</div>
//                 <div className={styles.stActionDesc}>{action.desc}</div>
//               </motion.button>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//          </AuthenticatedLayout>
//     );
// }


// // import React from "react";
// // import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// // import { Head } from '@inertiajs/react';
// // import { motion } from "framer-motion";
// // import { FaBell, FaUser } from "react-icons/fa";
// // import styles from "../Components/Admin/Dashboard.css";

// // const stats = [
// //   { label: "الكليات", value: 45, icon: "🎓", change: "+12%", color: "#7c3aed" },
// //   { label: "الاختصاصات", value: 156, icon: "📚", change: "+8%", color: "#06b6d4" },
// //   { label: "المقالات", value: 89, icon: "📰", change: "+15%", color: "#ec4899" },
// //   { label: "الإعلانات النشطة", value: 12, icon: "📢", change: "-3%", color: "#f59e42" }
// // ];

// // const quickActions = [
// //   { label: "إضافة إعلان", desc: "انشر إعلان جديد للطلاب" },
// //   { label: "إضافة اختصاص جديد", desc: "أضف اختصاص جديد للطلاب" },
// //   { label: "إضافة مقال", desc: "اكتب مقال وتوجيهي جديد" },
// //   { label: "إضافة كلية", desc: "أضف كلية جديدة للنظام" }
// // ];

// // export default function Dashboard({auth}) {
// //   return (
// //     <AuthenticatedLayout
// //             user={auth.user}
// //             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
// //         >
// //             <Head title="Dashboard" />
//     {/* <div className={styles.stGuideDashboard}>

//       <div className={styles.stWaveTop}>
//         <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path fill="#fff2" d="M0,160 C480,220 960,100 1440,180 L1440,0 L0,0 Z" />
//         </svg>
//       </div>


//       <aside className={styles.stSidebar}>
//         <div className={styles.stSidebarHeader}>
//            <ul><li> دليل الطالب</li></ul>
//         </div>
//         <nav>
//           <ul>
//             <li>المحافظات</li>
//             <li>الكليات</li>
//             <li>الاختصاصات</li>
//             <li>المقررات الدراسية</li>
//             <li>التوجيه والدعم</li>
//             <li>الأسئلة الشائعة</li>
//             <li>الطلاب الأوائل</li>
//             <li>المشاريع</li>
//             <li>الإعلانات</li>
//             <li>الإعدادات العامة</li>
//             <li>الروابط الرسمية</li>
//           </ul>
//         </nav>
//       </aside>


//       <main className={styles.stMainContent}>

//         <header className={styles.stHeader}>
//           <div>
//             <h2>لوحة التحكم الرئيسية</h2>
//             <span className={styles.stWelcome}>مرحباً بك في نظام إدارة دليل الطالب</span>
//           </div>
//           <div className={styles.stHeaderActions}>
//             <FaBell className={styles.stIcon} />
//             <motion.div
//               className={styles.stUser}
//               whileHover={{ scale: 1.07 }}
//               transition={{ type: "spring", stiffness: 320 }}
//             >
//               <FaUser />
//               <span>المدير</span>
//             </motion.div>
//           </div>
//         </header>


//         <section className={styles.stStatsGrid}>
//           {stats.map((stat, idx) => (
//             <motion.div
//               key={stat.label}
//               className={styles.stStatCard}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.12, duration: 0.5, type: "spring" }}
//               style={{
//                 borderBottom: `10px solid ${stat.color}`,
//                 boxShadow: `0 6px 40px ${stat.color}55`
//               }}
//               whileHover={{ scale: 1.05, rotate: -1 }}
//             >
//               <motion.span
//                 className={styles.stStatIcon}
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 {stat.icon}
//               </motion.span>
//               <div>
//                 <div className={styles.stStatValue}>{stat.value}</div>
//                 <div className={styles.stStatLabel}>{stat.label}</div>
//                 <div className={styles.stStatChange} style={{ color: stat.change.startsWith('-') ? '#ef4444' : '#4ade80' }}>
//                   {stat.change}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </section>


//         <section className={styles.stChartSection}>
//           <div className={styles.stChartPlaceholder}>
//             <span>نمو المحتوى - آخر 6 أشهر</span>

//           </div>
//         </section>


//         <section className={styles.stQuickActions}>
//           <h3>إجراءات سريعة</h3>
//           <div className={styles.stActionsGrid}>
//             {quickActions.map((action, idx) => (
//               <motion.button
//                 key={action.label}
//                 className={styles.stActionBtn}
//                 whileHover={{ scale: 1.08, boxShadow: "0 18px 48px #0005", rotate: 1 }}
//                 transition={{ type: "spring", stiffness: 420 }}
//               >
//                 <div className={styles.stActionLabel}>{action.label}</div>
//                 <div className={styles.stActionDesc}>{action.desc}</div>
//               </motion.button>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div> */}
// //     </AuthenticatedLayout>
// //   );
// // }


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from "framer-motion";
import { FaBell, FaUser } from "react-icons/fa";
import styles from "../Components/Admin/Dashboard.module.css";

const stats = [
  { label: "الكليات", value: 45, icon: "🎓", change: "+12%", color: "#7c3aed" },
  { label: "الاختصاصات", value: 156, icon: "📚", change: "+8%", color: "#06b6d4" },
  { label: "المقالات", value: 89, icon: "📰", change: "+15%", color: "#ec4899" },
  { label: "الإعلانات النشطة", value: 12, icon: "📢", change: "-3%", color: "#f59e42" }
];

const quickActions = [
  { label: "إضافة إعلان", desc: "انشر إعلان جديد للطلاب" },
  { label: "إضافة اختصاص جديد", desc: "أضف اختصاص جديد للطلاب" },
  { label: "إضافة مقال", desc: "اكتب مقال وتوجيهي جديد" },
  { label: "إضافة كلية", desc: "أضف كلية جديدة للنظام" }
];

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className={styles.stGuideDashboard}>
                <div className={styles.stWaveTop}>
                    <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff2" d="M0,160 C480,220 960,100 1440,180 L1440,0 L0,0 Z" />
                    </svg>
                </div>

                {/* <aside className={styles.stSidebar}>
                    <div className={styles.stSidebarHeader}>
                        <ul><li>دليل الطالب</li></ul>
                    </div>
                    <nav>
                        <ul>
                            <li>المحافظات</li>
                            <li>الكليات</li>
                            <li>الاختصاصات</li>
                            <li>المقررات الدراسية</li>
                            <li>التوجيه والدعم</li>
                            <li>الأسئلة الشائعة</li>
                            <li>الطلاب الأوائل</li>
                            <li>المشاريع</li>
                            <li>الإعلانات</li>
                            <li>الإعدادات العامة</li>
                            <li>الروابط الرسمية</li>
                        </ul>
                    </nav>
                </aside> */}

                <main className={styles.stMainContent}>
                    {/* <header className={styles.stHeader}>
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
                                <span>المدير</span>
                            </motion.div>
                        </div>
                    </header> */}

                    <section className={styles.stStatsGrid}>
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
                    </section>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
