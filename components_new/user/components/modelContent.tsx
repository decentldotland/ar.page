// @flow 
import * as React from 'react';
import { Rings } from 'react-loader-spinner';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';
import useWindowDimensions from '../../../src/useWindowDimension';
import Image from 'next/image';
import { CircleX } from './reusables';
import { ViewNftButton } from '../../buttons';
import { truncate } from '../../../src/utils/truncateText';

type Props = {
    handleClose: Function;
    current: { title: string; poster: string; description: string; timestamp: number; id: string; };
    naturalRes: any;
};

const ModelContent = (props: Props) => {
    console.log("current", props.current)
    const { width: _width, height: _height } = useWindowDimensions();

    const [isDark, setIsDark] = useRecoilState(isDarkMode);

    const {
        handleClose,
        current,
        naturalRes
    } = props;
    const width = React.useRef(naturalRes[current.id]?.width).current;
    const height = React.useRef(naturalRes[current.id]?.height).current;
    const scale = React.useRef(naturalRes[current.id]?.scale).current;
    const widthM = React.useRef(naturalRes[current.id]?.widthM).current;
    const heightM = React.useRef(naturalRes[current.id]?.heightM).current;
    const scaleM = React.useRef(naturalRes[current.id]?.scaleM).current;

    const [loading, setLoading] = React.useState(true);

    return (
        <div className=" font-inter relative w-full h-full max-h-[120vh] overflow-y-auto hideScroll0 w-[300px]">
            <div data-theme={isDark ? "ardark": "arlight"}  className=" top-0 w-full max-w-lg lg:max-w-screen-md lg:mx-auto bg-white shadow-md shadow-black">
                 <CircleX onClick={() => handleClose()} classNameDiv={"absolute top-10 left-5 z-20 cursor-pointer opacity-90"}/>   
                    <div className="flex flex-col gap-y-0.5 mt-7 text-left lg:items-center">
                        <div className={`flex mx-auto h-1/2 w-fit relative`}>
                            {(loading) ?
                                <div className="absolute grid mx-auto my-auto place-content-center lg:h-[288px] lg:w-[288px] h-1/2 w-full">
                                        <Rings color={'#1273EA'}
                                            ariaLabel='loading'
                                            height={height}
                                            width={width}
                                        />
                                </div> 
                                : 
                                <></>
                            }
                            <div 
                                className="grid mx-auto my-auto place-content-center md:mb-0 mb-4 m-4 rounded-xl"
                                style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.16)" }}
                            >
                                <Image 
                                    src={current.id} 
                                    alt="Preview Image" 
                                    height={300}
                                    width={300} 
                                    onLoad={() => setLoading(false)} 
                                    className="object-cover rounded-b-xl w-full"
                                    
                                />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4 bg-white p-2 h-1/2 lg:place-content-evenly mt-1">
                            <p className="text-center font-semibold text-lg mb-4 flex-wrap">{current.title ? current.title: "No Title"}</p>
                            <p className="text-center font-semibold text-sm mb-2">{`Description`}</p>
                            <p className="text-center font-normal text-xs overflow-hidden max-w-md h-2/6 flex-wrap overflow-scroll">{truncate(current.description ? current.description : "None", 130)}</p>
                            <div className="mt-4 justify-end mb-10 flex justify-center items-center">
                                <ViewNftButton 
                                    nftLink={current.id} 
                                    text={"View"} 
                                />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ModelContent;
