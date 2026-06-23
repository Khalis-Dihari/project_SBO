"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PictureGallery from "@/components/PictureGallery";
import PicturesEditor from "@/components/PicturesEditor";
import useEditableContent from "@/lib/useEditableContent";

function GalleryContent() {
  const searchParams = useSearchParams();
  const kategoriUrl = searchParams.get("kegiatan");
  const { content, setContent, isAdmin, saving, saveSection } = useEditableContent();

  if (!content) {
    return <div className="text-slate-400 font-mono text-sm pt-12">Loading Gallery...</div>;
  }

  const updatePictures = (pictures) => {
    setContent({ ...content, pictures });
  };

  return (
    <div className="w-full max-w-4xl relative z-10">
      {isAdmin && (
        <div className="mb-10">
          <PicturesEditor
            pictures={content.pictures}
            onChange={updatePictures}
            onSave={() => saveSection("pictures", content.pictures)}
            saving={saving}
          />
        </div>
      )}

      <PictureGallery pictures={content.pictures} category={kategoriUrl} />
    </div>
  );
}

export default function PicturePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-16 px-6 flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-linear-to-b from-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-slate-400 font-mono text-sm pt-12">Loading Gallery...</div>}>
        <GalleryContent />
      </Suspense>
    </main>
  );
}
