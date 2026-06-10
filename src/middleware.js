import { NextResponse } from 'next/server';

export function middleware(request) {
  // Ambil token dari cookie browser
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Tentukan halaman mana saja yang WAJIB login
  const isProtectedRoute = pathname === '/';

  // Jika mencoba akses halaman utama tapi TIDAK punya token, oper ke /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika SUDAH login tapi malah mencoba buka halaman /login, oper balik ke halaman utama
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware hanya berjalan di rute tertentu
export const config = {
  matcher: ['/', '/login'],
};