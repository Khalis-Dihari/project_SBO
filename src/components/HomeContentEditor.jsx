"use client";

import { AddButton, AdminPanel, DeleteButton, SaveButton, TextArea, TextInput } from "./AdminEditors";

export default function HomeContentEditor({ home, onChange, onSave, saving }) {
  const updateProfile = (field, value) => {
    onChange({
      ...home,
      profile: { ...home.profile, [field]: value },
    });
  };

  const updateAbout = (field, value) => {
    onChange({
      ...home,
      about: { ...home.about, [field]: value },
    });
  };

  const updateLocation = (field, value) => {
    onChange({
      ...home,
      location: { ...home.location, [field]: value },
    });
  };

  const updateActivity = (index, field, value) => {
    const activities = home.activities.map((activity, activityIndex) =>
      activityIndex === index ? { ...activity, [field]: value } : activity
    );

    onChange({ ...home, activities });
  };

  const addActivity = () => {
    const nextId = Math.max(0, ...home.activities.map((activity) => activity.id || 0)) + 1;

    onChange({
      ...home,
      activities: [
        ...home.activities,
        {
          id: nextId,
          title: "Kegiatan Baru",
          date: "Tanggal kegiatan",
          image: "",
          slug: `kegiatan-${nextId}`,
        },
      ],
    });
  };

  const deleteActivity = (index) => {
    onChange({
      ...home,
      activities: home.activities.filter((_, activityIndex) => activityIndex !== index),
    });
  };

  return (
    <AdminPanel title="Kelola Konten Home">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <TextInput label="Nama Profil" value={home.profile.name} onChange={(value) => updateProfile("name", value)} />
          <TextInput label="Role Profil" value={home.profile.role} onChange={(value) => updateProfile("role", value)} />
          <TextInput label="NIM" value={home.profile.nim} onChange={(value) => updateProfile("nim", value)} />
          <TextInput label="Foto Profil" value={home.profile.photo} onChange={(value) => updateProfile("photo", value)} placeholder="/jason.jpg" />
        </div>

        <div className="space-y-3">
          <TextInput label="Judul About" value={home.about.title} onChange={(value) => updateAbout("title", value)} />
          <TextArea
            label="Paragraf About (pisahkan paragraf dengan baris baru)"
            value={home.about.paragraphs.join("\n")}
            onChange={(value) =>
              updateAbout(
                "paragraphs",
                value.split("\n").map((item) => item.trim()).filter(Boolean)
              )
            }
          />
        </div>

        <div className="space-y-3">
          <TextInput label="Judul Lokasi" value={home.location.title} onChange={(value) => updateLocation("title", value)} />
          <TextArea label="Deskripsi Lokasi" value={home.location.description} onChange={(value) => updateLocation("description", value)} />
          <TextInput label="Nama Tempat" value={home.location.place} onChange={(value) => updateLocation("place", value)} />
          <TextArea label="Alamat" value={home.location.address} onChange={(value) => updateLocation("address", value)} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-slate-200">Activities</h4>
            <AddButton onClick={addActivity} label="Tambah Activity" />
          </div>

          {home.activities.map((activity, index) => (
            <div key={activity.id || index} className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <TextInput label="Judul" value={activity.title} onChange={(value) => updateActivity(index, "title", value)} />
                <TextInput label="Tanggal" value={activity.date} onChange={(value) => updateActivity(index, "date", value)} />
                <TextInput label="Slug Filter" value={activity.slug} onChange={(value) => updateActivity(index, "slug", value)} />
                <TextInput label="Path Gambar" value={activity.image} onChange={(value) => updateActivity(index, "image", value)} placeholder="/foto-1.jpg" />
              </div>
              <DeleteButton onClick={() => deleteActivity(index)} />
            </div>
          ))}
        </div>

        <SaveButton onClick={onSave} disabled={saving} />
      </div>
    </AdminPanel>
  );
}
