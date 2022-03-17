// @flow 
import { faGlobe, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import moment from 'moment';
import { Rings } from 'react-loader-spinner';

type Props = {
    handleClose: Function;
    current: { title: string; poster: string; description: string; timestamp: number; id: string; };
    naturalRes: any;
};

const ModelContent = (props: Props) => {

    const {
        handleClose,
        current,
        naturalRes
    } = props;

    const [loading, setLoading] = React.useState(true)

    return (

        <div className="rounded-md mx-1  p-6 lg:pb-16 pb-10 max-w-full lg:max-w-screen-md lg:mx-auto h-min  bg-back shadow-md border-2 border-prim1 shadow-black relative">
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleClose()} className="absolute top-3 right-3 text-prim1 rounded-full h-6" />

        <h1 className="text-2xl text-center font-extrabold text-prim2 underline my-4">{current.title}</h1>

        <div className="flex lg:flex-row flex-col lg:gap-x-8 gap-y-4 text-left ">
        <div className={`flex mx-auto my-auto h-full w-[${naturalRes[current.id]?.width}px] relative`}>
            {(loading) ? <div className={`absolute h-[${naturalRes[current.id]?.height}px] w-[${naturalRes[current.id]?.width}px] rounded-md bg-back shadow-md border-2 border-prim1 shadow-black`}>
                <Rings color={'#e3b5a4'}
                    ariaLabel='loading'
                    height={naturalRes[current.id]?.height}
                    width={naturalRes[current.id]?.width} />
            </div> : <></>}

            <iframe title="Koii  NFT image" frameBorder="0" allowFullScreen allowTransparency={true}
                style={{ backgroundColor: '' }}
                height={naturalRes[current.id]?.height}
                width={naturalRes[current.id]?.width}
                onLoad={() => setLoading(false)}
                className={`mx-auto my-auto h-[${naturalRes[current.id]?.height}px] w-[${naturalRes[current.id]?.width}px] shadow-md border-2 border-prim1 shadow-black`}
                src={`https://koi.rocks/embed/${current.id}`} >
            </iframe>
        </div>
            <div className={`flex flex-col col-span-2 lg:w-full pt-4 bg-nftbg p-2 pl-8 lg:h-[${naturalRes[current.id]?.height}px] gap-x-2 place-content-evenly mt-1 rounded-md shadow-md border-2 border-prim1 shadow-black`}>
                <h1 className="text-xl text-prim1 col-span-2 ">{`Description`}<br />
                    <h1 className="font-normal text-white">{current.description}</h1>
                </h1>

                <h1 className="text-xl text-prim1 mt-4 col-span-2 ">{`Acquired`}<br />
                    <h1 className="font-normal text-white">{` ${moment.unix(current.timestamp).format('llll')}`}</h1>
                </h1>
                <div className="col-span-3 mt-4 justify-end">
                    <a className="flex gap-x-2 text-xl underline text-prim1" href={`https://koi.rocks/content-detail/${current.id}`}>
                        <FontAwesomeIcon icon={faGlobe} className="pb-1" width="20" height="30" />
                        <h1 className="lg:flex">Koii Link</h1>
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ModelContent;