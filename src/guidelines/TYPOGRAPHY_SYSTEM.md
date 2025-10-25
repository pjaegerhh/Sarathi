# Sarathi Typography System

## Overview

This typography system is extracted directly from the Figma design system (`/imports/Typography.tsx`) and implements **Roboto** font family with specific sizes, weights, and line heights for both Desktop and Mobile (Handy) experiences.

---

## Font Family

**Primary Font:** Roboto
- **Weights Available:** Regular (400), Medium (500), Semi Bold (600), Bold (700)
- **Import:** Loaded via Google Fonts in `globals.css`

---

## Desktop Typography

### Hero Text
**Use case:** Main hero headlines on desktop
- **HTML Element:** Use with class or manual styling
- **Size:** 64px
- **Weight:** Semi Bold (600)
- **Line Height:** 66px
- **CSS Variable:** `--text-desktop-hero` / `--text-desktop-hero-lh`

```tsx
// Example
<h1 className="text-[64px] font-semibold leading-[66px]">
  The quick brown fox jumps
</h1>
```

### Heading 40px (Desktop H1)
**Use case:** Major section headings
- **HTML Element:** `<h1>`
- **Size:** 40px
- **Weight:** Semi Bold (600)
- **Line Height:** 60px
- **CSS Variable:** `--text-desktop-h1` / `--text-desktop-h1-lh`

```tsx
<h1>The quick brown fox jumps over the lazy dog</h1>
```

### Heading 32px (Desktop H2)
**Use case:** Sub-section headings
- **HTML Element:** `<h2>`
- **Size:** 32px
- **Weight:** Medium (500)
- **Line Height:** 40px
- **CSS Variable:** `--text-desktop-h2` / `--text-desktop-h2-lh`

```tsx
<h2>The quick brown fox jumps over the lazy dog</h2>
```

### Heading 22px (Desktop H3)
**Use case:** Card titles, smaller headings
- **HTML Element:** `<h3>`
- **Size:** 22px
- **Weight:** Regular (400)
- **Line Height:** 32px
- **CSS Variable:** `--text-desktop-h3` / `--text-desktop-h3-lh`

```tsx
<h3>The quick brown fox jumps over the lazy dog</h3>
```

### Body 18px (Desktop H4)
**Use case:** Emphasized body text, large paragraphs
- **HTML Element:** `<h4>`
- **Size:** 18px
- **Weight:** Medium (500)
- **Line Height:** 28px
- **CSS Variable:** `--text-desktop-body-lg` / `--text-desktop-body-lg-lh`

```tsx
<h4>The quick brown fox jumps over the lazy dog</h4>
```

### Label 16px
**Use case:** Form labels, bold emphasis
- **HTML Element:** `<label>`
- **Size:** 16px
- **Weight:** Bold (700)
- **Line Height:** 24px
- **CSS Variable:** `--text-desktop-label` / `--text-desktop-label-lh`

```tsx
<label>The quick brown fox jumps over the lazy dog</label>
```

### Body 14px (Default)
**Use case:** Standard body text, buttons
- **HTML Element:** `<p>`, `<button>`, `<input>`
- **Size:** 14px
- **Weight:** Regular (400)
- **Line Height:** 22px
- **CSS Variable:** `--text-desktop-body` / `--text-desktop-body-lh`

```tsx
<p>The quick brown fox jumps over the lazy dog</p>
<button>Click me</button>
```

---

## Mobile Typography (Handy)

### Heading 24px (Mobile H1)
**Use case:** Main mobile headings
- **HTML Element:** `<h1>` on mobile
- **Size:** 24px
- **Weight:** Bold (700)
- **Line Height:** 30px
- **CSS Variable:** `--text-mobile-h1` / `--text-mobile-h1-lh`

```tsx
<h1>The quick brown fox jumps over the lazy dog</h1>
```

### Heading 16px (Mobile H2)
**Use case:** Sub-headings on mobile
- **HTML Element:** `<h2>`, `<h3>` on mobile
- **Size:** 16px
- **Weight:** Medium (500)
- **Line Height:** 24px
- **CSS Variable:** `--text-mobile-h2` / `--text-mobile-h2-lh`

```tsx
<h2>The quick brown fox jumps over the lazy dog</h2>
```

### Label 14px
**Use case:** Form labels on mobile
- **HTML Element:** `<label>` on mobile
- **Size:** 14px
- **Weight:** Medium (500)
- **Line Height:** 20px
- **CSS Variable:** `--text-mobile-label` / `--text-mobile-label-lh`

```tsx
<label>The quick brown fox jumps over the lazy dog</label>
```

### Body 14px
**Use case:** Standard body text on mobile
- **HTML Element:** `<p>`, `<button>`, `<input>` on mobile
- **Size:** 14px
- **Weight:** Regular (400)
- **Line Height:** 20px
- **CSS Variable:** `--text-mobile-body` / `--text-mobile-body-lh`

```tsx
<p>The quick brown fox jumps over the lazy dog</p>
```

