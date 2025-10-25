# Figma Design Integration Notes

## What Was Fixed

1. **Import Errors Resolved**
   - Updated `/components/HomePageDesktop.tsx` to import from the new Figma design file `/imports/HomePageDesktop-1-5019.tsx`
   - Confirmed `/components/HomePageMobile.tsx` was already correctly importing from `/imports/Homepage.tsx`
   - Both components now use default imports matching the Figma export structure

2. **Layout Improvements**
   - Added `overflow-x-hidden` to prevent horizontal scrolling issues
   - Removed conflicting navigation on the home page since the Figma design includes its own navigation bar
   - Updated App.tsx to hide custom navigation components when on the home page

3. **Design System Integration**
   - The Figma design uses inline styles and specific Tailwind classes from the import
   - Your custom CSS variables in `/styles/globals.css` are available but not yet applied to the Figma components
   - Typography from globals.css will apply to base elements where Tailwind classes aren't used

## Current State

✅ **Working:**
- Desktop homepage renders with the new Figma design
- Mobile homepage renders with the existing Figma mobile design
- No import/export errors
- Layout properly constrained and scrollable

## Next Steps for Full Integration

### 1. Bilingual Support (Critical)
The Figma imports contain hardcoded English text. To make this bilingual (English/Hindi):

**Option A: Replace with i18n wrapped components**
- Create wrapper components that replace hardcoded text with `t('key')` calls
- Maintain the exact Figma styling while swapping out text content
- Example: Replace `<p>Members in the community</p>` with `<p>{t('home.community.members')}</p>`

**Option B: Create separate Figma designs for each language**
- Import Hindi version of the design
- Switch between designs based on language context
- Less flexible but preserves exact Figma design

**Recommended:** Option A - Gradually replace text in the Figma components with i18n calls

### 2. Make Buttons Interactive
The Figma design includes several buttons that need to be wired up:
- "Register" and "Login" buttons → navigate to auth page
- "Join the Community" → navigate to community page
- "Share your story" → navigate to stories page with upload modal
- "View profile" buttons → navigate to profile page
- Navigation menu items → update routing

### 3. Apply Design System Colors
While the Figma import uses specific colors, you may want to:
- Map Figma colors to your CSS variables where appropriate
- Create a color mapping layer for consistency
- Example: Replace `#388896` with `var(--primary)` where the primary color is used

### 4. Video Integration
The Figma design includes a video element:
```tsx
<video autoPlay className="..." controlsList="nodownload" loop playsInline>
  <source src="/_videos/v1/fa354ed52501118ff5c9557ed256befe125c3fca" />
</video>
```
- Ensure video file is uploaded and accessible
- Consider adding a fallback image for when video fails to load

### 5. Form Functionality
The help center finder section includes input fields that need to be functional:
- Search location field
- Center type dropdown
- Price range selector
- Search button action

## File Structure

```
/imports/
  ├── HomePageDesktop-1-5019.tsx  ← New desktop design (active)
  ├── Homepage.tsx                 ← Mobile design (active)
  ├── svg-b4t3bur0kw.ts           ← SVG paths for new design
  └── (old imports can be removed)

/components/
  ├── HomePageDesktop.tsx         ← Wrapper for desktop (updated)
  └── HomePageMobile.tsx          ← Wrapper for mobile (updated)
```

## Design System Usage

Your globals.css defines:
- Typography: Roboto font family with specific sizes (h1: 64px, h2: 40px, etc.)
- Colors: Primary (#388896), Secondary (#69B57C), etc.
- Spacing: Consistent border radius and shadows
- Font weights: Normal (400), Medium (500), Semibold (600)

To fully integrate, you'll need to gradually replace Figma's inline styles with your design tokens while preserving the visual appearance.

## Important Notes

⚠️ **Do not delete the old import files yet** - Keep them as reference until the new design is fully integrated and tested

⚠️ **Figma design includes its own navigation** - The imported design has a navigation bar built-in, so we've hidden the custom navigation on the home page

⚠️ **Bilingual requirement** - All text in the Figma imports is currently hardcoded in English. This needs to be addressed for the Hindi language support.
