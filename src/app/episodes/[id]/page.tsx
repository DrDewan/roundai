"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [docs, setDocs] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => { params.then((p) => setId(p.id)); }, [params]);
  useEffect(() => {
    if (!id) return;
    supabase.from("documents").select("*").eq("episode_id", id).order("created_at", { ascending: false }).then((res) => setDocs(res.data || []));
  }, [id]);

  async function addDoc() {
    const { data, error } = await supabase.from("documents").insert({
      episode_id: id,
      document_type: "Progress note",
      document_date: new Date().toISOString().slice(0, 10),
      manual_text: text || null,
      final_text: text || null,
      status: text ? "text_entered" : "needs_text"
    }).select("id").single();
    if (error) alert(error.message);
    if (data) window.location.href = `/documents/${data.id}`;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Episode</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Manual text" rows={6} />
      <br /><br />
      <button onClick={addDoc}>Save Document</button>
      <h2>Documents</h2>
      {docs.map((d) => <p key={d.id}><a href={`/documents/${d.id}`}>{d.document_type} - {d.status}</a></p>)}
    </main>
  );
}
