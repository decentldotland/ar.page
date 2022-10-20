// @flow 
import React, { useState, useEffect } from 'react';
import { Nav } from '../../components_new/nav';
import Script from 'next/script';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';

type Props = {
    children: JSX.Element;

};
export const Layout = (props: Props) => {

    const [isDark, setIsDark] = useRecoilState(isDarkMode);
    const [loaded, setLoaded] = useState(false); // necessary to remove FOUC

    const toggleDark = () => {
        localStorage.setItem('theme', isDark ? 'ardark': 'arlight');
        setIsDark(!isDark);
    }

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'ardark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          localStorage.setItem('theme', 'ardark');
          setIsDark(true)
        } else {
          localStorage.setItem('theme', 'arlight');
          setIsDark(false)
        }
        setLoaded(true)
    }, [isDark]);

    return (
        <>
            {loaded && 
                <div className="flex flex-col flex-wrap font-mono w-full h-full" data-theme={isDark ? "ardark" : "arlight"}>
                    <Nav toggleDark={toggleDark} />
                    {/* for detecting OS theme on browser load */}
                    <Script strategy="beforeInteractive">
                        {`
                            if (localStorage.theme === 'ardark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                localStorage.setItem('theme', 'ardark');
                            } else {
                                localStorage.setItem('theme', 'arlight');
                            }
                        `}
                    </Script>
                    <div className="h-body items-center">
                    <div id="top"className="h-0 w-0"></div>
                        {props.children}
                    </div>
                </div>
            }
        </>
    );
};

