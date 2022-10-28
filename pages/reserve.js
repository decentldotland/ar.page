import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Web3 from 'web3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChainMismatchError, useAccount, useConnect, useDisconnect } from 'wagmi'
import { ArrowRightIcon, XCircleIcon } from '@heroicons/react/24/solid';
import {ArrowLongRightIcon, ArrowTopRightOnSquareIcon, CheckCircleIcon, CheckIcon, ChevronUpIcon, DocumentDuplicateIcon, EllipsisVerticalIcon} from '@heroicons/react/24/outline'
import { BlueButtonNext } from '../components_new/reservation/BlueButtonNext';
import { UserAccountDetails } from '../components_new/reservation/UserAccountDetails';
import BackButton from '../components_new/reservation/BackButton';
import {EyeIcon} from '@heroicons/react/24/solid'
import { CircularProgress, Snackbar } from '@mui/material';
import UserReservedHistory from '../components_new/reservation/UserReservedHistory';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { getAllPoaps } from '../src/utils';


const web3 = new Web3(Web3.givenProvider);

const Reserve = () => {

  // ETH address
  const { address, isConnected, connector } = useAccount();
  const [loadingReservations, setLoadingReservations] = useState(true)
  const [loadingWrite, setLoadingWrite] = useState(false)
  const [step, setstep] = useState(0);

  // For checking all existing labels
  const [reservations, setReservations] = useState([]);
  const [existingANSNames, setExistignANSNames] = useState([]);
  const [numOfReserved, setnumOfReserved] = useState(0)
  const [evmAddress, setEvmAddress] = useState('');
  const [invalidEVM, setInvalidEVM] = useState('')
  const [arLabel, setArLabel] = useState('');
  const [invalidLabel, setInvalidLabel] = useState('');
  const [invalidPOAP, setInvalidPOAP] = useState('')
  const [validPoap, setValidPoap] = useState(false)
  const [reservedUserDetails, setReservedUserDetails] = useState('')
  const EvmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const ArLabelRegex = /^[a-z0-9]{2,15}$/;
  const [userPoaps, setUserPoaps] = useState([])
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

    if (userPoaps == undefined) {
      setValidPoap(false)
      return setInvalidPOAP('Unable to find valid "ANS Early Adopter: ETH Lisbon 2022 POAP"')
    }
    if (userPoaps.length > 0) {
      for (let i = 0; i < userPoaps.length; i +=1) {
        if(userPoaps[i].tokenId === "5809751") {
          console.log(i.tokenId)
          setValidPoap(true)
          return setInvalidPOAP('You are eligible to our AirDrop Event!')
        } else {
          setValidPoap(false)
          return setInvalidPOAP('Unable to find valid "ANS Early Adopter: ETH Lisbon 2022 POAP"')
        }
      }
    }
  }, [userPoaps])
  // Check if the user owns the valid POAP
  // POAP id = "5809751"
  // test accont = "0x2a01d339d3ab41b2d8b145b5df8586032d9961c6"
  useEffect(() => { 
    if (isConnected) {
      getAllPoaps(evmAddress).then(res => { 
        setUserPoaps(res)
      })
    }
  }, [evmAddress, isConnected])
