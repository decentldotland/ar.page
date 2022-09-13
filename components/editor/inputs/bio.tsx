// @flow 
import * as React from 'react';
type Props = {
    setValidityCheck: Function;
    regex: string;
    text: string;
    setText: (value: string) => void;
};
export const Bio = (props: Props) => {

    const [edited, setEdited] = React.useState<boolean>(false);
    const { setValidityCheck, regex, text, setText } = props;

    const setValue = React.useCallback(async e => {
        setText(e.target.value);
        setValidityCheck({input: "bio", error: e.target.value === "" || new RegExp(regex, "i").test(e.target.value)});
        setEdited(true);
    }, [props])

    const borderColor = React.useCallback(() => {
        const test = new RegExp(regex, "i").test(text);
        if (text !== "" && edited)
            switch (test) {
                case true:
                    return " focus:border-prim2 ";
                case false:
                    return " border-red-500 ";
                default:
                    return " border-red-500 ";
            }
        else return " focus:border-prim2 "
    }, [edited, regex, text])

    return (
        <div className="w-full">
            <div className="my-3 text-primary text-xl font-semibold select-none">About me</div>
            <textarea className={borderColor() + "!outline-none text-sm !ring-0  textarea textarea-primary mx-auto rounded-md shadow-md w-full resize-none h-48 px-2 bg-base-100 border-2"}
                placeholder='About me...'
                onInput={setValue}
                onPaste={setValue}
                onChange={setValue}
                value={text || ""}
            />
        </div>
    );
};