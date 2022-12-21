import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import React from 'react'
import { SetterOrUpdater } from 'recoil';
import MainNextButton from '../buttons/MainNextButton';
import ConnectedArweaveWallet from './ConnectedArweaveWallet';
import { walletModifier } from "../../src/utils/walletModifier";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useETH } from '../../src/utils/eth';
import { NETWORKS } from '../../src/constants';
import axios from 'axios';
import { permissions } from '../../src/utils/arconnect';
import { ONBOARDING_TIMEOUT } from '../../src/constants';
import { getOnboardingStepNumeric, setOnboardingStep } from '../../src/utils/onboardingHelper';

interface ConnectAdditionalAccountsInterface {
    addressAr: string | undefined;
    addressNear: string | null;
    handleOnboarding: SetterOrUpdater<number>;
    exmObj: any;
}

interface AccountButtonInterface {
    walletAddress: string | null;
    chainName: string;
    imgSrc: string;
    imgAlt: string;
    imgMarkup: string;
    divMarkup?: string;
    handleConnect: () => void;
}

const AccountButton = (props: AccountButtonInterface) => {
    return (
        <div onClick={props.handleConnect} 
          className={'cursor-pointer bg-[#f5f5f5] justify-between mt-[40px] py-2 flex items-center px-3 rounded-2xl '
          +(props.divMarkup ? props.divMarkup : '')}>
            <div className='flex items-center space-x-2.5'>
                <div className={"flex items-center justify-center p-[2px] "+props.imgMarkup}>
                    <Image src={props.imgSrc} height={40} width={40} alt={props.imgAlt}/>
                </div>
                <p className='text-sm font-semibold text-left '>
                    { props.walletAddress ? walletModifier(props.walletAddress, 5, 8) : props.chainName }
                </p>
            </div>
            {props.walletAddress ? (
                <XMarkIcon height={26} width={26} color='#6a6b6a' strokeWidth={2} className=' '/>
            ) : (
                <PlusIcon height={22} width={22} color='#6a6b6a' strokeWidth={2} className='relative left-4 rounded-full p-1 bg-[#d9d9d9] w-[30px] h-[30px] '/>
            )}
        </div>
    );
}



