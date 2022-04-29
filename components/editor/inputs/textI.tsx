// @flow 
import * as React from 'react';
type Props = {
    title: string;
    setText: (value: string) => void
};
export const TextI = (props: Props) => {

    const [edited, setEdited] = React.useState<boolean>(false);
    const [textState, setTextState] = React.useState("");

    const setValue = React.useCallback(async e => {

        setTextState(e.target.value)
        if (e.target.value.length <= 38) {
            props.setText(e.target.value)
        } else {
            props.setText("");
        }

        setEdited(true)

    }, [props])

    const borderColor = React.useCallback(() => {
        if (edited)
            switch (true) {
                case textState == "":
                    return " border-prim1 ";
                case textState.length < 38 && /[\S]+/.test(textState):
                    return " border-prim2 ";
                case /[\s]+/.test(textState) && !/[\S]+/.test(textState):
                    return " border-red-500 ";
                default:
                    return " border-red-500 ";
            }
        else return " border-prim1 "
    }, [edited, textState])

    return (
        <div className="justify-start my-3 px-3 w-full lg:w-1/3">
            <h1 className="text-xl mx-auto text-sviolet font-extrabold text-left w-full">{props.title}</h1>
            <input className={borderColor() + "text-lg mx-auto rounded-md shadow-md border-2 text-white bg-nftbg px-2 w-full"}
                onChange={setValue} />
        </div>
    );
};