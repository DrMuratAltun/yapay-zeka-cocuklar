import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const protectedRoutes = ['/admin', '/okul', '/ogretmen']
  const isProtected = protectedRoutes.some((r) => path.startsWith(r))

  if (isProtected && !user) {
    const loginUrl = new URL('/kolay-giris', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  if (user && isProtected) {
    const { data: roleData } = await supabase
      .from('school_users')
      .select('role')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    const role = roleData?.role

    if (path.startsWith('/admin') && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (
      path.startsWith('/okul') &&
      !['school_admin', 'super_admin'].includes(role ?? '')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (
      path.startsWith('/ogretmen') &&
      !['teacher', 'school_admin', 'super_admin'].includes(role ?? '')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/okul/:path*', '/ogretmen/:path*'],
}
