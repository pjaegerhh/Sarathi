# Design System Refactoring Progress

## Status: In Progress 🔄

This document tracks the refactoring of all components to use design tokens and i18n translations.

---

## ✅ Completed

### 1. Typography System
- ✅ Corrected all typography tokens based on Figma
- ✅ Added Desktop/Mobile responsive typography
- ✅ Added missing Bold (700) weight
- ✅ Proper line heights from Figma specs

### 2. `/components/DesktopNavigationBar.tsx`
**Changes:**
- ✅ Replaced `gap-[4px]` → `gap-spacing-xs`
- ✅ Replaced `gap-[12px]` / `gap-[24px]` → `gap-spacing-md` / `gap-spacing-xl`
- ✅ Replaced `gap-[138px]` → `gap-spacing-6xl`
- ✅ Replaced `text-[#69b57c]` → `text-secondary`
- ✅ Replaced `text-[#c7c8d5]` → `text-icon-inactive`
- ✅ Replaced `fill="var(--fill-0, #C7C8D5)"` → `fill="var(--icon-inactive)"`
- ✅ Replaced `fill="var(--fill-0, #69B57C)"` → `fill="var(--secondary)"`
- ✅ Replaced `bg-[#69b57c]` → `bg-secondary`
- ✅ Replaced `text-[#8ac0ad]` → `text-muted`
- ✅ Replaced `shadow-[0px_0px_10px_0px_#dddddd]` → `shadow-sm`
- ✅ Replaced hardcoded labels with `t.nav.profile`, `t.nav.community`, etc.
- ✅ Used CSS variables for font weights and sizes in language toggle
- ✅ Replaced hardcoded colors in SVG ellipses with `var(--secondary)`, `var(--background)`

### 3. `/App.tsx`
**Changes:**
- ✅ Theme color meta tag now reads from CSS variable `--primary`
- ✅ Replaced `pt-24 pb-24` → `pt-spacing-5xl pb-spacing-5xl`
- ✅ Replaced `px-4` → `px-spacing-xl`
- ✅ Replaced `mb-4`, `mb-6` → `mb-spacing-xl`, `mb-spacing-4xl`
- ✅ Replaced `px-6 py-2` → `px-spacing-4xl py-spacing-sm`

### 4. Translation System
- ✅ Comprehensive English and Hindi translations in `/utils/i18n.ts`
- ✅ All navigation labels
- ✅ All auth-related text
- ✅ All homepage content
- ✅ Footer text
- ✅ Admin dashboard text
- ✅ Common UI text (buttons, labels, etc.)

