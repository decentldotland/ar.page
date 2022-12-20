import { useState } from 'react';
import Link from 'next/link';
import { Snackbar } from '@mui/material';
import { BsGithub, BsTwitter, BsInstagram, BsGlobe2 } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { GenericLabelInterface, GenericUsernameInterface, Links, OwnedLabel } from '../../src/types';
import { isDarkMode } from '../../atoms';

const colorProps = `bg-primary/10 text-primary `;
const avaxColor = "bg-[#E84040]/20 text-[#454a75] font-bold";
const ethColor = `bg-[#b3b2b3]/40 text-[#454a75] font-bold`;
const arColor = "bg-[#000000] text-white font-bold";
const nearColor = "bg-white text-[#454a75] font-bold border-2 border-black";
const evmosColor = "bg-purple-200 text-[#454a75] font-bold";
const urbitColor = "bg-emerald-400 text-[#454a75] font-bold";
const iconProps = {size: 19, color: "#1273ea"};
const lenProps = "bg-[#abfe2c] text-[#05501F] bg-[#aafe2ccb]";

export const arLabels = (arweave_address: string, ownedLabels: OwnedLabel[]) => ownedLabels.map((owned: OwnedLabel) => {
  return {
    username: owned.label + '.ar',
    classes: arColor,
    selected: false,
    link_to: 'https://v2.viewblock.io/arweave/address/' + arweave_address,
    icon: <Image
      width={19}
      height={19}
      className="bg-black rounded-full"
      src={"/icons/ARWEAVE.svg"}
      alt=""
      quality={100} />,
    hovertext: `Scarcity: ${owned.scarcity}`
  }
}) || [];


export const avaxLabel = (AVVY:string|undefined) => {
  if (!AVVY) return null
  return {
    username: AVVY,
    classes: avaxColor,
    link_to: "https://app.avvy.domains/domains/" + AVVY,
    selected: false,
    icon: 
    <div className='shadow-2xl flex items-center bg-[#E84040] rounded-lg '>
      <Image
        width={36}
        height={36}
        src="/icons/AVALANCHE.svg"
        alt=""
        className=''
        quality={50}
      />
    </div>
  }
}

export const ethLabel = (ENS:string|undefined) => {
  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  let dark_mode = `${isDark ? ('bg-[#8a92b2]/60 text-white') : (ethColor)} `;

  if (!ENS) return null;
  return {
    username: ENS,
    classes: dark_mode,
    link_to: "https://etherscan.io/enslookup-search?search=" + ENS,
    selected: false,
    icon: <div className={'shadow-2xl flex items-center bg-[#b3b2b3] rounded-lg p-1'}>
      <Image
        height={28}
        width={28}
        src="/icons/ETHEREUM.svg"
        alt=""
        quality={100}
      />
    </div> 
    
  }
}

export const lensLabel = (lens:string |undefined) => {
  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  let dark_mode = `${isDark ? ('bg-[#8a92b2]/60 text-white') : (ethColor)} `;

  if (!lens || lens?.length == 0) return null;

  const lensLabel = lens[0]?.replace("@", "");
  return {
    username: lensLabel,
    classes: lenProps,
    link_to: `https://lenster.xyz/u/${lensLabel}` ,
    selected: false,
    icon: <Image
      height={28}
      width={28}
      src="/icons/LENS.svg"
      alt=""
    />
  }
}

export const ansLabel = (ANS:string|undefined) => {
  if (!ANS) return null;
  return {
    username: ANS,
    classes: arColor,
    link_to: "https://v2.viewblock.io/arweave/address/"+ANS,
    selected: false,
    icon: <div className={'shadow-2xl flex items-center rounded-lg p-1 bg-black'}>
      <Image
        height={28}
        width={28}
        src="/icons/ARWEAVE_WHITE.svg"
        alt="Arweave Name Address"
        quality={100}
      />
    </div> 
  }
}

export const nearLabel = (NEAR:string|undefined) => {
  if (!NEAR) return null;
  return {
    username: NEAR,
    classes: nearColor,
    link_to: "https://nearblocks.io/address/"+NEAR,
    selected: false,
    icon: <div className={'shadow-2xl flex items-center rounded-lg p-1 bg-black'}>
      <Image
        height={28}
        width={28}
        src="/chains/near_outline.svg"
        alt="Near Logo"
        quality={100}
      />
    </div> 
  }
}

export const evmosLabel = (EVMOS:string|undefined) => {
  if (!EVMOS) return null;
  return {
    username: EVMOS,
    classes: evmosColor,
    link_to: "https://app.evmos.domains/#/name/"+EVMOS,
    selected: false,
    icon: <div className={'shadow-2xl flex items-center rounded-lg p-1 bg-purple-200'}>
      <Image
        height={28}
        width={28}
        src="/chains/evmos_outline_black.svg"
        alt=""
        quality={100}
      />
    </div> 
  }
}

export const urbitLabel = (URBIT:string|undefined) => {
  if (!URBIT) return null;
  return {
    username: URBIT,
    classes: urbitColor,
    link_to: "#",
    selected: false,
    icon: <div className={'shadow-2xl flex items-center rounded-lg p-1 bg-emerald-400'}>
      <Image
        height={28}
        width={28}
        src="/icons/URBIT.svg"
        alt=""
        quality={100}
      />
    </div> 
  }
}

export const getDefaultLabels = ({  ENS, AVVY, LENS, ANS, NEAR, EVMOS, URBIT }: {
  ENS: string[], 
  AVVY: string[],
  LENS: string[],
  ANS: string[],
  NEAR: string[],
  EVMOS: string[],
  URBIT: string[]
}) => {
  // Create labels for all handles
  let avvyAddr = AVVY ? AVVY.map(address => avaxLabel(address)) : [];
  let ensAddr = ENS ? ENS.map(address => ethLabel(address)) : [];
  let lensAddr = LENS ? LENS.map(address => lensLabel(address)): [];
  let ansAddr = ANS ? ANS.map(address => ansLabel(address)): [];
  let nearAddr = NEAR ? NEAR.map(address => nearLabel(address)): [];
  let evmosAddr = EVMOS ? EVMOS.map(address => evmosLabel(address)): [];
  let urbitAddr = URBIT ? URBIT.map(address => urbitLabel(address)): [];
  


  // Consolidate handles & filter nulls
  const handleArr = [
    ...avvyAddr,
    ...ensAddr,
    ...lensAddr,
    ...ansAddr,
    ...nearAddr,
    ...evmosAddr,
    ...urbitAddr
  ].filter((l) => l !== null);

  return handleArr;
}


export function GenericLabel ({username, classes, icon}: GenericUsernameInterface) {

  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const classnames = `${classes} `;
  if (!username) return <></>
  return (
    <>
      <button onClick={() => setSelectedName(username)}  className={classnames + " cursor-pointer"}>
        <div className='flex flex-row items-center space-x-1'>
          {icon}
          <h3 className="font-inter">
            {username}
          </h3>
        </div>
      </button>
    </>
  )
}
