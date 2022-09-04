import React, { useRef } from 'react'
import { userInfo } from '../../../src/types'

function DaoMembership(props: userInfo) {

   // test data
  const dao = [{name: 'SushiDAO'}, {name: 'Olympus DAO'}]
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div>
        <div ref={rowRef} className='scrollbar-hide flex flex-row space-x-2 overflow-x-scoll items-center'>
            {dao.map((dao) => (

                <div className='py-1 px-2 w-fit font-inter text-xs bg-blue-300 rounded-lg text-blue-600 font-bold'>
                    {dao.name}
                </div>
            ))}
        </div>

    </div>
  )
}

export default DaoMembership