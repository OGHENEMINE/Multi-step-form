import classNames from "classnames";
import React from "react";

function Input({ label, id, type, error, ...rest }, ref) {
  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor={id} className="text-blue-900 tracking-wider font-medium md:text-xl">
          {label}
        </label>
        <p aria-live="polite" className="inline-block text-red-500 font-medium text-sm md:text-base">
          {error}
        </p>
      </div>
      {type !== 'checkbox' ? (
        <input
          className={classNames(
            "border-2 text-blue-900  font-medium mt-1 w-full px-5 py-3 rounded-lg outline-none valid:border-indigo-400 hover:border-indigo-400",
            {
              "border-red-500": error !== "",
            }
          )}
          required
          type={type}
          {...rest}
          ref={ref}
          id={id}
          autoComplete='true'
        />
      ) : (
        <input className="w-4 lg:w-3 h-4 lg:h-3" type={type} {...rest} ref={ref} />
      )}
    </div>
  );
}

export default React.forwardRef(Input);
