import React from 'react';
import DamascusUniversityHeader from '../Components/DamascusHeader/DamascusHeader';
import CollegeCards from '../Components/CollegeCards/CollegesCards';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';

const CollegesList = ({ governorateName, colleges }) => {
  return (
     <>
      <Navbar/>
    <div>
      <DamascusUniversityHeader governorateName={governorateName} />
      <CollegeCards colleges={colleges} />
    </div>
    <Footer/>
    </>
  );
};
export default CollegesList;
