import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPaintBrush } from 'react-icons/fa'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { useRecoilState, useRecoilValue } from 'recoil'
import { avatarModalState, selectedAvatar } from '../../atoms'
import { ARWEAVE_URL } from '../../src/constants'
import MainNextButton from '../buttons/MainNextButton'
import UserBackButton from '../buttons/UserBackButton'
import UserNextButton from '../buttons/UserNextButton'
import { Divider } from '../user/components/reusables'
import ModalAvatarSelection from './ModalAvatarSelection'
import styles from "./ColorPicker.module.css";
import { HexColorPicker } from "react-colorful";
import { height } from '@mui/system'
import MuiModal from '@mui/material/Modal'
import { Links, Res, userInfo } from '../../src/types'
import { SubmitHandler, useForm } from 'react-hook-form'


const inputContainer = 'w-[115px] text-[#8E8E8F]  text-sm bg-transparent border border-b border-x-0 border-t-0  outline-none'
const subheaderInput = 'text-[15px] font-semibold text-left text-[#8e8e8f]'
const avatarContainer = 'hover:bg-black/70 cursor-pointer border-4 left-[17px] bottom-[50px] border-white relative  rounded-full w-[100px] h-[100px] bg-[#edecec] flex items-center justify-center'

interface Props { 
  loading: boolean
  userInfo: userInfo | undefined
}

interface UserInfo { 
  address_color: string, 
  customUrl: string
  github: string,
  instagram: string,
  twitter: string,
  avatar: string,
  bio: string,
  nickname: string,
}


function EditProfilePage({loading, userInfo}: Props) {


  /**
   * User Form for modifying links 
   */
  const {register} = useForm<UserInfo>()


  /**
   * Colour Picker Dep.
   */
  const [color, setColor] = useState<string>("#edecec");
  const [toggle, setToggle] = useState(false)
  const [newColor, setNewColor] = useState(false)
  const closeModal = () => {
    setToggle(false)
  }

  useEffect(() => {
    if (color !== "#edecec") setNewColor(true)
  }, [color])
  
  const [newChanges, SetnewChanges] = useState(false)

  /**
   * Avatar Selection Dep.
   */
  const [currentSelectedAvatar, setSelectedAvatar] = useRecoilState(selectedAvatar);
  const showModalValue = useRecoilValue(avatarModalState)
  const [showModal, setShowModal] = useRecoilState(avatarModalState);



  const UserAvatar = () => { 
    return <>
    <div className={avatarContainer} onClick={() => setShowModal(true)}>
      {
        currentSelectedAvatar ? (

          <Image 
            src={ARWEAVE_URL + currentSelectedAvatar.id} 
            height={100} 
            // onLoad={(e) => onLoadCallBack}
            width={100} 
            // placeholder="blur"
            // blurDataURL="/images/blur.jpg"
            objectFit='cover' className='rounded-full bg-[#edecec]' /> 
        ) : (
          <div  >
            <MdOutlineAddPhotoAlternate size={24} color={"#6a6b6a"} />
          </div>
        )
      }
    </div>
    </>
  }
  const CoverPage = () => { 
    return <>
      <div onClick={() => setToggle(true)}
        style={{backgroundColor: `${color}`}} 
        className={`rounded-lg w-full h-[135px]  flex items-center justify-center`}>
          <FaPaintBrush size={24} color={`${newColor ? `${color}` : '#6a6b6a'}`}  />
      </div>
    </>
  }

  return (
    <>
    
      <section className='md:relative md:top-32 relative h-screen flex flex-col sm:w-[440px] w-full  md:w-[600px] px-5'>
          <div className='flex items-center justify-between mt-10  '>
              <UserBackButton />
              <h1 className='text-sm text-center font-bold '>Edit your profile</h1>
              <UserNextButton />
          </div>
          <Divider />
          {/* Coverpage  */}
          <div>
            <CoverPage />
            {/* Avatar */}


        {toggle && 
          <MuiModal 
              className="fixes !top-7 left-0 right-0 
              z-50 mx-auto w-full max-w-5xl 
              overflow-hidden overflow-y-scroll 
              rounded-md scrollbar-hide items-center flex flex-col justify-center
              " open={toggle} onClose={closeModal}>
              <> 
                <HexColorPicker color={color} onChange={setColor}/> 
              </>
          </MuiModal>
        }

            <UserAvatar />
          </div>

          <form className='relative bottom-5 '>
            <ul className='space-y-7'>
              <h1 className="text-sm font-bold text-left">About you</h1>
              <li >
                <div className='justify-between flex items-center'>
                  <h2 className={subheaderInput}>Nickname</h2>
                  <input type="text" placeholder='' className={inputContainer} />  
                </div>
              </li>
              <li className='mb-2'>
                <div className='space-y-2 '>
                  <h2 className={subheaderInput}>Bio</h2>
                  <input type="text" placeholder='' className='text-[#8E8E8F] w-full text-sm bg-transparent border border-b border-x-0 border-t-0  outline-none'/>  
                </div>

              </li>

              <h1 className="text-sm font-bold text-left mt-5 ">Social Accounts</h1>

              <li >
                <div className='justify-between flex items-center'>
                  <h2 className={subheaderInput}>Github</h2>
                  <input type="text" placeholder='' className={inputContainer}/>  
                </div>
              </li>
              <li >
                <div className='justify-between flex items-center'>
                  <h2 className={subheaderInput}>Website</h2>
                  <input type="text" placeholder='' className={inputContainer}/>  
                </div>
              </li>
              <li >
                <div className='justify-between flex items-center'>
                  <h2 className={subheaderInput}>Instagram</h2>
                  <input type="text" placeholder='' className={inputContainer}/>  
                </div>
              </li>
              <li >
                <div className='justify-between flex items-center'>
                  <h2 className={subheaderInput}>Telegram</h2>
                  <input type="text" placeholder='' className={inputContainer}/>  
                </div>
              </li>
              <li >
                <div className='justify-between flex items-center'>
                  <h2 className={subheaderInput}>Twitter</h2>
                  <input type="text" placeholder='' className={inputContainer}/>  
                </div>
              </li>
            </ul>
          </form>
          <div className='relative bottom-[20px]'>
            {/* onclick save this  */}
            <div>
              <MainNextButton btnName='Save' disabled={!newChanges || loading}/>
            </div>
          </div>
      </section>
      {showModalValue && (<ModalAvatarSelection />) }

    </>
  )
}

export default EditProfilePage