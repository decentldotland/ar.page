import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

const Claim = () => {

  const [hidden, setHidden] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [existingANSNames, setExistignANSNames] = useState([]);
  const [existingEVMusers, setExistingEVMUsers] = useState([]);
  const [evmAddress, setEvmAddress] = useState('');
  const [arLabel, setArLabel] = useState('');
  const EvmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const ArLabelRegex = /^[a-z0-9]{2,15}$/;

  const arLabelTaken = () => (
    reservations.find(l => l.reserved_ans === arLabel.toLowerCase()) ||
    existingANSNames.find(n => n.ownedLabels.find(l => l.label === arLabel))
  )

  const EVMAddressTaken = () => (
    reservations.find(l => l.evm_address === evmAddress) ||
    existingEVMusers.find(evm => existingANSNames.find(ans => ans.user === evm.arweave_address)?.evm_address === evm)
  )

  const validateLabel = () => {
    if (arLabel.length === 0) return ''
    if (!ArLabelRegex.test(arLabel)) return 'Invalid label'
    if (arLabelTaken()) return 'Label taken'
    return ''
  };

  const validateEVM = () => {
    if (evmAddress.length === 0) return ''
    if (!EvmAddressRegex.test(evmAddress) || !web3.utils.checkAddressChecksum(evmAddress)) return 'Invalid EVM address'
    if (EVMAddressTaken()) return 'EVM address already registered / reserved'
    return ''
  };

  const [invalidLabel, setInvalidLabel] = useState(false);
  const [invalidEVM, setInvalidEVM] = useState(false)

  useEffect(() => {
    setInvalidLabel(validateLabel())
  }, [arLabel])

  useEffect(() => {
    setInvalidEVM(validateEVM())
  }, [evmAddress])

  useEffect(() => {
    const g = localStorage.getItem("EthLisbonEvent2022")
    if (g) {
      setSuccess(true)
      return
    }
    axios.get('/api/exmread').then(res => {
      setReservations(res.data?.requests);
    })
    axios.get('/api/ansusers').then(res => {
      setExistignANSNames(res.data?.res)
    })
    axios.get('api/evmusers').then(res => {
      setExistingEVMUsers(res.data?.res)
    })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateLabel() && arLabel.length > 0)
    if (!validateEVM() && evmAddress.length > 0)

    axios.post(`api/exmwrite`, {
      "function": "reserve",
      "evm_address": evmAddress,
      "ans": arLabel.toLowerCase()
    })
    .then((res) => {
      localStorage.setItem('EthLisbonEvent2022', arLabel);
      setSuccess(true)
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <Head>
        <title>ar.page | </title>
        <meta name="description" content="Coming soon..." />
        <meta name="twitter:image" content="https://ar.page/favicon.png" />
        <meta name="twitter:title" content="ar.page" />
        <meta name="twitter:url" content="ar.page"></meta>
        <meta name="twitter:description" content="Coming soon..." />
      </Head>
      <div className="flex h-full -mt-20 items-center justify-center">
        {hidden ? (
          <h1 className="text-3xl font-bold text-black/90">Coming soon.<span onClick={() => setHidden(false)}>.</span>.</h1>
        ): (
          <div>
            {/* <div className="h-40 w-40 bg-black mx-auto text-white mb-12">QR code</div> */}
            {success ? (
              <>
                <h1 className="text-3xl font-bold text-black/90">{localStorage.getItem("EthLisbonEvent2022")} label claimed!</h1>
                <h2 className="text-xl font-medium">Thank you!</h2>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-black/90 mb-6">Reserve your AR label!</h1>
                <form className="flex flex-col items-center justify-center max-w-[280px] md:max-w-[380px] mx-auto gap-y-3" onSubmit={(e) => onSubmit(e)}>
                  <div className="w-full">
                    <input 
                      className="input input-primary rounded-xl px-2.5 w-full placeholder:text-center"
                      type="text"
                      pattern="0x[a-fA-F0-9]{40}"
                      placeholder="Your EVM address"
                      onChange={(e) => setEvmAddress(e.target.value)}
                    />
                    {invalidEVM && <p className="bg-red-300 px-1 py-0.5 rounded-full text-xs mt-3">{invalidEVM}</p>}
                  </div>
                  <p>Make sure to use the address that will receive the appropriate event Poap!</p>
                  <div className="w-full relative">
                    <input 
                      className="input input-primary rounded-xl px-2.5 w-full placeholder:text-center"
                      type="text"
                      pattern="[a-z0-9]{2,15}"
                      placeholder="Your AR label"
                      onChange={(e) => setArLabel(e.target.value)}
                    />
                    {invalidLabel && <p className="absolute top-4 right-2 bg-red-300 px-1 py-0.5 rounded-full text-xs">{invalidLabel}</p>}
                    <p className="mt-2 ">Ar labels can only have numbers from 0-9 and <span className="font-semibold">lowercase</span> English letters. 2 letters minimum, 15 max.</p>
                  </div>
                  <button 
                    className="btn btn-primary !rounded-2xl px-2.5 w-full !justify-center"
                    type="submit"
                    disabled={!(arLabel.length > 0 && evmAddress.length > 0)}
                  >
                    Reserve
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Claim