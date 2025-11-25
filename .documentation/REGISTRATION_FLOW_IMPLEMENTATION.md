# Registration Flow Implementation

## Overview
A comprehensive 6-step registration wizard that guides users through account creation and profile setup.

## Design Consistency
- Matches the login screen design with the same background image and logo placement
- Left side: Green gradient with Sarathi logo
- Right side: White form area with step-by-step wizard
- Same rounded card container with shadow
- Consistent with overall app design system

## 6-Step Registration Process

### Step 1: Account Credentials
**Fields:**
- Email address (required, validated)
- Phone number (optional, with +91 prefix)
- Password (required, min 6 characters)
- Confirm Password (required, must match)

**Validation:**
- Email format check
- Password length check
- Password match verification

**Purpose:** Create basic authentication credentials

---

### Step 2: Personal Information
**Fields:**
- Full Name (required)
- First Name (required)
- Date of Birth (optional)

**Validation:**
- Full name required
- First name required

**Purpose:** Collect basic personal details

---

### Step 3: User Type Selection
**Options:**
- Amputee
- Prosthetist
- Caregiver
- Doctor
- Practitioner
- Volunteer

**UI:** Card-based selection with checkmark indicator

**Validation:** Must select one type

**Purpose:** Determine user's role in the community for personalized experience

---

### Step 4: Prosthesis Information
**Conditional:** Only shown/required for Amputee users

**Fields:**
- Prosthesis Type (Above Knee / Below Knee)
- Usage Duration (< 6 months / > 1 year / > 5 years)

**UI:** Card-based selection with checkmark indicator

**Validation:** Required if user type is Amputee

**Purpose:** Understand prosthesis usage for better support

---

### Step 5: Challenges & Activities
**Optional step for all users**

**Fields:**
- Main Challenges (array)
  - Add via input field + button
  - Remove by clicking X on pill
  - Press Enter to add
  
- Activities (array)
  - Add via input field + button
  - Remove by clicking X on pill
  - Press Enter to add

**UI:** Pill-style badges for display

**Purpose:** Understand user's journey and interests for community matching

---

### Step 6: Review & Confirm
**Read-only review of all entered information:**
- Email
- Full Name
- First Name
- Phone Number (if provided)
- Date of Birth (if provided)
- User Type (displayed as badge)
- Prosthesis Type (if applicable)
- Usage Duration (if applicable)
- Challenges (if any, displayed as pills)
- Activities (if any, displayed as pills)

**Purpose:** Allow user to verify information before account creation

---

## Features

### Progress Indicator
- Visual progress bar showing current step (1-6)
- Step number displayed: "Step X of 6"
- Filled segments for completed steps

### Navigation
- **Next Button**: Advances to next step (with validation)
- **Back Button**: Returns to previous step (no validation)
- **Finish Button**: Creates account on final step

### Validation
- Step-by-step validation
- Errors displayed inline below fields
- Cannot proceed to next step without valid data
- Red border on invalid fields

### Smart Conditional Logic
- Step 4 (Prosthesis Info) automatically skips for non-amputees
- Shows message: "This section is optional for {userType}s"
- No validation required for optional steps

### Account Creation Process
1. Validates all data on final step
2. Creates Supabase Auth account with email/password
3. Updates user profile in `sarathi_user` table with all additional fields
4. Shows success toast
5. Redirects to home page after 1.5 seconds

## UI Components Used
- Button (primary, outline, icon variants)
- Input (text, email, password, tel, date)
- Label
- Badge (for pills and user type display)
- Card (for selection options)
- Icons: User, Mail, Phone, Calendar, Lock, Check, X, Plus, ArrowRight, ArrowLeft

## Translation Support
All text fully translated in English and Hindi:
- Form labels
- Placeholders
- Button text
- Step titles and subtitles
- User type options
- Validation messages
- Success messages

## Responsive Design
- Mobile-friendly layout
- Adjusts card layout for smaller screens
- Touch-friendly buttons and interactive elements

## Integration Points

### With LoginPage
- "Register Now" link on login page navigates to registration
- "Already have an account? Login" link on registration navigates back to login

### With AuthContext
- Uses `signup(email, password, name, firstName)` for account creation
- Uses `updateProfile(updates)` for profile data
- Handles errors and displays appropriate messages