function ConnectAdditionalAccounts(props: ConnectAdditionalAccountsInterface) {

    const [linked, setLinked] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);
    
    const eth = useETH();

    const handleLinkConfiguration = async (arweaveAddr: string, exmObj: any, chainId: number) => {

      // Assure the the network info has been fetched before proceeding
      if(chainId) {
        await setClicked(true);
        //Connect Arweave
        const contract = await eth.createLinkIdentityContract(chainId);
        await window.arweaveWallet.connect(permissions, { name: "ArPage" });
        const tx = await contract.linkIdentity(arweaveAddr);
        
        // Create Arweave Signature
        const arInfo = await window.arweaveWallet.getPermissions();
        const data = new TextEncoder().encode(`my pubkey for DL ARK is: ${exmObj.jwk_n}`);
        const signature = await window.arweaveWallet.signature(data, {
          name: "RSA-PSS",
          saltLength: 32,
        });
        const signedBase = Buffer.from(signature).toString("base64");
        if (!signedBase) throw new Error("ArConnect signature not found");
        
        // Populate EXM req body
        exmObj.address = eth.address;
        exmObj.network = NETWORKS[chainId].networkKey;
        exmObj.verificationReq = tx?.hash;
        exmObj.sig = signedBase;
        //Create second sig

        // Await Link Transaction Result & Post to EXM Api
        tx.wait().then(async () => {
          const result = await axios.post(`/api/exmwrite`, exmObj);
          setLinked(true);
          setClicked(false);
          // Set timeout notifying user of connectivity & auto-proceed
          setTimeout(function(){
            setOnboardingStep("5");
            props.handleOnboarding(getOnboardingStepNumeric());
         }, ONBOARDING_TIMEOUT);
          
        }).catch((e: any) => console.log(e));
      }
    }
    
    return (
        <div className='relative h-full flex flex-col w-full sm:w-[440px] px-5 justify-between'>
            <div className='md:relative md:top-32'>
                <div className='mt-[60px]'>
                    <ConnectedArweaveWallet
                        addressAr={walletModifier(props.addressAr, 5, 8)}
                    /> 
                </div>
                <div className='mt-[18px]'>
                    <h3 className='text-4xl text-left font-bold '>
                        Connect More Accounts
                    </h3>
                    <p className="text-sm text-[#888] mt-3">
                        We currently support <span className="text-violet-500">Ethereum</span>, <span className="text-green-400">EVMOS</span> and <span className="text-red-300">Avalanche</span>. Connect using listed chain. We will cross-check your address across supported chains.
                    </p>
                </div>
                <section className='space-y-3.5'>
                    <AccountButton
                        chainName={"Near"}
                        walletAddress={props.addressNear}
                        imgSrc={'/icons/NEAR_WHITE.svg'}
                        imgAlt={'Near Logo'}
                        imgMarkup={'shadow-2xl bg-black rounded-xl'}
                        handleConnect={() => ""}
                    />
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
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
                                  'style': { opacity: 0, pointerEvents: 'none', userSelect: 'none',},
                                })}
                              >
                                  {(() => {
                                    // EVM chains button 
                                    if (!connected) {
                                      return (
                                        <>
                                          <AccountButton
                                            chainName={"EVM-Compatible Chains"}
                                            walletAddress={null}
                                            imgSrc={'/icons/ETHEREUM.svg'}
                                            imgAlt={'Ethereum Logo'}
                                            imgMarkup={'shadow-2xl bg-slate-300 rounded-xl'}
                                            handleConnect={openConnectModal}
                                          />
                                          <span 
                                            onClick={() => {
                                              (clicked || linked) ? 
                                                '' 
                                              : 
                                                setOnboardingStep("5");
                                                props.handleOnboarding(getOnboardingStepNumeric());
                                              }} 
                                            className="w-full"
                                          >
                                            <MainNextButton 
                                                btnName='or Continue'
                                                className='mt-[40px]'
                                                disabled={false}
                                            />
                                          </span>
                                        </>
                                      );
                                    }
                                    // Wallet connect, not linked
                                    if(!linked) {
                                      return (
                                        <>
                                          <AccountButton
                                            chainName={!clicked ? account.displayName + " connected. Click to link." : "Linking..."}
                                            walletAddress={null}
                                            imgSrc={'/icons/ETHEREUM.svg'}
                                            imgAlt={'Ethereum Logo'}
                                            imgMarkup={'shadow-2xl bg-slate-300 rounded-xl '+(clicked ? 'animate-pulse' : '')}
                                            //@ts-ignore
                                            handleConnect={() => handleLinkConfiguration(props.addressAr, props.exmObj, chain.id)}
                                          />
                                          <span onClick={() => {
                                            (clicked || linked) ? 
                                              '' 
                                            : 
                                              setOnboardingStep("5");
                                              props.handleOnboarding(getOnboardingStepNumeric());
                                            }} 
                                            className="w-full"
                                          >
                                            <MainNextButton 
                                                btnName='or Continue'
                                                className='mt-[40px]'
                                                disabled={(clicked || linked || connected)}
                                            />
                                          </span>
                                        </>
                                      );
                                    // Wallet linked, go to next step
                                    } else {
                                      return (
                                        <>
                                          <AccountButton
                                            chainName={"Linked. Proceeding."}
                                            walletAddress={null}
                                            imgSrc={'/icons/ETHEREUM.svg'}
                                            imgAlt={'Ethereum Logo'}
                                            imgMarkup={'shadow-2xl bg-slate-300 rounded-xl'}
                                            divMarkup={'border-4 border-emerald-400'}
                                            handleConnect={() => ''}
                                          />
                                          <span onClick={() => {
                                            (clicked || linked) ? 
                                              '' 
                                            : 
                                              setOnboardingStep("5");
                                              props.handleOnboarding(getOnboardingStepNumeric());
                                            }} 
                                            className="w-full"
                                          >
                                            <MainNextButton 
                                                btnName='or Continue'
                                                className='mt-[40px]'
                                                disabled={(clicked || linked || connected)}
                                            />
                                          </span>
                                      </>
                                      );  
                                    }
                                  })()}
                              </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </section>

            </div>
        </div>
  )
}

export default ConnectAdditionalAccounts;