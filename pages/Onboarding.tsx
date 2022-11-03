import React, { useEffect, useState } from 'react'
import AvatarSelectionPage from '../components_new/onboarding_screens/AvatarSelectionPage'
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername'
import RegisterNamePage from '../components_new/onboarding_screens/RegisterNamePage'
import SignUpPage from '../components_new/onboarding_screens/SignUpPage'

function Onboarding() {

  const [currentStep, setCurrentStep] = useState(0)
  

  useEffect(() => {
    setCurrentStep(3)
  }, [currentStep])
  


  return (
    <div className='font-sans px-10  '>
      {
        currentStep === 0 && (<SignUpPage setCurrentStep={setCurrentStep}/>)
      }
      {
        currentStep === 1 && ( <RegisterNamePage  setCurrentStep={setCurrentStep} currentStep={currentStep}/> ) 
      }
      {
        currentStep === 2 && ( <ConfirmUsername setCurrentStep={setCurrentStep}  currentStep={currentStep} /> ) 
      }
      {
        currentStep == 3 && ( <AvatarSelectionPage setCurrentStep={setCurrentStep}  currentStep={currentStep} /> )
      }
      
    </div>  
  )
}

export default Onboarding