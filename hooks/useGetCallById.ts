import {useEffect, useState} from "react";
import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk";

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState< Call >();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const client = useStreamVideoClient();


    useEffect(() => {
        if (!client) return;
        let isMounted = true;

        const loadCall = async () => {
            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: Array.isArray(id)
                        ? { id: { $in: id } }
                        : { id: { $eq: id } },
                });

                if (isMounted) {
                    if (calls.length > 0) setCall(calls[0]);
                    setIsCallLoading(false);
                }
            } catch (error) {
                console.error("Failed to query call:", error);
                if (isMounted) setIsCallLoading(false);
            }
        };

        loadCall();

        return () => {
            isMounted = false;
        };

    },[id, client]);

    return {call, isCallLoading};
}
