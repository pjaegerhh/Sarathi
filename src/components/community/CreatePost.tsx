import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { moderateContent } from '../../services/moderationService';
import { resizeImages } from '../../utils/imageResizer';
import { LocationModal } from './LocationModal';
import { MediaUploadModal } from './MediaUploadModal';
import { FeelingPicker, ReactionType, getReactionEmoji, getReactionLabel } from './FeelingPicker';
import { MapPin, Smile } from 'lucide-react';

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [location, setLocation] = useState<string>('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<'media' | 'location' | 'feeling' | null>(null);
  
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
      const firstName = mentionedUser.first_name || '';
      const lastName = mentionedUser.name || '';
      const mention = `@${firstName} ${lastName}`;
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
    handleFilesAdded(files);
  };

  const handleFilesAdded = (files: File[]) => {
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
        setIsUploading(true);
        
        // Resize images
        setUploadProgress('Preparing images...');
        const { thumbnails, fulls } = await resizeImages(selectedFiles, (current, total) => {
          setUploadProgress(`Processing image ${current} of ${total}...`);
        });
        
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const isVideo = file.type.startsWith('video/');
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${i}`;
          
          if (isVideo) {
            // Upload video as-is
            setUploadProgress(`Uploading video ${i + 1} of ${selectedFiles.length}...`);
            const filePath = `${user.id}/${postId}/${fileName}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
              .from('post-media')
              .upload(filePath, file);

            if (uploadError) {
              console.error('Error uploading video:', uploadError);
              setIsUploading(false);
              throw new Error('Failed to upload video');
            }
            
            mediaUrls.push(filePath);
          } else {
            // Upload both thumbnail and full size
            setUploadProgress(`Uploading image ${i + 1} of ${selectedFiles.length}...`);
            
            // Upload thumbnail
            const thumbPath = `${user.id}/${postId}/thumbnails/${fileName}.jpg`;
            const { error: thumbError } = await supabase.storage
              .from('post-media')
              .upload(thumbPath, thumbnails[i]);

            if (thumbError) {
              console.error('Error uploading thumbnail:', thumbError);
              setIsUploading(false);
              throw new Error('Failed to upload thumbnail');
            }

            // Upload full size
            const fullPath = `${user.id}/${postId}/full/${fileName}.jpg`;
            const { error: fullError } = await supabase.storage
              .from('post-media')
              .upload(fullPath, fulls[i]);

            if (fullError) {
              console.error('Error uploading full image:', fullError);
              setIsUploading(false);
              throw new Error('Failed to upload full image');
            }

            // Store the full path, we'll derive thumbnail path when displaying
            mediaUrls.push(fullPath);
          }
        }
        setIsUploading(false);
        setUploadProgress('');
      }

      const { error: postError } = await supabase
        .from('posts')
        .insert({
          id: postId,
          user_id: user.id,
          post_text: postText.trim() || null,
          media_urls: mediaUrls.length > 0 ? mediaUrls : null,
          location: location || null,
          reaction_type: selectedReaction || null,
        });

      if (postError) {
        console.error('Error creating post:', postError);
        throw new Error('Failed to create post');
      }

      setPostText('');
      setSelectedFiles([]);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);
      setLocation(''); // Clear location
      setSelectedReaction(null); // Clear reaction

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
          onClick={() => setShowMediaUploadModal(true)}
          onMouseEnter={() => setHoveredButton('media')}
          onMouseLeave={() => setHoveredButton(null)}
          disabled={isSubmitting || selectedFiles.length >= 10}
          style={{
            padding: '10px 20px',
            background: hoveredButton === 'media' && !(isSubmitting || selectedFiles.length >= 10) ? '#388896' : 'transparent',
            border: '1px solid #e0e0e0',
            borderRadius: '24px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            color: hoveredButton === 'media' && !(isSubmitting || selectedFiles.length >= 10) ? '#ffffff' : '#388896',
            cursor: isSubmitting || selectedFiles.length >= 10 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isSubmitting || selectedFiles.length >= 10 ? 0.5 : 1,
            transform: hoveredButton === 'media' && !(isSubmitting || selectedFiles.length >= 10) ? 'scale(1.1)' : 'scale(1)',
            boxShadow: hoveredButton === 'media' && !(isSubmitting || selectedFiles.length >= 10) 
              ? '0px 0px 15px rgba(56, 136, 150, 0.5)' 
              : '0px 0px 10px rgba(221, 221, 221, 1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease',
          }}
        >
          <span>📷</span>
          {t.community.addPhotos}
        </button>

        {/* Add Location Button */}
        <button
          onClick={() => setShowLocationModal(true)}
          onMouseEnter={() => setHoveredButton('location')}
          onMouseLeave={() => setHoveredButton(null)}
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            background: hoveredButton === 'location' && !isSubmitting 
              ? '#388896' 
              : location ? '#e0ebe3' : 'transparent',
            border: '1px solid #e0e0e0',
            borderRadius: '24px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            color: hoveredButton === 'location' && !isSubmitting ? '#ffffff' : '#388896',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isSubmitting ? 0.5 : 1,
            maxWidth: '200px',
            transform: hoveredButton === 'location' && !isSubmitting ? 'scale(1.1)' : 'scale(1)',
            boxShadow: hoveredButton === 'location' && !isSubmitting 
              ? '0px 0px 15px rgba(56, 136, 150, 0.5)' 
              : '0px 0px 10px rgba(221, 221, 221, 1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease',
          }}
        >
          <MapPin size={16} style={{ 
            color: hoveredButton === 'location' && !isSubmitting ? '#ffffff' : '#388896',
            transition: 'color 0.2s ease',
          }} />
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {location || t.community.addLocation}
          </span>
          {location && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setLocation('');
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: '4px',
                color: hoveredButton === 'location' && !isSubmitting ? '#ffffff' : '#388896',
                fontSize: '16px',
                lineHeight: 1,
              }}
            >
              ×
            </span>
          )}
        </button>

        {/* Add Feeling Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowFeelingModal(true)}
            onMouseEnter={() => {
              setHoveredButton('feeling');
              if (!selectedReaction) setShowFeelingPicker(true);
            }}
            onMouseLeave={() => {
              setHoveredButton(null);
              setShowFeelingPicker(false);
            }}
            disabled={isSubmitting}
            style={{
              padding: '10px 20px',
              background: hoveredButton === 'feeling' && !isSubmitting 
                ? '#388896' 
                : selectedReaction ? '#e0ebe3' : 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: '24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              color: hoveredButton === 'feeling' && !isSubmitting ? '#ffffff' : '#388896',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: isSubmitting ? 0.5 : 1,
              transform: hoveredButton === 'feeling' && !isSubmitting ? 'scale(1.1)' : 'scale(1)',
              boxShadow: hoveredButton === 'feeling' && !isSubmitting 
                ? '0px 0px 15px rgba(56, 136, 150, 0.5)' 
                : '0px 0px 10px rgba(221, 221, 221, 1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease',
            }}
          >
            {selectedReaction ? (
              <>
                <span style={{ fontSize: '16px' }}>{getReactionEmoji(selectedReaction)}</span>
                <span>{getReactionLabel(selectedReaction, t)}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedReaction(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: '4px',
                    color: hoveredButton === 'feeling' && !isSubmitting ? '#ffffff' : '#388896',
                    fontSize: '16px',
                    lineHeight: 1,
                  }}
                >
                  ×
                </span>
              </>
            ) : (
              <>
                <Smile size={16} style={{ 
                  color: hoveredButton === 'feeling' && !isSubmitting ? '#ffffff' : '#388896',
                  transition: 'color 0.2s ease',
                }} />
                <span>{t.community.addFeeling}</span>
              </>
            )}
          </button>

          <FeelingPicker
            isOpen={showFeelingModal}
            showQuickPicker={showFeelingPicker && !selectedReaction}
            onClose={() => {
              setShowFeelingModal(false);
              setShowFeelingPicker(false);
            }}
            onSelect={(reaction) => {
              setSelectedReaction(reaction);
              setShowFeelingModal(false);
              setShowFeelingPicker(false);
            }}
            selectedReaction={selectedReaction}
          />
        </div>

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

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocation={setLocation}
        currentLocation={location}
      />

      {/* Media Upload Modal */}
      {showMediaUploadModal && (
        <MediaUploadModal
          onClose={() => setShowMediaUploadModal(false)}
          onUpload={(files) => {
            handleFilesAdded(files);
            setShowMediaUploadModal(false);
          }}
        />
      )}

      {/* Upload Spinner Overlay */}
      {isUploading && (
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
    </div>
  );
}
