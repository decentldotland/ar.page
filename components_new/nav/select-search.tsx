import React from 'react';
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



const CustomSelect = ({ options, multiple, disabled, placeholder }: 
    { options: 
        { 
            value: string; 
            name: string;
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
            if (!container.current.contains(event.target)) {
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
                window.location.href = `/p/${val}/#top`
            console.log('do validate')
            console.log(val, options)
        }
    }, [options, val])

    const handleChange = React.useCallback((event: any) => {
        event.preventDefault()
        event.stopPropagation()
        console.log("handleChange", event.target.value)
        setVal(event.target.value)
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
        <section className="px-4 flex flex-row space-x-3.5 
            w-[336px] py-2 border-2 border-gray-200
            items-center rounded-2xl " 
            ref={container}>
            {/* <button className="w-24 h-4 bg-red-300" {...valueProps}>{snapshot.displayValue}</button> */}
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute mt-2 left-4 ml-1" width="15" height="15" /> */}
            <MagnifyingGlassIcon height={20} width={20} strokeWidth={3} color="gray" />
            {/* @ts-ignore */}
            <input {...valueProps} 
                onKeyDown={handleEnter} 
                // style={{ paddingLeft: "22px" }} 
                value={val} onChange={handleChange} onFocus={() => setShow(true)} 
                placeholder={placeholder}
                className=" font-inter w-full text-sm font-normal outline-none bg-inherit" />
                <article className=''>
                {show && (
                    // Framer Motion would be nice here
                    <div className={`h-fit py-4 rounded-xl 
                        ${isDark ? ('bg-[#121a2f]'): ('bg-white')}
                        
                        shadow-xl w-[336px] absolute left-28 mt-10 z-50
                        
                        `}>
                        <h2 className="text-lg font-semibold px-7">Members</h2>
                        <ul className="h-full my-2  ">
                            {snapshot.options
                                .filter((i: any) => i.name?.toLowerCase()?.includes(val?.toLowerCase()))
                                .slice(0, 5)
                                .map((option) => (
                                    
                                    <div className={`
                                    ${isDark ? ('hover:bg-[#1a2745]'): ('hover:bg-gray-200')}
                                    
                                     w-full px-7 py-2 cursor-pointer`}>
                                        <li key={option.name} className="w-full mt-1 rounded-md " onClick={
                                            (event) => {
                                                window.location.href = `/p/${option.name}/#top`
                                            }
                                        }>
                                            <a href={`/p/${option.name}`} className='flex flex-row space-x-2 items-center '>
                                                {/* <img src={option.photo} className="w-[34px] h-[34px] rounded-full"/> */}
                                                <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-l from-[#9E00FF] to-[#1273EA] rotate-45 origin-center"></div>

                                                {/* @ts-ignore */}
                                                <button {...optionProps} className=" text-sm font-semibold" value={option.value} >{option.name}</button>
                                                <ArrowUpRightIcon height={14} width={14} color={"#666"} strokeWidth={1} />

                                            </a>
                                        </li>
                                    </div>
                                ))}
                        </ul>
                    </div>
                )}
            </article>
            {/* <SelectSearch search={true} autoComplete="on" options={options} value="sv" placeholder="Choose your language" /> */}
        </section>
    );
};



export default CustomSelect;