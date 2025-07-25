import React from "react";
import "./RegistrationSteps.css";

const steps = [
  {
    title: "تحضير الوثائق",
    icon: "📄",
    details: [
      "جمع جميع الوثائق المطلوبة وتحضيرها للرفع",
      "شهادة الثانوية العامة (الأصل والصورة)",
      "بطاقة شخصية/إقامة سارية",
      "رفع الوثائق المطلوبة",
      "وثيقة إثبات السكن"
    ]
  },
  {
    title: "ملء الطلب الإلكتروني",
    icon: "📝",
    details: [
      "تعبئة جميع البيانات المطلوبة في النموذج الإلكتروني",
      "البيانات الشخصية",
      "معلومات الاتصال",
      "اختيار التخصصات (أكثر من تخصص)",
      "رفع الوثائق المطلوبة",
      "مراجعة الطلب قبل الإرسال"
    ]
  },
  {
    title: "دفع الرسوم",
    icon: "💳",
    details: [
      "دفع رسوم التقديم عبر القنوات المتاحة",
      "رسوم التقديم / بالريال",
      "الدفع الإلكتروني (مدى، الفيزا)",
      "حفظ إيصال الدفع",
      "تأكيد استلام الرسوم"
    ]
  },
  {
    title: "التحقق والمراجعة",
    icon: "👥",
    details: [
      "مراجعة الطلب من قبل لجنة القبول",
      "مراجعة صحة الوثائق",
      "مراجعة صحة البيانات",
      "إرسال إشعار بالقبول أو الرفض",
      "تأكيد استلام القرار"
    ]
  }
];

const RegistrationSteps = () => (
  <div className="reg-container">
    <h2 className="reg-title">خطوات التسجيل</h2>
    <p className="reg-desc">
      اتبع هذه الخطوات البسيطة لضمان تقديم طلبك بشكل صحيح ومتكامل
    </p>
    <div className="reg-steps">
      <div className="reg-step reg-step-1 animate-in">
        <div className="reg-icon">{steps[0].icon}</div>
        <div>
          <h3>{steps[0].title}</h3>
          <ul>
            {steps[0].details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="reg-arrow reg-arrow-right animate-arrow">→</div>
      <div className="reg-step reg-step-2 animate-in">
        <div className="reg-icon">{steps[1].icon}</div>
        <div>
          <h3>{steps[1].title}</h3>
          <ul>
            {steps[1].details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="reg-arrow reg-arrow-down animate-arrow">↓</div>
      <div className="reg-step reg-step-3 animate-in">
        <div className="reg-icon">{steps[2].icon}</div>
        <div>
          <h3>{steps[2].title}</h3>
          <ul>
            {steps[2].details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="reg-arrow reg-arrow-left animate-arrow">←</div>
      <div className="reg-step reg-step-4 animate-in">
        <div className="reg-icon">{steps[3].icon}</div>
        <div>
          <h3>{steps[3].title}</h3>
          <ul>
            {steps[3].details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default RegistrationSteps;
