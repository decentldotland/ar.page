import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import { SetterOrUpdater } from 'recoil';
interface signUpInterface {
  connect: () => Promise<void>;
  address: string | undefined;
  handleOnboarding: SetterOrUpdater<number>;
}

function SignUpArConnect(props: signUpInterface) {

  const btnDynamicStyling = clsx(
    "cursor-pointer bg-black text-white w-full sm:w-[386px] h-[68px] justify-center items-center flex relative flex-row rounded-full font-bold text-lg",
    props.address ? "border-4 border-emerald-400" : ""
  );

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
          <button onClick={props.address ? () => props.handleOnboarding(1) : props.connect }
            className={btnDynamicStyling}>
              <div className='flex justify-center items-center space-x-3'>
                  <Image src={'/icons/ARWEAVE_WHITE.svg'} height={26.2} width={26.2} alt="Arweave Logo" />
                  <p className='text-center'>{props.address ? "Connected! Please Proceed." : "Login with ArConnect"}</p>
              </div>
          </button>
        </div>
        <div className='space-y-2 mt-8 text-[#6a6b6a] font-medium text-center flex flex-row space-x-1 items-end justify-center'>
          <h2 className="text-sm">Already have profile?</h2>
          <a href={"/"} >
            <h2 className='underline  font-bold cursor-pointer text-[#6a6b6a]'>
              Sign in
            </h2>
          </a>
        </div>
      </div>
    </>
  )
}

export default SignUpArConnect


