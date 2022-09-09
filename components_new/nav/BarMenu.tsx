
import { Bars3Icon } from '@heroicons/react/24/outline'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useAns } from 'ans-for-all'
import { divide } from 'lodash'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { User } from '../user/sidebar/user'
import { NavUser } from './NavUser'
import {FaceFrownIcon, BookOpenIcon, MoonIcon,  } from '@heroicons/react/24/outline'
import {FiLogIn, FiLogOut} from 'react-icons/fi'

function BarMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
  
    const router = useRouter();
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
      setAnchorEl(null)
    }
  
    const routeToPage = (url: string) => {  
      router.push(url)
    }

    const {
      walletConnected,
      ansData,
      arconnectConnect,
    } = useAns();
  
    return (
      <div className="">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className="!capitalize !text-black"
        >
         {/* <Bars3Icon height={21} width={21} color="black" strokeWidth={2}  /> */}
         <NavUser />
        </Button>
        
        <div className='relative '>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="menu"
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            
            >{
              walletConnected ? (
                <>
                    <User />
                    <MenuItem onClick={() => {routeToPage("/")}}>My Profile</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>My Collectables</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>Decent Land</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>Documentation</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>Dark Mode</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>Disconnect</MenuItem>
                </>
              ):(   
                <div className=''>
                    <User />
                    <MenuItem onClick={() => {routeToPage("/")}}>Documentation</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>Dark Mode</MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}}>Log In</MenuItem>
                </div>
              )
            }
            
            </Menu>
        </div>
      </div>
    )
  }

export default BarMenu