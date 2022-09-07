import { listClasses } from '@mui/material';
import React, { useRef } from 'react'
import { Gitpoap } from '../../../../src/types'
import Thumbnail from './Thumbnail';

interface GitPoapList { 
  list: Gitpoap[]
}
function GitPoapList({list}: GitPoapList) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={rowRef} className="
        flex items-center space-x-4 mr-4
      ">
        {
          list?.map((poap) => (
            <Thumbnail key={poap.gitPoapId} gitpoap={poap}/>
          ))
        }
      </div>
    </div>
  )
}

export default GitPoapList