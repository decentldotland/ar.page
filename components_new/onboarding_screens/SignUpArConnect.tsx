import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import { SetterOrUpdater } from 'recoil';
interface signUpInterface {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  address: string | undefined;
  handleOnboarding: SetterOrUpdater<number>;
  handleSignedBase: SetterOrUpdater<any>;
  handlePubKey: SetterOrUpdater<any>;
}

function SignUpArConnect(props: signUpInterface) {

  const btnDynamicStyling = clsx(
    "cursor-pointer bg-black text-white w-full sm:w-[386px] h-[68px] justify-center items-center flex relative flex-row rounded-full font-bold text-lg",
    props.address ? "border-4 border-emerald-400" : ""
  );

  async function handleArweaveConnection() {
    // Connect wallet
    await props.connect().then(async() => {

      // Obtain Pub Key
      const arconnectPubKey = await window.arweaveWallet.getActivePublicKey();
      if (!arconnectPubKey) throw new Error("ArConnect public key not found");
      const data = new TextEncoder().encode(`my pubkey for DL ARK is: ${arconnectPubKey}`);

      const permissions = await window.arweaveWallet.getPermissions();
      // Obtain Signature
  
      const signature = await window.arweaveWallet.signature(data, {
        name: "RSA-PSS",
        saltLength: 32,
      });
      const signedBase = Buffer.from(signature).toString("base64");
      if (!signedBase) throw new Error("ArConnect signature not found");

      //Save to State
      props.handlePubKey(arconnectPubKey);
      props.handleSignedBase(signedBase);
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
        <div className='mt-[99px] flex justify-center flex-col items-center w-full'>
          <button onClick={props.address ? () => props.handleOnboarding(1) : handleArweaveConnection }
            className={btnDynamicStyling}>
              <div className='flex justify-center items-center space-x-3'>
                  <Image src={'/icons/ARWEAVE_WHITE.svg'} height={26.2} width={26.2} alt="Arweave Logo" />
                  <p className='text-center'>{props.address ? "Connected! Please Proceed." : "Login with ArConnect"}</p>
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


