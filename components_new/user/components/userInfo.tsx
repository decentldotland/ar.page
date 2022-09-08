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
import {FaEthereum, FaUser} from 'react-icons/fa'
import {BsGithub, BsTwitter, BsTelegram, BsInstagram, BsGlobe2} from 'react-icons/bs'
import { removeHttp } from '../../../src/utils'

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
    let epoch = profile?.first_linkage || 0;
    let member_since = new Date( epoch * 1000);
    // console.log(`${member_since} THIS IS WHEN YOU FIRST LINKED YOUR ACCOUNT`)
    let [month, year] = [member_since.toLocaleString('default', {month: 'short'}), member_since.getFullYear()];

    //  Below could need some refactoring
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
            <button className="py-1  font-bold -space-x-3.5 px-1
               bg-[#8a92b2]/20 text-[#454a75] text-sm rounded-2xl flex flex-row items-center">
                <img 
                  height={40}
                  width={40}
                  
                  className="relative right-2"
                  // className="bg-black "
                  src="https://www.logo.wine/a/logo/Ethereum/Ethereum-Icon-Purple-Logo.wine.svg"  
                  alt="" />
                {/* <FaEthereum width={100} height={100} color={"#1273ea"}/> */}
                <h3 className='font-inter relative right-1'>
                  {profile?.ENS}
                </h3>
              
            </button>
      
            ): ( <p className='hidden'></p> )
        )
      }
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

    const GenericLabel = ({username, colors, icon}: {username: string | undefined, colors: string, icon: any}) => {
        if (!username) return <></>
        return (
            <button className={`${colors} px-2 py-1 space-x-1 font-bold text-sm rounded-2xl flex flex-row items-center`}>
                    {icon}
                    <h3 className="font-inter">
                        {removeHttp(username)}
                    </h3>
            </button>
        )
    }
    const colorProps = "bg-primary/10 text-primary"
    const avaxColor = "bg-[#E84040]/80 text-white"
    const ethColor = "bg-[#8a92b2]/20 text-[#454a75]"
    const iconProps = {width: 100, height: 100, color: "#1273ea"}
    const newLinks = [
        {username: profile?.ANS.nickname, colors: colorProps, icon: <FaUser {...iconProps} />},
        {username: profile?.AVVY, colors: avaxColor, icon: <img width={30} height={30} src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023" alt="" />},
        {username: profile?.ENS, colors: ethColor, icon: <FaEthereum {...iconProps} />},
        // {username: profile?.telegram?.username, colors: colorProps, icon: <BsTelegram {...iconProps}/>},
        {username: twitter, colors: colorProps, icon: <BsTwitter {...iconProps} />},
        {username: github, colors: colorProps, icon: <BsGithub {...iconProps} />},
        {username: instagram, colors: colorProps, icon: <BsInstagram {...iconProps}/>},
        {username: customUrl, colors: colorProps, icon: <BsGlobe2 {...iconProps}/>},
    ]

    const socials = newLinks.map((social, i) => <GenericLabel username={social.username} colors={social.colors} icon={social.icon} />)

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
