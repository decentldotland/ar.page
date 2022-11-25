import axios from 'axios';
// import { FAQ } from '../components/FAQ'
import Index from '../components_new/home' 

import User from './profile/[user]'

export default function Home({wildcard, userInfo}) {
  return ((wildcard === "404") ? 
    <Index /> : 
    <User uInfo={userInfo} />
  )
}

export async function getServerSideProps(context) {

  let wildcard = context.req.headers.host.split(".")[0];
  wildcard =
    (wildcard != "ans-ui")
      // ? (wildcard != "localhost:3000")
      ? (wildcard)
      // : process.env.TEST_WILDCARD
    : "404";

    if(wildcard !== "404")
      try {
          const res = await axios.get(`https://ans-stats.decent.land/users`);
          const userInfo = res.data?.res?.find((user) => user.currentLabel === wildcard);
          //
          //
          //
          if (userInfo) return { props: {wildcard, userInfo} };
            //Conduct the changes to the tag
          else return { props: {wildcard} };
      } catch (error) {
        console.log("Failed to use domain routing...")
      };
      return { props: {wildcard} };

}