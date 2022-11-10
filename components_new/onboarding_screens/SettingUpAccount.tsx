import { CircularProgress } from '@mui/material'
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function SettingUpAccount() {

    // after a timer, redirectr the user to the home page 
    const route = useRouter();
    const [time, setTimeOut] = useState(false)
    
    useEffect(() => {
      setTimeout(function () {
        setTimeOut(true); 
      }, 5000);
    }, []);


    useEffect(() => {
        if (time) route.push('/')
    }, [time])
    

    
  
  return (
    <div className='cursor-not-allowed items-center flex flex-col justify-center h-screen space-y-5'>
        <CircularProgress color="inherit" size={31}/>
        <h1 className='font-medium text-xl text-center text-[#3a3a3a]'>
            Creating your profile
        </h1>
    </div>
  )
}

export default SettingUpAccount