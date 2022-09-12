// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { Snackbar } from '@mui/material';
import {DocumentDuplicateIcon, CalendarDaysIcon} from '@heroicons/react/24/outline'
import {CheckBadgeIcon, ShieldExclamationIcon} from '@heroicons/react/24/solid'
import { ANSData, Res, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import { Labels, GenericLabel, getDefaultLabels } from './labels';
import { HACKATHON_GENERIC_LABELS, HACKATHON_CUSTOM_LABELS } from '../hackathon/api/labels';
import { Bio } from './bio';

interface UserProps { 
    user: userInfo,
    profile: Res | undefined
}

export const UserInfo = ({user, profile}: UserProps) => {

    const {
        shortenAddress,
    } = useAns();

    const [open, setOpen] = React.useState(false);
    const copy_text = (link: string) => { 
        setOpen(true);
        navigator.clipboard.writeText(link);
    }

    // @ts-ignore
    const { instagram, twitter, github, customUrl } = user?.userInfo?.links;
    const { ownedLabels, currentLabel, address_color, avatar } = user?.userInfo;

    const ansData:ANSData = {
        currentLabel: currentLabel,
        address_color: address_color,
        avatar: avatar,
    };

    // User bio
    const bio = typeof user.userInfo.bio === 'string' ? 
    user.userInfo.bio : "";


    // Member since...
    let epoch = profile?.first_linkage || 0;
    let member_since = new Date(epoch * 1000);
    let [month, year] = [member_since.toLocaleString('default', {month: 'short'}), member_since.getFullYear()];

    // Labels
    const defaultLabels = getDefaultLabels({ar: ownedLabels || [], links: {twitter, github, instagram, customUrl}, ENS: profile?.ENS, AVVY: profile?.AVVY});
    const allGenericLabels = [...defaultLabels, ...HACKATHON_GENERIC_LABELS];
    const labels = [...allGenericLabels.map((label: any) => <GenericLabel {...label} />), ...HACKATHON_CUSTOM_LABELS]

    return (
        <div>
            <div className="relative">
                <div className="relative bottom-20 flex flex-row items-end mt-3">
                    {user?.userInfo && ( <ProfileAvatar ansData={ansData} /> )}
                    {/* nickname and label */}
                    <div className='ml-5 mb-5'>
                        <div className="flex flex-row space-x-3 items-center mt-3">
                            <div className="text-2xl font-bold leading-6 font-inter ">
                                {user.userInfo.currentLabel}
                            </div>
                            
                            {
                                profile?.is_evaluated || 
                                profile?.is_verified ? (
                                    <CheckBadgeIcon height={30} width={30} color={"#325FFE"} />
                                ):(
                                    <ShieldExclamationIcon height={30} width={30} color={"#E84040"} />
                                )
                            }
                            <div className='px-2 py-2 bg-base-200 rounded-lg cursor-pointer'
                                onClick={() =>{ copy_text(user.userInfo.user); }} >
                                <div className="flex flex-row font-inter font-semibold text-[#666] text-sm">
                                    <h3 className='mr-1'>
                                        {(shortenAddress as Function)(user.userInfo.user)}
                                    </h3>
                                    <DocumentDuplicateIcon height={20} width={20} color={"#666"} strokeWidth={2} />
                                </div>
                                <Snackbar
                                    message="Copied to clipboard"
                                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                    autoHideDuration={2000}
                                    onClose={() => setOpen(false)}
                                    open={open}
                                />
                            </div>
                        </div>
                        <h3 className='font-inter text-[#666] text-base mt-1 mb-1'>
                            {user.userInfo.nickname}
                        </h3>
                        {/* DAO memberships */}
                        <div className='flex flex-row items-center space-x-2 '>
                            {/* <DaoMembership  userInfo={props.userInfo}/> */}
                            {/* User Membership Date */}
                            <div className='flex flex-row  items-center space-x-1 text-[#666]
                                py-1 px-2 w-fit bg-base-200 rounded-lg font-inter  text-xs font-bold'>
                                <CalendarDaysIcon height={14} width={14} color={'#666'} strokeWidth={2}/>
                                <p>Since {month} {year}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* User Bio and Available Labels */}
                <div className='space-y-14 -mt-20'>
                    <Bio text={bio} />
                    <Labels items={labels} />
                </div>
            </div>
        </div>
    );

};
