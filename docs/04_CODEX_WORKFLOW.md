# Round AI Codex Workflow

## Purpose

Codex should be treated as a junior developer, not as the project architect.

The project architecture is defined in the `docs/` folder. Codex must follow those documents.

## Safe Workflow

1. The human or ChatGPT writes a small feature prompt.
2. Codex implements only that feature.
3. The human reviews the change.
4. The app is run locally.
5. Errors are fixed one at a time.
6. The change is committed only when the acceptance test passes.

## Never Ask Codex To

Do not ask Codex to:

- Build the whole app
- Redesign the architecture
- Add AI features without a spec
- Add authentication early
- Change many unrelated files
- Rewrite the database without approval
- Add styling frameworks without approval
- Invent new tables without updating docs

## Every Codex Task Must Include

Each task prompt must include:

1. Goal
2. Context
3. Files allowed to edit
4. Exact requirements
5. Things not to change
6. Acceptance test

## Standard Prompt Template

```text
Project: Round AI alpha

Read first:
- docs/00_PROJECT_VISION.md
- docs/01_ARCHITECTURE.md
- docs/02_DATABASE.md
- docs/03_UI_GUIDELINES.md

Goal:
[Write one small task only]

Context:
[Explain why this task is needed]

Files allowed to edit:
[List exact files or folders]

Requirements:
1. [Requirement]
2. [Requirement]
3. [Requirement]

Do not change:
- [Boundary]
- [Boundary]

Acceptance test:
1. [Manual test]
2. [Manual test]
3. `npm run build` should pass if possible.
```

## Local Testing After Codex

After Codex changes code, run:

```bash
npm install
npm run dev
```

Then test the exact acceptance criteria.

If there is an error, do not ask Codex to fix everything blindly.

Copy the first error and fix it separately.

## Current First Priority

Before adding uploads or OCR, stabilize:

```text
Patient -> Encounter -> Document -> Manual Text
```

Only after that works should we build image upload.
