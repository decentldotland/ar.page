// @flow 
import * as React from 'react';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {
    return (
        <div className="flex flex-wrap shrink w-full font-inter">
            {/* <div className="w-full font-medium text-xs text-[#888888] tracking-wide">
                
            </div> */}

            <div className="font-medium text-sm leading-6 text-[#666]">
                {props.text}
            </div>
        </div>
    );
};