import { toHtml } from '@fortawesome/fontawesome-svg-core';
import { CheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { userOnboardingState } from '../../../atoms';
import { ARWEAVE_URL } from '../../../src/constants';
import { NFT, Res } from '../../../src/types';
import MainNextButton from '../../buttons/MainNextButton';
import UserBackButton from '../../buttons/UserBackButton'
import { Divider, SearchBar } from '../../user/components/reusables'


interface Props { 
    arkProfile: Res | null
    setSelectedAvatar: any,
    selectedAvatar: NFT | null
}

function NftCollections({arkProfile, setSelectedAvatar, selectedAvatar}: Props) {
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

    let tmp: NFT[] = [];
    const [NFTs, setNFTs] = useState<NFT[]>(tmp);
    

   

    // const {ANFTS, ERC_NFTS} = arkProfile!
    /**
     * Collect all NFTs into a single list 
     */
    if (arkProfile?.ANFTS?.koii !== undefined || null) { 
        for (let n of arkProfile!.ANFTS.koii) { 
          let anft: NFT = new NFT()
            .add_id(n.id!)
            .add_poster(n.poster!)
            .add_timestamp(n.timestamp!)
            .add_title(n.title!)
            .add_description(n.description!)
            .add_ticker(n.ticker!);
          tmp.push(anft);
        }
      }
      if (arkProfile?.ANFTS?.permapages_img !== undefined || null) { 
        for (let n of arkProfile!.ANFTS.permapages_img) { 
          let anft = new NFT();
          if (
            n.content_type === "image/jpeg" ||
             n.content_type === "image/png" || 
            //  n.content_type === "image/gif" || 
             n.content_type === "image" 
            //  n.content_type==="video/mp4"
             ) {
            anft.add_id(n.id!)
              .add_poster(n.poster!)
              .add_timestamp(n.timestamp!)
              .add_title(n.title!)
              .add_description(n.description!)
              .add_ticker(n.ticker!)
              .add_content_type(n.content_type!);
          }
          tmp.push(anft);
        }
      }
    console.log(tmp)
    //   // Temporary FIx
    //   NFTs.sort((a, b) =>  b.timestamp! - a.timestamp!)

    const [search, setSearch] = useState<string>('');
    const onSearch = (e: string) => {
        setSearch(e);
        // setFilteredTransactions(transactions.filter((tx) => arweaveTransactionHandler(tx).toLowerCase().includes(e.toLowerCase())));
    };


  return (
    <section className="md:relative md:top-32 w-full px-5 sm:w-[440px] flex flex-col justify-between h-screen">
        <div className=' mt-10 '>
          <UserBackButton overrideStep={9}/>
          <h1 className="text-[32px] font-bold mt-5">Your Collections</h1>
          <Divider />
          <SearchBar value={search} onChange={(e) => onSearch(e)} placeholder='Collection, name, network'  />
            <div className="mt-11 grid grid-flow-row grid-cols-4 sm:grid-cols-4 grid-rows-4 gap-3 ">
{

              tmp.map((value, index) => { 
               return <button key={index} onClick={() => {
                setSelectedAvatar(value)
              }} 
                className={`w-[88px] h-[88px] bg-[#d9d9d9] rounded-full relative 
                    ${selectedAvatar?.id === value.id ? 'outline outline-2 border-black' : ''}
                  `}>
                  <Image src={ARWEAVE_URL + value.id} // TODO: make this URL dynamic
                     width={999999999}
                   height={999999999}
                    // loading="lazy"
                    objectFit="cover"
                    className={`items-center rounded-full cursor-pointer object-cover`}/>
                     {
                        selectedAvatar?.id === value.id && (
                          <div className='absolute right-0 top-0   bg-[#1cc16a] justify-center w-[19px] h-[19px] p-1 items-center flex rounded-full'>
                            <CheckIcon height={15} width={15}  color='#fff' strokeWidth={4}/>
                          </div>
                        )
                      }
                </button>
              
              })

}

              {/* <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 grid-rows-4 gap-5">
                  {labels.map((item:any, index:number) => (
                    <div key={index}  className={`${selectedName === item.username ? tableClass + item.classes + 'border-black border-2': item.classes + tableClass} `}>
                      <button onClick={() => setSelectedName(item.username)}>
                        <div className='flex flex-row items-center space-x-1'>
                          {item.icon}
                          <h3 className="font-inter">{item.username}</h3>
                        </div>
                      </button>
                      {
                        selectedName === item.username && (
                          <div className='absolute -right-1 bottom-10 bg-[#1cc16a] justify-center w-[19px] h-[19px] p-1 items-center flex rounded-full'>
                            <CheckIcon height={15} width={15}  color='#fff' strokeWidth={4}/>
                          </div>
                        )
                      }
                      
                    </div>
                  ))}
                </div> */}
            </div>
        </div>

        {/* Once selected, go back to the previous page  */}
        <div className='relative bottom-[90px]'>
          <MainNextButton btnName='Next' disabled={!selectedAvatar} overrideStep={9}/>
        </div>
        </section>
  )
}

export default NftCollections