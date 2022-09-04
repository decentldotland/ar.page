import React from 'react';
import SelectSearch, { useSelect } from 'react-select-search';
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/templates';
import { random } from 'lodash';

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'

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

    return (
        <div className="flex-row flex items-center flex-1 space-x-3 w-[336%]" ref={container}>
            {/* <button className="w-24 h-4 bg-red-300" {...valueProps}>{snapshot.displayValue}</button> */}

            <MagnifyingGlassIcon 
                height={20} width={20} strokeWidth={3} color="#666" 
                className='absolute ml-6'/>
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute mt-2.5 left-4 ml-1" width="15" height="15" /> */}
            {/* @ts-ignore */}
            <input {...valueProps} 
            onKeyDown={handleEnter} 
            // style={{ paddingLeft: "22px" }} 
            value={val} onChange={handleChange} onFocus={() => setShow(true)} 
            placeholder={placeholder}
            className="bg-base-200 input-bordered flex text-sm 
                text-black font-bold pl-10 w-full leading-3  py-2 rounded-xl 
                focus:outline-none border-0 mb-0.5  focus:border-b-2 focus:border-primary" />
            {show && (
                <div className="h-fit mt-1 p-2 bg-base-100 rounded-md w-[200px]">
                    <ul className="h-full my-2">
                        {snapshot.options
                            .filter((i: any) => i.name?.toLowerCase()?.includes(val?.toLowerCase()))
                            .slice(0, 3)
                            .map((option) => (
                                <li key={option.name} className="w-full mt-1 rounded-md" onClick={
                                    (event) => {
                                        window.location.href = `/p/${option.name}/#top`
                                    }
                                }>
                                    {/* @ts-ignore */}
                                    <button {...optionProps} className="w-full btn btn-primary btn-sm" value={option.value} >{option.name}</button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
            {/* <SelectSearch search={true} autoComplete="on" options={options} value="sv" name="language" placeholder="Choose your language" /> */}
        </div>
    );
};



export default CustomSelect;