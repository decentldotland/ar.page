import * as React from 'react';
import { userInfo } from '../../src/types';
import { EditModal } from '../../components/editor/editmodal';
import { Labels } from './components/labels';
import { UserInfo } from './components/userInfo';
import { Bio } from './components/bio';
import { Collectibles } from './components/collectibles';
import { Sidebar } from './sidebar';

function PageContent(props: userInfo) {
  const bio = typeof props.userInfo.bio === 'string' ? 
  props.userInfo.bio : "";
  const info = props.userInfo;

  return (
    <div className="h-9 w-full my-4">
      <div className="flex flex-wrap mx-10 max-w-full rounded-lg">
        <UserInfo userInfo={info} />
        <Labels userInfo={info} />
        <EditModal userColor={info.address_color} wallet={info.user} userInfo={props} /> 
        <div className="flex flex-col rounded-md w-full h-full bg-base-100 overflow-x-hidden p-8 mb-10">
          <Bio text={bio} />
          <Collectibles userInfo={info} />
        </div>
      </div>
    </div>
  );
}

export default function UserPage (props: userInfo) {
  return (
    <div className="md:flex h-full w-full relative">
      <div className="h-full max-h-full overflow-clip w-[250px] md:block hidden bg-base-100">
        <Sidebar />
      </div>
      <div className="w-full h-body overflow-y-scroll bg-base-200/25">
        <PageContent userInfo={props.userInfo} />
      </div>
    </div>
  )
}