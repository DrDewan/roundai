# Round AI Roadmap

## Phase Alpha 0.1

Goal: prove the basic data capture flow.

Build:

- Patient creation
- Patient list
- Patient detail
- Encounter creation
- Encounter timeline
- Document creation
- Manual text entry
- Document pages by image URL or simple upload

Do not build:

- Login
- OCR
- AI
- Research variables
- Advanced analytics

## Phase Alpha 0.2

Goal: make document image upload usable on phone.

Build:

- Supabase Storage bucket integration
- Upload image from phone camera/gallery
- Add multiple pages to one document
- Automatic page numbering
- Basic image preview
- Replace page
- Mark image quality

## Phase Alpha 0.3

Goal: add OCR as optional assistant.

Build:

- Run OCR button
- Store raw OCR text
- OCR review screen
- Correct OCR text
- Use OCR as final text
- Mark OCR skipped

## Phase Alpha 0.4

Goal: improve organization.

Build:

- Tags
- Search by patient code, hospital ID, ward, bed, consultant, document type, status, date
- Better dashboard counts

## Phase Beta 1

Goal: multi-user clinical data capture.

Build:

- Supabase Auth
- User roles
- Audit logs
- Upload ownership
- Review ownership

## Phase Beta 2

Goal: research data extraction.

Build:

- Dynamic research fields
- Field types and validation
- Research values linked to source documents
- Missing data tracker
- CSV export

## Phase Later

Goal: AI-assisted structuring.

Build:

- AI document classification
- AI extraction of medicines
- AI extraction of labs
- AI extraction of diagnoses
- Cohort builder
- Research export dashboard
