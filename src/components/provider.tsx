
"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function SectionProviderForAllApp({ children }: any) {
  return (
    <SessionProvider >
      {
        children
      }
    </SessionProvider>
  )
}

export default SectionProviderForAllApp