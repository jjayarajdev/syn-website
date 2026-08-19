# Syntegreti Design Guide

**Editorial system — warm paper · ink · forest green · heritage accents**
Extracted from syntegreti.com (feature/editorial-design). Use this for presentations, documents, social assets and any other collateral so everything reads as one brand.

---

## 1. Design philosophy

The system is **editorial** — it borrows from print, not from tech dashboards. Five rules carry it:

1. **Paper and ink do the talking.** Warm off-white ground, near-black text. Color is scarce and always means something.
2. **One brand color.** Forest green is "us" — CTAs, highlights, identity. Everything else is a supporting role.
3. **Semantic color.** A color never decorates; it signals. Gold = a measured fact. Rust = a problem. Slate = machinery/code.
4. **Hairlines, not shadows.** Structure comes from 1px rules and flat panels. No drop shadows, no glows, no gradients, no glass.
5. **Sharp corners everywhere.** Zero border radius, on everything — cards, buttons, chips, images.

---

## 2. Color

### Ground (backgrounds)

| Role | Hex | Use |
|---|---|---|
| Paper | `#EFECE4` | Page / slide background |
| Recessed | `#EAE6DD` | Slightly sunken panels |
| Surface | `#E6E2D8` | Cards, zebra table rows |
| Elevated | `#DED9CD` | Deeper panels, chips |
| Rule | `#CCC7BA` | 1px hairline borders and dividers |
| Rule (strong) | `#B2AC9D` | Emphasized/hover rules |

### Text (ink)

| Role | Hex | Use |
|---|---|---|
| Ink | `#0A0908` | Headlines, primary text |
| Secondary | `#4A4741` | Body copy, descriptions |
| Muted | `#67635A` | Captions, labels, metadata |

### Brand + semantic accents

| Name | Hex | Meaning — use it ONLY for this |
|---|---|---|
| **Forest** | `#0A250A` | The brand color. CTAs, italic highlight words, links, identity marks. "Us." |
| Forest (hover) | `#144A1E` | Interactive hover/active states of forest elements |
| Sage | `#77896F` | Tint family of forest — chip fills, secondary green labels |
| **Brass** | `#9C7A2F` | Measured metrics, proof, status badges ("In production"). "A real number." |
| **Terracotta** | `#A34A2A` | Problems, warnings, ✕ marks, "the challenge." "The pain we fix." |
| **Slate** | `#3E4A52` | Code, terminals, technical metadata. "The machinery." |

**The discipline:** ink carries ~90% of any page or slide. Forest appears a handful of times. Brass/terracotta/slate appear only when their meaning applies — if a slide has no measured number, it has no brass.

### Chart / data-viz order

When a chart needs a series palette, use in this order:
`#0A250A` forest → `#9C7A2F` brass → `#3E4A52` slate → `#A34A2A` terracotta → `#77896F` sage.
Gridlines: `#CCC7BA` at 1px. Chart background: paper, never white.

---

## 3. Typography

| Family | Role | Where to get it | PPT-safe fallback |
|---|---|---|---|
| **Fraunces** | Display — headlines, pull quotes, big numbers | Google Fonts (free) | Georgia |
| **DM Sans** | Body — all running text, UI, labels | Google Fonts (free) | Segoe UI / Calibri |
| **DM Mono** | Micro-labels — overlines, tags, metadata | Google Fonts (free) | Consolas / Courier New |

### Display rules (Fraunces)

- Weights: **Black (900)** for headlines, Light (300) italic for oversized ordinals/roman numerals.
- Tight tracking: **−3% to −4%** letter-spacing on anything large.
- Tight leading: **0.9–0.95** line-height on display sizes.
- **The signature move:** one or two words per headline set in *italic*, colored forest. Never more.
  - e.g. Lean team. **Big AI.** *Proven* in 4 weeks.

### Body rules (DM Sans)

- Body 15–18px equivalent, line-height 1.6–1.7, color Secondary `#4A4741`.
- Weights: 400 regular, 500–600 for emphasis and buttons. Avoid bold walls.

### Micro-label rules (DM Mono)

- ALL CAPS, letter-spacing +12% to +14%, small (10–13px equivalent), color Muted.
- The website styles section overlines as code comments: `// section_name`. Reuse this in decks as slide kickers.

### Type scale (web reference)

13 / 15 / 18 / 20 / 22 / 26 / 32 px for text sizes; display sizes 36 / 48 / 60 / 72 px. In PPT: body ≈ 16–18pt, section headers ≈ 28–32pt, slide titles ≈ 40–54pt Fraunces Black.

---

## 4. Space, structure, shape

