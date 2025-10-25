# Sarathi Design System - Usage Guide

## Overview

The Sarathi design system is implemented using CSS custom properties (variables) in `/styles/globals.css` and exposed as Tailwind utilities for easy usage throughout the application.

---

## 🎨 Color Tokens

### Primary Brand Colors

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--primary` | `rgba(56, 136, 150, 1)` | `text-primary`, `bg-primary`, `border-primary` | Primary brand color (#388896) - buttons, links, active states |
| `--secondary` | `rgba(105, 181, 124, 1)` | `text-secondary`, `bg-secondary`, `border-secondary` | Secondary brand color (#69B57C) - accents, icons, logo |

### Text Colors

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--text-heading` | `rgba(25, 33, 38, 1)` | `text-text-heading` | Headings, titles (#192126) |
| `--text-body` | `rgba(80, 80, 80, 1)` | `text-text-body` | Body text, descriptions (#505050) |
| `--text-tertiary` | `rgba(199, 200, 213, 1)` | `text-text-tertiary` | Less important text (#C7C8D5) |
| `--foreground` | `rgba(0, 0, 0, 1)` | `text-foreground` | Default text color |

### Icon Colors

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--icon-inactive` | `rgba(199, 200, 213, 1)` | `text-icon-inactive` | Inactive navigation icons (#C7C8D5) |
| `--icon-active` | `rgba(105, 181, 124, 1)` | `text-icon-active` | Active navigation icons (#69B57C) |

### Background Colors

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--background` | `rgba(255, 255, 255, 1)` | `bg-background` | Main app background |
| `--card` | `rgba(255, 255, 255, 1)` | `bg-card` | Card backgrounds |
| `--input-background` | `rgba(255, 255, 255, 1)` | `bg-input-background` | Input field backgrounds |

### Semantic Colors

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--muted` | `rgba(138, 192, 173, 1)` | `text-muted`, `bg-muted` | Muted elements (#8AC0AD) |
| `--accent` | `rgba(138, 192, 173, 1)` | `text-accent`, `bg-accent` | Accent highlights |
| `--destructive` | `rgba(242, 90, 60, 1)` | `text-destructive`, `bg-destructive` | Errors, delete actions (#F25A3C) |
| `--border` | `rgba(199, 200, 213, 1)` | `border-border` | Default borders (#C7C8D5) |

### Shadow

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--shadow-color` | `rgba(221, 221, 221, 1)` | N/A (use in custom CSS) | Shadow color (#DDDDDD) |
| `--elevation-sm` | `0px 0px 10px 0px rgba(221, 221, 221, 1)` | `shadow-sm` | Small elevation shadow |

---

## 📏 Spacing Scale

Use these for consistent spacing throughout the app:

| Token | Value | Tailwind Class | Usage Example |
|-------|-------|----------------|---------------|
| `--spacing-xs` | `4px` | `gap-spacing-xs`, `p-spacing-xs`, `m-spacing-xs` | Tight spacing |
| `--spacing-sm` | `8px` | `gap-spacing-sm`, `p-spacing-sm`, `m-spacing-sm` | Small gaps |
| `--spacing-md` | `12px` | `gap-spacing-md`, `p-spacing-md`, `m-spacing-md` | Medium gaps |
| `--spacing-lg` | `16px` | `gap-spacing-lg`, `p-spacing-lg`, `m-spacing-lg` | Large gaps |
| `--spacing-xl` | `24px` | `gap-spacing-xl`, `p-spacing-xl`, `m-spacing-xl` | Extra large gaps |
| `--spacing-2xl` | `32px` | `gap-spacing-2xl`, `p-spacing-2xl`, `m-spacing-2xl` | 2X large |
| `--spacing-3xl` | `48px` | `gap-spacing-3xl`, `p-spacing-3xl`, `m-spacing-3xl` | 3X large |
| `--spacing-4xl` | `64px` | `gap-spacing-4xl`, `p-spacing-4xl`, `m-spacing-4xl` | 4X large |
| `--spacing-5xl` | `96px` | `gap-spacing-5xl`, `p-spacing-5xl`, `m-spacing-5xl` | 5X large |
| `--spacing-6xl` | `138px` | `gap-spacing-6xl`, `p-spacing-6xl`, `m-spacing-6xl` | Maximum spacing |

**Usage Examples:**
```tsx
// Good - Using design system tokens
<div className="flex gap-spacing-xl p-spacing-md">

// Bad - Hardcoded values
<div className="flex gap-[24px] p-[12px]">
```

---

## 🔤 Typography

### Font Sizes

| Token | Value | CSS Class | HTML Element Default | Usage |
|-------|-------|-----------|---------------------|-------|
| `--text-h1` | `64px` | Use `<h1>` tag | `<h1>` | Hero headings |
| `--text-h2` | `40px` | Use `<h2>` tag | `<h2>` | Section headings |
| `--text-h3` | `32px` | Use `<h3>` tag | `<h3>` | Sub-section headings |
| `--text-h4` | `22px` | Use `<h4>` tag | `<h4>` | Card titles |
| `--text-lg` | `16px` | N/A (override with `text-[16px]` if needed) | N/A | Buttons, emphasized text |
| `--text-base` | `14px` | Use `<p>` tag | `<p>`, `<button>`, `<input>` | Body text |
| `--text-sm` | `12px` | Use `<label>` tag | `<label>` | Small text, captions |

### Font Weights

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| `--font-weight-semibold` | `600` | Applied to `<h1>`, `<h2>` | Headings |
| `--font-weight-medium` | `500` | Applied to `<h3>`, `<button>` | Sub-headings, buttons |
| `--font-weight-normal` | `400` | Applied to `<p>`, `<label>`, `<input>` | Body text |

### Font Family

**All text uses:** `'Roboto', sans-serif`

**Usage Guidelines:**
```tsx
// Good - Let the design system handle typography
<h1>Welcome to Sarathi</h1>
<p>This text automatically uses the correct size and weight</p>

// Bad - Overriding with Tailwind classes (unless specifically needed)
<h1 className="text-5xl font-bold">Welcome to Sarathi</h1>
```

⚠️ **IMPORTANT:** Do NOT use Tailwind font size classes (`text-xl`, `text-2xl`, etc.) unless you specifically need to override the design system. The typography is automatically applied via HTML elements.

---

## 📐 Border Radius

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--radius` | `10px` | `rounded-lg` | Default border radius |
| `--radius-sm` | `6px` | `rounded-sm` | Small radius |
| `--radius-md` | `8px` | `rounded-md` | Medium radius |
| `--radius-xl` | `14px` | `rounded-xl` | Extra large radius |
| `--radius-button` | `24px` | `rounded-button` | Button border radius |
| `--radius-card` | `15px` | `rounded-card` | Card border radius |

---

## 🎯 Usage Examples

### Button

```tsx
// Primary button
<button className="bg-primary text-primary-foreground px-spacing-xl py-spacing-sm rounded-button">
  Click Me
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground px-spacing-xl py-spacing-sm rounded-button">
  Learn More
</button>
```

### Card

```tsx
<div className="bg-card rounded-card shadow-sm p-spacing-xl">
  <h3>Card Title</h3>
  <p className="text-text-body">Card description goes here</p>
</div>
```

### Navigation Item

```tsx
// Inactive
<div className="flex flex-col gap-spacing-xs items-center">
  <IconComponent className="text-icon-inactive" />
  <p className="text-text-tertiary">Profile</p>
</div>

// Active
<div className="flex flex-col gap-spacing-xs items-center">
  <IconComponent className="text-icon-active" />
  <p className="text-secondary">Profile</p>
</div>
```

### Layout Spacing

```tsx
<section className="flex flex-col gap-spacing-xl p-spacing-2xl">
  <h2>Section Title</h2>
  <div className="grid grid-cols-3 gap-spacing-lg">
    {/* Cards */}
  </div>
</section>
```

---

## ⚠️ Common Mistakes to Avoid

### ❌ DON'T

```tsx
// Hardcoded colors
<div className="text-[#69B57C]">Text</div>

// Hardcoded spacing
<div className="gap-[24px] p-[12px]">Content</div>

// Hardcoded shadows
<div className="shadow-[0px_0px_10px_0px_#dddddd]">Card</div>

// Overriding typography unnecessarily
<h1 className="text-6xl font-bold">Title</h1>

// Hardcoded text (breaks i18n)
<button>Click Me</button>
```

### ✅ DO

```tsx
// Use design system colors
<div className="text-secondary">Text</div>

// Use spacing tokens
<div className="gap-spacing-xl p-spacing-md">Content</div>

// Use shadow utilities
<div className="shadow-sm">Card</div>

// Let typography system work
<h1>Title</h1>

// Use i18n translations
<button>{t('buttons.clickMe')}</button>
```

---

## 🔄 Updating the Design System

To update design system tokens:

1. **Edit `/styles/globals.css`**
   - Update the `:root` section for light mode values
   - Update the `.dark` section for dark mode values

2. **Update Tailwind Theme**
   - Ensure new tokens are added to the `@theme inline` block
   - Format: `--color-token-name: var(--token-name);`

3. **Test thoroughly**
   - Check both light and dark modes
   - Verify all components use the updated tokens
   - Test responsive behavior

---

## 📚 Additional Resources

- **Full Design System Audit:** See `/guidelines/DESIGN_SYSTEM_AUDIT.md`
- **i18n Implementation:** See `/guidelines/Guidelines.md`
- **Figma Design:** [Link to Figma file if available]

---

*Last Updated: Current Session*
