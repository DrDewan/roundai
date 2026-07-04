"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Row = {
  id: string;
  internal_patient_code: string;
  hospital_patient_id: string | null;
  created_at: string;
};

export default function PatientsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRows() {
      const { data } = await supabase
        .from("patients")
        .select("id, internal_patient_code, hospital_patient_id, created_at")
        .order("created_at", { ascending: false });
      setRows(data || []);
      setLoading(false);
    }
    loadRows();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Records</h1>
      <p><a href="/patients/new">Create new record</a></p>
      {loading ? <p>Loading...</p> : null}
      <div style={{ display: "grid", gap: 12 }}>
        {rows.map((row) => (
          <a key={row.id} href={`/patients/${row.id}`} style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #ddd" }}>
            <strong>{row.internal_patient_code}</strong>
            <div>Hospital ID: {row.hospital_patient_id || "Not added"}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
