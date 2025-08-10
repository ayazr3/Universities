import React from "react";
import GeminiChat from "../Components/Chatai/GeminiChat";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

const ChatAIPage = () => {
  return (
    <div>
      <>
      <Navbar/>
       <GeminiChat />
      <Footer/>
      
     
      </>
    </div>
  );
};

export default ChatAIPage;
