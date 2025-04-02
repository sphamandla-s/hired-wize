import Agent from '@/components/shared/Agent'
import React from 'react'

function InterviewPage() {
  return (
    <>
    <h3>Interview Generation</h3>
    <Agent userName="John Doe"  userId="user1" type="generate" />
    </>
  )
}

export default InterviewPage