import React, { useState } from 'react';
import SelectSearch, { useSelect } from 'react-select-search';
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/templates';
import { random } from 'lodash';
import { MagnifyingGlassIcon, ArrowRightOnRectangleIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';
import Image from 'next/image';
import { Divider } from '../user/components/reusables';
import { resolveDomain } from '../../src/utils';
import {XCircleIcon} from '@heroicons/react/24/solid'


const CustomSelect = ({ options, multiple, disabled, placeholder }: 
    { options: 
        { 
            value: string; 
            name: string;
            photo: string | undefined;
        }[]; 
        multiple: boolean; 
        disabled: boolean; 
        placeholder: string 
    }) => {


    const [val, setVal] = React.useState<string>('')
    const [show, setShow] = React.useState<boolean>(false)
    const randUserIndex: number =Math.floor(Math.random() * options?.length)
    const container: any = React.useRef();


    React.useEffect(() => {
        const ev = (event: any) => {
            if (!container.current?.contains(event.target)) {
                setShow(false);

                document.removeEventListener('click', ev);
            }
        }
        if (show)
            document.addEventListener('click', ev);
        else
            document.removeEventListener('click', ev);
    }, [show]);

    const router = useRouter()
    // @ts-ignore
    const handleEnter = React.useCallback((event) => {
        if (event.key === 'Enter') {
            if (options.map((item: any) => item.name).includes(val))
                window.location.href = resolveDomain(val);
        }
    }, [options, val])

    const handleChange = React.useCallback((event: any) => {
        event.preventDefault()
        event.stopPropagation()
        // console.log("handleChange", event.target.value)
        setVal(event.target.value)
        // if (val) setShow(!show) 
        // if (event.key === 'Enter') {
        //     if(options.map((item: any) => item.name).includes(val))
        //     // router.push(`/p/${val}#top`)
        //     console.log('do validate')
        //     console.log(val, options)
        // }
    }, [])

    const [snapshot, valueProps, optionProps] = useSelect({
        search: true,
        options,
        value: "",
        multiple,
        disabled,
        // filterOptions: 
        // (i: any) => (query:string) => i.name.toLowerCase().includes(query.toLowerCase())
        // (options: SelectSearchOption[]) => (query:string) => SelectSearchOption[]
    });


    const [isDark, setIsDark] = useRecoilState(isDarkMode);
    return (
        <section className="px-4 flex flex-row space-x-3.5 sm:shrink
            w-full md:w-[336px] py-3 sm:py-3 border-2 border-gray-200 
            items-center  sm:rounded-2xl focus:ring-1  rounded-md 
             sm:bg-transparent
            " 
            ref={container}>
            {/* <button className="w-24 h-4 bg-red-300" {...valueProps}>{snapshot.displayValue}</button> */}
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute mt-2 left-4 ml-1" width="15" height="15" /> */}
            <MagnifyingGlassIcon height={20} width={20} strokeWidth={3} color={`${isDark? ('white') : ('#666') }`} />

            {/* @ts-ignore */}
            <input {...valueProps} 
                onKeyDown={handleEnter} 
                // style={{ paddingLeft: "22px" }} 
                value={val} onChange={handleChange} onFocus={() => setShow(true)} 
                placeholder={placeholder}
                className=" font-inter w-full text-sm font-normal outline-none bg-transparent "
            />
            <div hidden={val.length <= 1}>
                <XCircleIcon
                    
                    onClick={() => {setVal('')}}
                    className='cursor-pointer relative left-1' 
                    height={20} width={20} strokeWidth={3} color={`${isDark? ('white') : ('#666') }`} />
            </div>

            <article className={`z-50 transition-all duration-300 ease-in-out ${show ? 'opacity-100': 'opacity-0 pointer-events-none'}`}>
                
                <div className={` py-4 sm:rounded-xl md:h-fit  
                    ${isDark ? ('bg-[#121a2f]'): ('bg-white')} sm:border-none
                    border-2 shadow-lg  mt-[22px] sm:mt-6  rounded-b-2xl w-full sm:w-[336px]  md:max-w-[326px] md:w-[336px]  absolute sm:left-0 -right-0 z-50
                    ml-16 md:ml-28 
                    `}>
                    <h2 className="text-lg font-semibold sm:px-4 px-6">Members</h2>
                    <ul className="h-full">
                        {/* If nothing is found in our database, print out the text that user is typing instead */}
                        {val  && (
                            <>
                                <div className=" hidden md:block space-x-1 px-7 text-2xs overflow-x-hidden text-left
                                    text-gray-400">
                                    <p className=''>
                                        <span className='mr-1 font-semibold'>
                                            Searching for:
                                        </span> 
                                        "{val}"</p>
                                <Divider />
                                </div>
                            
                            </>
                        )}

                        {snapshot.options
                            .filter((i: any) => i.name?.toLowerCase()?.includes(val?.toLowerCase()))
                            .slice(0, 4)
                            .map((option) =>  (
                                <div key={option.name} className={`${isDark ? ('hover:bg-[#1a2745] '): ('hover:bg-gray-200 ')}
                                    w-full sm:px-4 py-2 px-6 cursor-pointer `}>
                                    <li key={option.name} className="w-full mt-1 rounded-md " onClick={
                                        (event) => {
                                            window.location.href = resolveDomain(option.name);
                                        }
                                    }>
                                        <a href={resolveDomain(option.name)} className='flex flex-row space-x-2 items-center '>
                                            {
                                                option.photo ? (
                                                    <div className='bg-gray-400 w-[34px] h-[34px] rounded-full'>
                                                        <Image src={`https://arweave.net/${option.photo}`} 
                                                            height={34}
                                                            width={34}
                                                            quality={1}
                                                            alt={option.name}
                                                            className="w-[34px] h-[34px] rounded-full "/>
                                                    </div>
                                                ) : (
                                                    <div className='w-[34px] h-[34px] rounded-full 
                                                        bg-gradient-to-l from-[#9E00FF] to-[#1273EA] 
                                                        origin-center items-center flex justify-center'>
                                                            <p className='text-white font-medium '>
                                                                {option.name[0]}
                                                            </p>
                                                    </div>
                                                )
                                            }
                                            {/* @ts-ignore */}
                                            <button {...optionProps} className=" text-sm font-semibold" value={option.value} >{option.name}</button>
                                            <ArrowUpRightIcon height={14} width={14} color={"#666"} strokeWidth={1} />

                                        </a>
                                    </li>
                                </div>
                            ))}
                    </ul>
                </div>
            </article>
            {/* <SelectSearch search={true} autoComplete="on" options={options} value="sv" placeholder="Choose your language" /> */}
        </section>
    );
};



export default CustomSelect;