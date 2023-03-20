import classNames from "classnames";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { PlanContext } from "../contexts/PlanContext";
import Button from "./Button";
import { useEffect } from "react";


function AddOns({ currentStep, setCurrentStep, GoBack}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { plan, setSelectedAddOns } = useContext(PlanContext);
  const planDuration = plan?.pricing[0]?.duration
  const [addOns, setAddOns] = useState(
    [
      {
        name: "Online service",
        desc: "access to multiplayer games",
        pricings: [
          { duration: "monthly", amount: 1 },
          { duration: "yearly", amount: 10 },
        ],
        checked: false
      },
      {
        name: "Larger storage",
        desc: "extra 1TB of cloud save",
        pricings: [
          { duration: "monthly", amount: 2 },
          { duration: "yearly", amount: 20 },
        ],
        checked:false
      },
      {
        name: "Customizable profile",
        desc: "custom theme on your profile",
        pricings: [
          { duration: "monthly", amount: 2 },
          { duration: "yearly", amount: 20 },
        ],
        checked: false
      },
    ]
  );

  // const [checkedState, setCheckedState] = useState(
  //   new Array(addOns.length).fill(false)
  // );

  const handleChange = (position) => {
    const updatedAddOns = addOns.map((addOn, index) => {
       if(index === position){
        return {...addOn, checked: !addOn.checked}
       }
       return addOn
    });
    //  console.log(updatedAddOns)
    setAddOns(updatedAddOns)
  };

  const onsubmit = (data) => {
    console.log(data);
    const choosenAddOns = addOns.filter((item) => item.checked === true )

    setSelectedAddOns(choosenAddOns.map(({name, pricings}) => ({
      name: name,
      pricing: pricings.filter(({duration}) => duration == planDuration)
    })))
    return setCurrentStep(4);
  };

  
  return (
    <div
      className={classNames("w-full max-h-screen", {
        hidden: currentStep !== 3,
      })}
    >
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="bg-white lg:shadow-none lg:rounded-none shadow rounded-md lg:relative lg:top-0 lg:z-30 lg:py-0 px-6 xl:px-0 py-10 absolute top-28 left-1/2 -translate-x-1/2 md:max-w-[750px] w-full h-[500px]">
         
          <div className="text-gray-400 tracking-widest flex flex-col space-y-2">
            <h1 className="text-blue-900 font-bold text-4xl md:text-5xl">
            Pick add-ons
            </h1>
            <p>
               Add-ons help enhance gaming experience.
            </p>
          </div>

          <div className="md:mt-8 mt-6">
            <p className="text-red-500 font-medium mb-2 text-right">
              {errors?.choice?.message}
            </p>
            <div className="flex flex-col space-y-5 lg:space-y-6">
              {addOns.map(({ name, desc, pricings, checked}, index) => (
                <div
                  key={name}
                  className={classNames('flex items-center border-2 lg:px-5 px-2 py-1 h-20 rounded-md', {
                  "bg-indigo-50 border-indigo-400" : checked == true,
                  "border-gray-300 hover:border-indigo-400": checked !== true                 
                  })}
                >
                  <Input
                    type="checkbox"
                    value={name}
                    name={name}
                    {...register("addOns")}
                    checked={checked}
                    onChange={() => handleChange(index)}
                    id={`checkbox-${index}`}
                  />
                  <div className="flex ml-3 md:ml-6 justify-between w-full items-center">
                    <div>
                      <label
                        htmlFor={`checkbox-${index}`}
                        className="font-semibold items-center justify-between w-full text-blue-900 tracking-wide md:text-xl"
                      >
                        {name}
                      </label>
                      <p className={classNames("text-sm md:text-base tracking-widest", {
                        'text-gray-600': checked == true,
                         'text-gray-400': checked !== true
                      })}>
                        {desc}
                      </p>
                    </div>
                    {
                      pricings.map(({duration, amount}) => (
                        <p key={duration} className={classNames('text-indigo-500 font-semibold text-lg',{
                          'hidden' : duration !== planDuration
                        })}>{`+$${amount}/${duration === 'yearly'? 'yr': 'mo'}`}</p>
                      ))
                    }                 
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:-bottom-8 px-6 lg:px-0 bg-gray-50 -bottom-60 py-3 flex items-center justify-between absolute left-0 lg:bg-inherit right-0">
        <Button
          type='button'
          variant="back"
          onClick={() => setCurrentStep(currentStep - 1)}
        />
          <Button variant="next" text="next step" />
        </div>
        </div>        
      </form>
    </div>
  );
}

export default AddOns;
