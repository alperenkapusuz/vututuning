import { NextRequest, NextResponse } from 'next/server';

const authUrl = ['/register' , '/login'];

const isAuthUrl = (url: string) => authUrl.includes(url);

export function middleware(req: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname, origin },
  } = req;

  const { value: token } = cookies.get('token') ?? { value: null };
  console.log('middleware token', token);

  if (token && isAuthUrl(pathname)) {
    const response = NextResponse.redirect(`${origin}/`);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icons|img|favicon.ico|/).*)'],
};
