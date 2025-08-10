import React from "react";
import UniversitySelection2025 from "@/Components/UniversitySelection2025/UniversitySelection2025";
import ImportantDates from "@/Components/ImportantDates/ImportantDates";
import RegistrationSteps from "@/Components/RegistrationSteps/RegistrationSteps";
import SupportBox from "@/Components/SupportBox/SupportBox";
import UniversityCentersFAQ from "@/Components/UniversityCentersFAQ/UniversityCentersFAQ"
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Differentiation from '@/Components/Differentiation/Differentiation';


const UniversitySelectionPage = ({
  admissionSchedules,
  registrationSteps,
  admissionFile,
  totalSpecializationsCount,
  currentYear,
  universityCentersByGovernorate,  // البيانات الجديدة
}) => {
  return (
    <>
      <Navbar />
      <div>
        <UniversitySelection2025
          admissionFile={admissionFile}
          year={currentYear}
          totalSpecializationsCount={totalSpecializationsCount}
          universityCentersCount={universityCentersByGovernorate.reduce((acc, gov) => acc + gov.centers_count, 0)}
        />
        <ImportantDates dates={admissionSchedules} />
        <RegistrationSteps steps={registrationSteps} />
        <UniversityCentersFAQ data={universityCentersByGovernorate} />
        <SupportBox />

      <Differentiation registrationSteps={registrationSteps} admissionFile={admissionFile} />



        
      </div>
      <Footer />
    </>
  );
};

export default UniversitySelectionPage;
