import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getContent, saveContentSection } from "@/lib/content";

const SECRET_KEY = "kunci_rahasia_kelompok_kami";

function getTokenPayload(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

export async function GET() {
  const content = await getContent();

  return NextResponse.json(content);
}

export async function PATCH(req) {
  const payload = getTokenPayload(req);

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const { section, value } = await req.json();
  const editableSections = ["home", "projects", "pictures"];

  if (!editableSections.includes(section)) {
    return NextResponse.json({ message: "Section tidak bisa diedit" }, { status: 400 });
  }

  const content = await saveContentSection(section, value);

  return NextResponse.json({
    message: "Konten berhasil disimpan",
    content,
  });
}
