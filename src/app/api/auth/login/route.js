import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '@/lib/users';

const SECRET_KEY = 'kunci_rahasia_kelompok_kami';

export async function POST(req) {
  const { username, password } = await req.json();
  const user = await findUserByUsername(username);

  if (!user) {
    return NextResponse.json({ message: 'Gagal! Periksa kredensial' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Gagal! Periksa kredensial' }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  const response = NextResponse.json({
    message: 'Login Berhasil',
    user: {
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    },
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
