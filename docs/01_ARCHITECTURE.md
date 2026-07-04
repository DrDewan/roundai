# Round AI Architecture

## Current Alpha Stack

- Frontend: Next.js App Router with TypeScript
- Database: Supabase PostgreSQL
- Storage: Supabase Storage
- Auth: Disabled in alpha, added later
- OCR: Not active in first alpha, structure prepared for later

## Core Hierarchy

Round AI must follow this hierarchy:

```text
Patient
  -> Encounter
    -> Document
      -> Page
```

## Meaning of Each Level

### Patient

The patient is the person.

A patient may have multiple hospital admissions, outpatient follow-ups, emergency visits, or future encounters.

### Encounter

An encounter is one clinical episode.

Examples:

- One inpatient admission
- One emergency department visit
- One outpatient follow-up
- One ICU stay if modeled separately later

The term Encounter is preferred over Episode because it is broader and more future-proof.

### Document

A document is one logical clinical document.

Examples:

- Admission note
- Progress note
- Consultant round note
- Medication chart
- Investigation report
- Imaging report
- Discharge note

### Page

A page is one uploaded image belonging to a document.

A three-page medication chart should be one document with three pages, not three separate documents.

## Alpha Flow

```text
Create patient
Create encounter
Create document
Add page image or image URL
Enter manual text
Save final text
```

## Current Development Priority

Stabilize this flow before adding OCR, authentication, AI, or research modules.

## Architectural Rules

1. Do not build EMR features in alpha.
2. Do not build AI features before document capture is stable.
3. Do not add login until the single-user flow works.
4. Do not hard-code future research variables into the main patient table.
5. Keep the database normalized enough to support future research.
6. Keep the UI mobile-first and simple.
