import { useState, useEffect } from 'react';
import Collectibles from './tabs.tsx/collectibles';
import ArweaveActivity from './tabs.tsx/activity';
import Selector from './selector';
import { ArweaveTransaction, NFT, Permapage, Res, Stamp } from '../../../../../src/types';
import { TABS } from '../../../hackathon/';
import { Nfts } from '../../../../../components/Nfts';
import StampsTab from './tabs.tsx/StampsTab';


export interface TabContentTabs {
  name: string; // Name of the tab
  total: number; // total number of items in the tab
  component: JSX.Element; // The component that will be rendered
}

export default function Content({ arkProfile, loading }: { arkProfile: Res; loading: boolean }) {
  const [selected, setSelected] = useState<number>(0);
  const [activity, setActivity] = useState<ArweaveTransaction[]>(arkProfile.ARWEAVE_TRANSACTIONS);
  const [stamp, setStamp] = useState<Stamp[]>(arkProfile.STAMPS);
  
  let tmp: NFT[] = [];
  const [NFTs, setNFTs] = useState<NFT[]>(tmp);
  // feel free to simplify
  if (arkProfile.STAMPS.length !== 0) {
    for (let n of arkProfile.STAMPS) { 
      if (n.stampedAssetType === "image" ) {
        let stamp_nft = new NFT()
          .add_id(n.stampedAsset)
          .add_poster(n.stampedAsset!)
          .add_timestamp(n.timestamp!)
          .add_content_type(n.stampedAssetType!);
        tmp.push(stamp_nft);
      }
    }
  }

  if (arkProfile.ANFTS.koii.length !== 0) { 
    for (let n of arkProfile.ANFTS.koii) { 
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
  // if (arkProfile.ANFTS.permapages_img.length !== 0) { 
  //   for (let n of arkProfile.ANFTS.permapages_img) { 
  //     let anft = new NFT();
  //     if (n.content_type === "image/png") {
  //       anft.add_id(n.id!)
  //         .add_poster(n.poster!)
  //         .add_timestamp(n.timestamp!)
  //         .add_title(n.title!)
  //         .add_description(n.description!)
  //         .add_ticker(n.ticker!)
  //         .add_content_type(n.content_type!);
  //     }
     
  //     tmp.push(anft);
  //   }
  // }

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
  
  const tabs = [
    {
      name: "Collectables",
      total: NFTs.length,
      component: <Collectibles NFTs={NFTs} loading={loading} />
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
                  <h1>Show More</h1>
                </button>
              </article>
            ) : (
              <article className='flex justify-center mt-12'>
                <h1>You have reached the end result!</h1>
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
                  <h1>Show More</h1>
                </button>
              </article>
            ) : (
              <article className='flex justify-center mt-12'>
                <h1>You have reached the end result!</h1>
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
