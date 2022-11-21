import { useState } from 'react';
import Link from 'next/link';
import { Snackbar } from '@mui/material';
import { BsGithub, BsTwitter, BsInstagram, BsGlobe2 } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { removeHttp } from '../../src/utils';
import { GenericLabelInterface, Links, OwnedLabel } from '../../src/types';
import { isDarkMode } from '../../atoms';
// import ARWEAVE from  '../../../../public/icons/ARWEAVE.svg'

const colorProps = `bg-primary/10 text-primary `
const avaxColor = "bg-[#E84040]/80 text-white"
const ethColor = `bg-[#8a92b2]/20 text-[#454a75]`
const arColor = "bg-black text-white"
const iconProps = {size: 19, color: "#1273ea"}
const lenProps = "bg-[#abfe2c] text-[#05501F] bg-[#aafe2ccb]"

export const arLabels = (arweave_address: string, ownedLabels: OwnedLabel[]) => ownedLabels.map((owned: OwnedLabel) => {
  return {
    username: owned.label + '.ar',
    classes: arColor,
    canCopy: false,
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
    canCopy: false,
    icon: 
    
    <Image
      width={19}
      height={19}
      src="/icons/AVALANCHE.svg"
      alt=""
      quality={50}
    />
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
    canCopy: false,
    icon: <Image
      height={50}
      width={50}
      src="/icons/ETHEREUM.svg"
      alt=""
      className={'shadow-2xl bg-black rounded-xl '}
      quality={100}
    />
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
    canCopy: false,
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


export const DIDLabels = ({items}: {items: any}) => {
  return (
    <div className="flex flex-row max-w-[100vw] space-x-2 py-2 max-h-[60px]">
      {items.map((item:any, index:number) => (
        <div key={index} className="carousel-item">
          {item}
        </div>
      ))}
    </div>
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

  const classnames = `${classes} px-2 py-2 flex items-center h-[55px] w-[183px] text-center font-bold text-sm rounded-2xl relative transition-opacity duration-300 hover:opacity-60 `;

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
