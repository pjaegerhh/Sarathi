/**
 * Type definitions for Comments and Reposts
 */

import { Database } from './supabase';

// Comment type
export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  parent_comment_id?: string | null;
  like_count: number;
  is_flagged: boolean;
  moderation_status: 'pending' | 'approved' | 'rejected' | 'reviewed';
  moderation_reason?: string | null;
  original_language?: string | null;
  translated_text_en?: string | null;
  translated_text_hi?: string | null;
  created_at: string;
  updated_at: string;
  
  // Joined data
  user?: {
    uuid: string;
    first_name?: string;
    name?: string;
    profile_picture_url?: string;
  };
  
  // Client-side only
  isLikedByCurrentUser?: boolean;
  replies?: PostComment[];
  showTranslation?: boolean;
  isTranslating?: boolean;
}

// Comment like type
export interface CommentLike {
  comment_id: string;
  user_id: string;
  created_at: string;
}

// Repost type
export interface Repost {
  id: string;
  original_post_id: string;
  user_id: string;
  repost_comment?: string | null;
  is_flagged: boolean;
  moderation_status: 'pending' | 'approved' | 'rejected' | 'reviewed';
  created_at: string;
  
  // Joined data
  original_post?: {
    id: string;
    user_id: string;
    post_text?: string;
    media_urls?: string[];
    created_at: string;
    user?: {
      uuid: string;
      firstName?: string;
      lastName?: string;
      profile_picture_url?: string;
    };
  };
  
  user?: {
    uuid: string;
    first_name?: string;
    name?: string;
    profile_picture_url?: string;
  };
}

// Extended Post type with new counts
export interface PostWithCounts {
  id: string;
  user_id: string;
  post_text?: string;
  media_urls?: string[];
  created_at: string;
  updated_at: string;
  like_count?: number;
  comment_count?: number;
  repost_count?: number;
  
  // Joined data
  user?: {
    uuid: string;
    first_name?: string;
    name?: string;
    profile_picture_url?: string;
  };
  
  // Client-side only
  isLikedByCurrentUser?: boolean;
  comments?: PostComment[];
  showComments?: boolean;
  isRepostedByCurrentUser?: boolean;
}

// Moderation log type
export interface ModerationLog {
  id: string;
  content_type: 'post' | 'comment' | 'repost_comment';
  content_id: string;
  ai_service?: string;
  is_flagged: boolean;
  confidence_score?: number;
  flagged_categories?: string[];
  original_text?: string;
  detected_language?: string;
  checked_at: string;
}

// Translation cache type
export interface TranslationCache {
  id: string;
  source_text: string;
  source_language: 'en' | 'hi';
  translated_text: string;
  target_language: 'en' | 'hi';
  translation_service?: string;
  created_at: string;
}
