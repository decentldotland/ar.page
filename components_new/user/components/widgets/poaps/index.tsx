import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../../../atoms';
import { Res } from '../../../../../src/types';
import { Divider } from '../../reusables';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'


export default function Poaps({ props }: { props: Res }) {
  const { POAPS } = props;

  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = (e: string) => { 
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth} = rowRef.current;
            const scrollTo = e === "left" ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth

            rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
        }
        // console.log(rowRef.current?.scrollLeft, rowRef.current?.clientWidth)

  }
  const [isDark, setIsDark] = useRecoilState(isDarkMode);


  return (
    <>
      {/* <h1 className="text-left font-inter font-bold text-xl">POAPS</h1> */}
      <div className="group relative">

          <BiChevronLeft height={10} color="#fff" width={10}  className={`absolute top-0 
              bottom-0 left-2 bg-gray-500/50 rounded-full 
              m-auto z-50 h-6 w-6
              cursor-pointer opacity-0 
              transition hover:scale-125 
              group-hover:opacity-100 
            ${!isMoved && "hidden"}`}
            onClick={() => handleClick("left")}
            />

          <div ref={rowRef} className="md:gap-x-10 -space-x-3.5 flex  md:p-2 carousel mb-5 md:ml-1 group relative">
            {POAPS.map((p, idx) => (
              <div  key={idx} className="carousel-item">
                <label className="flex 
                  items-center 
                  cursor-pointer 
                  modal-button " 
                  htmlFor={"poap-modal-" + idx}>
                  <Image loader={() => p.event.image_url} 
                    src={p.event.image_url} 
                    width={112} 
                    height={112}  
                    quality={80}
                    className="scale-75 md:scale-100"
                  />
                </label>
                <input type="checkbox" id={"poap-modal-" + idx} className="modal-toggle" />
                <label htmlFor={"poap-modal-" + idx} className="modal cursor-pointer backdrop-blur-md">
                  <label className="modal-box relative" htmlFor="">
                    <div className="flex flex-col items-center">
                      <Image loader={() => p.event.image_url} src={p.event.image_url} width={112} height={112} className="mt-4 mb-8 shadow-sm" />
                    </div>
                    <div className="flex flex-col gap-y-2 text-center">
                      <div className="font-semibold">{p.event.name}</div>
                      <div className="">Obtained on {p.event.start_date} </div>
                      <div><a href={p.event.event_url} className="link-primary after:content-['_↗']">{p.event.event_url}</a></div>
                    </div>
                  </label>
                </label>
              </div>
            ))}
          </div>
        
          <BiChevronRight  height={10} color="#fff" width={10} 
            className={`absolute top-0 
              bottom-0 right-2 bg-gray-500/50 rounded-full
              m-auto z-50 h-6 w-6
              cursor-pointer opacity-0 
              transition hover:scale-125 
              group-hover:opacity-100`}
              onClick={() => handleClick("right")}
            />
      </div>
            
    </>
  )
}
