// @flow 
import axios from 'axios';
import * as React from 'react';
import { NavButtons } from './buttons';
import SearchBox from './select-search';
// type Props = {
//     userInfo?: any;
// };
export const Nav = (props:any) => {

    const [userInfo, setUserInfo] = React.useState<any>({res: [{name: "dummy", value: "dummy"}]});

    React.useEffect(() => {
        // const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        // const res = await data.json();
        // setninja(res);
        const fetchData = async () => {
            const result = await axios(`https://ans-stats.decent.land/users`);
            // console.log({res: [], ...result.data}.res, "test 0")
            setUserInfo({res: [], ...result.data});
        };
        fetchData();
    }, []);
    const toggleDark = props.toggleDark;

    return (
        <div className="bg-base-100 flex h-[56px] w-full overflow-visible z-10">
            <div className="mt-[15px] ml-4 overflow-visible h-full w-full">
                <SearchBox
                    multiple={false}
                    disabled={false}
                    placeholder="Search for a name or address..."
                    // className="w-96"
                    // items={["test", "test0", "test1", "test2", "test3", "test4"]} />
                    // items={userInfo.res.map((member: { currentLabel: string, nickname: string }) => ({name: member.currentLabel, value: member.nickname}))} />
                    options={userInfo.res.map((member: { currentLabel: string, nickname: string }) => ({name: member.currentLabel, value: member.nickname}))} />
            </div>
            <NavButtons toggleDark={toggleDark} />
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