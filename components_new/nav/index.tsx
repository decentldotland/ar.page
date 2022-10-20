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

export const Nav = (props:any) => {

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

    // console.log(userInfo)
    const toggleDark = props.toggleDark;
    const [isDark, setIsDark] = useRecoilState(isDarkMode);


    // bg-base-100
    return (
        <div className={`z-30 font-inter flex justify-between sm:h-[76px] h-[66px] px-5 items-center w-screen

        ${isDark ? ('bg-[#131A2E]'):('bg-white ')}

        overflow-visible md:px-16 items-center w-full sm:px-10`}>
            <div className='flex flex-rows space-x-3.5 items-center '>
                <Link href={resolveDomain("")} >
                    <h1 className='text-xl font-bold text-gray-600 cursor-pointer hidden md:block'>📃</h1>
                </Link>
                <div className='hidden md:block'>
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
            
            <h1 className='text-4xl font-bold relative top-3 left-10 text-gray-600 cursor-pointer sm:hidden'>📃</h1>
            <div className="ml-2 mt-5 sm:mb-6">
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