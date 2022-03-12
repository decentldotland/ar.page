// @flow 
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

type Props = {
    children?: any;
    className: string;
    userInfo: any;
};
export const Bio = (props: Props) => {
    return (
        <div className={props.className}>
            <div className="max-h-fit w-full mx-auto text-sviolet font-extrabold underline pt-1 my-2 px-6 ">
                <h1 className="text-sviolet text-left font-extrabold underline text-lg">Bio: </h1>
                <h1 className="lg:text-sm text-lg mx-auto text-left text-white font-normal lg:overflow-y-auto lg:hideScroll lg:h-10">{props.userInfo.bio}</h1>
                <h1 className="text-sviolet text-left font-extrabold underliner text-lg">Social Links: </h1>
                <div className="lg:text-sm text-lg mx-auto lg:text-left text-center lg:justify-start justify-center align-center text-white flex gap-4">
                    <a className="flex lg:gap-1 lg:w-fit w-1/3 justify-center"><FontAwesomeIcon icon={faTwitter} className="pb-2" width="20" height="30"/>
                        <h1 className="hidden lg:flex">Twitter</h1>
                    </a>
                    <a className="flex lg:gap-1  lg:w-fit w-1/3 justify-center"><FontAwesomeIcon icon={faGithub} className="pb-2" width="20" height="30"/>
                        <h1 className="hidden lg:flex">Github</h1>
                    </a>
                    <a className="flex lg:gap-1  lg:w-fit w-1/3 justify-center"><FontAwesomeIcon icon={faGlobe} className="pb-2" width="20" height="30"/>
                        <h1 className="hidden lg:flex">Website</h1>
                    </a>
                </div>
            </div>
        </div>
    );
};