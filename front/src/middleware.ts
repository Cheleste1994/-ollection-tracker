import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const {url, cookies} = request

  const refreshToken = cookies.get('refreshToken')?.value;

  const isAuthPage = url.includes('/auth')

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL('/', url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path']
}
