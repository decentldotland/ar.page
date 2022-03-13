// @flow 
import moment from 'moment';
import Image from 'next/image';
import * as React from 'react';
//@ts-ignore
import { getWeaveAggregator } from "weave-aggregator";
import useWindowDimensions from '../src/useWindowDimension';
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
            const collectibles = await getWeaveAggregator("koii", "70sTVhTA5UJD36xqRdNxwyAVwlEV2nFbb0ao-yHjPb8");
            setNFTS(collectibles);
        })();

        console.log(NFTS);
    }, [props.userInfo])

    React.useEffect(() => {
        console.log(NFTS);
    }, [NFTS])


    const [hasTwtr, setHasTwtr] = React.useState<boolean>(true);

    React.useEffect(() => {
        setHasTwtr((prevState) => {
            console.log(prevState);
            const currentState = props.userInfo.links && props.userInfo.links.twitter ? true : false;
            return currentState;
        })
    }, [props.userInfo])

    return (
        <div className={props.className}>
            <div className="max-h-fit w-full mx-auto text-sviolet font-extrabold pt-1">
                <h1 className="text-sviolet text-lg font-extrabold text-center lg:px-12 lg:text-left">NFTs: </h1>
            </div>
            <div className="max-w-full flex flex-wrap flex-column lg:overflow-y-scroll overflow-visible overflow-x-auto px-6 hideScroll lg:h-[17.75rem] h-full mb-3">
            {(NFTS && NFTS.length <= 0) ? <h1 className="lg:text-xl text-2xl text-center mx-auto my-auto font-extrabold text-prim2 overflow-visible"> No NFTs... <br/><br/> None at All.</h1> :
                NFTS.map((owned: { title: string; poster: string; description: string; timestamp: number; id: string; }) =>
                <div key={owned.id} className={hasTwtr ? "lg:basis-1/2 lg:px-6 basis-full" : "lg:basis-1/3 lg:px-6 basis-full"} >
                    <div key={owned.id} className="flex flex-col shrink content-center my-4 py-4 px-3 text-center rounded-xl shadow-md border-2 border-prim1 shadow-gray-700">
                        <h1 className="lg:text-sm text-2xl text-center font-extrabold text-prim2 underline mb-2">{owned.title}</h1>
                        {/* <h1 className="text-xl mx-auto w-full text-white">Image: {owned.poster}</h1> */}
                        <div className="w-48 lg:w-32 lg:h-32 mx-auto">
                            <Image src={`https://arweave.net/${owned.id}`} alt={owned.title} width="100%" height="100%" layout="responsive" objectFit="contain"  />
                        </div>
                        {/*  <iframe className="mx-auto w-48 h-48 lg:w-32 lg:h-32 my-3" src={`https://koi.rocks/embed/${owned.id}`} title="Koii  NFT image" frameBorder="0" allowFullScreen></iframe>  */}
                        {/* <h1 className="text-md mx-auto text-white px-6 mt-2">{owned.description}</h1> */}
                        <h1 className="text-xl lg:text-sm mx-auto font-bold text-white flex mt-2">{`Acquired `}<h1 className="mx-auto font-normal text-white">{`: ${moment.unix(owned.timestamp).format('DD/MM/YYYY')}`}</h1></h1>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};