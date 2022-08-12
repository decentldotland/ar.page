import React from 'react';
import SelectSearch, { useSelect } from 'react-select-search';
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/templates';
import { random } from 'lodash';

const CustomSelect = ({ options, multiple, disabled, placeholder }: { options: { value: string, name: string }[], value: string, multiple: boolean, disabled: boolean, placeholder: string }) => {


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
    // console.log(items);
    const handleEnter = React.useCallback((event: any) => {
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
        <div className="rounded-full h-7 border-blue-200 border-2" ref={container}>
            {/* <button className="w-24 h-4 bg-red-300" {...valueProps}>{snapshot.displayValue}</button> */}
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute mt-1 left-[4px] lg:mr-1 mr-0" width="15" height="15" />
            <input {...valueProps} 
            onKeyDown={handleEnter} style={{ paddingLeft: "22px", width: "316px" }} 
            value={val} onChange={handleChange} onFocus={() => setShow(true)} 
            placeholder={placeholder}
            className="rounded-full border-white pr-4 h-6" />
            {show && (
                <div className="h-fit mt-1 bg-white rounded-lg shadow-lg border-blue-200 border-2 px-2">
                    <ul className="w-full h-full my-2">
                        {snapshot.options
                            .filter((i: any) => i.name.toLowerCase().includes(val.toLowerCase()))
                            .slice(0, 3)
                            .map((option) => (
                                <li key={option.name} className="w-full mt-1 rounded-md  bg-blue-200 active:bg-blue-100" onClick={
                                    (event) => {
                                        window.location.href = `/p/${option.name}/#top`
                                    }
                                }>
                                    <button {...optionProps} className="w-full text-[#1273EA]" value={option.value} >{option.name}</button>
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