import React from 'react';
import DamascusUniversityHeader from '../Components/DamascusHeader/DamascusHeader';
import CollegeCards from '../Components/CollegeCards/CollegesCards';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
import { usePage } from "@inertiajs/react";


const CollegesList = ({ governorateName, colleges }) => {
 const { props } = usePage();
  const { quickLinks } = props;

  return (
     <>
      <Navbar/>
    <div>
      <DamascusUniversityHeader governorateName={governorateName} />
      <CollegeCards colleges={colleges} />
    </div>
     <Footer quickLinks={quickLinks} />
    </>
  );
};
export default CollegesList;
