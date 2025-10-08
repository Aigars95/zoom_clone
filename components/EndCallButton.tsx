import React from 'react';
import {useCall, useCallStateHooks} from "@stream-io/video-react-sdk";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy
        && call?.state.createdBy.id === localParticipant.userId;
    if (!isMeetingOwner) return null;

    const handleEndCall = async () => {
        await call.endCall();
        router.replace('/')
    }
    return (
        <Button
            className=' bg-[#dc433b] hover:bg-red-400 text-white font-bold'
            onClick={handleEndCall}
        >
            End call for everyone
        </Button>
    );
};

export default EndCallButton;
