// @flow 
import * as React from 'react';
import Image from 'next/image';
import { motion, useCycle } from "framer-motion";
//@ts-ignore
import { getWeaveAggregator } from "weave-aggregator";
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
    open: boolean;
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

    React.useEffect(() => {
        props.open 
    }, [props.open])

    const [NFTS, setNFTS] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async function nftsOf() {
            const collectibles = await getWeaveAggregator("koii", props.userInfo.user);
            setNFTS(collectibles);
        })();
    }, [props.userInfo.user]);

    return <div className="grid md:grid-cols-4 gap-4 h-32 mt-2 mx-2">
        {NFTS.slice(0, props.open ? NFTS.length + 1 : 4).map((
            owned: { title: string; poster: string; description: string; timestamp: number; id: string; },
            index: number
        ) =>
            <motion.div
                {...index > 3 ?
                    {
                        animate: animate,
                        transition: {
                            duration: 0.5,
                        }
                    } : {}}
                key={owned.id}
                className={"h-full w-full"}>

                <img
                    className='h-32 mx-auto my-auto border-2 border-[#1273EA] bg-[#1273EA] rounded-md'
                    src={`https://arweave.net/${owned.id}`}>
                </img>


            </motion.div>)}
    </div>
};


