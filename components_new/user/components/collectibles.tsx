// @flow 
import * as React from 'react';
import Image from 'next/image';
import Modal from '../../../components/portal/modal';
import ModelContent from './modelContent';
import { ARWEAVE_URL } from '../../../src/constants';
import { Koii } from '../../../src/types';
import { LoadingOrNotFound } from './reusables';

// TODO: Create a general component for this
export const Collectibles = ({NFTs, loading}: {NFTs: Koii[], loading: boolean}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [current, setCurrent] = React.useState<any>({});

  const imageSize = 300;
  const handleClose = React.useCallback((NFT = {}) => {
    setCurrent(NFT);
    setIsOpen(opened => !opened);
  }, [])
  
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  React.useEffect(() => {
    setOnLoad(true);
  }, [])

  return (
    <>
      {NFTs.length > 0 ? (
        <div className={`  `}>
          <div className="grid  lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-1">
            {NFTs.map((
              owned: { title: string; poster: string; description: string; timestamp: number; id: string; },
              index: number
            ) =>
              <div className="
              object-cover
              relative 
              w-full
              h-full
              shrink-0
              min-w-[268px] min-h-[257px]   
              cursor-pointer transition duration-500 ease-out
              sm:min-h-[300px] sm:min-w-[200px]  
              md:min-h-[257px] md:hover:scale-105
            
              ">
                <Image src={ARWEAVE_URL + owned.id}
                  alt={owned.title}
                  width={99999999}
                  height={99999999}
                  onClick={() => {
                    setCurrent(owned);
                    setIsOpen(true)
                  }}
                  objectFit="cover"
                  className={`rounded-2xl cursor-pointer object-cover`}
                />
              </div>
            )}
            <Modal handleClose={handleClose} isOpen={isOpen}>
              <ModelContent handleClose={handleClose} naturalRes={imageSize} current={current} />
            </Modal>
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-9 pt-0.5">
            {NFTs.map((
              owned: { title: string; poster: string; description: string; timestamp: number; id: string; },
              index: number
            ) =>
              <div key={index} className="rounded-lg overflow-hidden h-full w-full duration-300 hover:-translate-y-[2px]">
                <Image src={ARWEAVE_URL + owned.id}
                  alt={owned.title}
                  width={99999999}
                  height={99999999}
                  onClick={() => {
                    setCurrent(owned);
                    setIsOpen(true)
                  }}
                  objectFit="cover"
                  className={`rounded-lg cursor-pointer`}
                />
              </div>
            )}
            <Modal handleClose={handleClose} isOpen={isOpen}>
              <ModelContent handleClose={handleClose} naturalRes={imageSize} current={current} />
            </Modal>
          </div> */}
        </div>
      ): (
        <LoadingOrNotFound loading={loading} jsxNotFound={"No NFTs found"} />
      )}
    </>
  )
};
