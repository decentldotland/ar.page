// @flow 
import * as React from 'react';

type Props = {
    title: string;
    placeholder?: string;
    svgIcon?: any;
    setValidityCheck: Function;
    regex: string;
    text: string;
    setText: (value: string) => void
};

export const TextI = (props: Props) => {

    const [edited, setEdited] = React.useState<boolean>(false);
    const { title, placeholder, svgIcon, setValidityCheck, regex, text, setText } = props;

    const setValue = React.useCallback(async e => {
        setText(e.target.value);
        setValidityCheck({input: title[0].toLowerCase() + title.replace(' ', ''), error: e.target.value === "" || new RegExp(regex, "i").test(e.target.value)});
        setEdited(true);
    }, [props])

    const borderColor = React.useCallback(() => {

        const test = new RegExp(regex, "i").test(text);
        if (text !== "" && edited)
            switch (test) {
                case true:
                    return " focus:border-prim2 ";
                case false:
                    return " !border-red-500 ";
                default:
                    return " !border-red-500 ";
            }
        else return " focus:border-prim2 "
    }, [edited, regex, text])

    return (
        <div className="relative flex justify-start my-3 w-full items-center">
            <div data-tip={title} className="absolute w-4 h-4 tooltip ">
                {svgIcon}
            </div>
            <input className={"border-primary "+ borderColor() + " transition-all duration-300 ease-in-out ring-0 outline-none text-sm mx-auto text-base-content bg-base-100 pl-8 pr-2 py-1 w-full border-b-2"}
                onInput={setValue}
                onPaste={setValue}
                onChange={setValue}
                value={text || ""}
                placeholder={placeholder}
                spellCheck={false}
                 />
        </div>
    );
};