import { CheckIcon, EyeIcon, XCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Web3 from 'web3'
import { Ans } from '../../src/types'
import useValidateLabel from '../../src/useValidateLabel'
import BackButton from '../reservation/BackButton'
import { BlueButtonNext } from '../reservation/BlueButtonNext'
import NextButton from '../reservation/NextButton'

interface Props  { 
    setCurrentStep: any
    currentStep: number,
}

function RegisterNamePage({setCurrentStep, currentStep}: Props) {

    const [arLabel, setArLabel] = useState('');
    let validateLabel = useValidateLabel(arLabel)
    // const onSubmit = (e: any) => {
    //   e.preventDefault();
    //   if (arLabel.length === 0) return 
    //   if (!(validateLabel.length == 0  && arLabel.length > 0)) return
    //   setLoadingWrite(true)
    //   // axios.post(`api/exmwrite`, {
    //   //   "function": "reserve",
    //   //   "evm_address": evmAddress,
    //   //   "ans": arLabel.toLowerCase()
    //   // })
    //   // .then((res) => {
    //   //   setLoadingWrite(false)
    //   //   console.log(res)
    //   //   setstep(4)
    //   // })
    //   // .catch((err) => {
    //   //   setInvalidLabel('Request failed, try again later')
    //   //   toast(
    //   //   <p className='font-sans'>❌ Something went wrong, please try again.</p>, {duration: 3000})
    //   //   console.log(err);
    //   //   // If it fails it should inform the user 
    //   //   setCurrentStep(2)
    //   // })
    // }
  
    return (
        <section className=" mt-10">
            <BackButton setstep={setCurrentStep} step={currentStep - 1}/>
            <h1 className="text-[32px] font-bold mt-5">What do we call you?</h1>
            <p className="text-sm self-start mb-6 text-[#8e8e8f]">You can only register with one username <br/>per account.</p>
            
            <p className="text-sm text-left text-[#6a6b6a]"> 
            <span className='font-bold'>Remember: </span>
                You won't be able to change this later.
            </p>
            
            <form className="w-full mt-3" >
            <div className="mb-6 space-y-2">
                {/* <p>LENGTH = {arLabel.length}</p> */}
                <div className=" items-center flex w-full  h-12 bg-[#edecec] px-4 rounded-xl ">
                    <input
                        className="w-full bg-transparent focus:outline-none font-semibold text-black "
                        placeholder="What do we call you?"
                        value={arLabel}
                        onChange={(e) => setArLabel(e.target.value)}
                    />
                    {/* If the username is valid, render a check mark else, render a clear mark */}
                    <div hidden={arLabel.length <= 1}>
                        {
                            validateLabel.length === 0 ? (
                                <CheckIcon
                                className='cursor-pointer relative left-1' 
                                height={25} width={25} strokeWidth={3} color='#78ff75'  />
                            ) : (
                                <XCircleIcon
                                onClick={() => {setArLabel('')}}
                                className='cursor-pointer relative left-1' 
                                height={20} width={20} strokeWidth={3} color='#666' />
                            )
                        }
                    </div>
                </div>
                {/* Error Checks */}
                <p className={`text-red-500  text-center text-sm h-6`}>
                {validateLabel}
                </p>
                <ul className='text-[#6a6b6a] ml-4 relative bottom-2'>
                <li>
                    <p className="text-xs ">
                    <span className='font-bold'>• </span> Usernames are min. 2 character length and no longer than 15 characters.
                    </p>
                </li>
                <li>
                    <p className="text-xs ">
                    <span className='font-bold'>• </span> It must only contain alphanumerical values.
                    </p>
                </li>
                </ul>
            </div>
            </form>
            
            {/* Bottom Message  */}
            <div className='flex flex-row space-x-3.5 items-center'>
            <EyeIcon
                className='cursor-pointer relative left-1' 
                height={20} width={20} strokeWidth={3} color='#666' />
                <h1 className='text-xs font-semibold text-[#3a3a3a] text-left'>This will be shown on your profile.</h1>
            </div>
            <div hidden={validateLabel.length > 1 || arLabel.length === 0 } >
                
                <BlueButtonNext setCurrentStep={setCurrentStep} 
                    currentStep={2} 
                    msg={"Proceed to register name"} />
            </div>
        </section>
  )
}

export default RegisterNamePage