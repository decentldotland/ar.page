// @flow 
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

    return (
        <div className={props.className}>
            <div className="max-h-fit w-full text-2xl mx-auto text-sviolet font-extrabold underline pt-1 pb-4 ">
                <h1 className="text-sviolet font-extrabold underline text-center">NFTS: </h1>
            </div>
            <div className="h-/6 w-full flex flex-wrap gap-12 mx-auto overflow-y-scroll overflow-x-auto px-6">
                {NFTS.map((owned: { title: string; poster: string; description: string; timestamp: number; id: string; }) =>
                    <div key={owned.id} className="lg:basis-1/2 -mx-3 px-3 flex flex-col shrink content-center mb-6 py-6 text-center place-center rounded-3xl shadow-md border-2 border-prim1 shadow-gray-700">
                        <h1 className="lg:text-xl text-2xl text-center font-extrabold text-prim2 underline">{owned.title}</h1>
                        {/* <h1 className="text-xl mx-auto w-full text-white">Image: {owned.poster}</h1> */}
                        <iframe className="mx-auto w-48 h-48 lg:w-32 lg:h-32 my-3" src={`https://koi.rocks/embed/${owned.id}`} title="Koii  NFT image" frameBorder="0" allowFullScreen></iframe>
                        <h1 className="text-md mx-auto text-white px-6">{owned.description}</h1>
                        <h1 className="text-xl mx-auto font-bold text-white flex">{`Acquired `}<h1 className="text-lg mx-auto font-normal text-white">{`: ${owned.timestamp}`}</h1></h1>
                    </div>
                )}
            </div>
        </div>
    );
};