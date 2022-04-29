// @flow 
import * as React from 'react';
import Header from '../arconnect/arconnect_loader'
import { Avatar } from './inputs/avatar';
import { Bio } from './inputs/bio';
import { TextI } from './inputs/textI';

import Arweave from "arweave";

type Props = {
    userColor: string;
    wallet: string;
};

export const Content = (props: Props) => {

    const arweave = React.useRef(Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
    })).current;

    const [isOwner, setIsOwner] = React.useState(false);
    const [confirmOwner, setConfirmOwner] = React.useState(false);

    React.useState(() => {
        window.arweaveWallet.getActiveAddress().then((address) => {
            setIsOwner(address == props.wallet)
            setConfirmOwner(true);
        });
    })

    const [avatarState, setAvatarState] = React.useState(""), //💨🍃
        [bioState, setBioState] = React.useState(""),
        [nicknameState, setNicknameState] = React.useState(""),
        [githubState, setGithubState] = React.useState(""),
        [twitterState, setTwitterState] = React.useState(""),
        [instagramState, setInstagramState] = React.useState(""),
        [customUrlState, setCustomUrlState] = React.useState("");

    const submitTX = React.useCallback(async () => {
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

        if (avatarState != "") interaction.avatar = avatarState
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
        await arweave.transactions.post(tx);
    }, [arweave, avatarState, bioState, nicknameState, githubState, twitterState, instagramState, customUrlState])

    return (
        <div className="rounded-md mx-1 top-0 p-6 lg:pt-6 lg:pb-16 pb-10 max-w-full lg:max-w-screen-lg lg:mx-auto lg:h-fit h-[75vh] lg:overflow-hidden overflow-y-scroll hideScroll0 bg-back shadow-md border-2 border-prim1 shadow-black">

            {/* <div className="w-[91vw] max-w-screen-md h-15 absolute top-0.5 left-4 lg:bg-transparent bg-back z-50">
            <h1 className="text-xl mx-auto text-sviolet font-extrabold py-5 bottom-0 text-center ">Edit Profile</h1>
            <div className="float-right"> <Header /></div>
            </div> */}


            {(isOwner) ?
                <div className="mx-auto max-w-screen-md bg-teal-5010 lg:top-8">

                    <div className="w-[91vw] max-w-screen-md h-15 top-0.5 left-4 lg:bg-transparent bg-back">
                        <h1 className="text-xl w-full mx-auto text-sviolet font-extrabold py-5 bottom-0 text-center ">Edit Profile</h1>
                    </div>

                    <div className="flex flex-wrap w-full h-[50vh] -mx-3  gap-y-8 overflow-y-scroll lg:hideScroll0 hideScroll">

                        <h1 className=" w-full mx-auto py-5 bottom-0 text-center ">Sections that are left blank will not be updated/added to the profile.<br/>
                        The Sections will become green after they have been edited and red if the value is invalid.</h1>

                        <Avatar userColor={props.userColor} setText={setAvatarState} />
                        <Bio setText={setBioState} />

                        <div className="col-span-3 bg-prim1 h-0.5">
                        </div>

                        <TextI title="Nickname" setText={setNicknameState} />
                        <TextI title="Github" setText={setGithubState} />
                        <TextI title="twitter" setText={setTwitterState} />
                        <TextI title="instagram" setText={setInstagramState} />
                        <TextI title="Custom Url" setText={setCustomUrlState} />

                    </div>

                    <div className="lg:w-1/3 w-full mt-8">
                        <button className="text-lg mx-auto rounded-md shadow-md border-2 border-prim1 text-prim2 bg-nftbg px-2"
                            onClick={() => submitTX()}>
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