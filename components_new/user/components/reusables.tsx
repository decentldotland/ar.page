import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import Modal from '../../../components/portal/modal';
import ModelContent from './modelContent';
import { ARWEAVE_URL } from '../../../src/constants';
import { NFT } from '../../../src/types';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';

export function Title (jsx: any) {
  return (
    <div className="w-full text-start font-medium text-xs text-gray-450 tracking-wide uppercase">
      {jsx.children}
    </div>
  )
};

export function Divider () {
  return <div className="bg-gray-300 h-[1.5px] w-full my-5"></div>
}

export function LoadingOrNotFound({loading, jsxNotFound}: {loading: boolean, jsxNotFound: any}) {
  return (
    <div className="flex items-center justify-center text-3xl text-content-100/80 font-bold text-gray-300">
      {loading ? (
        <>
          <span>Loading...</span>
          <span className="btn btn-sm loading"></span>
        </>
      ) : <>{jsxNotFound}</>}
    </div>
  )
}

interface SearchType {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  slideOutable?: boolean;
};

export function SearchBar(props: SearchType) {

  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  return (
    <div className={`px-4 flex border-gray-200 border-2 flex-row space-x-3.5 max-w-[80vw] py-3 items-center 
    ${isDark ? ('bg-[#121a2f]'): ('')}
    rounded-2xl`}>
      <MagnifyingGlassIcon height={20} width={20} strokeWidth={3} color={`${isDark? ('white') : ('#666') }`} />
      <input
        type="text"
        value={props.value}
        onChange={(e) => (props.onChange(e.target.value))}
        placeholder={props.placeholder}
        className={`${isDark ? ('bg-[#121a2f]'): ('bg-inherit')}
          font-inter text-sm font-normal outline-none transition-all duration-300 ease-in-out
          ${props.slideOutable ? "w-8 focus:w-[80vw] md:w-60" : "w-full md:w-60"}
        `} />
    </div>
  )
}


interface GenericFrameType {
  children: any;
}

export function GenericFrame (props: GenericFrameType) {
  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {props.children}
      </div>
    </>
  )
}

export function NFTGallery ({NFTs}: {NFTs: NFT[]}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>({});

  const handleCloseModal = useCallback((NFT = {}) => {
    setCurrent(NFT);
    setIsOpen(opened => !opened);
  }, [])

  return (
    <>
      <GenericFrame>
        {NFTs.map((
          nft: NFT,
          index: number
        ) =>
          <button key={index} className="
            object-cover
            relative 
            w-full
            h-full
            shrink-0
            cursor-pointer transition duration-500 ease-out
            md:hover:scale-105
            md:focus:scale-105
          ">
            <Image src={ARWEAVE_URL + nft.id} // TODO: make this URL dynamic
              alt={nft.title}
              width={99999999}
              height={99999999}
              onClick={() => {
                setCurrent(nft);
                setIsOpen(true)
              }}
              objectFit="cover"
              className={`rounded-2xl cursor-pointer object-cover`}
            />
          </button>
        )}
        <Modal handleClose={handleCloseModal} isOpen={isOpen}>
          <ModelContent handleClose={handleCloseModal} naturalRes={500} current={current} />
        </Modal>
      </GenericFrame>
    </>
  )
};
