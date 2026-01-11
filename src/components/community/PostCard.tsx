import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Comments } from './Comments';
import { RepostButton } from './RepostButton';
import { FeelingPicker, ReactionType, getReactionEmoji, getReactionLabel } from './FeelingPicker';
import { MessageCircle, Smile } from 'lucide-react';

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
}

interface PostCardProps {
  post: Post;
  onPostDeleted?: () => void;
  onPostUpdated?: () => void;
}

export function PostCard({ post, onPostDeleted, onPostUpdated }: PostCardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [commentCount, setCommentCount] = useState(post.comment_count || 0);
  const [repostCount, setRepostCount] = useState(post.repost_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<{ [key: string]: string }>({});
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.post_text || '');
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(null);
  const [showReactionTooltip, setShowReactionTooltip] = useState(false);

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

    const urls: { [key: string]: string } = {};
    
    for (const path of post.media_urls) {
      const { data, error } = await supabase.storage
        .from('post-media')
        .createSignedUrl(path, 3600);

      if (data?.signedUrl) {
        urls[path] = data.signedUrl;
      } else if (error) {
        console.error('Error loading media URL:', error);
      }
    }

    setMediaUrls(urls);
  };

  const loadProfilePicture = async () => {
    if (!post.user_profile_picture) return;

    // Check if it's already a full URL (signed URL from another component)
    if (post.user_profile_picture.startsWith('http')) {
      setProfilePictureUrl(post.user_profile_picture);
      return;
    }

    const { data, error } = await supabase.storage
      .from('profile-media')
      .createSignedUrl(post.user_profile_picture, 3600);

    if (data?.signedUrl) {
      setProfilePictureUrl(data.signedUrl);
    } else if (error) {
      console.error('Error loading profile picture:', error);
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
      const { error } = await supabase
        .from('posts')
        .update({ post_text: editText })
        .eq('id', post.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setIsEditing(false);
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (error) {
      console.error('Error editing post:', error);
      alert(t.community.failedToEditPost || 'Failed to edit post');
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
      alert(t.community.failedToReact || 'Failed to add reaction');
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

  // Parse and render @mentions in post text
  const renderPostText = (text: string) => {
    // Regular expression to match @mentions (FirstName LastName format)
    // Matches @Word Word followed by a space, punctuation, or end of string
    const mentionRegex = /@(\w+\s+\w+)(?=\s|$|[.,!?;:])/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = mentionRegex.exec(text)) !== null) {
      // Add text before the mention
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${keyIndex++}`} style={{ fontWeight: 'normal' }}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      // Add the mention without @ and in bold
      parts.push(
        <span key={`mention-${keyIndex++}`} style={{ fontWeight: 'bold' }}>
          {match[1]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text after the last mention
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
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        {/* Profile Picture */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#e0e0e0',
            overflow: 'hidden',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt={post.user_name || post.user_first_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '20px', color: '#979797', fontWeight: 600 }}>
              {(post.user_first_name || post.user_name || '?')[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* User Info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#192126',
            }}
          >
            {post.user_first_name} {post.user_name}
          </div>
          <div
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
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
                  {t.community.edit || 'Edit'}
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
            fontSize: '16px',
            lineHeight: '24px',
            color: '#192126',
            marginBottom: post.media_urls && post.media_urls.length > 0 ? '16px' : '0',
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
                  {t.common.save || 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(post.post_text || '');
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
            renderPostText(post.post_text)
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
                : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          {post.media_urls.map((mediaUrl, index) => {
            const signedUrl = mediaUrls[mediaUrl];
            const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

            if (!signedUrl) return null;

            return (
              <div
                key={index}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#000000',
                  aspectRatio: post.media_urls!.length === 1 ? undefined : '1/1',
                  minHeight: post.media_urls!.length === 1 ? '400px' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isVideo ? (
                  <video
                    src={signedUrl}
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: post.media_urls!.length === 1 ? 'contain' : 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={signedUrl}
                    alt={`Post media ${index + 1}`}
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
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
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
            gap: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            color: isLiked ? '#388896' : '#979797',
            fontWeight: isLiked ? 600 : 400,
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8f9fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span style={{ fontSize: '20px' }}>{isLiked ? '❤️' : '🤍'}</span>
          <span>
            {likeCount} {likeCount === 1 ? t.community.like : t.community.likes}
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
            gap: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            color: showComments ? '#388896' : '#979797',
            fontWeight: showComments ? 600 : 400,
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8f9fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <MessageCircle size={20} />
          <span>
            {commentCount} {commentCount === 1 ? t.community.comment : t.community.comments}
          </span>
        </button>

        {/* Repost Button */}
        <RepostButton
          postId={post.id}
          initialRepostCount={repostCount}
          onRepostCountChange={setRepostCount}
        />

        {/* Feeling/Reaction Button */}
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
          />

          {/* Full Modal (on click) */}
          <FeelingPicker
            isOpen={showFeelingModal}
            onClose={() => setShowFeelingModal(false)}
            onSelect={handleReaction}
            currentReaction={currentReaction}
            mode="modal"
          />
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <Comments
          postId={post.id}
          onCommentCountChange={setCommentCount}
        />
      )}
    </div>
  );
}


