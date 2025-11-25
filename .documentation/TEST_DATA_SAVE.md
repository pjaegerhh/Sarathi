# Simple Test - Does Data Save?

## Test Registration

1. **Open browser console** (F12)
2. **Register a new test user** with:
   - First name: Test
   - Last name: User
   - Email: test123@example.com
   - Date of birth: 1990-01-01
   - Phone: 1234567890
   - Password: Test123!@#

3. **Watch console logs** - you should see:
   ```
   ✅ User created in auth.users: [uuid]
   ⏳ Waiting for trigger to create sarathi_user entry...
   🔍 Existing user check: { exists: true/false }
   
   If exists: true
     📝 Attempting to update profile with: { name, first_name, telephone, date_of_birth }
     📊 Update result: { data: [...], error: null }
     ✅ Profile updated successfully!
   
   If exists: false
     ❌ Trigger did not create user row! Creating manually...
     ✅ Manually created user row with all data
   ```

4. **Check Supabase Dashboard**:
   - Go to Table Editor → `sarathi_user`
   - Find the row with email `test123@example.com`
   - **ALL fields should be populated**:
     - ✅ uuid
     - ✅ email
     - ✅ name: "Test User"
     - ✅ first_name: "Test"
     - ✅ telephone: "1234567890"
     - ✅ date_of_birth: "1990-01-01"
     - ✅ user_type: "amputee"

## If Data is Still Not Saved

### Check 1: RLS Policies
The UPDATE might be blocked. Run this:

```sql
-- Check what's blocking
SELECT * FROM pg_policies WHERE tablename = 'sarathi_user';

-- See if you can manually update
UPDATE public.sarathi_user
SET name = 'Manual Test', first_name = 'Manual'
WHERE email = 'test123@example.com';

-- If manual update works but code doesn't -> RLS issue
-- If manual update fails -> permission issue
```

### Check 2: Look at Raw Data
```sql
SELECT 
    uuid,
    email,
    name,
    first_name,
    telephone,
    date_of_birth,
    user_type,
    created_at
FROM public.sarathi_user
WHERE email LIKE '%test%'
ORDER BY created_at DESC;
```

## The New Logic

The code now:
1. Waits 2 seconds (not 1) for trigger
2. If row doesn't exist, **creates it with ALL data** (doesn't rely on trigger)
3. If row exists, updates it

This should work regardless of whether the trigger works or not.

---

**Try registering now and share the console logs!**