- **Base-4 spacing**: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64. Between major sections: 48–64px (web), generous margins in decks.
- **Hairline rules**: 1px `#CCC7BA` dividers structure the page — under headers, between list rows, around panels. This replaces shadows entirely.
- **Sharp corners**: border-radius 0 on every element. No pills, no rounded cards.
- **No effects**: no drop shadows, no gradients, no glassmorphism, no glow.
- **Dot grid** (optional texture): 1px dots of the rule color on a 32px grid, very faint — for hero/section backgrounds.
- **Max content width**: 1280px (web); decks use wide margins, content never edge-to-edge.

---

## 5. Graphic language

- **No emojis, no icon sets.** Structure and typography differentiate content, not pictograms.
- **Functional glyphs only**: ✓ (works/after), ✕ in terracotta (problem/before), ⚠ in brass (caution), → for links/actions.
- **Numbered lists as design**: oversized ordinals (01, 02… or I, II, III) in Fraunces Light italic, rule-colored or muted.
- **Terminal/code panels**: flat dark-on-paper panels with the three window dots (terracotta/brass/forest at 60%), DM Mono text, slate for output, forest for prompts/success lines.
- **Status badges**: hairline border + tinted fill + colored text, all sharp-cornered, DM Mono caps. "In production"/"In delivery"/metrics = brass; "In development" = terracotta; identity tags = forest.

---

## 6. Components (reference styles)

**Primary button** — solid forest `#0A250A`, paper text, sharp corners, 14–18px padding block; hover → `#144A1E`. (On dark panels: solid paper button, ink text.)
**Secondary button** — transparent, 1px hairline border, ink text; hover darkens border to ink.
**Card** — paper background, 1px rule border, sharp corners; hover: border darkens to ink. Content: mono overline → Fraunces heading → DM Sans body → hairline-separated footer row.
**Chip/tag** — 1px hairline border or 10% tint fill, DM Mono caps, 12–13px.
**Table** — hairline row separators, zebra with Surface `#E6E2D8`, header row in DM Mono caps muted.

---

## 7. Logo

The wordmark is an **embedded-S lockup**: the interlocking S mark (forest / brass / slate strokes) *is* the capital S of the word, leaning tightly into the "y" — followed by live text "yntegreti".

**Recipe** (reproduce anywhere, any size):
- Mark: `src/assets/syntegreti-mark-editorial.png` (transparent PNG, 128×182)
- Text: "yntegreti" in **DM Sans Bold (700)**, ink `#0A0908`, letter-spacing −2.5%
- Geometry: mark height = **0.88×** the font size, baseline-shifted down ~5% of the font size, negative gap (~−6% of font size) so the mark leans into the y
- Web sizes: 26px font (nav) / 34px (footer) / 48px (large)
- Accessibility/copy: if built in HTML, the mark image carries `alt="S"` so the name still reads "Syntegreti"

**Mark alone** (`syntegreti-mark-editorial.png`): use for favicons, avatars, watermarks, slide corners. The favicon (`public/favicon.svg`) is the same S drawn in flat forest `#144A1E` / brass `#9C7A2F` / slate `#3E4A52` strokes.

**Don't**: use the old neon-gradient or white-wordmark versions; apply glows or shadows; place on busy imagery; round corners; separate the mark from the word with a visible gap in the primary lockup (that gap is the old lockup — retired).

---

## 8. PowerPoint quick recipe

1. **Slide master**: background Paper `#EFECE4` (never pure white), body font DM Sans, title font Fraunces Black.
2. **Title slide**: huge Fraunces Black headline (one italic forest word), DM Mono caps kicker above it, logo small bottom-left, hairline rule above footer.
3. **Section dividers**: alternate — either paper with a giant Fraunces number, or full-ink `#0A0908` slides with paper text (the inverse mode; use sparingly, 1–2 per deck).
4. **Content slides**: mono kicker (`// the_problem`), Fraunces title, hairline under title, DM Sans body in Secondary color, 1px rule dividers between columns.
5. **Numbers/proof**: oversized Fraunces Black figures with the unit/symbol in brass; caption in DM Mono caps muted.
6. **Problems**: terracotta ✕ list. **Checklists**: ink ✓ list (not green).
7. **Charts**: series order forest→brass→slate→terracotta→sage, no 3D, no shadows, hairline gridlines.
8. Install Fraunces, DM Sans, DM Mono from Google Fonts on presenting machines; embed fonts in the .pptx (File → Options → Save → Embed fonts).

---

*Source of truth: `src/styles/global.css` on branch `feature/editorial-design`. If the site tokens change, regenerate this guide.*
