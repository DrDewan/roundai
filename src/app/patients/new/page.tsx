"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewPatientPage() {
  const [code, setCode] = useState("");
  const [hospital, setHospital] = useState("");

  async function save() {
    const finalCode = code || `RAI-${Date.now()}`;
    const { data, error } = await supabase.from("patients").insert({
      internal_patient_code: finalCode,
      hospital_patient_id: hospital || null
    }).select("id").single();
    if (error) alert(error.message);
    if (data) window.location.href = `/patients/${data.id}`;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Create Record</h1>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Round AI code" />
      <br /><br />
      <input value={hospital} onChange={(e) => setHospital(e.target.value)} placeholder="Hospital ID" />
      <br /><br />
      <button onClick={save}>Save</button>
    </main>
  );
}
