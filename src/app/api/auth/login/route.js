import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'kunci_rahasia_kelompok_kami';

export async function POST(req) {
  const { username, password } = await req.json();

  // Contoh simpel: username & password adalah 'admin'
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    
    const response = NextResponse.json({ message: 'Login Berhasil' });
    // Set cookie agar token tersimpan di browser
    response.cookies.set('token', token, { httpOnly: true });
    
    return response;
  }

  return NextResponse.json({ message: 'Gagal! Periksa kredensial' }, { status: 401 });
}