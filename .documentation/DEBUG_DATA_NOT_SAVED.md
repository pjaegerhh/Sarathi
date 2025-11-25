# 🔍 Debugging: Data Not Saved to sarathi_user Table

## Added Extensive Logging

I've added detailed console logging to the registration process. When you register a new user, check the browser console for these logs:

### Expected Log Sequence:
```
✅ User created in auth.users: [uuid]
⏳ Waiting for trigger to create sarathi_user entry...
🔍 Existing user check: { exists: true/false, error: ... }
📝 Attempting to update profile with: { name: "...", first_name: "...", telephone: "..." }
📊 Update result: { data: [...], error: null }
✅ Profile updated successfully!
```

### If Update Fails:
```
❌ Error updating profile: [error details]
⚠️ date_of_birth column not found, retrying without it...
🔄 Retry result: { data: [...], error: ... }
```

## Possible Issues & Solutions

### Issue 1: Trigger Not Creating Entry
**Symptom:** `🔍 Existing user check: { exists: false }`

**Cause:** The trigger `on_auth_user_created` isn't working

**Solution:** Run this SQL in Supabase:

```sql
-- Recreate the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.sarathi_user (uuid, email, user_type)
    VALUES (
        NEW.id,
        NEW.email,
        'amputee'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
```

### Issue 2: RLS Policy Blocking Update
**Symptom:** `📊 Update result: { error: "permission denied" }`

**Cause:** RLS policy requires `auth.uid() = uuid` but session not fully established

**Solution:** Check if user is authenticated during update:

```sql
-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'sarathi_user';
```

### Issue 3: date_of_birth Column Missing
**Symptom:** `⚠️ date_of_birth column not found, retrying without it...`

**Solution:** Add the column:

```sql
ALTER TABLE public.sarathi_user
ADD COLUMN IF NOT EXISTS date_of_birth DATE;
```

## 🔧 Debug in Supabase Dashboard

### Step 1: Check if Trigger Works
Run `supabase/debug_user_creation.sql` in SQL Editor to check:
1. Does trigger function exist?
2. Is trigger active?
3. Are there orphaned users (in auth.users but not sarathi_user)?

### Step 2: Check Recent Users
```sql
-- See recent auth users
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;

-- See recent sarathi users
SELECT uuid, email, name, first_name, telephone
FROM public.sarathi_user
ORDER BY created_at DESC
LIMIT 5;
```

### Step 3: Manually Create Missing Entries
If you find orphaned users:

```sql
-- Replace <user_id> and <email> with actual values
INSERT INTO public.sarathi_user (uuid, email, user_type)
VALUES ('<user_id>', '<email>', 'amputee');
```

## 🧪 Test Steps

1. **Open Browser Console** (F12)
2. **Clear console** (to see fresh logs)
3. **Try registering a new user**
4. **Watch console logs carefully**
5. **Copy all logs and share** if issue persists

## Quick Checks

### A. Is user created in auth.users?
```sql
SELECT * FROM auth.users WHERE email = 'test@example.com';
```

### B. Is user created in sarathi_user?
```sql
SELECT * FROM public.sarathi_user WHERE email = 'test@example.com';
```

### C. Can you manually update?
```sql
UPDATE public.sarathi_user
SET name = 'Test User', first_name = 'Test', telephone = '1234567890'
WHERE email = 'test@example.com';
```

If manual update works but code doesn't → RLS or authentication issue  
If manual update fails → Column or permission issue  
If user not in sarathi_user → Trigger issue

---

**Next Step:** Register a new test user and share the console logs!




