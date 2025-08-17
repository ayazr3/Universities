import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import ComputerEngineeringHero from "@/Components/ComputerEngineeringHero/ComputerEngineeringHero";
import ComputerEngineering from "@/Components/ComputerEngineeringg/ComputerEngineeringg";
import StudyPlan from "@/Components/StudyPlan/StudyPlan";
import FutureOpportunities from "@/Components/FutureOpportunities/FutureOpportunities";
import { usePage } from "@inertiajs/react";
 
 
export default function SpecializationDetails({
  specialization,
  courses,
  futureOpportunities,
}) {
  const { props } = usePage();
  const { quickLinks } = props;
    console.log("Courses data:", courses);
  return (
    <>
      <Navbar />

      <ComputerEngineeringHero
        collegeName={specialization.name}
        title={specialization.title}
        degreeType={specialization.degree_type}
        academicYears={specialization.academic_year_number}
         specializationId={specialization.id}
      />

      <ComputerEngineering specialization={specialization} />

      <StudyPlan courses={courses} />

      <FutureOpportunities futureOpportunities={futureOpportunities} />

     <Footer quickLinks={quickLinks} />
    </>
  );
}
