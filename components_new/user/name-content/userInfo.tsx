// @flow 
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { useAns } from 'ans-for-all';
import * as React from 'react';
import { ANSData, userInfo } from '../../../src/types';
import Avatar from '../../avatar';

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

    return (
        <div className="flex w-full gap-x-2.5 justify-between">
            <div className="flex w-full gap-x-2.5 items-center">
                {props?.userInfo && (
                    <Avatar ansData={ansData} />
                )}
                {/* nickname and label */}
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-6">
                        {props.userInfo.currentLabel}
                    </div>
                    <div onClick={copy}
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => tippyState == "Copied" ? {} : setVisible(false)}>
                        <Tippy
                            arrow={true}
                            content={<div>{tippyState}</div>}
                            visible={visible}
                            // {...(tippyState !== 'Copied') ? {visible: true} : {} }
                            className="font-mono font-extrabold text-lg visible">

                            <div className="flex flex-row">
                                <div className="text-[10px] font-normal">
                                    <div className="md:flex hidden">
                                        {props.userInfo.user}
                                    </div>
                                    <div className="flex md:hidden">
                                        {(shortenAddress as Function)(props.userInfo.user)}
                                    </div>
                                </div>
                                {/* <div className="ml-1 h-2 w-2"> */}
                                    <FontAwesomeIcon icon={faClipboard} className="ml-1 h-3 w-3"/>
                                    {/* <FontAwesomeIcon icon="fa-regular fa-globe" /> */}
                                {/* </div> */}
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>


            {(Object.keys(links).length > 0) && 
                <div className="mt-2 flex flex-end gap-0 ">
                    {/* <h1 className="text-sviolet text-left font-extrabold text-lg">Social Links: </h1> */}
                    <Icon url={instagram} type={'instagram'} />
                    <Icon url={twitter} type={'twitter'} />
                    <Icon url={github} type={'github'} />
                    <Icon url={customUrl} type={'customUrl'} />
                </div>
            }
        </div>
    );

};