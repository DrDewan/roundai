"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [row, setRow] = useState<any>(null);
  const [encounters, setEncounters] = useState<any[]>([]);
  const [ward, setWard] = useState("");
  const [bed, setBed] = useState("");
  const [consultant, setConsultant] = useState("");

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const patientRes = await supabase.from("patients").select("*").eq("id", id).single();
      setRow(patientRes.data);
      const encounterRes = await supabase.from("encounters").select("*").eq("patient_id", id).order("created_at", { ascending: false });
      setEncounters(encounterRes.data || []);
    }
    load();
  }, [id]);

  async function addEncounter() {
    const encounterCode = `ENC-${Date.now()}`;
    const { error } = await supabase.from("encounters").insert({
      patient_id: id,
      encounter_code: encounterCode,
      ward: ward || null,
      bed_number: bed || null,
      consultant: consultant || null,
      admission_date: new Date().toISOString().slice(0, 10),
      status: "admitted"
    });
    if (error) alert(error.message);
    window.location.reload();
  }

  return (
    <main style={{ padding: 24 }}>
      <p><a href="/patients">Back</a></p>
      <h1>{row?.internal_patient_code || "Record"}</h1>
      <p>Hospital ID: {row?.hospital_patient_id || "Not added"}</p>
      <h2>Add Encounter</h2>
      <input value={ward} onChange={(e) => setWard(e.target.value)} placeholder="Ward" />
      <br /><br />
      <input value={bed} onChange={(e) => setBed(e.target.value)} placeholder="Bed" />
      <br /><br />
      <input value={consultant} onChange={(e) => setConsultant(e.target.value)} placeholder="Consultant" />
      <br /><br />
      <button onClick={addEncounter}>Add Encounter</button>
      <h2>Encounters</h2>
      {encounters.map((e) => (
        <p key={e.id}><a href={`/encounters/${e.id}`}>{e.encounter_code} — {e.ward || "Ward not set"} — {e.status}</a></p>
      ))}
    </main>
  );
}
