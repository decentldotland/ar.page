import React from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import UserBackButton from '../buttons/UserBackButton'
import UserNextButton from '../buttons/UserNextButton'
import { Divider } from '../user/components/reusables'


const inputContainer = 'w-[115px] text-[#8E8E8F] bg-transparent border border-b border-x-0 border-t-0  outline-none'
const subheaderInput = 'text-[15px] font-semibold text-left text-[#8e8e8f]'

function EditProfilePage() {
  return (
    <section className='relative h-screen flex flex-col sm:w-[440px] w-full px-5'>
        <div className='flex items-center justify-between mt-10 '>
            <UserBackButton />
            <h1 className='text-sm text-center font-bold '>Edit your profile</h1>
            <UserNextButton />
        </div>
        <Divider />
        {/* Coverpage  */}
        <div>
          <div className="rounded-lg w-full h-[135px] bg-[#edecec] flex items-center justify-center">
            <MdOutlineAddPhotoAlternate size={24} color={"#6a6b6a"} />
          </div>
          {/* Avatar */}
          <div className="border-4 left-[17px] bottom-[50px] border-white relative  rounded-full w-[100px] h-[100px] bg-[#edecec] flex items-center justify-center">
            <MdOutlineAddPhotoAlternate size={24} color={"#6a6b6a"} />
          </div>
        </div>

        <section className='relative bottom-5 '>

          <ul className='space-y-6'>
            <h1 className="text-sm font-bold text-left">About you</h1>
            <li >
              <div className='justify-between flex items-center'>
                <h2 className={subheaderInput}>Nickname</h2>
                <input type="text" placeholder='' className={inputContainer}/>  
              </div>
            </li>
            <li >
              <div className='space-y-2 '>
                <h2 className={subheaderInput}>Bio</h2>
                <input type="text" placeholder='' className='text-[#8E8E8F] w-full bg-transparent border border-b border-x-0 border-t-0  outline-none'/>  
              </div>
            </li>

            <h1 className="text-sm font-bold text-left mt-5">Social Accounts</h1>

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
        </section>
    </section>
  )
}

export default EditProfilePage