### Small Body 12px
**Use case:** Small text, captions, footnotes
- **HTML Element:** `<small>`
- **Size:** 12px
- **Weight:** Regular (400)
- **Line Height:** 16px
- **CSS Variable:** `--text-mobile-small` / `--text-mobile-small-lh`

```tsx
<small>The quick brown fox jumps over the lazy dog</small>
```

---

## Typography Quick Reference

### Desktop

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| Hero | 64px | Semi Bold | 66px | Hero headlines |
| `<h1>` | 40px | Semi Bold | 60px | Major headings |
| `<h2>` | 32px | Medium | 40px | Section headings |
| `<h3>` | 22px | Regular | 32px | Card titles |
| `<h4>` | 18px | Medium | 28px | Large body text |
| `<label>` | 16px | Bold | 24px | Form labels |
| `<p>` | 14px | Regular | 22px | Body text |
| `<button>` | 14px | Medium | 22px | Buttons |
| `<input>` | 14px | Regular | 22px | Input fields |

### Mobile (< 768px)

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| `<h1>` | 24px | Bold | 30px | Main headings |
| `<h2>`, `<h3>` | 16px | Medium | 24px | Sub-headings |
| `<label>` | 14px | Medium | 20px | Form labels |
| `<p>` | 14px | Regular | 20px | Body text |
| `<button>` | 14px | Medium | 20px | Buttons |
| `<input>` | 14px | Regular | 20px | Input fields |
| `<small>` | 12px | Regular | 16px | Small text |

---

## CSS Variables

All typography tokens are available as CSS variables:

### Desktop
```css
--text-desktop-hero: 64px;
--text-desktop-hero-lh: 66px;
--text-desktop-h1: 40px;
--text-desktop-h1-lh: 60px;
--text-desktop-h2: 32px;
--text-desktop-h2-lh: 40px;
--text-desktop-h3: 22px;
--text-desktop-h3-lh: 32px;
--text-desktop-body-lg: 18px;
--text-desktop-body-lg-lh: 28px;
--text-desktop-label: 16px;
--text-desktop-label-lh: 24px;
--text-desktop-body: 14px;
--text-desktop-body-lh: 22px;
```

### Mobile
```css
--text-mobile-h1: 24px;
--text-mobile-h1-lh: 30px;
--text-mobile-h2: 16px;
--text-mobile-h2-lh: 24px;
--text-mobile-label: 14px;
--text-mobile-label-lh: 20px;
--text-mobile-body: 14px;
--text-mobile-body-lh: 20px;
--text-mobile-small: 12px;
--text-mobile-small-lh: 16px;
```

### Font Weights
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

---

## Automatic Application

Typography is **automatically applied** to HTML elements when you use them without Tailwind text classes:

```tsx
// ✅ Automatic styling
<h1>This automatically uses Desktop H1 styles (40px, Semi Bold, 60px line height)</h1>

// ❌ Manual override (when needed)
<h1 className="text-[64px] font-semibold leading-[66px]">
  This uses Hero text styles instead
</h1>
```

The system automatically switches to mobile typography when the viewport is < 768px.

---

## Usage Guidelines

### DO ✅

```tsx
// Let the system handle typography
<h1>Page Title</h1>
<h2>Section Heading</h2>
<p>Body text content here</p>
<label>Form Label</label>

// Use semantic HTML
<article>
  <h1>Article Title</h1>
  <p>Article content...</p>
</article>

// For hero text, manually apply
<h1 className="text-[64px] font-semibold leading-[66px]">
  Hero Headline
</h1>
```

### DON'T ❌

```tsx
// Don't override unnecessarily
<h1 className="text-3xl font-bold">Title</h1>

// Don't use wrong elements
<p className="text-[40px] font-semibold">Should be h1</p>

// Don't hardcode values that exist in the system
<div style={{ fontSize: '22px', lineHeight: '32px' }}>
  Should use h3
</div>
```

---

## Special Cases

### Hero Text on Desktop
For hero sections, manually apply the hero text styles:

```tsx
<h1 className="text-[64px] font-semibold leading-[66px]">
  {t('hero.title')}
</h1>
```

### Responsive Typography
The system automatically adapts between desktop and mobile breakpoints. No manual media queries needed for standard elements.

### Custom Sizes
If you need a size not in the system, use Tailwind arbitrary values:

```tsx
<p className="text-[20px] leading-[26px]">Custom sized text</p>
```

But prefer using existing typography tokens when possible.

---

## Letter Spacing

Some typography variants include letter spacing:

- **Desktop Body 14px:** No letter spacing
- **Mobile Label 14px:** `0.1px` tracking
- **Mobile Body 14px:** `0.25px` tracking  
- **Small Body 12px:** `0.4px` tracking

Apply with Tailwind:
```tsx
<p className="tracking-[0.25px]">Mobile body text</p>
<small className="tracking-[0.4px]">Small caption text</small>
```

---

## Font Loading

Roboto is loaded via Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');
```

All weights are loaded for optimal rendering.

---

## Testing Your Typography

Use the Typography preview component:
- File: `/imports/Typography.tsx`
- Shows all typography styles with samples
- Useful for design verification

---

*Typography system based on Figma design system - last updated: Current Session*
