import { useState } from 'react';
import Collectibles from './tabs.tsx/collectibles';
import ArweaveActivity from './tabs.tsx/activity';
import Selector from './selector';
import { ArweaveTransaction, NFT, Res, Stamp } from '../../../../../src/types';
import StampsTab from './tabs.tsx/StampsTab'; 
import { ARWEAVE_URL, IMAGE_PROXY, IPFS_PROXY, COLLECTIBLE_PER_PAGE } from '../../../../../src/constants';
import { removeIpfs } from '../../../../../src/utils/removeIpfs';
import { ChainOptions } from '../../../../../src/types';
import { checkContentType } from '../../../../../src/utils/fetchContentType';


export interface TabContentTabs {
  name: string; // Name of the tab
  total: number; // total number of items in the tab
  component: JSX.Element; // The component that will be rendered
}

export default function Content({ arkProfile, loading, nfts, nftLoading, arweaveAddr }: { arkProfile: Res | undefined; loading: boolean, nfts: any, nftLoading: boolean, arweaveAddr: string | null }) {
  const [selected, setSelected] = useState<number>(0);
  const [activity, setActivity] = useState<ArweaveTransaction[]>(arkProfile ? arkProfile.ARWEAVE.ARWEAVE_TRANSACTIONS : []);
  const [collectableVisibility, setCollectableVisibility] = useState<number>(0);
  const handleCollectableVisibility = (res: number) => setCollectableVisibility(res);
  
  // ------------------------------NFT, Stamps Section-----------------------------------
  const [stamp, setStamp] = useState<Stamp[]>([]);
  let tmp: NFT[] = [];
  const [NFTs, setNFTs] = useState<NFT[]>(tmp);
  const [evmNfts, setEvmNfts] = useState<NFT[]>([]);

  /**
   * ERC NFT
   */
  const addEvmNfts = (nfts: any, chain: ChainOptions) => {
    let evmTmp: NFT[] = [];
    if (nfts !== undefined || nfts !== null) { 
      for (let n of nfts) {
        let ercnft = new NFT();
        if ((n !== null && n.token_uri && n.token_uri !== "Invalid uri" && typeof n.image !== 'undefined' && n.image !== null && n.image) // EVM
            || 
           (n !== null && typeof n.image !== 'undefined' && n.image !== null && n.ark_network === "evmos")) {
          // Determine IPFS Protocol Presence - true: return, false: remove IPFS Protocol
          n.image = (n.image.slice(0, 5) !== "ipfs:") ? n.image : IPFS_PROXY+removeIpfs(n.image);
          // Add NFT Data
          ercnft.add_id(n.image.includes(IMAGE_PROXY) ? n.image : IMAGE_PROXY+n.image)
          .add_timestamp(n.block_number_minted!)
          .add_title(n.name!)
          .add_description(String(n.description!))
          //@ts-ignore
          .add_chain(chain === "eth" ? "ethereum" : chain);
          evmTmp.push(ercnft);
        }
      }
      setNFTs(prev => [...prev, ...evmTmp]);
    }
  }

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
   * NEAR NFT 
   */
  if (nfts !== undefined || nfts !== null) {
    for (let n of nfts?.NEAR) { 
      let nearnft = new NFT();
      nearnft.add_id(n.image.includes(IMAGE_PROXY) ? n.image! : IMAGE_PROXY+n.image!)
      .add_timestamp(1)
      .add_title(n.collection.title!)
      .add_description(n.name!)
      .add_chain("near")
      tmp.push(nearnft);
    }
  }

  NFTs.sort((a, b) =>  b.timestamp! - a.timestamp!);
  const [CollectiblePerPage, setCollectiblePerPage] = useState(COLLECTIBLE_PER_PAGE);
  const showMoreCollection = () => { 
    setCollectiblePerPage(prev => prev + CollectiblePerPage);
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
  
// ---------------------------------- Stamps-----------------------------------------------
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
    } else if(nftCount < 2) {
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
      name: "Collectibles",
      total: collectableVisibility,
      component:
      <>
        <Collectibles 
          NFTs={NFTs} 
          loaded={nftLoading} 
          perPage={CollectiblePerPage} 
          handleVisibility={handleCollectableVisibility}
          arweaveAddr={arweaveAddr}
          handleEvmNfts={addEvmNfts}
          handleCollectibleLimit={setCollectiblePerPage}
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
    //...TABS(arkProfile),
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


// if ((n !== null && n.token_uri && n.token_uri !== "Invalid uri") || (n !== null && typeof n.image !== 'undefined' && n.image !== null)) {