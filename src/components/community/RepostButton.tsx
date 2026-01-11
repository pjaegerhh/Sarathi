/**
 * Repost Button Component
 * Allows users to repost content with an optional comment
 */

import React, { useState, useEffect } from 'react';
import { Repeat2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { moderateContent } from '../../services/moderationService';

interface RepostButtonProps {
  postId: string;
  initialRepostCount?: number;
  onRepostCountChange?: (count: number) => void;
}

export const RepostButton: React.FC<RepostButtonProps> = ({
  postId,
  initialRepostCount = 0,
  onRepostCountChange
}) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [repostCount, setRepostCount] = useState(initialRepostCount);
  const [isReposted, setIsReposted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [repostComment, setRepostComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkIfReposted();
  }, [postId, user]);

  const checkIfReposted = async () => {
    if (!user || !user.id) return;

    try {
      const { data, error } = await supabase
        .from('reposts')
        .select('id')
        .eq('original_post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (data && !error) {
        setIsReposted(true);
      }
    } catch (err) {
      // Not reposted
    }
  };

  const handleRepost = async (withComment: boolean = false) => {
    if (!user) return;

    if (withComment) {
      setShowModal(true);
      return;
    }

    // Quick repost without comment
    await submitRepost('');
  };

  const submitRepost = async (comment: string) => {
    if (!user || !user.id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Moderate comment if provided
      if (comment.trim()) {
        if (comment.length > 500) {
          setError('Comment is too long (max 500 characters)');
          setIsSubmitting(false);
          return;
        }

        const moderationResult = await moderateContent(comment, language);
        if (!moderationResult.isApproved) {
          setError(t.community.inappropriateContent);
          setIsSubmitting(false);
          return;
        }
      }

      const { error: repostError } = await supabase
        .from('reposts')
        .insert({
          original_post_id: postId,
          user_id: user.id,
          repost_comment: comment.trim() || null,
          moderation_status: 'approved'
        });

      if (repostError) {
        if (repostError.code === '23505') {
          // Unique constraint violation - already reposted
          setError('You have already reposted this');
        } else {
          throw repostError;
        }
        setIsSubmitting(false);
        return;
      }

      setIsReposted(true);
      const newCount = repostCount + 1;
      setRepostCount(newCount);
      onRepostCountChange?.(newCount);
      setShowModal(false);
      setRepostComment('');
    } catch (err) {
      console.error('Error creating repost:', err);
      setError(t.community.failedToRepost || 'Failed to repost');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUndoRepost = async () => {
    if (!user || !user.id) return;

    try {
      const { error } = await supabase
        .from('reposts')
        .delete()
        .eq('original_post_id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      setIsReposted(false);
      const newCount = Math.max(0, repostCount - 1);
      setRepostCount(newCount);
      onRepostCountChange?.(newCount);
    } catch (err) {
      console.error('Error removing repost:', err);
    }
  };

  return (
    <>
      {/* Repost Button Container */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block'
        }}
      >
        <button
          onClick={() => isReposted ? handleUndoRepost() : handleRepost(false)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            color: isReposted ? '#388896' : '#979797',
            fontWeight: isReposted ? 600 : 400,
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
          <Repeat2 size={20} />
          <span>
            {repostCount} {repostCount === 1 ? t.community.repost : t.community.reposts}
          </span>
        </button>
        
        {/* Dropdown - outside button */}
        {!isReposted && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 100,
              minWidth: '180px',
              display: 'none'
            }}
            className="repost-dropdown"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRepost(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                color: '#192126'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {t.community.repost}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRepost(true);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                color: '#192126'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {t.community.repostWith}
            </button>
          </div>
        )}
      </div>

      {/* Repost Modal */}
      {showModal && (
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
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}
            >
              <h2
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#192126',
                  margin: 0
                }}
              >
                {t.community.repostWith}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                <X size={24} color="#979797" />
              </button>
            </div>

            {/* Comment Input */}
            <textarea
              value={repostComment}
              onChange={(e) => setRepostComment(e.target.value)}
              placeholder={t.community.repostWithComment}
              disabled={isSubmitting}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                resize: 'vertical',
                marginBottom: '16px',
                outline: 'none'
              }}
              maxLength={500}
            />

            <div
              style={{
                fontSize: '12px',
                color: '#979797',
                marginBottom: '16px',
                textAlign: 'right'
              }}
            >
              {repostComment.length}/500
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  background: '#FEE',
                  color: '#E91E63',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}
              >
                {error}
              </div>
            )}

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
                style={{
                  background: 'transparent',
                  border: '1px solid #E0E0E0',
                  borderRadius: '24px',
                  padding: '12px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#979797'
                }}
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => submitRepost(repostComment)}
                disabled={isSubmitting}
                style={{
                  background: '#388896',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  opacity: isSubmitting ? 0.5 : 1
                }}
              >
                {isSubmitting ? t.community.repost + '...' : t.community.repost}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        div:hover > .repost-dropdown {
          display: block !important;
        }
      `}</style>
    </>
  );
};
