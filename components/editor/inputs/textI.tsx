// @flow 
import * as React from 'react';
type Props = {
    title: string;
    setValidityCheck: Function;
    regex: string;
    setText: (value: string) => void
};
export const TextI = (props: Props) => {

    const [edited, setEdited] = React.useState<boolean>(false);
    const [textState, setTextState] = React.useState("");

    const setValue = React.useCallback(async e => {

        setTextState(e.target.value)
        props.setText(e.target.value)
        props.setValidityCheck({input: props.title, error: e.target.value === "" || new RegExp(props.regex, "i").test(e.target.value)})

        setEdited(true)

    }, [props])

    const borderColor = React.useCallback(() => {

        const test = new RegExp(props.regex, "i").test(textState);
        if (textState !== "" && edited)
            switch (test) {
                case true:
                    return " border-prim2 ";
                case false:
                    return " border-red-500 ";
                default:
                    return " border-red-500 ";
            }
        else return " border-prim1 "
    }, [edited, props.regex, textState])

    return (
        <div className="justify-start my-3 px-3 w-full lg:w-1/3">
            <h1 className="text-xl mx-auto text-sviolet font-extrabold text-left w-full">{props.title}</h1>
            <input className={borderColor() + "text-lg mx-auto rounded-md shadow-md border-2 text-white bg-nftbg px-2 w-full"}
                onInput={setValue}
                onPaste={setValue}
                onChange={setValue}
                 />
        </div>
    );
};