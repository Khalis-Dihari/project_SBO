"use client";

import { useEffect, useState } from "react";

export default function useEditableContent() {
  const [content, setContent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [contentResponse, userResponse] = await Promise.all([
        fetch("/api/content", { cache: "no-store" }),
        fetch("/api/auth/me", { cache: "no-store" }),
      ]);

      const contentData = await contentResponse.json();
      setContent(contentData);

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setCurrentUser(userData.user);
      }
    };

    loadData();
  }, []);

  const saveSection = async (section, value) => {
    setSaving(true);

    try {
      const response = await fetch("/api/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, value }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Konten gagal disimpan");
      }

      setContent(data.content);
      return data.content;
    } finally {
      setSaving(false);
    }
  };

  return {
    content,
    setContent,
    currentUser,
    isAdmin: currentUser?.role === "admin",
    saving,
    saveSection,
  };
}
