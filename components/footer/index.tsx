// @flow 
import { faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import * as React from 'react';
type Props = {

};
const Footer = (props: Props) => {
    return (
        <div className="max-w-screen-lg w-full mx-auto text-sviolet font-extrabold pt-1 px-8 pb-10">
            <div className="border-t-2 border-sviolet flex flex-wrap lg:flex-nowrap gap-2">
                <div className="max-w-3xl mt-5  md:w-1/2 w-full">
                    <h1 className="text-sviolet text-left font-extrabold text-lg mb-2">Links: </h1>
                    <div className="lg:text-sm text-lg mx-auto  text-white flex gap-4 underline">

                        {/* {(props.userInfo.links && props.userInfo.links.instagram) ?
                    <div className="flex lg:mr-4 lg:w-fit w-1/3 justify-center">
                        <a className="flex lg:gap-1" href={`https://www.instagram.com/${props.userInfo.links.instagram}`}>
                            <FontAwesomeIcon icon={faInstagram} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                            <h1 className="hidden lg:flex">Instagram</h1>
                        </a>
                    </div> : <></>} */}
                        <div className="flex lg:mr-4 lg:w-fit w-1/4 justify-center ">
                            <a className="flex lg:gap-1" href="https://twitter.com/decentdotland">
                                <FontAwesomeIcon icon={faTwitter} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                <h1 className="hidden lg:flex">Twitter</h1>
                            </a>
                        </div>

                        <div className="flex lg:mr-4 lg:w-fit w-1/4 justify-center ">
                            <a className="flex lg:gap-1" href="https://twitter.com/decentdotland">
                                <FontAwesomeIcon icon={faTelegram} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                <h1 className="hidden lg:flex">Twitter</h1>
                            </a>
                        </div>

                        <div className="flex lg:mr-4 lg:w-fit w-1/4 justify-center ">
                            <a className="flex lg:gap-1" href="https://github.com/decentldotland">
                                <FontAwesomeIcon icon={faGithub} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                <h1 className="hidden lg:flex">Github</h1>
                            </a>
                        </div>
                        <div className="flex lg:mr-4 lg:w-fit w-1/4 justify-center ">
                            <a className="flex lg:gap-1" href="https://decent.land">
                                <FontAwesomeIcon icon={faGlobe} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                <h1 className="hidden lg:flex">DecentLand</h1>
                            </a>
                        </div>
                        <div className="flex lg:mr-4 lg:w-fit w-1/4 justify-center z-50">
                            <Link href="/">
                                <a className="flex lg:gap-1">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="pb-2 lg:mr-1 mr-0" width="20" height="30" />
                                    <h1 className="hidden lg:flex">FAQ</h1>
                                </a>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="mt-auto md:w-1/2 w-full mb-2 z-10">
                    <h1 className="text-sm mx-auto lg:text-right text-center text-white font-normal">Copyright © 2021-2022 DecentLand</h1>
                </div>
            </div>
        </div>
    );
};

export default Footer;