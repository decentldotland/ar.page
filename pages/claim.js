import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Web3 from 'web3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import { ArrowRightIcon } from '@heroicons/react/24/solid';

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
                    <button 
                      onClick={openConnectModal}
                      style={{ width: '100%'}}
                      className='bg-gray-300 hover:bg-gray-300/80 font-bold py-2 px-4 rounded-xl text-center'
                    >
                      Connect Wallet
                    </button>
                  );
                }
                return (
                  <button 
                    onClick={openAccountModal}
                    style={{ width: '100%'}}
                    className='bg-gray-300 hover:bg-gray-300/80 font-bold py-2 px-4 rounded-xl text-center'
                  >
                    {account.displayName}
                  </button>
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
      <div className="flex h-full -mt-20 items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-[420px] mx-auto gap-y-3 font-sans px-12 mt-20">
          {step === 0 && (
            <>
              {invalidEVM.length === 0 && address && <button className="self-start cursor-pointer text-gray-400 decoration-gray-400 underline" onClick={() => setstep(1)}>Next</button>}
              <div className="w-full">
                <h1 className="text-[40px] font-bold text-center mb-6">One Identity For The Permaweb</h1>
                <div className="text-lg text-center mb-6">Ar.page aggregates all your data in a single place, say hi to a new home.</div>
                <div className="bg-zinc-200/90 rounded-xl">
                  <div className="carousel mb-8 h-40">
                    <div className="carousel-item w-full flex justify-center items-center">Never gonna give you up</div>
                    <div className="carousel-item w-full flex justify-center items-center">Never gonna let you down</div>
                    <div className="carousel-item w-full flex justify-center items-center">Never gonna run around and desert you</div>
                    <div className="carousel-item w-full flex justify-center items-center">Never gonna make you cry</div>
                    <div className="carousel-item w-full flex justify-center items-center">Never gonna say goodbye</div>
                    <div className="carousel-item w-full flex justify-center items-center">Never gonna tell a lie and hurt you</div>
                  </div>
                </div>
                <CustomConnectButton
                  label="Connect"
                  showBalance={false}
                  chainStatus="icon"
                  accountStatus="address" 
                />
                <p className="text-red-500 my-2 text-center h-6">{invalidEVM}</p>
              </div>
              {/* <p>Make sure to use the address that will receive the appropriate event Poap!</p> */}
            </>
          )}
          {step === 1 && (
            <>
              <button className="self-start cursor-pointer text-gray-400 decoration-gray-400 underline" onClick={() => setstep(0)}>Back</button>
              <div className="text-[32px] font-bold">Reserve a username, reedem it later</div>
              <div className="text-sm self-start mb-6">You can only reserve one username per account</div>
              <form className="w-full mt-3" onSubmit={onSubmit}>
                <div className="mb-6">
                  <div className="w-full">
                    <input
                      className="w-full border-2 border-gray-300 bg-gray-300/90 outline-gray-400 p-2 rounded-lg"
                      placeholder="Enter your desired label"
                      value={arLabel}
                      onChange={(e) => setArLabel(e.target.value)}
                    />
                  </div>
                  <p className={`text-red-500 my-2 text-center h-6`}>
                    {invalidLabel}
                  </p>
                  <p className="text-xs ">Labels can only have numbers from 0-9 and <span className="font-semibold">lowercase</span> English letters. 2 letters minimum, 15 max.</p>
                </div>
                <button
                  className="!bg-gray-300/90 outline-gray-400 text-black font-semibold py-2 rounded-2xl px-4 cursor-pointer w-full !justify-center"
                  type="submit"
                  disabled={invalidEVM.length > 0 || invalidLabel.length > 0}
                >
                  {loadingWrite ? "Loading...": "Reserve"}
                </button>
              </form>
            </>
          )}
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