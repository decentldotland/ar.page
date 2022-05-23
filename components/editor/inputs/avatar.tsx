// @flow 
import * as React from 'react';
import Image from 'next/image';
// import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { uploadImage, uploadPercent } from '../../../atoms'

import Swal from 'sweetalert2'

type Props = {
    regex: string;
    userColor: string;
    setValidityCheck: Function;
    setImgWithProfile: Function;
    percent: number;
    setText: (value: any) => void
};

export const Avatar = (props: Props) => {

    // const [edited, setEdited] = React.useState<boolean>(false);
    // const [textState, setTextState] = React.useState("");
    const inputRef = React.useRef<any>();

    const [thePreview, setThePreview] = React.useState("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")

    // new RegExp(`^@?([a-zA-Z0-9_]{1,${props.characterLimit}})$`, "i")).current;

    // const [AvatartState, setAvatarState] = React.useState("");
    // const validateImage = React.useCallback(async e => {
    //     setAvatarState(e.target.value)
    //     if (e.target.value.length == 43)
    //         (function checkImageUrl(imageUrl: string) {
    //             return axios
    //                 .get("https://arweave.net/" + imageUrl)
    //                 .then((x) => {
    //                     if (x.headers["content-type"].startsWith("image")) {
    //                         props.setText(e.target.value)
    //                     }
    //                 });
    //         })(e.target.value)
    // }, [props])

    // const setValue = React.useCallback(async e => {

    //     setTextState(e.target.value)
    //     if (new RegExp(props.regex, "i").test(e.target.value) && validateImage(e)) {
    //         props.setText(e.target.value)
    //         props.setValidityCheck({ input: "Avatar", error: e.target.value === "" || new RegExp(props.regex, "i").test(e.target.value) })
    //     } else {
    //         props.setText("");
    //     }

    //     setEdited(true)

    // }, [props, validateImage])

    // const percent = useRecoilValue(uploadPercent);
    // const setUpload = useSetRecoilState(uploadImage);

    const readFileState = React.useCallback((event) => {
        var reader = new FileReader();
        reader.onload = function (e) {

            setThePreview(URL.createObjectURL(event.target.files[0]));

            // console.log(Buffer.from(e.target?.result as ArrayBuffer));
            // console.log(Array.from(Buffer.from(e.target?.result as ArrayBuffer)));
            // console.log(new Uint8Array(Array.from(Buffer.from(e.target?.result as ArrayBuffer))));


            Swal.fire({
                // toast: true,
                title: "Notice:",
                html: `<p class="font-mono">
                            Uploading a profile image will require an initial transaction to upload the image which is then followed by the profile update transaction. 
                        </p>`,
                icon: 'info',
                cancelButtonColor: 'theme(colors.red.300)',
                showCancelButton: true,
                customClass: {
                    container: 'border-prim1',
                    popup: 'border-prim1',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    cancelButton: 'font-mono',
                    confirmButton: 'border-prim2 font-mono',
                }, 
                confirmButtonText:
                'Confirm',
                allowOutsideClick: false,
                background: "rgba(56, 57, 84, 0.95)",
                color: "rgb(149, 239, 174)",
            }).then((result) => {
                if (result.isConfirmed) {
                    props.setImgWithProfile({
                        data: Array.from(Buffer.from(e.target?.result as ArrayBuffer)),
                        ContentType: event.target.files[0].type
                    })
                    props.setText({
                        data: Array.from(Buffer.from(e.target?.result as ArrayBuffer)),
                        ContentType: event.target.files[0].type
                    });
                    // (localStorage as any).setItem('upload', JSON.stringify(Array.from(Buffer.from(e.target?.result as ArrayBuffer))))
                } else {
                    inputRef.current.value = "";
                    setThePreview("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                }
            })

        }


        if (event.target.files.length > 0 && event.target.files[0].type.startsWith("image")) {
            reader.readAsArrayBuffer(event.target.files[0]);
        }

    }, [props])

    // const borderColor = React.useCallback(() => {
    //     const test = new RegExp(props.regex, "i").test(textState);
    //     if (textState !== "" && edited)
    //         switch (test) {
    //             case true:
    //                 return " border-prim2 ";
    //             case false:
    //                 return " border-red-500 ";
    //             default:
    //                 return " border-red-500 ";
    //         }
    //     else return " border-prim1 "
    // }, [edited, props.regex, textState])


    return (
        <div className="justify-start h-fit lg:h-72 my-3 px-3 w-full lg:w-2/5 flex flex-row flex-wrap">

            {/* <h1 className="text-xl mx-auto text-sviolet font-extrabold w-full">Avatar</h1> */}
            <h1 className="text-xl mx-auto text-sviolet font-extrabold text-left w-full">Avatar</h1>
            {/* <div className="lg:w-2/5 w-full flex flex-col"
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
            </div> */}



            {/* <h1 className="text-xl my-auto lg:h-fit text-sviolet font-extrabold lg:w-1/5 w-full text-center">or</h1> */}

            <div className="flex flex-wrap flex-row lg:w-64 w-full h-fit lg:h-full"
            // col-span-3 lg:col-span-2 row-span-2
            >


                <label className="flex-wrap justify-center text-lg rounded-md shadow-md border-2 border-prim1 text-white bg-nftbg px-2 w-full lg:h-64 h-fit py-4 flex relative" htmlFor="profileUpload">


                    <div className="mx-auto rounded-full h-32 w-32 my-8 lg:my-0 overflow-hidden" style={{ backgroundColor: thePreview == "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ? props.userColor : "transparent" }}>
                        <Image src={thePreview} alt="Avatar" width="100%" height="100%" layout="responsive" objectFit="cover" />
                    </div>
                    <p className="w-full my-auto align-center text-center relative" >Select an avatar image to be minted here</p>
                    <input className="hidden"
                        id="profileUpload"
                        type="file"
                        ref={inputRef}
                        // pattern="[A-Za-z0-9-_]{43}"
                        onChange={readFileState}
                    />{props.percent > 0 &&
                        <div className="flex absolute h-full w-full top-0 justify-start">
                            <div className="absolute h-full bg-nftbg" style={{ width: `${props.percent}%` }}>
                            </div>
                            <div className="absolute w-full self-center text-center pt-2 h-28" >
                                <p className="bg-back w-fit mx-auto rounded-lg px-2">{props.percent}% uploaded</p>
                            </div>
                        </div>}
                </label>
            </div>

            {/* <h1 className="text-3xl text-white mx-auto font-extrabold"></h1> */}
        </div>
    );
};
