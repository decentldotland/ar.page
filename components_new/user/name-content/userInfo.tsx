// @flow 
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { useAns } from 'ans-for-all';
import * as React from 'react';
type Props = {
    userInfo: {
        user: string;
        currentLabel: string;
        ownedLabels?: {
            label: string;
            scarcity: string;
            acquisationBlock: number;
            mintedFor: number;
        }[],
        nickname?: string;
        address_color: string;
        bio?: string;
        avatar?: string;
        links?: {
            github?: string;
            twitter?: string;
            customUrl?: string;
            instagram?: string;
        },
        subdomains?: any;
        freeSubdomains: number;
    };
};
export const UserInfo = (props: Props) => {

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


    return (
        <div className="grow flex flex-row gap-x-2.5 justify-between">
            <div className="flex flex-row gap-x-2.5">
                <div className="flex rounded-full h-[36px] w-[36px] overflow-hidden ml-2 btn-secondary border-[2px] mt-2"
                    style={{
                        backgroundColor: props.userInfo?.address_color,
                        border: `2px solid ${props.userInfo?.address_color}`
                    }}>
                    {
                        props.userInfo?.avatar &&
                        <img src={`https://pz-prepnb.meson.network/${props.userInfo?.avatar}`}
                            alt="Profile" width="100%" height="100%" />
                    }
                </div>

                {/* nickname and label */}
                <div className="flex flex-col">
                    <div className=" text-lg font-medium">
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


            {(Object.keys(links).length > 0) ? <>
                {/* <h1 className="text-sviolet text-left font-extrabold text-lg">Social Links: </h1> */}
                <div className="my-auto mt-2 text-black text-end justify-end align-end flex gap-0 underline">

                    {(props.userInfo.links && props.userInfo.links.instagram) ?
                        <div className="flex lg:gap-1 lg:mr-4 mt-0 w-[32px] justify-center">
                            <a className="flex lg:gap-1 lg:mr-2 mr-0" href={`https://www.instagram.com/${props.userInfo.links.instagram}`}>
                                <FontAwesomeIcon icon={faInstagram} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                            </a>
                        </div> : <></>}
                    {(props.userInfo.links && props.userInfo.links.twitter) ?
                        <div className="flex lg:gap-1 lg:mr-4 mt-0 w-[32px] justify-center">
                            <a className="flex lg:gap-1 lg:mr-2 mr-0" href={`https://www.twitter.com/${props.userInfo.links.twitter}`}>
                                <FontAwesomeIcon icon={faTwitter} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />                           </a>
                        </div> : <></>}
                    {(props.userInfo.links && props.userInfo.links.github) ?
                        <div className="flex lg:gap-1 lg:mr-4 mt-0 w-[32px] justify-center">
                            <a className="flex lg:gap-1 " href={`https://github.com/${props.userInfo.links.github}`}>
                                <FontAwesomeIcon icon={faGithub} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />                          </a>
                        </div> : <></>}
                    {(props.userInfo.links && props.userInfo.links.customUrl) ?
                        <div className="flex lg:gap-1 lg:mr-4 mt-0 w-[32px] justify-center">
                            <a className="flex lg:gap-1 lg:mr-2 mr-0" href={props.userInfo.links.customUrl}>
                                <FontAwesomeIcon icon={faGlobe} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />                           </a>
                        </div> : <></>}

                </div></> : <></>}
        </div>
    );

};