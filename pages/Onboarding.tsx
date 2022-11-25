import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { nearWalletConnected, userOnboardingState } from '../atoms'
import ArkSuccessPage from '../components_new/onboarding_screens/ArkSuccessPage'
import AvatarSelectionPage from '../components_new/onboarding_screens/AvatarSelectionPage'
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername'
import ConnectAccounts from '../components_new/onboarding_screens/ConnectAccounts'
import ConnectAdditionalAccounts from '../components_new/onboarding_screens/ConnectAdditionalAccounts'
import EditProfilePage from '../components_new/onboarding_screens/EditProfilePage'
import OptionEditProfile from '../components_new/onboarding_screens/OptionEditProfile'
import RegisterNamePage from '../components_new/onboarding_screens/RegisterNamePage'
import SettingUpAccount from '../components_new/onboarding_screens/LoadingScreen'
import SignUpArConnect from '../components_new/onboarding_screens/SignUpArConnect'
import SignUpNear from '../components_new/onboarding_screens/SignUpNear'
import VerifyWithArk from '../components_new/onboarding_screens/VerifyWithArk'
import { useWalletSelector } from '../src/contexts/WalletSelectorContext'
import LoadingScreen from '../components_new/onboarding_screens/LoadingScreen'
import DIDList from '../components_new/onboarding_screens/DIDList'
import { useAns } from 'ans-for-all'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { Res } from '../src/types'
import { GenericLabel, getDefaultLabels } from '../components_new/onboarding_screens/DIDLabels'
import { RiContactsBookLine } from 'react-icons/ri'


function Onboarding() {

  const [currentStep, setCurrentStep] = useState(0);
  const [arLabel, setArLabel] = useState('');

  const userCurrentStep = useRecoilValue(userOnboardingState);
  
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const {walletConnected} = useAns()

  // Network Selector 
  const [selectedNetwork, setSelectedNetwork] = useState(null)




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
    // localStorage.setItem('triggered', 'true')
    /**
     * A small fix to when the user disconnects their Near wallet 
     * and they try to reconnect a new wallet, it redirectsthem to step 0 
     * 
     * ie if (currStep(0) != localStorage(2) and nearWallet is reconnected ) 
     *        => transfer the user to the near sign up page
     */
    // if(userCurrentStep.toString() !== num && accountId && isNearWalletConnected) setUserOnboarding(+num!)   
  }, [isNearWalletConnected, userCurrentStep])
  
  // useEffect(() => {
  //   setUserOnboarding(11)

  // }, [])
  const [loading, setLoading] = useState<boolean>(true);
  const [arkProfile, setArkProfile] = useState<Res | undefined>();
  // const {address} = useAns()
  const address = "zpqhX9CmXzqTlDaG8cY3qLyGdFGpAqZp8sSrjV9OWkE"
  const fetchData = async (address: string) => {
    setLoading(true)
    const result = await axios(`https://ark-api.decent.land/v1/profile/arweave/${address}/true`);

    if (result.data) {
      const parsed = JSON.parse(result.data);
      const resobject: Res = parsed?.res;
      setArkProfile(resobject);
    }
    setLoading(false)
  };

  useEffect(() => {
    if (address) {
      fetchData(address)
    };
  }, [address])
  

//   const defaultLabels = getDefaultLabels({
//     // ar: ownedLabels || [], 
//     ENS: arkProfile?.ENS, 
//     AVVY: arkProfile?.AVVY, 
//     LENS: arkProfile?.LENS_HANDLES || []
// });
  let ens = "asdasdsdasd.TEXT"
  let avvvy = "sdasdasdasd.TEXT"
  let lens = ["sasdasdasdasdd.TEXT"]
  const defaultLabelsTest = getDefaultLabels({
    // ar: ownedLabels || [], 
    ENS: ens, 
    AVVY: avvvy, 
    LENS: lens
});

// DID SELECTOR 
console.log(arkProfile?.ENS)
const labels = [...defaultLabelsTest]
const [selectedName, setSelectedName] = useState<string | null>(null)


  // // Retrieve the user info for editing profile functionalities 
  // const [userInfo, setUserInfo] = useState(null)
  // useEffect(() => {
  //   if (!address) return 
    
  //   async function fetchUserData() { 
  //     const data = await fetch('')
  //   }

  // }, [selectedName])
  


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
        userCurrentStep === 5 && ( <ConnectAdditionalAccounts /> )
      }
      
      {/* the loading screen can be mergein with the list 

        if names is not empty : DidList 
        else: 
          loadingscreen
      */}
      {
        userCurrentStep === 6 && (<LoadingScreen msg={'Cross checking user data'}/> )
      }

      {
        userCurrentStep === 7 && ( <DIDList labels={labels} selectedName={selectedName} setSelectedName={setSelectedName}/> )
      }

      {/* {
        userCurrentStep === 6123 && ( <RegisterNamePage setArLabel={setArLabel} arLabel={arLabel} /> ) 
      } */}
      {
        userCurrentStep === 8 && ( <ConfirmUsername  arLabel={selectedName!}/> ) 
      }
      {
        userCurrentStep === 9 && (<AvatarSelectionPage  />)
      }
      {
        userCurrentStep === 10 && (<OptionEditProfile /> )
      }
      {
        userCurrentStep === 11 && (<EditProfilePage loading={loading}/> )
      }
      {
        userCurrentStep === 12 && (<LoadingScreen msg={'Creating your profile'} end={true}/> )
      }

    </div>  
  )
}

export default Onboarding