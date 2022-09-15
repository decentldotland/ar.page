// @flow 
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';
import { NavButtons } from './buttons';
import NavBarButtons from './NavBarButtons';
import SearchBar from './SearchBar';
import SearchBox from './select-search';
// type Props = {
//     userInfo?: any;
// };
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


    // bg-base-100
    return (
        <div className=" font-inter flex justify-between h-[56px] overflow-visible px-2 md:px-16 items-center w-full sm:px-10">
            <div className='flex flex-rows space-x-3.5 items-center '>
                <Link href="/" >
                    <h1 className='text-xl font-bold text-gray-600 cursor-pointer'>📃</h1>
                </Link>
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
            <div className="ml-2">
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