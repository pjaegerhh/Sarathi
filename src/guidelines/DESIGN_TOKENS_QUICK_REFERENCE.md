# Design Tokens - Quick Reference Card

## 🎨 Colors

### Brand
- `text-primary` / `bg-primary` - Teal (#388896)
- `text-secondary` / `bg-secondary` - Green (#69B57C)

### Text
- `text-text-heading` - Dark headings (#192126)
- `text-text-body` - Body text (#505050)
- `text-text-tertiary` - Light text (#C7C8D5)

### Icons
- `text-icon-inactive` - Inactive (#C7C8D5)
- `text-icon-active` - Active (#69B57C)

### Other
- `text-destructive` / `bg-destructive` - Error red (#F25A3C)
- `text-muted` / `bg-muted` - Muted teal (#8AC0AD)
- `border-border` - Default border (#C7C8D5)
- `shadow-sm` - Small elevation

---

## 📏 Spacing

```
gap-spacing-xs   p-spacing-xs   m-spacing-xs   →  4px
gap-spacing-sm   p-spacing-sm   m-spacing-sm   →  8px
gap-spacing-md   p-spacing-md   m-spacing-md   → 12px
gap-spacing-lg   p-spacing-lg   m-spacing-lg   → 16px
gap-spacing-xl   p-spacing-xl   m-spacing-xl   → 24px
gap-spacing-2xl  p-spacing-2xl  m-spacing-2xl  → 32px
gap-spacing-3xl  p-spacing-3xl  m-spacing-3xl  → 48px
gap-spacing-4xl  p-spacing-4xl  m-spacing-4xl  → 64px
gap-spacing-5xl  p-spacing-5xl  m-spacing-5xl  → 96px
gap-spacing-6xl  p-spacing-6xl  m-spacing-6xl  → 138px
```

---

## 🔤 Typography

Use HTML tags - styling is automatic:
```tsx
<h1>       → 64px, semibold
<h2>       → 40px, semibold
<h3>       → 32px, medium
<h4>       → 22px, normal
<p>        → 14px, normal
<label>    → 12px, normal
<button>   → 14px, medium
```

⚠️ **Don't use** `text-xl`, `text-2xl`, `font-bold` unless overriding

---

## 📐 Border Radius

```
rounded-sm     →  6px
rounded-md     →  8px
rounded-lg     → 10px (default)
rounded-xl     → 14px
rounded-button → 24px (for buttons)
rounded-card   → 15px (for cards)
```

---

## ✅ Quick Examples

### Button
```tsx
<button className="bg-primary text-primary-foreground 
                   px-spacing-xl py-spacing-sm rounded-button">
  {t('buttons.submit')}
</button>
```

### Card
```tsx
<div className="bg-card rounded-card shadow-sm p-spacing-xl">
  <h3>{t('card.title')}</h3>
  <p className="text-text-body">{t('card.description')}</p>
</div>
```

### Navigation
```tsx
<div className="flex gap-spacing-xs items-center">
  <Icon className="text-icon-inactive" />
  <span className="text-text-tertiary">{t('nav.profile')}</span>
</div>
```

### Layout
```tsx
<section className="flex flex-col gap-spacing-xl p-spacing-2xl">
  {/* Content */}
</section>
```

---

## 🚫 Don't Use

❌ `text-[#69B57C]` → ✅ `text-secondary`
❌ `gap-[24px]` → ✅ `gap-spacing-xl`
❌ `p-[12px]` → ✅ `p-spacing-md`
❌ `shadow-[0px_0px_10px...]` → ✅ `shadow-sm`
❌ `text-6xl font-bold` → ✅ `<h1>`
❌ `"Click Me"` → ✅ `{t('buttons.clickMe')}`

---

**Remember:** If you're typing a hardcoded value, there's probably a design token for it!
