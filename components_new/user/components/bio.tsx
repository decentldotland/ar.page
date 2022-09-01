// @flow 
import * as React from 'react';
import { Title } from './reusables';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {
    return (
        <div className="flex flex-wrap shrink w-full mb-8">
            <Title>BIO</Title>
            <div className="font-normal text-sm leading-6">
                {props.text}
            </div>
        </div>
    );
};