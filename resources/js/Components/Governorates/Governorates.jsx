// resources/js/Components/Governorates/Governorates.jsx
import React, { useState } from "react";
import { router } from '@inertiajs/react';
import "./Governorates.css"; // تأكد من وجود هذا الملف

const Governorates = ({ GOVERNORATES = [] }) => {
    const [selectedGov, setSelectedGov] = useState("");

    const handleSelect = (e) => {
        setSelectedGov(e.target.value);
    };

    const handleShowMajors = () => {
        if (selectedGov) {
            // استخدام Inertia.js router.get للانتقال وتمرير govId كجزء من بيانات الاستعلام
            router.get(route('colleges.indexUser'), { govId: selectedGov }); // استخدم route() هنا
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            alert("يرجى اختيار المحافظة أولاً");
        }
    };

    return (
        <div className="sygov-container">
            <h1 className="sygov-title">اختر محافظتك</h1>
            <h5 className="sygov-subtitle">
                حدد المحافظة التي ترغب بالدراسة فيها لنزودك بالتفاصيل
            </h5>

            <div className="sygov-controls">
                <button
                    onClick={handleShowMajors}
                    disabled={!selectedGov}
                    className={!selectedGov ? "sygov-btn-disabled" : "sygov-btn"}
                >
                    عرض التخصصات
                </button>
                <select
                    className="sygov-select"
                    value={selectedGov}
                    onChange={handleSelect}
                >
                    <option value="" disabled>اختر</option>
                    {GOVERNORATES.map((gov) => (
                        <option key={gov.id} value={gov.id}> {/* القيمة هنا id وليس name */}
                            {gov.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="sygov-list">
                {GOVERNORATES.map((gov) => (
                    <span
                        key={gov.id}
                        className={
                            // هنا يجب أن يكون المقارنة بـ gov.id وليس gov.name
                            selectedGov === String(gov.id) // تأكد من أن gov.id تتحول إلى String للمقارنة
                                ? "sygov-item-active"
                                : "sygov-item-disabled"
                        }
                    >
                        {gov.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Governorates;
