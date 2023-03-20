import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer() {
  const location = useLocation();
  const navigate = useNavigate()
  const path = location.pathname

  //FUNCTION FOR THE GO BACK BUTTON
  const goBack = () => navigate(-1)

  return (
    <div className='absolute md:hidden -bottom-44 left-0 right-0 px-6 py-4 bg-gray-50'>
      <footer>
        <div className={`flex items-center w-full justify-between`}>
            <button onClick={goBack} className={`hover:text-blue-900 text-lg text-gray-400 font-bold ${path === '/'? 'invisible' : ''}`}>Go Back</button>
            <button className={`bg-blue-900 py-2 px-4 rounded text-white tracking-widest ${path === '/summary'? 'hidden' : ''}`}>Next Step</button>
            <button className={`bg-indigo-600 hover:bg-indigo-400 py-2 px-6 rounded text-white tracking-widest ${path === '/summary'? '' : 'hidden'}`}>Confirm</button>
        </div>
      </footer>
    </div>
  )
}

export default Footer