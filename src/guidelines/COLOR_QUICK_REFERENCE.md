# Color System Quick Reference

## 🎨 Common Use Cases

### Buttons

```tsx
// Primary button
<button className="bg-primary text-primary-foreground hover:bg-[var(--brand-primary)]">

// Secondary button  
<button className="bg-secondary text-secondary-foreground hover:bg-[var(--brand-secondary)]">

// Destructive/Error button
<button className="bg-destructive text-destructive-foreground">

// Disabled button
<button className="bg-[var(--state-disabled-primary)] cursor-not-allowed">
```

### Text Colors

```tsx
// Headings
<h1 className="text-text-heading">Main Heading</h1>

// Body text
<p className="text-text-body">Body content</p>

// Tertiary/Caption text
<small className="text-text-tertiary">Small text</small>

// Error text
<p className="text-destructive">Error message</p>

// Success/Secondary text
<p className="text-secondary">Success message</p>
```

### Icons

```tsx
// Inactive icon (default)
<svg fill="var(--icon-inactive)">...</svg>

// Active/Selected icon
<svg fill="var(--icon-active)">...</svg>

// With Tailwind hover
<div className="[&_svg]:fill-[var(--icon-inactive)] hover:[&_svg]:fill-[var(--icon-active)]">
  <svg>...</svg>
</div>
```

### Backgrounds

```tsx
// Main background
<div className="bg-background">

// Card/Container background
<div className="bg-card">

// Alternate background
<div className="bg-[var(--state-bg-variation)]">

// Light secondary background
<div className="bg-[var(--state-light-secondary)]">

// Gradient background
<div className="bg-gradient-to-r from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)]">
```

### Borders

```tsx
// Standard border
<div className="border border-border">

// Using sub-icons color
<div className="border border-[var(--grey-sub-icons)]">

// Primary border
<div className="border border-primary">
```

### Overlays & Blurs

```tsx
// Modal/Dialog overlay
<div 
  className="backdrop-blur-md rounded-lg"
  style={{ 
    background: `linear-gradient(90deg, var(--state-bg-blur-dark) 0%, var(--state-bg-blur-light) 100%)`
  }}
>

// Simple dark overlay
<div style={{ backgroundColor: 'var(--state-bg-blur-dark)' }}>
```

## 📋 Color Palette Cheat Sheet

| Use Case | CSS Variable | Tailwind Class | Hex |
|----------|--------------|----------------|-----|
| **Brand** |
| Primary | `--brand-primary` | `bg-primary` | #388896 |
| Secondary | `--brand-secondary` | `bg-secondary` | #69B57C |
| **Text** |
| Heading | `--grey-black` | `text-text-heading` | #192126 |
| Body | `--grey-sub-dark` | `text-text-body` | #505050 |
| Caption | `--grey-sub-heading` | `text-[var(--grey-sub-heading)]` | #979797 |
| Tertiary | `--grey-sub-icons` | `text-text-tertiary` | #C7C8D5 |
| **Icons** |
| Inactive | `--icon-inactive` | `text-icon-inactive` | #C7C8D5 |
| Active | `--icon-active` | `text-icon-active` | #69B57C |
| **States** |
| Error | `--state-error` | `bg-destructive` | #F25A3C |
| Disabled (Primary) | `--state-disabled-primary` | `bg-muted` | #8AC0AD |
| Disabled (Secondary) | `--state-disabled-secondary` | `bg-[var(--state-disabled-secondary)]` | #5F9CA6 |
| **Backgrounds** |
| Main | `--background` | `bg-background` | #FFFFFF |
| Card | `--card` | `bg-card` | #FFFFFF |
| Variation | `--state-bg-variation` | `bg-[var(--state-bg-variation)]` | #F2F2F7 |
| Light Secondary | `--state-light-secondary` | `bg-[var(--state-light-secondary)]` | #E0EBE3 |
| **Borders** |
| Default | `--border` | `border-border` | #C7C8D5 |

## 🔄 Migration Examples

### Before → After

```tsx
// ❌ Before: Hardcoded hex
<div className="bg-[#388896] text-[#FFFFFF]">

// ✅ After: Using tokens
<div className="bg-primary text-primary-foreground">
```

```tsx
// ❌ Before: Hardcoded in SVG
<svg>
  <path fill="#69B57C" />
</svg>

// ✅ After: CSS variable
<svg>
  <path fill="var(--brand-secondary)" />
</svg>
```

```tsx
// ❌ Before: Inline style with hex
<div style={{ backgroundColor: '#F2F2F7' }}>

// ✅ After: CSS variable
<div style={{ backgroundColor: 'var(--state-bg-variation)' }}>
// or
<div className="bg-[var(--state-bg-variation)]">
```

## 🎯 Best Practices

1. **Use semantic tokens first**: `bg-primary` instead of `bg-[var(--brand-primary)]`
2. **For new colors**: Use design system variables like `--brand-primary`, `--state-error`
3. **SVGs always use**: `var(--variable-name)` syntax
4. **Inline styles**: Use `var(--variable-name)` syntax
5. **Gradients**: Use design system variables with `from-[var(...)]` and `to-[var(...)]`

## 🌙 Dark Mode

All colors automatically adapt to dark mode. No additional work needed!

```tsx
// This works in both light and dark mode
<div className="bg-background text-foreground">
  <h1 className="text-text-heading">Heading</h1>
  <p className="text-text-body">Body</p>
</div>
```

## 📚 Full Documentation

For complete documentation, see:
- `/guidelines/COLOR_SYSTEM.md` - Full color system with all details
- `/styles/globals.css` - All CSS variables
- `/imports/Colors.tsx` - Visual reference from Figma
