import { ArrowLongRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import { BsCheckSquareFill, BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs'
import BackButton from '../BackButton'
import LineBarTracker from '../LineBarTracker'
import NextButton from '../NextButton'
import OverviewSteps from '../OverviewSteps'

interface Props { 
    step: number,
    setstep: any,
    arLabel?: string
}

function CheckList_4({step, setstep, arLabel}: Props) {
const TWITTER_DL = "https://twitter.com/decentdotland"
  const DISCORD_JOIN = "https://discord.gg/decentland"
  const GITHUB_DL = "https://github.com/decentldotland"
  return (
    <>
        <section className='relative h-screen  '>
                  <div className='flex flex-row justify-between sm:space-x-60 w-[420px] mb-4 items-center mt-28 sm:mt-32'>
                    <BackButton setstep={setstep} step={step - 1}/>
                  </div>
                  <div className='mt-6 mb-20'>
                    <LineBarTracker step={3}  total_step={3}/>
                  </div>

                  <div className="flex flex-col justify-center text-center mb-16">
                    <h1 className='text-3xl font-bold mb-3'>You're all set 🎉</h1>
                    <p className='text-center font-medium text-[#3a3a3a] text-sm'>
                      You've successfully claimed your first<br /> ARpage for <span className='font-bold'>@{arLabel}</span>.
                    </p>
                    <p className='text-center font-medium text-[#3a3a3a] text-sm'>
                      After the event, you will be granted<br /> access to edit your profile.
                    </p>
                  </div>
                  
                  <section>
                    <div className='space-y-4 mb-3'>
                      <h1 className='text-xl text-center text-[#3a3a3a] font-medium'>Get the latest news on DecentLand.</h1>
                      <Link href={TWITTER_DL} >
                        <a target="_blank" rel="noopener noreferrer" className=' flex flex-row rounded-xl px-5 py-4 w-full bg-[#edecec] justify-between items-center'>
                          <div className='flex flex-row space-x-3.5 items-center'>
                            <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                            <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Follow us Twitter</h1>
                            <BsTwitter height={20} width={20} color="#666"/>
                          </div>
                          <ArrowTopRightOnSquareIcon height={22} width={22} color="#666" strokeWidth={2} />
                        </a>
                      </Link>
                      <Link href={DISCORD_JOIN} >
                        <a target="_blank" rel="noopener noreferrer" className=' flex flex-row rounded-xl px-5 py-4 w-full bg-[#edecec] justify-between items-center'>
                          <div className='flex flex-row space-x-3.5 items-center'>
                            <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                            <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Join our Discord</h1>
                            <BsDiscord height={20} width={20} color="#666"/>
                          </div>
                          <ArrowTopRightOnSquareIcon height={22} width={22} color="#666" strokeWidth={2} />
                        </a>
                      </Link>
                      <Link href={GITHUB_DL} >
                        <a target="_blank" rel="noopener noreferrer" className=' flex flex-row rounded-xl px-5 py-4 w-full bg-[#edecec] justify-between items-center'>
                          <div className='flex flex-row space-x-3.5 items-center'>
                            <div className='w-6 h-6 border-2 border-[#b3b2b3] bg-[#f6f6f6] rounded-md'></div>
                            <h1 className='font-bold text-[#6a6b6a] text-center text-sm'>Contributed to our Github Repo</h1>
                            <BsGithub height={20} width={20} color="#666" className='relative right-1'/>
                          </div>
                          <ArrowTopRightOnSquareIcon height={22} width={22} color="#666" strokeWidth={2} />
                        </a>
                      </Link>
                    </div>

                 

                  <div className='flex justify-center flex-col items-center relative top-10'>
                    {/*  */}
                      <Link href={"/"}>
                        <button onClick={() => setstep(5)}
                          className="cursor-pointer bg-[#1273ea] w-full h-14 justify-center items-center flex relative flex-row rounded-lg text-white font-bold text-lg" >
                            <div className='flex justify-center items-center'>
                              <p className='text-center'>Go back to Home Page</p>
                              <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                            </div>
                        </button>
                      </Link>
                    </div>
                  </section>
                </section>
              </>
  )
}

export default CheckList_4