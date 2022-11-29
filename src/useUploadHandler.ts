import Arweave from 'arweave';
// import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { uploadImage, uploadPercent, uploadTXID } from '../atoms'
import Swal from 'sweetalert2'
import * as _ from "lodash";

export function useUploadHandler() {

    const arweave = React.useRef<Arweave>(Arweave.init({
        host: "pz-prepnb.meson.network",
        port: 443,
        protocol: "https",
    })).current;

    const uploadIMG = useRecoilValue(uploadImage);
    const setPercent = useSetRecoilState(uploadPercent);
    const [idState, setIdState] = useRecoilState(uploadTXID);
    const [reset, setReset] = React.useState(true);


    const transaction = useCallback(
        async (imgData = []) => {
            // if (uploadIMG !== null) {
            let imageData, tx: any;
            // @ts-ignore
            if (imgData !== []) {
                imageData = new Uint8Array(imgData);
                tx = await arweave.createTransaction({ data: imageData });
            }
            else imageData = new Uint8Array((uploadIMG?.data as any));

            if (uploadIMG !== null) {
                tx.addTag('Content-Type', (uploadIMG?.ContentType as string));
                await arweave.transactions.sign(tx);
                setIdState(tx.id);
                console.log(tx.id);
                (localStorage as any).setItem('uploadID', JSON.stringify(tx.id))
            }



            const uploader = 
            // (uploadIMG !== null) ?
            //     await arweave.transactions.getUploader(tx) :
                await arweave.transactions.getUploader((idState == "") ? tx.id : idState, imageData);

            const loop = async () => {
                while (!uploader.isComplete) {
                    await uploader.uploadChunk();
                    console.log(`${uploader.pctComplete}% complete`);
                    setPercent(uploader.pctComplete);
                }
                if (uploader.isComplete) {
                    setReset(true);
                }
            }
            await loop();
            // }
        }, [arweave, idState, setIdState, setPercent, uploadIMG]);

    useEffect(() => {
        if (reset === true) {
        if ((localStorage as any).hasOwnProperty("upload") && uploadIMG === null) {
            setIdState(JSON.parse((localStorage as any).getItem('uploadID')))
            Swal.fire({
                title: "Profile Image upload:",
                html: `Would you like to resume profile image upload? <br> 
                you have already paid for the uploud on transaction id: ${idState}`,
                icon: 'success',
                customClass: {
                    container: 'border-prim1',
                    popup: 'border-prim1',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    confirmButton: 'border-prim2',
                },
                background: "rgba(56, 57, 84, 0.9)",
                color: "rgb(149, 239, 174)",
            }).then((result) => {
                if (result.isConfirmed) {
                    (async () => transaction(JSON.parse((localStorage as any).getItem('uploadID'))))()
                    // transaction(JSON.parse((localStorage as any).getItem('uploadID')));
                }
            });
            setReset(false);
        }
        else if (uploadIMG !== null){
            (async () => transaction())();
            setReset(false);
        }
    } else return;

    }, [idState, reset, setIdState, transaction, uploadIMG])

}