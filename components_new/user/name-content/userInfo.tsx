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


    const socialMedias:any = {
        github: { url: "https://github.com/", icon: faGithub },
        instagram: { url: "https://instagram.com/", icon: faInstagram },
        twitter: { url: "https://twitter.com/", icon: faTwitter },
        customUrl: { url: "", icon: faGlobe },
    }

    const Icon = ({type, url}:any) => {
        return (
            <div className="flex lg:gap-1 lg:mr-4 mt-0 w-[32px] justify-center">
                {url &&
                    <a className="flex lg:gap-1 lg:mr-2 mr-0 text-base-content" href={socialMedias?.[type].url + url}>
                        <FontAwesomeIcon icon={socialMedias?.[type].icon} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                    </a>
                }
            </div>
        )
    }

    // @ts-ignore
    const { instagram, twitter, github, customUrl } = props?.userInfo?.links;
    return (
        <div className="flex w-full gap-x-2.5 justify-between">
            <div className="flex w-full gap-x-2.5 items-center">
                <div className="flex rounded-full h-[36px] w-[36px] overflow-hidden btn-secondary border-[2px] mt-1"
                    style={{
                        backgroundColor: props.userInfo?.address_color,
                        border: `2px solid ${props.userInfo?.address_color}`
                    }}>
                    {
                        props.userInfo?.avatar ?
                            <img src={`https://pz-prepnb.meson.network/${props.userInfo?.avatar}`} alt="Profile" width="100%" height="100%" />
                            : 
                            <div className="relative bg-gradient-to-l from-[#9E00FF] to-[#1273EA] w-full h-full text-center rotate-45">
                                <span className="-rotate-45 absolute top-1 left-[11.5px] uppercase">{props?.userInfo?.currentLabel?.[0]}</span>
                            </div>
                    }
                </div>

                {/* nickname and label */}
                <div className="flex flex-col">
                    <div className="text-lg font-medium">
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
                <div className="my-auto mt-2 text-end justify-end align-end flex gap-0">
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