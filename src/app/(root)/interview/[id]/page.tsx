import Agent from '@/components/shared/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/interview.actions';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

async function page({ params }: RouteParams) {
    const { id } = await params;
    const user = await getCurrentUser();
    const interview = await getInterviewById(id);

    if (!interview) redirect("/")


    return (
        <>
            <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-4 items-center max-sm:flex-col">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src={getRandomInterviewCover()}
                            alt="cover-image"
                            width={40}
                            height={40}
                            className="rounded-full object-cover size-[40px]"
                        />
                        <h3 className="capitalize">{interview.role} Interview</h3>
                    </div>

                </div>

                <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
                    {interview.type}
                </p>
            </div>

            <Agent
                userName={user?.name!}
                userId={user?.id}
                interviewId={id}
                type="interview"
                questions={interview.questions}
                // feedbackId={feedback?.id}
            />
        </>
    )
}

export default page