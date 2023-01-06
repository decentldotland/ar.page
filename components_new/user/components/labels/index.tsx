import { useState, useRef } from 'react';
import Link from 'next/link';
import { Snackbar } from '@mui/material';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../../atoms';
import Image from 'next/image';
import { removeHttp } from '../../../../src/utils';
import { BsGithub, BsTwitter, BsInstagram, BsGlobe2 } from 'react-icons/bs';
import { Links, OwnedLabel, GenericLabelInterface } from '../../../../src/types';
import useWindowDimensions  from "../../../../src/useWindowDimension";
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

const colorProps = `bg-primary/10 text-primary flex items-center`;
const avaxColor = "bg-[#E84040]/80 text-white flex items-center";
const ethColor = `bg-[#8a92b2]/20 text-[#454a75] flex items-center`;
const arColor = "bg-black text-white flex items-center";
const iconProps = {width: 100, height: 100, color: "#1273ea"};
const lenProps = "bg-[#abfe2c] text-[#05501F] bg-[#aafe2ccb] flex items-center";
const evmosColor = "bg-purple-400/60 text-white flex items-center";
const nearColor = "bg-white text-[#454a75] font-bold border-2 border-black flex items-center";
const urbitColor = "bg-emerald-300 text-[#454a75] font-bold flex items-center bg-opacity-75";

export const arLabels = (arweave_address: string, ownedLabels: OwnedLabel[]) => ownedLabels.map((owned: OwnedLabel) => {
  return {
    username: owned.label + '.ar',
    classes: arColor,
    canCopy: false,
    link_to: 'https://v2.viewblock.io/arweave/address/' + arweave_address,
    icon: <Image
      width={20}
      height={20}
      className="bg-white rounded-full"
      src="https://cryptologos.cc/logos/arweave-ar-logo.svg?v=023"
      alt=""
      quality={50} />,
    hovertext: `Scarcity: ${owned.scarcity}`
  }
}) || [];

export const ansLabel = (ANS:string|undefined) => {
  if (!ANS) return null;
  return {
    username: ANS,
    classes: arColor,
    link_to: "https://v2.viewblock.io/arweave/address/"+ANS,
    selected: false,
    icon: <div className={'flex items-center rounded-lg bg-black'}>
      <Image
        height={20}
        width={20}
        src="/icons/ARWEAVE_WHITE.svg"
        alt="Arweave Name Address"
        quality={100}
      />
    </div> 
  }
}


export const avaxLabel = (AVVY:string|undefined) => {
  if (!AVVY) return null
  return {
    username: AVVY,
    classes: avaxColor,
    link_to: "https://app.avvy.domains/domains/" + AVVY,
    canCopy: false,
    icon: <Image
      width={20}
      height={20}
      src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023"
      alt=""
      quality={50}
    />
  }
}

export const evmosLabel = (EVMOS:string|undefined) => {
  if (!EVMOS) return null
  return {
    username: EVMOS,
    classes: evmosColor,
    link_to: "https://app.evmos.domains/#/name/" + EVMOS,
    canCopy: false,
    icon: <Image
      width={20}
      height={20}
      src="https://evmos.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff28a6a7a-f801-409d-b6ad-2b8d8d09ccdc%2FEvmos_Token_White_RGB.svg?id=bd602f8e-e408-4ae2-837b-6ca4b19d239a&table=block&spaceId=b0b945be-0f04-4c85-8626-e80b7a5ffde2&userId=&cache=v2"
      alt="Evmos Logo"
      quality={50}
    />
  }
}

export const ethLabel = (ENS:string|undefined) => {
  const isDark = localStorage.theme === 'arlight' ? false : true;

  let dark_mode = `${isDark ? ('bg-[#8a92b2]/60 text-white') : (ethColor)} flex items-center`;

  if (!ENS) return null;
  return {
    username: ENS,
    classes: dark_mode,
    link_to: "https://etherscan.io/enslookup-search?search=" + ENS,
    canCopy: false,
    icon: <Image
      height={20}
      width={20}
      src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
      alt=""
      quality={50}
    />
  }
}
export const lensLabel = (lens:string |undefined) => {
  const isDark = localStorage.theme === 'arlight' ? false : true;
  let dark_mode = `${isDark ? ('bg-[#8a92b2]/60 text-white') : (ethColor)} flex items-center`;
  if (!lens || lens?.length == 0) return null;

  const lensModified = lens?.replace("@", "");
  const minusExtension = lensModified?.replace(".lens", "");

  return {
    username: lensModified,
    classes: lenProps,
    link_to: `https://lenster.xyz/u/${minusExtension}` ,
    canCopy: false,
    icon: <Image
      height={20}
      width={20}
      src="https://raw.githubusercontent.com/lens-protocol/brand-kit/main/Logo/SVG/LENS%20LOGO_%20copy_Icon%20Only.svg"
      alt="Lens Label"
      quality={50}
    />
  }
}

export const nearLabel = (NEAR:string|undefined) => {
  if (!NEAR) return null;
  return {
    username: NEAR,
    classes: nearColor,
    link_to: "https://explorer.mainnet.near.org/accounts/"+NEAR,
    selected: false,
    icon: <div className={'flex items-center rounded-lg bg-black'}>
      <Image
        height={20}
        width={20}
        src="/icons/NEAR_WHITE.svg"
        alt="Near Logo"
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
    link_to: `https://network.urbit.org/${URBIT}`,
    selected: false,
    icon: <div className={'flex items-center rounded-lg bg-emerald-300'}>
      <Image
        height={20}
        width={20}
        src="/icons/URBIT.svg"
        alt=""
        quality={100}
      />
    </div> 
  }
}

