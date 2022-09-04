// @flow 
import * as React from 'react';
import Image from 'next/image';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUpload, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ARWEAVE_URL, ARWEAVE_EXPLORER_TX } from '../../../src/constants';
import Swal from 'sweetalert2'

type Props = {
    avatar: string | undefined;
    regex: string;
    userColor: string;
    setValidityCheck: Function;
    setImgWithProfile: Function;
    percent: number;
    idState: string;
    setText: (value: any) => void
};

export const AvatarOld = (props: Props) => {

    // const [edited, setEdited] = React.useState<boolean>(false);
    // const [textState, setTextState] = React.useState("");
    const inputRef = React.useRef<any>();

    const [thePreview, setThePreview] = React.useState("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")
    React.useEffect(() => {
        console.log(inputRef?.current?.value)
        if (props.avatar) {
            setThePreview(ARWEAVE_URL + props.avatar)
        }
    }, [props.avatar])

    // new RegExp(`^@?([a-zA-Z0-9_]{1,${props.characterLimit}})$`, "i")).current;

    // const [AvatartState, setAvatarState] = React.useState("");
    // const validateImage = React.useCallback(async e => {
    //     setAvatarState(e.target.value)
    //     if (e.target.value.length == 43)
    //         (function checkImageUrl(imageUrl: string) {
    //             return axios
    //                 .get("https://pz-prepnb.meson.network/" + imageUrl)
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
                    setThePreview("");
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
        <>
            {/* <h1 className="text-xl mx-auto text-sviolet font-extrabold w-full">Avatar</h1> */}
            {/* <div className="lg:w-2/5 w-full flex flex-col"
            // lg:w-2/5 w-full
            >

                {(!(AvatartState.length >= 42)) ?
                    <div className="mx-auto rounded-full h-32 w-32" style={{ backgroundColor: props.userColor }}></div> :
                    <div className="mx-auto rounded-full h-32 w-32 overflow-hidden">
                        <Image src={`https://pz-prepnb.meson.network/${AvatartState}`} alt="Avatar" width="100%" height="100%" layout="responsive" objectFit="cover" />
                    </div>}

                <input className={borderColor() + "text-lg mx-auto rounded-md shadow-md border-2 text-white bg-nftbg px-2 w-1/3 mt-4"}
                    type="text"
                    placeholder='Image TXID'
                    // pattern="[A-Za-z0-9-_]{43}"
                    onChange={setValue}
                />
            </div> */}



            {/* <h1 className="text-xl my-auto lg:h-fit text-sviolet font-extrabold lg:w-1/5 w-full text-center">or</h1> */}

            <div className="z-0 py-3 h-28 flex text-lg rounded-md text-base-content relative"
            // col-span-3 lg:col-span-2 row-span-2
            >
                <label htmlFor='profileUpload' className="h-48 w-48 rounded-full p-0.5 overflow-hidden " style={{ backgroundColor: props.userColor || "transparent", cursor: !thePreview ? "pointer": "" }}>
                    {thePreview ? (
                        <Image src={thePreview} alt="Avatar" width="100%" height="100%" layout="responsive" objectFit="cover" style={{borderRadius: "999px", cursor: ''}} />
                    ):(
                        <FontAwesomeIcon icon={faUpload} className="rounded-full p-4 flex mt-[62px] mx-auto bg-primary w-16 h-16 text-white transition-opacity duration-300 ease-in-out hover:opacity-40" />
                    )}
                </label>
                {props.percent > 1 &&
                    <div className="z-40 flex absolute h-48 w-full top-0 justify-start mt-20">
                        <div className="btn btn-secondary btn-circle loading no-animation w-fit mx-auto rounded-lg px-2 gap-2">
                            <p className="">{props.percent}% uploaded</p>
                        </div>
                    </div>
                }
                <input className="hidden"
                    id="profileUpload"
                    type="file"
                    ref={inputRef}
                    // pattern="[A-Za-z0-9-_]{43}"
                    onChange={readFileState}
                />
                {thePreview && props.percent < 1 &&
                    <div className="absolute right-8 top-3 z-30">
                        <FontAwesomeIcon icon={faXmark} onClick={() => setThePreview('')} className="btn btn-secondary btn-circle btn-sm" />
                    </div>
                }
            </div>
            {/* <h1 className="text-3xl text-white mx-auto font-extrabold"></h1> */}
        </>
    );
};

export const Avatar = (props: Props) => {
    const inputRef = React.useRef<any>();

    const [thePreview, setThePreview] = React.useState("")

    //pre-load the image if it exists
    React.useEffect(() => {
        // console.log(inputRef?.current?.value)
        if (props.avatar) {
            setThePreview(ARWEAVE_URL + props.avatar)
        }
    }, [props.avatar])

    const readFileState = React.useCallback((event, ) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            setThePreview(URL.createObjectURL(event.target.files[0]));
            props.setImgWithProfile({
                data: Array.from(Buffer.from(e.target?.result as ArrayBuffer)),
                ContentType: event.target.files[0].type
            })
            props.setText({
                data: Array.from(Buffer.from(e.target?.result as ArrayBuffer)),
                ContentType: event.target.files[0].type
            });
        }
        if (event.target.files.length > 0 && event.target.files[0].type.startsWith("image")) {
            reader.readAsArrayBuffer(event.target.files[0]);
        }
    }, [props])

    return (
        <>
            <div className="z-0 py-3 h-28 flex text-lg rounded-md text-base-content relative">
                <label htmlFor='profileUpload' className="h-48 w-48 rounded-full p-1 overflow-hidden " style={{ backgroundColor: props.userColor || "transparent", cursor: !thePreview ? "pointer": "" }}>
                    {thePreview ? (
                        <Image src={thePreview} alt="Avatar" width="100%" height="100%" layout="responsive" objectFit="cover" style={{borderRadius: "999px", cursor: ''}} />
                    ):(
                        <>
                            <FontAwesomeIcon icon={faUpload} className="rounded-full p-4 flex mt-16 mb-1 mx-auto bg-primary w-16 h-16 text-white transition-opacity duration-300 ease-in-out hover:opacity-40" />
                        </>
                    )}
                </label>
                {props.percent > 1 &&
                    <div className="z-40 flex absolute h-48 w-full top-0 justify-start mt-20">
                        <a href={props.idState ? ARWEAVE_EXPLORER_TX + props.idState : ""} className={`btn btn-sm btn-secondary ${!props.idState && `loading no-animation`} w-fit mx-auto rounded-lg px-2 gap-2`}>
                            {props.idState ? (
                                <div className="flex items-center text-xs">
                                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 mr-2" />
                                    Uploaded || Open TX
                                </div>
                            ) : (
                                <div>
                                    <p className="">{props.percent}% uploaded</p>
                                </div>
                            )}
                        </a>
                    </div>
                }
                <input className="hidden"
                    id="profileUpload"
                    type="file"
                    ref={inputRef}
                    onChange={readFileState}
                />
                {thePreview && props.percent < 1 &&
                    <div className="absolute right-6 top-3 z-30">
                        <FontAwesomeIcon icon={faXmark} onClick={() => {
                            setThePreview('');
                            props.setImgWithProfile(false);
                            props.setText(false);
                        }} className="btn btn-secondary btn-circle btn-sm" />
                    </div>
                }
            </div>
        </>
    );
};
