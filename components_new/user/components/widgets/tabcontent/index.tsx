import { useState } from 'react';
import Collectibles from './tabs.tsx/collectibles';
import ArweaveActivity from './tabs.tsx/activity';
import Selector from './selector';
import { ArweaveTransaction, NFT, Res, Stamp } from '../../../../../src/types';
import { TABS } from '../../../hackathon/';
import StampsTab from './tabs.tsx/StampsTab'; 
import { ARWEAVE_URL, IMAGE_PROXY, IPFS_PROXY } from '../../../../../src/constants';
import { removeIpfs } from '../../../../../src/utils/removeIpfs';

export interface TabContentTabs {
  name: string; // Name of the tab
  total: number; // total number of items in the tab
  component: JSX.Element; // The component that will be rendered
}

export default function Content({ arkProfile, loading }: { arkProfile: Res; loading: boolean }) {
  const [selected, setSelected] = useState<number>(0);
  const [activity, setActivity] = useState<ArweaveTransaction[]>(arkProfile.ARWEAVE_TRANSACTIONS);
  const [collectableVisibility, setCollectableVisibility] = useState<number>(0);

  const handleCollectableVisibility = (res: number) => setCollectableVisibility(res);
  
  // ------------------------------NFT, Stamps Section-----------------------------------
  const [stamp, setStamp] = useState<Stamp[]>(arkProfile.STAMPS);
  let tmp: NFT[] = [];
  const [NFTs, setNFTs] = useState<NFT[]>(tmp);

  /**
   * KOII NFT on Arweave
   */
  if (arkProfile.ANFTS?.koii !== undefined || null) { 
    for (let n of arkProfile.ANFTS.koii) { 
      let anft: NFT = new NFT()
        .add_id(ARWEAVE_URL+n.id!)
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
   * Permapages NFT on Arweave
   */
  if (arkProfile.ANFTS?.permapages_img !== undefined || null) { 
    for (let n of arkProfile.ANFTS.permapages_img) {
      let anft = new NFT();
      if (n.content_type === "image/jpeg" ||
        n.content_type === "image/png" || 
        n.content_type === "image/gif" || 
        n.content_type === "image" 
        //  n.content_type==="video/mp4"
        ) {
        anft.add_id(ARWEAVE_URL+n.id!)
          .add_poster(n.poster!)
          .add_timestamp(n.timestamp!)
          .add_title(n.title!)
          .add_description(n.description!)
          .add_ticker(n.ticker!)
          .add_content_type(n.content_type!)
          .add_chain("arweave");
      }
      tmp.push(anft);
    }
  }

  /**
   * ERC NFT on Ethereum
   */
  if (arkProfile.ERC_NFTS !== undefined || null) { 
    for (let n of arkProfile.ERC_NFTS) { 
      let ercnft = new NFT();
      const nftMetaData = JSON.parse(n.metadata); 
      if (n.token_uri && n.token_uri !== "Invalid uri" && nftMetaData !== null && typeof nftMetaData.image !== 'undefined') {
        // Determine IPFS Protocol Presence - true: return, false: remove IPFS Protocol
        nftMetaData.image = (nftMetaData.image.slice(0, 5) !== "ipfs:") ? nftMetaData.image : IPFS_PROXY+removeIpfs(nftMetaData.image);
        // Add NFT Data
        ercnft.add_id(nftMetaData.image.includes(IMAGE_PROXY) ? nftMetaData.image : IMAGE_PROXY+nftMetaData.image)
        .add_timestamp(n.block_number_minted!)
        .add_title(nftMetaData.name!)
        .add_description(String(nftMetaData.description!))
        .add_chain("ethereum");
        tmp.push(ercnft);
      }
    }
  }

  /**
   * EVMOS NFT on Cosmos
   * NOTE: EVMOS lacks timestamp on data
   */
  if (arkProfile.EVMOS_NFTS !== undefined || null) { 
    for (let n of arkProfile.EVMOS_NFTS) { 
      let evmosnft = new NFT();
      // Determine IPFS Protocol Presence - true: return, false: remove IPFS Protocol
      n.image = (n.image.slice(0, 5) !== "ipfs:") ? n.image : IPFS_PROXY+removeIpfs(n.image);
      // Add NFT Data
      evmosnft.add_id(n.image.includes(IMAGE_PROXY) ? n.image! : IMAGE_PROXY+n.image!)
        .add_timestamp(1)
        .add_title(n.name!)
        .add_description(n.description!)
        .add_chain("evmos");
      tmp.push(evmosnft);
      
    }
  }

  /**
   * NEAR NFT 
   */
  if (arkProfile.NEAR_NFTS !== undefined || null) { 
    for (let n of arkProfile.NEAR_NFTS) { 
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
  const [CollectiblePerPage, setCollectiblePerPage] = useState(8);
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
          <ArweaveActivity transactions={activity} loading={loading} perPage={ActivityPerPage}/>
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
