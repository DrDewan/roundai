create extension if not exists pgcrypto;

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  internal_patient_code text unique not null,
  hospital_patient_id text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists episodes (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  episode_code text unique not null,
  hospital_episode_id text,
  ward text,
  bed_number text,
  unit text,
  consultant text,
  admission_date date,
  discharge_date date,
  status text default 'admitted',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  episode_id uuid not null references episodes(id) on delete cascade,
  document_type text not null,
  document_date date,
  document_time time,
  title text,
  manual_text text,
  final_text text,
  status text default 'needs_text',
  ocr_status text default 'not_run',
  verification_status text default 'unverified',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists document_pages (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  page_number integer not null,
  image_url text not null,
  image_quality text default 'acceptable',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(document_id, page_number)
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

create table if not exists document_tags (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  created_at timestamptz default now(),
  unique(document_id, tag_id)
);

create table if not exists ocr_results (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  raw_ocr_text text,
  corrected_ocr_text text,
  ocr_engine text,
  confidence_score numeric,
  status text default 'not_run',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_patients_internal_code on patients(internal_patient_code);
create index if not exists idx_patients_hospital_id on patients(hospital_patient_id);
create index if not exists idx_episodes_patient_id on episodes(patient_id);
create index if not exists idx_documents_episode_id on documents(episode_id);
create index if not exists idx_document_pages_document_id on document_pages(document_id);
