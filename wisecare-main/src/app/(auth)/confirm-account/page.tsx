import SetPasswordForm from '@/app/(auth)/confirm-account/set-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirm Account',
}

const ConfirmAccount = async () => {
  return (
    <div className="flex h-screen w-full flex-col items-center py-8 md:justify-center md:px-24">
      <SetPasswordForm />
    </div>
  )
}

export default ConfirmAccount
