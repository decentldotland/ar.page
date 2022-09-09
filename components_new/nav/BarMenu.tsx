
import { Bars3Icon } from '@heroicons/react/24/outline'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { User } from '../user/sidebar/user'
import { NavUser } from './NavUser'

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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
            <div className=''>
                <ul>
                    <li><User /></li>
                </ul>
            </div>
          <MenuItem onClick={() => {routeToPage("/")}}>Home</MenuItem>
          <MenuItem onClick={() => {routeToPage("/")}}>TV Shows</MenuItem>
          <MenuItem onClick={() => {routeToPage("/")}}>Movies</MenuItem>
          <MenuItem onClick={() => {routeToPage("/")}}>New & Popular</MenuItem>
          <MenuItem onClick={() => {routeToPage("/")}}>My List</MenuItem>
        </Menu>
      </div>
    )
  }

export default BarMenu