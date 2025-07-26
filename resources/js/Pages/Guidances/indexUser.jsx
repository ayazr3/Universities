import React from 'react';
import ArticlesMiniPage from '@/Components/Guidance/Article';
import BooksSection from '@/Components/BooksSection/BooksSection';
import EducationalVideos from '@/Components/EducationalVideos/EducationalVideos';
import TechTips from '@/Components/TechTips/TechTips';
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

export default function GuidanceIndex({ articles, books, videos, advices }) {
  return (
    <>
        <Navbar />
      {/* تمرير البيانات لمكونات كل نوع */}
      <TechTips advices={advices} />
      <ArticlesMiniPage articles={articles} />
      <BooksSection books={books} />
      <EducationalVideos videos={videos} />
      
      <Footer/>
    </>
  );
}
