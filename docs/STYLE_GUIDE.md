# Atlas — Brand & Style Guide

Reference for agents building or modifying the Atlas prototype frontend.

---

## 1. Brand Identity

**Product name:** Atlas (codename "Taxonomy")
**Tagline:** "Finally, a co-pilot you can trust"
**Tone:** Professional, warm, trustworthy. Luxury-adjacent — closer to a private banking app than a SaaS dashboard. Calm authority, not flashy tech.
**Audience:** UK tax advisors at small/mid accounting firms.

### Logo

Geometric **A** mark — bold gold triangle with cream crossbar cutout.

```svg
<svg viewBox="0 0 48 48">
  <path d="M24 4 L42 44 H34 L30 34 H18 L14 44 H6 Z" fill="#FFC832" />
  <rect x="16" y="26" width="16" height="5" rx="1" fill="#FFFBF5" />
</svg>
```

The Logo component (`src/components/ui/Logo.jsx`) renders the mark + optional "Atlas" wordmark. Sizes: `sm` (h-6), `md` (h-8), `lg` (h-12). Default export.

**Usage rules:**
- Gold mark on cream or white backgrounds (default)
- Gold mark on nearblack/charcoal (dark contexts like sidebar)
- Never place gold mark on gold/amber backgrounds — use charcoal mark instead
- Wordmark always in `font-serif font-bold text-nearblack`

---

## 2. Colour Palette

### Brand Colours

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Gold | `#FFC832` | `gold` | Primary brand, CTAs, accent bars, badges |
| Amber | `#F5B85A` | `amber` | Hover state for gold elements |
| Cream | `#FFFBF5` | `cream` | Page backgrounds, light surfaces |
| Charcoal | `#3C3636` | `charcoal` | Primary body text |
| Near-black | `#1A1412` | `nearblack` | Headlines, sidebar bg, darkest text |
| Dark gold | `#946B00` | `darkgold` | Text links, inline anchors on light backgrounds |
| Warm grey | `#C4B8A8` | `warmgrey` | Secondary text, borders, disabled |
| Lavender | `#E0D0F0` | `lavender` | Accent (sparingly) |
| Lilac | `#E8D5F5` | `lilac` | Accent (sparingly) |

### Semantic Colours (status/urgency)

| Context | Colour | Tailwind |
|---------|--------|----------|
| Opportunity | Emerald | `bg-emerald-100 text-emerald-800` (badge), `text-emerald-700` (impact text) |
| Risk | Orange | `bg-orange-100 text-orange-800` (badge), `text-orange-700` (impact text) |
| Value/info | Blue | `bg-blue-100 text-blue-800` (badge) |
| Critical | Red | `bg-red-100 text-red-800` (badge, pulses), `bg-red-500` (accent bar) |
| High urgency | Orange | `bg-orange-400` (accent bar) |
| Medium urgency | Amber | `bg-amber-400` (accent bar) |
| Low urgency | Warm grey | `bg-warmgrey` (accent bar) |

### Opacity Patterns

Text hierarchy uses Tailwind opacity modifiers on charcoal:
- Primary: `text-charcoal` (100%)
- Secondary: `text-charcoal/70`
- Tertiary: `text-charcoal/60`
- Muted: `text-charcoal/50`
- Sidebar text: `text-warmgrey` (inactive), `text-cream` (active)

### Link Styling

