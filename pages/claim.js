import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Web3 from 'web3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChainMismatchError, useAccount, useConnect, useDisconnect } from 'wagmi'
import { ArrowRightIcon, XCircleIcon } from '@heroicons/react/24/solid';
import {ArrowLongRightIcon, ArrowTopRightOnSquareIcon, CheckCircleIcon, CheckIcon, ChevronUpIcon, ClockIcon, DocumentDuplicateIcon, EllipsisVerticalIcon} from '@heroicons/react/24/outline'
// import Image from 'next/image';
// import { MdLogout } from 'react-icons/md';
// import {TbCopy} from 'react-icons/tb'
// import { FiLogOut } from 'react-icons/fi';
// import { chain } from 'lodash';
import { BlueButtonNext } from '../components_new/reservation/BlueButtonNext';
import { UserAccountDetails } from '../components_new/reservation/UserAccountDetails';
import BackButton from '../components_new/reservation/BackButton';
import {EyeIcon} from '@heroicons/react/24/solid'
import { CircularProgress, Snackbar } from '@mui/material';
import NextButton from '../components_new/reservation/NextButton';
import LineBarTracker from '../components_new/reservation/LineBarTracker';
import OverviewSteps from '../components_new/reservation/OverviewSteps';
import CheckList from '../components_new/reservation/CheckList';
import {ComputerDesktopIcon} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { BsCheckSquareFill, BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs';

const web3 = new Web3(Web3.givenProvider);

const Claim = () => {

  // ETH address
  const { address, isConnected, connector } = useAccount();
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

  const validateEVM = (suppliedAddress='') => {
    const address = suppliedAddress || evmAddress;
    if (address.length === 0) return ''
    if (!EvmAddressRegex.test(address) || !web3.utils.checkAddressChecksum(address)) return 'Invalid EVM address'
    // Checks if the EVM address has registered ans 
    // if (EVMAddressTaken(address) === undefined) return 'The account is not viable for any claims'
    return ''
  };


  useEffect(() => {
    setInvalidEVM(validateEVM())
  }, [evmAddress, reservations])

  useEffect(() => {
    let userDetails = reservations.find(i => i.evm_address === address);
    setArLabel(userDetails?.reserved_ans) 
  }, [reservations, address])

  useEffect(() => {
    const g = localStorage.getItem("EthLisbonEvent2022")
    if (g) {
      // setste[0]
      setstep(3)
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
    // setInvalidLabel(validateLabel())
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

  // If the user is not connected then 
  useEffect(() => {
    if (!isConnected) setstep(0)
  }, [isConnected])
  
  // temporary 
  const [chainUrlId, setChainUrlId] = useState('')
  const [ensAvatar, setEnsAvatar] = useState('')
  const [lineBarSteps, setLineBarSteps] = useState(0)
  const ARCONNECT_DOWNLOAD_LINK = "https://www.arconnect.io/"
  const OPEN_ARK_CONNECT = "https://ark.decent.land/"
  const TWITTER_DL = "https://twitter.com/decentdotland"
  const DISCORD_JOIN = "https://discord.gg/decentland"
  const GITHUB_DL = "https://github.com/decentldotland"

  console.log(reservations)
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

          setChainUrlId(chain?.iconUrl)
          setEnsAvatar(account?.ensAvatar)
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
                  <div className='items-center flex flex-col justify-center'>
                    <UserAccountDetails 
                      upperMessage='Your Connected Wallet'
                      address={account?.address} 
                      chainIconUrl={chain?.iconUrl}
                      displayImg={account?.ensAvatar}
                      walletName={connector?.name}
                    />
                    <button className=" mt-9 bg-[#1273ea] w-[276px] h-14 items-center rounded-lg text-white font-bold text-lg" 
                      onClick={() => setstep(1)}
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
      <div className="flex h-full font-sans px-6 items-center justify-center ">
        <div className="flex flex-col justify-center max-w-[420px] items-center relative ">

          {
// 2. SECOND SCREEN
            step === 0 && (
              <>
                <div className="w-full h-screen flex flex-col justify-center text-center ">
                  <h1 className="text-[40px] font-bold mb-2">Check & Claim <br/>your ANS Airdrop</h1>
                  <p className='font-medium text-sm mb-10 text-[#3a3a3a] '>
                    If you participated in DecentLand's Airdrop event from ETH Lisbon 2022, you are eligible to claim
                    your ArPage and ANS Domain.
                  </p>

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
          {

            step === 1 && (
              <>
                <section className=' relative h-screen '>
                  
                  <div className='items-center mt-32'>
                    <div className='flex flex-row  mb-4 '>
                      <BackButton setstep={setstep} step={step - 1}/>
                    </div>
                    <h1 className='text-3xl font-bold mb-3'>Welcome to Arweave <br/> Name Service!🎉</h1>
                    
                    <div className='mt-2 rounded-sm h-[1px]  bg-[#d9d9d9]'></div>
                    
                    <div className="text-sm">
                      <p className='text-left text-[#8e8e8f] mt-6'>Whether you are beginner or experienced,
                      we will walk you through the whole process of setting your Arweave Wallet and connecting your EVM
                      wallet to Arweave using the Ark Protocol.</p>
                      <p className='text-left text-[#8e8e8f] mt-3'>if needed, feel free to skip some steps.</p>
                      <p className='text-left text-[#8e8e8f] mt-3 mb-4'>If you have any question, please reach out to us on Discord 
                        and we will guide you as much as we can. </p>
                    </div>

                    <div className=''>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex flex-row space-x-2.5 items-center text-[#6a6b6a] '>
                          <ComputerDesktopIcon height={25} width={25} color={"#6a6b6a"} strokeWidth={2} />
                          <p>Completed on: <span className='font-bold text-[#6a6b6a] '>Desktop</span></p>
                        </li>
                        <li className='flex flex-row space-x-2.5 items-center text-[#6a6b6a]'>
                          <ClockIcon height={25} width={25} color={"#6a6b6a"} strokeWidth={2} />
                          <p>Approx. time to complete:<span className='font-bold text-[#6a6b6a] '> ~5 min</span></p>
                        </li>
                      </ul>
                    </div>

                  </div>

                </section>
                  <div className='flex flex-col justify-center w-full absolute bottom-10 '>
                      <button className=" bg-[#1273ea] h-14  items-center relative rounded-lg text-white font-bold text-lg" 
                        onClick={() => setstep(2)}>
                          <div className='flex justify-center items-center'>
                            <p className='relative text-center '>Start</p>
                            <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                          </div>
                      </button>
                      <p onClick={() => setstep(0)} 
                        className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>Maybe later</p>  
                  </div>                



              </>
            )
          }

          {
// LETS GET YOU STARTED 
// 
            step === 2 && (
              <>
                <section className='relative h-screen  '>
                  <div className='flex flex-row justify-between sm:space-x-60  mb-4 items-center mt-32'>
                    <BackButton setstep={setstep} step={step - 1}/>
                    <NextButton setstep={setstep} step={step + 1}/>
                  </div>

                  <div className='items-center '>
                    <div className='mt-6 mb-5 '>
                      <LineBarTracker step={0}  total_step={3}/>
                    </div>
                    <h1 className='text-3xl font-bold mb-2'>Let's get you started <br/> with Arweave and ANS.</h1>
                    <p className='text-left text-[#8e8e8f] text-sm'>
                      Claiming your first AR Page/ANS can be quite <br /> 
                      overwhelming. But don't worry! We're here to <br />to guide you along the process.
                    </p>
                    <OverviewSteps />
                    <section className='mt-4'>
                      <div className='space-y-3 mb-5 '>
                        <h1 className='text-xl text-left text-[#3a3a3a] font-medium'>Complete the checklist to get started:</h1>
                        <div  className=' flex flex-row space-x-3.5 rounded-xl px-5 py-3 w-full bg-[#edecec] items-center'>
                          <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                          <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Download and setup Arconnect</h1>
                        </div>
                        <div  className=' flex flex-row space-x-3.5 rounded-xl px-5 py-3 w-full bg-[#edecec] items-center'>
                          <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                          <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Link my EVM wallet to my ArConnect</h1>
                        </div>
                        <div  className=' flex flex-row space-x-3.5 rounded-xl px-5 py-3 w-full bg-[#edecec] items-center '>
                          <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                          <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Claim my ArPage</h1>
                        </div>
                      </div>
                    </section>
                    
                    </div>
                    
                    <div className='flex justify-center flex-col items-center w-full'>
                      <Link href={ARCONNECT_DOWNLOAD_LINK} >
                          <a target="_blank" rel="noopener noreferrer" onClick={() => setstep(3)}
                            className="cursor-pointer bg-[#1273ea] w-full h-14 justify-center items-center flex relative flex-row rounded-lg text-white font-bold text-lg" >
                              <div className='flex justify-center items-center'>
                                <p className='text-center'>Download and Setup ArConnect</p>
                                <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                              </div>
                          </a>
                      </Link>

                      <p onClick={() => setstep(0)} className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>
                          I will set it up later
                      </p>
                    </div>
                </section>
              </>
            )
          }
          {
// ARK PROTOCOL
// 
            step === 3 && (
              <>
                <section className='relative h-screen  '>
                  <div className='flex flex-row justify-between sm:space-x-60  mb-4 items-center mt-32'>
                    <BackButton setstep={setstep} step={step - 1}/>
                    <NextButton setstep={setstep} step={step + 1}/>
                  </div>

                  <div className='items-center '>
                    <div className='mt-6 mb-5 '>
                      <LineBarTracker step={1}  total_step={3}/>
                    </div>
                    <h1 className='text-3xl font-bold mb-2'>Let's get you started <br/> with Arweave and ANS.</h1>
                    <p className='text-left text-[#8e8e8f] text-sm'>
                      Claiming your first AR Page/ANS can be quite <br /> 
                      overwhelming. But don't worry! We're here to <br />to guide you along the process.
                    </p>
                    <OverviewSteps />
                    <section className='mt-4'>
                      <div className='space-y-3 mb-5 '>
                        <h1 className='text-xl text-left text-[#3a3a3a] font-medium'>Complete the checklist to get started:</h1>
                        <div  className=' flex flex-row space-x-3.5 rounded-xl px-5 py-3 w-full bg-[#edecec] items-center'>
                          <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                          <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Link my EVM wallet to my ArConnect</h1>
                        </div>
                        <div  className=' flex flex-row space-x-3.5 rounded-xl px-5 py-3 w-full bg-[#edecec] items-center '>
                          <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                          <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Claim my ArPage</h1>
                        </div>
                      </div>
                    </section>

                    <div className={"flex flex-col text-center px-5 mb-7 space-y-3.5"}>
                      <h1 className='text-[#8e8e8f] font-medium '>Completed Steps </h1>
                      <div  className={"flex flex-row items-center justify-start space-x-3.5"}>
                          <BsCheckSquareFill size={23} color={"#cececf"}/>
                          <h1 className='text-[#cececf] font-bold text-left text-sm'>Download and setup ArConnect</h1>
                      </div>
                    </div> 
                    
                    </div>
                    
                    <div className='flex justify-center flex-col items-center w-full'>
                      <Link href={ARCONNECT_DOWNLOAD_LINK} >
                          <a target="_blank" rel="noopener noreferrer" onClick={() => setstep(3)}
                            className="cursor-pointer bg-[#1273ea] w-full h-14 justify-center items-center flex relative flex-row rounded-lg text-white font-bold text-lg" >
                              <div className='flex justify-center items-center'>
                                <p className='text-center'>Download and Setup ArConnect</p>
                                <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                              </div>
                          </a>
                      </Link>

                      <p onClick={() => setstep(0)} className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>
                          I will set it up later
                      </p>
                    </div>
                </section>
              </>
            )
          }
        
          {
// ARK PROTOCOL
// 
            step === 4 && (
              <>
                <section className='relative h-screen  '>
                  <div className='flex flex-row justify-between sm:space-x-60  mb-4 items-center mt-32'>
                    <BackButton setstep={setstep} step={step - 1}/>
                    <NextButton setstep={setstep} step={step + 1}/>
                  </div>

                  <div className='items-center '>
                    <div className='mt-6 mb-5 '>
                      <LineBarTracker step={2}  total_step={3}/>
                    </div>
                    <h1 className='text-3xl font-bold mb-2'>Let's get you started <br/> with Arweave and ANS.</h1>
                    <p className='text-left text-[#8e8e8f] text-sm'>
                      Claiming your first AR Page/ANS can be quite <br /> 
                      overwhelming. But don't worry! We're here to <br />to guide you along the process.
                    </p>
                    <OverviewSteps />
                    <section className='mt-4'>
                      <div className='space-y-3 mb-5 '>
                        <h1 className='text-xl text-left text-[#3a3a3a] font-medium'>Complete the checklist to get started:</h1>
                        <div  className=' flex flex-row space-x-3.5 rounded-xl px-5 py-3 w-full bg-[#edecec] items-center '>
                          <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                          <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Claim my ArPage</h1>
                        </div>
                      </div>
                    </section>

                    <div className={"flex flex-col text-center px-5 mb-7 space-y-3.5"}>
                      <h1 className='text-[#8e8e8f] font-medium '>Completed Steps </h1>
                      <div  className={"flex flex-row items-center justify-start space-x-3.5"}>
                          <BsCheckSquareFill size={23} color={"#cececf"}/>
                          <h1 className='text-[#cececf] font-bold text-left text-sm'>Download and setup ArConnect</h1>
                      </div>
                      <div  className={"flex flex-row items-center justify-start space-x-3.5"}>
                          <BsCheckSquareFill size={23} color={"#cececf"}/>
                          <h1 className='text-[#cececf] font-bold text-left text-sm'>Link my EVM wallet to my ArConnect</h1>
                      </div>
                    </div> 
                    
                    </div>
                    
                    <div className='flex justify-center flex-col items-center w-full'>
                      <Link href={ARCONNECT_DOWNLOAD_LINK} >
                          <a target="_blank" rel="noopener noreferrer" onClick={() => setstep(3)}
                            className="cursor-pointer bg-[#1273ea] w-full h-14 justify-center items-center flex relative flex-row rounded-lg text-white font-bold text-lg" >
                              <div className='flex justify-center items-center'>
                                <p className='text-center'>Download and Setup ArConnect</p>
                                <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                              </div>
                          </a>
                      </Link>

                      <p onClick={() => setstep(0)} className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>
                          I will set it up later
                      </p>
                    </div>
                </section>
              </>
            )
          }
        
          {
// ARK PROTOCOL
// 
            step === 5 && (
              <>
                <section className='relative h-screen  '>
                  <div className='flex flex-row justify-between sm:space-x-60  mb-4 items-center mt-32'>
                    <BackButton setstep={setstep} step={step - 1}/>
                  </div>
                  <div className='mt-6 mb-20'>
                    <LineBarTracker step={3}  total_step={3}/>
                  </div>

                  <div className="flex flex-col justify-center text-center mb-16">
                    <h1 className='text-3xl font-bold mb-3'>You're all set 🎉</h1>
                    <p className='text-center font-medium text-[#3a3a3a] text-sm'>
                      You've successfully claimed your first<br /> ARpage for <span className='font-bold'>@{arLabel}</span>.
                    </p>
                    <p className='text-center font-medium text-[#3a3a3a] text-sm'>
                      After the event, you will be granted<br /> access to edit your profile.
                    </p>
                  </div>
                  
                  <section>
                    <div className='space-y-4 mb-3'>
                      <h1 className='text-xl text-center text-[#3a3a3a] font-medium'>Get the latest news on DecentLand.</h1>
                      <Link href={TWITTER_DL} >
                        <a target="_blank" rel="noopener noreferrer" className=' flex flex-row rounded-xl px-5 py-4 w-full bg-[#edecec] justify-between items-center'>
                          <div className='flex flex-row space-x-3.5 items-center'>
                            <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                            <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Follow us Twitter</h1>
                            <BsTwitter height={20} width={20} color="#666"/>
                          </div>
                          <ArrowTopRightOnSquareIcon height={22} width={22} color="#666" strokeWidth={2} />
                        </a>
                      </Link>
                      <Link href={DISCORD_JOIN} >
                        <a target="_blank" rel="noopener noreferrer" className=' flex flex-row rounded-xl px-5 py-4 w-full bg-[#edecec] justify-between items-center'>
                          <div className='flex flex-row space-x-3.5 items-center'>
                            <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                            <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Join our Discord</h1>
                            <BsDiscord height={20} width={20} color="#666"/>
                          </div>
                          <ArrowTopRightOnSquareIcon height={22} width={22} color="#666" strokeWidth={2} />
                        </a>
                      </Link>
                      <Link href={GITHUB_DL} >
                        <a target="_blank" rel="noopener noreferrer" className=' flex flex-row rounded-xl px-5 py-4 w-full bg-[#edecec] justify-between items-center'>
                          <div className='flex flex-row space-x-3.5 items-center'>
                            <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                            <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Contributed to our Github Repo</h1>
                            <BsGithub height={20} width={20} color="#666"/>
                          </div>
                          <ArrowTopRightOnSquareIcon height={22} width={22} color="#666" strokeWidth={2} />
                        </a>
                      </Link>
                    </div>

                 

                  <div className='flex justify-center flex-col items-center relative top-10'>
                    {/*  */}
                      <Link href={"/"}>
                        <button onClick={() => setstep(5)}
                          className="cursor-pointer bg-[#1273ea] w-full h-14 justify-center items-center flex relative flex-row rounded-lg text-white font-bold text-lg" >
                            <div className='flex justify-center items-center'>
                              <p className='text-center'>Go back to Home Page</p>
                              <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                            </div>
                        </button>
                      </Link>
                    </div>
                  </section>
                </section>
              </>
            )
          }
        
         
        </div>
      </div>
    </>
  )
}

export default Claim
