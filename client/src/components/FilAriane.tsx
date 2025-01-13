import type React from "react";
import { useNavigate } from "react-router-dom";
import car from "../assets/images/roadster.png";
import volant from "../assets/images/sateering.png";
import param from "../assets/images/settings.png";
import men from "../assets/images/user.png";
import "./FilAriane.css";

const steps: (keyof typeof stepTexts)[] = [
  "Matricule",
  "Habits",
  "Options",
  "Results",
];

const stepTexts = {
  Matricule: "Véhicule",
  Habits: "Habitudes",
  Options: "Options",
  Results: "Résultats",
};

const stepRoutes = {
  Matricule: "/",
  Habits: "/habits",
  Options: "/options",
  Results: "/results",
};

interface FilArianeProps {
  currentStep: "Matricule" | "Habits" | "Options" | "Results";
  progress: { [key in keyof typeof stepRoutes]: boolean };
}

const FilAriane: React.FC<FilArianeProps> = ({ currentStep, progress }) => {
  const navigate = useNavigate();

  const handleNavigation = (step: keyof typeof stepRoutes) => {
    if (progress[step]) {
      navigate(stepRoutes[step]);
    }
  };

  return (
    <div className="container-box">
      <div className="step-text-container">
        {steps.map((step) => (
          <span
            key={step}
            className={`step-text ${currentStep === step ? "active-step-text" : ""}`}
          >
            {stepTexts[step]}
          </span>
        ))}
      </div>
      <div className="line-wrapper">
        <div className="line-container">
          <div
            className="progress-line"
            style={{
              width: `${(steps.indexOf(currentStep) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
        <ul className="fil-ariane">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`fil-ariane__item ${
                steps.indexOf(currentStep) >= index ? "active" : ""
              } ${currentStep === step ? "current" : ""}`}
              onClick={() => handleNavigation(step)}
              onKeyUp={(e) => e.key === "Enter" && handleNavigation(step)}
              tabIndex={progress[step] ? 0 : -1}
              style={{ cursor: progress[step] ? "pointer" : "not-allowed" }}
            >
              <span className="fil-ariane__inner">
                <img
                  src={
                    step === "Matricule"
                      ? car
                      : step === "Habits"
                        ? volant
                        : step === "Options"
                          ? param
                          : men
                  }
                  alt={step}
                  className="icon"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilAriane;
