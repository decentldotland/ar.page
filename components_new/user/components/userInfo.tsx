// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { CircularProgress, Snackbar } from '@mui/material';
import {DocumentDuplicateIcon, CalendarDaysIcon, CheckIcon} from '@heroicons/react/24/outline'
import {CheckBadgeIcon, ShieldExclamationIcon} from '@heroicons/react/24/solid'
import { ANSData, Res, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import { Labels, GenericLabel, getDefaultLabels } from './labels';
import { GenericLabelsComponent } from '../hackathon';
import { Bio } from './bio';
import { Divider } from './reusables';
import {BsPatchQuestionFill} from 'react-icons/bs'
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';
import { HackathonLabels } from '../hackathon/api/labels';
import ProfileBadge from './modals/ProfileBadge';
import EditProfile from './Coverpage/EditProfile';
import MetaforoTipping from './tip/MetaforoTipping';
import MemberSince from './MemberSince';
import CopyAddress from './CopyAddress';
import FollowButton from './FollowButton';
import UserCountInfo from './UserCountInfo';



interface UserProps { 
    user: userInfo,
    profile: Res | undefined
}

export const UserInfo = ({user, profile}: UserProps) => {

    const {
        shortenAddress,
        walletConnected,
        address
    } = useAns();

    const [open, setOpen] = React.useState(false);
    const copy_text = (link: string) => { 
        setOpen(true);
        navigator.clipboard.writeText(link);
    }

    // @ts-ignore
    const { instagram, twitter, github, customUrl } = user?.userInfo?.links;
    const { ownedLabels, currentLabel, address_color, avatar, } = user?.userInfo;

    const ansData:ANSData = {
        currentLabel: currentLabel,
        address_color: address_color,
        avatar: avatar,
    };

    // User bio
    const bio = typeof user.userInfo.bio === 'string' ? 
    user.userInfo.bio : "";

    // console.log(`${user.userInfo.timestamp} THE TIMESTAMP`)
    // Member since...
    let epoch = profile?.first_linkage || user.userInfo.timestamp || 0;
    let member_since = new Date(epoch * 1000);
    let [month, year] = [member_since.toLocaleString('default', {month: 'short'}), member_since.getFullYear()];
    // console.log(month)
    // Labels
    const defaultLabels = getDefaultLabels({
        arweave_address: user?.userInfo?.user, 
        ar: ownedLabels || [], 
        links: {twitter, github, instagram, customUrl}, 
        ENS: profile?.ENS, 
        AVVY: profile?.AVVY, 
        LENS: profile?.LENS_HANDLES || []
    });
    const labels = [...defaultLabels.map((label: any) => <GenericLabel {...label} />), ...HackathonLabels(profile)]

    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        setTimeout(function () {
          setLoading(false); 
        }, 5000);
      }, []);
    const [isDark, setIsDark] = useRecoilState(isDarkMode);

 


    return (
        <div>
            <div className="relative">
                <div className="relative bottom-20 flex flex-col md:flex-row items-center md:items-end mt-8">
                    <article className='relative'>
                        {user?.userInfo && ( <ProfileAvatar ansData={ansData} /> )}
                        <div className='absolute bottom-10 right-4 w-[30px] md:hidden'>
                            {
                                address == user.userInfo.user && walletConnected && (
                                    <>
                                        <EditProfile user={user}/>
                                    {/* <ChangeCover /> */}
                                    </>
                                    )
                            }
                        </div>
                    </article>

                    {/* nickname and label */}
                    <div className={`ml-5 relative  ${epoch === 0 ? ('bottom-8') : ('bottom-8')} `}>
                        <div className="sm:mt-7  flex flex-row items-center space-x-3 justify-center md:justify-start mt-5">
                            <div className="flex items-center ">
                                <div className={`md:text-2xl text-[28px] 
                                ${isDark ? (' text-white'): (' text-[#000]')}
                                font-bold leading-6 font-inter`}>
                                    {user.userInfo.currentLabel}
                                </div>
                                <ProfileBadge
                                    loading={loading}
                                    is_evaluated={profile?.is_evaluated}
                                    is_verified={profile?.is_verified}
                                    isDark={isDark}
                                />
                            </div>

                        </div>
                        
                        <div className='sm:flex sm:flex-col sm:space-y-1 '>
                            <h3 className={`font-inter 
                            ${isDark ? (' text-white/60'): (' text-[#666]')}
                            text-base sm:mb-2 mb-10 md:mb-2
                            text-center sm:text-center md:text-left lg:text-left`} >
                                {user.userInfo.nickname}
                            </h3>
                            
                            <div className='flex flex-row space-x-3'>
                                <FollowButton />
                                <MetaforoTipping  attributes={{
                                    siteName: `${user.userInfo.currentLabel}`,
                                    pageId: "1",
                                    receiverAddress: `${user.userInfo?.user}`,
                                    receiverUsername: `${user.userInfo.currentLabel}`,
                                    receiverChainId: "",
                                    theme: `${isDark ? 'dark' : 'light'}`
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Bio and Available Labels */}
                <div className='space-y-8 -mt-20 mb-5'>
                    <Bio text={bio} />
                    {/* <UserCountInfo followers={1} followings={1} posts={1} /> */}
                    <div className='space-y-2 !mt-5 md:mt-4 '>
                        <Labels items={labels} />
                        <Divider />
                    </div>
                </div>
            </div>
        </div>
    );

};
