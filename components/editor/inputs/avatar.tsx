// @flow 
import * as React from 'react';
import Image from 'next/image';
import axios from 'axios';

type Props = {
    userColor: string;
    setText: (value: string) => void
};

export const Avatar = (props: Props) => {

    const [AvatartState, setAvatarState] = React.useState("");
    const setValue = React.useCallback(async e => {
        setAvatarState(e.target.value)
        if(e.target.value.length == 43) 
        (function checkImageUrl(imageUrl: string) {
            return axios
                .get("https://arweave.net/" + imageUrl)
                .then((x) => {
                    if (x.headers["content-type"].startsWith("image")){
                        props.setText(e.target.value)
                    }
                });
        })(e.target.value)
    }, [props])

    return (
        <div className="justify-start my-3 px-3 w-full lg:w-1/3 flex flex-col gap-y-2">
            <h1 className="text-xl mx-auto text-sviolet font-extrabold w-full  text-center">Avatar</h1>
            {(!(AvatartState.length >= 42)) ?
                <div className="mx-auto rounded-full h-32 w-32" style={{ backgroundColor: props.userColor }}></div> :
                <div className="mx-auto rounded-full h-32 w-32 overflow-hidden">
                    <Image src={`https://arweave.net/${AvatartState}`} alt="Avatar" width="100%" height="100%" layout="responsive" objectFit="cover" />
                </div>}
            <input className="text-lg mx-auto rounded-md shadow-md border-2 border-prim1 text-white bg-nftbg px-2 w-full"
                type="text"
                placeholder='Image TXID'
                // pattern="[A-Za-z0-9-_]{43}"
                onChange={setValue}
            />
            <h1 className="text-3xl text-white mx-auto font-extrabold"></h1>
        </div>
    );
};