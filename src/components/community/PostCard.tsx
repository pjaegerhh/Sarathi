import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { loadSignedUrl } from '../../utils/mediaLoader';
import { Comments } from './Comments';
import { RepostButton } from './RepostButton';
import { FeelingPicker, ReactionType, getReactionEmoji, getReactionLabel } from './FeelingPicker';
import { LocationModal } from './LocationModal';
import { MediaUploadModal } from './MediaUploadModal';
import { Lightbox } from './Lightbox';
import { MessageCircle, MapPin, Image as ImageIcon, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

interface Post {
  id: string;
  user_id: string;
  post_text: string | null;
  media_urls: string[] | null;
  like_count: number;
  comment_count?: number;
  repost_count?: number;
  created_at: string;
  user_name: string;
  user_first_name: string;
  user_profile_picture: string | null;
  location?: string | null;
  reaction_type?: string | null;
  mentioned_display_names?: string[] | null;
}

interface PostCardProps {
  post: Post;
  onPostDeleted?: () => void;
  onPostUpdated?: () => void;
  onNavigate?: (page: string, data?: any) => void;
  readOnly?: boolean;
  onPostClick?: (postId: string) => void;
  isMobile?: boolean;
}

export function PostCard({ post, onPostDeleted, onPostUpdated, onNavigate, readOnly = false, onPostClick, isMobile = false }: PostCardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [commentCount, setCommentCount] = useState(post.comment_count || 0);
  const [repostCount, setRepostCount] = useState(post.repost_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<{ [key: string]: string }>({});
  const [thumbnailUrls, setThumbnailUrls] = useState<{ [key: string]: string }>({});
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.post_text || '');
  const [editLocation, setEditLocation] = useState(post.location || '');
  const [currentLocation, setCurrentLocation] = useState<string | null>(post.location || null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>((post.reaction_type as ReactionType) || null);
  const [showReactionTooltip, setShowReactionTooltip] = useState(false);
  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);
  const [editMediaFiles, setEditMediaFiles] = useState<File[]>([]);
  const [editMediaPreviews, setEditMediaPreviews] = useState<string[]>([]);
  const [editExistingMedia, setEditExistingMedia] = useState<string[]>(post.media_urls || []);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Check if user has liked this post
  useEffect(() => {
    checkIfLiked();
    loadMediaUrls();
    loadProfilePicture();
  }, [post.id]);

  const checkIfLiked = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', post.id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!error && data) {
      setIsLiked(true);
    }
  };

  const loadMediaUrls = async () => {
    if (!post.media_urls) return;

    const fullUrls: { [key: string]: string } = {};
    const thumbUrls: { [key: string]: string } = {};
    
    for (const path of post.media_urls) {
      const isVideo = path.match(/\.(mp4|webm|ogg)$/i);
      
      if (isVideo) {
        // Videos don't have thumbnails - use cache
        const signedUrl = await loadSignedUrl('post-media', path);

        if (signedUrl) {
          fullUrls[path] = signedUrl;
          thumbUrls[path] = signedUrl; // Same for video
        }
      } else {
        // Load full size for lightbox - use cache
        const fullUrl = await loadSignedUrl('post-media', path);

        if (fullUrl) {
          fullUrls[path] = fullUrl;
        }

        // Load thumbnail for feed (derive path by replacing /full/ with /thumbnails/) - use cache
        const thumbPath = path.replace('/full/', '/thumbnails/');
        const thumbUrl = await loadSignedUrl('post-media', thumbPath);

        if (thumbUrl) {
          thumbUrls[path] = thumbUrl;
        } else {
          // Fallback to full image if thumbnail doesn't exist (for old posts)
          thumbUrls[path] = fullUrls[path] || '';
        }
      }
    }

    setMediaUrls(fullUrls);
    setThumbnailUrls(thumbUrls);
  };

  const loadProfilePicture = async () => {
    if (!post.user_profile_picture) return;

    // Check if it's already a full URL (signed URL from another component)
    if (post.user_profile_picture.startsWith('http')) {
      setProfilePictureUrl(post.user_profile_picture);
      return;
    }

    // Use cache
    const signedUrl = await loadSignedUrl('profile-media', post.user_profile_picture);

    if (signedUrl) {
      setProfilePictureUrl(signedUrl);
    }
  };

  const handleLike = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        // Like
        const { error } = await supabase
          .from('post_likes')
          .insert({
            post_id: post.id,
            user_id: user.id,
          });

        if (error) throw error;

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      alert(t.community.failedToLikePost);
    }
  };

  const handleDelete = async () => {
    if (!user || user.id !== post.user_id) return;

    setIsDeleting(true);

    try {
      // Delete media files from storage
      if (post.media_urls) {
        for (const path of post.media_urls) {
          await supabase.storage.from('post-media').remove([path]);
        }
      }

      // Delete post
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      if (onPostDeleted) {
        onPostDeleted();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(t.common.error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleEdit = async () => {
    if (!user || user.id !== post.user_id) return;

    try {
      // Upload new media files if any
      let newMediaUrls: string[] = [];
      if (editMediaFiles.length > 0) {
        setIsUploadingMedia(true);
        for (let i = 0; i < editMediaFiles.length; i++) {
          const file = editMediaFiles[i];
          setUploadProgress(`Uploading media ${i + 1} of ${editMediaFiles.length}...`);
          
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Date.now()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading media:', uploadError);
            setIsUploadingMedia(false);
            throw uploadError;
          }

          newMediaUrls.push(filePath);
        }
        setIsUploadingMedia(false);
        setUploadProgress('');
      }

      // Combine existing media URLs with new ones
      const updatedMediaUrls = [
        ...editExistingMedia,
        ...newMediaUrls
      ];

      const { error } = await supabase
        .from('posts')
        .update({ 
          post_text: editText,
          location: editLocation || null,
          media_urls: updatedMediaUrls.length > 0 ? updatedMediaUrls : null
        })
        .eq('id', post.id)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local post object
      post.post_text = editText;
      post.location = editLocation || null;
      post.media_urls = updatedMediaUrls.length > 0 ? updatedMediaUrls : null;

      // Clean up previews
      editMediaPreviews.forEach(url => URL.revokeObjectURL(url));
      setEditMediaPreviews([]);
      setEditMediaFiles([]);
      setEditExistingMedia(updatedMediaUrls);
      setIsEditing(false);
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Error editing post:', error);
      alert(t.community.failedToEditPost);
    }
  };

  const handleReaction = async (reaction: ReactionType) => {
    if (!user) return;

    try {
      // Check if user already has a reaction
      const { data: existingReaction } = await supabase
        .from('post_reactions')
        .select('*')
        .eq('post_id', post.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingReaction) {
        // Update existing reaction
        const { error } = await supabase
          .from('post_reactions')
          .update({ reaction_type: reaction })
          .eq('post_id', post.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new reaction
        const { error } = await supabase
          .from('post_reactions')
          .insert({
            post_id: post.id,
            user_id: user.id,
            reaction_type: reaction,
          });

        if (error) throw error;
      }

      setCurrentReaction(reaction);
      setShowFeelingPicker(false);
      setShowFeelingModal(false);
    } catch (error) {
      console.error('Error adding reaction:', error);
      alert(t.community.failedToReact);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffMs / 604800000);

    if (diffMins < 1) return t.community.justNow;
    if (diffMins < 60) return `${diffMins}${t.community.minutesAgo}`;
    if (diffHours < 24) return `${diffHours}${t.community.hoursAgo}`;
    if (diffDays < 7) return `${diffDays}${t.community.daysAgo}`;
    return `${diffWeeks}${t.community.weeksAgo}`;
  };

  // Parse and render @mentions in post text; only bold when mention matches a real user
  const renderPostText = (text: string, validMentions?: string[] | null) => {
    const mentionRegex = /@(\w+\s+\w+)(?=\s|$|[.,!?;:])/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;
    let keyIndex = 0;
    const validSet = new Set((validMentions || []).map((s) => s.trim().toLowerCase()));

    while ((match = mentionRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${keyIndex++}`} style={{ fontWeight: 'normal' }}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }
      const displayName = match[1].trim();
      const isResolved = validSet.has(displayName.toLowerCase());
      parts.push(
        <span key={`mention-${keyIndex++}`} style={{ fontWeight: isResolved ? 'bold' : 'normal' }}>
          {displayName}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${keyIndex++}`} style={{ fontWeight: 'normal' }}>
          {text.substring(lastIndex)}
        </span>
      );
    }
    return parts.length > 0 ? <>{parts}</> : text;
  };

  const isOwnPost = user?.id === post.user_id;

  return (
    <div
      onClick={() => {
        if (readOnly && onPostClick) {
          onPostClick(post.id);
        }
      }}
      style={{
        background: '#ffffff',
        borderRadius: isMobile ? '16px' : '20px',
        padding: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '12px' : '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        cursor: readOnly ? 'pointer' : 'default',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? '12px' : '16px' }}>
        {/* Profile Picture */}
        <div
          onClick={() => {
            if (onNavigate) {
              onNavigate('user-profile', { userId: post.user_id, previousPage: 'community' });
            }
          }}
          style={{
            width: isMobile ? '40px' : '48px',
            height: isMobile ? '40px' : '48px',
            borderRadius: '50%',
            background: '#e0e0e0',
            overflow: 'hidden',
            marginRight: isMobile ? '10px' : '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: onNavigate ? 'pointer' : 'default',
            flexShrink: 0,
          }}
        >
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt={post.user_name || post.user_first_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: isMobile ? '16px' : '20px', color: '#979797', fontWeight: 600 }}>
              {(post.user_first_name || post.user_name || '?')[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* User Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            onClick={() => {
              if (onNavigate) {
                onNavigate('user-profile', { userId: post.user_id, previousPage: 'community' });
              }
            }}
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 600,
              color: '#192126',
              cursor: onNavigate ? 'pointer' : 'default',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.user_first_name} {post.user_name}
          </div>
          <div
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? '12px' : '14px',
              color: '#979797',
            }}
          >
            {formatTimeAgo(post.created_at)}
          </div>
        </div>

        {/* Actions */}
        {isOwnPost && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: '#979797',
                fontSize: '20px',
              }}
            >
              ⋮
            </button>
            {showDeleteConfirm && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  zIndex: 10,
                  minWidth: '150px',
                }}
              >
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowDeleteConfirm(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: '#192126',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderBottom: '1px solid #E0E0E0'
                  }}
                >
                  {t.community.edit}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: '#dc2626',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {isDeleting ? t.common.delete + '...' : t.community.deletePost}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Text */}
      {post.post_text && (
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: isMobile ? '20px' : '24px',
            color: '#192126',
            marginBottom: post.media_urls && post.media_urls.length > 0 ? (isMobile ? '12px' : '16px') : '0',
            whiteSpace: 'pre-wrap',
          }}
        >
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '2px solid #388896',
                  fontSize: '16px',
                  fontFamily: 'Roboto, sans-serif',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              
              {/* Existing Media Management */}
              {editExistingMedia.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    marginBottom: '8px',
                    color: '#192126',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    Current Media
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {editExistingMedia.map((mediaPath, index) => {
                      const signedUrl = mediaUrls[mediaPath];
                      const isVideo = mediaPath.match(/\.(mp4|webm|ogg)$/i);
                      return (
                        <div key={mediaPath} style={{ position: 'relative', width: '120px', height: '120px' }}>
                          {signedUrl && (
                            isVideo ? (
                              <video 
                                src={signedUrl} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                              />
                            ) : (
                              <img 
                                src={signedUrl} 
                                alt="existing media" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                              />
                            )
                          )}
                          {/* Reorder Left */}
                          {index > 0 && (
                            <button
                              onClick={() => {
                                const newMedia = [...editExistingMedia];
                                [newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]];
                                setEditExistingMedia(newMedia);
                              }}
                              style={{
                                position: 'absolute',
                                left: '4px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0, 0, 0, 0.7)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                              }}
                            >
                              <ChevronLeft size={18} />
                            </button>
                          )}
                          {/* Reorder Right */}
                          {index < editExistingMedia.length - 1 && (
                            <button
                              onClick={() => {
                                const newMedia = [...editExistingMedia];
                                [newMedia[index], newMedia[index + 1]] = [newMedia[index + 1], newMedia[index]];
                                setEditExistingMedia(newMedia);
                              }}
                              style={{
                                position: 'absolute',
                                right: '4px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0, 0, 0, 0.7)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                              }}
                            >
                              <ChevronRight size={18} />
                            </button>
                          )}
                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              setEditExistingMedia(prev => prev.filter((_, i) => i !== index));
                            }}
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              background: 'rgba(220, 38, 38, 0.9)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '28px',
                              height: '28px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Media Previews */}
              {editMediaPreviews.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {editMediaPreviews.map((preview, index) => (
                    <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                      {editMediaFiles[index]?.type.startsWith('video/') ? (
                        <video src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      )}
                      <button
                        onClick={() => {
                          setEditMediaFiles(prev => prev.filter((_, i) => i !== index));
                          setEditMediaPreviews(prev => {
                            URL.revokeObjectURL(prev[index]);
                            return prev.filter((_, i) => i !== index);
                          });
                        }}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0, 0, 0, 0.6)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Media Upload Button */}
              <button
                onClick={() => setShowMediaUploadModal(true)}
                style={{
                  padding: '10px 16px',
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#388896',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-start',
                }}
              >
                <ImageIcon size={16} />
                <span>Add Photos/Videos</span>
              </button>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleEdit}
                  style={{
                    background: '#388896',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '12px 24px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {t.common.save}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(post.post_text || '');
                    setEditLocation(post.location || '');
                    setEditExistingMedia(post.media_urls || []);
                    editMediaPreviews.forEach(url => URL.revokeObjectURL(url));
                    setEditMediaPreviews([]);
                    setEditMediaFiles([]);
                  }}
                  style={{
                    background: 'transparent',
                    color: '#666',
                    border: '1px solid #E0E0E0',
                    borderRadius: '24px',
                    padding: '12px 24px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {t.common.cancel}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ 
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              lineHeight: '24px',
              color: '#192126',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}>
              {renderPostText(post.post_text, post.mentioned_display_names)}
            </div>
          )}
        </div>
      )}

      {/* Media Gallery */}
      {post.media_urls && post.media_urls.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              post.media_urls.length === 1
                ? '1fr'
                : isMobile 
                  ? 'repeat(auto-fit, minmax(140px, 1fr))'
                  : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '8px' : '12px',
            marginBottom: isMobile ? '12px' : '16px',
          }}
        >
          {post.media_urls.map((mediaUrl, index) => {
            const thumbUrl = thumbnailUrls[mediaUrl];
            const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

            if (!thumbUrl) return null;

            return (
              <div
                key={index}
                onClick={() => {
                  setLightboxIndex(index);
                  setShowLightbox(true);
                }}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#000000',
                  aspectRatio: post.media_urls!.length === 1 ? undefined : '1/1',
                  minHeight: post.media_urls!.length === 1 ? '400px' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {isVideo ? (
                  <video
                    src={thumbUrl}
                    controls
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: post.media_urls!.length === 1 ? 'contain' : 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={thumbUrl}
                    alt={`Post media ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: post.media_urls!.length === 1 ? 'contain' : 'cover',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Actions Bar */}
      <div
        style={{
          borderTop: '1px solid #f2f2f7',
          paddingTop: isMobile ? '12px' : '16px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '24px',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
        }}
      >
        {/* Like Button */}
        <button
          onClick={handleLike}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '4px' : '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: isMobile ? '13px' : '16px',
            color: isLiked ? '#388896' : '#979797',
            fontWeight: isLiked ? 600 : 400,
            padding: isMobile ? '6px 8px' : '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) e.currentTarget.style.background = '#f8f9fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span style={{ fontSize: isMobile ? '16px' : '20px' }}>{isLiked ? '❤️' : '🤍'}</span>
          <span>
            {likeCount} {isMobile ? '' : (likeCount === 1 ? t.community.like : t.community.likes)}
          </span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '4px' : '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: isMobile ? '13px' : '16px',
            color: showComments ? '#388896' : '#979797',
            fontWeight: showComments ? 600 : 400,
            padding: isMobile ? '6px 8px' : '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) e.currentTarget.style.background = '#f8f9fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <MessageCircle size={isMobile ? 16 : 20} />
          <span>
            {commentCount} {isMobile ? '' : (commentCount === 1 ? t.community.comment : t.community.comments)}
          </span>
        </button>

        {/* Repost Button */}
        <RepostButton
          postId={post.id}
          initialRepostCount={repostCount}
          onRepostCountChange={setRepostCount}
          isMobile={isMobile}
        />

        {/* Feeling/Reaction Button - Only visible to post author */}
        {!readOnly && user?.id === post.user_id && (
          <div 
            style={{ 
              position: 'relative',
              paddingTop: '60px', // Add padding to extend hover area upward to reach picker
            }}
            onMouseEnter={() => setShowFeelingPicker(true)}
            onMouseLeave={() => setShowFeelingPicker(false)}
          >
            {/* Tooltip for selected reaction */}
            {currentReaction && showReactionTooltip && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)', // Position just above the button (not adjusted for padding)
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 99,
                }}
              >
                {getReactionLabel(currentReaction, t)}
              </div>
            )}

            <button
              onClick={() => setShowFeelingModal(true)}
              onMouseEnter={(e) => {
                setShowFeelingPicker(true);
                if (currentReaction) {
                  setShowReactionTooltip(true);
                }
                e.currentTarget.style.background = '#f8f9fa';
                if (currentReaction) {
                  e.currentTarget.style.transform = 'scale(1.2)';
                }
              }}
              onMouseLeave={(e) => {
                setShowReactionTooltip(false);
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: currentReaction ? '24px' : '20px',
                color: currentReaction ? '#388896' : '#979797',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'background 0.2s ease, transform 0.2s ease',
                marginTop: '-60px', // Compensate for the padding added to parent
              }}
            >
              {currentReaction ? getReactionEmoji(currentReaction) : '😊'}
            </button>

            {/* Quick Feeling Picker (on hover) - only show if no reaction is set */}
            <FeelingPicker
              isOpen={showFeelingPicker && !showFeelingModal && !currentReaction}
              onClose={() => setShowFeelingPicker(false)}
              onSelect={handleReaction}
              currentReaction={currentReaction}
              mode="quick"
              isMobile={isMobile}
            />

            {/* Full Modal (on click) */}
            <FeelingPicker
              isOpen={showFeelingModal}
              onClose={() => setShowFeelingModal(false)}
              onSelect={handleReaction}
              currentReaction={currentReaction}
              mode="modal"
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Location Display/Edit */}
        {currentLocation ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!readOnly && user?.id === post.user_id) {
                setShowLocationModal(true);
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: (!readOnly && user?.id === post.user_id) ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              color: '#979797',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!readOnly && user?.id === post.user_id) {
                e.currentTarget.style.background = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <MapPin size={20} />
            <span>{currentLocation}</span>
          </button>
        ) : null}
      </div>

      {/* Comments Section */}
      {showComments && (
        <Comments
          postId={post.id}
          onCommentCountChange={setCommentCount}
          onNavigate={onNavigate}
          isMobile={isMobile}
        />
      )}

      {/* Location Modal (for editing) */}
      {isEditing && (
        <LocationModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={(location) => {
            setEditLocation(location);
            setShowLocationModal(false);
          }}
          currentLocation={editLocation}
        />
      )}

      {/* Location Modal (for quick location change) */}
      {!isEditing && showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={async (location) => {
            try {
              const { error } = await supabase
                .from('posts')
                .update({ location: location || null })
                .eq('id', post.id);

              if (error) throw error;

              // Update local state to trigger re-render
              setCurrentLocation(location || null);
              setShowLocationModal(false);
            } catch (err) {
              console.error('Error updating location:', err);
              alert('Failed to update location');
            }
          }}
        />
      )}

      {/* Media Upload Modal */}
      {showMediaUploadModal && (
        <MediaUploadModal
          onClose={() => setShowMediaUploadModal(false)}
          onUpload={(files) => {
            setEditMediaFiles(prev => [...prev, ...files]);
            files.forEach(file => {
              const url = URL.createObjectURL(file);
              setEditMediaPreviews(prev => [...prev, url]);
            });
            setShowMediaUploadModal(false);
          }}
        />
      )}

      {/* Upload Spinner Overlay */}
      {isUploadingMedia && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Spinner */}
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '4px solid #e0ebe3',
                borderTop: '4px solid #388896',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: '#192126',
                margin: 0,
              }}
            >
              {uploadProgress}
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      )}

      {/* Lightbox for viewing media */}
      {showLightbox && post.media_urls && (
        <Lightbox
          mediaUrls={post.media_urls.map(url => mediaUrls[url]).filter(Boolean)}
          currentIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}


