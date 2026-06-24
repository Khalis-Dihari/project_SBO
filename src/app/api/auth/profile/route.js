import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUsers, saveUsers } from '@/lib/users';

const SECRET_KEY = 'kunci_rahasia_kelompok_kami';

function getTokenPayload(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

export async function PATCH(req) {
  const payload = getTokenPayload(req);

  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ message: 'Akses ditolak' }, { status: 403 });
  }

  const { displayName, currentPassword, newPassword } = await req.json();

  if (!displayName || displayName.trim().length < 3) {
    return NextResponse.json({ message: 'Nama tampilan minimal 3 karakter' }, { status: 400 });
  }

  if (newPassword && newPassword.length < 6) {
    return NextResponse.json({ message: 'Password baru minimal 6 karakter' }, { status: 400 });
  }

  const users = await getUsers();
  const adminIndex = users.findIndex((user) => user.username === payload.username && user.role === 'admin');

  if (adminIndex === -1) {
    return NextResponse.json({ message: 'Admin tidak ditemukan' }, { status: 404 });
  }

  const admin = users[adminIndex];

  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json({ message: 'Password saat ini wajib diisi' }, { status: 400 });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!isCurrentPasswordValid) {
      return NextResponse.json({ message: 'Password saat ini tidak sesuai' }, { status: 400 });
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  admin.displayName = displayName.trim();
  users[adminIndex] = admin;

  await saveUsers(users);

  const token = jwt.sign(
    {
      id: admin.id,
      username: admin.username,
      displayName: admin.displayName,
      role: admin.role,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  const response = NextResponse.json({
    message: 'Profil admin berhasil diperbarui',
    user: {
      username: admin.username,
      displayName: admin.displayName,
      role: admin.role,
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
