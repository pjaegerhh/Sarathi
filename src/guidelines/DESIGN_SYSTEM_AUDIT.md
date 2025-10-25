# Design System Audit - Missing Tokens and Issues

## Date: Current Analysis

## Summary
This audit identifies missing design system tokens and hardcoded values that need to be converted to CSS variables for consistency and maintainability.

---

## 🔴 CRITICAL ISSUES FOUND

### 1. Missing Color Tokens

The following colors are used throughout the Figma imports but are NOT defined in globals.css:

| Color Value | Usage | Suggested Token Name |
|-------------|-------|---------------------|
| `#C7C8D5` | Navigation icons (inactive state), text | `--color-icon-inactive` or `--color-text-tertiary` |
| `#69B57C` | Logo, active states, gradients | Already defined as `--secondary` ✅ |
| `#388896` | Primary brand color, gradients | Already defined as `--primary` ✅ |
| `#505050` | Body text, descriptions | `--color-text-body` or `--color-text-secondary` |
| `#192126` | Heading text (dark) | `--color-text-heading` |
| `#8ac0ad` | Inactive language toggle text | Already defined as `--muted` ✅ |
| `#DDDDDD` | Shadow color | `--color-shadow` |
| `#FFFFFF` | White backgrounds | Already defined as `--background` ✅ |

### 2. Missing Spacing Tokens

No spacing system is defined! The design uses specific spacing values:
- `gap-[4px]` - Extra small spacing
- `gap-[8px]` - Small spacing  
- `gap-[24px]` - Medium spacing
- `gap-[138px]` - Large spacing
- `px-[24px]`, `py-[8px]` - Button padding
- `p-[4px]` - Tight padding

**Recommended spacing scale:**
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
--spacing-3xl: 48px;
--spacing-4xl: 64px;
--spacing-5xl: 96px;
--spacing-6xl: 138px;
```

### 3. Hardcoded Shadow Values

Current usage: `shadow-[0px_0px_10px_0px_#dddddd]`
CSS variable exists: `--elevation-sm: 0px 0px 10px 0px rgba(221, 221, 221, 1)` ✅

**Issue:** Not being used! Need to replace hardcoded shadows with `shadow-sm` Tailwind class.

### 4. Missing Typography Variants

Current globals.css has:
- `--text-h1: 64px`
- `--text-h2: 40px`
- `--text-h3: 32px`
- `--text-h4: 22px`
- `--text-base: 14px`
- `--text-sm: 12px`

**Missing from Figma imports:**
- 16px (used in buttons, language toggle)
- 22px (used in descriptions)

**Recommendation:** Add `--text-lg: 16px` and verify `--text-h4` usage

### 5. Hardcoded Text (i18n Issue)

All text in Figma imports is hardcoded in English:
- "Profile", "Community", "Daily Tips", "Help Center", "Tutorial"
- "Join the Community"
- "Members in the community"
- "+250"
- "EN", "हि" (language toggle)

**Action Required:** Replace all hardcoded text with i18n translation keys using the `t()` function from LanguageContext.

---

## 📋 REQUIRED ACTIONS

### Action 1: Add Missing Color Tokens to globals.css

```css
/* Additional text colors */
--text-heading: rgba(25, 33, 38, 1);
--text-body: rgba(80, 80, 80, 1);
--text-tertiary: rgba(199, 200, 213, 1);

/* Icon colors */
--icon-inactive: rgba(199, 200, 213, 1);
--icon-active: rgba(105, 181, 124, 1);

/* Shadow colors */
--shadow-color: rgba(221, 221, 221, 1);
```

### Action 2: Add Spacing System to globals.css

```css
/* Spacing scale */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
--spacing-3xl: 48px;
--spacing-4xl: 64px;
--spacing-5xl: 96px;
--spacing-6xl: 138px;
```

### Action 3: Add Typography Variant

```css
--text-lg: 16px;
```

### Action 4: Update Tailwind Theme Inline

Add spacing and new colors to the `@theme inline` block so they can be used as Tailwind utilities.

### Action 5: Create Utility Classes

Add utility classes for common patterns:
```css
.shadow-elevation {
  box-shadow: var(--elevation-sm);
}
```

---

## 🔧 REFACTORING NEEDED

### Files to Update

1. **All Figma imports** (`/imports/*.tsx`):
   - Replace `#C7C8D5` → `text-icon-inactive` or use CSS variable
   - Replace `#505050` → `text-body`
   - Replace `#192126` → `text-heading`
   - Replace `shadow-[0px_0px_10px_0px_#dddddd]` → `shadow-sm`
   - Replace hardcoded gaps with spacing utilities: `gap-[24px]` → `gap-spacing-xl`
   - Replace all hardcoded text with `{t('translation.key')}`

2. **Components** (`/components/*.tsx`):
   - Replace `text-[#69b57c]` → `text-secondary`
   - Replace `text-[#c7c8d5]` → `text-icon-inactive`
   - Replace `fill-[#69b57c]` → use CSS variable `fill-secondary`

3. **App.tsx**:
   - Replace `#388896` → use `getComputedStyle` to read `--primary` value

---

## ✅ WHAT'S WORKING WELL

1. Core color system is defined (primary, secondary, muted, accent, destructive)
2. Typography base sizes are defined
3. Border radius system is comprehensive (radius, radius-button, radius-card)
4. Shadow elevation is defined
5. Chart colors are defined
6. Font family is properly set to Roboto

---

## 📊 COMPLIANCE STATUS

| Category | Status | Notes |
|----------|--------|-------|
| Core Colors | 🟡 Partial | Missing text/icon color variants |
| Typography | 🟡 Partial | Missing 16px variant |
| Spacing | 🔴 Missing | No spacing scale defined |
| Shadows | 🟢 Defined | But not being used consistently |
| Border Radius | 🟢 Complete | Well defined |
| i18n | 🔴 Missing | All text is hardcoded |

---

## 🎯 NEXT STEPS

### Priority 1 (Critical)
1. Add missing color tokens to globals.css
2. Add spacing system to globals.css
3. Update Tailwind theme to expose new tokens

### Priority 2 (High)
1. Refactor Figma imports to use CSS variables
2. Replace all hardcoded text with i18n keys
3. Create translation files for English and Hindi

### Priority 3 (Medium)
1. Create utility classes for common patterns
2. Document design system usage in guidelines
3. Add design system validation/linting

---

## 📝 RECOMMENDATIONS

1. **Create a single source of truth:** All design tokens should live in globals.css
2. **Use Tailwind utilities:** Prefer `text-primary` over custom classes with CSS variables
3. **Implement i18n properly:** Use the LanguageContext throughout
4. **Document the system:** Create a living style guide
5. **Add visual regression testing:** Ensure design changes don't break layouts

---

*End of Audit*
