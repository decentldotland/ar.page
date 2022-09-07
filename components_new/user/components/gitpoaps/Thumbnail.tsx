import Image from 'next/image'
import React from 'react'
import { Gitpoap } from '../../../../src/types'

interface GitPoapsProps { 
    gitpoap: Gitpoap
}

function Thumbnail({gitpoap}: GitPoapsProps) {
  return (
    <div>
        <Image src={gitpoap.imageUrl} 
            layout="fixed" 
            className='rounded-full '
            height={112} 
            width={112}/>
    </div>
  )
}

export default Thumbnail