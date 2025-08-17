import React from "react";
import "./RegistrationSteps.css";

const RegistrationSteps = ({ steps }) => (
  <div className="reg-container">
    <h2 className="reg-title">خطوات التسجيل</h2>
    <p className="reg-desc">
      اتبع هذه الخطوات البسيطة لضمان تقديم طلبك بشكل صحيح ومتكامل
    </p>
    <div className="reg-stepss">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          {idx !== 0 && (
            <div
              className={`reg-arrow ${
                idx % 2 === 0 ? "reg-arrow-left" : "reg-arrow-right"
              } animate-arrow`}
            >
              {idx % 2 === 0 ? "←" : "→"}
            </div>
          )}
          <div className={`reg-step reg-step-${idx + 1} animate-in`}>
            <div className="reg-icon">📝</div>
            <div>
              <h3>{step.step_name}</h3>
              <ul>
                {JSON.parse(step.sub_step).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default RegistrationSteps;
