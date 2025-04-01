import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>🎯 Your Next Job, Just Smarter!</h2>
          <p className=' text-lg'>
            Finding the right job shouldn’t be a struggle.
            With AI-powered job matching,
            resume optimization, and interview prep,
            HiredWize helps you land your dream
            role—faster and smarter.
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/sign-up'>Get Started</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className='max-sm:hidden' />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className=' interviews-section'>
          {/* <p>You haven&apos;t taken any interviews yet.</p> */}
          {dummyInterviews.map((interview)=>(
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <p>There are no interviews available</p>
      </section>
    </>
  )
}



export default page