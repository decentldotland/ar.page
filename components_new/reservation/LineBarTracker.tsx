import { LinearProgress } from '@mui/material'
import React from 'react'

interface Props {
    step: number
    total_step: number
}

function LineBarTracker({step,  total_step}: Props) {
  
  return (
    <section className={step === 3 ? `hidden duration-700 ease-in-out` : ''}>
        <p className='text-[#6a6b6a] text-xs text-left'>Step {step} of 3</p>
        <div className='mt-2'>
            <LinearProgress variant="determinate" value={step / total_step * 100} color='inherit' />
        </div>
    </section>
  )
}

export default LineBarTracker