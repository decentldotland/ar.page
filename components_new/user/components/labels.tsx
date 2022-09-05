// @flow 
import { useAns } from 'ans-for-all';
import * as React from 'react';
import { Button } from '../../buttons';
import { userInfo } from '../../../src/types';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEditorOpen } from '../../../atoms';
import { useRecoilState } from 'recoil';

export const Labels = (props: userInfo) => {
  const [editEnabled, setEditEnabled] = useRecoilState(isEditorOpen);
  const {
    address,
  } = useAns();

  const info = props.userInfo;

  return (
    <div className="w-full ">
      <div className="w-full">
        {info.ownedLabels && info.ownedLabels.length > 0 ? <div className="w-full lg:col-span-4 lg:row-span-1 h-[3.5em]">
          <div className="flex gap-x-4 gap-y-0 h-[3.5em]">
            {
              info.ownedLabels.map((owned: { label: string; scarcity: string; acquisationBlock: number; mintedFor: number; }) =>
                <div key={owned.acquisationBlock} className="col-span-2 pt-1 float-left select-none">
                  <div
                    key={owned.acquisationBlock}
                    className="font-mono text-sm tooltip tooltip-info"
                    data-tip={`scarcity: ${owned.scarcity} `}
                    >
                    <button className="btn btn-sm btn-primary">
                      {owned.label}.ar
                    </button>
                  </div>
                </div>
              )
            }
          </div>
          {/* </div> */}
        </div> : <h1 className="text-lg text-white float-left mx-2">-</h1>}
      </div>
      {info.user === address && (
        <FontAwesomeIcon icon={faPencilAlt} className="w-4 mb-0.5 mr-2 cursor-pointer" onClick={(e) => setEditEnabled(!editEnabled)} />
      )}
    </div>
  );
};