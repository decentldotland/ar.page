import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { Button, CircularProgress, IconButton } from '@mui/material'
import {styled} from '@mui/material/styles'
import React from 'react'
import { BsPatchQuestionFill } from 'react-icons/bs'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { CheckIcon } from '@heroicons/react/24/outline'




interface ProfileProps { 
  loading: boolean, 
  is_evaluated: boolean | undefined, 
  is_verified: boolean | undefined, 
  isDark: boolean
}

function ProfileBadge({loading, is_evaluated, is_verified, isDark}: ProfileProps) {
  return (
    <>
            {loading ? (
                <div className='ml-2'>
                  <CircularProgress color="inherit" size={23}/>
                </div>
            ) : (
                is_evaluated || 
                is_verified ? (
                  <div className="ml-2">
                    <CheckBadgeIcon height={22} width={22} color={"#325FFE"} enableBackground={"white"}/>
                  </div>
                ) : (

                  
                  <HtmlTooltip title={
                    <>
                      <article className='flex flex-col space-y-1 text-white p-2 font-inter'>

                        <div className='items-center flex flex-row space-x-1'>
                          <h1 className='font-bold text-lg '>Get Verified</h1>
                          <CheckIcon height={15} width={15} color={"white"} strokeWidth={2}/>
                        </div>
                        <p>ar.page verification is powered by Ark and VouchDAO</p>
                        <a href="https://ark.decent.land" className='underline'>Link your ANS with Ark to get stared</a>
                      </article>
                    </>
                  }
                    placement="top">
                      <IconButton 
                        disableRipple={true}
                        aria-label="delete" style={{ 
                          backgroundColor: 'transparent',
                          color: 'black'
                          
                        }} >
                        <BsPatchQuestionFill size={22} color={`${isDark? ('white') : ('#666') }`} />
                      </IconButton>
                  </HtmlTooltip>
                )
            )}
        </>
  )
}

export default ProfileBadge

//https://mui.com/material-ui/react-tooltip/
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(50, 50, 50, 0.59)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 224,
    borderRadius: 5
  },
}));
