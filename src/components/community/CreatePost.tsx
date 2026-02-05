import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { loadMediaUrl } from '../../utils/mediaLoader';
import { moderateContent } from '../../services/moderationService';
import { resizeImages } from '../../utils/imageResizer';
import { LocationModal } from './LocationModal';
import { MediaUploadModal } from './MediaUploadModal';
import { FeelingPicker, ReactionType, getReactionEmoji, getReactionLabel } from './FeelingPicker';
import { MapPin, Smile } from 'lucide-react';

interface CreatePostProps {
  onPostCreated?: () => void;
  isMobile?: boolean;
}

interface User {
  uuid: string;
  name: string;
  first_name: string;
}

export function CreatePost({ onPostCreated, isMobile = false }: CreatePostProps) {
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
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [userInitials, setUserInitials] = useState<string>('');
  
  // Mention functionality
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionResults, setMentionResults] = useState<User[]>([]);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Load user profile picture and initials
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data: userData, error } = await supabase
        .from('sarathi_user')
        .select('first_name, name, profile_picture_url')
        .eq('uuid', user.id)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      if (userData) {
        const firstName = userData.first_name || '';
        const lastName = userData.name || '';
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        setUserInitials(initials);

        if (userData.profile_picture_url) {
          // Use cache to load profile picture
          const profileUrl = await loadMediaUrl(userData.profile_picture_url);
          if (profileUrl) {
            setProfilePicUrl(profileUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
  };

  // Search for users when typing after @
  useEffect(() => {
    if (mentionSearch.length >= 1) {
      searchUsers(mentionSearch);
    } else {
      setMentionResults([]);
    }
    setSelectedMentionIndex(0);
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
      // Show dropdown when @ is typed; search when user types more
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        setMentionSearch(textAfterAt);
        setShowMentionDropdown(true);
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
          setError(t.community.inappropriateContent);
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

      // Resolve @mentions to display names that match real users (for bold-only-when-valid)
      const mentionRegex = /@(\w+\s+\w+)(?=\s|$|[.,!?;:])/g;
      const mentionSet = new Set<string>();
      let m;
      while ((m = mentionRegex.exec(postText.trim() || '')) !== null) {
        mentionSet.add(m[1].trim());
      }
      const resolvedMentions: string[] = [];
      for (const displayName of mentionSet) {
        const parts = displayName.trim().split(/\s+/);
        const first = parts[0];
        const last = parts.slice(1).join(' ');
        if (!first || !last) continue;
        const { data: users } = await supabase
          .from('sarathi_user')
          .select('first_name, name')
          .ilike('first_name', first)
          .ilike('name', last)
          .limit(10);
        const exists = (users || []).some(
          (row) =>
            `${(row.first_name || '').trim()} ${(row.name || '').trim()}`.toLowerCase() === displayName.toLowerCase()
        );
        if (exists) resolvedMentions.push(displayName);
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
          mentioned_display_names: resolvedMentions.length > 0 ? resolvedMentions : null,
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
        borderRadius: isMobile ? '16px' : '20px',
        padding: isMobile ? '16px' : '24px',
        marginBottom: isMobile ? '12px' : '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        width: '100%',
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Text Input with Avatar and Mention Support */}
      <div style={{ display: 'flex', gap: isMobile ? '12px' : '16px', marginBottom: isMobile ? '12px' : '16px', minWidth: 0 }}>
        {/* User Avatar */}
        <div
          style={{
            width: isMobile ? '40px' : '48px',
            height: isMobile ? '40px' : '48px',
            borderRadius: '50%',
            background: profilePicUrl 
              ? `url(${profilePicUrl}) center/cover` 
              : 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(180deg, rgba(105, 181, 124, 1) 0%, rgba(56, 136, 150, 1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {!profilePicUrl && userInitials && (
            <span
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? '14px' : '16px',
                lineHeight: '24px',
                color: '#ffffff',
              }}
            >
              {userInitials}
            </span>
          )}
        </div>

        {/* Text Input Area */}
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          <textarea
            ref={textareaRef}
            value={postText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={isMobile ? t.community.postPlaceholder : t.community.postPlaceholder + ' (Use @ to mention users)'}
            disabled={isSubmitting}
            style={{
              width: '100%',
              minHeight: isMobile ? '80px' : '120px',
              padding: isMobile ? '12px' : '16px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? '14px' : '16px',
              lineHeight: isMobile ? '20px' : '24px',
              color: '#192126',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              resize: 'vertical',
              outline: 'none',
            }}
          />

          {/* Mention Dropdown - shown when @ is typed */}
          {showMentionDropdown && (
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
              {mentionResults.length > 0 ? (
                mentionResults.map((mentionUser, index) => (
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
                ))
              ) : (
                <div
                  style={{
                    padding: '12px 16px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    color: '#979797',
                  }}
                >
                  {mentionSearch.length === 0 ? t.community.typeToMentionUsers : t.community.noUsersFound}
                </div>
              )}
            </div>
          )}
        </div>
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

      {/* Actions - single row, smaller buttons, icon-only when mobile */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isMobile ? '6px' : '10px', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minWidth: 0,
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '6px' : '10px',
          flexWrap: 'wrap',
          minWidth: 0,
        }}>
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
            onMouseEnter={() => !isMobile && setHoveredButton('media')}
            onMouseLeave={() => setHoveredButton(null)}
            disabled={isSubmitting || selectedFiles.length >= 10}
            style={{
              padding: isMobile ? '6px' : '8px 12px',
              minWidth: isMobile ? 32 : undefined,
              minHeight: isMobile ? 32 : undefined,
              background: hoveredButton === 'media' && !(isSubmitting || selectedFiles.length >= 10) ? '#388896' : 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: isMobile ? '50%' : '20px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px',
              color: hoveredButton === 'media' && !(isSubmitting || selectedFiles.length >= 10) ? '#ffffff' : '#388896',
              cursor: isSubmitting || selectedFiles.length >= 10 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              opacity: isSubmitting || selectedFiles.length >= 10 ? 0.5 : 1,
              boxShadow: '0px 0px 8px rgba(221, 221, 221, 0.8)',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            <span style={{ fontSize: isMobile ? 14 : 16 }}>📷</span>
            {!isMobile && <span>Media</span>}
          </button>

          <button
            onClick={() => setShowLocationModal(true)}
            onMouseEnter={() => !isMobile && setHoveredButton('location')}
            onMouseLeave={() => setHoveredButton(null)}
            disabled={isSubmitting}
            style={{
              padding: isMobile ? '6px' : '8px 12px',
              minWidth: isMobile ? 32 : undefined,
              minHeight: isMobile ? 32 : undefined,
              background: hoveredButton === 'location' && !isSubmitting ? '#388896' : location ? '#e0ebe3' : 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: isMobile ? '50%' : '20px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '12px',
              color: hoveredButton === 'location' && !isSubmitting ? '#ffffff' : '#388896',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              opacity: isSubmitting ? 0.5 : 1,
              maxWidth: isMobile ? 32 : 180,
              minWidth: 0,
              overflow: 'hidden',
              boxShadow: '0px 0px 8px rgba(221, 221, 221, 0.8)',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            <MapPin size={isMobile ? 14 : 16} style={{ flexShrink: 0, color: 'inherit' }} />
            {!isMobile && (
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {location || t.community.addLocation}
              </span>
            )}
            {!isMobile && location && (
              <span
                onClick={(e) => { e.stopPropagation(); setLocation(''); }}
                style={{ marginLeft: 2, cursor: 'pointer', lineHeight: 1 }}
              >
                ×
              </span>
            )}
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowFeelingModal(true)}
              onMouseEnter={() => { if (!isMobile) setHoveredButton('feeling'); if (!selectedReaction) setShowFeelingPicker(true); }}
              onMouseLeave={() => { setHoveredButton(null); setShowFeelingPicker(false); }}
              disabled={isSubmitting}
              style={{
                padding: isMobile ? '6px' : '8px 12px',
                minWidth: isMobile ? 32 : undefined,
                minHeight: isMobile ? 32 : undefined,
                background: hoveredButton === 'feeling' && !isSubmitting ? '#388896' : selectedReaction ? '#e0ebe3' : 'transparent',
                border: '1px solid #e0e0e0',
                borderRadius: isMobile ? '50%' : '20px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '12px',
                color: hoveredButton === 'feeling' && !isSubmitting ? '#ffffff' : '#388896',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                opacity: isSubmitting ? 0.5 : 1,
                boxShadow: '0px 0px 8px rgba(221, 221, 221, 0.8)',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {selectedReaction ? (
                <>
                  <span style={{ fontSize: isMobile ? 14 : 16 }}>{getReactionEmoji(selectedReaction)}</span>
                  {!isMobile && <span>{getReactionLabel(selectedReaction, t)}</span>}
                  {!isMobile && (
                    <span onClick={(e) => { e.stopPropagation(); setSelectedReaction(null); }} style={{ marginLeft: 2, cursor: 'pointer' }}>×</span>
                  )}
                </>
              ) : (
                <>
                  <Smile size={isMobile ? 14 : 16} style={{ color: 'inherit' }} />
                  {!isMobile && <span>Feeling</span>}
                </>
              )}
            </button>
            <FeelingPicker
              isOpen={showFeelingModal}
              onClose={() => { setShowFeelingModal(false); setShowFeelingPicker(false); }}
              onSelect={(reaction) => { setSelectedReaction(reaction); setShowFeelingModal(false); setShowFeelingPicker(false); }}
              currentReaction={selectedReaction}
              mode="modal"
              isMobile={isMobile}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || (!postText.trim() && selectedFiles.length === 0)}
          style={{
            padding: isMobile ? '8px 16px' : '10px 24px',
            background: isSubmitting || (!postText.trim() && selectedFiles.length === 0) ? '#cccccc' : '#388896',
            border: 'none',
            borderRadius: '20px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 600,
            color: '#ffffff',
            cursor: isSubmitting || (!postText.trim() && selectedFiles.length === 0) ? 'not-allowed' : 'pointer',
            flexShrink: 0,
          }}
        >
          {isSubmitting ? t.common.saving : t.community.post}
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
