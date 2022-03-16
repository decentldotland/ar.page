// @flow 
import * as React from 'react';
type Props = {
    children?: any;
    className: string;
};
export const LandingPage = (props: Props) => {
    return (
        <div className="w-full h-srceen lg:-py-24 lg:my-24 max-w-3xl mx-auto my-5 -py-10">
                <div className="w-full lg:min-h-fit grid lg:p-24 content-center lg:relative absolute bottom-4 top-4 text-center rounded-xl shadow-md border-2 border-prim1 shadow-black">
                <h1 className="text-3xl mx-auto font-extrabold text-prim2 underline">Bad News</h1>
                <h1 className="text-xl mx-auto text-white">{"You're early..."}</h1>
                <h1 className="text-xl mx-auto text-white">{"The landing page hasn't landed yet"}</h1>
                <h1 className="text-xl mx-auto text-white">🙃</h1>
            </div>
        </div>
    );
};