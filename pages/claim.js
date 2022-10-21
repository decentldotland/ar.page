import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Web3 from 'web3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import {ArrowLongRightIcon, EllipsisVerticalIcon} from '@heroicons/react/24/outline'
import Image from 'next/image';


const web3 = new Web3(Web3.givenProvider);

const Claim = () => {

  // ETH address
  const { address, isConnected } = useAccount();

  const [loadingReservations, setLoadingReservations] = useState(true)
  const [loadingWrite, setLoadingWrite] = useState(false)
  
  const [step, setstep] = useState(0);

  // For checking all existing labels
  const [reservations, setReservations] = useState([]);
  const [existingANSNames, setExistignANSNames] = useState([]);

  const [evmAddress, setEvmAddress] = useState('');
  const [invalidEVM, setInvalidEVM] = useState('')
  const [arLabel, setArLabel] = useState('');
  const [invalidLabel, setInvalidLabel] = useState('');

  const EvmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const ArLabelRegex = /^[a-z0-9]{2,15}$/;
  
  const EVMAddressTaken = (suppliedAddress='') => {
    const address = suppliedAddress || evmAddress;
    return reservations.find(l => l.evm_address === address);
  }

  const arLabelReserved = () => (
    reservations.find(l => l.reserved_ans === arLabel.toLowerCase())
  )

  const checkOwnedLabelsList = () => existingANSNames.map(u => u.ownedLabels).flat().map(l => l.label).find(l => l === arLabel.toLowerCase());

  const validateLabel = () => {
    if (arLabel.length === 0) return ''
    if (arLabel.toLowerCase() === 'ar') return 'ar is reserved'
    if (!ArLabelRegex.test(arLabel)) return 'Invalid label'
    if (arLabelReserved() || checkOwnedLabelsList()) return 'Label taken'
    return ''
  };

  const validateEVM = (suppliedAddress='') => {
    const address = suppliedAddress || evmAddress;
    if (address.length === 0) return ''
    if (!EvmAddressRegex.test(address) || !web3.utils.checkAddressChecksum(address)) return 'Invalid EVM address'
    if (EVMAddressTaken(address)) return 'This address is already registered'
    return ''
  };

  useEffect(() => {
    setInvalidLabel(validateLabel())
  }, [arLabel])

  useEffect(() => {
    setInvalidEVM(validateEVM())
  }, [evmAddress])

  useEffect(() => {
    const g = localStorage.getItem("EthLisbonEvent2022")
    if (g) {
      setstep(2)
      return
    }
    axios.get('/api/exmread').then(res => {
      setReservations(res.data?.requests);
    })
    axios.get('/api/ansusers').then(res => {
      setExistignANSNames(res.data?.res)
    })
  }, [])

  useEffect(() => {
    if (!address) return;
    if (!reservations || !existingANSNames) return;
    setInvalidEVM(validateEVM(address))
    setInvalidLabel(validateLabel())
  }, [reservations, existingANSNames])

  useEffect(() => {
    if (address && isConnected && reservations.length > 0) {
      const result = validateEVM(address);
      setInvalidEVM(result)
      setEvmAddress(address)
      if (result === '' && !EVMAddressTaken(address)) setstep(1)
      else setstep(0)
    }
    else {
      setEvmAddress('')
    }
  }, [address, isConnected, reservations]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (arLabel.length === 0) setInvalidLabel('Please enter a label')
    if (!(!validateLabel() && arLabel.length > 0)) return
    if (address && validateEVM(address)) return
    setEvmAddress(address)
    setLoadingWrite(true)

    axios.post(`api/exmwrite`, {
      "function": "reserve",
      "evm_address": evmAddress,
      "ans": arLabel.toLowerCase()
    })
    .then((res) => {
      localStorage.setItem('EthLisbonEvent2022', arLabel);
      setLoadingWrite(false)
      setstep(2)
    })
    .catch((err) => {
      setInvalidLabel('Request failed, try again later')
      console.log(err);
    })
  }

  const CustomConnectButton = () => {
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
                    // <button 
                    //   onClick={openConnectModal}
                    //   style={{ width: '100%'}}
                    //   className='bg-gray-300 hover:bg-gray-300/80 font-bold py-2 px-4 rounded-xl text-center'
                    // >
                    //   Connect 
                    // </button>
                    <button className=" bg-[#1273ea] w-[276px] h-14 items-center rounded-lg text-white font-bold text-lg" 
                    onClick={openConnectModal}
                    >
                      <div className='flex justify-center'>
                        <p className='relative text-center '>Connect Wallet</p>
                        {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2"/> */}
                      </div>
                  </button>
                  );
                }
                return (
                  // <button 
                  //   onClick={openAccountModal}
                  //   style={{ width: '100%'}}
                  //   className='bg-gray-300 hover:bg-gray-300/80 font-bold py-2 px-4 rounded-xl text-center'
                  // >
                  //   {account.displayName}
                  // </button>
                  <div>
                    <UserAccountDetails />
                    <button className=" bg-[#1273ea] w-[276px] h-14 items-center rounded-lg text-white font-bold text-lg" 
                      onClick={() => setstep(3)}
                      >
                        <div className='flex justify-center'>
                          <p className='relative text-center '>Get Started</p>
                          {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2"/> */}
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

  return (
    <>
      <Head>
        <title>ar.page | Coming soon...</title>
        <meta name="description" content="Coming soon..." />
        <meta name="twitter:image" content="https://ar.page/favicon.png" />
        <meta name="twitter:title" content="ar.page" />
        <meta name="twitter:url" content="ar.page"></meta>
        <meta name="twitter:description" content="Coming soon..." />
      </Head>
      <div className="flex h-full items-start font-inter px-10">
        <div className="flex flex-col items-center justify-center max-w-[420px] mx-auto gap-y-3 font-sans ">
          {step === 0 && (
            <>
              {invalidEVM.length === 0 && address && <button className="self-start cursor-pointer text-gray-400 decoration-gray-400 underline" onClick={() => setstep(1)}>Next</button>}
              <div className="w-full mt-20">
                <h1 className="text-[45px] font-bold text-center mb-7 mt-10">Hello Hackers👋</h1>
                <p className="text-sm text-center mb-6">
                  On behalf of the whole Decent Land Team, we thank you for showing your support at ETH Lisbon
                </p>
                <p className="text-sm text-center mb-6">
                  By now you should have received your early access POAP token.
                </p>
                <p className="text-sm text-center mb-6">
                  The token is used to be part of our <span className='font-bold'>Airdrop</span> Event 
                  which gives you access to setup your ANS domains and ArPages before anyone else!
                </p>
              
                

                <BlueButtonNext setstep={setstep} step={1} msg={"Let's go"} 
                  sub_message={"Read to redeem the early access to your ArPage?"}/>
              </div>
              {/* <p>Make sure to use the address that will receive the appropriate event Poap!</p> */}
            </>
          )}
          {
            step === 1 && (
              <>
                <div className="w-full h-screen flex flex-col justify-center text-center ">
                  <h1 className="text-[45px] font-bold mb-2">Register to get an ANS Airdrop</h1>
                  <p className='font-medium text-sm mb-10 text-[#3a3a3a]'>Only applicable to DecentLand POAP holders</p>

                  <CustomConnectButton
                    label="Connect"
                    showBalance={false}
                    chainStatus="icon"
                    accountStatus="address" 
                  />
                  <p className="text-red-500 my-2 text-center h-6">{invalidEVM}</p>
              </div>
              </>
            )
          }

         
          {step === 2 && (
            <>
              <h1 className="text-3xl font-bold">Congrats!</h1>
              <h1 className="text-xl font-medium break-all text-center">
                <span>{localStorage.getItem("EthLisbonEvent2022") || "placeholder"} </span>
                 is reserved for <br />{address}
              </h1>

              <div className="w-full h-40 rounded-xl bg-gray-300">
                art
              </div>

              <h2 className="text-xl font-medium">
                <span>To claim your label, go to </span>
                <a href="https://ark.decent.land?ref=arpage" className="text-primary hover:underline decoration-primary">Ark protocol</a>
                <span> to link your account and be eligible!</span>
              </h2>
              <div className="text-[60px]"></div>
              <a href="https://ark.decent.land?ref=arpage" className="w-full h-12 rounded-xl bg-gray-300 flex justify-between items-center px-6 text-black">
                <span className="font-semibold text-lg">Go to ark protocol</span>
                <ArrowRightIcon className="w-6 h-6" />
              </a>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Claim


export function BlueButtonNext({step, msg, sub_message, setstep}) {
  return (
    <div className='flex justify-center'>
      <div className='absolute flex flex-col bottom-24 '>
        <p className="text-sm text-center mb-6 font-medium">
          {sub_message}
        </p>
        <button className=" bg-[#1273ea] w-[368px] h-14 items-center rounded-lg text-white font-bold text-lg" 
          onClick={() => setstep(step)}>
            <div className='flex justify-center'>
              <p className='relative text-center '>{msg}</p>
              <ArrowLongRightIcon height={20} width={20} className="absolute right-2"/>
            </div>
        </button>
      </div>
    </div>
  )
}


export function UserAccountDetails({displayImg, chainIcon, address, walletName}) {
  return (
    <section>
      <p>Your Connected Wallet</p>
      <div>
        <div>
          <Image src={displayImg} height={38} width={38}/>
          <div className='rounded-full bg-[#b2b8d0]'>
            <Image src={chainIcon} height={16} width={16}/>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row space-x-1'>
            <h1>{address}</h1>
            <div className='h-[10px] w-[10px] rounded-full bg-[#1cc16a]'></div>
          </div>
          <h2 className=''>{walletName}</h2>
        </div>
      </div>
      <div className='absolute right-2'>
        <EllipsisVerticalIcon color='#6a6b6a' height={20} width={20} className="absolute right-2"/>
      </div>
    </section>
  )
}



// {step === 1 && (
//   <>
//     <div className="text-[32px] font-bold">Reserve a username, reedem it later</div>
//     <div className="text-sm self-start mb-6">You can only reserve one username per account</div>
//     <form className="w-full mt-3" onSubmit={onSubmit}>
//       <div className="mb-6">
//         <div className="w-full">
//           <input
//             className="w-full border-2 border-gray-300 bg-gray-300/90 outline-gray-400 p-2 rounded-lg"
//             placeholder="Enter your desired label"
//             value={arLabel}
//             onChange={(e) => setArLabel(e.target.value)}
//           />
//         </div>
//         <p className={`text-red-500 my-2 text-center h-6`}>
//           {invalidLabel}
//         </p>
//         <p className="text-xs ">Labels can only have numbers from 0-9 and <span className="font-semibold">lowercase</span> English letters. 2 letters minimum, 15 max.</p>
//       </div>
//       <button
//         className="!bg-gray-300/90 outline-gray-400 text-black font-semibold py-2 rounded-2xl px-4 cursor-pointer w-full !justify-center"
//         type="submit"
//         disabled={invalidEVM.length > 0 || invalidLabel.length > 0}
//       >
//         {loadingWrite ? "Loading...": "Reserve"}
//       </button>
//     </form>
//     <CustomConnectButton
//         label="Connect"
//         showBalance={false}
//         chainStatus="icon"
//         accountStatus="address" 
//       />
//       <p className="text-red-500 my-2 text-center h-6">{invalidEVM}</p>
     
//   </>
// )}