import classNames from "classnames";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { PlanContext } from "../contexts/PlanContext";

function Summary({ currentStep, setCurrentStep }) {
  const { plan, selectedAddOns } = useContext(PlanContext);
  const [completed, setCompleted] = useState(false);

  const planName = plan?.name;
  const planDuration = plan?.pricing[0]?.duration;
  const planPrice = plan?.pricing[0]?.amount;

  // A FUNCTION TO SUM UP SELECTEDADDON ITEM PRICES
  const AddOnTotal = selectedAddOns.reduce(function (accumulator, { pricing }) {
    // console.log(accumulator);
    return accumulator + pricing[0]?.amount;
  }, 0);

  // A CALCULATION TO SUM UP SELECTEDADDON ITEM TOTAL & PLAN PRICE
  const Total = planPrice + AddOnTotal;

  return (
    <div
      className={classNames("", {
        hidden: currentStep !== 4 || currentStep < 4,
      })}
    >
      {/* START OF THE SUMMARY LIST */}
      <div className={classNames("bg-white lg:shadow-none lg:rounded-none shadow rounded-md lg:relative lg:top-0 lg:z-30 lg:py-0 px-6 xl:px-0 py-10 absolute top-28 left-1/2 -translate-x-1/2 md:max-w-[750px] w-full h-[550px]", {
          'hidden': completed == true
        })}>
       
          <div className="text-gray-400 tracking-widest flex flex-col space-y-2">
            <h1 className="text-blue-900 font-bold text-4xl md:text-5xl">
               Finishing up
            </h1>
            <p>
            Double-check everything looks OK before confirming.
            </p>
          </div>

          <div className="">
            <div className="bg-blue-50 rounded-md p-4 md:p-6 mt-10">
            <div className="text-blue-900 text-lg md:text-xl font-bold flex items-center justify-between  pb-6">
                  <div>
                    <h4 className="capitalize">{`${planName} (${planDuration})`}</h4>
                    <Button
                      onClick={() => setCurrentStep(currentStep - 2)}
                      variant="change"
                      text="change"
                    />
                  </div>
                  <p>{`$${planPrice}/${
                    planDuration == "yearly" ? "yr" : "mo"
                  }`}</p>
                </div>
                <hr />
                <div className="text-blue-900 tracking-wider font-semibold">
                  {selectedAddOns.length !== 0 ? 
                    selectedAddOns.map(({ name, pricing }) => (
                    <p
                      key={name}
                      className="flex items-center justify-between mt-2 md:mt-4"
                    >
                      <span className="text-gray-500 font-medium text-lg">
                        {name}
                      </span>
                      {pricing.map(({ duration, amount }) => (
                        <span key={amount}>{`+$${amount}/${
                          duration == "yearly" ? "yr" : "mo"
                        }`}</span>
                      ))}
                    </p>
                  )) : <p className="text-center capitalize tracking-widest mt-4">No selected add-on to display</p>}
                </div>
            </div>
            <p className="flex tracking-wider px-3 md:px-6 mt-10 md:text-xl text-gray-400 font-bold items-center justify-between">
              <span>{`Total (per ${
                planDuration == "yearly" ? "year" : "month"
              })`}</span>
              <span className="text-indigo-600 text-xl md:text-2xl">{`$${Total}/${
                planDuration == "yearly" ? "yr" : "mo"
              }`}</span>
            </p>
          </div>

          <div className="md:bottom-0 px-6 lg:px-0 bg-gray-50 -bottom-60 py-3 flex items-center justify-between absolute left-0 lg:bg-inherit right-0">
            <Button
              onClick={() => setCurrentStep(3)}
              variant="back"
            />
            <Button
              onClick={() => setCompleted(!completed)}
              variant="confirm"
              text="confirm"
            />
          </div>
        </div>
      {/* END OF THE SUMMARY LIST */}

      {/* START OF CONFIRMATION ALERT PAGE */}
      <div
        className={`flex flex-col lg:justify-center items-center lg:text-start bg-white lg:shadow-none lg:rounded-none shadow rounded-md lg:relative lg:top-0 lg:z-30 lg:py-0 px-6 xl:px-0 py-10 absolute top-28 left-1/2 -translate-x-1/2 md:max-w-[750px] w-full h-[550px] pt-12 md:pt-24 ${
          completed ? "" : "hidden"
        }`}
      >
        <img
          width={12}
          height={9}
          className="md:h-24 md:w-24 h-16 w-16 rounded-full bg-rose-400"
          src="/images/icon-thank-you.svg"
          alt="a checkmark icon"
        />
        <h1 className="text-blue-900 text-3xl md:text-4xl font-bold my-5 md:my-7">
          Thank you!
        </h1>
        <p className="text-gray-400 tarcking-widest text-center lg:text-start text-lg">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>
      {/* END OF CONFIRMATION ALERT PAGE */}
    </div>
  );
}

export default Summary;
