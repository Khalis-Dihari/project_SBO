import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'kunci_rahasia_kelompok_kami';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    return NextResponse.json({
      user: {
        username: payload.username,
        displayName: payload.displayName,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
