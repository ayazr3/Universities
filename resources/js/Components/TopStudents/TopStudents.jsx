

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TopStudents.css";

export default function TopStudents({ students, specialization }) {
  const [selectedYear, setSelectedYear] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false); // للحالة في الشاشات الصغيرة

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(students.map(s => s.graduation_year)));
    return uniqueYears.sort((a, b) => b - a);
  }, [students]);

  const filteredStudents = useMemo(
    () =>
      selectedYear === "all"
        ? students
        : students.filter((s) => String(s.graduation_year) === String(selectedYear)),
    [selectedYear, students]
  );

  const governorateName = specialization?.college?.governorate || "محافظة غير معروفة";

  // دالة تغير السنة مع إغلاق القائمة عند استخدامها في الهواتف الصغيرة
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
  };

  return (
    <div className="ssx-container">
      <motion.h1
        className="ssx-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      >
        <span className="ssx-gradient-text">نجوم تتألق في سماء جامعتنا</span>
      </motion.h1>

      <motion.p
        className="ssx-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, type: "spring", stiffness: 250 }}
      >
        لوحة الشرف | أوائل الخريجين <br />
        نكرم هنا طلابنا المتميزين الذين تخرجوا بنسبة نجاح استثنائية.
      </motion.p>

      {/* فلتر السنوات - مختلف للهواتف الصغيرة */}
      <div className="ssx-filter">
        {/* قائمة السنوات على الشاشات الكبيرة */}
        <div className="ssx-filter-large">
          <FilterButton
            active={selectedYear === "all"}
            onClick={() => handleYearSelect("all")}
          >
            عرض جميع الطلاب
          </FilterButton>
          {years.map((year) => (
            <FilterButton
              key={year}
              active={String(selectedYear) === String(year)}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </FilterButton>
          ))}
        </div>

        {/* Dropdown على الشاشات الصغيرة */}
        <div className="ssx-filter-dropdown">
          <button
            className="ssx-filter-btn dropdown-toggle"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {selectedYear === "all" ? "عرض جميع الطلاب" : selectedYear}
            <span className={`arrow ${dropdownOpen ? "open" : ""}`}>▼</span>
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                className="ssx-filter-dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="listbox"
                tabIndex={-1}
              >
                <li
                  className={`ssx-filter-dropdown-item${selectedYear === "all" ? " active" : ""}`}
                  onClick={() => handleYearSelect("all")}
                  role="option"
                  aria-selected={selectedYear === "all"}
                >
                  عرض جميع الطلاب
                </li>
                {years.map((year) => (
                  <li
                    key={year}
                    className={`ssx-filter-dropdown-item${String(selectedYear) === String(year) ? " active" : ""}`}
                    onClick={() => handleYearSelect(year)}
                    role="option"
                    aria-selected={String(selectedYear) === String(year)}
                  >
                    {year}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className={`ssx-grid ${filteredStudents.length === 1 ? "single-card" : ""}`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.02,
            },
          },
        }}
      >
        <AnimatePresence>
          {filteredStudents.length === 0 ? (
            <motion.div
              className="ssx-no-students"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              لا يوجد طلاب لهذه السنة.
            </motion.div>
          ) : (
            filteredStudents.map((student, idx) => (
              <StudentCard
                student={student}
                key={student.id}
                idx={idx}
                specialization={specialization}
                governorateName={governorateName}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      className={`ssx-filter-btn${active ? " active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className="ssx-ripple">{children}</span>
    </button>
  );
}

function StudentCard({ student, idx, specialization, governorateName }) {
  return (
    <motion.div
      className="ssx-card"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.98 }}
      transition={{ delay: idx * 0.02, type: "spring", stiffness: 300, duration: 0.18 }}
      whileHover={{
        scale: 1.025,
        boxShadow: "0 6px 20px 0 #a6b3f7",
        rotate: [0, 0.5, -0.5, 0],
        transition: { duration: 0.18 },
      }}
    >
      <div className="ssx-card-img-wrap">
        <img src={`/storage/${student.image}`} alt={student.name} className="ssx-card-img" />
      </div>
      <div className="ssx-card-info">
        <div className="ssx-card-name">{student.name}</div>
        <div className="ssx-card-major">التخصص: {specialization?.name}</div>
        <div className="ssx-card-university">جامعة {governorateName}</div>
        <div className="ssx-card-footer">
          <span className="ssx-card-year">{student.graduation_year}</span>
          <span className="ssx-card-score">{(student.gpa * 10).toFixed(1)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
