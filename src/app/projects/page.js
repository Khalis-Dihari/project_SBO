'use client';

import ProjectsEditor from '@/components/ProjectsEditor';
import ProjectsSection from '@/components/ProjectsSection';
import useEditableContent from '@/lib/useEditableContent';

export default function ProjectsPage() {
  const { content, setContent, isAdmin, saving, saveSection } = useEditableContent();

  if (!content) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-400 pt-32 px-6 pb-12">
        Memuat konten...
      </main>
    );
  }

  const updateProjects = (projects) => {
    setContent({ ...content, projects });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto z-10 relative">
        {isAdmin && (
          <div className="mb-10">
            <ProjectsEditor
              projects={content.projects}
              onChange={updateProjects}
              onSave={() => saveSection('projects', content.projects)}
              saving={saving}
            />
          </div>
        )}

        <ProjectsSection projects={content.projects} />
      </div>
    </main>
  );
}
