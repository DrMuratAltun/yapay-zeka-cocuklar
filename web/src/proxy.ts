import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

async function handler(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Bölüm 1 ücretsiz demo — her zaman serbest
  if (path === '/bolumler/1') {
    return NextResponse.next()
  }

  // API route'lari: sadece cookie refresh yap, redirect/rol kontrolu yapma
  if (path.startsWith('/api/')) {
    let supabaseResponse = NextResponse.next({ request })
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return request.cookies.getAll() },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({ request })
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              )
            },
          },
        }
      )
      await supabase.auth.getUser()
    } catch {}
    return supabaseResponse
  }

  // Route sınıflandırması
  const adminRoutes = ['/admin', '/okul', '/ogretmen']
  const isAdminRoute = adminRoutes.some((r) => path.startsWith(r))
  const studentRoutes = ['/bolumler/', '/ogrenci']
  const isStudentRoute = studentRoutes.some((r) => path.startsWith(r))

  let supabaseResponse = NextResponse.next({ request })

  try {
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

    // Giriş yapmamış → doğru login sayfasına yönlendir
    if (!user && isAdminRoute) {
      const loginUrl = new URL('/giris', request.url)
      loginUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(loginUrl)
    }

    if (!user && isStudentRoute) {
      const loginUrl = new URL('/kolay-giris', request.url)
      loginUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(loginUrl)
    }

    // Giriş yapmış — admin route'larda rol kontrolü (adminClient ile — RLS bypass)
    if (user && isAdminRoute) {
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )

      const { data: roleData } = await adminClient
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
  } catch {
    // Supabase hatası → güvenli taraf: korumalı route'larda erişimi engelle
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/giris', request.url))
    }
    if (isStudentRoute) {
      return NextResponse.redirect(new URL('/kolay-giris', request.url))
    }
    return NextResponse.next()
  }
}

// Next.js 16 proxy + Next.js 15 middleware uyumluluğu
export const proxy = handler
export const middleware = handler

export const config = {
  matcher: [
    '/admin/:path*',
    '/okul/:path*',
    '/ogretmen/:path*',
    '/bolumler/:path*',
    '/ogrenci/:path*',
    '/api/:path*',
  ],
}
