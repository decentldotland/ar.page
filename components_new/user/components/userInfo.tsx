// @flow 
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { useAns } from 'ans-for-all';
import * as React from 'react';
import { ANSData, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import {DocumentDuplicateIcon, CalendarDaysIcon} from '@heroicons/react/24/outline'
import {CheckBadgeIcon} from '@heroicons/react/24/solid'
import { Labels } from './labels';
import { Bio } from './bio';

export const UserInfo = (props: userInfo) => {

    const links = props.userInfo.links !== undefined ? props.userInfo.links : {};

    const {
        shortenAddress,
    } = useAns();

    const [tippyState, setTippyState] = React.useState("Copy");
    const [visible, setVisible] = React.useState(false);

    const copyTimer = React.useCallback(() => {
        const timer = setTimeout(
            () => {
                setTimeout(
                    () => {
                        setVisible(false);
                    }, 500);
                setTippyState("Copy");
            }, 2000);
    }, []);

    const copy = React.useCallback(() => {
        setTippyState("Copied");
        setVisible(true);
        copyTimer()
        navigator.clipboard.writeText(props.userInfo.user);
    }, [copyTimer, props.userInfo.user])


    const socialMedias:any = {
        github: { url: "https://github.com/", icon: faGithub },
        instagram: { url: "https://instagram.com/", icon: faInstagram },
        twitter: { url: "https://twitter.com/", icon: faTwitter },
        customUrl: { url: "", icon: faGlobe },
    }

    const Icon = ({type, url}:any) => {
        return (
            <div className="flex ml-4 mt-0 w-[32px] justify-center">
                {url &&
                    <a className="flex text-base-content" href={socialMedias?.[type].url + url}>
                        <FontAwesomeIcon icon={socialMedias?.[type].icon} className="w-5 h-[32px]" />
                    </a>
                }
            </div>
        )
    }

    // @ts-ignore
    const { instagram, twitter, github, customUrl } = props?.userInfo?.links;
    const { currentLabel, address_color, avatar } = props?.userInfo;

    const ansData:ANSData = {
        currentLabel: currentLabel,
        address_color: address_color,
        avatar: avatar,
    };

    // User bio
    const bio = typeof props.userInfo.bio === 'string' ? 
    props.userInfo.bio : "";

    return (
        <div>
            <div className="relative ">
                <div className="relative bottom-20 flex flex-row items-end mt-3">
                    {props?.userInfo && ( <ProfileAvatar ansData={ansData} /> )}
                    {/* nickname and label */}
                    <div className='ml-5 mb-5'>
                        <div className="flex flex-row space-x-3 items-center mt-3">
                            <div className="text-2xl font-bold leading-6 font-inter ">
                                {props.userInfo.currentLabel}
                            </div>
                            <CheckBadgeIcon height={30} width={30} color={"#325FFE"} />
                            <div 
                                className='p-2 bg-base-200 rounded-xl  '
                                onClick={copy}
                                onMouseEnter={() => setVisible(true)}
                                onMouseLeave={() => tippyState == "Copied" ? {} : setVisible(false)}>
                                <Tippy
                                    arrow={true}
                                    content={<div>{tippyState}</div>}
                                    visible={visible}
                                    // {...(tippyState !== 'Copied') ? {visible: true} : {} }
                                    className="font-inter text-sm visible">
                                    <div className="flex flex-row font-inter font-semibold text-[#666]">
                                        <h3 className='mr-1'>
                                            {(shortenAddress as Function)(props.userInfo.user)}
                                        </h3>
                                        
                                        <DocumentDuplicateIcon height={20} width={20} color={"#666"} strokeWidth={2} />
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                        <h3 className='font-inter text-[#666] text-base mt-1 mb-1'>
                            {props.userInfo.nickname}
                        </h3>
                        {/* DAO memberships */}
                        <div className='flex flex-row items-center space-x-2 '>
                            {/* <DaoMembership  userInfo={props.userInfo}/> */}
                            {/* User Membership Date */}
                            <div className='flex flex-row  items-center space-x-1 text-[#666]
                                py-1 px-2 w-fit bg-base-200 rounded-lg font-inter  text-xs font-bold'>
                                <CalendarDaysIcon height={14} width={14} color={'#666'} strokeWidth={2}/>
                                <p>Since Nov 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute top-20 mt-10 space-y-4'>
                    <Bio text={bio} />
                    <Labels userInfo={props.userInfo} />
                </div>
            </div>
        </div>
    );

};