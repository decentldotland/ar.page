// @flow 
import * as React from 'react';
type Props = {
    children?: any;
    className: string;
};
export const UserNotFound = (props: Props) => {
    return (
        <div className="w-full h-srceen lg:-py-24 lg:my-24 max-w-3xl mx-auto my-5 -py-10">
                <div className="w-full lg:min-h-fit grid lg:p-24 content-center lg:relative absolute bottom-4 top-4 text-center rounded-3xl shadow-md border-2 border-prim1 shadow-gray-700">
                <h1 className="text-3xl mx-auto font-extrabold text-prim2 underline">Uh-oh 404</h1>
                <h1 className="text-xl mx-auto text-white">User</h1>
                <h1 className="text-xl mx-auto text-white">Not Found</h1>
                <h1 className="text-xl mx-auto text-white">🙃</h1>
            </div>
        </div>
    );
};