import Image from 'next/image'
import React from 'react'
import { Gitpoap, Poap } from '../../../../src/types'

interface PoapsProps { 
    poap: Poap
    
}

function Thumbnail({poap}: PoapsProps) {
  return (
    <div>
        <Image src={poap.event.image_url} 
            layout="fixed" 
            className='rounded-full '
            height={112} 
            width={112}/>
    </div>
  )
}

export default Thumbnail