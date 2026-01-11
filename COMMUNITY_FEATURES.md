# Community Features Implementation Summary

## Overview
This document provides a comprehensive guide to the Facebook-like community features implemented in the Sarathi application, including @mention functionality for tagging users in posts.

## Features Implemented

### 1. Posts System
- **Create Posts**: Users can create posts with text and/or media (images/videos)
- **@Mention Users**: Type @ to search and mention other users in posts
- **View Posts**: Feed showing posts from user, direct connections, and 2nd degree connections
- **Like Posts**: Users can like/unlike posts with real-time counter
- **Delete Posts**: Users can delete their own posts
- **Media Support**: Multiple images/videos per post (up to 10 files, 50MB each)

### 2. Connections System
- **Send Connection Requests**: Search for users and send friend requests
- **Accept/Decline Requests**: Manage incoming connection requests
- **View Connections**: List of all accepted connections
- **Remove Connections**: Ability to unfriend users
- **Bidirectional System**: Connections work both ways
- **Integrated on Profile Page**: Connections list and search on user profile

### 3. Privacy & Visibility
- Posts are visible to:
  - The post author
  - Direct connections (1st degree)
  - Friends of friends (2nd degree connections)
- RLS (Row Level Security) policies ensure data privacy

## Database Schema

### Tables Created

#### 1. `posts` Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to sarathi_user)
- post_text (TEXT, nullable)
- media_urls (TEXT[], nullable)
- like_count (INTEGER, default 0)
- comment_count (INTEGER, default 0 - for future use)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

#### 2. `post_likes` Table
```sql
- post_id (UUID, Foreign Key to posts)
- user_id (UUID, Foreign Key to sarathi_user)
- created_at (TIMESTAMPTZ)
- PRIMARY KEY (post_id, user_id)
```

#### 3. `connections` Table
```sql
- id (UUID, Primary Key)
- requester_id (UUID, Foreign Key to sarathi_user)
- addressee_id (UUID, Foreign Key to sarathi_user)
- status (TEXT: 'pending', 'accepted', 'declined', 'blocked')
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

### Storage Buckets

#### `post-media`
- Stores post images and videos
- Structure: `{user_id}/{post_id}/{filename}`
- Max file size: 50MB
- Allowed types: images/*, video/*

## Components Created

### Core Components

1. **PostCard** (`src/components/community/PostCard.tsx`)
   - Displays individual posts
   - Like/unlike functionality
   - Delete own posts
   - Media gallery with lightbox
   - Time formatting
   - Renders @mentions

2. **CreatePost** (`src/components/community/CreatePost.tsx`)
   - Text input for post content
   - **@Mention functionality** - Type @ to search users
   - Dropdown suggestion list with keyboard navigation
   - Multiple media upload with preview
   - File validation (type, size)
   - Progress indicators

3. **ConnectionSearch** (`src/components/community/ConnectionSearch.tsx`)
   - Search users by name or email
   - Send connection requests
   - Accept/decline incoming requests
   - Connection status indicators

4. **ConnectionsList** (`src/components/community/ConnectionsList.tsx`)
   - Tabbed interface (Connections / Requests)
   - List all accepted connections
   - Manage pending requests
   - Remove connections

### Page Updates

1. **CommunityPage** (`src/components/CommunityPage.tsx`)
   - Post feed with infinite scroll
   - Create post interface with mentions
   - Load more functionality
   - Empty states

2. **ProfilePage** (`src/components/ProfilePage.tsx`)
   - **Integrated ConnectionsList** - View and manage connections
   - **Integrated ConnectionSearch** - Find and add new connections
   - **Integrated CreatePost** - Create posts directly from profile
   - Replaced placeholder sections with real components

## Installation & Setup

### Step 1: Run Database Migration

Execute the SQL migration in Supabase SQL Editor:

```bash
# File: supabase/migration_community_features.sql
```

This will create:
- All necessary tables
- RLS policies
- Indexes for performance
- Helper functions
- Triggers for auto-updating counts

### Step 2: Create Storage Bucket

In Supabase Dashboard:
1. Go to Storage
2. Create new bucket named `post-media`
3. Set as **Private** (RLS will handle access)
4. Configure max file size: 50MB
5. Allowed MIME types: image/*, video/*

### Step 3: Verify RLS Policies

Ensure these policies are active:
- Posts: Read (with connection visibility), Insert, Update, Delete own
- Post Likes: Read, Insert, Delete own
- Connections: Read own, Insert requests, Update (addressee), Delete own
- Storage: Upload to own folder, Delete own files, Read accessible files

## API Usage Examples

### Creating a Post

```typescript
const { error } = await supabase
  .from('posts')
  .insert({
    id: postId,
    user_id: user.id,
    post_text: 'Hello world!',
    media_urls: ['path/to/image.jpg'],
  });
