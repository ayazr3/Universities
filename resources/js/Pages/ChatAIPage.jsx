import React from "react";
import GeminiChat from "../Components/Chatai/GeminiChat";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { usePage } from "@inertiajs/react";

const ChatAIPage = () => { 
 const { props } = usePage();
  const { quickLinks } = props;
  
  return (
    <div>
      <>
      <Navbar/>
       <GeminiChat />
         <Footer quickLinks={quickLinks} />
      
     
      </>
    </div>
  );
};

export default ChatAIPage;
