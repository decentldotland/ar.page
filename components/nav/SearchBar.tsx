import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import React from 'react'
import SearchBox from './select-search';

function SearchBar() {
  
  const [userInfo, setUserInfo] = React.useState<any>({res: [
    {
        name: "dummy", 
        value: "dummy",
        photo: "dummy"
    }]
  });

React.useEffect(() => {
    // const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    // const res = await data.json();
    // setninja(res);
    const fetchData = async () => {
        const result = await axios(`https://ans-stats.decent.land/users`, {
            params: {
                // Doing this prevents the constant access to the server 
                // Before it would send multiple request on this api
                per_page: 1
            }
        });
        // console.log({res: [], ...result.data}.res, "test 0")
        setUserInfo({res: [], ...result.data});
    };
    fetchData();
}, []);

  
  return (
    <div className="">
        {/* <div className='px-4 flex flex-row space-x-3.5 
          w-full md:w-[385px] py-4 items-center
           bg-gray-200 rounded-xl'>
            <MagnifyingGlassIcon height={20} width={20} strokeWidth={3} color="gray" />
            <input 
                type="text" 
                placeholder='Search for name or address' 
                className='font-inter w-full text-sm font-normal outline-none bg-inherit'/>
                
        </div> */}
        <SearchBox
                        multiple={false}
                        disabled={false}
                        placeholder="Search for name or address"
                        // items={["test", "test0", "test1", "test2", "test3", "test4"]} />
                        // items={userInfo.res.map((member: { currentLabel: string, nickname: string }) => ({name: member.currentLabel, value: member.nickname}))} /> 
                        options={userInfo.res.map(
                                (member: { 
                                    currentLabel: string, 
                                    nickname: string
                                    avatar: string | undefined
                                    }) => ({name: member.currentLabel, value: member.nickname, photo: member.avatar}))} /> 
    </div>
  )
}

export default SearchBar