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
        <div className={`w-full h-full font-normal text-sm transition-opacity duration-500 opacity-0 ${(onLoad && !loading) && 'opacity-100' } `}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-9 pt-0.5">
            {NFTs.map((
              owned: { title: string; poster: string; description: string; timestamp: number; id: string; },
              index: number
            ) =>
              <div key={index} className="rounded-lg overflow-hidden h-full w-full duration-300 hover:-translate-y-[2px]">
                <Image src={ARWEAVE_URL + owned.id}
                  alt={owned.title}
                  width={imageSize}
                  height={imageSize}
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
          </div>
        </div>
      ): (
        <LoadingOrNotFound loading={loading} jsxNotFound={"No NFTs found"} />
      )}
    </>
  )
};
