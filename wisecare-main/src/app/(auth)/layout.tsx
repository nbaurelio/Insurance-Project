import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  try {
    const supabase = createServerClient(await cookies())
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) {
      console.error('[AuthLayout] supabase.auth.getUser error:', authError)
    }

    if (user) {
      return redirect('/')
    }
  } catch (err) {
    console.error('[AuthLayout] uncaught error:', err)
    throw err
  }

  return <>{children}</>
}

export default AuthLayout
