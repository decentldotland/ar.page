import axios from 'axios';
import Index from '../components/home'; 
import User from './profile/[user]';

export default function Home({wildcard, userInfo}) {
  return ((wildcard === "404") ? 
    <Index />: 
    <User uInfo={userInfo} />
  )
}

export async function getServerSideProps(context) {

  let wildcard = context.req.headers.host.split(".")[0];
  wildcard = (wildcard != "ans-ui") ? (wildcard) : "404";
    if(wildcard !== "404" && wildcard !== "ans-ui" && !wildcard.includes("localhost"))
      try {
        if (!wildcard) return;
        console.log(wildcard)
        const res = await axios.get(`https://ans-resolver.herokuapp.com/resolve-as-arpage/${wildcard}`);
        const userInfo = res.data;
        if (userInfo) return { props: {wildcard, userInfo} };
        else return { props: {wildcard} };
      } catch (error) {
        console.log("Failed to use domain routing...")
      };
      return { props: {wildcard} };
      
}

