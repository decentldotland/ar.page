import React from 'react'
import {Bars3Icon} from '@heroicons/react/24/outline'
import { User } from '../user/lpanel/user'


function NavBarButtons() {
  return (
    <div>
        <ul className='font-inter font-semibold text-[15px] flex space-x-4 items-center'>
            <li>Ark</li>
            <li className='px-2'>Create ANS Profile</li>
            <li><User /></li>
            <li>
                <Bars3Icon height={21} width={21} color="black" strokeWidth={2}  />
            </li>
        </ul>
    </div>
  )
}

export default NavBarButtons