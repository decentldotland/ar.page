import React, { useState } from 'react';
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
import { getDefaultLabels } from '../components_new/onboarding_screens/DIDLabels';
import { useArconnect } from "../src/utils/arconnect";
import { useNear } from '../src/utils/near';
import { IMAGE_PROXY, IPFS_PROXY } from '../src/constants';
import { removeIpfs } from '../src/utils/removeIpfs';
import { getOnboardingStepNumeric, setOnboardingStep } from '../src/utils/onboardingHelper';

function Onboarding() {

  const [addressAr, connectAr, disconnectAr, setAddress] = useArconnect();
  const { modal, selector, accountId, linkNear, setAccountNear} = useNear(); 
  
  const userCurrentStep = useRecoilValue(userOnboardingState); 
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const [arConnectPubKey, setArConnectPubKey] = useState();
  const [signedBase, setSignedBase] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>("");

  const EXMObject: any = {
    "function": "linkIdentity",
    "caller": addressAr,
    "jwk_n": arConnectPubKey,
    "sig": signedBase,
    "address": "",
    "network": "",
    "verificationReq": "",
  }

  const EXMObjectTest: any = {
    "function": "unlinkIdentity",
    "caller": addressAr,
    "jwk_n": arConnectPubKey,
    "sig": signedBase,
    "address": "",
    "network": "",
    "verificationReq": "",
  }

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
      const result = await axios.post(`/api/exmwrite`, EXMObject);
      console.log("EXM Result: ", result);
      localStorage.setItem("nearLinkingTXHash", ExoticInteraction);
    }
  }

  // For Testing Purposes Only
  const handleDelink = async () => {
    let arweaveAddr: string;
    let ExoticInteraction;
    // @ts-ignore
    arweaveAddr = addressAr;
    // Link on Near
    ExoticInteraction = await linkNear(arweaveAddr);
    if(ExoticInteraction) {
      ExoticInteraction = ExoticInteraction?.transaction?.hash;
      EXMObjectTest.address = accountId;
      EXMObjectTest.network = "NEAR-MAINNET";
      EXMObjectTest.verificationReq = ExoticInteraction;
      //Link via EXM
      console.log("EXM Obj Test: ", EXMObjectTest);
      const result = await axios.post(`/api/exmwrite`, EXMObjectTest);
      console.log("EXM Result Test: ", result);
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
  //
  const packageNftPayload = async(addressAr: string) => {
    if(addressAr) {
      const result = await axios('/api/allnft/'+addressAr);
      let images: string[] = [];
      console.log(result.data);
      // Extract image links & sanitize
      if(result.data) {
        const chainList = Object.keys(result.data);
        for(let chain = 0; chain < chainList.length; chain++) { // Loop thru each chain name (EVM, NEAR etc.)
          for(let j = 0; j < result.data[chainList[chain]].length; j++) { // Plug each chain name to payload obj
            if(result.data[chainList[chain]][j].image) { 
              if(result.data[chainList[chain]][j].image.substring(0, 4) !== "ipfs") { // Check for ipfs protocol
                if(result.data[chainList[chain]][j].image.includes(IMAGE_PROXY)) { // Check if image proxy should be added
                  images.push(result.data[chainList[chain]][j].image);
                } else {
                  result.data[chainList[chain]][j].image = IMAGE_PROXY+result.data[chainList[chain]][j].image
                  images.push(result.data[chainList[chain]][j].image);
                }
              } else { // ipfs protocols must be rendered with cloudflare links
                const param = removeIpfs(result.data[chainList[chain]][j].image);
                const proxiedUrl = IMAGE_PROXY+IPFS_PROXY+param;
                images.push(proxiedUrl);
              }
            }
          }
        }
      }
      return images;
    }
  }

  // Check if user was already onboarding prior
  // Useful for Wallets that make you leave page to connect
  if(getOnboardingStepNumeric()) {
    setOnboardingStep(String(getOnboardingStepNumeric()));
  } else {
    setOnboardingStep("0");
  }

  return (
    <div className='md:h-screen font-sans flex justify-center items-center'>
      <div className='items-center md:relative md:bottom-[120px] z-10
         bg-white w-screen sm:w-[50%] flex justify-center'>
        {/* {
          userCurrentStep === 0 && (<SignUpPage  />)
        } */}
        {
          getOnboardingStepNumeric() === 0 && (
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
          getOnboardingStepNumeric() === 1 && (
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
          getOnboardingStepNumeric() === 2 && (
            <SignUpNear
              handleOnboarding={setUserOnboarding}
            />
        )
        }
        {
          getOnboardingStepNumeric() === 3 && (
            <ArkSuccessPage  
              handleOnboarding={setUserOnboarding}
            /> 
          ) 
        }
        {
          getOnboardingStepNumeric() === 4 && (
            <ConnectAdditionalAccounts
              addressAr={addressAr}
              addressNear={accountId} 
              handleOnboarding={setUserOnboarding}
              exmObj={EXMObject}
            /> 
          )
        }
        {
          getOnboardingStepNumeric() === 5 && (
            <LoadingScreen 
              msg={'Cross-Checking User Data'}
              arAddress={addressAr}
              handleLabels={setLabelHandles}
              handleOnboarding={setUserOnboarding}
            /> 
          )
        }
        {
          getOnboardingStepNumeric() === 6 && ( 
            <DIDList 
              labels={labels} 
              selectedName={selectedName} 
              setSelectedName={setSelectedName}
              handleOnboarding={setUserOnboarding}
            /> 
            )
        }
        {
          getOnboardingStepNumeric() === 7 && (
             <ConfirmUsername  
              arLabel={selectedName!}
              arAddress={addressAr}
            /> 
          ) 
        }
        {
          getOnboardingStepNumeric() === 8 && (
            <AvatarSelectionPage
              //@ts-ignore
              handleNftPayload={() => packageNftPayload(addressAr)}
              handleSelectedProfile={setSelectedProfilePicture}  
              profileSrc={selectedProfilePicture}
            />
          )
        }
        {
          getOnboardingStepNumeric() === 9 && (
            <OptionEditProfile 
            /> 
          )
        }
        {
          getOnboardingStepNumeric() === 10 && (
            <EditProfilePage 
              loading={loading}
              profileSrc={selectedProfilePicture ? selectedProfilePicture : ""}
            /> 
          )
        }
        {
          getOnboardingStepNumeric() === 11 && (
            <LoadingScreen 
              msg={'Creating your profile'} 
              end={true}
              handleOnboarding={setUserOnboarding}
            /> 
          )
        }
      </div> 
    </div>
  )
}

export default Onboarding;
