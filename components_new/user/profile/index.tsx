// @flow 
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { useAns } from 'ans-for-all';
import { Labels } from './components/labels';
import { Panel } from './components';
import { UserInfo } from './components/userInfo';
import { userInfo } from '../../../src/types';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditModal } from '../../../components/editor/editmodal';
import { isEditorOpen } from '../../../atoms';

export const NameContent = (props: userInfo) => {
  const {
    walletConnected,
    ansData,
    address,
    arconnectConnect,
  } = useAns();
  const [editEnabled, setEditEnabled] = useRecoilState(isEditorOpen);

  return (
    <div className="h-[36px] w-full my-4 ">
      <div className="flex flex-wrap mx-10 max-w-full rounded-lg">
        <UserInfo userInfo={props.userInfo} />
        <div className="w-full flex justify-between items-center">
            <Labels userInfo={props.userInfo} />
            {props.userInfo.user === address && (
              <FontAwesomeIcon icon={faPencilAlt} className="w-4 mb-0.5 mr-2 cursor-pointer" onClick={(e) => setEditEnabled(!editEnabled)} />
            )}
        </div>
        <EditModal userColor={props.userInfo.address_color} wallet={props.userInfo.user} userInfo={props} />      
        <Panel userInfo={props.userInfo} />
        {/* <div className="h-0 w-full -mx-10"></div> */}
      </div>
    </div>
  );
};