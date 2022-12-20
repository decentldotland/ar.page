import { CheckIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import { Res } from '../../src/types';
import MainNextButton from '../buttons/MainNextButton';
import UserBackButton from '../buttons/UserBackButton';
import { getOnboardingStepNumeric, setOnboardingStep } from '../../src/utils/onboardingHelper';

interface Props { 
  labels: any,
  selectedName: string | null,
  setSelectedName: any,
  handleOnboarding: SetterOrUpdater<number>
}
const tableClass = "cursor-pointer px-2 textspace-x-2 py-5 h-[55px] flex items-center text-center font-bold 4xl:text-2xs text-sm rounded-2xl relative transition-opacity duration-300 hover:opacity-60";

function DIDList({labels, selectedName, setSelectedName, handleOnboarding}: Props) {
  console.log("Labels from DIDList: ", labels);
  const [loading, setLoading] = useState(false)
  return (
    <>
      <section className="md:relative md:top-32 w-full px-5 sm:w-[440px] flex flex-col justify-between h-screen">
        <div className=' mt-10 '>
          <h2 className="text-[32px] font-bold mt-5">What will be your username?</h2>
          <p className="text-sm self-start mb-6 text-[#8e8e8f]">
              To give you a headstart, we loaded your existing handles from other chains. You may also 
              choose to mint an <span className="font-bold">Arweave Domain Name.</span>
          </p>
            <div className="mt-11">
              <div className="grid grid-flow-row grid-cols-2 md:grid-cols-1 lg:md:grid-cols-2  grid-rows-4 gap-5">
                  {labels !== undefined ?
                  labels.map((item:any, index:number) => (
                    <button onClick={() => setSelectedName(item.username)} key={index}>
                      <div   className={`text-white ${selectedName === item.username ? tableClass + item.classes + 'border-black border-2': item.classes + tableClass} `}>
                          <div className='flex flex-row items-center space-x-1'>
                            {item.icon}
                            <h3 className={`font-inter ${selectedName === item.username ? 'text-[#454a75]' : ''}`}>{item.username}</h3>
                          </div>
                        {
                          selectedName === item.username && (
                            <div className='absolute -right-1 bottom-10 bg-[#1cc16a] justify-center w-[19px] h-[19px] p-1 items-center flex rounded-full'>
                              <CheckIcon height={15} width={15}  color='#fff' strokeWidth={4}/>
                            </div>
                          )
                        }
                      </div>
                    </button>
                  ))
                  :
                  <p>No Label Handles Found...</p>
                  }
                </div>
                <span 
                  className="mb-2"
                  onClick={() => { 
                    if(selectedName) {
                      setOnboardingStep("7");
                      handleOnboarding(getOnboardingStepNumeric()); 
                    }
                  }}
                >
                  <MainNextButton 
                    btnName='Next' 
                    disabled={!selectedName || loading}
                    className="mb-4 mt-2"
                  />
                </span>
            </div>
        </div>
        </section>
    </>
  )
}

export default DIDList

