import { NextRequest, NextResponse } from 'next/server';
import { DASHBOARD_PAGES } from './config/pages-url.config';
import { EnumTokens } from './services/auth-token.service';

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  // const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const refreshToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  const isAuthPage = url.includes(DASHBOARD_PAGES.AUTH);
  const isCollectionsPage = url.includes(DASHBOARD_PAGES.COLLECTIONS);
  const isSettingsPage = url.includes(DASHBOARD_PAGES.SETTINGS);

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL('/', url));
  }

  if (isCollectionsPage && !refreshToken) {
    return NextResponse.redirect(new URL('/', url));
  }

  if (isSettingsPage && !refreshToken) {
    return NextResponse.redirect(new URL('/', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path', '/settings', '/collections'],
};
