import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { CircularProgress } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';
import Web3 from 'web3';
import { userOnboardingState } from '../../atoms';
import { Ans } from '../../src/types';

interface Props { 
    arLabel: string
}

function ConfirmUsername({
    arLabel
}: Props) {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState)


    const { address, isConnected, connector } = useAccount();


    const [loadingWrite, setLoadingWrite] = useState(false)
    const web3 = new Web3(Web3.givenProvider);
    const [invalidEVM, setInvalidEVM] = useState('')
    const [invalidLabel, setInvalidLabel] = useState('');
    const [existingANSNames, setExistignANSNames] = useState<Ans[]>([]);
    const [evmAddress, setEvmAddress] = useState('');

    const checkOwnedLabelsList = () => existingANSNames.map(u => u.ownedLabels).flat().map(l => l.label).find(l => l === arLabel.toLowerCase());
    const EvmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const ArLabelRegex = /^[a-z0-9]{2,15}$/;

    const validateLabel = () => {
      if (arLabel.length === 0) return ''
      if (arLabel.length > 15) return 'Username is too long'
      if (arLabel.toLowerCase() === 'ar') return 'ar is reserved'
      if (!ArLabelRegex.test(arLabel)) return 'Invalid label, try another one.'
      if (checkOwnedLabelsList()) return 'Username is already taken, try another one.'
      return ''
    };

    const validateEVM = (suppliedAddress='') => {
      const address = suppliedAddress || evmAddress;
      if (address.length === 0) return ''
      if (!EvmAddressRegex.test(address) || !web3.utils.checkAddressChecksum(address)) return 'Invalid EVM address'
      // if (EVMAddressTaken(address)) return 'This address is already registered'
      return ''
    };


    const onSubmit = (e: any) => {
        // e.preventDefault();
        // if (arLabel.length === 0) setInvalidLabel('Please enter a label')
        // if (!(!validateLabel() && arLabel.length > 0)) return
        // if (address && validateEVM(address)) return
        // setEvmAddress(address!)
        // setLoadingWrite(true)

        // temporary 
        setUserOnboarding(userOnboardingStep + 1)
        // axios.post(`api/exmwrite`, {
        //   "function": "reserve",
        //   "evm_address": evmAddress,
        //   "ans": arLabel.toLowerCase()
        // })
        // .then((res) => {
        //   setLoadingWrite(false)
        //   console.log(res)
        //   setstep(4)
        // })
        // .catch((err) => {
        //   setInvalidLabel('Request failed, try again later')
        //   toast(
        //   <p className='font-sans'>❌ Something went wrong, please try again.</p>, {duration: 3000})
        //   console.log(err);
        //   // If it fails it should inform the user 
        //   setCurrentStep(2)
        // })
      }
     

    return (
        <section aria-disabled={loadingWrite} 
          className={loadingWrite ? 'absolute h-screen bottom-0 w-screen z-50 bg-[#B3B2B3]/25 cursor-not-allowed  ' : 
            'relative h-screen flex flex-col items-center sm:w-[440px] w-full px-5 justify-between md:relative md:top-32'}>
              
              <div className='flex flex-col items-center mt-40  w-full sm:w-[440px] '>
                <h2 className='text-xl text-center font-medium mb-7 text-[#3a3a3a]'>Your username</h2>
                <h1 className='font-bold text-4xl mb-4'>@{arLabel}</h1>

                {/* Go back to registration page  */}
                <p onClick={() => setUserOnboarding(userOnboardingStep - 1)} 
                  className='cursor-pointer font-medium text-sm text-[#1273ea] text-left hover:underline'>
                    Change username
                </p>
              </div>
                
                {/* Button to register name and direct the user to the next screen */}
                  <div className='w-full items-center flex flex-col justify-center  relative bottom-28'>
                    <button onClick={(e) => onSubmit(e)} disabled={invalidEVM.length > 0 || invalidLabel.length > 0} 
                      className=" bg-[#1273ea] w-full px-24 h-[68px] items-center rounded-full text-white font-bold text-lg" >
                        <div className='flex justify-center items-center'>

                          {
                            loadingWrite ? (
                              <CircularProgress color="inherit" size={23}/>
                            ) : (
                             <p className='relative text-center'>Looks good</p>
                            )
                          }
                        </div>
                    </button>
                  </div>
        </section>
  )
}

export default ConfirmUsername