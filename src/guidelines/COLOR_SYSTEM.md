# Sarathi Color System

This document describes the complete color system from the Figma design, now integrated into our CSS variables.

## Brand Colors

The core brand colors used throughout the application.

### Primary
- **CSS Variable**: `--color-primary` or `--brand-primary`
- **Hex**: `#388896`
- **RGBA**: `rgba(56, 136, 150, 1)`
- **Usage**: Primary buttons, links, and main interactive elements
- **Tailwind**: `bg-primary`, `text-primary`, `border-primary`

### Secondary
- **CSS Variable**: `--color-secondary` or `--brand-secondary`
- **Hex**: `#69B57C`
- **RGBA**: `rgba(105, 181, 124, 1)`
- **Usage**: Secondary buttons, accents, and supporting interactive elements
- **Tailwind**: `bg-secondary`, `text-secondary`, `border-secondary`

### Gradient
- **CSS Variables**: 
  - `--brand-gradient-start`: `rgba(105, 181, 124, 1)` (#69B57C)
  - `--brand-gradient-end`: `rgba(56, 136, 150, 1)` (#388896)
- **Type**: Linear
- **Angle**: 90°
- **Usage**: Backgrounds, hero sections, decorative elements
- **Example**: 
  ```css
  background: linear-gradient(90deg, var(--brand-gradient-start) 0%, var(--brand-gradient-end) 100%);
  ```
  or in Tailwind:
  ```html
  <div className="bg-gradient-to-r from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)]">
  ```

## Grey Scale Colors

Neutral colors for text, borders, and backgrounds.

### Black
- **CSS Variable**: `--color-black` or `--grey-black`
- **Hex**: `#192126`
- **RGBA**: `rgba(25, 33, 38, 1)`
- **Usage**: Primary text, headings
- **Mapped to**: `--text-heading`

### Sub Color Dark
- **CSS Variable**: `--color-sub-dark` or `--grey-sub-dark`
- **Hex**: `#505050`
- **RGBA**: `rgba(80, 80, 80, 1)`
- **Usage**: Body text, secondary content
- **Mapped to**: `--text-body`

### Sub Heading
- **CSS Variable**: `--color-sub-heading` or `--grey-sub-heading`
- **Hex**: `#979797`
- **RGBA**: `rgba(151, 151, 151, 1)`
- **Usage**: Tertiary text, captions, metadata

### Sub Icons
- **CSS Variable**: `--color-sub-icons` or `--grey-sub-icons`
- **Hex**: `#C7C8D5`
- **RGBA**: `rgba(199, 200, 213, 1)`
- **Usage**: Inactive icons, borders, dividers
- **Mapped to**: `--icon-inactive`, `--border`

### White
- **CSS Variable**: `--color-white` or `--grey-white`
- **Hex**: `#FFFFFF`
- **RGBA**: `rgba(255, 255, 255, 1)`
- **Usage**: Backgrounds, text on dark backgrounds
- **Mapped to**: `--background`

## State Colors

Colors for various UI states and feedback.

### Error
- **CSS Variable**: `--color-error` or `--state-error`
- **Hex**: `#F25A3C`
- **RGBA**: `rgba(242, 90, 60, 1)`
- **Usage**: Error messages, destructive actions
- **Mapped to**: `--destructive`
- **Tailwind**: `bg-destructive`, `text-destructive`

### Disabled Primary
- **CSS Variable**: `--color-disabled-primary` or `--state-disabled-primary`
- **Hex**: `#8AC0AD`
- **RGBA**: `rgba(138, 192, 173, 1)`
- **Usage**: Disabled primary buttons and elements
- **Mapped to**: `--muted`
- **Tailwind**: `bg-muted`, `text-muted`

### Disabled Secondary
- **CSS Variable**: `--color-disabled-secondary` or `--state-disabled-secondary`
- **Hex**: `#5F9CA6`
- **RGBA**: `rgba(95, 156, 166, 1)`
- **Usage**: Disabled secondary buttons and elements

### Light Secondary
- **CSS Variable**: `--color-light-secondary` or `--state-light-secondary`
- **Hex**: `#E0EBE3`
- **RGBA**: `rgba(224, 235, 227, 1)`
- **Usage**: Light backgrounds, subtle highlights, hover states

### Background Variation
- **CSS Variable**: `--color-bg-variation` or `--state-bg-variation`
- **Hex**: `#F2F2F7`
- **RGBA**: `rgba(242, 242, 247, 1)`
- **Usage**: Alternative background, sections, cards

### Background Blur
- **CSS Variables**: 
  - `--state-bg-blur-dark`: `rgba(0, 0, 0, 0.2)` (20% black)
  - `--state-bg-blur-light`: `rgba(255, 255, 255, 0.1)` (10% white)
- **Usage**: Overlay backgrounds, modals, blurred containers
- **Example**:
  ```css
  background: linear-gradient(90deg, var(--state-bg-blur-dark) 0%, var(--state-bg-blur-light) 100%);
  backdrop-filter: blur(10px);
  ```

## Usage Guidelines

### Using in CSS
```css
.element {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 1px solid var(--color-sub-icons);
}
```

### Using in Tailwind (with arbitrary values)
```html
<!-- Brand Colors -->
<div className="bg-[var(--brand-primary)]">
<div className="text-[var(--brand-secondary)]">

<!-- Grey Scale -->
<div className="text-[var(--grey-black)]">
<div className="bg-[var(--grey-white)]">

<!-- State Colors -->
<div className="bg-[var(--state-error)]">
<div className="bg-[var(--state-bg-variation)]">
```

### Using Gradient
```html
<!-- Full gradient -->
<div className="bg-gradient-to-r from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)]">

<!-- With opacity -->
<div style={{ 
  background: `linear-gradient(90deg, var(--brand-gradient-start) 0%, var(--brand-gradient-end) 100%)`
}}>
```

### Using Background Blur
```html
<div 
  className="backdrop-blur-md rounded-[var(--radius)]"
  style={{ 
    background: `linear-gradient(90deg, var(--state-bg-blur-dark) 0%, var(--state-bg-blur-light) 100%)`
  }}
>
```

## Semantic Mappings

The design system colors are mapped to semantic tokens for easier usage:

| Design System Color | Semantic Token | Tailwind Class |
|---------------------|----------------|----------------|
| Primary (#388896) | `--primary` | `bg-primary` |
| Secondary (#69B57C) | `--secondary` | `bg-secondary` |
| Error (#F25A3C) | `--destructive` | `bg-destructive` |
| Disabled Primary (#8AC0AD) | `--muted` | `bg-muted` |
| Black (#192126) | `--text-heading` | `text-text-heading` |
| Sub Color Dark (#505050) | `--text-body` | `text-text-body` |
| Sub Icons (#C7C8D5) | `--border`, `--icon-inactive` | `border-border` |
| White (#FFFFFF) | `--background` | `bg-background` |

## Dark Mode Support

All colors have dark mode variants defined in the `.dark` class. The design system colors maintain their values in dark mode, but semantic mappings adjust for better contrast.

## Chart Colors

For data visualization, use the chart color variables which map to the brand palette:

- `--chart-1`: Primary (#388896)
- `--chart-2`: Secondary (#69B57C)
- `--chart-3`: Disabled Primary (#8AC0AD)
- `--chart-4`: Disabled Secondary (#5F9CA6)
- `--chart-5`: Light Secondary (#E0EBE3)

## Best Practices

1. **Always use CSS variables** instead of hardcoded hex values
2. **Use semantic tokens** (`--primary`, `--secondary`) for common elements
3. **Use design system tokens** (`--brand-primary`, `--state-error`) when you need specific colors from the palette
4. **Maintain contrast ratios** for accessibility (WCAG AA minimum)
5. **Test in both light and dark modes** before finalizing

## Reference Image

See `/imports/Colors.tsx` for the visual representation of the complete color palette from Figma.
