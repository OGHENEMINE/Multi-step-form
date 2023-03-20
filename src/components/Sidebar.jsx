import classNames from "classnames";
import React from "react";

function Sidebar({ currentStep }) {
  // console.log(path)

  //NAVLIST DATA MAPPED ON THE SIDEBAR
  const navList = ["your info", "select plan", "add-ons", "summary"];

  return (
    <>
      <div className="bg-[url('/images/bg-sidebar-mobile.svg')] lg:bg-[url('/images/bg-sidebar-desktop.svg')] lg:ml-2 lg:my-2 h-48 lg:h-[610px] shadow lg:shadow-lg lg:rounded-lg bg-center bg-cover w-full lg:w-[30%]">
        <div className="flex justify-center items-center gap-3 lg:gap-4 pt-6 md:pt-10 lg:block">
          {navList.map((item, index) => (
            <div
              key={index}
              className="text-white md:mb-7 flex lg:pl-5 items-start gap-4"
            >
              <p
                className={classNames(
                  "border text-xl rounded-full px-5 py-3 lg:py-2 lg:px-4 text-center font-bold",
                  {
                    "bg-blue-200 border-transparent text-blue-900":
                      index + 1 === currentStep,
                  }
                )}
              >
                {index + 1}
              </p>
              <div className="hidden lg:block">
                <p className="font-semibold text-base tracking-wider text-gray-400">
                  STEP {index + 1}
                </p>
                <p className="uppercase font-bold tracking-widest">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
