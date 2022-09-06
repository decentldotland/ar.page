// @flow 
import * as React from 'react';
import { Title } from './reusables';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {
    return (
        <div className="flex flex-wrap shrink w-full font-inter">
            <Title className="font-bold">BIO</Title>
            <div className="font-medium text-sm leading-6 text-[#666]">
                {props.text}
            </div>
        </div>
    );
};