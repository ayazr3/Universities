import React from 'react';
import EngineeringCollege from '@/Components/EngineeringCollege/EngineeringCollege';
import CollegeIntro from '@/Components/CollegeIntro/CollegeIntro';
import CollegeMap from '@/Components/CollegeMap/CollegeMap';
import Specialties from '@/Components/Specialties/Specialties';
    
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
export default function CollegeDetails({ college, specializations })  {

  // إعداد بيانات stats للإحصائيات مع بيانات الكلية من الخادم
  const stats = [
    { value: college.establishment_year, label: "سنة التأسيس", color: "#2962ff" },
    { value: college.student_count, label: "عدد الطلاب", color: "#43a047" },
    { value: college.official_link,
        //  label: "رابط موقع الكلية الرسمي",
          color: "#8e24aa", isLink: true },
  ];

  return (
    <>
    <Navbar/>
    <div>
      <EngineeringCollege stats={stats} name={college.name} image={college.image} />
      <CollegeIntro summary={college.summary} />
      <CollegeMap location={college.location} name={college.name} address={college.details} />
        <Specialties specializations={specializations} />
    </div>
    <Footer/>
    </>
  );
}
