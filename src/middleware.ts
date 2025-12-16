import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const PRIVATE_ROUTES = ['/dashboard']
const PUBLIC_ROUTES = ['/login', '/register', '/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const token = request.cookies.get('access_token')?.value

  const isPrivateRoute = PRIVATE_ROUTES.some((route) => 
    pathname.startsWith(route)
  )

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/login?redirected=unauthorized', request.url))
  }

  if (isPrivateRoute && token) {
    const isValid = await validateToken(token)

    if (!isValid) {
      const response = NextResponse.redirect(new URL('/login?redirected=expired', request.url))
      response.cookies.delete('access_token')
      return response
    }
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.ok
  } catch (error) {
    console.error('Erro na validação do token no middleware:', error)
    return false
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}