# Codex Task 001: Rename Episodes to Encounters

Project: Round AI alpha

Read first:

- docs/00_PROJECT_VISION.md
- docs/01_ARCHITECTURE.md
- docs/02_DATABASE.md
- docs/03_UI_GUIDELINES.md
- docs/04_CODEX_WORKFLOW.md

## Goal

Rename the data model from `episodes` to `encounters`.

## Context

The original starter used Patient -> Episode -> Document -> Page.

The project source of truth now uses Patient -> Encounter -> Document -> Page.

Encounter is broader and supports inpatient admissions, outpatient visits, emergency visits, and future clinical episodes.

## Files Allowed To Edit

- supabase/schema.sql
- README.md
- src/app/patients/[id]/page.tsx
- src/app/episodes/[id]/page.tsx
- Any route folder/files needed to move from `/episodes/[id]` to `/encounters/[id]`

## Requirements

1. Rename database table `episodes` to `encounters`.
2. Rename `episode_code` to `encounter_code`.
3. Rename `hospital_episode_id` to `hospital_encounter_id`.
4. Update `documents` so it references `encounter_id` instead of `episode_id`.
5. Update frontend route from `/episodes/[id]` to `/encounters/[id]`.
6. Update visible labels from Episode to Encounter.
7. Make sure a patient can create an encounter.
8. Make sure a document can be created under an encounter.

## Do Not Change

- Do not add authentication.
- Do not add OCR.
- Do not add image upload yet.
- Do not redesign the UI.
- Do not add new unrelated tables.

## Acceptance Test

1. Supabase schema runs without error on a new Supabase project.
2. The app runs locally with `npm run dev`.
3. A record can be created at `/patients/new`.
4. The patient detail page allows creating an encounter.
5. The encounter opens at `/encounters/[id]`.
6. A document can be created under that encounter.
7. No visible route should still require `/episodes/[id]`.
