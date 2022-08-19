// @flow 
import * as React from 'react';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {
    return (
        <div className="flex flex-wrap shrink w-full">
            <div className="w-full font-medium text-xs">
                BIO
            </div>

            <div className="font-normal text-sm leading-6">
                {props.text}
            </div>
        </div>
    );
};