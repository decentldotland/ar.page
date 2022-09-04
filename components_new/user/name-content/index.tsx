// @flow 
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { useAns } from 'ans-for-all';
import { Labels } from './labels';
import { Panel } from './panel';
import { UserInfo } from './userInfo';
import { userInfo } from '../../../src/types';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditModal } from '../../../components/editor/editmodal';
import { isEditorOpen } from '../../../atoms';
import CoverPage from '../CoverPage';
import EditProfile from '../EditProfile';
import ChangeCover from '../ChangeCover';

export const NameContent = (props: userInfo) => {
  const {
    walletConnected,
    ansData,
    address,
    arconnectConnect,
  } = useAns();
  const [editEnabled, setEditEnabled] = useRecoilState(isEditorOpen);
  console.log(`${arconnectConnect} DATA`)

  return (
    <div className="h-[36px] w-full">
      {/* Cover Page */}
      <CoverPage userInfo={props.userInfo} />
      <div className="flex flex-wrap max-w-full rounded-lg px-16 justify-between">
        <UserInfo userInfo={props.userInfo} />
        
        
        
        {/* <EditModal userColor={props.userInfo.address_color} wallet={props.userInfo.user} userInfo={props} />       */}
      </div>
        {/* <Panel userInfo={props.userInfo} /> */}
        {/* <div className="h-0 w-full -mx-10"></div> */}
    </div>
  );
};