### 5. Color System
- ✅ Added complete color palette from Figma to `/styles/globals.css`
- ✅ Brand colors: Primary (#388896), Secondary (#69B57C), Gradient
- ✅ Grey scale: Black, Sub Dark, Sub Heading, Sub Icons, White
- ✅ State colors: Error, Disabled Primary, Disabled Secondary, Light Secondary, BG Variation, BG Blur
- ✅ Created comprehensive documentation in `/guidelines/COLOR_SYSTEM.md`
- ✅ Semantic color mappings for easier usage
- ✅ Dark mode variants for all colors

---

## 🔄 In Progress

### Remaining Components to Refactor

#### High Priority
1. **`/components/HomePageDesktop.tsx`** - Main desktop homepage
2. **`/components/HomePageMobile.tsx`** - Main mobile homepage
3. **`/components/MobileNavigation.tsx`** - Mobile nav bar
4. **`/components/DesktopNavigation.tsx`** - Desktop nav (non-homepage)

#### Medium Priority
5. **`/components/AuthPage.tsx`** - Login/signup page
6. **`/components/CommunityPage.tsx`** - Community page
7. **`/components/StoriesPage.tsx`** - Stories page
8. **`/components/ProfilePage.tsx`** - Profile page
9. **`/components/AdminDashboard.tsx`** - Admin dashboard

#### Figma Imports (Low Priority - referenced by main components)
10. **`/imports/HeroSection.tsx`**
11. **`/imports/Group56612-1-8138.tsx`**
12. **`/imports/Group56613.tsx`**
13. **`/imports/Component56.tsx`**
14. **`/imports/LanguageToggle.tsx`**

---

## 📋 Refactoring Checklist

For each component, check:

### Colors (See /guidelines/COLOR_SYSTEM.md for complete reference)
- [ ] Replace `text-[#69B57C]` → `text-secondary` or `text-[var(--brand-secondary)]`
- [ ] Replace `bg-[#69B57C]` → `bg-secondary` or `bg-[var(--brand-secondary)]`
- [ ] Replace `text-[#388896]` → `text-primary` or `text-[var(--brand-primary)]`
- [ ] Replace `bg-[#388896]` → `bg-primary` or `bg-[var(--brand-primary)]`
- [ ] Replace `text-[#C7C8D5]` → `text-icon-inactive` or `text-[var(--grey-sub-icons)]`
- [ ] Replace `text-[#505050]` → `text-text-body` or `text-[var(--grey-sub-dark)]`
- [ ] Replace `text-[#192126]` → `text-text-heading` or `text-[var(--grey-black)]`
- [ ] Replace `text-[#979797]` → `text-[var(--grey-sub-heading)]`
- [ ] Replace `text-[#8AC0AD]` → `text-muted` or `text-[var(--state-disabled-primary)]`
- [ ] Replace `bg-[#5F9CA6]` → `bg-[var(--state-disabled-secondary)]`
- [ ] Replace `bg-[#E0EBE3]` → `bg-[var(--state-light-secondary)]`
- [ ] Replace `bg-[#F2F2F7]` → `bg-[var(--state-bg-variation)]`
- [ ] Replace `text-[#F25A3C]` → `text-destructive` or `text-[var(--state-error)]`
- [ ] Replace `border-[#C7C8D5]` → `border-border`
- [ ] Replace SVG fill hex colors → CSS variables

### Spacing
- [ ] Replace `gap-[4px]` → `gap-spacing-xs`
- [ ] Replace `gap-[8px]` → `gap-spacing-sm`
- [ ] Replace `gap-[12px]` → `gap-spacing-md`
- [ ] Replace `gap-[16px]` → `gap-spacing-lg`
- [ ] Replace `gap-[24px]` → `gap-spacing-xl`
- [ ] Replace `gap-[32px]` → `gap-spacing-2xl`
- [ ] Replace `gap-[48px]` → `gap-spacing-3xl`
- [ ] Replace `gap-[64px]` → `gap-spacing-4xl`
- [ ] Replace `gap-[96px]` → `gap-spacing-5xl`
- [ ] Replace `gap-[138px]` → `gap-spacing-6xl`
- [ ] Same for `p-[...]`, `px-[...]`, `py-[...]`, `m-[...]`, `mx-[...]`, `my-[...]`

### Shadows
- [ ] Replace `shadow-[0px_0px_10px_0px_#dddddd]` → `shadow-sm`
- [ ] Replace `shadow-[0px_0px_10px_0px_rgba(221,221,221,1)]` → `shadow-sm`

### Border Radius
- [ ] Replace `rounded-[10px]` → `rounded-lg`
- [ ] Replace `rounded-[15px]` → `rounded-card`
- [ ] Replace `rounded-[24px]` → `rounded-button`
- [ ] Replace `rounded-[25px]` → `rounded-button` (if for buttons)
- [ ] Replace `rounded-[50px]` → `rounded-[50px]` (keep if intentionally large)

### Typography
- [ ] Remove `text-[14px]` unless overriding (let `<p>` handle it)
- [ ] Remove `text-[16px]` unless overriding (let `<label>` handle it)
- [ ] Remove `text-[22px]` unless overriding (let `<h3>` handle it)
- [ ] Remove `text-[32px]` unless overriding (let `<h2>` handle it)
- [ ] Remove `text-[40px]` unless overriding (let `<h1>` handle it)
- [ ] Remove `font-bold`, `font-semibold`, `font-medium` unless overriding
- [ ] Remove `leading-[...]` unless overriding
- [ ] Replace `font-['Roboto',_sans-serif]` → remove (already default)

### i18n
- [ ] Replace all hardcoded English text with `{t.section.key}`
- [ ] Ensure `useLanguage()` hook is imported and used
- [ ] Destructure `{ t }` from `useLanguage()` hook

---

## 🎯 Priority Order

### Phase 1: Navigation (DONE ✅)
- ✅ DesktopNavigationBar
- 🔄 MobileNavigation
- 🔄 DesktopNavigation

### Phase 2: Homepage
- 🔄 HomePageDesktop
- 🔄 HomePageMobile
- 🔄 HeroSection
- 🔄 Group56612-1-8138
- 🔄 Group56613

### Phase 3: Core Pages
- 🔄 AuthPage
- 🔄 CommunityPage
- 🔄 StoriesPage
- 🔄 ProfilePage

### Phase 4: Admin & Remaining
- 🔄 AdminDashboard
- 🔄 Component56
- 🔄 LanguageToggle (import)

---

## 📊 Progress Metrics

| Category | Total | Completed | Remaining | % Complete |
|----------|-------|-----------|-----------|------------|
| Main Components | 9 | 1 | 8 | 11% |
| Navigation | 3 | 1 | 2 | 33% |
| Figma Imports | 5 | 0 | 5 | 0% |
| Design System | 5 | 5 | 0 | 100% |
| **Total** | **22** | **7** | **15** | **32%** |

---

## 🔍 Common Patterns Found

### Pattern 1: Hardcoded Spacing
```tsx
// ❌ Before
<div className="flex gap-[24px] p-[12px]">

// ✅ After
<div className="flex gap-spacing-xl p-spacing-md">
```

### Pattern 2: Hardcoded Colors
```tsx
// ❌ Before
<div className="text-[#69b57c] bg-[#388896]">

// ✅ After
<div className="text-secondary bg-primary">
```

### Pattern 3: SVG Fill Colors
```tsx
// ❌ Before
<path fill="var(--fill-0, #69B57C)" />

// ✅ After
<path fill="var(--secondary)" />
```

### Pattern 4: Hardcoded Text
```tsx
// ❌ Before
<button>Join the Community</button>

// ✅ After  
<button>{t.home.joinCommunity}</button>
```

### Pattern 5: Shadow
```tsx
// ❌ Before
<div className="shadow-[0px_0px_10px_0px_#dddddd]">

// ✅ After
<div className="shadow-sm">
```

---

## 🐛 Known Issues

### Issue 1: Some components still have inline styles
Some Figma imports have inline `style` attributes that should be preserved but color values should be converted to CSS variables.

**Example:**
```tsx
// Current
<div style={{ fontVariationSettings: "'wdth' 100" }}>

// Keep this, but if there's a color, convert it
<div style={{ color: '#69B57C' }}> // ❌
<div style={{ color: 'var(--secondary)' }}> // ✅
```

### Issue 2: Typography overrides in Figma imports
Figma imports have explicit font specifications that sometimes conflict with the design system. Need to carefully replace these.

---

## 📝 Notes

1. **Preserve Figma structure:** Don't change the DOM structure of Figma imports, only update values
2. **Test both languages:** After refactoring, test both English and Hindi
3. **Test responsive:** Ensure mobile typography switches correctly at 768px
4. **Dark mode:** All new tokens have dark mode variants, should work automatically

---

*Last updated: Current session*
*Status: 32% Complete (including complete Design System foundation)*
