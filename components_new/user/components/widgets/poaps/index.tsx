import Image from 'next/image';
import { useRef, useState } from 'react';
import { POAP } from '../../../../../src/types';
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi';

export default function Poaps({ poapsArr }: { poapsArr: POAP[] | undefined }) {

  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const isDark = localStorage.theme === 'arlight' ? false : true;
  const handleClick = (e: string) => { 
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth} = rowRef.current;
            const scrollTo = e === "left" ? scrollLeft - clientWidth 
            : scrollLeft + clientWidth

            rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
        }
  }

  return (
    <>
      {poapsArr ? poapsArr.length > 0 && (
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
          <div className={`absolute left-0 z-10 h-full w-3.5 shadow-inner-r bg-gradient-to-r shadow-xl shadow-opacity-0.1 ${isDark ? "from-base-100/95 via-base-100/60 to-base-100/5 shadow-base-100" : "from-white/95 via-white/60 to-white/5 shadow-white"}`}>
          </div>
          <div 
            ref={rowRef} 
            className="md:gap-x-10 -space-x-3.5 flex md:p-2 carousel mb-5 md:ml-1 group relative"
          >
            {poapsArr ? poapsArr.map((p: POAP, idx: number) => (
              <div key={idx} className="carousel-item">
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
                    alt={"Image of a POAP"}
                  />
                </label>
                <input type="checkbox" id={"poap-modal-" + idx} className="modal-toggle" />
                <label htmlFor={"poap-modal-" + idx} className="modal cursor-pointer backdrop-blur-md">
                  <label className="modal-box relative" htmlFor="">
                    <div className="flex flex-col items-center mt-4 mb-6">
                      <Image 
                        loader={() => p.event.image_url} 
                        src={p.event.image_url} 
                        width={250} 
                        height={250} 
                        className="shadow-sm"
                        alt={"Image of a POAP"} 
                      />
                    </div>
                    <div className="flex flex-col gap-y-2 text-center">
                      <div className="font-semibold">{p.event.name}</div>
                      <div className="">Obtained on {p.event.start_date} </div>
                      <div><a href={p.event.event_url} className="link-primary after:content-['_↗']">{p.event.event_url}</a></div>
                    </div>
                  </label>
                </label>
              </div>
            )) : ""}
          </div>
          <div className={`absolute right-0 top-0 z-10 h-full w-3.5 bg-gradient-to-l shadow-xl shadow-opacity-0.1 ${isDark ? "from-base-100/95 via-base-100/60 to-base-100/5 shadow-base-100" : "from-white/95 via-white/60 to-white/5 shadow-white"}`}>
          </div>
          <BiChevronRight height={10} color="#fff" width={10} 
            className={`absolute top-0 
              bottom-0 right-2 bg-gray-500/50 rounded-full
              m-auto z-50 h-6 w-6
              cursor-pointer opacity-0 
              transition hover:scale-125 
              group-hover:opacity-100`}
              onClick={() => handleClick("right")} 
            />
      </div>
      ) 
      : 
      ""
    }
    </>
  )
}
