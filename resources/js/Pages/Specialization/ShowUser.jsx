import React from "react";
import ComputerEngineeringHero from "../../Components/ComputerEngineeringHero";
import ComputerEngineering from "../../Components/ComputerEngineering";
import StudyPlan from "../../Components/StudyPlan";
import FutureOpportunities from "../../Components/FutureOpportunities";
import AcademicPrograms from "../../Components/AcademicPrograms";

export default function ShowUser({ governorate, college, specialization }) {

  // يمكنك تعديل كل كومبوننت ليتقبل props بيانات من السيرفر ثم يعرضها

  return (
    <div>
      {/* يمكنك تمرير بيانات التخصص والكلية كمثال للمكون Hero */}
      <ComputerEngineeringHero specialization={specialization} college={college} governorate={governorate} />

      {/* باقي الكومبوننتات التي تعطي تفاصيل عن التخصص */}
      <ComputerEngineering specialization={specialization} />
      <StudyPlan specialization={specialization} />
      <FutureOpportunities specialization={specialization} />
      <AcademicPrograms specialization={specialization} />
    </div>
  );
}
