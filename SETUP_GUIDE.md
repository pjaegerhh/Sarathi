# Quick Start Guide - Community Features

## Prerequisites
Before you begin, ensure:
- Supabase project is set up
- Authentication is working
- You have admin access to Supabase Dashboard

## Setup Steps

### Step 1: Database Setup (5 minutes)

1. **Open Supabase SQL Editor**
   - Go to your Supabase project
   - Navigate to SQL Editor

2. **Run Migration**
   - Copy entire content from `supabase/migration_community_features.sql`
   - Paste into SQL Editor
   - Click "Run"
   - Wait for all statements to execute (should show success)

3. **Verify Tables Created**
   - Go to Table Editor
   - You should see new tables:
     - `posts`
     - `post_likes`
     - `connections`

### Step 2: Storage Setup (2 minutes)

1. **Create Storage Bucket**
   - Go to Storage in Supabase Dashboard
   - Click "Create bucket"
   - Name: `post-media`
   - Public: **OFF** (leave unchecked)
   - File size limit: 50 MB
   - Allowed MIME types: Leave default (or set to `image/*,video/*`)
   - Click "Create bucket"

2. **Verify Storage Policies**
   - The migration should have created policies automatically
   - If not, check the migration file for storage policy SQL

### Step 3: Verify Installation

1. **Check RLS Policies**
   ```sql
   -- Run in SQL Editor to list policies
   SELECT tablename, policyname, permissive, roles, cmd, qual 
   FROM pg_policies 
   WHERE tablename IN ('posts', 'post_likes', 'connections');
   ```

2. **Test Storage Access**
   - Try uploading a test file through Supabase Dashboard
   - Path should be: `{your-user-id}/test/image.jpg`

### Step 4: Frontend Integration

The following components are already created and ready to use:

#### Components Available:
- **PostCard** - Display individual posts
- **CreatePost** - Create new posts with media
- **ConnectionSearch** - Search and connect with users
- **ConnectionsList** - Manage connections
- **CommunityPage** - Main feed (already integrated!)

#### To Add Connections to ProfilePage:

1. Open `src/components/ProfilePage.tsx`

2. Import components at the top:
```typescript
import { ConnectionsList } from './community/ConnectionsList';
import { ConnectionSearch } from './community/ConnectionSearch';
```

3. Add a "Connections" section:
```typescript
{/* Connections Section */}
<div style={{ marginTop: '24px' }}>
  <h3 style={{ marginBottom: '16px' }}>Connections</h3>
  <ConnectionsList />
  <div style={{ marginTop: '16px' }}>
    <ConnectionSearch />
  </div>
</div>
```

#### To Add Post Creation to ProfilePage:

1. Import CreatePost:
```typescript
import { CreatePost } from './community/CreatePost';
```

2. Add where "Make a post" section is:
```typescript
{/* Make a Post Section */}
<CreatePost onPostCreated={() => {
  // Optionally navigate to community page
  onNavigate('community');
}} />
```

### Step 5: Test Everything

1. **Test Post Creation**
   - Navigate to Community page
   - Create a post with text only
   - Create a post with images
   - Create a post with videos
   - Verify posts appear in feed

2. **Test Likes**
   - Like your own post
   - Unlike it
   - Verify counter updates

3. **Test Connections**
   - Create a second test user
   - Search for the user
   - Send connection request
   - Log in as second user
   - Accept the request
   - Verify both users are connected

4. **Test Post Visibility**
   - Create post as User A
   - Verify User B (connected) can see it
   - Create User C (not connected)
   - Verify User C cannot see the post

### Step 6: Optional Enhancements

#### Add Notification Badge for Connection Requests

```typescript
// In your navigation component
const [pendingCount, setPendingCount] = useState(0);

useEffect(() => {
  if (user) {
    loadPendingCount();
  }
}, [user]);

const loadPendingCount = async () => {
  const { count } = await supabase
    .from('connections')
    .select('*', { count: 'exact', head: true })
    .eq('addressee_id', user.id)
    .eq('status', 'pending');
    
  setPendingCount(count || 0);
};

// Show badge
{pendingCount > 0 && <span className="badge">{pendingCount}</span>}
```

## Common Issues & Solutions

### Issue: "Posts not showing"
**Solution**: 
- Check if users are connected
- Verify RLS policies are active
- Check browser console for errors

### Issue: "Media upload fails"
**Solution**:
- Verify `post-media` bucket exists
- Check file size (<50MB)
- Verify file type is image or video

### Issue: "Connection request not working"
**Solution**:
- Check connections table exists
- Verify no duplicate connections (unique constraint)
- Check RLS policies

### Issue: "Like button not working"
**Solution**:
- Check post_likes table exists
- Verify trigger for like_count is active
- Check browser console for errors

## Performance Tips

1. **Enable Indexes** (Already done in migration)
   - Posts indexed on user_id and created_at
   - Likes indexed on post_id and user_id
   - Connections indexed on both user IDs

2. **Optimize Images**
   - Consider compressing images on client before upload
   - Use responsive images for different screen sizes

3. **Caching**
   - Implement React Query for caching post data
   - Cache connection status to reduce queries

## Security Checklist

- [x] RLS enabled on all tables
- [x] Storage policies restrict to user folders
- [x] No direct database access from client
- [x] Signed URLs for media with expiration
- [x] Input validation on all forms
- [x] File type and size validation

## Next Steps

1. **Deploy to Production**
   - Run migration on production database
   - Create production storage bucket
   - Test with real users

2. **Monitor Performance**
   - Check query performance in Supabase Dashboard
   - Monitor storage usage
   - Set up error logging

3. **Add Features**
   - Comments system
   - Notifications
   - Search functionality
   - User profiles

## Support

If you encounter any issues:
1. Check Supabase logs (Logs Explorer)
2. Review browser console errors
3. Verify all migration steps completed
4. Check COMMUNITY_FEATURES.md for detailed documentation

## Quick Links

- **Database Migration**: `supabase/migration_community_features.sql`
- **Full Documentation**: `COMMUNITY_FEATURES.md`
- **Components**: `src/components/community/`
- **Translations**: `src/utils/i18n.ts` (community section)

---

**Estimated Setup Time**: 10-15 minutes
**Difficulty**: Intermediate
**Status**: ✅ Ready for Production


