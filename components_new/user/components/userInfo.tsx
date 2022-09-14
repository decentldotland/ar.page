// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { CircularProgress, Snackbar } from '@mui/material';
import {DocumentDuplicateIcon, CalendarDaysIcon} from '@heroicons/react/24/outline'
import {CheckBadgeIcon, ShieldExclamationIcon} from '@heroicons/react/24/solid'
import { ANSData, Res, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import { Labels, GenericLabel, getDefaultLabels } from './labels';
import { HACKATHON_GENERIC_LABELS, HACKATHON_CUSTOM_LABELS } from '../hackathon/api/labels';
import { Bio } from './bio';
import { Divider } from './reusables';
import {BsPatchQuestionFill} from 'react-icons/bs'
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';


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

    console.log(`${user.userInfo.timestamp} THE TIMESTAMP`)
    // Member since...
    let epoch = profile?.first_linkage || user.userInfo.timestamp || 0;
    let member_since = new Date(epoch * 1000);
    let [month, year] = [member_since.toLocaleString('default', {month: 'short'}), member_since.getFullYear()];
    console.log(month)
    // Labels
    const defaultLabels = getDefaultLabels({ar: ownedLabels || [], links: {twitter, github, instagram, customUrl}, ENS: profile?.ENS, AVVY: profile?.AVVY});
    const allGenericLabels = [...defaultLabels, ...HACKATHON_GENERIC_LABELS];
    const labels = [...allGenericLabels.map((label: any) => <GenericLabel {...label} />), ...HACKATHON_CUSTOM_LABELS]

    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        setTimeout(function () {
          console.log("Delayed for 5 second."); 
          setLoading(false); 
        }, 5000);
      }, []);
    const [isDark, setIsDark] = useRecoilState(isDarkMode);

    interface ProfileBadge {
        loading: boolean,
        is_evaluated: boolean | undefined,
        is_verified: boolean | undefined,
        isDark: boolean
    }

    // TODO: export
    const ProfileBadge = ({loading, is_evaluated, is_verified, isDark}: ProfileBadge) => (
        <>
            {loading ? (
                <CircularProgress color="inherit" size={30}/>
            ) : (
                is_evaluated || 
                is_verified ? (
                    <CheckBadgeIcon height={30} width={30} color={"#325FFE"} />
                ) : (
                    <BsPatchQuestionFill size={30} color={`${isDark? ('white') : ('#666') }`} />
                )
            )}
        </>
    )

    return (
        <div>
            <div className="relative">
                <div className="relative bottom-20 flex flex-col md:flex-row items-center md:items-end mt-3">
                    {user?.userInfo && ( <ProfileAvatar ansData={ansData} /> )}
                    {/* nickname and label */}
                    <div className={`ml-5 relative ${epoch === 0 ? ('bottom-10') : ('bottom-5')} `}>
                        <div className="flex flex-row space-x-3 items-center mt-3">
                            <div className="flex items-center ">
                                <div className="text-2xl font-bold leading-6 font-inter mr-1">
                                    {user.userInfo.currentLabel}
                                </div>
                                <ProfileBadge
                                    loading={loading}
                                    is_evaluated={profile?.is_evaluated}
                                    is_verified={profile?.is_verified}
                                    isDark={isDark}
                                />
                            </div>
                            <div className={`px-2 py-2 
                                ${isDark ? ('bg-[#1a2745] text-white'): ('bg-gray-200 text-[#666]')} rounded-lg cursor-pointer`}
                                onClick={() =>{ copy_text(user.userInfo.user); }} >
                                <div className="flex flex-row font-inter font-semibold text-sm">
                                    <h3 className='mr-1 hidden md:block'>
                                        {(shortenAddress as Function)(user.userInfo.user)}
                                    </h3>
                                    <DocumentDuplicateIcon height={20} width={20} color={`${isDark? ('white') : ('#666') }`}
                             strokeWidth={2} />
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
                        
                        {
                            epoch > 0 && (
                                <div className='flex flex-row items-center justify-center md:justify-start space-x-2 '>
                                    <div className={`flex flex-row  
                                        items-center space-x-1  
                                        py-1 px-2 w-fit ${isDark ? ('bg-[#1a2745] text-white'): ('bg-gray-200 text-[#666]')}  
                                        rounded-lg 
                                        font-inter  text-xs font-bold`}>
                                            <CalendarDaysIcon height={14} width={14} 
                                            color={`${isDark? ('white') : ('#666') }`}
                                            strokeWidth={2}/>
                                            <p>Since {month} {year}</p>
                                    </div>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
                {/* User Bio and Available Labels */}
                <div className='space-y-8 -mt-20 mb-5'>
                    <Bio text={bio} />
                    <div className='space-y-2 !mt-0 md:!mt-4'>
                        <Labels items={labels} />
                        <Divider />
                    </div>
                </div>
            </div>
        </div>
    );

};
