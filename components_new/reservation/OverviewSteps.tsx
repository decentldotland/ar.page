import { ChevronUpIcon, ChevronDownIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'


function OverviewSteps() {
  const [toggle, setToggle] = useState(true);  
  return (
    <section>
        <div onClick={() => setToggle(!toggle)} className='mb-2 px-3 bg-[#edecec] py-1 rounded-xl items-center mt-4 w-[210px]'>
            <div className='flex flex-row justify-between items-center'>
            <h1 className='text-[#6a6b6a] text-left text-base'>Here's an overview</h1>
            {toggle ? (
                    <ChevronDownIcon className='' height={20} width={20} color='#646464' strokeWidth={2} />
                ): (
                    <ChevronUpIcon className='' height={20} width={20} color='#646464' strokeWidth={2} />
                )
            }
            </div>
        </div>
        {
            toggle && (
                <div className='text-left relative left-7  text-[#6a6b6a] mb-8'>
                    <ul className='list-decimal'>
                        <li>Download ArConnect. Create an Account.</li>
                        <li>Link your wallet with ArConnect via ArkProtocol.</li>
                        <li>Claim your AR page</li>
                    </ul>
                </div>
            ) 
        }
    </section>
  )
}

export default OverviewSteps