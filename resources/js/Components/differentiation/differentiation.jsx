import React from "react";
import Title from "../Title/Title";
import "./differentiation.css";
import { FaRegFilePdf } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "@inertiajs/react"; 

const Differentiation = ({ registrationSteps, admissionFile }) => {
  // لتغيير طريقة التمرير لأعلى بشكل صحيح في المتصفح
  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="D_container color">
      <Title
        title="تقديم طلب المفاضلة"
        parg="تعرف على كيفية تقديم طلب المفاضلة للجامعات و الشروط المطلوبة"
      />
      <div className="main">
        <div className="D_left_side">
          <div className="D_center">
            <div>
              <h1>معلومات هامة</h1>
            </div>
            <div className="D_step">
              <h3>
                دليل المفاضلة <FaRegFilePdf />
              </h3>
              <p>
                يمكنك تحميل بيانات المفاضلة الكامل الذي يحوي كافة الارشادات و
                الشروط
              </p>
              {/* رابط تحميل الملف من قاعدة البيانات */}
              <a href={admissionFile} download>
                تحميل الدليل
              </a>
            </div>
            <div className="D_step">
              <h3>
                دليل المفاضلة <CiCalendar />
              </h3>
              <p>
                يمكنك تحميل بيانات المفاضلة الكامل الذي يحوي كافة الارشادات و
                الشروط
              </p>
            </div>
            <div className="D_step">
              <h3>
                دليل المفاضلة <FaCheckCircle />
              </h3>
              <p>
                يمكنك تحميل بيانات المفاضلة الكامل الذي يحوي كافة الارشادات و
                الشروط
              </p>
            </div>
            <div className="yelow">
              <p>
                <span>ملاحظة هامة :</span>
                تأكد من مراجعة الشروط الخاصة بكل تخصص قبل اختياره, بعض التخصصات لها متطلبات خاصة مثل اختبار معين او شرط اخر.
              </p>
            </div>
          </div>
        </div>
        <div className="D_right_side">
          <div className="steps-container">
            {/* جلب الخطوات من قاعدة البيانات وحلقها */}
            {registrationSteps.map((step) => (
              <div key={step.id} className="step1">
                <div className="step-title">{step.step_name}</div>
                <div className="step-content">{step.description}</div>
                {/* إذا أردت عرض sub_step يمكن عمل تكرار هنا */}
              </div>
            ))}

                          {/* <Link
                        href={route('university-selection')}   // استخدام اسم الراوت من لارافيل
                        onClick={() => setMenuOpen(false)}
                        className={window.location.pathname === "/university-selection" ? "active" : ""}
                      >
                         <button className="submit-button">تقديم طلب المفاضلة</button>
                  
                      </Link> */}
<Link
  href={route('university.selection')}
  onClick={topScroll}
  className="no-underline-link"
>
  <button className="submit-button">  المزيد من التفاصيل </button>
</Link>



          </div>
        </div>
      </div>
    </div>
  );
};

export default Differentiation;
