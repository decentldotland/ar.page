import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userOnboardingState } from '../atoms'
import ArkSuccessPage from '../components_new/onboarding_screens/ArkSuccessPage'
import AvatarSelectionPage from '../components_new/onboarding_screens/AvatarSelectionPage'
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername'
import EditProfilePage from '../components_new/onboarding_screens/EditProfilePage'
import OptionEditProfile from '../components_new/onboarding_screens/OptionEditProfile'
import RegisterNamePage from '../components_new/onboarding_screens/RegisterNamePage'
import SettingUpAccount from '../components_new/onboarding_screens/SettingUpAccount'
import SignUpArConnect from '../components_new/onboarding_screens/SignUpArConnect'
import SignUpNear from '../components_new/onboarding_screens/SignUpNear'
import SignUpPage from '../components_new/onboarding_screens/SignUpPage'
import VerifyWithArk from '../components_new/onboarding_screens/VerifyWithArk'

function Onboarding() {

  const [currentStep, setCurrentStep] = useState(0)
  const [arLabel, setArLabel] = useState('')

  const userCurrentStep = useRecoilValue(userOnboardingState)
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

  useEffect(() => {
    setUserOnboarding(0)
  
  }, [])
  

  return (
    <div className='font-sans items-center flex justify-center'>
      {
        userCurrentStep === 0 && (<SignUpPage  />)
      }
      {
        userCurrentStep === 1 && (<SignUpArConnect />)
      }
      {
        userCurrentStep === 2 && (<SignUpNear />)
      }
      {
        userCurrentStep === 3 && (<VerifyWithArk />)
      }
      {
        userCurrentStep === 4 && (<ArkSuccessPage  /> ) 
      }
      {
        userCurrentStep === 5 && ( <RegisterNamePage setArLabel={setArLabel} arLabel={arLabel} /> ) 
      }
      {
        userCurrentStep === 6 && ( <ConfirmUsername  arLabel={arLabel}/> ) 
      }
      {
        userCurrentStep === 7 && (<AvatarSelectionPage  />)
      }
      {
        userCurrentStep === 8 && (<OptionEditProfile /> )
      }
      {
        userCurrentStep === 9 && (<EditProfilePage /> )
      }
      {
        userCurrentStep === 10 && (<SettingUpAccount /> )
      }

    </div>  
  )
}

export default Onboarding