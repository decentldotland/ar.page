import Head from 'next/head'
import Script from 'next/script'
import React, { useState } from 'react'
import { RiCoinsLine } from 'react-icons/ri'
import { useRecoilState } from 'recoil'
import { isDarkMode } from '../../../../atoms'

interface TipAttributes { 
    siteName: string
    pageId: string
    receiverAddress: string
    receiverUsername: string
    receiverChainId: string
    theme: string
}


interface Props { 
    attributes: TipAttributes
}


function MetaforoTipping({attributes}: Props) {
    const [isDark, setIsDark] = useRecoilState(isDarkMode);
    const [toggle, setToggle] = useState(false)
    
  return (
    <>
        <Script aria-disabled={!toggle} aria-defer="defer" src="https://cdn.jsdelivr.net/gh/metaforo/comment3/dist/metaforo-sdk.min.js" strategy='lazyOnload' />
        <button onClick={() => setToggle(!toggle)} {...attributes} className=' font-semibold  metaforo-tip cursor-pointer active:scale-95  
         font-inter flex flex-row items-center 
         px-2 h-[36px] justify-start
        space-x-1   rounded-lg bg-[#eaeaea] text-[#666]'>
            <RiCoinsLine size={26}
            color={`${isDark? ('white') : ('#666') }`}        />
            <h1 className='text-sm hidden md:block'>
                Tip
            </h1>
        </button>
    </>
  )
}

export default MetaforoTipping


{/* <MetaForoTipping  attributes={{
    siteName: `${currentLabel}`,
    pageId: "1",
    receiverAddress: `${user?.userInfo?.user}`,
    receiverUsername: `${currentLabel}`,
    receiverChainId: "",
    theme: `${isDark ? 'dark' : 'light'}`
}}/>
    */}