# Round AI UI Guidelines

## Design Principle

The interface should be mobile-first, fast, and boring.

The user may be standing in a ward, using an Android phone browser, under time pressure, with poor lighting and weak internet.

Do not design an EMR-style interface.

## UI Priorities

1. Large buttons
2. Minimal typing
3. Simple forms
4. Fast save flow
5. Clear hierarchy
6. Searchable records
7. Mobile-friendly pages

## Main Pages

### Dashboard

Shows basic capture status:

- Total patients
- Active encounters
- Documents needing text
- OCR pending
- Unreadable images

### Patient List

Shows:

- Round AI patient code
- Hospital patient ID
- Latest ward if available
- Latest bed if available
- Last updated

### Patient Detail

Shows:

- Patient code
- Hospital patient ID
- Encounters in reverse chronological order
- Add encounter form

### Encounter Timeline

Shows all documents within one encounter.

Each document card should show:

- Document type
- Date/time
- Page count
- Text status
- OCR status
- Verification status

### Document Detail

Shows:

- Document metadata
- Pages/images
- Manual text
- Final text
- OCR text later

## Mobile Rules

- Inputs should be large enough to tap easily.
- Avoid dense tables on mobile.
- Prefer cards over complex grids.
- Do not require many dropdowns during the capture flow.
- Save buttons should be clear and obvious.

## Alpha Styling Rule

Do not spend time making the app beautiful yet.

The alpha should be usable before it is polished.

## Forbidden in Alpha UI

Do not add:

- AI diagnosis panels
- Medication recommendation screens
- Complex analytics charts
- Billing pages
- Appointment pages
- Hospital admin dashboards
