"use client";

import { AddButton, AdminPanel, DeleteButton, SaveButton, TextArea, TextInput } from "./AdminEditors";

export default function ProjectsEditor({ projects, onChange, onSave, saving }) {
  const updateProject = (index, field, value) => {
    onChange(projects.map((project, projectIndex) =>
      projectIndex === index ? { ...project, [field]: value } : project
    ));
  };

  const addProject = () => {
    const nextId = Math.max(0, ...projects.map((project) => project.id || 0)) + 1;

    onChange([
      ...projects,
      {
        id: nextId,
        title: "Project Baru",
        desc: "Deskripsi project baru.",
        category: "Kategori",
        tech: ["Tech"],
        image: "",
      },
    ]);
  };

  const deleteProject = (index) => {
    onChange(projects.filter((_, projectIndex) => projectIndex !== index));
  };

  return (
    <AdminPanel title="Kelola Konten Projects">
      <div className="space-y-4">
        <AddButton onClick={addProject} label="Tambah Project" />

        {projects.map((project, index) => (
          <div key={project.id || index} className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <TextInput label="Judul" value={project.title} onChange={(value) => updateProject(index, "title", value)} />
              <TextInput label="Kategori" value={project.category} onChange={(value) => updateProject(index, "category", value)} />
              <TextInput label="Path Gambar" value={project.image} onChange={(value) => updateProject(index, "image", value)} placeholder="/project.jpg" />
              <TextInput
                label="Tech Stack (pisahkan koma)"
                value={project.tech.join(", ")}
                onChange={(value) =>
                  updateProject(
                    index,
                    "tech",
                    value.split(",").map((item) => item.trim()).filter(Boolean)
                  )
                }
              />
            </div>
            <TextArea label="Deskripsi" value={project.desc} onChange={(value) => updateProject(index, "desc", value)} />
            <DeleteButton onClick={() => deleteProject(index)} />
          </div>
        ))}

        <SaveButton onClick={onSave} disabled={saving} />
      </div>
    </AdminPanel>
  );
}
