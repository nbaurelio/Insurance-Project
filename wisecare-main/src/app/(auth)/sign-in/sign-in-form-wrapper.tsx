'use client'

import dynamic from 'next/dynamic'

const SignInFormDynamic = dynamic(() => import('./sign-in-form'), { ssr: false })

export default function SignInFormWrapper() {
  return <SignInFormDynamic />
}
