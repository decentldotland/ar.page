
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
import {FaceSmileIcon, BookOpenIcon, MoonIcon,  } from '@heroicons/react/24/outline'
import {FiLogIn, FiLogOut} from 'react-icons/fi'
import {BsCollection} from 'react-icons/bs'
import { Divider } from '../user/components/reusables'
import Image from 'next/image'
import Link from 'next/link'
import Favicon from '../../public/favicon.ico';

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
      arconnectDisconnect
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
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                       <div>
                          <User />                
                        </div> 
                    </MenuItem> 
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                       <div>
                       <FaceSmileIcon height={20} width={20} color="black"/>

                          <h1>
                            My Profile
                          </h1> 
                        </div> 
                    </MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                      <div>
                      <BsCollection height={20} width={20} color="black"/>
                        <h1>
                          My Collectables
                        </h1> 
                      </div> 
                    </MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                      <Link href={"https://www.decent.land/"}  className="flex flex-row  items-center ">
                        <a target="_blank" rel="noopener noreferrer" className=' hover:opacity-60 flex flex-row items-center '>
                            <Image src={Favicon} width={27} height={27} className='' alt="" />
                            <h1>Go to Decent land</h1>
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                      <div>
                        <BookOpenIcon height={20} width={20} color="black"/>
                        <h1>
                          Documentation
                        </h1>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                        <div>
                        <MoonIcon height={20} width={20} color="black"/>

                          <h1>
                            DarkMode
                          </h1> 
                        </div>
                    </ MenuItem>
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                        <div onClick={arconnectDisconnect}>
                          <FiLogOut height={20} width={20} color="black"/>

                          <h1>
                            Disconnect
                          </h1>
                        </div>
                    </MenuItem>
                </>
              ):(   
                <>
                      <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                        <Link href={"https://www.decent.land/"}  className="flex flex-row  items-center ">
                          <a target="_blank" rel="noopener noreferrer" className=' hover:opacity-60 flex flex-row items-center '>
                              <Image src={Favicon} width={27} height={27} className='' alt="" />
                              <h1>Go to Decent land</h1>
                          </a>
                        </Link>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                          
                          <div>
                            <BookOpenIcon height={20} width={20} color="black"/>
                            <h1>
                              Documentation
                            </h1>
                          </div>
                          

                      </MenuItem>
                      <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                          <div>
                            <MoonIcon height={20} width={20} color="black"/>
                            <h1>
                              Dark Mode
                            </h1>
                          </div>
                      </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {routeToPage("/")}} className="flex flex-row">
                      <div onClick={arconnectConnect}>
                        <FiLogIn height={20} width={20} color="black"/>
                        <h1>
                          Connect Wallet
                        </h1>
                      </div>
                    </MenuItem>
                </>
              )
            }
            
            </Menu>
        </div>
      </div>
    )
  }

export default BarMenu