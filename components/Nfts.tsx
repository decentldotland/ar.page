// @flow 
import { faGlobe, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Image from 'next/image';
import * as React from 'react';
//@ts-ignore
import { getWeaveAggregator } from "weave-aggregator";
import useWindowDimensions from '../src/useWindowDimension';
import Modal from './Nfts/modal';
type Props = {
    children?: any;
    className: string;
    userInfo: any;
};
export const Nfts = (props: Props) => {
    const { width, height } = useWindowDimensions();

    const [NFTS, setNFTS] = React.useState<any[]>([])

    React.useEffect(() => {
        (async function nftsOf() {
            const collectibles = await getWeaveAggregator("koii", props.userInfo.user);
            // "70sTVhTA5UJD36xqRdNxwyAVwlEV2nFbb0ao-yHjPb8")
            setNFTS(collectibles);
        })();
    }, [props.userInfo.user]);

    const [hasTwtr, setHasTwtr] = React.useState<boolean>(true);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [current, setCurrent] = React.useState<any>({});

    const handleClose = React.useCallback((NFT = {}) => {
        setCurrent(NFT);
        setIsOpen(opened => !opened);
    }, [])

    React.useEffect(() => {
        setHasTwtr((prevState) => {
            console.log(prevState);
            const currentState = props.userInfo.links && props.userInfo.links.twitter ? true : false;
            return currentState;
        })
    }, [props.userInfo])

    return (
        <div className={props.className}>
            <div className="max-h-fit w-full mx-auto text-sviolet font-extrabold">
                <h1 className="text-sviolet text-lg font-extrabold px-9 lg:px-12 text-left mt-4">NFTs: </h1>
            </div>
            {/* flex flex-wrap flex-column */}
            <div className="max-w-full grid grid-cols-6 grid-flow-row auto-rows-max lg:overflow-y-scroll overflow-visible overflow-x-auto px-6 hideScroll lg:h-[17.75rem] h-full mb-3">
                {(NFTS && NFTS.length <= 0) ? <div className="col-span-6 flex lg:mt-32 mt-12 mx-auto my-auto" >
                    <h1 className="lg:text-xl text-2xl text-center font-extrabold text-prim2 overflow-visible">This user does not own any Koii NFTs</h1>
                </div> :
                    NFTS.map((owned: { title: string; poster: string; description: string; timestamp: number; id: string; }) =>
                    // "lg:w-1/2 lg:px-6 h-full basis-full" : "lg:w-1/3 h-full lg:px-6 basis-full"
                        <div onClick={() => handleClose(owned)} key={owned.id} className={hasTwtr ? "lg:col-span-3 col-span-6 lg:px-6 h-full min-h-full" : "lg:col-span-2 col-span-6 h-full min-h-full lg:px-6"}>
                            <div className="flex flex-col shrink content-center my-2 py-2 px-3 text-center rounded-md shadow-md border-2 bg-nftbg border-prim1 shadow-black h-64">
                                <h1 className="lg:text-sm text-lg text-center font-extrabold text-prim2 underline text-overflow-trunc lg:text-overflow-none mt-1 mb-2">{owned.title}</h1>
                                <div className="container w-40 lg:w-40 h-40 max-h-fit mx-auto my-auto">
                                    <Image src={`https://arweave.net/${owned.id}`} alt={owned.title} width="100%" height="100%" layout="responsive" objectFit="contain" />
                                </div>
                                <h1 className="text-lg lg:text-sm mx-auto font-bold text-white flex my-2">{`Acquired `}<h1 className="mx-auto font-normal text-white">{`: ${moment.unix(owned.timestamp).format('DD/MM/YYYY')}`}</h1></h1>
                            </div>
                        </div>
                    )}

                <Modal handleClose={handleClose} isOpen={isOpen}>
                    <div className="rounded-md mx-1  p-6 lg:pb-16 pb-10 max-w-full lg:max-w-screen-md lg:mx-auto h-min  bg-back shadow-md border-2 border-prim1 shadow-black relative">
                        {/* <div className="flex flex-col shrink content-center my-4 py-4 px-3 text-center rounded-xl shadow-md border-2 border-prim1 shadow-black"> */}


                        <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleClose()} className="absolute top-3 right-3 text-prim1 rounded-full h-6" />

                        <h1 className="text-2xl text-center font-extrabold text-prim2 underline my-4">{current.title}</h1>

                        <div className="grid grid-cols-2 gap-x-8 text-left">
                            <iframe title="Koii  NFT image" frameBorder="0" allowFullScreen allowTransparency={true}
                                style={{ backgroundColor: '' }}
                                className="mx-auto w-full h-64 lg:h-[110%] m-1  col-span-2 lg:col-span-1 bg-back"
                                src={`https://koi.rocks/embed/${current.id}`} >
                            </iframe>

                            {/* 
                                ##### 
                                    if koii iframe is performance impacting comment above iframe and uncomment image div below 
                                ##### 
                            */}

                            {/* <div className="mx-auto w-full h-64 lg:h-full m-1  col-span-2 lg:col-span-1 bg-back">
                                    <Image src={`https://arweave.net/${current.id}`} alt={current.title} width="100%" height="100%" layout="responsive" objectFit="contain" />
                            </div> */}

                            <div className="flex flex-col col-span-2 lg:col-span-1 pt-4 bg-nftbg p-2 lg:h-[110%] gap-x-2 place-content-evenly mt-1 rounded-md">
                                <h1 className="text-xl text-prim1 col-span-2 ">{`Description`}<br />
                                    <h1 className="font-normal text-white">{current.description}</h1>
                                </h1>

                                <h1 className="text-xl text-prim1 mt-4 col-span-2 ">{`Acquired`}<br />
                                    <h1 className="font-normal text-white">{` ${moment.unix(current.timestamp).format('DD/MM/YYYY')}`}</h1>
                                </h1>
                                <div className="col-span-3 mt-4 justify-end">
                                    <a className="flex gap-x-2 text-xl underline text-prim1" href={`https://koi.rocks/content-detail/${current.id}`}>
                                        <FontAwesomeIcon icon={faGlobe} className="pb-1" width="20" height="30" />
                                        <h1 className="lg:flex">Koii Link</h1>
                                    </a>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};