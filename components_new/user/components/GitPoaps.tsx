import { GiftTopIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { Gitpoap } from '../../../src/types'


interface Props { 
    gitpoaps: Gitpoap[] | undefined
}

function GitPoaps({gitpoaps}: Props) {
  // console.log(`THIS IS THE GIT POAPS ${gitpoaps}`)
  return (
    <div>
      {/* {
        gitpoaps?.map((poaps) => { 
          <div key={poaps.gitPoapId}>
            <Image 
              key={poaps.gitPoapId}
              src={poaps.imageUrl} 
              className="w-24 h-24"
              layout='fill'
              />

          </div>
    
            
          })
        } */}
      </div>


  )
}

export default GitPoaps