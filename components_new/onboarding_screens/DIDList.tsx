import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAns } from 'ans-for-all'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import { useWalletSelector } from '../../src/contexts/WalletSelectorContext'
import { Res } from '../../src/types'
import MainNextButton from '../buttons/MainNextButton'
import UserBackButton from '../buttons/UserBackButton'

interface Props { 
  labels: any,
  selectedName: string | null,
  setSelectedName: any
}

function DIDList({labels, selectedName, setSelectedName}: Props) {

  const [loading, setLoading] = useState(false)
  return (
    <>
      <section className="md:relative md:top-32 w-full px-5 sm:w-[440px] flex flex-col justify-between h-screen">
        <div className=' mt-10 '>
          <UserBackButton />
          <h1 className="text-[32px] font-bold mt-5">What will be your username?</h1>
          <p className="text-sm self-start mb-6 text-[#8e8e8f]">
              To give you a headstart, we loaded your existing handles from other chains. You may also 
              choose to mint an <span className="font-bold">Arweave Domain Name.</span>
          </p>
            <div className="mt-11">
              <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 grid-rows-4 gap-5">
                  {labels.map((item:any, index:number) => (
                    <div key={index}  className={`${selectedName === item.username ? tableClass + item.classes + ' outline-2 outline': item.classes + tableClass} `}>
                      <button onClick={() => setSelectedName(item.username)}>
                        <div className='flex flex-row items-center space-x-1'>
                          {item.icon}
                          <h3 className="font-inter">{item.username}</h3>
                        </div>
                      </button>
                      {
                        selectedName === item.username && (
                          <div className='absolute -right-1 bottom-11 bg-[#1cc16a] justify-center w-[19px] h-[19px] p-1 items-center flex rounded-full'>
                            <CheckIcon height={15} width={15}  color='#fff' strokeWidth={4}/>
                          </div>
                        )
                      }
                      
                    </div>
                  ))}
                </div>
            </div>
        </div>
        
        <div className='relative bottom-[90px]'>
          <MainNextButton btnName='Next' disabled={!selectedName || loading}/>
        </div>
       
        </section>
    </>
  )
}

export default DIDList


const tableClass = "cursor-pointer px-2 textspace-x-2 py-5 h-[55px] flex items-center text-center font-bold 4xl:text-2xs text-sm rounded-2xl relative transition-opacity duration-300 hover:opacity-60"