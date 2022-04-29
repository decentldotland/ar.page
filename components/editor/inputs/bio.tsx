// @flow 
import * as React from 'react';
type Props = {
    setText: (value: string) => void
};
export const Bio = (props: Props) => {

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

    return (
        <div className="justify-start my-3 px-3 w-full lg:w-2/3 mb-2">
            <h1 className="text-xl mx-auto text-sviolet font-extrabold text-left w-full">Bio</h1>
            <textarea className={((edited && textState != "") ? " border-prim2 " : " border-prim1 ") +
                "text-lg mx-auto mb-4 rounded-md shadow-md border-2 text-white w-full h-4/5 bg-nftbg px-2"}
                placeholder='About me...'
                onChange={setValue}
            />
        </div>
    );
};