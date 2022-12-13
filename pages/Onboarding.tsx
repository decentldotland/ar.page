import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../atoms';
import ArkSuccessPage from '../components_new/onboarding_screens/ArkSuccessPage';
import AvatarSelectionPage from '../components_new/onboarding_screens/AvatarSelectionPage';
import ConfirmUsername from '../components_new/onboarding_screens/ConfirmUsername';
import ConnectAccounts from '../components_new/onboarding_screens/ConnectAccounts';
import ConnectAdditionalAccounts from '../components_new/onboarding_screens/ConnectAdditionalAccounts';
import EditProfilePage from '../components_new/onboarding_screens/EditProfilePage';
import OptionEditProfile from '../components_new/onboarding_screens/OptionEditProfile';
import SignUpArConnect from '../components_new/onboarding_screens/SignUpArConnect';
import SignUpNear from '../components_new/onboarding_screens/SignUpNear';
import LoadingScreen from '../components_new/onboarding_screens/LoadingScreen';
import DIDList from '../components_new/onboarding_screens/DIDList';
import axios from 'axios';
import { Res } from '../src/types';
import { getDefaultLabels } from '../components_new/onboarding_screens/DIDLabels';
import { useArconnect } from "../src/utils/arconnect";
import { useNear } from '../src/utils/near';

function Onboarding() {

  const [addressAr, connectAr, disconnectAr, setAddress] = useArconnect();
  const { modal, selector, accountId, linkNear, setAccountNear} = useNear(); 
  
  const userCurrentStep = useRecoilValue(userOnboardingState); 
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const [arConnectPubKey, setArConnectPubKey] = useState();
  const [signedBase, setSignedBase] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  //const [arkProfile, setArkProfile] = useState<Res | undefined>();

  const EXMObject: any = {
    "function": "linkIdentity",
    "caller": addressAr,
    "jwk_n": arConnectPubKey,
    "sig": signedBase,
    "address": "",
    "network": "",
    "verificationReq": "",
  }
/*
  const fetchData = async (address: string) => {
    setLoading(true);
    const result = await axios(`https://ark-api.decent.land/v1/profile/arweave/${address}/true`);
    if (result.data) {
      const parsed = JSON.parse(result.data);
      const resobject: Res = parsed?.res;
      setArkProfile(resobject);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (address) {
      fetchData(address)
    };
  }, [address]);
*/
  const [labelHandles, setLabelHandles] = useState<any>({
    ENS: [], 
    AVVY: [],
    LENS: [],
    ANS: [],
    NEAR: [],
    EVMOS: [],
    URBIT: [] 
  });
  const defaultLabelsTest = getDefaultLabels(labelHandles);

  // DID SELECTOR 
  const labels = [...defaultLabelsTest]
  const [selectedName, setSelectedName] = useState<string | null>(null)

  // Near Wallet Handlers
  const handleLink = async () => {
    let arweaveAddr: string;
    let ExoticInteraction;
    // @ts-ignore
    arweaveAddr = addressAr;
    // Link on Near
    ExoticInteraction = await linkNear(arweaveAddr);
    if(ExoticInteraction) {
      ExoticInteraction = ExoticInteraction?.transaction?.hash;
      EXMObject.address = accountId;
      EXMObject.network = "NEAR-MAINNET";
      EXMObject.verificationReq = ExoticInteraction;
      //Link via EXM
      console.log("EXM Obj: ", EXMObject);
      const result = await axios.post(`api/exmwrite`, EXMObject);
      console.log("EXM Result: ", result);
      localStorage.setItem("nearLinkingTXHash", ExoticInteraction);
    }
  }

  const connectNear = async () => {
    await modal?.show();
  };
  
  const disconnectNear = async () => {
    if (!selector) return;
    const wallet = await selector.wallet();

    wallet.signOut().catch((err: any) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

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
              disconnect={disconnectAr}
              address={addressAr}
              handleOnboarding={setUserOnboarding}
              handleSignedBase={setSignedBase}
              handlePubKey={setArConnectPubKey}
              handleNearWallet={setAccountNear}
            />
          )
        }
        {
          userOnboardingStep === 1 && (
            <ConnectAccounts
              connect={connectNear} 
              disconnect={disconnectNear}
              handleNearLink={handleLink} 
              linkStatus={false} 
              addressAr={addressAr}
              addressNear={accountId}
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
            <ArkSuccessPage  
              handleOnboarding={setUserOnboarding}
            /> 
          ) 
        }
        {
          userOnboardingStep === 4 && (
            <ConnectAdditionalAccounts
              addressAr={addressAr}
              addressNear={accountId} 
              handleOnboarding={setUserOnboarding}
              exmObj={EXMObject}
            /> 
          )
        }
        {
          userOnboardingStep === 5 && (
            <LoadingScreen 
              msg={'Cross-Checking User Data'}
              arAddress={addressAr} //addressAr
              handleLabels={setLabelHandles}
            /> 
          )
        }
        {
          userOnboardingStep === 6 && ( 
            <DIDList 
              labels={labels} 
              selectedName={selectedName} 
              setSelectedName={setSelectedName}
              handleOnboarding={setUserOnboarding}
            /> 
            )
        }

        {/* {
          userCurrentStep === 6123 && ( <RegisterNamePage setArLabel={setArLabel} arLabel={arLabel} /> ) 
        } */}
        {
          userCurrentStep === 7 && ( <ConfirmUsername  arLabel={selectedName!}/> ) 
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

export default Onboarding;