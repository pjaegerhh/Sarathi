# 
## Version 1.4.14
**Date:** 01.11.2025
**Branch:** testing

### Changes
- **Major Homepage Refactor**: Split monolithic ContentSections into individual modular components
  - Created `contentsections/` subfolder with separate files for each section
  - Extracted HeroSection, QuoteSection, ServicesSection, ProsthesisSection, HelpCenterFinderSection, ServiceCentersSection, ShareStorySection, CommunitySection, ClosingCTASection, FooterSection
  - Updated HomePageDesktop and HomePageMobile to use new modular structure
- **Complete Translation System**: Added comprehensive English and Hindi translations for all homepage content
  - Added 50+ new translation keys for all sections
  - Ensured Hindi translations don't break layouts with proper wrapping
  - All hardcoded text replaced with translation keys
- **Layout Improvements**:
  - Fixed section dimensions and centering (1146px width, specific heights)
  - Improved spacing between sections (75px vertical gap)
  - Fixed footer layout to handle longer Hindi text with flexible wrapping
  - Updated ProsthesisSection to allow text wrapping for Hindi
- **Component Enhancements**:
  - Added hover effects to buttons (color inversion on hover)
  - Updated ServicesSection cards with proper images (training.png, rehabilitation.png)
  - Aligned TrainingCard and RehabilitationCard layouts
  - Added hover effects that change card background colors
  - Improved carousel implementations with proper infinite scrolling
- **Asset Management**:
  - Organized images into `assets/images/` folder
  - Organized SVGs into `assets/svg/` folder
  - Added new images and SVG icons for all sections
  - Removed old hash-based asset files

### Technical Improvements
- Improved code organization and maintainability
- Better separation of concerns with individual component files
- Enhanced TypeScript type safety
- Optimized component structure for better performance

---

Sarathi Project - Version History

## Version 1.0.0 - Initial Release
**Date:** December 2024
**Branch:** main

### Initial Features
- Complete React application setup with TypeScript
- Multi-language support with internationalization
- Authentication system with Supabase integration
- Responsive design for desktop and mobile
- Community features and user profiles
- Admin dashboard functionality
- Story management system
- Modern UI components with Radix UI and Tailwind CSS

### Technical Stack
- React 18 with TypeScript
- Vite for build tooling
- Supabase for backend services
- Tailwind CSS for styling
- Radix UI for accessible components
- React Router for navigation

### Project Structure
- Organized component architecture
- Context-based state management
- Modular styling system
- Comprehensive design system guidelines
- Asset management for images and videos

---
## Version 1.4.13
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.12
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.11
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.10
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.9
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.8
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.7
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.6
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.5
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.4
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.3
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.2
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.1
**Date:** 26.10.2025
**Branch:** testing

### Changes
- [Add description of changes here]

---


## Version 1.4.0
**Date:** 26.10.2025
**Branch:** main

### Changes
- [Add description of changes here]

---


## Version 1.3.0
**Date:** 25.10.2025
**Branch:** main

### Changes
- [Add description of changes here]

---


## Version 1.2.0
**Date:** 25.10.2025
**Branch:** main

### Changes
- [Add description of changes here]

---



## Version Management Rules

### Branch Strategy
- **main**: Production-ready code, version bumps by 0.1.0
- **testing**: Test environment, version bumps by 0.0.1  
- **pj-working**: Development branch, no automatic version bumps

### Version Bumping
- Commits to `testing` branch: +0.0.1 (patch)
- Commits to `main` branch: +0.1.0 (minor)
- Major releases: +1.0.0 (major)

### Change Tracking
All significant changes should be documented in this file with:
- Version number
- Date
- Branch
- Feature additions
- Bug fixes
- Breaking changes
- Technical improvements
