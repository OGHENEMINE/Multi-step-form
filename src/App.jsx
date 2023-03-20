import React, { useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import PersonalInfo from "./components/PersonalInfo";
import Summary from "./components/Summary";
import SelectPlan from "./components/SelectPlan";
import AddOns from "./components/AddOns";
import { PlanProvider } from "./contexts/PlanContext";

function GeneralLayout() {
  const [currentStep, setCurrentStep] = useState(1);

 
  return (
    <PlanProvider>
      <div className="max-w-screen h-screen overflow-hidden rounded-lg font-ubuntu">
        <div className="lg:flex">
          <Sidebar currentStep={currentStep} />
          <div className="lg:block hidden mx-auto w-full mt-12 overflow-hidden px-10 xl:px-0 mb-3 rounded-md">
            <PersonalInfo
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <SelectPlan
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <AddOns
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <Summary
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
          <div className="lg:hidden">
            <PersonalInfo
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <SelectPlan
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <AddOns
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <Summary
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </div>
    </PlanProvider>
  );
}

export default GeneralLayout;
