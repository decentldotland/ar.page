import React from 'react'
import UserBackButton from '../buttons/UserBackButton'
import UserNextButton from '../buttons/UserNextButton'

function EditProfilePage() {
  return (
    <section className='relative h-screen flex flex-col sm:w-[440px] w-full px-5'>
        <div className='flex items-center justify-between mt-10'>
            <UserBackButton />
            <h1 className='text-sm text-center font-bold '>Edit your profile</h1>
            <UserNextButton />
        </div>
    </section>
  )
}

export default EditProfilePage