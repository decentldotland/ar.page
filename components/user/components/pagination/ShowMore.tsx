import React from 'react'

interface ShowProps { 
    firstIndex: number,
    postsPerPage: number, 
    totalPost: number
}

function ShowMore({postsPerPage, totalPost}: ShowProps) {
  
  return (
    <div>
        {/* Show More Activity */}
        <article className='flex justify-center mt-12'>
            <button   className='py-2 px-6 btn-primary  text-lg
               text-white font-semibold flex flex-row 
                justify-center rounded-lg'>
              <h1>Show More</h1>
            </button>
        </article>
    </div>
  )
}

export default ShowMore