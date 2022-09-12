import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

function SearchBar() {
  return (
    <div className="">
        <div className='px-4 flex flex-row space-x-3.5 w-[336px] py-2 items-center bg-gray-200 rounded-xl'>
            <MagnifyingGlassIcon height={20} width={20} strokeWidth={3} color="gray" />
            <input 
                type="text" 
                placeholder='Search for name or address' 
                className='bg-gray-200 font-inter w-full text-sm font-normal outline-none '/>
                
        </div>
    </div>
  )
}

export default SearchBar