import React, { useState } from 'react';
import Poaps from './poaps';
import TabContent from './tabcontent';
import { TOP_WIDGETS, BOTTOM_WIDGETS } from '../../hackathon';
import { Res } from '../../../../src/types';
import { Divider } from '../reusables';
import {HiOutlineSearchCircle} from 'react-icons/hi'
import { CircularProgress, LinearProgress } from '@mui/material';
export interface WidgetType {
  children: any; // pass default component here
  canRender: boolean; // pass conditionals here
  loading?: boolean;
  loadingChildren?: any; // pass loading animation component here
}

export function Widget(props: WidgetType) {
  return (
    <>
      {props.canRender ? (
        <>
          {props.children}
        </>
      ): (
        <>
          {/* for loading animations */}
          {props.loadingChildren}
        </>
      )}
    </>
  )
}

export const DEFAULT_COMPONENT_LIST: WidgetType[] = [

]


export default function Widgets({arkProfile, loading}: {arkProfile: Res | undefined, loading: boolean}) {
    
  const [time, setTimeOut] = useState(false)
  React.useEffect(() => {
    setTimeout(function () {
      setTimeOut(true); 
    }, 8000);
  }, []);
  
  if (!arkProfile) return (
    <>
      {loading || time ? (
        <div className='flex items-center justify-center mt-10 
          text-3xl text-content-100/80 font-bold text-gray-300'>
            {/* <HiOutlineSearchCircle size={60} color="#D9D9D9"/> */}
            No Collections, Activity, POAPS... yet 
        </div>
      ):(
        <div className='flex items-center justify-center space-x-5 mt-10 
        text-3xl text-content-100/80 font-bold text-gray-300'>
          <h1>Loading user's information</h1>
          <CircularProgress color="inherit" />

        </div>
      )}
    </>
  )
  const defaultWidgets = [
    <Widget canRender={arkProfile?.POAPS?.length > 0} loading={loading}>
      <Poaps props={arkProfile}/>
      <Divider />
    </Widget>,
    ...TOP_WIDGETS,
    <Widget canRender={!loading}>
      <TabContent arkProfile={arkProfile} loading={loading} />
    </Widget>,
    ...BOTTOM_WIDGETS,
  ]
  return (
    <div className="overflow-x-hidden">
      {defaultWidgets.map((w, i) => <React.Fragment key={i}>{w}</React.Fragment>)}
    </div>
  )
}


// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { userInfo, Res } from '../../src/types';
// import { EditModal } from '../../components/editor/editmodal';
// import { UserInfo } from './components/userInfo';
// import { Bio } from './components/bio';
// import { Collectibles } from './components/widgets/content/collectibles';
// import { ArweaveActivity } from './components/widgets/content/activity';
// import { Selector } from './components/widgets/content/selector';
// // import { Divider } from './components/reusables';
// import { Sidebar } from './sidebar';
// import { Poaps } from './components/widgets/poaps';
// import CoverPage from './components/CoverPage';
// import GitPoapList from './components/widgets/gitpoaps/GitPoapList';
// import { Koii, ArweaveTransaction } from '../../src/types';
// import { arweaveTransactionHandler } from '../../src/utils';
// import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { MagnifyingGlassIcon, ListBulletIcon } from '@heroicons/react/24/outline';
// import {BsGrid} from 'react-icons/bs'
