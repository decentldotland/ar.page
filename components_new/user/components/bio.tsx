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
        <div className="flex flex-wrap shrink w-full font-inter  md:justify-start
        sm:mt-0 justify-center mb-6 md:pr-20 sm:px-2
        ">
            <div className={`font-medium text-sm leading-6 text-center md:text-left
                ${isDark ? (' text-white'): (' text-[#666]')} 
             `}>
                {props.text}
            </div>
        </div>
    );
};