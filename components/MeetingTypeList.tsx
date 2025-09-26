"use client"
import React, { useState} from 'react';
import HomeCard from "@/components/HomeCard";
import {useRouter} from "next/navigation";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] =
        useState<'isScheduleMeeting' | 'isJoiningMeeting | isInstantMeeting' | undefined>()
    return (
        <section className="grid grid-cols-1 gap-5
         md:grid-cols-2 xl:grid-cols-4">

            <HomeCard
            img='/icons/add-meeting.svg'
            title='New Meeting'
            description='Start an instant meeting'
            handleClick={() => setMeetingState('isInstantMeeting')}
            className="bg-chart-3"
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='Via invitation link'
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-chart-1"
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-chart-4"
            />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Recordings'
                description='Check out your recording'
                handleClick={() => router.push('/recordings')}
                className="bg-chart-5"
            />


        </section>
    );
};

export default MeetingTypeList;
