// @flow 
import * as React from 'react';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {
    return (
        <div className="flex flex-wrap shrink w-full">
            <div className="w-full text-[#656] font-medium text-xs">
                BIO
            </div>

            <div className="text-black font-normal text-sm">
                {props.text}
            </div>
        </div>
    );
};