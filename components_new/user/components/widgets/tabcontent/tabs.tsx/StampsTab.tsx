import { useEffect, useState } from 'react';
import { LoadingOrNotFound } from '../../../reusables';
import { ARWEAVE_EXPLORER_TX, ARWEAVE_IMG, ARWEAVE_URL } from '../../../../../../src/constants';
import { ArweaveTransaction, Res, Stamp, userInfo } from '../../../../../../src/types';
import { arweaveTransactionHandler } from '../../../../../../src/utils';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBar } from '../../../reusables';
import Image from 'next/image';
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline/'
// TODO: Create a general component for this
export default function StampsTab({currentUser, stamps, loading, perPage}: {currentUser: Res, stamps: Stamp[], loading: boolean, perPage: number}) {

  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Stamp[]>(stamps || []);

  const epochToDate = (epoch: number) => {
    return (new Date(epoch)).toLocaleString();
  }

  const [search, setSearch] = useState<string>('');
  const onSearch = (e: string) => {
    setSearch(e);
    setFilteredTransactions(stamps.filter((tx) => tx.title?.toLowerCase().includes(e.toLowerCase())));
  };
  console.log(stamps)
  useEffect(() => {
    setOnLoad(true);
  }, [])

  const dotTrunctate = ( id: string ) => {
    const first = id.slice(0, 5);
    const last = id.slice(-6, -1);
    return `${first}...${last}`;
  }

  return (
    <>
      <div className="flex md:items-center mb-6">
        <SearchBar value={search} onChange={(e) => onSearch(e)} placeholder={"Search activity"} />
      </div>
      {filteredTransactions.length > 0 ? (
        <div className={`flex flex-col transition-opacity duration-400 pb-3 opacity-0 ${(onLoad && !loading) && 'opacity-100'}`}>
          {filteredTransactions
            .slice(0, perPage)
            .filter((i) => i.stampedAssetType === "image")
            .map((stamp: Stamp, index: number) => (
              <a key={index}
                className="flex items-center my-2 rounded-lg transition-all ease-in-out duratino-200 hover:shadow-lg" 
                href={ARWEAVE_EXPLORER_TX + stamp.stampedAsset}
                rel="noopener noreferrer" target="_blank"
              >
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mr-4">
                <Image src={ARWEAVE_IMG +  stamp.stampedAsset} // TODO: make this URL dynamic
                  alt={stamp.stampedAsset}
                  width={9999}
                  height={9999}
                  objectFit="cover"
                  className={`rounded-md cursor-pointer object-cover`}
                />
  {/*                 
                  <div className="w-12 h-12 bg-yellow-300/80 rounded-full">
                  </div> */}
                </div>
                <div className="grow flex justify-between items-start">
                  <div className="flex flex-col mb-5">
                    <div className='font-semibold '><span className="text-[#777]">{currentUser.ANS.nickname} stamped</span> {stamp.title}</div>
                    {console.log(stamp)}
                    <div className='text-sm'>{epochToDate(stamp.timestamp)}</div>
                  </div>
                  <div className="flex mr-4">
                    {/* TODO: make it non-static */}
                    <div>
                      {/* <FontAwesomeIcon icon={faCheck} className="w-9 h-9 bg-green-400 text-white rounded-full p-2" /> */}
                      <ArrowTopRightOnSquareIcon  color='#666666' strokeWidth={2} className="w-9 h-9 p-2"/>
                    </div>
                  </div>
                </div>
              </a>
        ))}
        </div>
      ) : (
        <LoadingOrNotFound loading={loading} jsxNotFound={"No activity found"} />
      )}
    </>
  )
};