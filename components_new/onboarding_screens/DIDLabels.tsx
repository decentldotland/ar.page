import { useState } from 'react';
import Link from 'next/link';
import { Snackbar } from '@mui/material';
import { BsGithub, BsTwitter, BsInstagram, BsGlobe2 } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { removeHttp } from '../../src/utils';
import { GenericLabelInterface, GenericUsernameInterface, Links, OwnedLabel } from '../../src/types';
import { isDarkMode } from '../../atoms';
// import ARWEAVE from  '../../../../public/icons/ARWEAVE.svg'

const colorProps = `bg-primary/10 text-primary `
const avaxColor = "bg-[#E84040]/20 text-[#E84040] "
const ethColor = `bg-[#b3b2b3]/40 text-[#454a75] font-bold `
const arColor = "bg-black text-white "
const iconProps = {size: 19, color: "#1273ea"}
const lenProps = "bg-[#abfe2c] text-[#05501F] bg-[#aafe2ccb] "

export const arLabels = (arweave_address: string, ownedLabels: OwnedLabel[]) => ownedLabels.map((owned: OwnedLabel) => {
  return {
    username: owned.label + '.ar',
    classes: arColor,
    selected: false,
    link_to: 'https://v2.viewblock.io/arweave/address/' + arweave_address,
    icon: <Image
      width={19}
      height={19}
      className="bg-white rounded-full "
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
export const lensLabel = (lens:string[] |undefined) => {
  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  let dark_mode = `${isDark ? ('bg-[#8a92b2]/60 text-white') : (ethColor)} `;

  if (!lens || lens?.length == 0) return null;

  const lensLabel = lens[0]?.replace("@", "")
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

export const getDefaultLabels = ({  ENS, AVVY, LENS }: {
  ENS: string|undefined, 
  AVVY: string|undefined,
  LENS: string[] |undefined
}) => [
  avaxLabel(AVVY),
  ethLabel(ENS),
  lensLabel(LENS)
].filter((l) => l !== null);


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
