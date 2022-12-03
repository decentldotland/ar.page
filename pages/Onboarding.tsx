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
import SignUpNear from '../components_new/onboarding_screens/SignUpNear';
import VerifyWithArk from '../components_new/onboarding_screens/VerifyWithArk';
import { useWalletSelector } from '../src/contexts/WalletSelectorContext';
import LoadingScreen from '../components_new/onboarding_screens/LoadingScreen';
import DIDList from '../components_new/onboarding_screens/DIDList';
import { useAns } from 'ans-for-all';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { Res } from '../src/types';
import { GenericLabel, getDefaultLabels } from '../components_new/onboarding_screens/DIDLabels';
import { useArconnect } from "../src/utils/arconnect";
import { useNear } from '../src/utils/near'
import { useAccount } from 'wagmi'

function Onboarding() {

  const [addressAr, connectAr, disconnectAr, arconnectError] = useArconnect();
  const { modal, selector, accountNear, accountId, loadingNear, linkNear } = useNear(); 

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
/*
  useEffect(() => {
    let num =  localStorage.getItem('currentStep');
    let state = localStorage.getItem('triggered');
    console.log(num)
    if (state === 'false' && +num! === 2 ) {
      setUserOnboarding(+num!)
      localStorage.setItem('triggered', 'true')
    } 
  }, [isNearWalletConnected, userCurrentStep]);
  */
  const [loading, setLoading] = useState<boolean>(true);
  const [arkProfile, setArkProfile] = useState<Res | undefined>();
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
  }, [address]);
  

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

// Near Wallet Handlers

  const handleLink = async () => {
    let arweaveAddr: string;
    let ExoticInteraction;
    if(addressAr) {
      arweaveAddr = addressAr;
      ExoticInteraction = await linkNear(arweaveAddr);
      if(ExoticInteraction) {
        ExoticInteraction = ExoticInteraction?.transaction?.hash;
        localStorage.setItem("nearLinkingTXHash", ExoticInteraction);
      }
    }
  }

  const connectNear = async () => {
    await modal?.show();
    await handleLink();
  };

  const disconnectNear = async () => {
    if (!selector) return;
    const wallet = await selector.wallet();

    wallet.signOut().catch((err: any) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  
  };

  console.log("NEAR ADDRESS: ", accountNear);
  console.log("NEAR ID: ", accountId);
  const [linkStatus, setLinkStatus] = useState<boolean>(false);

  return (
    <div className='md:h-screen font-sans flex justify-center items-center'>
      <div className='items-center md:relative md:bottom-[120px] z-10
         bg-white w-screen sm:w-[50%] flex justify-center'>
        {/* {
          userCurrentStep === 0 && (<SignUpPage  />)
        } */}
        {
          userOnboardingStep === 0 && (
            <SignUpArConnect
              connect={connectAr}
              address={addressAr}
              handleOnboarding={setUserOnboarding}
            />
          )
        }
        {
          userOnboardingStep === 1 && (
            <ConnectAccounts
              connect={connectNear}
              disconnect={disconnectNear}
              linkStatus={false}
              addressAr={addressAr}
              addressNear={accountNear}
              handleOnboarding={setUserOnboarding}
            />  
          )
        }
        {
          userOnboardingStep === 2 && (
            <SignUpNear
              handleOnboarding={setUserOnboarding}
            />
        )
        }
        {
          userOnboardingStep === 3 && (
            <VerifyWithArk 
              handleOnboarding={setUserOnboarding}
            />
          )
        }
        {
          userOnboardingStep === 4 && (
            <ArkSuccessPage  
              handleOnboarding={setUserOnboarding}
            /> 
          ) 
        }
        {
          userOnboardingStep === 5 && (
            <ConnectAdditionalAccounts
              addressAr={addressAr}
              addressNear={accountId}
              handleOnboarding={setUserOnboarding}

            /> 
          )
        }
        
        {/* the loading screen can be mergein with the list 

          if names is not empty : DidList 
          else: 
            loadingscreen
        */}
        {
          userOnboardingStep === 6 && (
            <LoadingScreen 
              msg={'Cross-Checking User Data'}
            /> 
          )
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
      { 
      /*
      <div className='bg-[#EDECEC] w-[50%] h-screen hidden sm:block '>
      </div>
      */
      }
    </div>
  )
}

export default Onboarding