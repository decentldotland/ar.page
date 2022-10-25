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

  const checkOwnedLabelsList = () => existingANSNames.map(u => u.ownedLabels).flat().map(l => l.label).find(l => l === arLabel.toLowerCase());

  const validateLabel = () => {
    if (arLabel.length === 0) return ''
    if (arLabel.length > 15) return 'Username is too long'
    if (arLabel.toLowerCase() === 'ar') return 'ar is reserved'
    if (!ArLabelRegex.test(arLabel)) return 'Invalid label, try another one.'
    if (arLabelReserved() || checkOwnedLabelsList()) return 'Username is already taken, try another one.'
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
      // setste[]
      setstep(1)
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
      setstep(4)
      console.log('SUCCESS🏗️🏗️🙏😄😄😄😄')
    })
    .catch((err) => {
      setInvalidLabel('Request failed, try again later')
      console.log(err);
    })
  }

  // If the user is not connected then 
  useEffect(() => {
    if (!isConnected) setstep(0)
  }, [isConnected])
  
  // temporary 
  const [chainUrlId, setChainUrlId] = useState('')
  const [ensAvatar, setEnsAvatar] = useState('')
  const [lineBarSteps, setLineBarSteps] = useState(0)

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
      <div className="flex h-full items-start font-sans px-10 ">
        <div className="flex flex-col items-center justify-center max-w-[420px] mx-auto gap-y-3">

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
              <section className='mt-24 w-full h-full justify-start'>
                <div className='flex flex-row  mb-4'>
                  <BackButton setstep={setstep} step={step - 1}/>
                </div>
                <h1 className='text-3xl font-bold mb-3'>Welcome to Arweave <br/> Name Service!🎉</h1>
                <div className='mt-2 rounded-sm h-[1px]  bg-[#d9d9d9]'></div>
                <div className="text-sm">
                  <p className='text-left text-[#8e8e8f] mt-6'>Whether you are beginner or experienced, we will 
                  we will walk you through the whole process of setting your Arweave Wallet and connecting your EVM
                  wallet to Arweave using the Ark Protocol
                    to guide you along the process.</p>
                  <p className='text-left text-[#8e8e8f] mt-3'>if needed, feel free to skip some steps.</p>
                  <p className='text-left text-[#8e8e8f] mt-3 mb-4'>If you have any question, please reach out to us on Discord 
                    and we will guide you as much as we can. </p>
                </div>
                <div className=''>
                  <ul className='space-y-2 text-sm'>
                    <li className='flex flex-row space-x-2.5 items-center text-[#6a6b6a] '>
                      <ComputerDesktopIcon height={20} width={20} color={"#6a6b6a"} strokeWidth={2} />
                      <p>Completed on: <span className='font-bold text-[#6a6b6a] '>Desktop</span></p>
                    </li>
                    <li className='flex flex-row space-x-2.5 items-center text-[#6a6b6a]'>
                      <ClockIcon height={20} width={20} color={"#6a6b6a"} strokeWidth={2} />
                      <p>Approx. time to complete:<span className='font-bold text-[#6a6b6a] '> ~5 min</span></p>
                    </li>
                  </ul>
                  
                </div>
                
                
              </section>
            )
          }

          {
// CLAIMING PROCESS, is set to step 2 since the browser defaults to 2 after refresh 
            step === 2 && (
              <section className='mt-24 '>
                <div className='flex flex-row space-x-60 justify-between'>
                  <BackButton setstep={setstep} step={step - 1}/>
                  <NextButton setstep={setstep} step={step + 1}/>
                </div>
                <div className='mt-6 mb-5'>
                  <LineBarTracker step={lineBarSteps}  total_step={3}/>
                </div>
                <h1 className='text-3xl font-bold mb-3'>Let's get you started <br/> with Arweave and ANS.</h1>
                <p className='text-left text-[#8e8e8f]'>Claiming your first AR Page/ANS can be quite <br /> overwhelming. But don't worry! We're here to <br />
                  to guide you along the process.</p>
                
                <OverviewSteps />
                <div onClick={() => setLineBarSteps(lineBarSteps + 1)}>
                  <CheckList step={lineBarSteps} />
                </div>
                
              </section>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Claim
