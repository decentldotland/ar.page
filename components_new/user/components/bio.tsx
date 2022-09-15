// @flow 
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../atoms';
import { Title } from './reusables';
type Props = {
    text: string;
};
export const Bio = (props: Props) => {

    const [isDark, setIsDark] = useRecoilState(isDarkMode);

    return (
        <div className="flex flex-wrap shrink w-full font-inter mt-5 md:justify-start
        sm:mt-0 sm:justify-center sm:mb-6 
        ">
            <div className={`font-medium text-sm leading-6 sm:text-center 
                ${isDark ? (' text-white'): (' text-[#666]')} 
             `}>
                {props.text}



                
            </div>
        </div>
    );
};