// @flow 
import { useAns } from 'ans-for-all';
import * as React from 'react';
import { Button } from '../../buttons';
import { Res, userInfo } from '../../../src/types';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEditorOpen } from '../../../atoms';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { divide } from 'lodash';
import { Snackbar } from '@mui/material';

interface LabelProps { 
  user: userInfo,
}


export const Labels = ({user}: LabelProps) => {
  const [editEnabled, setEditEnabled] = useRecoilState(isEditorOpen);
  const { address, } = useAns();
  // const [ens, ans, avvy] = [labels?.ENS, labels?.ANS, labels?.AVVY];
  const info = user.userInfo;

  const [open, setOpen] = React.useState(false);
  const copy_text = (link: string) => { 
      setOpen(true);
      navigator.clipboard.writeText(link);
  }


  return (
      <div className="">
        {info.ownedLabels && info.ownedLabels.length > 0 ? <div  className="space-x-2 w-full lg:col-span-4 lg:row-span-1">
            {
              info.ownedLabels.map((owned: { label: string; scarcity: string; acquisationBlock: number; mintedFor: number; }) =>
                <div key={owned.acquisationBlock}  className="col-span-2 float-left select-none">
                  <div
                    key={owned.acquisationBlock}
                    className="font-inter text-sm tooltip tooltip-info"
                    data-tip={`scarcity: ${owned.scarcity} `}>
                    
                    <div
                      onClick={() =>{ copy_text(`${owned.label}.ar`); }} 
                      className="px-3 py-2 font-semibold 
                      bg-black text-white  text-sm rounded-2xl flex flex-row items-center">
                      <img
                        width={24}
                        height={24}
                        className="mr-2 p-1 bg-white rounded-full "
                        src="https://cryptologos.cc/logos/arweave-ar-logo.svg?v=023" alt="" />
                      <h3 className="font-inter">{owned.label}.ar</h3>
                    </div>
                  </div>
                  <Snackbar
                    message="Copied to clibboard"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    open={open}
                  />
         
                </div>
              )
            }
        </div> : <h1 className="text-lg text-white float-left mx-2">-</h1>}
        {/* {info.user === address && (
          <FontAwesomeIcon icon={faPencilAlt} className="w-4 mb-0.5 mr-2 cursor-pointer" onClick={(e) => setEditEnabled(!editEnabled)} />
        )} */}
      </div>
  );
};


