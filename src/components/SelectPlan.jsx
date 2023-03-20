import classNames from "classnames";
import React, { useContext, useState } from "react";
import { PlanContext } from "../contexts/PlanContext";
import Button from "./Button";

function SelectPlan({ currentStep, setCurrentStep }) {
  const { setPlan } = useContext(PlanContext);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [plans, setPlans] = useState([
    {
      id: "1",
      name: "arcade",
      icon: "/images/icon-arcade.svg",
      pricings: [
        { duration: "monthly", amount: 9 },
        { duration: "yearly", amount: 90 },
      ],
      active: false,
    },
    {
      id: "2",
      name: "advanced",
      icon: "/images/icon-advanced.svg",
      pricings: [
        { duration: "monthly", amount: 12 },
        { duration: "yearly", amount: 120 },
      ],
      active: false,
    },
    {
      id: "3",
      name: "pro",
      icon: "/images/icon-pro.svg",
      pricings: [
        { duration: "monthly", amount: 15 },
        { duration: "yearly", amount: 150 },
      ],
      active: false,
    },
  ]);

  //function to handle toggle switch
  const handleClick = () => {
    setChecked(!checked);
  };

  //function to select an active plan
  const handleChoosePlan = (id) => {
    const updatedPlans = plans.map((plan) => {
      if (plan.id === id) {
        return { ...plan, active: !plan.active };
      } else {
        return { ...plan, active: false };
      }
    });
    setPlans(updatedPlans);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    const plan = plans.filter((item) => item.active === true);

    const selectedCourse = {
      name: plan[0]?.name,
      pricing: plan[0]?.pricings.filter((item) => {
        if (checked === true) {
          return item.duration === "yearly";
        } else {
          return item.duration === "monthly";
        }
      }),
    };

    if (plan == "") {
      return setError("Select a plan!");
    } else {
      setError("");
    }
    setPlan(selectedCourse);
    // console.log(selectedCourse)
    setCurrentStep(3);
  };

  return (
    <div
      className={classNames("w-full tracking-widest h-full", {
        hidden: currentStep !== 2,
      })}
    >
      <div className="bg-white lg:shadow-none lg:rounded-none shadow rounded-md lg:relative lg:top-0 lg:z-30 lg:py-0 px-6 xl:px-0 py-10 absolute top-28 left-1/2 -translate-x-1/2 md:max-w-[750px] w-full h-[550px]">
      <div className="text-gray-400 tracking-widest flex flex-col space-y-2">
      <h1 className="text-blue-900 font-bold text-3xl md:text-5xl">
            Select your plan
          </h1>
          <p>
            You have the option of monthly or yearly billing.
          </p>
          </div>

        <p className="text-center text-xl font-semibold mt-4 text-red-500">
          {error}
        </p>

        {/* PLANS SECTION FOR SELCTION START */}
        <div className={` items-center justify-between mb-6 md:flex`}>
          {plans.map(({ id, name, icon, pricings, active }) => (
            <div
              key={name}
              className={classNames(
                "md:w-48 w-full flex items-center md:items-start cursor-pointer md:flex-col space-x-3 md:space-x-0 space-y-0 md:space-y-3 rounded-lg border-2 py-2 even:my-7 pl-4 lg:p-4",
                {
                  "bg-indigo-50 border-indigo-400": active == true,
                  "border-gray-300 hover:border-indigo-400": active !== true,
                }
              )}
              onClick={() => handleChoosePlan(id, active)}
            >
              <div>
                <img width={40} height={40} className="w-12" src={`${icon}`} />
              </div>
              <div className="text-blue-900">
                <h5 className="capitalize font-bold tracking-wider text-xl">
                  {name}
                </h5>
                {pricings.map(({ duration, amount }) =>
                  checked ? (
                    <p
                      key={duration}
                      className={classNames('text-lg tracking-wider font-medium', {
                        'text-gray-400': active !== true,
                        'text-gray-600': active == true
                      })}
                    >
                      {duration == "yearly" ? `$${amount}/yr` : ""}
                    </p>
                  ) : (
                    <p
                      key={duration}
                      className={classNames('text-lg tracking-wider font-medium', {
                        'text-gray-400': active !== true,
                        'text-gray-600': active == true
                      })}
                    >
                      {duration == "monthly" ? `$${amount}/mo` : ""}
                    </p>
                  )
                )}
                <p
                  className={`text-base font-medium ${checked ? "" : "hidden"}`}
                >
                  2 months free
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* PLANS SECTION FOR SELCTION END */}

        {/* DURATION TOGGLE SWITCH START */}
        <div className="font-semibold mt-10 md:mt-0 text-gray-400 text-lg md:text-xl bg-blue-50 flex gap-4 items-center justify-center rounded py-2.5">
          <p className={`${checked ? "" : "text-blue-900"}`}>Monthly</p>
          <div className="mt-2">
            <label
              htmlFor="toggleSwitch"
              className="bg-blue-900 relative w-16 md:w-14 h-7 inline-block rounded-full"
            >
              <input
                name="toggleSwitch"
                type="checkbox"
                checked={checked}
                readOnly
                onClick={handleClick}
                id="toggleSwitch"
                className="peer sr-only"
              />
              <span className="lg:inline-block hidden w-5 h-5 absolute top-1 left-1 bg-white rounded-full lg:peer-checked:left-8 cursor-pointer"></span>
              <span
                onClick={handleClick}
                className="inline-block lg:hidden w-5 h-5 absolute top-1 left-1 bg-white rounded-full peer-checked:left-9 cursor-pointer"
              ></span>
            </label>
          </div>
          <p className={`${checked ? "text-blue-900" : ""}`}>Yearly</p>
        </div>

        <div className="md:bottom-0 px-6 lg:px-0 bg-gray-50 -bottom-32 py-3 flex items-center justify-between absolute left-0 lg:bg-inherit right-0">
        <Button
          variant="back"
          onClick={() => setCurrentStep(currentStep - 1)}
        />

        <Button variant="next" onClick={onsubmit} text="next step" />
      </div>
      </div>
      
    </div>
  );
}

export default SelectPlan;