### With App.tsx
- New route: `register`
- Added to page type union
- Hidden navigation on registration page (like login and admin)
- No authentication required to access registration page

## Database Integration

### Supabase Auth
- Creates user in `auth.users` table
- Stores email and encrypted password
- Returns session upon successful creation

### sarathi_user Table
Profile data stored:
- `email` (from auth)
- `name` (full name)
- `first_name`
- `telephone`
- `user_type` (amputee/prosthetist/caregiver/doctor/practitioner/volunteer)
- `prosthesis_type` (above_knee/below_knee, if applicable)
- `length_usage` (less_than_6_month/more_than_1_year/more_than_5_years, if applicable)
- `main_challenge` (array of strings)
- `activities` (array of strings)

### Automatic Profile Creation
- Trigger in database automatically creates `sarathi_user` entry on auth signup
- Initial entry populated with email from auth
- Additional fields updated via `updateProfile` call

## Error Handling
- Validation errors displayed inline
- Network errors caught and displayed via toast
- Detailed error messages for debugging
- Graceful fallback on failures

## User Experience Flow

1. User clicks "Register Now" on login page
2. Sees Step 1 with progress indicator
3. Fills credentials, clicks Next
4. Validation runs, shows errors if any
5. Proceeds to Step 2 on successful validation
6. Repeats for all steps
7. Can go back to edit previous steps
8. Reviews all information on Step 6
9. Clicks "Confirm and create account"
10. Account created, success toast shown
11. Automatically redirected to home page
12. User is now logged in

## Security Features
- Password minimum length enforced (6 characters)
- Email format validation
- Password confirmation to prevent typos
- Supabase handles password encryption
- RLS policies ensure data security
- Session management handled by Supabase Auth

## Future Enhancements (Optional)
1. Email verification step
2. Phone number verification (OTP)
3. Profile picture upload during registration
4. Terms of Service acceptance checkbox
5. CAPTCHA for bot prevention
6. Social login integration (Google, Facebook, Apple)
7. "Save as draft" for incomplete registrations
8. Progress persistence across sessions
9. Welcome email on successful registration
10. Onboarding tutorial after registration

## Files Modified/Created

### New Files
- `src/components/RegistrationPage.tsx` - Main registration component

### Modified Files
- `src/utils/i18n.ts` - Added registration translation keys
- `src/components/LoginPage.tsx` - Updated "Register Now" link
- `src/App.tsx` - Added registration route

### Translation Keys Added
```typescript
auth: {
  registerNow: string;
  fullName: string;
  dateOfBirth: string;
  confirmPassword: string;
  createAccountSubtitle: string;
  termsOfService: string;
  privacyPolicy: string;
  agreeToTerms: string;
  continueButton: string;
  backButton: string;
  nextButton: string;
  finishButton: string;
}

registration: {
  title: string;
  step: string;
  of: string;
  step1Title - step6Title: string;
  step1Subtitle - step6Subtitle: string;
  selectUserType: string;
  amputee - volunteer: string;
  selectProsthesisType: string;
  selectUsageDuration: string;
  addYourChallenges: string;
  addYourActivities: string;
  typeChallenge: string;
  typeActivity: string;
  reviewYourInfo: string;
  confirmAndCreate: string;
  accountCreated: string;
  accountCreatedMessage: string;
  // ... and more
}
```

## Testing Checklist
- [x] Step 1 validation (email, password)
- [x] Step 2 validation (names)
- [x] Step 3 user type selection
- [x] Step 4 conditional logic (amputee vs others)
- [x] Step 5 add/remove pills
- [x] Step 6 review display
- [x] Back button navigation
- [x] Next button validation
- [x] Account creation
- [x] Profile update
- [x] Success toast
- [x] Redirect to home
- [x] Auto-login after registration
- [x] Translation switching
- [x] Mobile responsiveness
- [x] Error handling
- [x] Link from login page
- [x] Link back to login page

## Success Metrics
- Smooth multi-step flow
- Clear progress indication
- Helpful validation messages
- Quick account creation
- Seamless login after registration
- Complete profile data captured
- Beautiful, consistent UI

