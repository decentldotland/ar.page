// @flow 
import { faGlobe, faCircleXmark, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import moment from 'moment';
import { Rings } from 'react-loader-spinner';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';
import useWindowDimensions from '../../../src/useWindowDimension';
import Image from 'next/image';

type Props = {
    handleClose: Function;
    current: { title: string; poster: string; description: string; timestamp: number; id: string; };
    naturalRes: any;
};

const ModelContent = (props: Props) => {
    console.log("current", props.current)
    const { width: _width, height: _height } = useWindowDimensions();

    // const getScreenWidth
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

    const [loading, setLoading] = React.useState(true)

    return (

        <div className=" font-inter relative w-full h-full  max-h-[100vh] overflow-y-auto hideScroll0">
        <div data-theme={isDark ? "ardark": "arlight"}  className="rounded-md mx-auto top-0 p-8 w-full max-w-lg lg:max-w-screen-md lg:mx-auto h-min  bg-[#FAFAFA] shadow-md border-2 border-blue-200 shadow-black ">
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleClose()} className="absolute lg:relative top-3 lg:top-1 right-4 lg:right-1 float-right  text-[#1273EA] rounded-full h-6" />

            <h1 className="text-2xl text-center font-extrabold text-[#1273EA] underline my-4 lg:mt-4 lg:mb-8">{current.title}</h1>

            <div className="flex flex-col gap-y-0.5 mt-7 text-left lg:items-center">
                <div className={`flex mx-auto h-full w-fit relative`}>
                    {(loading) ?

                        <div className="absolute grid mx-auto my-auto place-content-center lg:h-[288px] lg:w-[288px] h-1/2 w-full">
                            <div className="rounded-md bg-base-100 shadow-md border-2 border-blue-200 shadow-black"> 
                                <Rings color={'#1273EA'}
                                    ariaLabel='loading'
                                    height={height}
                                    width={width}
                                    // height={(_width !== undefined && _width >= 1024) ? height : heightM}
                                    // width={(_width !== undefined && _width >= 1024) ? width : widthM}
                                    />
                            </div>
                        </div> : <></>}

                    <div className="grid mx-auto my-auto place-content-center  md:mb-0 mb-4 m-4">
                        {/*
                        <iframe title={current.title} frameBorder="0" allowFullScreen allowTransparency={true}

                            style={{ backgroundColor: '' }}
                            className="object-fill max-h-[288px] max-w-[288px]"
                            height={500}
                            width={500}
                            onLoad={() => setLoading(false)}
                            
                            src={current.id} >
                        </iframe>
                        //`https://koi.rocks/embed/${current.id}`
                        */}
                        <Image src={current.id} alt="Preview Image" height={300} width={300} onLoad={() => setLoading(false)} className="object-cover"/>
                    </div>
                </div>
                <div className="flex flex-col  pt-4 bg-base-200/40 p-2 h-[110%] lg:place-content-evenly mt-1 rounded-md shadow-lg border-2 border-blue-200">
                    <h1 className="w-full text-accent font-medium text-xs top-0">{`Description`}<br />
                        <h1 className="text-base-content font-normal text-sm">{current.description ? current.description : "None"}</h1>
                    </h1>

                    <h1 className="w-full text-accent font-medium text-xs mt-2">{`Acquired`}<br />
                        <h1 className="text-base-content font-normal text-sm">{` ${moment.unix(current.timestamp).format('llll')}`}</h1>
                    </h1>

                    {/* <h1 className="w-full text-[#656] font-medium text-xs mt-4">Displayed Scale<br />
                        <h1 className="text-black font-normal text-sm">{scale}</h1>
                    </h1> */}

                    <div className="mt-2 justify-end">
                        <a target="_blank" rel="noopener noreferrer" className="flex gap-x-2 underline w-full text-accent font-medium text-xs" 
                            href={current.id}>
                            <FontAwesomeIcon icon={faLink} className="pb-1" width="20" height="20" />
                            <h1 className="lg:flex">Link</h1>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ModelContent;