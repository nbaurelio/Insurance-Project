import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'

const PUBLIC_PATHS = ['/sign-in', '/forgot-password', '/confirm-account', '/api/auth/callback', '/pending']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  try {
    const { supabase, response } = createMiddlewareClient(request)

    // Refresh session so Server Components can read the latest cookies
    await supabase.auth.getSession()

    const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))
    if (!isPublic) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/sign-in'
        return NextResponse.redirect(url)
      }
    }

    return response
  } catch (e) {
    // Supabase client could not be created (env vars missing, etc.)
    return NextResponse.next({
      request: { headers: request.headers },
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
