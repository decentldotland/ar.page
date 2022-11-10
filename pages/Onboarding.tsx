import React, { useEffect, useState } from 'react'
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
  return (
    <div className='font-sans px-10 max-w-full. items-center w-screen '>
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
        currentStep == 3 && (<VerifyWithArk setCurrentStep={setCurrentStep} currentStep={currentStep}/>)
      }
      {
        currentStep === 4 && ( <RegisterNamePage  setCurrentStep={setCurrentStep} currentStep={currentStep} setArLabel={setArLabel} arLabel={arLabel} /> ) 
      }
      {
        currentStep === 5 && ( <ConfirmUsername setCurrentStep={setCurrentStep}  currentStep={currentStep} arLabel={arLabel}/> ) 
      }

      {/* Add Avatar */}
      {/* {
        currentStep == 6 && ( <AvatarSelectionPage setCurrentStep={setCurrentStep}  currentStep={currentStep} /> )
      } */}

      {
        currentStep === 6 && (<SettingUpAccount /> )
      }

    </div>  
  )
}

export default Onboarding