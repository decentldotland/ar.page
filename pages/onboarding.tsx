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
import { NFT, Res } from '../src/types'
import { GenericLabel, getDefaultLabels } from '../components_new/onboarding_screens/DIDLabels'
import { RiContactsBookLine } from 'react-icons/ri'
import Image from 'next/image'
import WelcomePage from '../components_new/onboarding_screens/WelcomePage'
import NftCollections from '../components_new/onboarding_screens/UserCollections/NftCollections'


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
    console.log(`${num} USER STEP `)
    console.log(`${state} THE STATE`)

    if (state === 'FALSE' && accountId && num! === '2' ) {
      console.log("askdhaskdjalsk;jdkuwen fih ifuh iuh fihe")
      setUserOnboarding(+num!)
      localStorage.setItem('triggered', 'TRUE')
    } else {
      localStorage.setItem('triggered', '')
    }
    console.log("IT DOESNT WOKR AKSDASKDJAS")

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
  //   setUserOnboarding(0)
  // }, [])
  
  const [loading, setLoading] = useState<boolean>(true);
  const [arkProfile, setArkProfile] = useState<Res | undefined>();
  // const {address} = useAns()
  const address = "kaYP9bJtpqON8Kyy3RbqnqdtDBDUsPTQTNUCvZtKiFI"
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
  
  console.log(arkProfile)

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
const [selectedAvatar, setSelectedAvatar] = useState<NFT | null>(null)

  // // Retrieve the user info for editing profile functionalities 
  // const [userInfo, setUserInfo] = useState(null)
  // useEffect(() => {
  //   if (!address) return 
    
  //   async function fetchUserData() { 
  //     const data = await fetch('')
  //   }

  // }, [selectedName])
  

// items-center flex justify-center
  return (
    <div className='md:h-screen font-sans flex flex-row sm:justify-between justify-center items-center'>
      <div className='items-center md:relative md:bottom-[120px] z-10
         bg-white w-screen sm:w-[50%] flex justify-center'>
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
        {/* {
          userCurrentStep === 3 && (<VerifyWithArk />)
        } */}
        {
          userCurrentStep === 3 && (<ArkSuccessPage  /> ) 
        }

        {
          userCurrentStep === 4 && ( <ConnectAdditionalAccounts /> )
        }
        
        {/* the loading screen can be mergein with the list 

          if names is not empty : DidList 
          else: 
            loadingscreen
        */}
        {
          userCurrentStep === 5 && (<LoadingScreen msg={'Cross checking user data'}/> )
        }

        {
          userCurrentStep === 6 && ( <DIDList labels={labels} selectedName={selectedName} setSelectedName={setSelectedName}/> )
        }

        {/* {
          userCurrentStep === 6123 && ( <RegisterNamePage setArLabel={setArLabel} arLabel={arLabel} /> ) 
        } */}
        {
          userCurrentStep === 7 && ( <ConfirmUsername  arLabel={selectedName!}/> ) 
        }
        {
          userCurrentStep === 8 && (<AvatarSelectionPage  />)
        }
        
            {
              userCurrentStep === 50 && (<NftCollections selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} arkProfile={arkProfile ? arkProfile : null}/> )
            }
        {
          userCurrentStep === 9 && (<OptionEditProfile /> )
        }
        {
          userCurrentStep === 10 && (<EditProfilePage loading={loading}/> )
        }
        {
          userCurrentStep === 11 && (<WelcomePage/> )
        }
        {
          userCurrentStep === 12 && (<LoadingScreen msg={'Creating your profile'} end={true}/> )
        }
  

      </div>  
      <div className='bg-[#EDECEC] w-[50%] h-screen hidden sm:block '>
        {/* <Image src={'/ONBOARDING_IMG.png'} layout="fill"  objectFit="fill" className='absolute left-0'/> */}
      </div>

    </div>
  )
}

export default Onboarding