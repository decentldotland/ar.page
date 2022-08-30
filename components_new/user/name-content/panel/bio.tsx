// @flow 
import * as React from 'react';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {
    return (
        <div className="flex flex-wrap shrink w-full mb-8">
            <div className="w-full font-medium text-xs text-gray-450 tracking-wide">
                BIO
            </div>

            <div className="font-normal text-sm leading-6">
                {props.text}
            </div>
        </div>
    );
};