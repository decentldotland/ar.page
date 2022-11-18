import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { nearWalletConnected, userOnboardingState } from '../atoms'
import ArkSuccessPage from '../components_new/onboarding_screens/ArkSuccessPage'
import AvatarSelectionPage from '../components_new/onboarding_screens/AvatarSelectionPage'
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername'
import ConnectAccounts from '../components_new/onboarding_screens/ConnectAccounts'
import EditProfilePage from '../components_new/onboarding_screens/EditProfilePage'
import OptionEditProfile from '../components_new/onboarding_screens/OptionEditProfile'
import RegisterNamePage from '../components_new/onboarding_screens/RegisterNamePage'
import SettingUpAccount from '../components_new/onboarding_screens/SettingUpAccount'
import SignUpArConnect from '../components_new/onboarding_screens/SignUpArConnect'
import SignUpNear from '../components_new/onboarding_screens/SignUpNear'
import VerifyWithArk from '../components_new/onboarding_screens/VerifyWithArk'
import { useWalletSelector } from '../src/contexts/WalletSelectorContext'

function Onboarding() {

  const [currentStep, setCurrentStep] = useState(0);
  const [arLabel, setArLabel] = useState('');

  const userCurrentStep = useRecoilValue(userOnboardingState);
  
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  

  
  /**
   * 1. Checks if the user has signed in with their NEAR wallet 
   * 2. save currentStep and triggered state in local storage
   * 3. Once the user's wallet is logged in, user redirects back to the page, reload the state 
   *    and resume user progress 
   */
  const isNearWalletConnected = useRecoilValue(nearWalletConnected);
  const { accountId } = useWalletSelector();
  
  useEffect(() => {
    
    let num =  localStorage.getItem('currentStep')
    let state = localStorage.getItem('triggered')
    console.log(num)
    if (state === 'false' && accountId && +num! === 2 ) {
      setUserOnboarding(+num!)
      localStorage.setItem('triggered', 'true')
    } 
    
    /**
     * A small fix to when the user disconnects their Near wallet 
     * and they try to reconnect a new wallet, it redirectsthem to step 0 
     * 
     * ie if (currStep(0) != localStorage(2) and nearWallet is reconnected ) 
     *        => transfer the user to the near sign up page
     */
    if(userOnboardingStep !== +num! && !accountId) setUserOnboarding(+num!)   
  }, [isNearWalletConnected, userCurrentStep])
  
  useEffect(() => {
    setUserOnboarding(5)

  }, [])
  

  return (
    <div className='font-sans items-center flex justify-center'>
      {/* {
        userCurrentStep === 0 && (<SignUpPage  />)
      } */}
      {
        userCurrentStep === 0 && (<SignUpArConnect />)
      }
      {
        userCurrentStep === 1 && (<ConnectAccounts />)

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