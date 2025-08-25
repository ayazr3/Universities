
import React from 'react';
import EngineeringCollege from '@/Components/EngineeringCollege/EngineeringCollege';
import CollegeIntro from '@/Components/CollegeIntro/CollegeIntro';
import CollegeMap from '@/Components/CollegeMap/CollegeMap';
import Specialties from '@/Components/Specialties/Specialties';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
import { usePage } from "@inertiajs/react";

export default function CollegeDetails({ college, specializations }) {
  const { props } = usePage();
  const { quickLinks } = props;

  const stats = [
    { value: college.establishment_year, label: "سنة التأسيس", color: "#2962ff" },
    { value: college.student_count, label: "عدد الطلاب", color: "#43a047" },
    { value: college.official_link, color: "#8e24aa", isLink: true },
  ];

  // ضبط مصدر الصورة: رابط كامل أو رابط للتخزين المحلي
  const imageSrc = college.image.startsWith('http') ? college.image : `/storage/${college.image}`;

  return (
    <>
      <Navbar />
      <div>
        <EngineeringCollege stats={stats} name={college.name} image={imageSrc} />
        <CollegeIntro summary={college.summary} />
        <CollegeMap location={college.location} name={college.name} address={college.details} />
        <Specialties specializations={specializations} collegeId={college.id} />
      </div>
      <Footer quickLinks={quickLinks} />
    </>
  );
}
