// @flow 
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { useAns } from 'ans-for-all';
import * as React from 'react';
import { ANSData, Res, userInfo } from '../../../src/types';
import ProfileAvatar from '../../avatar/ProfileAvatar';
import {DocumentDuplicateIcon, CalendarDaysIcon} from '@heroicons/react/24/outline'
import {CheckBadgeIcon, ShieldExclamationIcon} from '@heroicons/react/24/solid'
import { Labels } from './labels';
import { Bio } from './bio';
import { ANSIdentitiesManager, Poaps } from '../hackathon';
import {SiEthereum} from 'react-icons/si'
import {FaEthereum} from 'react-icons/fa'
import {BsGithub, BsTwitter, BsTelegram, BsInstagram, BsGlobe2} from 'react-icons/bs'

import { Globe,  } from 'react-feather';
import { getURL } from 'next/dist/shared/lib/utils';


interface UserProps { 
    user: userInfo,
    profile: Res | undefined
}

export const UserInfo = ({user, profile}: UserProps) => {

    const links = user.userInfo.links !== undefined ? user.userInfo.links : {};

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
        navigator.clipboard.writeText(user.userInfo.user);
    }, [copyTimer, user.userInfo.user])


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
    // console.log(user.userInfo)
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
    let member_since = new Date(profile?.first_linkage! * 1000);
    // console.log(`${member_since} THIS IS WHEN YOU FIRST LINKED YOUR ACCOUNT`)
    let [month, year] = [member_since.toLocaleString('default', {month: 'short'}), member_since.getFullYear()];

    // Avvy Label
    const AVVYLabel = function() { 
        return (
          
            profile?.AVVY ? (
                <button className="px-3 font-inter 
                font-semibold py-1
                bg-[#E84040]/80 text-white text-sm rounded-2xl flex flex-row items-center">
                <img 
                    width={30}
                    height={30}
                    className="mr-2 "
                    src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023" alt="" />
                    <h3 className="font-inter"> {profile?.AVVY}</h3>
                </button>
              ):( 
                <p className='hidden'></p>
              )
          
        )
      }
      
    //   ENS label
      const ENSLabel = function() { 
        return (
          
            profile?.ENS ? (
            <button className="px-2 py-1  font-bold space-x-1
               bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <FaEthereum width={100} height={100} color={"#1273ea"}/>
                <h3 className='font-inter'>
                  {profile?.ENS}
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }
    //   Instagram
      const Instagram = function() { 
        return (
          
            user?.userInfo?.links?.instagram ? (
            <button className="px-2 py-1  font-bold space-x-1
               bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <BsInstagram width={100} height={100} color={"#1273ea"}/>
                <h3 className='font-inter'>
                  {instagram}
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }
    //   Twitter
      const Twitter = function() { 
        return (
          
            user?.userInfo?.links?.twitter? (
            <button className="px-2 py-1  font-bold space-x-1
               bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <BsTwitter width={100} height={100} color={"#1273ea"}/>
                <h3 className='font-inter'>
                  {twitter}
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }
    //   Github
      const Github = function() { 
        return (
          
            user?.userInfo?.links?.github ? (
            <button className="px-2 py-1  font-bold space-x-1
               bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <BsGithub width={100} height={100} color={"#1273ea"}/>
                <h3 className='font-inter'>
                  {github}
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }
      const CustomURL = function() { 
        return (
          
            user?.userInfo?.links?.customUrl ? (
            <button className="px-2 py-1  font-bold space-x-1
               bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <BsGlobe2 width={100} height={100} color={"#1273ea"}/>
                <h3 className='font-inter'>
                  {removeHttp(user?.userInfo?.links?.customUrl)}
                  
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }
      const Telegram = function() { 
        return (
          
            profile?.telegram?.username ? (
            <button className="px-2 py-1  font-bold space-x-1
               bg-[#1273ea]/10 text-[#1273ea] text-sm rounded-2xl flex flex-row items-center">
                
                <BsTelegram width={100} height={100} color={"#1273ea"}/>
                <h3 className='font-inter'>
                  {profile?.telegram.username}
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }


    return (
        <div>
            <div className="relative mb-10">
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
                            <div 
                                className='px-2 py-2 bg-base-200 rounded-lg  '
                                onClick={copy}
                                onMouseEnter={() => setVisible(true)}
                                onMouseLeave={() => tippyState == "Copied" ? {} : setVisible(false)}>
                                <Tippy
                                    arrow={true}
                                    content={<div>{tippyState}</div>}
                                    visible={visible}
                                    // {...(tippyState !== 'Copied') ? {visible: true} : {} }
                                    className="font-inter text-sm visible">
                                    <div className="flex flex-row font-inter font-semibold text-[#666] text-sm">
                                        <h3 className='mr-1'>
                                            {(shortenAddress as Function)(user.userInfo.user)}
                                        </h3>
                                        
                                        <DocumentDuplicateIcon height={20} width={20} color={"#666"} strokeWidth={2} />
                                    </div>
                                </Tippy>
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
                <div className='absolute top-20 mt-10 space-y-4'>
                    <Bio text={bio} />
                    
                    
                    
                    {/* {profile && profile?.POAPS && <Poaps props={profile} />} */}
                    {/* {profile && <ANSIdentitiesManager props={profile} />} */}

                    <div className="flex flex-row space-x-2 overflow-x-scroll scrollbar-none">
                        <Labels user={user} />
                        <AVVYLabel />
                        <ENSLabel />
                        <Instagram />
                        <Twitter />
                        <Github />
                        <Telegram />
                        <CustomURL />
                    </div>
                </div>
            </div>
        </div>
    );

};

function removeHttp(url: string) {
    if (url.startsWith('https://www.')) {
      const https = 'https://www.';
      return url.slice(https.length);
    }
  
    if (url.startsWith('http://www.')) {
      const http = 'http://www.';
      return url.slice(http.length);
    }
  
    return url;
  }