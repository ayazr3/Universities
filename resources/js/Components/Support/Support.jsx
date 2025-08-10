import React from "react";
import Title from "../Title/Title";
import { FaVideo } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiBook3Fill } from "react-icons/ri";
import "./Support.css";
import { Link } from "@inertiajs/react";

const Support = () => {
  return (
    <div className="S_Container">
      <Title
        title="التوجيه والدعم"
        parg="تعرف على الموارد  والنصائح التي تساعدك في اتخاذ القرار المناسب ل مستقبلك"
      />
      <div className="S_Cards">
        <div className="S_card">
          <div className="icon">
            <BsFillPeopleFill />
          </div>
          <h2>المقالات</h2>
          <p>
            اكتشف مجموعة متنوعة من المقالات التقنية والتعليمية المكتوبة بعناية لإثراء معرفتك
            {/* مجموعة من الأدلة المتخصصة بكل ما يتعلق بالاختبار التخصصي الجامعي
            والتقديم للجامعات مكتوبة من قبل الخبراء{" "} */}
          </p>
          <div className="S_btn">
                     <Link
            href={route('guidance.indexUser')}   // استخدام اسم الراوت من لارافيل
            onClick={() => setMenuOpen(false)}
            className={window.location.pathname === "/guidance" ? "active" : ""}
          >
             <button className="btn S_btn">تصفح المقالات </button>
      
          </Link>
          </div>
        </div>
        <div className="S_card">
          <div className="icon">
            <FaVideo />
          </div>
          <h2>مقاطع الفيديو التعليمية</h2>
          <p>
            شاهد مجموعة مختارة من أفضل مقاطع الفيديو التعليمية في مجال التكنولوجيا وتصميم المواقع.
          </p>
          <div className="S_btn">
                 <Link
            href={route('guidance.indexUser')}   // استخدام اسم الراوت من لارافيل
            onClick={() => setMenuOpen(false)}
            className={window.location.pathname === "/guidance" ? "active" : ""}
          >
             <button className="btn S_btn">تصفح الفيديوهات</button>
      
          </Link>
            {/* <button className="btn S_btn">تصفح الفيديوهات</button> */}
          </div>
        </div>
        <div className="S_card">
          <div className="icon">
            <RiBook3Fill />
          </div>
          <h2>الكتب المُوصى بها</h2>
          <p>مجموعة مختارة من أفضل الكتب التقنية التي ستساعدك في تطوير مهاراتك ومعرفتك
            {/* مجموعة من الأدلة المتخصصة بكل ما يتعلق بالاختبار التخصصي الجامعي
            والتقديم للجامعات مكتوبة من قبل الخبراء{" "} */}
          </p>
          <div className="S_btn">
                       <Link
            href={route('guidance.indexUser')}   // استخدام اسم الراوت من لارافيل
            onClick={() => setMenuOpen(false)}
            className={window.location.pathname === "/guidance" ? "active" : ""}
          >
             <button className="btn S_btn">تصفح الكتب</button>
      
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
