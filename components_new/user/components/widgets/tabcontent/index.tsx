import { useState, useEffect } from 'react';
import Collectibles from './tabs.tsx/collectibles';
import ArweaveActivity from './tabs.tsx/activity';
import Selector from './selector';
import { ArweaveTransaction, NFT, Res } from '../../../../../src/types';
import { TABS } from '../../../hackathon/';
import ShowMore from '../../pagination/ShowMore';

export interface TabContentTabs {
  name: string;
  total: number;
  component: JSX.Element;
}

export default function Content({ arkProfile, loading }: { arkProfile: Res; loading: boolean }) {
  const [selected, setSelected] = useState<number>(0);
  const [NFTs, setNFTs] = useState<NFT[]>(arkProfile.ANFTS?.koii || []);
  const [activity, setActivity] = useState<ArweaveTransaction[]>(arkProfile.ARWEAVE_TRANSACTIONS);

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
