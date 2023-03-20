import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import CountryList, { getList } from "country-list-with-dial-code-and-flag";

function PersonalInfo({ currentStep, setCurrentStep }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
  });
  const [countryError, setCountryError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    // if (form.country === '') {
    //   return setCountryError("select a country");
    // }
    setCurrentStep(2);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

   return (
    <div
      className={classNames("w-full h-full", {
        hidden: currentStep !== 1,
      })}
    >
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <div className="bg-white lg:shadow-none lg:rounded-none shadow rounded-md lg:relative lg:top-0 lg:z-30 lg:py-0 px-6 xl:px-0 py-10 absolute top-28 left-1/2 -translate-x-1/2 md:max-w-[750px] w-full lg:h-[520px]">
          <div className="text-gray-400 tracking-widest flex flex-col space-y-2">
            <h1 className="text-blue-900 font-bold text-4xl md:text-5xl">
              Personal info
            </h1>
            <p>Please provide your name, email address and phone number.</p>
          </div>
          <div className="md:mt-10 mt-5 flex flex-col space-y-6">
            <Input
              placeholder="e.g. Stephen King"
              id="name"
              label="Name"
              type="text"
              name="name"
              {...register("name", {
                required: "This field is required!",
                maxLength: {
                  value: 200,
                  message: "name field cannot exceed 200 characters",
                },
              })}
              error={errors?.name?.message ?? ""}
              value={form.name}
              onChange={handleChange}
            />
            <Input
              placeholder="e.g. stephenking@lorem.com"
              id="email"
              label="Email"
              type="email"
              name="email"
              {...register("email", {
                required: "This field is required!",
                maxLength: {
                  value: 200,
                  message: "Email field cannot exceed 200 characters",
                },
                pattern: {
                  value: /^.+@[^\.].*\.[a-z]{2,}$/,
                  message: "Email is invalid!",
                },
              })}
              error={errors?.email?.message ?? ""}
              value={form.email}
              onChange={handleChange}
            />
            <Input
              placeholder='e.g. +1 234 567 890'
              label="Phone Number"
              type="tel"
              name="phone"
              {...register("phone", {
                required: "This field is required!",
              })}
              error={errors?.phone?.message?? ''}
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="px-6 lg:px-0 bg-gray-50 md:-bottom-12 -bottom-32 py-3 flex items-center justify-end absolute left-0 lg:bg-inherit right-0">
            <Button variant="next" text="next step" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
