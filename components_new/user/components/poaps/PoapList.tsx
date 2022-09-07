import { listClasses } from '@mui/material';
import React, { useRef } from 'react'
import { Gitpoap, Poap } from '../../../../src/types'
import Thumbnail from './Thumbnail';

interface PoapList { 
  list: Poap[] | undefined
}
function PoapList({list}: PoapList) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={rowRef} className="flex items-center space-x-4 mr-4
      ">
        {
          list?.map((poap) => (
            <Thumbnail key={poap.tokenId} poap={poap}/>
          ))
        }
      </div>
    </div>
  )
}

export default PoapList