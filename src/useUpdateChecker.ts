import Arweave from 'arweave';
// import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2'
import { useInterval } from './useInterval';
import * as _ from "lodash";

export function useUpdateChecker(callback: any, delay: number) {
    const [data, setData] = useState<any[]>([]);
    // const [loading, setLoading] = useState(false);

    const arweave = React.useRef<Arweave>(Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
    })).current;

    const upadte = useCallback((id) => {
        const fetchData = async () => {
            try {
                const state = await arweave.transactions.getStatus(id);
                setData(list => _.uniq([...list, state]));
                return (state.status === 200);
            } catch (error) {
                console.error(error)
            }
            // setLoading(false);
        };

        fetchData();
        return false;
    }, [arweave.transactions]);

    useInterval(() => {
        console.log("tick");
        (window as any).Swal = Swal;
        if((localStorage as any).hasOwnProperty("list") === false) return;
        const list: string[] = JSON.parse((localStorage as any).getItem("list"));
        list.forEach((id: any) => {
            const shouldRemove: boolean = upadte(id);
            const newList: string[] = (shouldRemove) ? list.filter((e: string) => e !== id) : list;
            localStorage.setItem("pending", JSON.stringify(newList));
        })
        if (data.length > 0) {
            Swal.fire({
                toast: true,
                title: "Update:",
                html: `<p class="font-mono">The following transactions have completed successfully:<br> ${data.join("<br>")}</p>`,
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
            })
            setData([])
        }

    }, 45000)

}