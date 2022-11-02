import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'

interface Props { 
    setCurrentStep: any
    arLabel: string,
    invalidEVM: string,
    invalidLabel: string
}

function ConfirmUsername({
    setCurrentStep, 
    arLabel,
    invalidEVM,
    invalidLabel
}: Props) {


    const [loadingWrite, setLoadingWrite] = useState(false)

    const onSubmit = (e: any) => {
        e.preventDefault();
        // if (arLabel.length === 0) setInvalidLabel('Please enter a label')
        // if (!(!validateLabel() && arLabel.length > 0)) return
        // if (address && validateEVM(address)) return
        // setEvmAddress(address)
        // setLoadingWrite(true)
        // axios.post(`api/exmwrite`, {
        //   "function": "reserve",
        //   "evm_address": evmAddress,
        //   "ans": arLabel.toLowerCase()
        // })
        // .then((res) => {
        //   setLoadingWrite(false)
        //   setReservedUserDetails(res.data?.requests);
        //   setnumOfReserved(res.data?.reserved)
        //   console.log(res)
        //   setstep(4)
        // })
        // .catch((err) => {
        //   setInvalidLabel('Request failed, try again later')
        //   toast(
        //   <p className='font-sans'>❌ Something went wrong, please try again.</p>, {duration: 3000})
        //   console.log(err);
        //   // If it fails it should inform the user 
        //   setstep(2)
        // })
      }
    return (
        <section className={loadingWrite ? 'absolute h-screen bottom-0 w-screen z-50 bg-[#B3B2B3]/25  ' : ''}>
            <div className='flex flex-col items-center mt-40'>
                <h2 className='text-xl font-medium mb-7 text-[#3a3a3a]'>Your username</h2>
                <h1 className='font-bold text-4xl mb-4'>@{arLabel}</h1>
                {/* Go back to registration page  */}
                <p onClick={() => setCurrentStep(2)} className='cursor-pointer font-medium text-sm text-[#1273ea] text-left hover:underline'>Change username</p>
                
                {/* Button to register name and direct the user to the next screen */}
                <div className='flex justify-center'>
                  <div className='absolute flex flex-col bottom-24 '>
                    <button onClick={(e) => onSubmit(e)} disabled={invalidEVM.length > 0 || invalidLabel.length > 0} 
                      className=" bg-[#1273ea] w-[368px] h-14 items-center rounded-lg text-white font-bold text-lg" >
                        <div className='flex justify-center items-center'>
                          {
                            loadingWrite ? (
                              <CircularProgress color="inherit" size={23}/>
                            ) : (
                             <p className='relative text-center'>Looks good</p>
                            )
                          }
                          <ArrowLongRightIcon height={20} width={20} className="absolute right-2"/>
                        </div>
                    </button>
                  </div>
              </div>
            </div>
        </section>
  )
}

export default ConfirmUsername