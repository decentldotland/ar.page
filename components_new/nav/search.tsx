import React from 'react';
import Downshift from 'downshift';
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Props = {
    items: any;
    placeholder: string;
    className: string;
}

const SearchBox = (props: Props) => {
    const items = props.items;
    const router = useRouter()
    const [val, setVal] = React.useState<string>('')
    // console.log(items);
    const handleEnter = React.useCallback((event: any) => {
        if (event.key === 'Enter') {
            if(props.items.includes(val))
            router.push(`/p/${val}#top`)
            console.log('do validate')
            console.log(val, props.items)
        }
    },[props.items, router, val])

    return (
        // <Downshift
        //     id="search"
        // >
        //     {({
        //         getInputProps, // Props to pass to our input
        //         getItemProps,  // Props to pass into each of the suggested items
        //         isOpen,        // Whether the "suggestions box" is visible or not
        //         inputValue,    // Value that the user typed in the search box
        //         selectedItem,  // Item that is currently selected in the list (when hovering)
        //         highlightedIndex,
        //     }) => (
        //         <div className="z-50 rounded-xl h-full">
        //             <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute mt-1 left-[4px] lg:mr-1 mr-0" width="15" height="15" />
        //             <input {...getInputProps({ placeholder: props.placeholder })} onKeyDown={handleEnter} style={{ paddingLeft: "22px", width: "316px" }} className="rounded-xl pr-4" />
        //             {isOpen ? (
        //                 // <div className='h-full max-h-72 overflow-x-hidden relative'>
        //                 <div style={{ border: '1px solid #ccc', position: 'absolute', }} className='mt-1 px-2 bg-blue-200 text-[#1273EA] rounded-xl hideScroll max-h-72 overflow-y-scroll'>
        //                     {items // Items are passed in as a prop 
        //                         //-> so it's a list of all elements, unfiltered
        //                         .filter( // that's why we first filter the list
        //                             (i: any) =>
        //                                 // show item `i` if:
        //                                 !inputValue || // the user didn't type anything in the box
        //                                 // OR item `i` contains the text from the user (`inputValue`)
        //                                 i.toLowerCase().includes(inputValue.toLowerCase()),
        //                         )
        //                         // then, for each filtered item ..
        //                         .map((item: any, index: any) => {
        //                             setVal(inputValue as string)
        //                             // output a <div> ..
        //                             return <div
        //                                 {...getItemProps({ item })} // .. using the props from `render`
        //                                 key={item}
        //                                 style={{
        //                                     backgroundColor:
        //                                         highlightedIndex === index ? 'gray' : 'transparent',
        //                                     fontWeight: selectedItem === item ? 'bold' : 'normal',
        //                                 }}
        //                             >
        //                                 {item}
        //                             </div>
        //                         })}
        //                 </div>
        //             ) : null}
        //         </div>
        //     ) as React.ReactElement}
        // </Downshift>
        <></>
    )
}

export default SearchBox;