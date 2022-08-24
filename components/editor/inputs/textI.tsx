// @flow 
import * as React from 'react';
type Props = {
    title: string;
    setValidityCheck: Function;
    regex: string;
    text: string;
    setText: (value: string) => void
};
export const TextI = (props: Props) => {

    const [edited, setEdited] = React.useState<boolean>(false);
    const { title, setValidityCheck, regex, text, setText } = props;

    const setValue = React.useCallback(async e => {
        setText(e.target.value);
        setValidityCheck({input: title, error: e.target.value === "" || new RegExp(regex, "i").test(e.target.value)});
        setEdited(true);
    }, [props])

    const borderColor = React.useCallback(() => {

        const test = new RegExp(regex, "i").test(text);
        if (title !== "" && edited)
            switch (test) {
                case true:
                    return " border-prim2 ";
                case false:
                    return " border-red-500 ";
                default:
                    return " border-red-500 ";
            }
        else return " border-prim1 "
    }, [edited, regex, text])

    return (
        <div className="justify-start my-3 px-3 w-full lg:w-1/3">
            <h1 className="text-xl mx-auto text-primary font-extrabold text-left w-full">{title}</h1>
            <input className={borderColor() + "text-lg mx-auto rounded-md shadow-md border-2 text-base-content bg-nftbg px-2 w-full"}
                onInput={setValue}
                onPaste={setValue}
                onChange={setValue}
                value={text || ""}
                 />
        </div>
    );
};