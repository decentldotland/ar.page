import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import {BsCheckCircleFill, BsCheckSquareFill} from 'react-icons/bs'

interface Object { 
    name: string, 
    isDone: boolean, 
    link: string
}

interface Props { 
    step: number,
    setstep: any
}

function CheckList({setstep, step}: Props) {
    const unCheckList = [
      "Download and setup ArConnect", 
      "Link my wallet to my ArConnect", 
      "Claim my ArPage"
    ];
    const [CheckList, setCheckList] = useState<Object[]>([
        {
            name: "Download and setup ArConnect",
            isDone: false,
            link: "https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap"
        },
        {
            name: "Link my wallet to my ArConnect",
            isDone: false,
            link: "https://ark.decent.land/"
        },
        {
            name: "Claim my ArPage",
            isDone: false,
            link: ""
        },
    ]);
    const [finishedItems, setFinishedItems] = useState<Object[]>([]);
    const [indexCounter, setIndexCounter] = useState(0)
    const checkItem = () => { 
        if (CheckList[indexCounter] === undefined) return 
        CheckList[indexCounter].isDone = true;
        let newList = [...CheckList]
        
        setIndexCounter(indexCounter + 1);
        setFinishedItems(item => [...finishedItems,  CheckList[indexCounter]])
        setCheckList(newList)
    }
  return (
    <section>
        <div className='space-y-3 mb-5'>
            <h1 className='text-xl text-left text-[#3a3a3a] font-medium'>Complete the checklist to get started:</h1>
            
            {
                CheckList.map((v, k) => {
                 return  <div key={k} hidden={v.isDone} className=' flex flex-row space-x-3.5 rounded-xl px-5 py-4 w-full bg-[#edecec] '>
                        <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                        <h1 className='font-bold text-[#6a6b6a] text-center '>{v.name}</h1>
                    </div>
                })
            }
       </div>
       <div hidden={indexCounter === 0} className={"flex flex-col text-center px-5 mb-5 space-y-3.5"}>
            <h1 className='text-[#8e8e8f] font-medium mb-5'>Completed Steps </h1>
        {
            finishedItems.map((v, k) => { 
                return (
                    <div key={k} className={"flex flex-row items-center justify-start space-x-3.5"}>
                        <BsCheckSquareFill size={23} color={"#cececf"}/>
                        <h1 className='text-[#cececf] font-bold text-left '>{v.name}</h1>
                    </div>
                )
            })
        }
       </div>
       <div className='flex justify-center flex-col items-center '>
          <button className=" bg-[#1273ea] w-full h-14 items-center relative rounded-lg text-white font-bold text-lg" 
              onClick={checkItem}
              >
                <div className='flex justify-center items-center'>
                  <p className='relative text-center '>{unCheckList[0]}</p>
                  <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                </div>
            </button>
            <p 
            onClick={() => setstep(step + 1)} 
            className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>
                {indexCounter === 1 ? "I will set it up later" : "Continue later"}
            </p>
        </div>
    </section>
  )
}

export default CheckList