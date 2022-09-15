// @flow 
import * as React from 'react';
import Arweave from "arweave";
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { uploadImage, uploadTXID, isDarkMode, isEditorOpen } from '../../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUser, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegram, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ThreeDots } from 'react-loader-spinner';
import { userInfo } from '../../src/types';
import { ANS_CONTRACT, ARWEAVE_EXPLORER_TX, ARWEAVE_OBJECT } from '../../src/constants';
import { Avatar } from './inputs/avatar';
import { Bio } from './inputs/bio';
import { TextI } from './inputs/textI';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';



type Props = {
    wallet: string;
    userColor: string;
    handleClose: Function;
    userInfo: userInfo;
};
export const ContentOld = (props: Props) => {

    const [isDark, setIsDarkMode] = useRecoilState(isDarkMode);

    if (window)
        (window as any).Swal = Swal;


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
    const [inputEnabled, setInputEnabledsetIdState] = React.useState<boolean>(true);

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
    // @ts-ignore
    const {customUrl, github, instagram, twitter} = props.userInfo.userInfo.links;
    const {avatar, bio, nickname} = props.userInfo.userInfo;

    const [avatarState, setAvatarState] = React.useState<any>(""), //💨🍃
        [bioState, setBioState] = React.useState(bio||""),
        [nicknameState, setNicknameState] = React.useState(""),
        [githubState, setGithubState] = React.useState(""),
        [twitterState, setTwitterState] = React.useState(""),
        [instagramState, setInstagramState] = React.useState(""),
        [customUrlState, setCustomUrlState] = React.useState(""),
        [percent, setPercent] = React.useState(0);

    React.useEffect(() => {
        // @ts-ignore
        const {customUrl, github, instagram, twitter} = props.userInfo.userInfo.links;
        const {avatar, bio, nickname} = props.userInfo.userInfo;
        if (customUrl) setCustomUrlState(customUrl);
        if (github) setGithubState(github);
        if (instagram) setInstagramState(instagram);
        if (twitter) setTwitterState(twitter);
        if (avatar) setAvatarState(avatar);
        if (bio) setBioState(bio);
        if (nickname) setNicknameState(nickname);
    }, [props])

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



        Swal.fire({
            html: `
            <p id="txLoader"></p>
            <p class="font-mono">Submitting transaction please wait</p>
            `,
            customClass: {
                container: 'border-prim1',
                popup: 'border-prim1',
                title: 'font-mono',
                validationMessage: 'font-mono',
                cancelButton: 'font-mono',
                confirmButton: 'border-prim2',
            },
            allowOutsideClick: false,
            background: "rgba(56, 57, 84, 0.95)",
            color: "rgb(149, 239, 174)",
            showConfirmButton: false
        })
        ReactDOM.render(
            <div className="flex mx-auto my-auto w-full h-96 justify-center items-center">
                <ThreeDots color={'#e3b5a4'}
                    ariaLabel='loading'
                    height={128}
                    width={128}
                // height={(_width !== undefined && _width >= 1024) ? height : heightM}
                // width={(_width !== undefined && _width >= 1024) ? width : widthM}
                />
            </div>,
            document.getElementById('txLoader')
        );

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


        try {
            await arweave.transactions.sign(tx);
            await Swal.close()
        } catch (error) {
            Swal.fire({
                html: `
                <p id="txLoader"></p>
                <p class="font-mono">Transaction could not be completed at this time, please try again later.</p>
                `,
                customClass: {
                    container: 'border-prim1',
                    popup: 'border-prim1',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    cancelButton: 'font-mono',
                    confirmButton: 'border-prim2',
                },
                allowOutsideClick: false,
                background: "rgba(56, 57, 84, 0.95)",
                color: "rgb(149, 239, 174)",
                showConfirmButton: false
            })
            return;
        }



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
                try {
                    await arweave.transactions.post(tx);
                } catch (error) {
                    Swal.fire({
                        html: `
                        <div>
                        <div id="teleLogo"></div>
                        </div>
                        `,
                        customClass: {
                            container: 'border-prim1',
                            popup: 'border-prim1',
                            title: 'font-mono',
                            validationMessage: 'font-mono',
                            cancelButton: 'font-mono',
                            confirmButton: 'border-prim2',
                        },
                        allowOutsideClick: false,
                        background: "rgba(56, 57, 84, 0.95)",
                        color: "rgb(149, 239, 174)",
                        showConfirmButton: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.close();
                        }
                    })
                
                    ReactDOM.render(
                        <div className="font-mono">
                            {
                                (tx.id) ? 
                                "Transaction could not be completed at this time, for further assistance please contact us on" : 
                                <>{`Transaction could not be completed at this time, Please provided your transaction ID:`} 
                                <br/>{tx.id}<br/> 
                                {`So a DecentLand team member can assist you in resolving the issue.`}<br/> </>
                            }
                        <a className="inline-flex" href="https://t.me/decentland">
                        <div className="ml-2 font-mono mt-2"><FontAwesomeIcon icon={faTelegram} className="inline-flex font-mono mx-2" width="20" height="30" />
                            Telegram</div>
                        </a>
                        </div>
                        ,
                        document.getElementById('teleLogo')
                    );
                
                    return;
                }
                pendList(tx.id)

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
                                        <a  class="text-blue-300" target="_blank" href="https://v2.viewblock.io/arweave/tx/${tx.id}">
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
            tx.addTag("ans-action", "profile-pfp");
            tx.tags
            tx.reward = (+tx.reward * 10).toString();

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
                                    <a  class="text-blue-300" target="_blank" href="https://v2.viewblock.io/arweave/tx/${tx.id}">
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
                            html: `<p class="font-mono">
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
        <div data-theme={isDark ? "ardark": "arlight"} className="rounded-md mx-1 top-0 p-6 px-4 pt-6 pb-18 max-w-full lg:max-w-screen-lg lg:mx-auto h-fit bg-base-100">
            <FontAwesomeIcon icon={faXmark} onClick={() => props.handleClose()} className="lg:relative top-3 lg:-top-3 right-3 lg:-right-3 float-right rounded-full absolute btn btn-primary btn-circle btn-sm" />
            {(isOwner) ?
                <div className="mx-auto max-w-screen-md -mb-10">
                    <div className=" max-w-screen-md h-15 top-0.5 left-4">
                        <h1 className="text-xl w-full mx-auto text-primary font-extrabold py-5 bottom-0 text-center select-none">Edit Profile</h1>
                    </div>
                    <div className={`flex flex-col w-full md:h-3/5 h-[65vh] px-8 overflow-scroll scrollbar scrollbar-thumb-blue-500 ${isDark ? "scrollbar-track-gray-700" : "scrollbar-track-gray-300"}`}>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex justify-center md:-mt-20 mr-6">
                                <Avatar idState={idState} avatar={avatar} userColor={props.userColor} setText={setAvatarState} regex="^@?([a-zA-Z0-9_]{1,43})$" setValidityCheck={setValidityCheck} setImgWithProfile={setImgWithProfile} percent={percent} />
                            </div>
                            <div className="mt-40 md:mt-0">
                                {/* <div className="text-center text-base-content font-semibold text-2xl">Socials</div> */}
                                <div className="grid grid-cols-2 md:grid-rows-2 md:col-span-2 gap-x-6">
                                    <TextI title="Nickname" placeholder="Nickname" svgIcon={<FontAwesomeIcon icon={faUser} className="!w-4 !h-4" />} text={nicknameState} setText={setNicknameState} regex="^@?(\S{1,30})$" setValidityCheck={setValidityCheck} />
                                    <TextI title="Github" placeholder='Github handle' svgIcon={<FontAwesomeIcon icon={faGithub} />} text={githubState} setText={setGithubState} regex="^([a-zA-Z0-9_]{1,38})$" setValidityCheck={setValidityCheck} />
                                    <TextI title="Twitter" placeholder='Twitter handle' svgIcon={<FontAwesomeIcon icon={faTwitter} />} text={twitterState} setText={setTwitterState} regex="^@?([a-zA-Z0-9_]{1,15})$" setValidityCheck={setValidityCheck} />
                                    <TextI title="Instagram" placeholder='Instagram handle' svgIcon={<FontAwesomeIcon icon={faInstagram} />} text={instagramState} setText={setInstagramState} regex="^([a-zA-Z0-9_]{1,30})$" setValidityCheck={setValidityCheck} />
                                    <div className="col-span-2">
                                        <TextI title={'Custom Url'} placeholder={'Website URL'} svgIcon={<FontAwesomeIcon icon={faGlobe} />} text={customUrlState} setText={setCustomUrlState} regex="^@?(\S{1,43})$" setValidityCheck={setValidityCheck} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Bio text={bioState} setText={setBioState} regex="^@?([\s\S]{1,150})$" setValidityCheck={setValidityCheck} />
                        </div>
                    </div>

                    <div className="flex mx-auto w-full">
                        <button className="btn btn-primary text-lg mx-auto my-8"
                            onClick={() => submitUpload()}>
                            {/* onClick={() => submitTX()}> */}
                            {"Submit"}
                        </button>
                    </div>
                </div> : (confirmOwner) ? <>
                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4 ">
                        <h1 className="text-xl w-full mx-auto text-red-400 font-extrabold py-5 bottom-0 text-center ">Error:</h1>
                    </div>
                    {/* <div className="col-span-3 bg-prim1 h-0.5">
                        </div> */}
                    <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">Selected ArConnect address does not match this ANS Profile.
                    </h1>
                </> : <>
                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4">
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

export const Content = (props: Props) => {
    if (window) (window as any).Swal = Swal;

    const arweave = React.useRef<Arweave>(Arweave.init(ARWEAVE_OBJECT)).current;
    const [isDark, setIsDarkMode] = useRecoilState(isDarkMode);
    const [idState, setIdState] = useRecoilState(uploadTXID);

    const [errorStatus, setErrorStatus] = React.useState<string>("");
    const [hideError, setHideError] = React.useState<boolean>(true);
    const [progress, setProgress] = React.useState<number>(0); // upload progress
    const [txId, setTxId] = React.useState<string>("");
    const [isOwner, setIsOwner] = React.useState<boolean>(false);
    const [confirmOwner, setConfirmOwner] = React.useState<boolean>(false);
    const [validityCheck, setValidityCheckState] = React.useState<any>({});
    const [imgWithProfile, setImgWithProfile] = React.useState<any>(false);

    const setValidityCheck = React.useCallback(error => {
        setValidityCheckState((state: any) => {
            const newState = state;
            // console.log(state)
            // console.log(error.input)
            // console.log(error.error)
            newState[error.input] = error.error;
            return newState;
        })
    }, [])

    const checkValuesAreEmpty = (fields:string[]) => {
        return fields.filter(field => !!field.trim()).length === 0
    }

    React.useState(() => {
        window.arweaveWallet.getActiveAddress().then((address) => {
            setIsOwner(address == props.wallet)
            setConfirmOwner(true);
        });
    })

    // @ts-ignore
    const {customUrl, github, instagram, twitter} = props.userInfo.userInfo.links;
    const {avatar, bio, nickname} = props.userInfo.userInfo;

    const [avatarState, setAvatarState] = React.useState<any>(""), //💨🍃
        [bioState, setBioState] = React.useState(""),
        [nicknameState, setNicknameState] = React.useState(""),
        [githubState, setGithubState] = React.useState(""),
        [twitterState, setTwitterState] = React.useState(""),
        [instagramState, setInstagramState] = React.useState(""),
        [customUrlState, setCustomUrlState] = React.useState(""),
        [percent, setPercent] = React.useState(0);

    React.useEffect(() => {
        // @ts-ignore
        const {customUrl, github, instagram, twitter} = props.userInfo.userInfo.links;
        const {avatar, bio, nickname} = props.userInfo.userInfo;
        if (customUrl) setCustomUrlState(customUrl);
        if (github) setGithubState(github);
        if (instagram) setInstagramState(instagram);
        if (twitter) setTwitterState(twitter);
        if (avatar) setAvatarState(avatar);
        if (bio) setBioState(bio);
        if (nickname) setNicknameState(nickname);
    }, [props])

    const showError = (text:string) => {
        setHideError(false)
        setErrorStatus(text);
        setTimeout(() => {
            setHideError(true)
        }, 5000);
        setProgress(0)
    }

    const submitTX: Function = React.useCallback(async (avatartTxId = "") => {
        const fields = [avatartTxId, bioState, nicknameState, githubState, twitterState, instagramState, customUrlState]
        if (Object.values(validityCheck).indexOf(false) > -1) {
            showError('Some of the fields are not valid, please fix the ones highlighted in red');
            return;
        }
        if (checkValuesAreEmpty(fields)){
            showError('Please fill in at least one field');
            return;
        }
        if (!avatartTxId) setProgress(1);

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
        setProgress(1)
        try {
            await arweave.transactions.sign(tx);
            await arweave.transactions.post(tx);
            setProgress(2);
            setProgress(3);
            setTxId(tx.id);
        } catch (error) {
            showError('Transaction failed, top up your wallet and try again');
            return;
        }
    }, [validityCheck, bioState, nicknameState, githubState, twitterState, instagramState, customUrlState, arweave, props])

    const submitPfp = React.useCallback(async () => {
        if (imgWithProfile !== false) {
            setProgress(1)
            const tx = await arweave.createTransaction({ data: new Uint8Array(avatarState.data) });
            tx.addTag("Content-Type", avatarState.ContentType);
            tx.addTag("ans-action", "profile-pfp");
            tx.tags
            tx.reward = (+tx.reward * 10).toString();

            await arweave.transactions.sign(tx);
            console.log("signed tx", tx);
            setIdState(tx.id);

            const uploader = await arweave.transactions.getUploader(tx);
            while (!uploader.isComplete) {
                await uploader.uploadChunk();
                setPercent(uploader.pctComplete)
            }
            if ((uploader as any).txPosted) {
                console.log(tx.id)
                setIdState(tx.id);
                submitTX(tx.id)
            } else {
                showError('unexpected error, ask us for help in the decent.land Telegram channel')
            }
        }
    }, [arweave, avatarState.ContentType, avatarState.data, imgWithProfile, setIdState, submitTX])

    // Opens up a modal
    const [editEnabled, setEditEnabled] = useRecoilState(isEditorOpen);
    const [time, setTimeOut] = React.useState(false)

    const submitUpload = React.useCallback(async () => {
        if (imgWithProfile === false) {
            // Submit transaction 
            toast(`✅ Sending Transaction!`, {duration: 4000})

            submitTX()
            

           
        } else submitPfp();
    }, [imgWithProfile, submitPfp, submitTX])

    React.useEffect(() => {
        setTimeout(function () {
        setTimeOut(true); 
        }, 6000);
    }, [progress]);


    React.useEffect(() => { 
         // If time out close the modal
         if (time) {
            setEditEnabled(false);
            toast(`✅ Profile Updated Successfully!`, {
                duration: 4000,
                style: {
                    backgroundColor: "#76E1B5",
                    color: "#fff"
                }
            })
        }
    }, [time])


    return (
        <>
        {/* <Toaster position='top-center'/> */}

        <div data-theme={isDark ? "ardark": "arlight"} className="font-inter rounded-md mx-1 relative top-0 p-6 px-4 pt-6  max-w-full lg:max-w-screen-lg lg:mx-auto h-fit bg-base-100">
                
                {/* The new close button */}
                <div className='absolute right-10 top-10 rounded-full bg-[#1273ea]/20 hover:bg-[#1273ea]/30 cursor-pointer w-[40px] h-[40px] items-center flex  justify-center ' >
                    <FontAwesomeIcon icon={faXmark} height={20} width={20} strokeWidth={2} onClick={() => props.handleClose()} color="#1273ea" />
                </div>

            {(isOwner) ?
                <div className="mx-auto max-w-screen-md -mb-10">
                    <div className="max-w-screen-md h-15 top-0.5 left-4">
                        <h1 className="text-xl w-full mx-auto text-primary font-extrabold py-5 bottom-0 text-center select-none">Edit Profile</h1>
                    </div>
                    <div className={`flex flex-col w-full md:h-3/5 h-[65vh] px-8 overflow-scroll scrollbar scrollbar-thumb-blue-500 ${isDark ? "scrollbar-track-gray-700" : "scrollbar-track-gray-300"}`}>
                        <div className="flex flex-col md:flex-row md:items-center pt-8">
                            <div className="flex justify-center md:-mt-20 md:mr-6">
                                <Avatar avatar={avatar} 
                                    userColor={props.userColor} 
                                    setText={setAvatarState} 
                                    regex="^@?([a-zA-Z0-9_]{1,43})$" 
                                    setValidityCheck={setValidityCheck} 
                                    setImgWithProfile={setImgWithProfile} 
                                    percent={percent}
                                    idState={idState} />

                            </div>
                            <div className="mt-40 md:mt-0">
                                <div className="grid grid-cols-2 md:grid-rows-2 md:col-span-2 gap-x-6">
                                    <TextI title="Nickname" placeholder="Nickname" svgIcon={<FontAwesomeIcon icon={faUser} className="!w-4 !h-4" />} text={nicknameState} setText={setNicknameState} regex="^@?(\S{1,30})$" setValidityCheck={setValidityCheck} />
                                    <TextI title="Github" placeholder='Github handle' svgIcon={<FontAwesomeIcon icon={faGithub} />} text={githubState} setText={setGithubState} regex="^([a-zA-Z0-9_]{1,38})$" setValidityCheck={setValidityCheck} />
                                    <TextI title="Twitter" placeholder='Twitter handle' svgIcon={<FontAwesomeIcon icon={faTwitter} />} text={twitterState} setText={setTwitterState} regex="^@?([a-zA-Z0-9_]{1,15})$" setValidityCheck={setValidityCheck} />
                                    <TextI title="Instagram" placeholder='Instagram handle' svgIcon={<FontAwesomeIcon icon={faInstagram} />} text={instagramState} setText={setInstagramState} regex="^([a-zA-Z0-9_]{1,30})$" setValidityCheck={setValidityCheck} />
                                    <div className="col-span-2">
                                        <TextI title={'Custom Url'} placeholder={'Website URL'} svgIcon={<FontAwesomeIcon icon={faGlobe} />} text={customUrlState} setText={setCustomUrlState} regex="^@?(\S{1,43})$" setValidityCheck={setValidityCheck} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* Bio */}
                        <div className="mt-8">
                            <Bio text={bioState} setText={setBioState} regex="^@?([\s\S]{1,150})$" setValidityCheck={setValidityCheck} />
                            <p className='text-sm text-gray-400'>{bioState.length} / 150</p>
                        </div>
                    
                    </div>

                    <div className="flex flex-col px-8 justify-center w-full">
                        <div className={`mb-4 transition-opacity duration-500 ease-in-out text-red-500 ${hideError ? "opacity-0 select-none": "opacity-100"}`}>{errorStatus}</div>
                        <div className={`flex flex-col items-center ${progress > 0 ? 'opacity-100' : '-mt-12 opacity-0'}`}>
                            <div className={`w-full overflow-x-hidden bg-gray-200 rounded-full h-2.5`}>
                                <div className={`bg-success transition-width duration-500 ease-in-out h-2.5 rounded-full ${progress > 0 && progress < 3 && "animate-pulse"}`} style={{width: (progress * 33.34) + '%'}}></div>
                            </div>
                           
                           
                            <div className={`btn btn-sm my-2 btn-outline  ${progress < 3 ? `loading btn-secondary`: `btn-success`}`}>
                                {(progress < 3) ? `Uploading... Step ${Math.round(progress)}/3` : 
                                    <>
                                        <a  target="_blank" rel="noreferrer" href={ARWEAVE_EXPLORER_TX + txId} className="space-x-2 flex flex-row items-center">
                                            {/* <FontAwesomeIcon icon={faCheck} className="w-4 h-4 mr-2" /> Uploaded || {" "} Open TX */}
                                            <p className='mr-2'>
                                                {txId.replace(/(.{7})..+/, "$1…")}
                                            </p>
                                            <ArrowUpRightIcon height={14} width={14} color={"#36D399"} strokeWidth={1} />

                                        </a>
                                    </>
                                }
                            </div>


                        </div>


                        <section className='mb-5 flex justify-center'>
                            {
                                progress == 0 ? (
                                    <div className='flex flex-col '>
                                        <h1 className="text-center text-sm text-gray-400 sm:text-xs sm:mb-0">The transaction takes around 5 minutes to mine on Arweave!</h1>

                                        <h1 className='text-sm text-gray-400'>Any unsaved changes will be discarded if you decide to leave the page.</h1>
                                        <button  disabled={!confirmOwner} className="btn btn-primary text-lg mx-auto mb-8 mt-4 " onClick={() => submitUpload()}>
                                            Save Profile
                                        </button>
                                    </div>
                                ) : (

                                    <div className='mt-5 mb-6'>
                                        <div className=" text-center text-sm text-gray-400">
                                            <h1>
                                                Any unsaved changes will be discarded if you decide to leave the page.
                                            </h1>
                                            <h1>
                                                The window will automatically close. 
                                            
                                            </h1>
                                        </div>
                                    </div>
                                )
                            }
                        </section>


                    </div>
                </div> : (confirmOwner) ? <>
                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4 ">
                        <h1 className="text-xl w-full mx-auto text-red-400 font-extrabold py-5 bottom-0 text-center ">Error:</h1>
                    </div>
                    {/* <div className="col-span-3 bg-prim1 h-0.5">
                        </div> */}
                    <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">Selected ArConnect address does not match this ANS Profile.
                    </h1>
                </> : <>
                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4">
                        <h1 className="text-xl w-full mx-auto text-sviolet font-extrabold py-5 bottom-0 text-center ">loading:</h1>
                    </div>
                    {/* <div className="col-span-3 bg-prim1 h-0.5">
                        </div> */}
                    <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">please wait...</h1>
                </>
            }
        </div>
        </>

    );
};