export const getDefaultLabels = ({  ENS, AVVY, LENS, ANS, NEAR, EVMOS, URBIT, LINKS }: {
  ENS: string[], 
  AVVY: string[],
  LENS: string[],
  ANS: string[],
  NEAR: string[],
  EVMOS: string[],
  URBIT: string[],
  LINKS: Links
}) => {
  // Create labels for all handles
  let avvyAddr = AVVY ? AVVY.map(address => avaxLabel(address)) : [];
  let ensAddr = ENS ? ENS.map(address => ethLabel(address)) : [];
  let lensAddr = LENS ? LENS.map(address => lensLabel(address)): [];
  let ansAddr = ANS ? ANS.map(address => ansLabel(address)): [];
  let nearAddr = NEAR ? NEAR.map(address => nearLabel(address)): [];
  let evmosAddr = EVMOS ? EVMOS.map(address => evmosLabel(address)): [];
  let urbitAddr = URBIT ? URBIT.map(address => urbitLabel(address)): [];
  let socialsAddr = LINKS ? addSocials(LINKS) : []; 

  // Consolidate handles & filter nulls
  const handleArr = [
    ...avvyAddr,
    ...ensAddr,
    ...lensAddr,
    ...ansAddr,
    ...nearAddr,
    ...evmosAddr,
    ...urbitAddr,
    ...socialsAddr

  ].filter((l) => l !== null);

  return handleArr;
}

const addSocials = (links: Links) => {
  let socialsArr = [];
  if(links?.twitter) {
    socialsArr.push({
      username: links.twitter, 
      classes: colorProps,
      link_to: "https://twitter.com/" + links.twitter,
      canCopy: true,
      icon: <BsTwitter {...iconProps} />
    });
  }
  if(links?.github) {
    socialsArr.push({
      username: links.github, 
      classes: colorProps,
      link_to: "https://github.com/" + links.github,
      canCopy: true,
      icon: <BsGithub {...iconProps} />
    });
  }
  if(links?.instagram) {
    socialsArr.push({
      username: links.instagram, 
      classes: colorProps,
      link_to: "https://instagram.com/" + links.instagram,
      canCopy: true,
      icon: <BsInstagram {...iconProps}/>
    });
  }
  if(links?.customUrl) {
    socialsArr.push({
      username: removeHttp(links.customUrl),
      classes: colorProps, 
      link_to: links.customUrl,
      canCopy: true,
      icon: <BsGlobe2 {...iconProps}/>
    })
  }
  return socialsArr;
}

export const Labels = ({items}: {items: any}) => {
  const itemsAdj = items.filter((item: any) => item.props.username !== "");
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const isDark = localStorage.theme === 'arlight' ? false : true;
  const handleClick = (e: string) => { 
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth} = rowRef.current;
            const scrollTo = e === "left" ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth
            rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
        }
  }

  return (
    <>
    <div className="group relative">
        <BiChevronLeft height={10} color="#fff" width={10}  className={`absolute top-0 
            bottom-0 left-2 bg-gray-500/50 rounded-full 
            m-auto z-50 h-6 w-6
            cursor-pointer opacity-0 
            transition hover:scale-125 
            group-hover:opacity-100
          ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
          />
        <div 
          className={`absolute left-0 z-10 h-full w-3.5 shadow-inner-r bg-gradient-to-r shadow-xl shadow-opacity-0.1 ${isDark ? "from-base-100/95 via-base-100/60 to-base-100/5 shadow-base-100" : "from-white/95 via-white/60 to-white/5 shadow-white"}`}
        >
        </div>
        <div 
          ref={rowRef} 
          className="space-x-3.5 flex pl-2 carousel mb-2 md:ml-2 group relative"
        >
          {itemsAdj ? itemsAdj.map((item: any, idx: number) => (
            <div key={`${idx}${item.props.username}`} className="z-5 carousel-item">
              {item}
            </div>
          )) : ""}
        </div>
        <div className={`absolute right-0 top-0 z-10 h-full w-3.5 bg-gradient-to-l shadow-xl shadow-opacity-0.1 ${isDark ? "from-base-100/95 via-base-100/60 to-base-100/5 shadow-base-100" : "from-white/95 via-white/60 to-white/5 shadow-white"}`}>
        </div>
        <BiChevronRight height={10} color="#fff" width={10} 
          className={`absolute top-0 
            bottom-0 right-2 bg-gray-500/50 rounded-full
            m-auto z-50 h-6 w-6
            cursor-pointer opacity-0 
            transition hover:scale-125 
            group-hover:opacity-100`}
            onClick={() => handleClick("right")} 
          />
    </div>
  </>
  );
};

export function GenericLabel ({username, classes, icon, link_to, canCopy}: GenericLabelInterface) {

  const [open, setOpen] = useState(false);
  const copy_text = (link: string) => {
    setOpen(true);
    navigator.clipboard.writeText(link);
  }
  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  const attrs = {
    onClick: canCopy ? () => copy_text(username || '') : undefined
  }

  const classnames = `${classes} px-2.5 py-[5px] font-bold text-sm rounded-2xl relative transition-opacity duration-300 hover:opacity-60 `;

  if (!username) return <></>
  return (
    <>
      <>
        {link_to ? (
          <Link href={link_to} passHref>
            <a target="_blank" rel="noopener noreferrer" {...attrs} className={classnames}>
              <div className='flex flex-row items-center space-x-1'>
                {icon}
                <h3 className="font-inter">
                  {username}
                </h3>
              </div>
            </a>
          </Link>
        ) : (
          <button {...attrs} className={classnames + " cursor-pointer"}>
            <div className='flex flex-row items-center space-x-1'>
              {icon}
              <h3 className="font-inter">
                {username}
              </h3>
            </div>
          </button>
        )}
      </>
      {canCopy && (
        <Snackbar
          message="Copied to clipboard"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
    </>
  )
}
