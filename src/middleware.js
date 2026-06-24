import { NextResponse } from 'next/server';

const SECRET_KEY = 'kunci_rahasia_kelompok_kami';

function base64UrlToText(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

  return atob(padded);
}

function base64UrlToBytes(value) {
  const text = base64UrlToText(value);

  return Uint8Array.from(text, (char) => char.charCodeAt(0));
}

async function verifyToken(token) {
  try {
    const [header, payload, signature] = token.split('.');

    if (!header || !payload || !signature) {
      return null;
    }

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(SECRET_KEY),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const isValidSignature = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlToBytes(signature),
      new TextEncoder().encode(`${header}.${payload}`)
    );

    if (!isValidSignature) {
      return null;
    }

    const tokenPayload = JSON.parse(base64UrlToText(payload));

    if (tokenPayload.exp && tokenPayload.exp * 1000 < Date.now()) {
      return null;
    }

    return tokenPayload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  // Ambil token dari cookie browser
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Tentukan halaman mana saja yang WAJIB login
  const isProtectedRoute =
    pathname === '/' ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/picture') ||
    pathname.startsWith('/dashboard');

  const user = token ? await verifyToken(token) : null;

  // Jika mencoba akses halaman utama tapi TIDAK punya token valid, oper ke /login
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika SUDAH login tapi malah mencoba buka halaman /login, oper balik ke halaman utama
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware hanya berjalan di rute tertentu
export const config = {
  matcher: ['/', '/login', '/projects/:path*', '/picture/:path*', '/dashboard/:path*'],
};
