"use client";

import { Plus, Save, Trash2 } from "lucide-react";

export function AdminPanel({ title, children }) {
  return (
    <div className="mt-6 rounded-2xl border border-teal-500/20 bg-slate-900/60 p-4 text-left shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-teal-300">{title}</h3>
        <span className="rounded-full border border-teal-500/20 px-2 py-1 text-[10px] font-mono text-teal-400">
          ADMIN
        </span>
      </div>
      {children}
    </div>
  );
}

export function TextInput({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none transition-colors focus:border-teal-500"
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <textarea
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none transition-colors focus:border-teal-500"
      />
    </label>
  );
}

export function SaveButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-teal-400 disabled:opacity-50"
    >
      <Save size={15} />
      Simpan
    </button>
  );
}

export function AddButton({ onClick, label = "Tambah" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-teal-500/50 hover:text-teal-300"
    >
      <Plus size={14} />
      {label}
    </button>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
    >
      <Trash2 size={14} />
      Hapus
    </button>
  );
}
