import React, { useEffect, useState } from 'react'
import ArkSuccessPage from '../components_new/onboarding_screens/ArkSuccessPage'
import AvatarSelectionPage from '../components_new/onboarding_screens/AvatarSelectionPage'
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername'
import RegisterNamePage from '../components_new/onboarding_screens/RegisterNamePage'
import SettingUpAccount from '../components_new/onboarding_screens/SettingUpAccount'
import SignUpArConnect from '../components_new/onboarding_screens/SignUpArConnect'
import SignUpNear from '../components_new/onboarding_screens/SignUpNear'
import SignUpPage from '../components_new/onboarding_screens/SignUpPage'
import VerifyWithArk from '../components_new/onboarding_screens/VerifyWithArk'

function Onboarding() {

  const [currentStep, setCurrentStep] = useState(0)
  const [arLabel, setArLabel] = useState('')

  useEffect(() => {
    setCurrentStep(1)
  
  }, [])
  

  return (
    <div className='font-sans items-center flex justify-center  '>
      {
        currentStep === 0 && (<SignUpPage setCurrentStep={setCurrentStep} />)
      }
      {
        currentStep === 1 && (<SignUpArConnect setCurrentStep={setCurrentStep} currentStep={currentStep}/>)
      }
      {
        currentStep === 2 && (<SignUpNear setCurrentStep={setCurrentStep} currentStep={currentStep}/>)
      }
      {
        currentStep === 3 && (<VerifyWithArk setCurrentStep={setCurrentStep} currentStep={currentStep}/>)
      }
      {
        currentStep === 4 && (<ArkSuccessPage setCurrentStep={setCurrentStep} currentStep={currentStep} /> ) 
      }
      {
        currentStep === 5 && ( <RegisterNamePage  setCurrentStep={setCurrentStep} currentStep={currentStep} setArLabel={setArLabel} arLabel={arLabel} /> ) 
      }
      {
        currentStep === 6 && ( <ConfirmUsername setCurrentStep={setCurrentStep}  currentStep={currentStep} arLabel={arLabel}/> ) 
      }
      {
        currentStep === 7 && (<SettingUpAccount /> )
      }

    </div>  
  )
}

export default Onboarding