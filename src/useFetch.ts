import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (uri: string) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(uri);
                setData(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };

        fetchData();
    }, [uri]);

    return {
        data,
        loading,
    };
};

export default useFetchData;