```

### Liking a Post

```typescript
const { error } = await supabase
  .from('post_likes')
  .insert({
    post_id: postId,
    user_id: user.id,
  });
```

### Sending Connection Request

```typescript
const { error } = await supabase
  .from('connections')
  .insert({
    requester_id: user.id,
    addressee_id: targetUserId,
    status: 'pending',
  });
```

### Accepting Connection

```typescript
const { error } = await supabase
  .from('connections')
  .update({ status: 'accepted' })
  .eq('id', connectionId);
```

## Translations

All UI text is internationalized in `src/utils/i18n.ts` under the `community` section.

Supported languages:
- English (en)
- Hindi (hi)

Key translation groups:
- Feed & Posts
- Likes & Comments
- Connections
- Time formatting
- Error messages

## Security Considerations

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only see/interact with content they have permission for
- Connections establish visibility relationships

### Media Upload
- Files validated on client side (type, size)
- Storage policies enforce user-owned folders
- Signed URLs expire after 1 hour

### SQL Injection Prevention
- All queries use parameterized statements
- Supabase client handles sanitization

## Performance Optimizations

### Indexes
- `posts(user_id, created_at DESC)` - Fast user feed queries
- `posts(created_at DESC)` - General feed sorting
- `post_likes(post_id)` - Like count aggregation
- `post_likes(user_id)` - User like history
- `connections(requester_id, status)` - Connection lookups
- `connections(addressee_id, status)` - Reverse lookups

### Denormalization
- `like_count` stored on posts table
- Updated via database triggers
- Reduces join queries

### Pagination
- Loads 10 posts per page
- "Load More" button for additional posts
- Prevents large initial data transfer

## Future Enhancements

### Planned Features
1. **Comments System**
   - Nested comments on posts
   - Like comments
   - Edit/delete own comments

2. **Notifications**
   - New connection requests
   - Post likes
   - Comments on posts
   - Connection accepts

3. **Rich Media**
   - Image filters/editors
   - Video trimming
   - GIF support

4. **Privacy Controls**
   - Public/private posts
   - Block users
   - Hide posts from specific users

5. **Search & Discovery**
   - Search posts by content
   - Trending posts
   - Suggested connections

6. **Groups**
   - Create/join groups
   - Group-specific posts
   - Group admin roles

## Troubleshooting

### Posts Not Showing
1. Verify RLS policies are active
2. Check connection relationships in database
3. Ensure user is authenticated

### Media Upload Fails
1. Check file size (<50MB)
2. Verify file type (image/* or video/*)
3. Ensure `post-media` bucket exists
4. Check storage policies

### Connection Requests Not Working
1. Verify connections table exists
2. Check RLS policies
3. Ensure no duplicate connection attempts

## Support

For issues or questions:
1. Check Supabase logs for errors
2. Review browser console for client-side issues
3. Verify all migrations have been run
4. Check RLS policies in Supabase Dashboard

## Version History

- **v1.0** (Current) - Initial implementation
  - Posts with text and media
  - Like system
  - Connection system (friend requests)
  - Privacy via RLS
  - Internationalization (EN/HI)

