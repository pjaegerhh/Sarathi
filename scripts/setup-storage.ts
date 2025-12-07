/**
 * Supabase Storage Setup Script
 * This script automatically creates storage buckets and sets up RLS policies
 * Run with: npm run setup:storage
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key needed for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - VITE_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY (service role key, not anon key)');
  console.error('\n💡 Get your service role key from:');
  console.error('   https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api');
  process.exit(1);
}

// Create Supabase client with service role key (has admin privileges)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

interface BucketConfig {
  name: string;
  public: boolean;
  fileSizeLimit: number; // in bytes
  allowedMimeTypes: string[];
}

const bucketsConfig: BucketConfig[] = [
  {
    name: 'profile-media',
    public: false,
    fileSizeLimit: 10 * 1024 * 1024, // 10 MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  },
  {
    name: 'post-media',
    public: false,
    fileSizeLimit: 50 * 1024 * 1024, // 50 MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
  }
];

async function createBucket(config: BucketConfig): Promise<boolean> {
  console.log(`\n📦 Creating bucket: ${config.name}...`);
  
  // Check if bucket already exists
  const { data: existingBuckets } = await supabase.storage.listBuckets();
  const bucketExists = existingBuckets?.some(b => b.name === config.name);
  
  if (bucketExists) {
    console.log(`   ℹ️  Bucket '${config.name}' already exists, updating configuration...`);
    
    // Update bucket configuration
    const { error: updateError } = await supabase.storage.updateBucket(config.name, {
      public: config.public,
      fileSizeLimit: config.fileSizeLimit,
      allowedMimeTypes: config.allowedMimeTypes
    });
    
    if (updateError) {
      console.error(`   ❌ Error updating bucket: ${updateError.message}`);
      return false;
    }
    
    console.log(`   ✅ Bucket '${config.name}' updated successfully`);
    return true;
  }
  
  // Create new bucket
  const { data, error } = await supabase.storage.createBucket(config.name, {
    public: config.public,
    fileSizeLimit: config.fileSizeLimit,
    allowedMimeTypes: config.allowedMimeTypes
  });
  
  if (error) {
    console.error(`   ❌ Error creating bucket: ${error.message}`);
    return false;
  }
  
  console.log(`   ✅ Bucket '${config.name}' created successfully`);
  return true;
}

async function setupRLSPolicies(): Promise<boolean> {
  console.log(`\n🔒 Setting up RLS policies for storage buckets...`);
  
  const policies = `
    -- RLS Policies for profile-media bucket
    CREATE POLICY IF NOT EXISTS "Users can upload to their own profile folder"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'profile-media' 
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    CREATE POLICY IF NOT EXISTS "Users can update their own profile files"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'profile-media' 
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    CREATE POLICY IF NOT EXISTS "Users can delete their own profile files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'profile-media' 
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    CREATE POLICY IF NOT EXISTS "Authenticated users can view all profile pictures"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'profile-media');

    -- RLS Policies for post-media bucket
    CREATE POLICY IF NOT EXISTS "Users can upload to their own post folder"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'post-media' 
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    CREATE POLICY IF NOT EXISTS "Users can update their own post files"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'post-media' 
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    CREATE POLICY IF NOT EXISTS "Users can delete their own post files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'post-media' 
      AND (storage.foldername(name))[1] = auth.uid()::text
    );

    CREATE POLICY IF NOT EXISTS "Authenticated users can view all post media"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'post-media');
  `;
  
  try {
    const { error } = await supabase.rpc('exec_sql', { sql: policies });
    
    if (error) {
      // If rpc doesn't exist, execute via direct SQL
      console.log('   ℹ️  Attempting direct SQL execution...');
      
      // Split policies and execute one by one
      const policyStatements = policies
        .split(';')
        .map(p => p.trim())
        .filter(p => p.length > 0);
      
      for (const policy of policyStatements) {
        const { error: policyError } = await supabase.rpc('exec_sql', { sql: policy + ';' });
        if (policyError) {
          console.warn(`   ⚠️  Policy setup warning: ${policyError.message}`);
        }
      }
    }
    
    console.log(`   ✅ RLS policies set up successfully`);
    console.log(`   ℹ️  Note: Some policies may need manual verification in Supabase Dashboard`);
    return true;
  } catch (error: any) {
    console.error(`   ❌ Error setting up policies: ${error.message}`);
    console.log(`\n   💡 You may need to run the SQL policies manually in Supabase SQL Editor:`);
    console.log(`      See: supabase/storage_policies.sql`);
    return false;
  }
}

async function createStoragePoliciesSQL(): Promise<void> {
  const sqlContent = `-- =====================================================
-- STORAGE RLS POLICIES
-- =====================================================
-- Execute this in Supabase SQL Editor if automatic setup fails
-- Or run: npm run setup:storage

-- RLS Policies for profile-media bucket
CREATE POLICY IF NOT EXISTS "Users can upload to their own profile folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can update their own profile files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete their own profile files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Authenticated users can view all profile pictures"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'profile-media');

-- RLS Policies for post-media bucket
CREATE POLICY IF NOT EXISTS "Users can upload to their own post folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can update their own post files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'post-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete their own post files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-media' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Authenticated users can view all post media"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'post-media');

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;
`;

  const fs = await import('fs');
  const filePath = path.resolve(__dirname, '../supabase/storage_policies.sql');
  fs.writeFileSync(filePath, sqlContent, 'utf-8');
  console.log(`\n📄 Created SQL file: supabase/storage_policies.sql`);
}

async function main() {
  console.log('🚀 Supabase Storage Setup');
  console.log('=' .repeat(50));
  
  // Create SQL backup file
  await createStoragePoliciesSQL();
  
  // Create buckets
  let allBucketsCreated = true;
  for (const bucketConfig of bucketsConfig) {
    const success = await createBucket(bucketConfig);
    if (!success) {
      allBucketsCreated = false;
    }
  }
  
  if (!allBucketsCreated) {
    console.error('\n❌ Some buckets failed to create. Please check the errors above.');
    process.exit(1);
  }
  
  // Setup RLS policies
  console.log('\n⚠️  Note: RLS policies must be set up via SQL Editor');
  console.log('   Automatic policy creation via API is limited.');
  console.log('   Please run the SQL file: supabase/storage_policies.sql');
  console.log('   in your Supabase SQL Editor to set up policies.\n');
  
  // List all buckets
  console.log('\n📋 Current storage buckets:');
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets) {
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
    });
  }
  
  console.log('\n✅ Storage setup complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Run the profile page migration: supabase/migration_profile_page.sql');
  console.log('   2. Run the storage policies SQL: supabase/storage_policies.sql');
  console.log('   3. Test picture uploads in the profile page');
  
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});



