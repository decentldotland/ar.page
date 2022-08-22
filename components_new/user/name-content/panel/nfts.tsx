// @flow 
import * as React from 'react';
import Image from 'next/image';
import { motion, useCycle } from "framer-motion";
//@ts-ignore
import { getWeaveAggregator } from "weave-aggregator";
import Modal from '../../../../components/portal/modal';
import ModelContent from './modelContent';
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
    },
};
export const Nfts = (props: Props) => {

    const [animate, cycle] = useCycle(
        {
            y: 0,
            opacity: 1
        },
        {
            y: -100,
            opacity: 0
        },
    );
    const [state, setState] = React.useState<boolean>(false)

    // React.useEffect(() => {
    //     open
    // }, [open])

    const [NFTS, setNFTS] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async function nftsOf() {
            const collectibles = await getWeaveAggregator("koii", props.userInfo.user);
            if (Array.isArray(collectibles))
                setNFTS(collectibles);
        })();
    }, [props.userInfo.user]);

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [current, setCurrent] = React.useState<any>({});
    const [naturalRes, setNaturalRes] = React.useState<any>({});

    const [openList, setOpenList] = React.useState<boolean>(false);

    const handleClose = React.useCallback((NFT = {}) => {
        setCurrent(NFT);
        setIsOpen(opened => !opened);
    }, [])

    return (
        <>
            <div className="flex flex-row justify-between w-full font-medium text-xs">
                {NFTS.length > 0 &&
                <div className="text-start">
                    Collectibles
                </div>}
                {NFTS.length > 3 && 
                    <button className="btn btn-sm btn-secondary btn-outline text-end" onClick={() => setOpenList(isOpen => !isOpen)}>
                        {openList ? "Collapse View" : "View all"}
                    </button>
                }
            </div>
            <div className="w-full font-normal text-sm h-full">
            <div className="grid md:grid-cols-4 gap-4 h-32 mt-2 mx-2">
                {NFTS.length > 0 && NFTS.slice(0, openList ? NFTS.length + 1 : 4).map((
                    owned: { title: string; poster: string; description: string; timestamp: number; id: string; },
                    index: number
                ) =>
                    <motion.div
                        // {...index > 3 ?
                        //     {
                        initial={true}
                        layout
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        style={{
                            y: -100,
                            opacity: 0,
                            height: naturalRes[index]?.height,
                            width: naturalRes[index]?.width
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        // } : {}}
                        key={owned.id}
                        onClick={() => handleClose(owned)}
                        className='rounded-md relative'
                        // className={"h-full w-full"}
                        >

                        <img
                            className='h-32 mx-auto my-auto border-2 border-[#1273EA] bg-[#1273EA] rounded-md'
                            src={`https://pz-prepnb.meson.network/${owned.id}`}>
                        </img>
                        
                        {/* <Image src={`https://pz-prepnb.meson.network/${owned.id}`}
                            alt={owned.title}
                            width="100%" height="100%"
                            layout="fill" // required
                            objectFit="cover" // change to suit your needs
                            className="rounded-md border-2 border-[#1273EA] bg-[#1273EA]" // just an example
                            onLoadingComplete={(e) => {
                                const percent = (e.naturalHeight * (288 / e.naturalWidth) > 288) ? 288 / e.naturalHeight : 288 / e.naturalWidth;
                                setNaturalRes((list: any) => {
                                    return {
                                        ...list, [owned.id]: {
                                            scale: (e.naturalWidth > 288 || e.naturalHeight > 288) ? "Scaled to fit." : "Original resolution.",
                                            width: Math.floor((e.naturalWidth > 288 || e.naturalHeight > 288) ? e.naturalWidth * percent : e.naturalWidth),
                                            height: Math.floor((e.naturalWidth > 288 || e.naturalHeight > 288) ? e.naturalHeight * percent : e.naturalHeight),
                                        }
                                    }
                                });
                                console.log({
                                    [owned.id]: {
                                        width: Math.floor(e.naturalWidth * percent),
                                        height: Math.floor(e.naturalHeight * percent),
                                    }
                                })
                            }} /> */}


                        <div className="mb-8"></div>
                    </motion.div>)}

                    <Modal handleClose={handleClose} isOpen={isOpen}>
                        <ModelContent handleClose={handleClose} naturalRes={naturalRes} current={current} />
                    </Modal>
                </div>
            </div>
        </>
    )
};


