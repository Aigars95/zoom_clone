'use client'
import React, {useState} from 'react';
import {
    CallControls,
    CallingState,
    CallParticipantsList,
    CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks
} from "@stream-io/video-react-sdk";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {LayoutList, Users} from "lucide-react";
import {useSearchParams} from "next/navigation";
import EndCallButton from "@/components/EndCallButton";
import Loader from "@/components/Loader";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get("personal");

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false)

    if(callingState !== CallingState.JOINED) {return  <Loader />}

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
               return <PaginatedGridLayout/>
            case 'speaker-right':
               return <SpeakerLayout
                   participantsBarPosition='left'
               />
            default:
               return <SpeakerLayout
                   participantsBarPosition='right'
               />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className=" flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={`fixed top-0 right-0 h-full w-80 bg-sidebar text-white shadow-lg
                        transform transition-transform duration-300 ease-in-out
                        ${showParticipants ? "translate-x-0" : "translate-x-full"}`
                    }
                >

                    <CallParticipantsList
                        onClose={() => setShowParticipants(false)}
                    />
                </div>
                <div className="flex fixed bottom-3 w-full items-center justify-center gap-4 flex-wrap">
                    <CallControls />
                    <DropdownMenu>
                        <div>
                            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d]
                             hover:bg-[#4c535b] px-4 py-2'>
                                <LayoutList
                                    size={20}
                                    className="text-white"
                                />
                            </DropdownMenuTrigger>
                        </div>

                        <DropdownMenuContent>
                            {['Grid', 'Speaker-left', 'Speaker-right'].map((item, index) => (
                                <div key={index}>
                                    <DropdownMenuItem
                                        className='cursor-pointer'
                                        onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                                    >
                                        {item}
                                    </DropdownMenuItem>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <CallStatsButton />
                    <button onClick={() => setShowParticipants((prev) => !prev)}>
                        <div className='cursor-pointer rounded-2xl bg-[#19232d]
                        hover:bg-[#4c535b] px-4 py-2'>
                            <Users size={20} className={cn('text-white')} />
                        </div>
                    </button>
                    {!isPersonalRoom && <EndCallButton />}
                </div>
            </div>
        </section>
    );
};

export default MeetingRoom;

