// import React from "react";
// import Navbar from "@/Components/Navbar/Navbar";
// import Footer from "@/Components/Footer/Footer";
// import TopStudents from "@/Components/TopStudents/TopStudents";

// export default function TopStudentsPage({ specialization, students }) {
//   return (
//     <>
//       <Navbar />
//       <TopStudents students={students} />
//       <Footer />
//     </>
//   );
// }
import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import TopStudents from "@/Components/TopStudents/TopStudents";
import { usePage } from "@inertiajs/react";


export default function TopStudentsPage({ specialization, students }) {
   const { props } = usePage();
  const { quickLinks } = props;
  return (
    <>
      <Navbar />
      <TopStudents students={students} specialization={specialization} />
      <Footer quickLinks={quickLinks} />
    </>
  );
}
