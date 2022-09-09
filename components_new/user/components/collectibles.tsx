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
          <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-1">
            {NFTs.map((
              owned: { title: string; poster: string; description: string; timestamp: number; id: string; },
              index: number
            ) =>
              <div className="
              object-cover
              relative 
              h-[357px]
              shrink-0
              min-w-[268px] min-h-[257px]   
              cursor-pointer transition duration-500 ease-out
              md:min-w-[200px] 
              sm:min-h-[257px] sm:min-w-[200px]  
              md:min-h-[257px] md:hover:scale-101
              lg:min-h-[257px] lg:min-w-[200px] 
              xl:min-h-[257px] xl:min-w-[268px]
              2xl:h-[457px] 
              2xl:min-h-[357px]
              ">
                <Image src={ARWEAVE_URL + owned.id}
                  alt={owned.title}
                  onClick={() => {
                    setCurrent(owned);
                    setIsOpen(true)
                  }}
                  objectFit="cover"
                  layout='fill'
                  className={`rounded-3xl cursor-pointer object-cover`}
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
