// @flow 
import { useAns } from 'ans-for-all';
import * as React from 'react';
import { ANSData, Res, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import {DocumentDuplicateIcon, CalendarDaysIcon} from '@heroicons/react/24/outline'
import {CheckBadgeIcon, ShieldExclamationIcon} from '@heroicons/react/24/solid'
import { Labels } from './labels';
import { Bio } from './bio';

import {BsGithub, BsTwitter, BsTelegram, BsInstagram, BsGlobe2} from 'react-icons/bs'
import { removeHttp } from '../../../src/utils'
import Link from 'next/link';
import { Snackbar } from '@mui/material';

interface UserProps { 
    user: userInfo,
    profile: Res | undefined
}

export const UserInfo = ({user, profile}: UserProps) => {

    const links = user.userInfo.links !== undefined ? user.userInfo.links : {};

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
    const { currentLabel, address_color, avatar } = user?.userInfo;

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
    let member_since = new Date( epoch * 1000);
    let [month, year] = [member_since.toLocaleString('default', {month: 'short'}), member_since.getFullYear()];


    const Telegram = function() { 

        let username = profile?.telegram?.username

        return (
          
            profile?.telegram?.username! ? (
            <button className="px-2 py-1 space-x-1
                font-bold bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <BsTelegram width={100} height={100} color={"#1273ea"}/>
                  {
                    username !== null || undefined ? (
                      <h3 className='font-inter'>
                        {profile?.ANS.nickname}
                      </h3>
                      ):(
                        <h3 className="font-inter">
                          {profile?.telegram.username} 
                        </h3>
                    )
                  }
            </button>
            ): ( <p className='hidden'></p> )
        )
    }

    const GenericLabel = ({username, colors, icon, link_to, copy}: {
        username: string | undefined, 
        colors: string, 
        icon: any,
        link_to: string | null,
        copy: boolean
      }) => {
        if (!username) return <></>
        return (
            <button 
                
                className={`${colors} px-2 py-1 font-bold text-sm rounded-2xl`}>
                {copy && link_to! && link_to !== customUrl ? (
                    <Link href={`${link_to}/${username}/`} passHref>
                        <a target="_blank" rel="noopener noreferrer" className='hover:opacity-60 flex flex-row items-center space-x-1 '>
                            {icon}
                            <h3 className="font-inter">
                                {removeHttp(username)}
                            </h3>
                        </a>
                    </Link>
                ): ( copy && link_to! && link_to == customUrl ? (
                    <Link href={`${link_to}`} passHref>
                        <a target="_blank" rel="noopener noreferrer" className='hover:opacity-60 flex flex-row items-center space-x-1 '>
                            {icon}
                            <h3 className="font-inter">
                                {removeHttp(username)}
                            </h3>
                        </a>
                    </Link>
                ) : (
                    <div className={`flex flex-row items-center space-x-1`}
                        onClick={() =>{ copy_text(username); }} >
                            {icon}
                        <h3 className="font-inter">
                            {removeHttp(username)}
                        </h3>
                        <Snackbar
                            message="Copied to clibboard"
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            autoHideDuration={2000}
                            onClose={() => setOpen(false)}
                            open={open}
                        />
                    </div>
                    )
                )}
            </button>
        )
    }
    const colorProps = "bg-primary/10 text-primary"
    const avaxColor = "bg-[#E84040]/80 text-white"
    const ethColor = "bg-[#8a92b2]/20 text-[#454a75]"
    const iconProps = {width: 100, height: 100, color: "#1273ea"}
    const newLinks = [
        // {username: profile?.ANS.nickname, colors: colorProps, icon: <FaUser {...iconProps} />},
        {username: profile?.AVVY, colors: avaxColor, 
          link_to: null,
          copy: true,  
          icon: <img 
            width={30} 
            height={30} 
            src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023"/>
        },
            

        {username: profile?.ENS, colors: ethColor, 
          link_to: null,
          copy: true, 
          icon: <img 
            height={13}
            width={13}
            src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"  
            alt="" /> 
        },
        // {username: profile?.telegram?.username, colors: colorProps, icon: <BsTelegram {...iconProps}/>},
        {username: twitter, colors: colorProps, 
          link_to: "https://twitter.com",
          copy: true,  
          icon: <BsTwitter {...iconProps} />},
        {username: github, colors: colorProps, 
          link_to: "https://github.com/",
          copy: true,  
          icon: <BsGithub {...iconProps} />},
        {username: instagram, colors: colorProps, 
          link_to: "https://instagram.com/",
          copy: true,  
          icon: <BsInstagram {...iconProps}/>},
        {username: customUrl, colors: colorProps, 
          link_to: customUrl,
          copy: true,  
          icon: <BsGlobe2 {...iconProps}/>},
    ]

    const socials = newLinks.map((social, i) => <GenericLabel 
      username={social.username} 
      colors={social.colors} 
      icon={social.icon}
      link_to={social.link_to}
      copy={social.copy} 
    />)

    const items = [
        <Labels user={user} />,
        ...socials,
    ]

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
                                    message="Copied to clibboard"
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
                <div className='space-y-6 -mt-20'>
                    <Bio text={bio} />
                    {/* {profile && profile?.POAPS && <Poaps props={profile} />} */}
                    {/* {profile && <ANSIdentitiesManager props={profile} />} */}
                    <div className="flex flex-row carousel space-x-2 transition duration-400 relative ">
                        {items.map((item, index) => (
                            <div key={index} className="carousel-item">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

};
