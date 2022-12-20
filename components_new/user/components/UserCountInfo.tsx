import React from 'react'

interface Props {
    followers: number | string ,
    followings: number | string ,
    posts: number | string  
}

function UserCountInfo({followers, followings, posts}: Props) {
    let list = [
        ['Followers', followers],
        ['Following',  followings],
        ['Posts',  posts],
    ]

    return (
        <div className='relative bottom-2 '>
            <div className='flex flex-row space-x-14 justify-center md:justify-start'>{
                    list.map((v, k)=> {
                    return    ( 
                        <div key={k} className="flex flex-row items-center space-x-2 ">
                            <span className='font-bold text-base'>{v[1]}</span>
                            <h1 className='text-sm text-[#666] text-left'>{v[0]}</h1>
                        </div>)
                    })
                }
            </div>
        </div>
  )
}

export default UserCountInfo