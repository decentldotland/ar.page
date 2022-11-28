import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';


interface Props { 
  setCurrentStep: any
}

const CustomConnectButton = ({setCurrentStep}: Props) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';

        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                width: '100%',
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className=" bg-[#1273ea] w-[276px] h-14 items-center rounded-lg text-white font-bold text-lg" 
                  onClick={openConnectModal}
                  >
                    <div className='flex justify-center'>
                      <p className='relative text-center '>Connect Wallet</p>
                    </div>
                </button>
                );
              }
              return (
                <div  className='items-center flex flex-col justify-center'>
                  <button onClick={() => setCurrentStep(1)} className=" mt-9 bg-[#1273ea] w-[276px] h-14 items-center rounded-lg text-white font-bold text-lg" >
                      <div className='flex justify-center'>
                        <p className='relative text-center '>Get Started</p>
                      </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  )
}

export default CustomConnectButton