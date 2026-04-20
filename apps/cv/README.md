# CV Portfolio App

A React-based interactive CV editor and viewer. Authenticated users can edit their CV content through a split-panel interface, manage multiple CV presets (e.g. tailored for specific companies), and export to PDF. Unauthenticated users are redirected to a static PDF fallback.

Data is stored per-section in the Cockpit API Redis store (`base:cv:{section}`, `{preset}:cv:{section}`).

## Features

- **Split-panel editor** — live preview alongside editable sections (header, summary, skills, achievements, experience, education, projects, courses)
- **CV presets** — create named variants (e.g. "Google", "Netflix") that inherit from base and only store sections you explicitly override
- **Preset dropdown** — switch between presets with unsaved-change warnings; selected preset reflected in `?preset=` URL param
- **PDF export** — prints current preset as `{preset-id}-cv.pdf` via `react-to-print`
- **Authentication gate** — redirects unauthenticated users to `parda.me/cv.pdf`

## Preset inheritance model

- `base` is the source of truth for all sections
- A preset only stores sections explicitly edited in that preset (`{preset}:cv:{section}`)
- Unoverridden sections fall back to `base:cv:{section}` at fetch time
- Saving base invalidates all preset caches so inherited sections update immediately
- Creating a new preset from base starts empty (inherits everything); creating from another preset copies only that preset's explicit overrides

## Project structure

```
apps/cv/src/
├── app/
│   ├── app.tsx                     # Auth gate + routing
│   └── skeleton.tsx                # Loading state
├── components/
│   ├── editor/
│   │   ├── CVEditor.tsx            # Main container — wires hooks + dialogs
│   │   ├── CVEditorPanel.tsx       # Tabbed section editors + preset dropdown
│   │   ├── CVPreview.tsx           # Live preview + PDF export
│   │   └── sections/               # Per-section form editors
│   ├── cv/                         # CV display components (Header, Skills, etc.)
│   ├── PresetDropdown.tsx          # Preset switcher UI
│   ├── NewPresetModal.tsx          # Create preset modal
│   └── UnsavedChangesDialog.tsx    # Discard-changes confirmation
├── hooks/
│   ├── useCVData.ts                # Fetch/save CV sections with inheritance + dirty tracking
│   └── usePresets.ts               # Preset registry, URL sync, create/archive
├── services/
│   ├── cvStoreApi.ts               # base:cv:* CRUD (prefix-parameterised)
│   └── presetApi.ts                # Preset section CRUD + registry + clone
├── types/
│   ├── cv.types.ts                 # CVData, Skill, Experience, etc.
│   └── preset.types.ts             # Preset, PresetRegistry, CV_SECTIONS, SectionKey
├── utils/
│   └── slug.ts                     # generateSlug / generateUniqueSlug
└── data/
    └── cvData.ts                   # Default fallback data (used when Redis is empty)
```

## Redis key conventions

| Key | Content |
|-----|---------|
| `base:cv:{section}` | Base CV section data |
| `{preset-id}:cv:{section}` | Preset override for a section |
| `registry:cv:presets` | `Preset[]` — preset list (archived presets included, filtered client-side) |

Seed `registry:cv:presets` with `[]` on first run if the key doesn't exist.

## Development

```bash
nx serve cv        # Start dev server
nx build cv        # Production build
nx typecheck cv    # Type check
nx lint cv         # Lint
```
