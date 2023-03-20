import classNames from 'classnames'
import React from 'react'

function Button({variant, text, ...rest}) {
  return (
    <>
        <button 
        className={classNames('outline-none tracking-widest shadow text-lg capitalize py-2 px-3', {
        'rounded-md hover:bg-blue-800 bg-blue-900 text-white text-center': variant === 'next',
        'hover:text-blue-900 font-bold tracking-wider md:text-xl text-gray-400 text-start px-0 shadow-none': variant === 'back',
        'bg-indigo-600 rounded-md hover:bg-indigo-400 text-white': variant === 'confirm',
        'text-gray-400 py-0 font-semibold underline hover:text-indigo-400 shadow-none px-0 tracking-tight': variant === 'change'
    })}
    {...rest}>{text ?? 'go back'}</button>
    </>
  )
}

export default Button