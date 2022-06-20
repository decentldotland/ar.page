import Arweave from 'arweave';
// import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2'
import { useInterval } from './useInterval';
import * as _ from "lodash";

export function useUpdateChecker(callback: any, delay: number) {
    const [data, setData] = useState<any[]>([]);
    const [pending,setPending] = useState<any[]>([]);
    const [open,setOpen] = useState<boolean>(false);
    // const [loading, setLoading] = useState(false);

    const arweave = React.useRef<Arweave>(Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 45000,
        logging: false,
    })).current;
    
    // const upadte = useCallback((id) => {
    //     const fetchData = async () => {
    //         // try {
    //             const state = await arweave.transactions.getStatus(id);
    //             setData(list => _.uniq([...list, state]));
    //             console.log(state);
    //             return (state.status === 200);
    //         // } catch (error) {
    //         //     console.error(error)
    //         // }
    //         // setLoading(false);
    //     };

    //     fetchData();
    //     return false;
    // }, [arweave.transactions]);

    useInterval(() => {
        console.log("tick");
        (window as any).Swal = Swal;
        if((localStorage as any).hasOwnProperty("pending") === false || open) return;
        const list: string[] = JSON.parse((localStorage as any).getItem("pending"));
        //@ts-ignore
        if(list.length == 0 || list == [] || list == [null]) {
            localStorage.removeItem("pending");
            return;
        };
        list.map(async (id: any, i: number) => {
            const state = await arweave.transactions.getStatus(id);
            if(state.status !== 200){
                console.log("pending");
                console.log(id);
                setPending(d => [...d, id])
            } else if(state.status == 200) {
                console.log("data");
                console.log(id);
                setData(l => [...l, id]);
            }
            // const shouldRemove: boolean = upadte(id);
            // const newList: string[] = (shouldRemove) ? list.filter((e: string) => e !== id) : list;
            // console.log(shouldRemove);
            // console.log(newList);
            // console.log(i);
        })
        if (data.length > 0) {
            setOpen(true)
            Swal.fire({
                toast: true,
                title: "Update:",
                html: `<p class="font-mono">The following transactions have completed successfully:<br><br> ${data.join("<br><br>")}</p>`,
                icon: 'success',
                customClass: {
                    container: 'border-prim1',
                    popup: 'border-prim1',
                    title: 'font-mono',
                    validationMessage: 'font-mono',
                    confirmButton: 'border-prim2',
                },
                allowOutsideClick: false,
                background: "rgba(56, 57, 84, 0.9)",
                color: "rgb(149, 239, 174)",
            }).then(() => {
                setOpen(false)
                localStorage.setItem("pending", JSON.stringify(pending));
                setData([])
                setPending([])
            })
        }

    }, 45000)

}