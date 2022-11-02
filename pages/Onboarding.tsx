import React, { useState } from 'react'
import CustomConnectButton from '../components_new/buttons/ConnectAccount'
import ConnectAccount from '../components_new/buttons/ConnectAccount'
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername'
import RegisterNamePage from '../components_new/onboarding_screens/RegisterNamePage'
import SignUpPage from '../components_new/onboarding_screens/SignUpPage'

function Onboarding() {

  const [currentStep, setCurrentStep] = useState(0)
  const [invalidEVM, setInvalidEVM] = useState('')
  const [arLabel, setArLabel] = useState('');


  return (
    <div className='font-inter px-10'>
      {
        currentStep === 0 && (<SignUpPage setCurrentStep={setCurrentStep}/>)
      }
      {
        currentStep === 1 && ( <RegisterNamePage  setCurrentStep={setCurrentStep} currentStep={currentStep}/> ) 
      }
      {/* {
        currentStep === 2 && ( 
        <ConfirmUsername  /> ) 
      } */}

    </div>  
  )
}

export default Onboarding