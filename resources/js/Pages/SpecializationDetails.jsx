import React from "react";
import ComputerEngineeringHero from "@/Components/ComputerEngineeringHero";
import ComputerEngineering from "@/Components/ComputerEngineering";
import StudyPlan from "@/Components/StudyPlan";
import FutureOpportunities from "@/Components/FutureOpportunities";
import AcademicPrograms from "@/Components/AcademicPrograms";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

export default function SpecializationDetails({ specialization }) {

  // يمكنك تمرير البيانات أو عرض التخصص في العنوان مثلاً
  return (
    <>
      <Navbar />
      <main>
        <ComputerEngineeringHero />
        <ComputerEngineering />
        <StudyPlan />
        <FutureOpportunities />
        <AcademicPrograms />
      </main>
      <Footer />
    </>
  );
}
