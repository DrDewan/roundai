# Round AI Alpha

Round AI is a mobile-first clinical data capture system for converting paper-based ward records into structured, searchable clinical data.

## Alpha v0.1 Scope

This alpha focuses only on:

- Patient creation
- Encounter/admission creation
- Document creation
- Multi-page document image upload
- Manual text entry
- Optional OCR-ready structure
- Basic dashboard and search

It deliberately does **not** include AI diagnosis, treatment recommendation, billing, appointment systems, or full EMR features.

## Core Hierarchy

```text
Patient = the person
Encounter = one admission / visit / clinical encounter
Document = one logical clinical document
Page = one uploaded image/page belonging to that document
```

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Storage

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Supabase Setup

1. Create a Supabase project.
2. Create a storage bucket named `document-pages`.
3. Run the SQL file:

```text
supabase/schema.sql
```

4. Add your Supabase project credentials to `.env.local`.

## Development Principle

Build boring, fast, reliable data capture first. Structure, OCR, research exports, and AI extraction come later.
