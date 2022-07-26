// @flow 
import * as React from 'react';
import { SectionOne } from './secOne';
import { SectionTwo } from './secTwo';
type Props = {
    
};
export const Sections = (props: Props) => {
    return (
        <div className="mx-8 md:mx-auto">
            <SectionOne />
            <SectionTwo />
        </div>
    );
};