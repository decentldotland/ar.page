import Image from 'next/image';
import React, { useState } from 'react';
import clsx from 'clsx';
import { SetterOrUpdater } from 'recoil';
import { ONBOARDING_TIMEOUT } from '../../src/constants';
import axios from 'axios';

interface signUpInterface {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  address: string | undefined;
  handleOnboarding: SetterOrUpdater<number>;
  handleSignedBase: SetterOrUpdater<any>;
  handlePubKey: SetterOrUpdater<any>;
  handleNearWallet: SetterOrUpdater<any>;
}

function SignUpArConnect(props: signUpInterface) {

  const [connecting, setConnecting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const btnDynamicStyling = clsx(
    "cursor-pointer bg-black text-white w-full sm:w-[386px] h-[68px] justify-center items-center flex relative flex-row rounded-full font-bold text-lg",
    props.address && !connecting ? "border-4 border-emerald-400" : ""
  );

  async function handleArweaveConnection() {

    // Fetch User Info to Determine if Already Member
    const fetchUserInfo = async(address: string | undefined) => {
      try {
        const result = await axios.get(`api/soark/${address}`);
        const payload = result.data;
        console.log(payload);
        if(result.status === 200 && payload) {
          return payload;
        }
      } catch (e) {
          console.log("Error Gather User Info: ", e);
      } 
    };

    // Connect wallet
    setConnecting(true);
    setError(false);
    await props.connect().then(async() => {
        // Obtain Pub Key
        const arconnectPubKey = await window.arweaveWallet.getActivePublicKey();
        if (!arconnectPubKey) throw new Error("ArConnect public key not found");
        const data = new TextEncoder().encode(`my pubkey for DL ARK is: ${arconnectPubKey}`);
        console.log("Logs from SignUpArConnect");
        console.log("Arconnect Key", arconnectPubKey);
        // Obtain Signature
        const signature = await window.arweaveWallet.signature(data, {
          name: "RSA-PSS",
          saltLength: 32,
        });
        const signedBase = Buffer.from(signature).toString("base64");
        if (!signedBase) throw new Error("ArConnect signature not found");
        console.log("Signed Base ", signedBase);
        // Save to State
        props.handlePubKey(arconnectPubKey);
        props.handleSignedBase(signedBase);
        const activeAddr = await window.arweaveWallet.getActiveAddress();
        console.log("Active Address: ", activeAddr);
        // Fetches all domains
        let userInfo;
        try {
          userInfo = await fetchUserInfo(activeAddr);
        } catch(e) {
          console.log("Fetch wasnt successful: ", userInfo);
          setConnecting(false);
          setError(true);
          return false;
        }
        
        console.log("User Info: ", userInfo);
        // Check if person has any EVM domains
        let containsEVM: any;
        let containsExotic: any;
        if(userInfo.res) {
          //@ts-ignore
          containsEVM = userInfo.res.addresses.filter(address => address.ark_key === 'EVM');
          console.log("Contains EVM Payload: ", containsEVM);
          //@ts-ignore
          containsExotic = userInfo.res.addresses.filter(address => address.ark_key === 'EXOTIC');
          console.log("Contains Exotic Payload: ", containsExotic);
        } else {
          props.handleNearWallet(null);
          containsEVM = [];
          containsExotic = [];
          console.log("Contains payload: ", containsEVM, containsExotic);
        }
        setConnecting(false);
        
        // Time out to notify user of connection & auto-proceed
        setTimeout(function(){
          if(containsExotic.length > 0 && containsEVM.length === 0) {
            console.log("Redirect: Step 4");
            props.handleNearWallet(containsExotic[0]);
            props.handleOnboarding(4); // Connect EVM wallet
          } else if(containsExotic.length === 0) {
            console.log("Redirect: Step 1");
            props.handleOnboarding(1); // Connect NEAR Wallet
          } else if(containsEVM.length > 0 && containsExotic.length > 0) {
            console.log("Redirect: Step 5");
            props.handleNearWallet(containsExotic[0]);
            props.handleOnboarding(5); // Select domain name go to 5
          }
        }, ONBOARDING_TIMEOUT);
    }).catch((e) => {
      setConnecting(false);
      console.log("Unable to connect wallet: ", e);
    });
  }

  return (
    <>
      <div className='relative h-full flex flex-col w-full sm:w-[440px] px-5'>
        <div className="mt-[216px] items-center flex flex-col  h-full space-y-7">
          <h1 className='font-bold text-4xl text-center'>
            Create an account <br /> for ArPage
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center font-normal'>
            Create a shareable handle, follow other users, <br /> connect to DAO communities using ArPage.
          </h2>
        </div>
        {/* Connect / Proceed Button  */}
        <div className={'mt-[99px] flex justify-center flex-col items-center w-full '+(connecting?'animate-pulse':'')}>
          <button onClick={props.address ? () => '' : handleArweaveConnection }
            className={btnDynamicStyling}>
              <div className='flex justify-center items-center space-x-3'>
                  <Image src={'/icons/ARWEAVE_WHITE.svg'} height={26.2} width={26.2} alt="Arweave Logo" />
                  {error ?
                   <p className='text-center'>Error Connecting. Try Again.</p>
                  :
                   <p className='text-center'>{props.address ? (!connecting ? "Connected! Proceeding." : "Connecting") : "Login with ArConnect"}</p>
                  }
              </div>
          </button>
        </div>
        <div className='space-y-2 mt-8 text-[#6a6b6a] font-medium text-center flex flex-col space-x-1 items-center justify-center'>
          <h2 className="text-sm">Already have profile?</h2>
          <a href={"/"} >
            <h2 className='underline font-bold cursor-pointer text-[#6a6b6a] block'>
              Sign in
            </h2>
          </a>
          <p onClick={props.disconnect} className="cursor-pointer">
              Disconnect
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUpArConnect


