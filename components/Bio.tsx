// @flow 
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

type Props = {
    children?: any;
    className: string;
    userInfo: any;
};
export const Bio = (props: Props) => {

    return (
        <div className={props.className}>
            <div className="max-h-fit w-full mx-auto text-sviolet font-extrabold pt-1 px-6 my-auto">
                <div className="my-auto">
                    <h1 className="text-sviolet text-left font-extrabold text-lg">Bio </h1>
                    <h1 className="lg:text-sm text-lg mx-auto text-left text-white font-normal lg:overflow-y-auto lg:hideScroll lg:h-10">{props.userInfo.bio}</h1>
                </div>
                {(Object.keys(props.userInfo.links).length > 0) ? <>
                    <h1 className="text-sviolet text-left font-extrabold text-lg">Social Links: </h1>
                    <div className="lg:text-sm text-lg mx-auto lg:text-left text-center lg:justify-start justify-center align-center text-white flex gap-4 underline">

                        {(props.userInfo.links && props.userInfo.links.instagram) ?
                            <div className="flex lg:gap-1 lg:mr-4 mt-0 lg:w-fit w-1/3 justify-center">
                                <a className="flex lg:gap-1 lg:mr-2 mr-0" href={`https://www.instagram.com/${props.userInfo.links.instagram}`}>
                                    <FontAwesomeIcon icon={faInstagram} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                    <h1 className="hidden lg:flex">Instagram</h1>
                                </a>
                            </div> : <></>}
                        {(props.userInfo.links && props.userInfo.links.twitter) ?
                            <div className="flex lg:gap-1 lg:mr-4 mt-0 lg:w-fit w-1/3 justify-center">
                                <a className="flex lg:gap-1 lg:mr-2 mr-0" href={`https://www.twitter.com/${props.userInfo.links.twitter}`}>
                                    <FontAwesomeIcon icon={faTwitter} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                    <h1 className="hidden lg:flex">Twitter</h1>
                                </a>
                            </div> : <></>}
                        {(props.userInfo.links && props.userInfo.links.github) ?
                            <div className="flex lg:gap-1 lg:mr-4 mt-0 lg:w-fit w-1/3 justify-center">
                                <a className="flex lg:gap-1 " href={`https://github.com/${props.userInfo.links.github}`}>
                                    <FontAwesomeIcon icon={faGithub} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                    <h1 className="hidden lg:flex">Github</h1>
                                </a>
                            </div> : <></>}
                        {(props.userInfo.links && props.userInfo.links.customUrl) ?
                            <div className="flex lg:gap-1 lg:mr-4 mt-0 lg:w-fit w-1/3 justify-center">
                                <a className="flex lg:gap-1 lg:mr-2 mr-0" href={props.userInfo.links.customUrl}>
                                    <FontAwesomeIcon icon={faGlobe} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                    <h1 className="hidden lg:flex">Website</h1>
                                </a>
                            </div> : <></>}

                    </div></> : <></>}
            </div>
        </div>
    );
};
