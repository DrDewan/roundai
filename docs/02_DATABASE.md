# Round AI Database Source of Truth

## Current Alpha Tables

The alpha database should contain these tables:

- patients
- encounters
- documents
- document_pages
- tags
- document_tags
- ocr_results

If the current code or schema still uses `episodes`, it should be renamed to `encounters` before further feature development.

## Table Responsibilities

### patients

Stores the long-term patient identity.

Fields:

- id
- internal_patient_code
- hospital_patient_id
- notes
- created_at
- updated_at

Rules:

- internal_patient_code is Round AI's own ID.
- hospital_patient_id stores the hospital's own patient ID when available.
- Avoid direct identifiers such as name, phone number, NID, and address in alpha unless formal approval exists.

### encounters

Stores one clinical episode or visit.

Fields:

- id
- patient_id
- encounter_code
- hospital_encounter_id
- ward
- bed_number
- unit
- consultant
- admission_date
- discharge_date
- status
- notes
- created_at
- updated_at

Status options:

- admitted
- discharged
- transferred
- expired
- unknown

### documents

Stores one logical clinical document.

Fields:

- id
- encounter_id
- document_type
- document_date
- document_time
- title
- manual_text
- final_text
- status
- ocr_status
- verification_status
- created_at
- updated_at

Document status options:

- needs_text
- text_entered
- ocr_pending
- ocr_complete
- ocr_corrected
- verified
- needs_retake
- duplicate

OCR status options:

- not_run
- pending
- complete
- corrected
- skipped
- failed

Verification status options:

- unverified
- reviewed
- verified

### document_pages

Stores uploaded page images.

Fields:

- id
- document_id
- page_number
- image_url
- image_quality
- created_at
- updated_at

Rules:

- Use simple page numbers only.
- Do not use front/back/continuation labels in alpha.
- Page number must be unique within each document.

Image quality options:

- excellent
- acceptable
- poor
- unreadable

### tags

Stores reusable tags.

Fields:

- id
- name
- created_at

### document_tags

Joins documents to tags.

Fields:

- id
- document_id
- tag_id
- created_at

### ocr_results

Stores OCR output if OCR is used.

Fields:

- id
- document_id
- raw_ocr_text
- corrected_ocr_text
- ocr_engine
- confidence_score
- status
- created_at
- updated_at

## Important Data Rule

Manual text and final text are valid even if OCR is never run.

OCR is an assistant, not the source of truth.

## Future Research Data

Do not add every research variable as a column in patients or encounters.

Later we will add dynamic research tables such as:

- research_fields
- research_values
- studies
- study_variables

Those are not part of alpha.
