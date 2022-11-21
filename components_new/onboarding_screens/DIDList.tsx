import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAns } from 'ans-for-all'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import { useWalletSelector } from '../../src/contexts/WalletSelectorContext'
import { Res } from '../../src/types'
import UserBackButton from '../buttons/UserBackButton'
import { DIDLabels } from './DIDLabels'

interface Props { 
  labels: any
}

function DIDList({labels}: Props) {



  return (
    <>

      <section className=" mt-10 w-full px-5 sm:w-[440px]">
        <div>
              <UserBackButton />
              <h1 className="text-[32px] font-bold mt-5">What will be your username?</h1>
              <p className="text-sm self-start mb-6 text-[#8e8e8f]">
                  To give you a headstart, we loaded your existing handles from other chains. You may also 
                  choose to mint an <span className="font-bold">Arweave Domain Name.</span>
              </p>
              <div className="mt-11">
                <DIDLabels items={labels}/>
              </div>
        </div>
       
        </section>
    </>
  )
}

export default DIDList


