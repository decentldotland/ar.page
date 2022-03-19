// @flow 
import moment from 'moment';
import Image from 'next/image';
import * as React from 'react';
//@ts-ignore
import { getWeaveAggregator } from "weave-aggregator";
import useWindowDimensions from '../src/useWindowDimension';
import Modal from './Nfts/modal';
import ModelContent from './Nfts/modelContent';
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
            setNFTS(collectibles);
        })();
    }, [props.userInfo.user]);

    const [hasTwtr, setHasTwtr] = React.useState<boolean>(true);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [current, setCurrent] = React.useState<any>({});
    const [naturalRes, setNaturalRes] = React.useState<any>({});

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


    React.useEffect(() => {
        if (NFTS.length === naturalRes.length)
            console.log(naturalRes)
    }, [NFTS, naturalRes])


    return (
        <div className={props.className}>
            <div className="max-h-fit w-full mx-auto text-sviolet font-extrabold">
                <h1 className="text-sviolet text-lg font-extrabold px-9 lg:px-12 text-left mt-4">NFTs </h1>
            </div>
            <div className="max-w-full grid grid-cols-6 grid-flow-row auto-rows-max lg:overflow-y-scroll overflow-visible overflow-x-auto px-6 hideScroll lg:h-[17.75rem] h-full mb-3">
                {(NFTS && NFTS.length <= 0) ? <div className="col-span-6 flex lg:mt-32 mt-12 mx-auto my-auto" >
                    <h1 className="lg:text-xl text-2xl text-center font-extrabold text-prim2 overflow-visible">This user does not own any Koii NFTs</h1>
                </div> :
                    NFTS.map((owned: { title: string; poster: string; description: string; timestamp: number; id: string; }) =>
                        <div onClick={() => handleClose(owned)} key={owned.id} className={hasTwtr ? "lg:col-span-3 col-span-6 lg:px-6 h-full min-h-full" : "lg:col-span-2 col-span-6 h-full min-h-full lg:px-6"}>
                            <div className="flex flex-col shrink content-center my-2 py-2 px-3 text-center rounded-md shadow-md border-2 bg-nftbg border-prim1 shadow-black h-64">
                                <h1 className="lg:text-sm text-lg text-center font-extrabold text-prim2 underline text-overflow-trunc lg:text-overflow-none mt-1 mb-2">{owned.title}</h1>
                                <div className="container w-40 lg:w-40 h-40 max-h-fit mx-auto my-auto">
                                    <Image src={`https://arweave.net/${owned.id}`}
                                        alt={owned.title}
                                        width="100%" height="100%"
                                        layout="responsive" objectFit="contain"
                                        onLoadingComplete={(e) => {
                                            const percent = (e.naturalHeight * (288 / e.naturalWidth) > 288) ?  288 / e.naturalHeight : 288 / e.naturalWidth;
                                            setNaturalRes((list: any) => {
                                                return {
                                                    ...list, [owned.id]: {
                                                        scale: (e.naturalWidth > 288 || e.naturalHeight > 288 ) ? "Scaled to fit." : "Original resolution.",
                                                        width: Math.floor((e.naturalWidth > 288 || e.naturalHeight > 288 ) ? e.naturalWidth * percent : e.naturalWidth),
                                                        height: Math.floor((e.naturalWidth > 288 || e.naturalHeight > 288 ) ? e.naturalHeight * percent : e.naturalHeight),
                                                    }
                                                }
                                            });
                                            console.log({
                                                [owned.id]: {
                                                    width: Math.floor(e.naturalWidth * percent),
                                                    height: Math.floor(e.naturalHeight * percent),
                                                }
                                            })
                                        }} />
                                </div>
                                <h1 className="text-lg lg:text-sm mx-auto font-bold text-white flex my-2">{`Acquired `}<h1 className="mx-auto font-normal text-white">{`: ${moment.unix(owned.timestamp).format('DD/MM/YYYY')}`}</h1></h1>
                            </div>
                        </div>
                    )}

                <Modal handleClose={handleClose} isOpen={isOpen}>
                    <ModelContent handleClose={handleClose} naturalRes={naturalRes} current={current} />
                </Modal>
            </div>
        </div>
    );
};