"use client";

import { AddButton, AdminPanel, DeleteButton, SaveButton, TextInput } from "./AdminEditors";

export default function PicturesEditor({ pictures, onChange, onSave, saving }) {
  const updatePicture = (index, field, value) => {
    onChange(pictures.map((picture, pictureIndex) =>
      pictureIndex === index ? { ...picture, [field]: value } : picture
    ));
  };

  const addPicture = () => {
    const nextId = Math.max(0, ...pictures.map((picture) => picture.id || 0)) + 1;

    onChange([
      ...pictures,
      {
        id: nextId,
        title: "Foto Baru",
        url: "/foto-1.jpg",
        size: "col-span-1",
        category: "makrab",
      },
    ]);
  };

  const deletePicture = (index) => {
    onChange(pictures.filter((_, pictureIndex) => pictureIndex !== index));
  };

  return (
    <AdminPanel title="Kelola Konten Gallery">
      <div className="space-y-4">
        <AddButton onClick={addPicture} label="Tambah Foto" />

        {pictures.map((picture, index) => (
          <div key={picture.id || index} className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <TextInput label="Judul" value={picture.title} onChange={(value) => updatePicture(index, "title", value)} />
              <TextInput label="URL / Path Foto" value={picture.url} onChange={(value) => updatePicture(index, "url", value)} />
              <TextInput label="Kategori" value={picture.category} onChange={(value) => updatePicture(index, "category", value)} placeholder="makrab" />
              <TextInput label="Ukuran Grid" value={picture.size} onChange={(value) => updatePicture(index, "size", value)} placeholder="col-span-1" />
            </div>
            <DeleteButton onClick={() => deletePicture(index)} />
          </div>
        ))}

        <SaveButton onClick={onSave} disabled={saving} />
      </div>
    </AdminPanel>
  );
}
