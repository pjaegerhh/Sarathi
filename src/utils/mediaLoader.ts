/**
 * Media Loader Utility
 * Handles loading media with caching
 */

import { supabase } from '../lib/supabase';
import { mediaCache } from '../services/mediaCache';

/**
 * Load a signed URL for a media file, using cache if available
 */
export async function loadSignedUrl(
  bucket: string,
  path: string
): Promise<string | null> {
  try {
    // Check if it's already a full URL
    if (path.startsWith('http')) {
      return path;
    }

    // Check cache first
    const cachedUrl = mediaCache.get(bucket, path);
    if (cachedUrl) {
      return cachedUrl;
    }

    // Not in cache, fetch from Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 3600);

    if (error) {
      return null;
    }

    if (data?.signedUrl) {
      // Store in cache
      mediaCache.set(bucket, path, data.signedUrl);
      return data.signedUrl;
    }

    return null;
  } catch (error) {
    console.error('Error in loadSignedUrl:', error);
    return null;
  }
}

/**
 * Load multiple signed URLs in parallel with caching
 */
export async function loadSignedUrls(
  items: Array<{ bucket: string; path: string }>
): Promise<Array<string | null>> {
  return Promise.all(
    items.map(({ bucket, path }) => loadSignedUrl(bucket, path))
  );
}

/**
 * Determine bucket from path and load signed URL
 */
export async function loadMediaUrl(mediaPath: string): Promise<string | null> {
  try {
    // Check if it's already a full URL
    if (mediaPath.startsWith('http')) {
      return mediaPath;
    }

    // Determine the bucket based on path patterns
    let bucket = 'post-media';
    let cleanPath = mediaPath;

    // If path starts with bucket name, extract it
    if (mediaPath.startsWith('post-media/')) {
      bucket = 'post-media';
      cleanPath = mediaPath.replace('post-media/', '');
    } else if (mediaPath.startsWith('profile-media/')) {
      bucket = 'profile-media';
      cleanPath = mediaPath.replace('profile-media/', '');
    } else if (
      // Profile/cover pics are stored in profile-media as {userId}/profile-*.jpg or {userId}/cover-*.jpg
      /\/profile-/.test(mediaPath) ||
      /\/cover-/.test(mediaPath)
    ) {
      bucket = 'profile-media';
      cleanPath = mediaPath;
    }

    return loadSignedUrl(bucket, cleanPath);
  } catch (error) {
    console.error('Error in loadMediaUrl:', error);
    return null;
  }
}
