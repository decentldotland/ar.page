// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { CircularProgress, Snackbar } from '@mui/material';
import {DocumentDuplicateIcon, CalendarDaysIcon, CheckIcon} from '@heroicons/react/24/outline'
import { ANSData, Res, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import { Labels, GenericLabel, getDefaultLabels } from './labels';
import { Bio } from './bio';
import { Divider } from './reusables';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';
import { HackathonLabels } from '../hackathon/api/labels';
import ProfileBadge from './modals/ProfileBadge';
import EditProfile from './EditProfile';
import { IdentityLinks } from '../../../src/types';
import CircularIndeterminate from './reusables';
import { extractMonthAndYear } from '../../../src/utils/dateUtils/extractMonthYear';


interface UserProps { 
    user: userInfo,
    profile: Res | undefined,
    domains: IdentityLinks;
    domainsLoaded: boolean
}

export const UserInfo = ({user, profile, domains, domainsLoaded}: UserProps) => {

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

    let epoch = profile?.first_linkage || user.userInfo.timestamp || 0;
    const { month, year } = extractMonthAndYear(epoch);
    // Labels
    const defaultLabels = getDefaultLabels({
        ENS: domains ? domains.ENS : [], 
        AVVY: domains ? domains.AVVY : [], 
        LENS: domains ? domains.LENS : [],
        ANS: domains ? domains.ANS : [],
        NEAR: domains ? domains.NEAR : [],
        EVMOS: domains ? domains.EVMOS : [],
        URBIT: domains ? domains.URBIT : [],
        LINKS: {twitter, github, instagram, customUrl}, 
    });
    const labels = [
        ...defaultLabels.map((label: any) => <GenericLabel {...label} />),
        ...HackathonLabels(profile)
    ];

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
                    <div className={`ml-5 relative  ${epoch === 0 ? ('bottom-12') : ('bottom-6')} `}>
                        <div className="sm:mt-7  flex flex-row items-center space-x-3 justify-center mt-5">
                            <div className="flex items-center ">
                                <div className={`md:text-2xl text-[28px] 
                                ${isDark ? (' text-white'): (' text-[#000]')}
                                font-bold leading-6 font-inter`}>
                                    {user.userInfo.currentLabel}
                                </div>
                                <ProfileBadge
                                    loading={loading}
                                    is_evaluated={false}
                                    is_verified={profile?.is_verified}
                                    isDark={isDark}
                                />
                            </div>
                            <div className={`px-2 py-2 sm:scale-90 md:scale-100 
                                ${isDark ? ('bg-[#2c467e] text-white'): ('bg-gray-200 text-[#666]')} rounded-lg cursor-pointer`}
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
                        
                        <div className='sm:flex sm:flex-col sm:space-y-1 '>
                            <h3 className={`font-inter 
                            ${isDark ? (' text-white/60'): (' text-[#666]')}
                            text-base mt-1 sm:mb-2 mb-1 
                            text-center sm:text-center md:text-left lg:text-left`} >
                                {user.userInfo.nickname}
                            </h3>
                            <div>
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
                        
                    </div>
                </div>
                {/* User Bio and Available Labels */}
                <div className='space-y-8 -mt-20 mb-5'>
                    <Bio text={bio} />
                    <div className='space-y-2 !mt-0 md:!mt-4'> 
                        {domains ? 
                            <Labels items={labels} />
                        :
                            <span className="flex w-full justify-center items-center">
                                <CircularIndeterminate />
                            </span>
                        }
                        <Divider />
                    </div>
                </div>
            </div>
        </div>
    );

};
