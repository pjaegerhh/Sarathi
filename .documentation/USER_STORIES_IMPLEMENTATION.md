# User Stories Feature Implementation

## Overview
This document describes the implementation of the "My Story" feature in the ProfilePage, which allows users to create, edit, view, and delete their personal stories with media (images and videos).

## Database Schema

### New Table: `user_stories`
Location: `supabase/migration_user_stories.sql`

**Structure:**
- `id` (UUID, Primary Key) - Auto-generated unique identifier
- `user_id` (UUID, Foreign Key) - References sarathi_user(uuid)
- `story_text` (TEXT) - The story content
- `media_urls` (TEXT[]) - Array of storage paths to media files
- `created_at` (TIMESTAMPTZ) - Timestamp of creation
- `updated_at` (TIMESTAMPTZ) - Timestamp of last update

**Row Level Security Policies:**
- Users can read their own stories
- Public can read all stories (for viewing other profiles)
- Users can insert/update/delete their own stories

**Storage:**
- Media files are stored in the `profile-media` bucket
- Path format: `{user_id}/{story_id}/{filename}`

## Components

### 1. ViewStoryModal
**Location:** `src/components/ViewStoryModal.tsx`

**Purpose:** Display a user's story in view mode

**Features:**
- Displays media in a responsive grid layout
- Shows story text with proper formatting
- Single media file displays in 16:9 aspect ratio
- Multiple media files display in 1:1 aspect ratio grid
- Video player support with controls
- Clean modal design with close button

### 2. EditStoryModal
**Location:** `src/components/EditStoryModal.tsx`

**Purpose:** Create or edit a user's story

**Features:**
- Upload up to 10 images/videos (50MB max per file)
- File validation (type and size)
- Media preview with remove functionality
- Rich text editor for story content
- Upload progress indicator
- Save, Cancel, and Delete actions
- Supports both creating new stories and editing existing ones

### 3. ProfilePage Updates
**Location:** `src/components/ProfilePage.tsx`

**Changes:**
1. Added story state management:
   - `userStory` - Current user's story data
   - `viewStoryModalOpen` - Controls view modal visibility
   - `editStoryModalOpen` - Controls edit modal visibility

2. Added `fetchUserStory()` function to retrieve story from Supabase

3. Updated "My Story" section:
   - Shows placeholder when no story exists
   - Displays first media thumbnail when story exists
   - Shows story text preview (truncated to 7 lines)
   - Different behavior in view vs edit mode:
     - **View Mode:** Click to open ViewStoryModal
     - **Edit Mode:** Click to open EditStoryModal
   - "Create Your Story" button in edit mode when no story exists
   - "Read More" / "Edit Story" button when story exists

## Translations

**Location:** `src/utils/i18n.ts`

**Added translations (English & Hindi):**
- `myStoryTitle` - Modal title
- `editStory` - Edit button text
- `viewStory` - View button text
- `addMedia` - Media section label
- `uploadPhotos` - Photo upload button
- `uploadVideos` - Video upload button
- `writeYourStory` - Story text label
- `storyPlaceholder` - Text area placeholder
- `noStoryYet` - Empty state title
- `noStoryDescription` - Empty state description
- `createYourStory` - Create button text
- `storyUpdated` - Success message for updates
- `storyCreated` - Success message for creation
- `deleteStory` - Delete button text
- `deleteStoryConfirm` - Delete confirmation message
- `mediaUploaded` - Media upload success message
- `uploadingMedia` - Upload progress message
- `maxFilesReached` - Error for too many files
- `invalidFileType` - Error for wrong file type
- `fileTooLarge` - Error for file size limit

## User Flow

### Viewing a Story (View Mode)
1. User navigates to their profile page
2. If a story exists, they see:
   - First media thumbnail or placeholder
   - Story text preview (first 7 lines)
   - "Read More" button
3. Click anywhere on the story section or "Read More" to open ViewStoryModal
4. Modal shows all media and full story text
5. Click close or outside modal to exit

### Creating/Editing a Story (Edit Mode)
1. User clicks "Edit Profile" button
2. In the "My Story" section:
   - **No Story:** Shows placeholder with "Create Your Story" button
   - **Has Story:** Shows "Edit Story" button
3. Click to open EditStoryModal
4. User can:
   - Upload images/videos (drag preview to remove)
   - Write/edit story text
   - Save changes
   - Delete story (if editing existing)
5. Changes are saved to database
6. Media files uploaded to storage bucket
7. Modal closes and profile refreshes

### Deleting a Story
1. User opens EditStoryModal with existing story
2. Click "Delete Story" button
3. Confirm deletion in browser prompt
4. Story deleted from database
5. Media files removed from storage
6. Profile refreshes showing empty state

## Technical Details

### Media Upload Process
1. User selects files via file input
2. Files validated for type and size
3. Preview generated using `URL.createObjectURL()`
4. On save:
   - Each file uploaded to `profile-media` bucket
   - Path: `{userId}/{storyId}/{timestamp}-{index}.{ext}`
   - Upload progress tracked and displayed
5. Paths stored in `media_urls` array in database

### Media Display
- Uses Supabase storage public URLs
- Video files detected by extension (.mp4, .webm, .ogg)
- Images rendered as `<img>` tags
- Videos rendered with `<video>` controls

### Data Fetching
- Story fetched on component mount and after edits
- Query: Get latest story for current user
- Handles "no rows" case gracefully (empty state)

## Setup Instructions

### 1. Run Database Migration
Execute the SQL in `supabase/migration_user_stories.sql` in the Supabase SQL Editor:
```sql
-- This will create:
-- - user_stories table
-- - RLS policies
-- - Indexes
-- - Triggers
```

### 2. Configure Storage Bucket
Ensure the `profile-media` bucket exists in Supabase Storage with:
- Public access enabled (for viewing)
- Authenticated users can upload
- Max file size: 50MB
- Allowed file types: images/*, video/*

### 3. Test the Feature
1. Navigate to Profile page
2. Click "Edit Profile"
3. Click "Create Your Story" in My Story section
4. Upload media and write story
5. Save and verify it appears correctly
6. Toggle between view and edit modes
7. Test delete functionality

## Notes

- Each user can have multiple stories (ordered by created_at DESC)
- Currently displays only the most recent story
- Media files are NOT automatically deleted when user account is deleted (manual cleanup may be needed)
- Story text and media URLs can be null, but at least one should exist
- Maximum 10 media files per story
- Maximum 50MB per media file

## Future Enhancements

Potential improvements:
1. Multiple stories per user with carousel/pagination
2. Story reactions/likes from other users
3. Comments on stories
4. Share story functionality
5. Story visibility settings (public/private/friends)
6. Rich text editor with formatting options
7. Media editor (crop, filters, etc.)
8. Video thumbnail generation
9. Automatic media optimization/compression
10. Story categories/tags
