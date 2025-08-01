import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import "../Components/Admin/Dashboard.css";

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
            <div className="dashboard-app">
                <main className="main-contentt">
                    {/* بطاقات الإحصائيات */}
                    <section className="stats-cards">
                        <div className="stat-card">
                            <div className="stat-icon stat-college"></div>
                            <div>
                                <span className="stat-title">الكليات</span>
                                <span className="stat-value">45</span>
                                <span className="stat-change positive">+12% هذا الشهر</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-special"></div>
                            <div>
                                <span className="stat-title">الاختصاصات</span>
                                <span className="stat-value">156</span>
                                <span className="stat-change positive">+8% هذا الشهر</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-article"></div>
                            <div>
                                <span className="stat-title">المقررات الجامعية</span>
                                <span className="stat-value">89</span>
                                <span className="stat-change positive">+15% هذا الشهر</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-ads"></div>
                            <div>
                                <span className="stat-title">الإعلانات النشطة</span>
                                <span className="stat-value">12</span>
                                <span className="stat-change negative">-3% هذا الشهر</span>
                            </div>
                        </div>
                    </section>

                    {/* الرسم البياني والإجراءات السريعة */}
                    <section className="dashboard-bottom">
                        {/* الرسم البياني */}
                        <div className="chart-section">
                            <span className="chart-title">نمو المحتوى - آخر شهر</span>
                            <div className="chart-placeholder">
                                <svg width="100%" height="220">
                                    <defs>
                                        <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#7b72ff" />
                                            <stop offset="100%" stopColor="#5a55e0" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="0" y="0" width="100%" height="220" fill="url(#purpleGrad)" opacity="0.18" />
                                    <text x="50%" y="50%" textAnchor="middle" fill="#fff" fontSize="32" opacity="0.3" dy=".3em">
                                        📊
                                    </text>
                                </svg>
                            </div>
                            <div className="chart-months">
                                <span>يناير</span>
                                <span>فبراير</span>
                                <span>مارس</span>
                                <span>أبريل</span>
                                <span>مايو</span>
                                <span>يونيو</span>
                            </div>
                        </div>
                        {/* إجراءات سريعة */}
                        <div className="quick-actions">
                            <span className="quick-title">إجراءات سريعة</span>
                            <button className="quick-btn">إضافة إعلان جديد</button>
                            <button className="quick-btn">إضافة اختصاص جديد</button>
                            <button className="quick-btn">إضافة مقرر جامعي</button>
                            <button className="quick-btn">إضافة كلية</button>
                        </div>
                    </section>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
