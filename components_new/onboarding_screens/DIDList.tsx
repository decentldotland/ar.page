import React from 'react'
import UserBackButton from '../buttons/UserBackButton'



function DIDList() {
  return (
    <section className=" mt-10 w-full px-5 sm:w-[440px]">
            <UserBackButton />
            <h1 className="text-[32px] font-bold mt-5">What will be your username?</h1>
            <p className="text-sm self-start mb-6 text-[#8e8e8f]">
                To give you a headstart, we loaded your existing handles from other chains. You may also 
                choose to mint an <span className="font-bold">Arweave Domain Name.</span>
            </p>
            
            
           
            
        </section>
  )
}

export default DIDList