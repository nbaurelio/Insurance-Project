'use client'

import dynamic from 'next/dynamic'

const ForgotPasswordFormDynamic = dynamic(
  () => import('./forgot-password-form'),
  { ssr: false },
)

export default function ForgotPasswordFormWrapper() {
  return <ForgotPasswordFormDynamic />
}
