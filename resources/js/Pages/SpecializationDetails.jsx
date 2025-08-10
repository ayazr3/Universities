import React from 'react';
import ComputerEngineeringHero from '@/Components/computerEngineeringHero/ComputerEngineeringHero' ;
import ComputerEngineering from '@/Components/ComputerEngineeringg/ComputerEngineeringg';
import FutureOpportunities from '@/Components/FutureOpportunities/FutureOpportunities';
import AcademicPrograms from '@/Components/AcademicPrograms/AcademicPrograms';

const SpecializationDetails = ({ specializations }) => {


  const specialization = specializations.length > 0 ? specializations[0] : null;

  if (!specialization) {
    return <div>لا توجد بيانات متاحة</div>;
  }

  return (
    <>
      <ComputerEngineeringHero specialization={specialization} />
      <ComputerEngineering specialization={specialization} />
      <FutureOpportunities specialization={specialization} />
      <AcademicPrograms specialization={specialization} />
    </>
  );
};

export default SpecializationDetails
;
