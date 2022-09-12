import { useState, useEffect } from 'react';
import Collectibles from './tabs.tsx/collectibles';
import ArweaveActivity from './tabs.tsx/activity';
import Selector from './selector';
import { ArweaveTransaction, NFT, Res } from '../../../../../src/types';
import { HACKATHON_TABS } from '../../../hackathon/api/tabcontent';

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

  const tabs = [
    {
      name: "Collectibles",
      total: NFTs.length,
      component: <Collectibles NFTs={NFTs} loading={loading} />
    },
    {
      name: "Activity",
      total: activity.length,
      component: <ArweaveActivity transactions={activity} loading={loading} />
    },
    ...HACKATHON_TABS
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
