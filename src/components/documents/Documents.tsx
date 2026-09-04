"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Download, File, FileSpreadsheet, FileText, FileType2, LoaderCircle, Plus, Search, Trash2, Upload, X } from "lucide-react";

interface DocumentRecord {
  id: string; document_id: string; workspace_id: string | null; title: string | null;
  file_name: string | null; file_url: string | null; file_size: number | null; created_at: string;
}
interface Workspace { id: string; workspace_name: string; }

function nameOf(document: DocumentRecord) { return document.file_name?.trim() || document.title?.trim() || "Untitled document"; }
function extensionOf(document: DocumentRecord) { return nameOf(document).split(".").pop()?.toLowerCase() || ""; }
function fileIcon(document: DocumentRecord) {
  switch (extensionOf(document)) {
    case "pdf": return FileText;
    case "doc": case "docx": return FileType2;
    case "xls": case "xlsx": case "csv": return FileSpreadsheet;
    default: return File;
  }
}
function fileColor(document: DocumentRecord) {
  switch (extensionOf(document)) {
    case "pdf": return "text-red-500";
    case "doc": case "docx": return "text-blue-500";
    case "xls": case "xlsx": case "csv": return "text-green-600";
    default: return "text-zinc-500";
  }
}
function formatSize(size: number | null) {
  if (!size) return "—";
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default function Documents() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [workspaceId, setWorkspaceId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true); setError("");
    try {
      const [documentsResponse, workspacesResponse] = await Promise.all([fetch("/api/documents", { cache: "no-store" }), fetch("/api/workspaces", { cache: "no-store" })]);
      const documentsResult = await documentsResponse.json();
      const workspacesResult = await workspacesResponse.json();
      if (!documentsResponse.ok || !documentsResult.success) throw new Error(documentsResult.message || "Failed to load documents");
      setDocuments(documentsResult.documents ?? []);
      if (workspacesResponse.ok && workspacesResult.success) {
        const items = workspacesResult.data ?? [];
        setWorkspaces(items);
        setWorkspaceId((current) => current || items[0]?.id || "");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to load documents");
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadData(); }, []);

  const visibleDocuments = useMemo(() => {
    const term = search.trim().toLowerCase();
    return documents.filter((document) => !term || nameOf(document).toLowerCase().includes(term));
  }, [documents, search]);

  async function uploadDocument(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    if (!workspaceId) { setError("Create a workspace before uploading a document."); return; }
    setUploading(true); setError("");
    try {
      const formData = new FormData();
      formData.append("file", file); formData.append("workspace_id", workspaceId);
      const response = await fetch("/api/documents", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to upload document");
      setDocuments((current) => [result.data, ...current]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to upload document");
    } finally { setUploading(false); }
  }

  async function deleteDocument(document: DocumentRecord) {
    if (!window.confirm(`Delete “${nameOf(document)}”? This cannot be undone.`)) return;
    setDeletingId(document.document_id); setError("");
    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(document.document_id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to delete document");
      setDocuments((current) => current.filter((item) => item.document_id !== document.document_id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to delete document");
    } finally { setDeletingId(null); }
  }

  return <div className="mx-auto max-w-[1500px] px-8 py-8">
    <input ref={fileInput} type="file" className="hidden" onChange={uploadDocument} />
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><h1 className="text-3xl font-bold tracking-tight text-zinc-900">Documents</h1><p className="mt-2 text-sm text-zinc-500">Upload, download, and manage documents across your workspaces.</p></div>
      <div className="flex flex-wrap items-center gap-3">
        <select value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200" aria-label="Upload workspace">
          {workspaces.length === 0 ? <option value="">No workspaces available</option> : workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.workspace_name}</option>)}
        </select>
        <button type="button" onClick={() => fileInput.current?.click()} disabled={uploading || !workspaceId} className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50">
          {uploading ? <LoaderCircle size={18} className="animate-spin" /> : <Plus size={18} />}{uploading ? "Uploading…" : "Upload document"}
        </button>
      </div>
    </div>
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <Search size={18} className="text-zinc-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search documents…" className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400" /><span className="whitespace-nowrap text-xs text-zinc-400">{visibleDocuments.length} document{visibleDocuments.length === 1 ? "" : "s"}</span>
    </div>
    {error && <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
    <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {loading ? <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-zinc-500"><LoaderCircle size={18} className="animate-spin" />Loading documents…</div> : visibleDocuments.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center text-center"><Upload size={28} className="text-zinc-300" /><p className="mt-3 font-medium text-zinc-700">No documents found</p><p className="mt-1 text-sm text-zinc-500">Choose a workspace and upload the first document.</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[760px]"><thead className="border-b bg-zinc-50 text-left text-xs font-medium text-zinc-500"><tr><th className="px-6 py-4">DOCUMENT</th><th className="px-6 py-4">WORKSPACE</th><th className="px-6 py-4">SIZE</th><th className="px-6 py-4">UPLOADED</th><th className="w-32 px-6 py-4 text-right">ACTIONS</th></tr></thead><tbody>{visibleDocuments.map((document) => { const Icon = fileIcon(document); const workspace = workspaces.find((item) => item.id === document.workspace_id); return <tr key={document.id} className="border-b last:border-0 hover:bg-zinc-50"><td className="px-6 py-4"><div className="flex items-center gap-3"><Icon size={21} className={fileColor(document)} /><div><p className="max-w-[340px] truncate font-medium text-zinc-900" title={nameOf(document)}>{nameOf(document)}</p><p className="mt-0.5 text-xs uppercase text-zinc-400">{extensionOf(document) || "file"}</p></div></div></td><td className="px-6 py-4 text-sm text-zinc-600">{workspace?.workspace_name || "—"}</td><td className="px-6 py-4 text-sm text-zinc-600">{formatSize(document.file_size)}</td><td className="px-6 py-4 text-sm text-zinc-600">{new Date(document.created_at).toLocaleDateString()}</td><td className="px-6 py-4"><div className="flex justify-end gap-2">{document.file_url && <a href={document.file_url} target="_blank" rel="noreferrer" className="rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-black" aria-label={`Download ${nameOf(document)}`}><Download size={17} /></a>}<button type="button" onClick={() => void deleteDocument(document)} disabled={deletingId === document.document_id} className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50" aria-label={`Delete ${nameOf(document)}`}>{deletingId === document.document_id ? <LoaderCircle size={17} className="animate-spin" /> : <Trash2 size={17} />}</button></div></td></tr>; })}</tbody></table></div>}
    </div>
  </div>;
}
