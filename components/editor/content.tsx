// @flow 
import * as React from 'react';
import Header from '../arconnect/arconnect_loader'
import { faGlobe, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from './inputs/avatar';
import { Bio } from './inputs/bio';
import { TextI } from './inputs/textI';


import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { uploadImage, uploadTXID } from '../../atoms'

import Swal from 'sweetalert2'

import Arweave from "arweave";

type Props = {
    wallet: string;
    userColor: string;
    handleClose: Function;
};

export const Content = (props: Props) => {

    const arweave = React.useRef<Arweave>(Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
    })).current;

    const [isOwner, setIsOwner] = React.useState<boolean>(false);
    const [confirmOwner, setConfirmOwner] = React.useState<boolean>(false);
    const [validityCheck, setValidityCheckState] = React.useState<any>({});
    const [imgWithProfile, setImgWithProfile] = React.useState<any>(false);
    const [idState, setIdState] = useRecoilState(uploadTXID);

    const setValidityCheck = React.useCallback(error => {
        setValidityCheckState((state: any) => {
            const newState = state;
            console.log(state)
            console.log(error.input)
            console.log(error.error)
            newState[error.input] = error.error;
            return newState;
        })
    }, [])

    React.useState(() => {
        window.arweaveWallet.getActiveAddress().then((address) => {
            setIsOwner(address == props.wallet)
            setConfirmOwner(true);
        });
    })

    const [avatarState, setAvatarState] = React.useState<any>(""), //💨🍃
        [bioState, setBioState] = React.useState(""),
        [nicknameState, setNicknameState] = React.useState(""),
        [githubState, setGithubState] = React.useState(""),
        [twitterState, setTwitterState] = React.useState(""),
        [instagramState, setInstagramState] = React.useState(""),
        [customUrlState, setCustomUrlState] = React.useState(""),
        [percent, setPercent] = React.useState(0);

    const pendList = React.useCallback(async (id) => {
        const list: number[] = JSON.parse((localStorage as any).getItem("pending")); //@ts-ignore
        localStorage.setItem("pending", list !== null && list !== [null] ? JSON.stringify([...list, id]) : [id]);
    }, [])


    // const setUpload = useSetRecoilState(uploadImage);

    const submitTX: Function = React.useCallback(async (avatartTxId = "") => {
        // console.log("hi")
        if (Object.values(validityCheck).indexOf(false) > -1) {
            // if(Object.values(validityCheck).reduce((partialSum: any, a: any) => partialSum + a, 0) <= 0){
            Swal.fire({
                title: "An Error occured:",
                text: "Please review and confirm there are no errors in the form fields.",
                icon: 'error',
                color: "#fff",
                customClass: {
                    container: 'border-prim1 font-mono',
                    popup: 'border-prim1 font-mono',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    confirmButton: 'border-prim2',
                },
                iconColor: "rgb(239 68 68)",
                background: "rgba(56, 57, 84, 0.95)",
            })
            return;
        }
        if (avatartTxId == "" &&
            bioState == "" &&
            nicknameState == "" &&
            githubState == ""
            && twitterState == ""
            && instagramState == ""
            && customUrlState == "") {
            Swal.fire({
                backdrop: true,
                title: "Form is empty:",
                text: "No changes were submitted.",
                icon: 'error',
                color: "#fff",
                customClass: {
                    htmlContainer: 'border-prim1 font-mono',
                    popup: 'border-prim1 border-2 font-mono',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    confirmButton: 'bg-prim font-mono border-green-500 border-2',
                },
                iconColor: "rgb(239 68 68)",
                background: "rgba(56, 57, 84, 0.95)",
            })
            return;
        }

        const ANS_CONTRACT = "HrPi8hFc7M5dbrtlELfTKwPr53RRrDBgXGdDkp0h-j4";

        const interaction: {
            function: string;

            //savable
            avatar?: string;
            bio?: string;
            nickname?: string;
            github?: string;
            twitter?: string;
            instagram?: string;
            customUrl?: string;
        } = { "function": "updateProfileMetadata" };

        if (avatartTxId != "") interaction.avatar = avatartTxId;
        if (bioState != "") interaction.bio = bioState
        if (nicknameState != "") interaction.nickname = nicknameState
        if (githubState != "") interaction.github = githubState
        if (twitterState != "") interaction.twitter = twitterState
        if (instagramState != "") interaction.instagram = instagramState
        if (customUrlState != "") interaction.customUrl = customUrlState

        const tx = await arweave.createTransaction({ data: String(Date.now()) });
        tx.addTag("App-Name", "SmartWeaveAction");
        tx.addTag("App-Version", "0.3.0");
        tx.addTag("Contract", ANS_CONTRACT);
        tx.addTag("Input", JSON.stringify(interaction));
        tx.addTag("Content-Type", "text/plain");
        // to 'ensure' that the  TX will not drop when the network is congested
        tx.reward = (+tx.reward * 5).toString();

        await arweave.transactions.sign(tx);
        pendList(tx.id)

        await Swal.fire({
            //toast: true,
            title: "Notice:",
            html: `<p class="font-mono">
                        The Profile update transaction has been Signed and with Transaction ID: <br> 
                        <p class="select-all">${tx.id}</p>
                        <br><br>
                        Please click "Confirm" to submit Profile update transaction.
                    </p>`,
            icon: 'info',
            cancelButtonColor: 'theme(colors.red.300)',
            confirmButtonText:
                'Confirm',
            showCancelButton: true,
            customClass: {
                container: 'border-prim1',
                popup: 'border-prim1',
                title: 'font-mono',
                validationMessage: 'font-mono',
                cancelButton: 'font-mono',
                confirmButton: 'border-prim2 font-mono',
            },
            allowOutsideClick: false,
            background: "rgba(56, 57, 84, 0.95)",
            color: "rgb(149, 239, 174)",
        }).then(async (result) => {
            if (result.isConfirmed) {

                await arweave.transactions.post(tx);
                Swal.fire({
                    title: "Transaction Submitted:",
                    text: "Another popup will appear notify you once the transaction has completed.",
                    icon: 'success',
                    customClass: {
                        container: 'border-prim1',
                        popup: 'border-prim1',
                        title: 'font-mono',
                        validationMessage: 'font-mono',
                        cancelButton: 'font-mono',
                        confirmButton: 'border-prim2',
                    },
                    background: "rgba(56, 57, 84, 0.95)",
                    color: "rgb(149, 239, 174)",
                }).then((result) => {
                    if (result.isConfirmed) {
                        props.handleClose();
                        Swal.fire({
                            toast: true,
                            title: "Notice:",
                            html: `<p class="font-mono">
                                        Please be patient, once the transaction has miner confirmations it can be viewed here.
                                        <br><br>
                                        <a  class="text-blue-300" target="_blank" href="https://viewblock.io/arweave/tx/${tx.id}">
                                            <button type="button" class="swal2-cancel border-prim2 font-mono swal2-styled" aria-label="" style="display: inline-block; width: 75%; margin-left: 0px">Open TX</button>
                                        <a/>
                                    </p>`,
                            icon: 'info',
                            customClass: {
                                container: 'border-prim1',
                                popup: 'border-prim1',
                                title: 'font-mono',
                                validationMessage: 'font-mono',
                                confirmButton: 'border-prim2 font-mono',
                            },
                            background: "rgba(56, 57, 84, 0.95)",
                            color: "rgb(149, 239, 174)",
                        })
                    }
                })

            }
        })


    }, [validityCheck, bioState, nicknameState, githubState, twitterState, instagramState, customUrlState, arweave, pendList, props])

    // React.useEffect(() => {
    //     if (idState !== "" && imgWithProfile !== false) submitTX()
    // }, [idState, submitTX, imgWithProfile])

    const submitPfp = React.useCallback(async () => {

        if (imgWithProfile === false) {
            submitTX()
        } else {
            const tx = await arweave.createTransaction({ data: new Uint8Array(avatarState.data) });
            tx.addTag("Content-Type", avatarState.ContentType);

            await arweave.transactions.sign(tx);
            console.log("signed tx", tx);
            setIdState(tx.id);

            await Swal.fire({
                //toast: true,
                title: "Notice:",
                html: `<p class="font-mono">
                            The Avatar transaction has been Signed and the avatar image will be uploaded to Transaction ID: <br> 
                                <p class="select-all">${tx.id}</p>
                            <br><br>
                            Please click "Confirm" to submit Avatar transaction and begin upload.
                        </p>`,
                icon: 'info',
                cancelButtonColor: 'theme(colors.red.300)',
                confirmButtonText:
                    'Confirm',
                showCancelButton: true,
                customClass: {
                    container: 'border-prim1',
                    popup: 'border-prim1',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    cancelButton: 'font-mono',
                    confirmButton: 'border-prim2 font-mono',
                },
                allowOutsideClick: false,
                background: "rgba(56, 57, 84, 0.95)",
                color: "rgb(149, 239, 174)",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const uploader = await arweave.transactions.getUploader(tx);

                    await Swal.fire({
                        toast: true,
                        title: "Notice:",
                        html: `<p class="font-mono">
                                    Please be patient, once the transaction has miner confirmations it can be viewed here.
                                    <br><br>
                                    <a  class="text-blue-300" target="_blank" href="https://viewblock.io/arweave/tx/${tx.id}">
                                        <button type="button" class="swal2-cancel border-prim2 font-mono swal2-styled" aria-label="" style="display: inline-block; width: 75%; margin-left: 0px">Open TX</button>
                                    <a/>
                                </p>`,
                        icon: 'info',
                        customClass: {
                            container: 'border-prim1',
                            popup: 'border-prim1',
                            title: 'font-mono',
                            validationMessage: 'font-mono',
                            confirmButton: 'border-prim2 font-mono',
                        },
                        background: "rgba(56, 57, 84, 0.95)",
                        color: "rgb(149, 239, 174)",
                    })

                    while (!uploader.isComplete) {
                        await uploader.uploadChunk();
                        setPercent(uploader.pctComplete)
                    }
                    if ((uploader as any).txPosted) {
                        console.log(tx.id)
                        setIdState(tx.id);
                        submitTX(tx.id)

                        await Swal.fire({
                            //toast: true,
                            title: "Notice:",
                            html:   `<p class="font-mono">
                                        Avatar upload complete 🎉.
                                    </p>`,
                            icon: 'success',
                            customClass: {
                                container: 'border-prim1',
                                popup: 'border-prim1',
                                title: 'font-mono',
                                validationMessage: 'font-mono',
                                confirmButton: 'border-prim2 font-mono',
                            },
                            allowOutsideClick: false,
                            background: "rgba(56, 57, 84, 0.95)",
                            color: "rgb(149, 239, 174)",
                        })
                    } else {
                        Swal.fire(
                            {
                                title: "Error",
                                html: `transaction: ${tx.id} please report the issue to a decant.land team member.`,
                                icon: "error",
                                customClass: "font-mono",
                            }
                        );
                    }
                }

            })
        }

    }, [arweave, avatarState.ContentType, avatarState.data, imgWithProfile, setIdState, submitTX])


    const submitUpload = React.useCallback(async () => {
        if (imgWithProfile === false) {
            submitTX()
        } else submitPfp();
    }, [imgWithProfile, submitPfp, submitTX])

    return (
        <div className="rounded-md mx-1 top-0 p-6 lg:pt-6 lg:pb-16 pb-10 max-w-full lg:max-w-screen-lg lg:mx-auto lg:h-fit h-[75vh] lg:overflow-hidden overflow-y-scroll hideScroll0 bg-back shadow-md border-2 border-prim1 shadow-black">
            <FontAwesomeIcon icon={faCircleXmark} onClick={() => props.handleClose()} className="absolute lg:relative top-3 lg:-top-3 right-3 lg:-right-3 float-right  text-prim1 rounded-full h-6" />
            {(isOwner) ?
                <div className="mx-auto max-w-screen-md bg-teal-5010 lg:top-8 lg:-mb-10">



                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4 lg:bg-transparent bg-back">
                        <h1 className="text-xl w-full mx-auto text-sviolet font-extrabold py-5 bottom-0 text-center ">Edit Profile</h1>
                    </div>

                    <div className="flex flex-wrap w-full h-[55vh] -mx-3  gap-y-8 overflow-y-scroll lg:hideScroll0 hideScroll">

                        <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">Sections that are left blank will not be updated/added to the profile.<br />
                            The Sections will become green after they have been edited and red if the value is invalid. NFT profile picture upload coming soon.</h1>

                        <Avatar userColor={props.userColor} setText={setAvatarState} regex="^@?([a-zA-Z0-9_]{1,43})$" setValidityCheck={setValidityCheck} setImgWithProfile={setImgWithProfile} percent={percent} />
                        <Bio setText={setBioState} regex="^@?([\s\S]{1,150})$" setValidityCheck={setValidityCheck} />

                        <TextI title="Nickname" setText={setNicknameState} regex="^@?(\S{1,30})$" setValidityCheck={setValidityCheck} />
                        <TextI title="Github" setText={setGithubState} regex="^([a-zA-Z0-9_]{1,38})$" setValidityCheck={setValidityCheck} />
                        <TextI title="twitter" setText={setTwitterState} regex="^@?([a-zA-Z0-9_]{1,15})$" setValidityCheck={setValidityCheck} />
                        <TextI title="instagram" setText={setInstagramState} regex="^([a-zA-Z0-9_]{1,30})$" setValidityCheck={setValidityCheck} />
                        <TextI title="Custom Url" setText={setCustomUrlState} regex="^@?(\S{1,43})$" setValidityCheck={setValidityCheck} />

                    </div>

                    <div className="lg:w-1/3 w-full mt-8">
                        <button className="text-lg mx-auto rounded-md shadow-md border-2 border-prim1 text-prim2 bg-nftbg px-2"
                            onClick={() => submitUpload()}>
                            {/* onClick={() => submitTX()}> */}
                            submit
                        </button>
                    </div>
                </div> : (confirmOwner) ? <>
                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4 lg:bg-transparent bg-back">
                        <h1 className="text-xl w-full mx-auto text-red-400 font-extrabold py-5 bottom-0 text-center ">Error:</h1>
                    </div>
                    {/* <div className="col-span-3 bg-prim1 h-0.5">
                        </div> */}
                    <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">Selected ArConnect address does not match this ANS Profile.
                    </h1>
                </> : <>
                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4 lg:bg-transparent bg-back">
                        <h1 className="text-xl w-full mx-auto text-sviolet font-extrabold py-5 bottom-0 text-center ">loading:</h1>
                    </div>
                    {/* <div className="col-span-3 bg-prim1 h-0.5">
                        </div> */}
                    <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">please wait...</h1>
                </>
            }
        </div>
    );
};