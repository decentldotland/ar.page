// @flow 
import * as React from 'react';
type Props = {
    children?: any;
    className: string;
    user: string;
    style: any;
};
export const Tweets = (props: Props) => {
    return (
        <div className={props.className} style={props.style}>
        <div id="Tweets" className="rounded-md overflow-scroll border-2 border-prim1  shadow-md shadow-black">
            <a className="twitter-timeline" data-theme="dark" href={`https://twitter.com/${props.user}?ref_src=twsrc%5Etfw`}>Tweets by TwitterDev</a> 
            <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
        </div>
    );
};