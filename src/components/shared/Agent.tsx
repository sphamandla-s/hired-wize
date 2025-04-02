"use client"

import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'




enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

function Agent({ userName,
    userId,
    interviewId,
    feedbackId,
    type,
    questions, }: AgentProps) {
    const isSpeaking = true;
    const [callStatus, setCallStatus] = React.useState<CallStatus>(CallStatus.FINISHED);

    const messages = [
        "what is your name?",
        "what is your age?",
        "what is your experience?",
        "what is your education?",
        "what is your skill?",
        "what is your hobby?",
        "what is your strength?",
        "what is your weakness?",
    ]

    const lastMessage = messages[messages.length - 1];


    function handleDisconnect() {

    }

    function handleCall() { }

    return (
        <>
            <div className="call-view">
                {/* AI Interviewer Card */}
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/ai-avatar.png"
                            alt="profile-image"
                            width={65}
                            height={54}
                            className="object-cover"
                        />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                {/* User Profile Card */}
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="profile-image"
                            width={539}
                            height={539}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p
                            key={lastMessage}
                            className={cn(
                                "transition-opacity duration-500 opacity-0",
                                "animate-fadeIn opacity-100"
                            )}
                        >
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}


            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call" onClick={() => handleCall()}>
                        <span
                            className={cn(
                                "absolute animate-ping rounded-full opacity-75",
                                callStatus !== "CONNECTING" && "hidden"
                            )}
                        />

                        <span className="relative">
                            {callStatus === "INACTIVE" || callStatus === "FINISHED"
                                ? "Call"
                                : ". . ."}
                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={() => handleDisconnect()}>
                        End
                    </button>
                )}
            </div>
        </>

    )
}

export default Agent