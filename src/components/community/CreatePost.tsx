import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { moderateContent } from '../../services/moderationService';

interface CreatePostProps {
  onPostCreated?: () => void;
}

interface User {
  uuid: string;
  name: string;
  first_name: string;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [postText, setPostText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Mention functionality
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionResults, setMentionResults] = useState<User[]>([]);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Search for users when @ is typed
  useEffect(() => {
    if (mentionSearch.length >= 1) {
      searchUsers(mentionSearch);
    } else {
      setMentionResults([]);
      setShowMentionDropdown(false);
    }
  }, [mentionSearch]);

  const searchUsers = async (query: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('sarathi_user')
        .select('uuid, name, first_name')
        .or(`name.ilike.%${query}%,first_name.ilike.%${query}%`)
        .neq('uuid', user.id)
        .limit(5);

      if (error) throw error;

      setMentionResults(data || []);
      setShowMentionDropdown((data || []).length > 0);
    } catch (error) {
      console.error('Error searching users for mentions:', error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const cursorPos = e.target.selectionStart;
    setPostText(newText);
    setCursorPosition(cursorPos);

    // Check for @ mention
    const textBeforeCursor = newText.slice(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);
      
      // Check if there's a space after @ (which would end the mention)
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        setMentionSearch(textAfterAt);
      } else {
        setMentionSearch('');
        setShowMentionDropdown(false);
      }
    } else {
      setMentionSearch('');
      setShowMentionDropdown(false);
    }
  };

  const insertMention = (mentionedUser: User) => {
    const textBeforeCursor = postText.slice(0, cursorPosition);
    const textAfterCursor = postText.slice(cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const mention = `@${mentionedUser.first_name || mentionedUser.name}`;
      const newText = 
        textBeforeCursor.slice(0, lastAtIndex) + 
        mention + ' ' + 
        textAfterCursor;

      setPostText(newText);
      setShowMentionDropdown(false);
      setMentionSearch('');
      
      // Set cursor position after mention
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos = lastAtIndex + mention.length + 1;
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showMentionDropdown) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => 
          prev < mentionResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && mentionResults.length > 0) {
        e.preventDefault();
        insertMention(mentionResults[selectedMentionIndex]);
      } else if (e.key === 'Escape') {
        setShowMentionDropdown(false);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024;

      if (!isImage && !isVideo) {
        setError(t.profile.invalidFileType);
        return false;
      }

      if (!isValidSize) {
        setError(t.profile.fileTooLarge);
        return false;
      }

      return true;
    });

    if (validFiles.length + selectedFiles.length > 10) {
      setError('Maximum 10 files allowed');
      return;
    }

    setSelectedFiles([...selectedFiles, ...validFiles]);

    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setError(null);
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previewUrls];
    
    URL.revokeObjectURL(newPreviews[index]);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    // Prevent multiple concurrent submissions
    if (isSubmitting) return;

    if (!postText.trim() && selectedFiles.length === 0) {
      setError(t.community.noContent);
      return;
    }

    if (postText.length > 5000) {
      setError(t.community.postTooLong);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Moderate content before posting
      if (postText.trim()) {
        const moderationResult = await moderateContent(postText, t.language as 'en' | 'hi');
        if (!moderationResult.isApproved) {
          setError(t.community.inappropriateContent || 'Content flagged for review');
          setIsSubmitting(false);
          return;
        }
      }

      const postId = crypto.randomUUID();
      const mediaUrls: string[] = [];

      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${i}.${fileExt}`;
          const filePath = `${user.id}/${postId}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            throw new Error('Failed to upload media');
          }

          mediaUrls.push(filePath);
        }
      }

      const { error: postError } = await supabase
        .from('posts')
        .insert({
          id: postId,
          user_id: user.id,
          post_text: postText.trim() || null,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null,
        });

      if (postError) {
        console.error('Error creating post:', postError);
        throw new Error('Failed to create post');
      }

      setPostText('');
      setSelectedFiles([]);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      setError(t.community.failedToCreatePost);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
      }}
    >
      {/* Text Input with Mention Support */}
      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          value={postText}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t.community.postPlaceholder + ' (Use @ to mention users)'}
          disabled={isSubmitting}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '16px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#192126',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            resize: 'vertical',
            outline: 'none',
            marginBottom: '16px',
          }}
        />

        {/* Mention Dropdown */}
        {showMentionDropdown && mentionResults.length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 0,
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000,
              marginBottom: '8px',
            }}
          >
            {mentionResults.map((mentionUser, index) => (
              <div
                key={mentionUser.uuid}
                onClick={() => insertMention(mentionUser)}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: index === selectedMentionIndex ? '#f0f9fa' : 'transparent',
                  borderBottom: index < mentionResults.length - 1 ? '1px solid #f2f2f7' : 'none',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#192126',
                }}
                onMouseEnter={() => setSelectedMentionIndex(index)}
              >
                <strong>@{mentionUser.first_name || mentionUser.name}</strong>
                {mentionUser.name && mentionUser.first_name && (
                  <span style={{ color: '#979797', marginLeft: '8px' }}>
                    {mentionUser.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Media */}
      {previewUrls.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          {previewUrls.map((url, index) => {
            const file = selectedFiles[index];
            const isVideo = file.type.startsWith('video/');

            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#f0f0f0',
                  aspectRatio: '1/1',
                }}
              >
                {isVideo ? (
                  <video
                    src={url}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <button
                  onClick={() => removeFile(index)}
                  disabled={isSubmitting}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    color: '#ffffff',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: '12px',
            background: '#fee2e2',
            color: '#dc2626',
            borderRadius: '8px',
            marginBottom: '16px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Add Media Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          disabled={isSubmitting}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting || selectedFiles.length >= 10}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: '1px solid #e0e0e0',
            borderRadius: '24px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            color: '#388896',
            cursor: isSubmitting || selectedFiles.length >= 10 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isSubmitting || selectedFiles.length >= 10 ? 0.5 : 1,
          }}
        >
          <span>📷</span>
          {t.community.addPhotos}
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || (!postText.trim() && selectedFiles.length === 0)}
          style={{
            padding: '12px 32px',
            background: isSubmitting || (!postText.trim() && selectedFiles.length === 0)
              ? '#cccccc'
              : '#388896',
            border: 'none',
            borderRadius: '24px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffffff',
            cursor:
              isSubmitting || (!postText.trim() && selectedFiles.length === 0)
                ? 'not-allowed'
                : 'pointer',
          }}
        >
          {isSubmitting ? t.common.saving : t.community.publishPost}
        </button>
      </div>
    </div>
  );
}
