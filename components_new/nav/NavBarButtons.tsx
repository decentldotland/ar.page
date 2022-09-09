import React from 'react'
import {Bars3Icon} from '@heroicons/react/24/outline'
import { User } from '../user/sidebar/user'
import BarMenu from './BarMenu'


function NavBarButtons() {
  return (
    <div>
        <ul className='font-inter font-semibold text-[15px] flex space-x-4 items-center'>
            <li>Ark</li>
            <li>
                <BarMenu />
            </li>
        </ul>
    </div>
  )
}

export default NavBarButtons