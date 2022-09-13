import React from 'react'
import {Bars3Icon} from '@heroicons/react/24/outline'
import { User } from '../user/sidebar/user'
import BarMenuItem from './BarMenuItem'
import { useAns } from 'ans-for-all';
import { FiLogIn, FiLogOut } from 'react-icons/fi';


function NavBarButtons() {
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();

  return (
    <div>
        <ul className='font-inter font-semibold text-[15px] flex space-x-4 items-center'>
            <li>Ark</li>
            <li hidden={walletConnected} className='cursor-pointer  py-2 px-4 w-full hover:bg-blue-300/40 h-full rounded-2xl bg-[#1273EA]/20'>
                <div onClick={() => (arconnectConnect as Function)()} 
                  className="flex flex-row items-center space-x-3.5">
                    {/* <FiLogIn height={20} width={20} color="black"/> */}
                    <h1 className='text-[#1273EA]'>Connect Wallet</h1>
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