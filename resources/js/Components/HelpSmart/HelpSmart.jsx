import React from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsArrowRightShort } from 'react-icons/bs';

import "./HelpSmart.css";
import { Link } from "@inertiajs/react";  // تعديل الاستيراد

const HelpSmart = () => {
  const topScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="HelpSmart">
      <div className="S_leftSide">
        <h1>مساعدك الشخصي لاختيار التخصص</h1>
        <h4>
          يمكنك التحدث مع المساعد لمساعدتك في اختيار التخصص المثالي بناءً على
          اهتماماتك، درجاتك، ورغباتك <br />. نوفر لك إجابات مخصصة وإجابة كافة
          استفساراتك عن التخصصات الجامعية.
        </h4>
        <div>
          <div className="step">
            <span>1</span>
            <h3>أخبر المساعد عن اهتماماتك والمواد التي تبرع بها</h3>
          </div>
          <div className="step">
            <span>2</span>
            <h3>احصل على اقتراحات مخصصة للتخصصات المناسبة لك</h3>
          </div>
          <div className="step">
            <span>3</span>
            <h3>اسأل عن تفاصيل التخصصات واستفسر أكثر</h3>
          </div>
        </div>
              <Link
                  href={route('chat.ai')}   
                  onClick={() => setMenuOpen(false)}
                  className={window.location.pathname === "/chat-ai" ? "active" : ""}
                > <button >
            تحدث مع المساعد الان <BsArrowRightShort size={20} />
          </button>
                
                </Link>
        
      </div>
      <div className="S_rightSide">
        <div className="S_container">
          <div className="head">
            <IoChatbubbleOutline />
            <h4>المساعد الذكي</h4>
          </div>
          <div className="container_Text">
            <div>
              <p> مرحبا,انا مساعدك الشخصي ما هي مادتك المفضلة</p>
            </div>
            <div className="center">
              <p> مرحبا,انا مساعدك الشخصي ما هي مادتك المفضلة</p>
            </div>
            <div>
              <p> مرحبا,انا مساعدك الشخصي ما هي مادتك المفضلة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSmart;