**Never use `text-gold` for links on light backgrounds** — gold (#FFC832) on cream (#FFFBF5) has ~1.6:1 contrast, far below WCAG AA (4.5:1).

| Context | Style |
|---------|-------|
| Links on cream/white bg | `text-darkgold hover:underline` (~6.5:1 contrast on cream) |
| Links in dark sidebar | `text-gold` or `text-cream` (fine — dark background provides contrast) |
| Links in email HTML (inline) | `color: #946B00` or `color: #c9a84c` on white card bg |
| Back-navigation links | `text-charcoal/60 hover:text-charcoal` (subtle, not accent-coloured) |

---

## 3. Typography

### Font Stack

| Role | Family | Tailwind | Source |
|------|--------|----------|--------|
| Headers | Source Serif 4 | `font-serif` | Google Fonts |
| Body / UI | DM Sans | `font-sans` | Google Fonts |

**Note:** The brand spec references **ABC Arizona Flare** for headers. Source Serif 4 is the prototype substitute. Any future upgrade should swap to Arizona Flare.

### Hierarchy

| Element | Classes | Example |
|---------|---------|---------|
| Page title | `font-serif text-2xl font-bold text-nearblack` | Signal detail h1 |
| Section heading | `font-serif text-lg font-semibold text-nearblack` | Card section titles |
| Card title | `font-serif text-lg font-semibold text-nearblack` | Signal row title |
| Landing hero | `font-serif text-3xl font-bold text-nearblack` | Landing page |
| Body text | `text-sm text-charcoal/80` | Descriptions, paragraphs |
| Caption / meta | `text-xs text-warmgrey` | Timestamps, labels |
| Badge text | `text-xs font-medium` | Status badges |

**All `<h1>`–`<h4>` tags automatically get `font-serif`** via the base layer in `index.css`.

---

## 4. Spacing & Layout

### Border Radius Scale

| Element type | Radius | Tailwind |
|-------------|--------|----------|
| Buttons, inputs, filters | 8px | `rounded-lg` |
| Cards, panels | 12px | `rounded-xl` |
| Landing hero cards | 16px | `rounded-2xl` |
| Badges, pills | 9999px | `rounded-full` |
| Avatar circles | 9999px | `rounded-full` |

### Common Spacing

| Context | Value |
|---------|-------|
| Page padding (app content) | `p-8` |
| Card internal padding | `p-4` |
| Landing card padding | `p-8` |
| Gap between list items | `space-y-3` |
| Gap between sections | `space-y-6` |
| Flex gaps | `gap-2` to `gap-6` |

### Layout Structures

**AppShell** — fixed 256px dark sidebar + cream content area:
```
┌──────────┬────────────────────────────┐
│ Sidebar  │                            │
│ w-64     │  Content (ml-64 bg-cream)  │
│ bg-near  │  inner: p-8                │
│ black    │                            │
└──────────┴────────────────────────────┘
```

**OnboardingShell** — centred single column on cream:
```
     ┌──────────────┐
     │  Logo        │
     │  Stepper     │
     │  Content     │
     │  max-w-xl    │
     └──────────────┘
```

**EmailShell** — faux Outlook layout:
```
┌─────────┬──────────┬──────────────────┐
│ Folders │ Inbox    │  Email Detail    │
│ w-56    │ list     │                  │
│ bg-     │          │                  │
│ slate50 │          │                  │
└─────────┴──────────┴──────────────────┘
```

---

## 5. Components

### Button

File: `src/components/ui/Button.jsx`

| Variant | Classes |
|---------|---------|
| `primary` | `bg-gold text-nearblack hover:bg-amber` |
| `secondary` | `bg-charcoal text-cream hover:bg-nearblack` |
| `ghost` | `bg-transparent text-charcoal hover:bg-warmgrey/20` |
| `danger` | `bg-red-600 text-white hover:bg-red-700` |

Sizes: `sm` (px-3 py-1.5 text-sm), `md` (px-4 py-2), `lg` (px-6 py-3 text-lg)

Base: `inline-flex items-center justify-center gap-2 rounded-lg transition-colors font-medium`

### Badge

File: `src/components/ui/Badge.jsx`

Base: `px-2.5 py-0.5 text-xs font-medium rounded-full`

Variants: `opportunity`, `value`, `risk`, `critical` (pulses), `default`

### Card

File: `src/components/ui/Card.jsx`

Base: `bg-white rounded-xl border border-warmgrey/20`

With `hover` prop: adds `hover:shadow-md hover:border-warmgrey/40 transition-all cursor-pointer`

### Input

File: `src/components/ui/Input.jsx`

- Border: `border-warmgrey/40`, focus: `ring-2 ring-gold/50 border-gold`
- Error: `border-red-400` + red message below
- Label: `text-sm font-medium text-charcoal mb-1`

### Toggle

File: `src/components/ui/Toggle.jsx`

- Track: `bg-warmgrey/40` (off) → `bg-gold` (on)
- Thumb: white circle, shadow, slides

### Stepper

File: `src/components/ui/Stepper.jsx`

- Active: `bg-gold ring-4 ring-gold/20`
- Completed: `bg-gold` with check icon
- Inactive: `bg-warmgrey/30`

---

## 6. Borders & Dividers

| Context | Style |
|---------|-------|
| Card borders | `border border-warmgrey/20` |
| Sidebar dividers | `border-white/10` |
| Input borders | `border-warmgrey/40` |
| Hover emphasis | `border-gold/40` or `border-gold/50` |
| Signal accent bar (left) | `w-1` with urgency colour |
| Email shell dividers | `border-slate-200` |

---

## 7. Shadows & Elevation

Shadows are used sparingly — the design is mostly flat with border-based separation.

| State | Shadow |
|-------|--------|
| Card hover | `hover:shadow-md` |
| Landing card hover | `hover:shadow-lg` |
| Toggle thumb | `shadow` |
| Default state | No shadow |

---

## 8. Animation

All motion uses **Framer Motion v11**. Import from `framer-motion`.

### Staggered List Reveal (primary pattern)

Used for SignalFeed, EntityList, any list of cards:

```jsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.04, duration: 0.3 }}
>
```

- 40ms stagger between items
- 10px upward slide + fade
- 300ms duration

### Page Element Cascade

Used on Landing page — sequenced delays for hero elements:

```
Logo:     delay 0,    duration 0.5
Subtitle: delay 0.3,  duration 0.5
Cards:    delay 0.5 + i*0.15, duration 0.4
Footer:   delay 1.0,  duration 0.5
```

### Processing Steps

Longer stagger for dramatic effect: `delay: i * 0.7, duration: 0.3`

### Interactive Elements

- Spring for checkmarks: `type: 'spring', stiffness: 300`
- Spinner: `animate={{ rotate: 360 }}` with `repeat: Infinity, duration: 0.8, ease: 'linear'`
- Spinner style: `border-2 border-gold border-t-transparent rounded-full`

### Critical Badge

CSS-only pulse: `animate-pulse` (Tailwind built-in)

### Rules

- Prefer `opacity + y` combos for reveals
- Keep durations 0.3–0.5s
- Stagger lists at 0.04s intervals (fast, not sluggish)
- Don't animate layout shifts — only entrance animations
- No exit animations currently (keep it simple)

---

## 9. Icons

**Source:** Heroicons (outline/stroke style)

Standard sizing: `w-5 h-5` (nav, UI), `w-4 h-4` (inline/badges), `w-3.5 h-3.5` (stepper)

Stroke attributes: `stroke="currentColor"` with `strokeWidth={1.5}` (standard) or `strokeWidth={2}` (emphasis)

**Key icons used:**
- Signals → bell
- Entities → building/office
- Sensors → signal/wave
- Interceptors → shield
- Navigation arrows → chevron-right
- Starred emails → star (filled, amber)

Draw icons inline as `<svg>` elements — no icon library import.

---

## 10. Dark Sidebar Pattern

The AppShell sidebar uses a specific dark-on-dark layering:

| Element | Style |
|---------|-------|
| Background | `bg-nearblack` |
| Dividers | `border-white/10` |
| Inactive text | `text-warmgrey` |
| Active text | `text-cream` |
| Active bg | `bg-white/10` |
| Hover bg | `bg-white/5` |
| Badge (gold) | `bg-gold/20 text-gold` |
| Avatar circle | `bg-gold/20 text-gold` |

---

## 11. Email HTML Styling (Inline)

Digest and alert emails use inline HTML styles (not Tailwind). The light theme palette:

| Element | Style |
|---------|-------|
| Container bg | `#FFFBF5` (cream) |
| Text | `#3C3636` (charcoal) |
| Card bg | `#FFFFFF` with `border: 1px solid #E8E0D4` |
| Card titles | `#1A1412` (nearblack) |
| Entity names | `#B8941E` (darker gold for white bg readability) |
| Descriptions | `#6B6058` |
| Secondary/muted text | `#9A8E7E` |
| Footer border | `1px solid #E8E0D4` |
| Links | Gold tone (`#c9a84c`) |
| CTA button | `background: #c9a84c; color: #FFFBF5` |
| Alert header | Red gradient (keep for urgency), body uses light theme |
| Recommended action box | `background: #F5F0E8; border: 1px solid #E8E0D4` |

Semantic badge colours (green for opportunity, red for risk) are kept as-is — they work on light backgrounds.

---

## 12. Signal Row Anatomy

```
┌─┬───────────────────────────────────────────┬───┐
│▌│ [Badge: opportunity] · 2h ago             │ › │
│▌│ R&D Tax Relief Opportunity Identified     │   │
│▌│ Alpha Robotics Ltd                        │   │
│▌│ £42k potential saving — qualifying R&D... │   │
│▌│ £42k potential saving (green)             │   │
└─┴───────────────────────────────────────────┴───┘
 ↑ 4px accent bar (colour = urgency)
```

- Left accent: `w-1` with urgency colour
- Critical signals get: `border-red-200 bg-red-50/50`
- Impact text: emerald for opportunities, orange for risks

---

## 13. Entity Timeline Dot Colours

| Event type | Colour |
|-----------|--------|
| signal | `bg-gold` |
| email | `bg-blue-400` |
| filing | `bg-slate-400` |
| import | `bg-green-400` |
| hmrc | `bg-orange-400` |
| gazette | `bg-red-400` |
| engagement | `bg-green-400` |
| milestone, admin, transaction | `bg-slate-400` |

Vertical connector: `w-px bg-warmgrey/30`

---

## 14. File Structure

```
src/
├── components/
│   ├── ui/           # Reusable primitives (Button, Badge, Card, Input, Toggle, Stepper, Logo)
│   ├── layout/       # Shells (AppShell, OnboardingShell, EmailShell)
│   ├── signals/      # SignalFeed, SignalRow, SignalDetail, SignalFilters, SignalEvidence, SignalActions
│   ├── entities/     # EntityList, EntityDetail, EntityTimeline
│   ├── email/        # EmailRow, EmailDetail
│   ├── onboarding/   # LoginScreen, FirmDetails, UserDetails, SensorConfig, Processing
│   └── config/       # SensorCard, InterceptorCard
├── data/             # All dummy data (signals, entities, sensors, interceptors, emails, taxonomy)
├── pages/            # Landing, AppPage, OnboardingPage, EmailPage (default exports)
├── lib/              # cn.js (class merge utility)
└── index.css         # Tailwind directives + base h1-h4 serif rule
```

### Export Conventions

- **UI components:** Named exports (`export function Button`)
- **Page components:** Default exports (`export default function AppPage`)
- **Layout components:** Default exports (`export default function AppShell`)
- **Data files:** Named exports (`export const signals = [...]`)

---

## 15. Technical Stack

| Dep | Version |
|-----|---------|
| React | ^18.2.0 |
| React Router | ^6.22.0 (HashRouter for GitHub Pages) |
| Framer Motion | ^11.0.0 |
| Tailwind CSS | ^3.4.1 |
| Vite | ^5.1.0 |
| PostCSS + Autoprefixer | standard |

**No state library** — `useState` + URL routing only.
**No icon library** — inline SVGs throughout.
**Class merging:** `cn()` from `src/lib/cn.js` (simple filter + join, not clsx/twMerge).

---

## 16. Do / Don't

### Do
- Use `font-serif` for all headings
- Use `cream` as the default page background
- Use `gold` for primary actions and accent elements
- Use opacity modifiers on `charcoal` for text hierarchy
- Stagger list animations at 40ms intervals
- Use `rounded-xl` for cards, `rounded-lg` for interactive elements
- Keep the warm, cream-dominant palette — this is not a cold blue SaaS app

### Don't
- Use Inter, Roboto, or system fonts — always DM Sans for body
- Use blue as a primary colour (reserved for Outlook faux-UI and info badges only)
- Use shadows as the primary depth mechanism — prefer borders
- Add exit animations — entrance only
- Use CSS-in-JS or styled-components — Tailwind classes only
- Create new colour tokens without adding to `tailwind.config.js`
- Use `text-gold` for links on light backgrounds — use `text-darkgold` instead (WCAG AA)
- Use `#000000` black — use `nearblack` (#1A1412) instead
- Use pure `#FFFFFF` for backgrounds — use `cream` (#FFFBF5); white is for cards on cream
