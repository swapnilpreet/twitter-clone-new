import React from 'react'
import icon from './verified.png'
const VerifiedError = () => {
  return (
    <div className=''>
        <div className='text-center'>
            <img src={icon} alt="" className='h-40 mt-5 m-auto'/>
            <h1 className='text-2xl font-bold mt-5'>Your account has already been verified</h1>
            <p className='mt-1 font-thin text-gray-500'>and as such, you are not eligible to apply multiple times.</p>
        </div>
    </div>
  )
}

export default VerifiedError;