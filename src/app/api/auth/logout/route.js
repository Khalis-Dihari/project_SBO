import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout berhasil' });
  
  // Hapus cookie token dengan mengatur masa berlakunya ke masa lalu
  response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
  
  return response;
}