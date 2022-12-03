import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import React from 'react'
import { SetterOrUpdater, useRecoilState } from 'recoil';
import MainNextButton from '../buttons/MainNextButton';
import ConnectedArweaveWallet from './ConnectedArweaveWallet';
import { walletModifier } from "../../src/utils/walletModifier";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface ConnectAdditionalAccountsInterface {
    addressAr: string | undefined;
    addressNear: string | null;
    handleOnboarding: SetterOrUpdater<number>;
}

interface AccountButtonInterface {
    walletAddress: string | null;
    chainName: string;
    imgSrc: string;
    imgAlt: string;
    imgMarkup: string;
    handleConnect: () => void;
}

const AccountButton = (props: AccountButtonInterface) => {
    return (
        <div onClick={props.handleConnect} className='cursor-pointer bg-[#f5f5f5] justify-between mt-[40px] py-2 flex items-center px-3 rounded-2xl'>
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
                        We currently support <span className="text-violet-500">Ethereum</span> and <span className="text-red-300">Avalanche</span>. Connect using either chain. We will cross-check your address across both chains
                    </p>
                </div>
                <section className='space-y-3.5'>
                    <AccountButton
                        chainName={"Near"}
                        walletAddress={props.addressNear}
                        imgSrc={'/icons/NEAR_WHITE.svg'}
                        imgAlt={'Near Logo'}
                        imgMarkup={'shadow-2xl bg-black rounded-xl'}
                        handleConnect={() => alert('I work')}
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
                                    'style': {
                                      opacity: 0,
                                      pointerEvents: 'none',
                                      userSelect: 'none',
                                    },
                                  })}
                                >
                                  {(() => {
                                    if (!connected) {
                                      return (
                                        <AccountButton
                                          chainName={"EVM-Compatible Chains"}
                                          walletAddress={null}
                                          imgSrc={'/icons/ETHEREUM.svg'}
                                          imgAlt={'Ethereum Logo'}
                                          imgMarkup={'shadow-2xl bg-slate-300 rounded-xl'}
                                          handleConnect={openConnectModal}
                                        />
                                      );
                                    }
                                    return (
                                      <AccountButton
                                        chainName={"EVM-Compatible Chains"}
                                        walletAddress={account.address}
                                        imgSrc={'/icons/ETHEREUM.svg'}
                                        imgAlt={'Ethereum Logo'}
                                        imgMarkup={'shadow-2xl bg-slate-300 rounded-xl'}
                                        handleConnect={openConnectModal}
                                      />
                                    );
                                  })()}
                                </div>
                              );
                        }}
                    </ConnectButton.Custom>
                </section>
                <button onClick={() => props.handleOnboarding(6)} className="w-full">
                        <MainNextButton 
                            btnName='Continue'
                            className='mt-4'
                        />
                </button>
            </div>
        </div>
  )
}

export default ConnectAdditionalAccounts;

/*
                    <AccountButton
                        chainName={"EVM-Compatible Chains"}
                        walletAddress={null}
                        imgSrc={'/icons/ETHEREUM.svg'}
                        imgAlt={'Ethereum Logo'}
                        imgMarkup={'shadow-2xl bg-slate-300 rounded-xl'}
                        handleConnect={() => alert('I work')}
                    />



                    <div style={{ display: 'flex', gap: 12 }}>
                                            <button
                                              onClick={openChainModal}
                                              style={{ display: 'flex', alignItems: 'center' }}
                                              type="button"
                                            >
                                              {chain.hasIcon && (
                                                <div
                                                  style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                  }}
                                                >
                                                  {chain.iconUrl && (
                                                    <img
                                                      alt={chain.name ?? 'Chain icon'}
                                                      src={chain.iconUrl}
                                                      style={{ width: 12, height: 12 }}
                                                    />
                                                  )}
                                                </div>
                                              )}
                                              {chain.name}
                                            </button>
                          
                                            <button onClick={openAccountModal} type="button">
                                              {account.displayName}
                                              {account.displayBalance
                                                ? ` (${account.displayBalance})`
                                                : ''}
                                            </button>
                                          </div>


*/