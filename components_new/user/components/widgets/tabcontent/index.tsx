import { useState } from 'react';
import Collectibles from './tabs.tsx/collectibles';
import ArweaveActivity from './tabs.tsx/activity';
import Selector from './selector';
import { ArweaveTransaction, NFT, Res, Stamp } from '../../../../../src/types';
import { TABS } from '../../../hackathon/';
import StampsTab from './tabs.tsx/StampsTab'; 
import { ARWEAVE_URL, IMAGE_PROXY, IPFS_PROXY } from '../../../../../src/constants';
import { removeIpfs } from '../../../../../src/utils/removeIpfs';
import { ChainOptions } from '../../../../../src/types';


export interface TabContentTabs {
  name: string; // Name of the tab
  total: number; // total number of items in the tab
  component: JSX.Element; // The component that will be rendered
}

export default function Content({ arkProfile, loading, nfts }: { arkProfile: Res; loading: boolean, nfts: any }) {
  const [selected, setSelected] = useState<number>(0);
  const [activity, setActivity] = useState<ArweaveTransaction[]>(arkProfile.ARWEAVE_TRANSACTIONS);
  const [collectableVisibility, setCollectableVisibility] = useState<number>(0);
  const handleCollectableVisibility = (res: number) => setCollectableVisibility(res);
  
  console.log("ARK PROFILE: ", arkProfile);

  // ------------------------------NFT, Stamps Section-----------------------------------
  const [stamp, setStamp] = useState<Stamp[]>(arkProfile.STAMPS);
  let tmp: NFT[] = [];
  const [NFTs, setNFTs] = useState<NFT[]>(tmp);
  console.log("NFTS from new load: ", nfts);

  /**
   * Arweave
   */
  if (nfts !== undefined || nfts !== null) { 
    for (let n of nfts?.ARWEAVE) {
      let anft = new NFT();
      anft.add_id(ARWEAVE_URL+n.id!)
        .add_poster(n.poster!)
        .add_timestamp(n.timestamp!)
        .add_title(n.title!)
        .add_description(n.description!)
        .add_ticker(n.ticker!)
        .add_chain("arweave");
      tmp.push(anft);
    }
  }

  /**
   * ERC NFT on Ethereum
   */

  if (nfts !== undefined || nfts !== null) { 
    for (let n of nfts?.EVM) { 
      let ercnft = new NFT();
      if (n.token_uri && n.token_uri !== "Invalid uri" && n !== null && typeof n.image !== 'undefined') {
        // Evmos sits in this category & distinguished via ark_network key
        let selectedChain: ChainOptions;
        selectedChain = n.ark_network === "evmos" ? "evmos" : "ethereum"
        // Determine IPFS Protocol Presence - true: return, false: remove IPFS Protocol
        n.image = (n.image.slice(0, 5) !== "ipfs:") ? n.image : IPFS_PROXY+removeIpfs(n.image);
        // Add NFT Data
        ercnft.add_id(n.image.includes(IMAGE_PROXY) ? n.image : IMAGE_PROXY+n.image)
        .add_timestamp(n.block_number_minted!)
        .add_title(n.name!)
        .add_description(String(n.description!))
        .add_chain(selectedChain);
        tmp.push(ercnft);
      }
    }
  }

  /**
   * NEAR NFT 
   */
  if (nfts !== undefined || nfts !== null) {
    for (let n of nfts?.NEAR) { 
      let nearnft = new NFT();
      nearnft.add_id(n.image.includes(IMAGE_PROXY) ? n.image! : IMAGE_PROXY+n.image!)
      .add_timestamp(1)
      .add_title(n.collection.title!)
      .add_description(n.name!)
      .add_chain("near");
      tmp.push(nearnft);
    }
  }

  NFTs.sort((a, b) =>  b.timestamp! - a.timestamp!);
  const [CollectiblePerPage, setCollectiblePerPage] = useState(9);
  const [CurrentCollectiblePage, setcurrentCollectiblePage] = useState(1);
  let indexLastCollection = CurrentCollectiblePage * CollectiblePerPage;
  let firstIndexCollection = indexLastCollection - CollectiblePerPage;
  let currentCollection = activity.slice(firstIndexCollection, indexLastCollection) 
  const showMoreCollection = () => { 
    setCollectiblePerPage(currentCollection.length + CollectiblePerPage);
  }

// --------------------------------------Activity Section----------------------------------

  const setSelectedWrapper = (idx: number) => {
    setSelected(idx)
  };
  // Adding Pagination to limit the number of transactions
  const [ActivityPerPage, setActivityPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let indexLast = currentPage * ActivityPerPage;
  let firstIndex = indexLast - ActivityPerPage;
  let currentActivity = activity.slice(firstIndex, indexLast) 
    const showMore = () => { 
      setActivityPerPage(currentActivity.length + ActivityPerPage);
    }
  
// ---------------------------------- Stamp S-----------------------------------------------
  const CollectableTab = ({nftCount}: {nftCount: number}) => {
    if(nftCount >= CollectiblePerPage) {
      return (
        <article className='flex justify-center mt-12'>
          <button  onClick={() => showMoreCollection()} className='py-2 px-6 btn-primary  text-lg
            text-white font-semibold flex flex-row 
              justify-center rounded-lg'>
            <p>Show More</p>
          </button>
        </article>
      );
    } else if(nftCount === 0) {
      return (
        <>
        </>
      )
    } else {
      return (
        <article className='flex justify-center mt-12'>
          <p>You have reached the end result!</p>
        </article>
      );
    }
  }
  console.log("NFTS: ", NFTs);
  console.log("LOADING: ", loading);
  console.log("COLL: ", CollectiblePerPage);
  const tabs = [
    {
      name: "Collectables",
      total: NFTs.length,
      component: 
      <>
        <Collectibles 
          NFTs={NFTs} 
          loading={loading} 
          perPage={CollectiblePerPage} 
          handleVisibility={handleCollectableVisibility}
        />
        <CollectableTab 
          nftCount={collectableVisibility}
        />
      </>
      
    },
    {
      name: "Activity",
      total: activity.length,
      component: 
        <>
          <ArweaveActivity transactions={activity} loading={loading} perPage={ActivityPerPage} />
          {
            // TODO: 
            activity.length - ActivityPerPage  > 0 ? (
              <article className='flex justify-center mt-12'>
                <button  onClick={() => showMore()} className='py-2 px-6 btn-primary  text-lg
                  text-white font-semibold flex flex-row 
                    justify-center rounded-lg'>
                  <p>Show More</p>
                </button>
              </article>
            ) : (
              <article className='flex justify-center mt-12'>
                <p>You have reached the end result!</p>
              </article>
            )
          }
         
        </>
    },
    {
      name: "Stamps",
      total: stamp.length,
      component: 
        <>
          <StampsTab currentUser={arkProfile} stamps={stamp} loading={loading} perPage={ActivityPerPage}/>
          {
            // TODO: 
            stamp.length - ActivityPerPage  > 0 ? (
              <article className='flex justify-center mt-12'>
                <button  onClick={() => showMore()} className='py-2 px-6 btn-primary  text-lg
                  text-white font-semibold flex flex-row 
                    justify-center rounded-lg'>
                  <p>Show More</p>
                </button>
              </article>
            ) : (
              <article className='flex justify-center mt-12'>
                <p>You have reached the end result!</p>
              </article>
            )
          }
         
        </>
    },
    ...TABS(arkProfile),
  ];

  return (
    <>
      <div className="flex flex-col w-full">
        <Selector tabs={tabs} selected={selected} setSelected={setSelectedWrapper} />
      </div>

      {/* limit the size to 44.65vw instead of 94vw to not have weird scroll logic due to content not fitting on the page*/}
      {/* <div className="mt-4 mb-20 max-h-[44.65vw] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-base-100 overflow-y-scroll "> */}
      <div className="pb-20">
        {tabs[selected].component}
      </div>
    </>
  )
}
