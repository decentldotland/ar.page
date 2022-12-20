// @flow 
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';
import { NavButtons } from './buttons';
import NavBarButtons from './NavBarButtons';
import SearchBar from './SearchBar';
import SearchBox from './select-search';
import { resolveDomain } from '../../src/utils';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';
import Image from 'next/image';
import Favicon from '../../public/favicon.ico';

export const Nav = () => {

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
                    per_page: 0
                }
            });
            // console.log({res: [], ...result.data}.res, "test 0")
            setUserInfo({res: [], ...result.data});
        };
        fetchData();
    }, []);

    // console.log(userInfo)
    const [isDark, setIsDark] = useRecoilState(isDarkMode);
    const toggleDark = () => {
        localStorage.setItem('theme', isDark ? 'ardark': 'arlight');
        setIsDark(!isDark);
    }


    // bg-base-100
    return (
        <div className={` w-screen  fixed top-0 border-b-2 border-[#FAFAFA] z-30 font-inter flex justify-between sm:h-[76px] 
        h-[66px] px-6 items-center ${isDark ? ('bg-[#131A2E]'):('bg-[#FEFEFF] ')} overflow-visible md:px-16 items-center  sm:px-10`}>
            <div className='flex flex-rows space-x-3.5 items-center '>
                <Link href={resolveDomain("")} >
                    <Image src={Favicon} width={30} height={30} className='mx-auto my-auto cursor-pointer' alt="" />
                </Link>
                <div className='hidden sm:block'>
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
            </div>
            
            {/* <Link href={resolveDomain("")} >
                <h1 className='text-4xl font-bold relative top-3 left-10 text-gray-600 cursor-pointer sm:hidden'>📃</h1>
            </Link> */}
            <div className="ml-2 mt-4">
                <NavBarButtons />
            </div>
        </div>
    );
};

// Nav.getInitialProps = async ({ query }: { query: { user: string; } }) => {
//     try {
//         const res = await axios.get(`https://ans-stats.decent.land/users`);
//         const userInfo = res.data;  // <-- Access one more data object here
//         console.log(userInfo, "test 0")
//         return { userInfo };
//     } catch (error) {
//         console.log("attempting to use domain routing...")
//         return { userInfo: { res: []} };
//     };
// };