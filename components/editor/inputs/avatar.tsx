// @flow 
import * as React from 'react';
import Image from 'next/image';
import axios from 'axios';

type Props = {
    regex: string;
    userColor: string;
    setValidityCheck: Function;
    setText: (value: string) => void
};

export const Avatar = (props: Props) => {

    const [edited, setEdited] = React.useState<boolean>(false);
    const [textState, setTextState] = React.useState("");

    // new RegExp(`^@?([a-zA-Z0-9_]{1,${props.characterLimit}})$`, "i")).current;

    const [AvatartState, setAvatarState] = React.useState("");
    const validateImage = React.useCallback(async e => {
        setAvatarState(e.target.value)
        if (e.target.value.length == 43)
            (function checkImageUrl(imageUrl: string) {
                return axios
                    .get("https://arweave.net/" + imageUrl)
                    .then((x) => {
                        if (x.headers["content-type"].startsWith("image")) {
                            props.setText(e.target.value)
                        }
                    });
            })(e.target.value)
    }, [props])

    const setValue = React.useCallback(async e => {

        setTextState(e.target.value)
        if (new RegExp(props.regex, "i").test(e.target.value) && validateImage(e)) {
            props.setText(e.target.value)
            props.setValidityCheck({ input: "Avatar",error: e.target.value === "" || new RegExp(props.regex, "i").test(e.target.value)})
        } else {
            props.setText("");
        }

        setEdited(true)

    }, [props, validateImage])


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
        <div className="justify-start my-3 px-3 w-full lg:w-full flex flex-row flex-wrap">

            <h1 className="text-xl mx-auto text-sviolet font-extrabold w-full text-center col-span-3 grid-rows-1">Avatar</h1>


            <div className="w-full flex flex-col"
            // lg:w-2/5 w-full
            >

                {(!(AvatartState.length >= 42)) ?
                    <div className="mx-auto rounded-full h-32 w-32" style={{ backgroundColor: props.userColor }}></div> :
                    <div className="mx-auto rounded-full h-32 w-32 overflow-hidden">
                        <Image src={`https://arweave.net/${AvatartState}`} alt="Avatar" width="100%" height="100%" layout="responsive" objectFit="cover" />
                    </div>}

                <input className={borderColor() + "text-lg mx-auto rounded-md shadow-md border-2 text-white bg-nftbg px-2 w-1/3 mt-4"}
                    type="text"
                    placeholder='Image TXID'
                    // pattern="[A-Za-z0-9-_]{43}"
                    onChange={setValue}
                />

            </div>



            {/* <h1 className="text-xl my-auto lg:h-fit text-sviolet font-extrabold lg:w-1/5 w-full text-center">or</h1>

            <div className="flex flex-wrap flex-row lg:w-2/5 w-full"
            // col-span-3 lg:col-span-2 row-span-2
            >
                <label className="text-lg my-auto rounded-md shadow-md border-2 border-prim1 text-white bg-nftbg px-2 lg:w-2/3 w-full lg:h-2/3 h-32 flex" htmlFor="profileUpload">
                    <p className="w-full my-auto align-center text-center" >Select an avatar image to be minted here</p>
                    <input className="hidden"
                        id="profileUpload"
                        type="file"
                        // pattern="[A-Za-z0-9-_]{43}"
                        onChange={setValue}
                    />
                </label>
            </div> */}

            {/* <h1 className="text-3xl text-white mx-auto font-extrabold"></h1> */}
        </div>
    );
};