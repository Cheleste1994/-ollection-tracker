import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";

export async function middleware(request: NextRequest, response: NextResponse) {
  const {url, cookies} = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = url.includes('/auth')
  const isSettingsPage = url.includes('/settings')

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL('/', url))
  }

  if (isSettingsPage && !refreshToken) {
    return NextResponse.redirect(new URL('/', url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path', '/settings']
}
