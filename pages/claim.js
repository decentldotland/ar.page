import axios from 'axios';
import React, { useState } from 'react';
import Head from 'next/head'

const claim = () => {

  const [hidden, setHidden] = useState(false);
  const [evmAddress, setEvmAddress] = useState('');
  const [arLabel, setArLabel] = useState('');
  const EvmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const ArLabelRegex = /^@?(\w){1,15}$/

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(evmAddress)
    console.log(arLabel)
    // if (regex.test(arLabel)) {
    //   axios.post('api.exm/claim', {
    //     evmAddress,
    //     arLabel
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // } else {
    //   alert('Invalid AR label');
    // }
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
            <h1 className="text-3xl font-bold text-black/90 mb-6">Reserve your AR label!</h1>
            <form className="flex flex-col items-center justify-center max-w-[280px] md:max-w-[380px] mx-auto gap-y-3" onSubmit={(e) => onSubmit(e)}>
              <input className="input input-primary rounded-xl px-2.5 w-full placeholder:text-center" type="text" placeholder="Your EVM address" onChange={(e) => setEvmAddress(e.target.value)} />
              {evmAddress && !EvmAddressRegex.test(evmAddress) && <p className="text-red-500 text-xs">Invalid EVM address</p>}
              <input className="input input-primary rounded-xl px-2.5 w-full placeholder:text-center" type="text" placeholder="Your AR label" onChange={(e) => setArLabel(e.target.value)} />
              {arLabel && !ArLabelRegex.test(arLabel) && <p className="text-red-500 text-xs">Invalid AR label</p>}
              <button className="btn btn-primary !rounded-2xl px-2.5 w-full !justify-center" type="submit">Reserve</button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default claim