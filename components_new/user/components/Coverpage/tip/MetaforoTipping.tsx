import Head from 'next/head'
import Script from 'next/script'
import React, { useState } from 'react'
import { BiCoinStack } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { isDarkMode } from '../../../../../atoms'

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
        <button onClick={() => setToggle(!toggle)} {...attributes} className=' font-semibold  metaforo-tip cursor-pointer active:scale-95  z-20 font-inter flex flex-row items-center space-x-1 p-2 rounded-lg bg-[#EAEAEA] text-[#666] px-2 py-2'>
            <BiCoinStack height={20} width={20} 
            color={`${isDark? ('white') : ('#666') }`}        
            strokeWidth={1}/>
            <h1 className='text-xs hidden md:block'>
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