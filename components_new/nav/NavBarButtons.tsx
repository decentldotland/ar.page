import React from 'react'
import {Bars3Icon} from '@heroicons/react/24/outline'
import { User } from '../user/sidebar/user'
import BarMenuItem from './BarMenuItem'
import { useAns } from 'ans-for-all';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';


function NavBarButtons() {
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();

  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  return (
    <div>
        <ul className='font-inter font-semibold text-[15px] flex space-x-6 items-center sm:mb-4'>
            {/* <li>Ark</li> */}
            <li hidden={walletConnected} className={`cursor-pointer  py-2 px-4 w-full 
               ${isDark ? (' hover:bg-[#07215e] bg-[#85b5ef]') : (' hover:bg-blue-300/40 bg-[#1273EA]/20')}
               h-full rounded-2xl hidden sm:block`}>
                <div onClick={() => (arconnectConnect as Function)()} 
                  className="flex flex-row items-center space-x-3.5">
                    {/* <FiLogIn height={20} width={20} color="black"/> */}
                    <h1 className={`
                      ${isDark ? (' text-white font-semibold') : (' text-[#1273EA] font-semibold')}
                    `}>Connect</h1>
                </div>
            </li>
            <li>
              <BarMenuItem />
            </li>
        </ul>
    </div>
  )
}

export default NavBarButtons