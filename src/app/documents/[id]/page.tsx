"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [doc, setDoc] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => { params.then((p) => setId(p.id)); }, [params]);
  useEffect(() => {
    if (!id) return;
    async function load() {
      const d = await supabase.from("documents").select("*").eq("id", id).single();
      setDoc(d.data);
      setText(d.data?.final_text || "");
      const p = await supabase.from("document_pages").select("*").eq("document_id", id).order("page_number");
      setPages(p.data || []);
    }
    load();
  }, [id]);

  async function saveText() {
    const { error } = await supabase.from("documents").update({ final_text: text, manual_text: text, status: "text_entered" }).eq("id", id);
    if (error) alert(error.message); else alert("Saved");
  }

  async function addPage() {
    const pageNumber = pages.length + 1;
    const { error } = await supabase.from("document_pages").insert({ document_id: id, page_number: pageNumber, image_url: url });
    if (error) alert(error.message); else window.location.reload();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{doc?.document_type || "Document"}</h1>
      <h2>Pages</h2>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL for now" />
      <br /><br />
      <button onClick={addPage}>Add Page</button>
      {pages.map((p) => <p key={p.id}>Page {p.page_number}: <a href={p.image_url}>Open image</a></p>)}
      <h2>Final Text</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} />
      <br /><br />
      <button onClick={saveText}>Save Text</button>
    </main>
  );
}
