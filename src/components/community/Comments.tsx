/**
 * Comments Section Component
 * Displays comments for a post and allows users to add new comments
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { PostComment } from '../../types/community';
import { moderateContent, logModerationResult } from '../../services/moderationService';
import { FeelingPicker, ReactionType, getReactionEmoji, getReactionLabel } from './FeelingPicker';
import { LocationModal } from './LocationModal';
import { Lightbox } from './Lightbox';
import { Heart, Send, MoreVertical, Trash2, Smile, MapPin, Image as ImageIcon, Video } from 'lucide-react';

interface CommentsProps {
  postId: string;
  initialComments?: PostComment[];
  onCommentCountChange?: (count: number) => void;
}

export const Comments: React.FC<CommentsProps> = ({
  postId,
  initialComments = [],
  onCommentCountChange
}) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [comments, setComments] = useState<PostComment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmRepliesCount, setDeleteConfirmRepliesCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [initialMention, setInitialMention] = useState<string>(''); // Track the initial mention
  const [isMentionModified, setIsMentionModified] = useState(false); // Track if mention was edited
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>('');
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [showFeelingPickerId, setShowFeelingPickerId] = useState<string | null>(null);
  const [showFeelingModalId, setShowFeelingModalId] = useState<string | null>(null);
  const [commentReactions, setCommentReactions] = useState<{ [key: string]: ReactionType | null }>({});
  const [showReactionTooltipId, setShowReactionTooltipId] = useState<string | null>(null);
  
  // New comment form states
  const [newCommentLocation, setNewCommentLocation] = useState<string>('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [newCommentReaction, setNewCommentReaction] = useState<ReactionType | null>(null);
  const [showNewCommentFeelingModal, setShowNewCommentFeelingModal] = useState(false);
  const [showNewCommentFeelingPicker, setShowNewCommentFeelingPicker] = useState(false);
  const [newCommentMedia, setNewCommentMedia] = useState<File[]>([]);
  const [newCommentMediaPreviews, setNewCommentMediaPreviews] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxMediaUrls, setLightboxMediaUrls] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Load comments
  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load all comments for this post (including replies)
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          user:sarathi_user!post_comments_user_id_fkey (
            uuid,
            first_name,
            name,
            profile_picture_url
          )
        `)
        .eq('post_id', postId)
        .eq('moderation_status', 'approved')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Load likes for current user
      if (user && data) {
        const commentIds = data.map(c => c.id);
        const { data: likes } = await supabase
          .from('comment_likes')
          .select('comment_id')
          .eq('user_id', user.id)
          .in('comment_id', commentIds);

        const likedIds = new Set(likes?.map(l => l.comment_id) || []);

        // Build nested comment tree
        const commentsWithLikes = data.map(comment => ({
          ...comment,
          isLikedByCurrentUser: likedIds.has(comment.id),
          showTranslation: false,
          isTranslating: false,
          replies: []
        }));

        // Organize into tree structure (sort by created_at first for proper nesting)
        const sortedComments = commentsWithLikes.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        
        const commentMap = new Map();
        const rootComments: PostComment[] = [];

        sortedComments.forEach(comment => {
          comment.replies = []; // Initialize empty replies array
          commentMap.set(comment.id, comment);
        });

        sortedComments.forEach(comment => {
          if (!comment.parent_comment_id) {
            rootComments.push(comment);
          } else {
            const parent = commentMap.get(comment.parent_comment_id);
            if (parent) {
              parent.replies.push(comment);
            }
          }
        });

        setComments(rootComments);
        onCommentCountChange?.(commentsWithLikes.length);
      } else if (data) {
        const commentsWithData = data.map(c => ({ 
          ...c, 
          showTranslation: false, 
          isTranslating: false,
          replies: []
        }));
        
        // Build tree
        const sortedComments = commentsWithData.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        
        const commentMap = new Map();
        const rootComments: PostComment[] = [];
        
        sortedComments.forEach(comment => {
          comment.replies = [];
          commentMap.set(comment.id, comment);
        });
        
        sortedComments.forEach(comment => {
          if (!comment.parent_comment_id) {
            rootComments.push(comment);
          } else {
            const parent = commentMap.get(comment.parent_comment_id);
            if (parent) {
              parent.replies.push(comment);
            }
          }
        });
        
        setComments(rootComments);
        onCommentCountChange?.(commentsWithData.length);
      }
    } catch (err) {
      console.error('Error loading comments:', err);
      setError(t.community.failedToLoadComments);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return;

    // Validate length
    if (newComment.length > 2000) {
      setError(t.community.commentTooLong);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Convert bold mention to @mention before saving
      let commentToSave = newComment;
      if (!isMentionModified && initialMention && newComment.startsWith(initialMention.trim())) {
        // Convert "FirstName LastName rest of text" to "@FirstName LastName rest of text"
        commentToSave = '@' + newComment;
      }

      // Moderate content before posting
      const moderationResult = await moderateContent(commentToSave, language);
      if (!moderationResult.isApproved) {
        setError(t.community.inappropriateContent);
        setIsSubmitting(false);
        return;
      }

      // Upload media files if any
      let mediaUrls: string[] = [];
      if (newCommentMedia.length > 0) {
        for (const file of newCommentMedia) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Date.now()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading media:', uploadError);
            throw uploadError;
          }

          mediaUrls.push(filePath);
        }
      }

      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          comment_text: commentToSave,
          parent_comment_id: replyingTo === 'root' ? null : replyingTo,
          moderation_status: 'approved', // TODO: Change to 'pending' when moderation is enabled
          original_language: language,
          location: newCommentLocation || null,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null
        })
        .select(`
          *,
          user:sarathi_user!post_comments_user_id_fkey (
            uuid,
            first_name,
            name,
            profile_picture_url
          )
        `)
        .single();

      if (error) throw error;

      // Add reaction if selected
      if (newCommentReaction && data) {
        await supabase
          .from('comment_reactions')
          .insert({
            comment_id: data.id,
            user_id: user.id,
            reaction_type: newCommentReaction
          });
      }

      // Create new comment object
      const newCommentObj: PostComment = {
        ...data,
        isLikedByCurrentUser: false,
        showTranslation: false,
        isTranslating: false,
        replies: []
      };

      // Insert into tree without reloading
      if (!replyingTo || replyingTo === 'root') {
        // Top-level comment
        setComments(prev => [...prev, newCommentObj]);
        onCommentCountChange?.((comments.length || 0) + 1);
      } else {
        // Reply to existing comment - recursively find parent and add
        const insertReply = (commentsList: PostComment[]): PostComment[] => {
          return commentsList.map(comment => {
            if (comment.id === replyingTo) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newCommentObj]
              };
            } else if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: insertReply(comment.replies)
              };
            }
            return comment;
          });
        };
        
        setComments(prev => insertReply(prev));
        onCommentCountChange?.((comments.length || 0) + 1);
      }
      
      setNewComment('');
      setReplyingTo(null);
      setInitialMention('');
      setIsMentionModified(false);
      setNewCommentLocation('');
      setNewCommentReaction(null);
      setNewCommentMedia([]);
      newCommentMediaPreviews.forEach(url => URL.revokeObjectURL(url));
      setNewCommentMediaPreviews([]);
    } catch (err) {
      console.error('Error creating comment:', err);
      setError(t.community.failedToCreateComment);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) return;

    const findComment = (commentsList: PostComment[]): PostComment | null => {
      for (const comment of commentsList) {
        if (comment.id === commentId) return comment;
        if (comment.replies && comment.replies.length > 0) {
          const found = findComment(comment.replies);
          if (found) return found;
        }
      }
      return null;
    };

    const comment = findComment(comments);
    if (!comment) return;

    const isLiked = comment.isLikedByCurrentUser;

    // Optimistic update
    const updateLikes = (commentsList: PostComment[]): PostComment[] => {
      return commentsList.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            isLikedByCurrentUser: !isLiked,
            like_count: c.like_count + (isLiked ? -1 : 1)
          };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: updateLikes(c.replies) };
        }
        return c;
      });
    };

    setComments(updateLikes(comments));

    try {
      if (isLiked) {
        // Unlike
        await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_id', user.id);
      } else {
        // Like
        await supabase
          .from('comment_likes')
          .insert({
            comment_id: commentId,
            user_id: user.id
          });
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      // Revert optimistic update
      setComments(updateLikes(comments));
    }
  };

  const countReplies = (comment: PostComment): number => {
    if (!comment.replies || comment.replies.length === 0) return 0;
    let count = comment.replies.length;
    comment.replies.forEach(reply => {
      count += countReplies(reply);
    });
    return count;
  };

  const handleEditComment = async (commentId: string) => {
    if (!user || !editCommentText.trim()) return;

    try {
      const { error } = await supabase
        .from('post_comments')
        .update({ comment_text: editCommentText })
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      const updateComment = (commentsList: PostComment[]): PostComment[] => {
        return commentsList.map(c => {
          if (c.id === commentId) {
            return { ...c, comment_text: editCommentText };
          }
          if (c.replies && c.replies.length > 0) {
            return { ...c, replies: updateComment(c.replies) };
          }
          return c;
        });
      };

      setComments(prev => updateComment(prev));
      setEditingCommentId(null);
      setEditCommentText('');
      setShowMenuId(null);
    } catch (err) {
      console.error('Error editing comment:', err);
      setError(t.community.failedToEditComment || 'Failed to edit comment');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;

    setDeleteConfirmId(null);

    try {
      // Delete will cascade to all child comments due to foreign key constraint
      await supabase
        .from('post_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id); // This ensures only the owner can delete

      // Remove from tree and count total deleted
      let totalDeleted = 0;
      const countDeleted = (comment: PostComment): number => {
        let count = 1;
        if (comment.replies) {
          comment.replies.forEach(reply => {
            count += countDeleted(reply);
          });
        }
        return count;
      };

      const findAndCount = (commentsList: PostComment[]): number => {
        for (const comment of commentsList) {
          if (comment.id === commentId) {
            return countDeleted(comment);
          }
          if (comment.replies && comment.replies.length > 0) {
            const count = findAndCount(comment.replies);
            if (count > 0) return count;
          }
        }
        return 0;
      };

      totalDeleted = findAndCount(comments);

      const removeComment = (commentsList: PostComment[]): PostComment[] => {
        return commentsList
          .filter(c => c.id !== commentId)
          .map(c => ({
            ...c,
            replies: c.replies ? removeComment(c.replies) : []
          }));
      };

      setComments(prev => removeComment(prev));
      onCommentCountChange?.((comments.length || 0) - totalDeleted);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleTranslate = async (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    // Toggle off if already showing translation
    if (comment.showTranslation) {
      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, showTranslation: false } : c
        )
      );
      return;
    }

    // Check if translation already exists
    const targetLang = language === 'en' ? 'hi' : 'en';
    const cachedTranslation = language === 'en' 
      ? comment.translated_text_hi 
      : comment.translated_text_en;

    if (cachedTranslation) {
      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, showTranslation: true } : c
        )
      );
      return;
    }

    // Translate
    setComments(prev =>
      prev.map(c =>
        c.id === commentId ? { ...c, isTranslating: true } : c
      )
    );

    try {
      // TODO: Implement translation
      // const result = await translateText(comment.comment_text, targetLang);
      // 
      // // Update database with translation
      // await supabase
      //   .from('post_comments')
      //   .update({
      //     [language === 'en' ? 'translated_text_hi' : 'translated_text_en']: result.translatedText
      //   })
      //   .eq('id', commentId);
      //
      // setComments(prev =>
      //   prev.map(c =>
      //     c.id === commentId
      //       ? {
      //           ...c,
      //           [language === 'en' ? 'translated_text_hi' : 'translated_text_en']: result.translatedText,
      //           showTranslation: true,
      //           isTranslating: false
      //         }
      //       : c
      //   )
      // );

      // For now, just show a message
      alert(t.community.translating + '\n' + t.community.translationFailed);
      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, isTranslating: false } : c
        )
      );
    } catch (err) {
      console.error('Translation error:', err);
      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, isTranslating: false } : c
        )
      );
    }
  };

  const handleCommentReaction = async (commentId: string, reaction: ReactionType) => {
    if (!user) return;

    try {
      // Check if user already has a reaction
      const { data: existingReaction } = await supabase
        .from('comment_reactions')
        .select('*')
        .eq('comment_id', commentId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingReaction) {
        // Update existing reaction
        const { error } = await supabase
          .from('comment_reactions')
          .update({ reaction_type: reaction })
          .eq('comment_id', commentId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new reaction
        const { error } = await supabase
          .from('comment_reactions')
          .insert({
            comment_id: commentId,
            user_id: user.id,
            reaction_type: reaction,
          });

        if (error) throw error;
      }

      setCommentReactions(prev => ({ ...prev, [commentId]: reaction }));
      setShowFeelingPickerId(null);
      setShowFeelingModalId(null);
    } catch (error) {
      console.error('Error adding comment reaction:', error);
      alert(t.community.failedToReact || 'Failed to add reaction');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return t.community.justNow;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}${t.community.minutesAgo}`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}${t.community.hoursAgo}`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}${t.community.daysAgo}`;
    return `${Math.floor(seconds / 604800)}${t.community.weeksAgo}`;
  };

  // Parse and render @mentions in comment text
  const renderCommentText = (text: string) => {
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

  // Recursive comment rendering with nesting limit
  const renderComment = (comment: PostComment, depth: number = 0) => {
    const canReply = depth < 6; // Max 6 levels
    const isReplyingToThis = replyingTo === comment.id;
    
    return (
      <div key={comment.id} style={{ marginLeft: depth > 0 ? '32px' : '0' }}>
        <div
          onClick={() => {
            if (canReply && user) {
              if (isReplyingToThis) {
                setReplyingTo(null);
                setNewComment('');
                setInitialMention('');
                setIsMentionModified(false);
              } else {
                // Open reply box without @mention when clicking the comment area
                setReplyingTo(comment.id);
                setNewComment('');
                setInitialMention('');
                setIsMentionModified(false);
              }
            }
          }}
          style={{
            display: 'flex',
            gap: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: isReplyingToThis ? '#E8F5F7' : (depth % 2 === 0 ? '#F8F9FA' : '#FFFFFF'),
            cursor: canReply && user ? 'pointer' : 'default',
            transition: 'background 0.2s'
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#388896',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0,
              overflow: 'hidden'
            }}
          >
            {comment.user?.profile_picture_url ? (
              <img
                src={comment.user.profile_picture_url}
                alt={comment.user.first_name || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              comment.user?.first_name?.[0] || '?'
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {comment.user?.first_name} {comment.user?.name}
              </span>
              <span style={{ color: '#666', fontSize: '12px' }}>
                {formatTimeAgo(comment.created_at)}
              </span>
            </div>

            <div style={{ 
              fontSize: '14px', 
              marginBottom: '8px',
              fontFamily: 'Roboto, sans-serif',
              lineHeight: '20px',
              color: '#192126',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}>
              {editingCommentId === comment.id ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      borderRadius: '12px',
                      border: '1px solid #388896',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleEditComment(comment.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    style={{
                      background: '#388896',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '6px 16px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {t.common.save || 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditCommentText('');
                    }}
                    style={{
                      background: 'transparent',
                      color: '#666',
                      border: '1px solid #E0E0E0',
                      borderRadius: '12px',
                      padding: '6px 16px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {t.common.cancel}
                  </button>
                </div>
              ) : (
                <>
                  {comment.showTranslation
                    ? (language === 'en' ? comment.translated_text_hi : comment.translated_text_en)
                    : renderCommentText(comment.comment_text)}
                </>
              )}
            </div>

            {/* Media Display */}
            {comment.media_urls && comment.media_urls.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {comment.media_urls.map((url, index) => {
                  const isVideo = url.includes('.mp4') || url.includes('.webm') || url.includes('.mov');
                  return (
                    <div 
                      key={index} 
                      onClick={() => {
                        setLightboxMediaUrls(comment.media_urls!);
                        setLightboxIndex(index);
                        setShowLightbox(true);
                      }}
                      style={{ 
                        maxWidth: '200px', 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    >
                      {isVideo ? (
                        <video 
                          src={url} 
                          controls 
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} 
                        />
                      ) : (
                        <img 
                          src={url} 
                          alt="comment media" 
                          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} 
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Location Display */}
            {comment.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                <MapPin size={12} />
                <span>{comment.location}</span>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeComment(comment.id);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: comment.isLikedByCurrentUser ? '#E91E63' : '#666'
                }}
              >
                <Heart size={16} fill={comment.isLikedByCurrentUser ? '#E91E63' : 'none'} />
                {comment.like_count > 0 && comment.like_count}
              </button>

              {canReply && user && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isReplyingToThis && initialMention) {
                      // Close the reply box if it has @mention
                      setReplyingTo(null);
                      setNewComment('');
                      setInitialMention('');
                      setIsMentionModified(false);
                    } else {
                      // Open the reply box with @mention (or add @mention if already open)
                      setReplyingTo(comment.id);
                      const firstName = comment.user?.first_name || '';
                      const lastName = comment.user?.name || '';
                      const mention = `@${firstName} ${lastName} `;
                      setNewComment(mention);
                      setInitialMention(mention);
                      setIsMentionModified(false);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: (isReplyingToThis && initialMention) ? '#388896' : '#666',
                    fontWeight: (isReplyingToThis && initialMention) ? 600 : 400
                  }}
                >
                  {t.community.comment}
                </button>
              )}

              {/* Feeling/Reaction Button - Only visible to comment author */}
              {user?.id === comment.user_id && (
                <div 
                  style={{ 
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {/* Invisible hover area extending upward */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '60px',
                      zIndex: 1,
                    }}
                    onMouseEnter={() => setShowFeelingPickerId(comment.id)}
                    onMouseLeave={() => setShowFeelingPickerId(null)}
                  />

                  {/* Tooltip for selected reaction */}
                  {commentReactions[comment.id] && showReactionTooltipId === comment.id && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        zIndex: 99,
                      }}
                    >
                      {getReactionLabel(commentReactions[comment.id]!, t)}
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFeelingModalId(comment.id);
                    }}
                    onMouseEnter={(e) => {
                      setShowFeelingPickerId(comment.id);
                      if (commentReactions[comment.id]) {
                        setShowReactionTooltipId(comment.id);
                        e.currentTarget.style.transform = 'scale(1.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      setShowReactionTooltipId(null);
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: commentReactions[comment.id] ? '16px' : '12px',
                      color: commentReactions[comment.id] ? '#388896' : '#666',
                      transition: 'transform 0.2s ease',
                      transform: 'scale(1)',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {commentReactions[comment.id] ? getReactionEmoji(commentReactions[comment.id]!) : '😊'}
                  </button>

                  {/* Quick Feeling Picker (on hover) - only show if no reaction is set */}
                  <FeelingPicker
                    isOpen={showFeelingPickerId === comment.id && showFeelingModalId !== comment.id && !commentReactions[comment.id]}
                    onClose={() => setShowFeelingPickerId(null)}
                    onSelect={(reaction) => handleCommentReaction(comment.id, reaction)}
                    currentReaction={commentReactions[comment.id]}
                    mode="quick"
                  />

                  {/* Full Modal (on click) */}
                  <FeelingPicker
                    isOpen={showFeelingModalId === comment.id}
                    onClose={() => setShowFeelingModalId(null)}
                    onSelect={(reaction) => handleCommentReaction(comment.id, reaction)}
                    currentReaction={commentReactions[comment.id]}
                    mode="modal"
                  />
                </div>
              )}

              {user?.id === comment.user_id && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenuId(showMenuId === comment.id ? null : comment.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666',
                      fontSize: '20px',
                      padding: '0 4px'
                    }}
                  >
                    ⋮
                  </button>
                  {showMenuId === comment.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        background: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 10,
                        minWidth: '120px',
                        marginTop: '4px'
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCommentId(comment.id);
                          setEditCommentText(comment.comment_text);
                          setShowMenuId(null);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#192126',
                          borderBottom: '1px solid #E0E0E0'
                        }}
                      >
                        {t.community.edit || 'Edit'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const repliesCount = countReplies(comment);
                          setDeleteConfirmRepliesCount(repliesCount);
                          setDeleteConfirmId(comment.id);
                          setShowMenuId(null);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#E91E63'
                        }}
                      >
                        {t.community.deleteComment}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reply input for this comment */}
        {isReplyingToThis && user && canReply && (
          <div style={{ marginLeft: depth > 0 ? '52px' : '0', marginTop: '8px', display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              {!isMentionModified && initialMention && newComment.startsWith(initialMention.trim()) && (
                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '8px',
                    pointerEvents: 'none',
                    fontSize: '14px',
                    color: '#192126',
                    whiteSpace: 'pre'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>{initialMention.trim()}</span>
                  <span style={{ fontWeight: 'normal' }}> {newComment.substring(initialMention.length)}</span>
                </div>
              )}
              <input
                type="text"
                value={newComment}
                onChange={e => {
                  const newValue = e.target.value;
                  
                  // Check if user is deleting or modifying the mention
                  if (initialMention && !isMentionModified) {
                    const mentionWithoutSpace = initialMention.trim();
                    // If the new value doesn't start with the full mention, user is editing it
                    if (!newValue.startsWith(mentionWithoutSpace)) {
                      setIsMentionModified(true);
                      // Convert to @mention format
                      const firstName = comment.user?.first_name || '';
                      const lastName = comment.user?.name || '';
                      const mentionWithAt = `@${firstName} ${lastName}`;
                      
                      // Replace the partial mention with @mention
                      const textAfterMention = newComment.substring(initialMention.length);
                      setNewComment(mentionWithAt + ' ' + textAfterMention);
                      return;
                    }
                  }
                  
                  setNewComment(newValue);
                }}
                placeholder={`${t.community.replyTo} ${comment.user?.first_name}...`}
                autoFocus
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '16px',
                  border: '1px solid #E0E0E0',
                  fontSize: '14px',
                  outline: 'none',
                  color: !isMentionModified && initialMention && newComment.startsWith(initialMention.trim()) ? 'transparent' : '#192126',
                  caretColor: '#192126'
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              style={{
                background: '#388896',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: !newComment.trim() || isSubmitting ? 0.5 : 1
              }}
            >
              <Send size={16} />
            </button>
            <button
              onClick={() => {
                setReplyingTo(null);
                setNewComment('');
                setInitialMention('');
                setIsMentionModified(false);
              }}
              style={{
                background: 'transparent',
                border: '1px solid #E0E0E0',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        {t.community.comments}...
      </div>
    );
  }

  return (
    <div style={{ marginTop: '16px' }}>
      {/* Comments list */}
      {comments.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          {t.community.noCommentsYet}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {comments.map(comment => renderComment(comment, 0))}
        </div>
      )}

      {/* Add top-level comment */}
      {user && (
        <>
          {!replyingTo ? (
            <div 
              onClick={() => setReplyingTo('root')}
              style={{ 
                marginTop: '16px', 
                padding: '12px 16px',
                borderRadius: '24px',
                border: '1px solid #E0E0E0',
                fontSize: '14px',
                color: '#999',
                cursor: 'pointer',
                background: '#FAFAFA'
              }}
            >
              {t.community.writeComment}
            </div>
          ) : replyingTo === 'root' && (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #E0E0E0' }}>
              {/* Text Input */}
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder={t.community.writeComment}
                disabled={isSubmitting}
                autoFocus
                style={{
                  width: '100%',
                  minHeight: '60px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #E0E0E0',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'Roboto, sans-serif'
                }}
              />
              
              {/* Media Previews */}
              {newCommentMediaPreviews.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {newCommentMediaPreviews.map((preview, index) => (
                    <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                      {newCommentMedia[index]?.type.startsWith('video/') ? (
                        <video src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      )}
                      <button
                        onClick={() => {
                          setNewCommentMedia(prev => prev.filter((_, i) => i !== index));
                          setNewCommentMediaPreviews(prev => {
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

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Media Upload */}
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  style={{ display: 'none' }}
                  id="comment-media-upload"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      setNewCommentMedia(prev => [...prev, ...files]);
                      files.forEach(file => {
                        const url = URL.createObjectURL(file);
                        setNewCommentMediaPreviews(prev => [...prev, url]);
                      });
                    }
                  }}
                />
                <label htmlFor="comment-media-upload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '8px', background: '#F5F5F5' }}>
                  {newCommentMedia.some(f => f.type.startsWith('video/')) ? <Video size={20} color="#388896" /> : <ImageIcon size={20} color="#388896" />}
                </label>

                {/* Location Button */}
                <button
                  onClick={() => setShowLocationModal(true)}
                  style={{
                    padding: '8px 12px',
                    background: newCommentLocation ? '#e0ebe3' : '#F5F5F5',
                    border: 'none',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#388896'
                  }}
                >
                  <MapPin size={16} />
                  {newCommentLocation ? newCommentLocation.substring(0, 15) + (newCommentLocation.length > 15 ? '...' : '') : ''}
                  {newCommentLocation && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewCommentLocation('');
                      }}
                      style={{ marginLeft: '4px' }}
                    >
                      ✕
                    </span>
                  )}
                </button>

                {/* Feelings Button */}
                <button
                  onClick={() => setShowNewCommentFeelingModal(true)}
                  onMouseEnter={() => setShowNewCommentFeelingPicker(true)}
                  onMouseLeave={() => setShowNewCommentFeelingPicker(false)}
                  style={{
                    padding: '8px',
                    background: newCommentReaction ? '#e0ebe3' : '#F5F5F5',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  {newCommentReaction ? getReactionEmoji(newCommentReaction) : <Smile size={20} color="#388896" />}
                </button>

                <div style={{ flex: 1 }} />

                {/* Submit Button */}
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  style={{
                    background: '#388896',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: !newComment.trim() || isSubmitting ? 0.5 : 1
                  }}
                >
                  <Send size={20} />
                </button>

                {/* Cancel Button */}
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setNewComment('');
                    setInitialMention('');
                    setIsMentionModified(false);
                    setNewCommentLocation('');
                    setNewCommentReaction(null);
                    setNewCommentMedia([]);
                    newCommentMediaPreviews.forEach(url => URL.revokeObjectURL(url));
                    setNewCommentMediaPreviews([]);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #E0E0E0',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {error && (
        <div style={{ color: '#E91E63', fontSize: '14px', marginTop: '8px' }}>
          {error}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
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
            zIndex: 1000
          }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Roboto, sans-serif', fontSize: '20px', fontWeight: 700 }}>
              {t.community.deleteComment}
            </h3>
            <p style={{ margin: '0 0 24px 0', fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#666' }}>
              {deleteConfirmRepliesCount > 0 ? (
                <>
                  {t.community.deleteCommentWithRepliesConfirm?.replace('{count}', deleteConfirmRepliesCount.toString()) || 
                   `${t.community.deleteCommentConfirm} This comment has ${deleteConfirmRepliesCount} ${deleteConfirmRepliesCount === 1 ? 'reply' : 'replies'}. All child comments will also be deleted.`}
                </>
              ) : (
                t.community.deleteCommentConfirm
              )}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid #E0E0E0',
                  borderRadius: '24px',
                  padding: '12px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => handleDeleteComment(deleteConfirmId)}
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
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal for New Comment */}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelectLocation={(location) => {
            setNewCommentLocation(location);
            setShowLocationModal(false);
          }}
        />
      )}

      {/* Feeling Picker for New Comment */}
      {showNewCommentFeelingModal && (
        <FeelingPicker
          onSelect={(reaction) => {
            setNewCommentReaction(reaction);
            setShowNewCommentFeelingModal(false);
          }}
          onClose={() => setShowNewCommentFeelingModal(false)}
          currentReaction={newCommentReaction}
        />
      )}

      {/* Lightbox for viewing media */}
      {showLightbox && (
        <Lightbox
          mediaUrls={lightboxMediaUrls}
          currentIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};