// console.log(userPoaps)
  useEffect(() => {
    const g = localStorage.getItem("EthLisbonEvent2022")
    if (g) {
      setstep(0)
      return
    }
    axios.get('/api/exmread').then(res => {
      setReservations(res.data?.requests);

    })
    axios.get('/api/ansusers').then(res => {
      setExistignANSNames(res.data?.res)
    })

  }, [])

  // Check if theere's sufficient addresses 
  useEffect(() => {
    axios.get('api/exmread').then(res => {
      const num = res.reserved
      setnumOfReserved(num);
      if (num === 200) return setInvalidEVM('Reached maximum number of signups!')
    })
  }, [])

  const [userDetails, setUserDetails] = useState([])
  useEffect(() => {
    if (isConnected ) { 
      let details =  reservations.find(l => l.evm_address === address);
      setUserDetails(details)
      console.log(details)
    }
  }, [isConnected, reservations]) 

  // Fetch Datasource 
  useEffect(() => {
    axios.get('api/exmread').then(res => {
      const num = res.data?.requests
      setReservations(num);
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
      setReservedUserDetails(res.data?.requests);
      setnumOfReserved(res.data?.reserved)
      console.log(res)
      setstep(4)

    })
    .catch((err) => {
      setInvalidLabel('Request failed, try again later')
      toast(
      <p className='font-sans'>❌ Something went wrong, please try again.</p>, {duration: 3000})
      console.log(err);
      // If it fails it should inform the user 
      setstep(2)
    })
  }


  // If the user is not connected then 
  useEffect(() => {
    if (!isConnected) setstep(0)
  }, [isConnected])
  

  // temporary 
  const [chainUrlId, setChainUrlId] = useState('')
  const [ensAvatar, setEnsAvatar] = useState('')

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
                    <button className= {` w-[276px] h-14 
                    ${invalidEVM.length === 0 ? ('bg-[#1273ea]') : (' bg-gray-400')}

                    items-center rounded-lg text-white font-bold text-lg`}
                    onClick={openConnectModal}
                    disabled={invalidEVM.length !== 0}
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
                    <button className={` mt-9  w-[276px] h-14 items-center 
                      ${invalidEVM.length === 0 && validPoap ? ('bg-[#1273ea]') : (' bg-gray-400')}
                        rounded-lg text-white font-bold text-lg `}
                      onClick={() => setstep(2)}
                      disabled={invalidEVM.length !== 0 || !validPoap}
                    
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
      <Toaster position='top-center'/>

      <div className="flex h-full items-start font-sans px-6 ">
        <div className="flex flex-col items-center justify-center max-w-[420px] mx-auto gap-y-3">

          {
// 1. WELCOME SCREEN
          step === 0 && (
            <>
              {/* {invalidEVM.length === 0 && address && <button className="self-start cursor-pointer text-gray-400 decoration-gray-400 underline" onClick={() => setstep(1)}>Next</button>} */}
              <section>
                <div className="w-full mt-20 relative ">
                  <h1 className="text-[45px] font-bold text-center mb-7 mt-10">Hello Hackers👋</h1>
                  <p className="text-sm text-center mb-6">
                    On behalf of the whole Decent Land Team, we thank you for showing your support at ETH Lisbon 2022.
                  </p>
                  <p className="text-sm text-center mb-6">
                    By now you should have received your early access POAP token.
                  </p>
                  <p className="text-sm text-center mb-6">
                    The token is used to be part of our <span className='font-bold'>Airdrop</span> Event 
                    which gives you access to setup your ANS domains and ArPages before anyone else!
                  </p>
                  <p className="text-sm text-center mb-6">
                  As of now, <span className='font-bold text-lg'>{numOfReserved}</span> people have already signed up for our airdrop!
                  </p>
                
                </div>
              </section>
                  <div className=''>
                    <BlueButtonNext setstep={setstep} step={1} msg={"Let's go"} 
                      sub_message={"Ready to redeem the early access to your ArPage?"}/>
                  </div>
              {/* <p>Make sure to use the address that will receive the appropriate event Poap!</p> */}
            </>
          )}
          {
// 2. SECOND SCREEN
            step === 1 && (
              <>
                <div className="w-full h-screen flex flex-col justify-center text-center ">
                  <h1 className="text-[45px] font-bold mb-2">Register to get <br/>an ANS Airdrop</h1>
                  <p className='font-medium text-sm mb-10 text-[#3a3a3a]'>Only applicable to DecentLand POAP holders</p>

                  <CustomConnectButton
                    label="Connect"
                    showBalance={false}
                    chainStatus="icon"
                    accountStatus="address" 
                  />
                  <p className="text-red-500 my-2 text-center h-6">{invalidEVM}</p>
                  {
                    validPoap ? (
                      <p hidden={!isConnected} className="text-green-400 my-2 text-center h-6">{invalidPOAP}</p>

                    ) : (
                      <p hidden={!isConnected} className="text-red-500 my-2 text-center h-6">{invalidPOAP}</p>

                    )
                  }
              </div>
              </>
            )
          }
          {
// 3. STEP REGISTER A USERNAME
          step === 2 && (
            <>
              <section className="mt-24 ">
                <BackButton setstep={setstep} step={step - 1}/>
                <h1 className="text-[32px] font-bold mt-5">Register a username, and redeem it later.</h1>
                <p className="text-sm self-start mb-6 text-[#8e8e8f]">You can only register with one username <br/>per account.</p>
                
                <p className="text-sm text-left text-[#6a6b6a]"> 
                  <span className='font-bold'>Remember: </span>
                  You won't be able to change this later.
                </p>
                
                <form className="w-full mt-3" onSubmit={onSubmit}>
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
                          invalidLabel.length === 0 ? (
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
                      {invalidLabel}
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
                <div hidden={invalidLabel.length > 1 || arLabel.length === 0 } >
                  <BlueButtonNext setstep={setstep} step={3} msg={"Proceed to register name"} />
                </div>
              </section>
            </>
          )}

          {
// STEP 3
            step === 3 && (
              <section className={loadingWrite ? 'absolute h-screen bottom-0 w-screen z-50 bg-[#B3B2B3]/25  ' : ''}>
                <div className='flex flex-col items-center mt-40'>
                    <h2 className='text-xl font-medium mb-7 text-[#3a3a3a]'>Your username</h2>
                    <h1 className='font-bold text-4xl mb-4'>@{arLabel}</h1>
                    {/* Go back to registration page  */}
                    <p onClick={() => setstep(2)} className='cursor-pointer font-medium text-sm text-[#1273ea] text-left hover:underline'>Change username</p>
                    
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
          {
// STEP 4 CONGRATULATONS ....
            step === 4 && (
              <>
                <section className=''>
                    <div className='mt-40 flex-col flex justify-center '>
                      <div className="flex-col relative w-full justify-center items-center">
                        <h1 className="text-3xl font-bold text-black mb-5 text-center">Congratulations!🎉 <br/> You are the 
                        
                        {/* doing it this way due to errors amounted just from fetching this value */}
                        <span className="text-transparent bg-clip-text text-4xl bg-gradient-to-r from-fuchsia-600 to-blue-600 mr-1"> {reservations.length + 1} 
                        </span> of 200 who will receive an AirDrop!<br/> 
                        </h1>
                        <h1 className='text-[#3a3a3a] text-base mb-5 text-center'><span className='font-bold'>@{arLabel}</span> is now reserved under:</h1>
                          <div className='relative left-9 sm:left-20 '>
                            <UserAccountDetails 
                              upperMessage='Your Wallet'
                              address={address} 
                              chainIconUrl={chainUrlId}
                              displayImg={ensAvatar}
                              walletName={connector?.name}
                            />
                          </div>
                      </div>
                      <div className='mt-10'>
                        <h1 className='font-semibold text-xl text-left text-[#6a6b6a]'>History</h1>
                        <div className='mt-2 rounded-sm h-[1px] w-full bg-[#d9d9d9]'></div>
                      </div>
                      <Link className='relative right-10' href={"https://api.exm.dev/read/QHJ3EeCJokrf1nbnhMgoK4P_hu9xLPK5UfJww23HFsk"} >
                        <a target="_blank" rel="noopener noreferrer" className='flex flex-row justify-center'>
                          <UserReservedHistory label={arLabel} address={address} timestamp={userDetails?.timestamp }/>
                        </a>
                      </Link>
                    </div>

                    <BlueButtonNext setstep={setstep} step={5} msg={"Next"} />
                  </section>
              </>
            )
          }
          {
            step === 5 && (
              <>
              <section className=''>
                
                <div className='mt-32 flex flex-col '>
                  <h1 className="text-3xl font-bold text-black mb-6  text-left">
                    Would you like to setup <br/> your ArPage now?</h1>
                  <div className='text-[#6a6b6a] relative space-y-1'>
                    <h2 className='text-sm'>
                      To setup your ArPage, you will need the following:
                    </h2>
                    <ul className='ml-2 space-y-1'>
                      <li>
                          <p className="text-xs ">
                            <span className='font-bold'>• </span> ArConnect Wallet <span className='font-bold'>(available only on Desktop)</span>
                          </p>
                      </li>
                      <li>
                          <p className="text-xs ">
                          <span className='font-bold'>• </span> Ethereum based wallet 
                          </p>
                      </li>
                    </ul> 
                  </div>
                </div>
                  
              </section>
                <div className='flex flex-col w-[420px] justify-center items-center absolute bottom-10 px-6'>
                  <p className="text-sm text-left mb-6  ">
                    We <span className='font-bold'>recommend</span> that you <span className='font-bold'>complete</span> this stage on your 
                    <span className='font-bold'> Desktop. </span>Your username is safe with us.
                  </p>
                  <Link href={"/claim"}>
                    <button className=" bg-[#1273ea] w-full h-14 items-center relative rounded-lg text-white font-bold text-lg" 
                      onClick={() => setstep(6)}>
                        <div className='flex justify-center items-center'>
                          <p className='relative text-center '>Let's do it</p>
                          <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                        </div>
                    </button>
                  </Link>
                  <p onClick={() => setstep(0)} className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>I will set it up later</p>
                </div>
              </>

            )
          }

          {
// CLAIMING PROCESS, is set to step 2 since the browser defaults to 2 after refresh 
            
          }
        </div>
      </div>
    </>
  )
}

export default Reserve
