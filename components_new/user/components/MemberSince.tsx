import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';

/**
 * Shows up as Membersince in the current user's profile 
 */

interface Props {
    epoch: number,
    month: string, 
    year: string | number, 

}

function MemberSince({epoch, month, year}: Props) {
    
    const [isDark, setIsDark] = useRecoilState(isDarkMode);
  return (
    <div>
        {
            epoch > 0 && (
                <div className='flex flex-row items-center justify-center md:justify-start space-x-2 '>
                    <div className={`flex flex-row  
                        items-center space-x-1  
                        py-1 px-2 w-fit ${isDark ? ('bg-[#1a2745] text-white'): ('bg-gray-200 text-[#666]')}  
                        rounded-lg 
                        font-inter  text-xs font-bold`}>
                            <CalendarDaysIcon height={14} width={14} 
                            color={`${isDark? ('white') : ('#666') }`}
                            strokeWidth={2}/>
                            <p>Since {month} {year}</p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default MemberSince