import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { loadSignedUrl } from '../utils/mediaLoader';
import { toast } from 'sonner';
import imageIcon from '../assets/svg/image.svg';
import videoIcon from '../assets/svg/video.svg';

interface EditStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  existingStory?: {
    id: string;
    story_text: string | null;
    media_urls: string[] | null;
    created_at: string;
    updated_at: string;
  } | null;
  onSave: () => void;
  user?: {
    name?: string | null;
    firstName?: string | null;
    profile_picture_url?: string | null;
  };
}

export function EditStoryModal({ isOpen, onClose, userId, existingStory, onSave, user }: EditStoryModalProps) {
  const { t } = useLanguage();
  const [storyText, setStoryText] = useState(existingStory?.story_text || '');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [existingMediaUrls, setExistingMediaUrls] = useState<string[]>(existingStory?.media_urls || []);
  const [mediaSignedUrls, setMediaSignedUrls] = useState<{ [key: string]: string }>({});
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]); // Track files to delete from bucket
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  // State for drag and drop
  const [isDragging, setIsDragging] = useState(false);

  // Get user display name
  const getDisplayName = () => {
    if (user?.firstName && user?.name) {
      return `${user.firstName} ${user.name}`;
    }
    if (user?.firstName) return user.firstName;
    if (user?.name) return user.name;
    return 'User';
  };

  // Get user initials
  const getInitials = () => {
    const firstName = user?.firstName || '';
    const lastName = user?.name || '';
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    
    if (firstInitial && lastInitial) {
      return `${firstInitial}${lastInitial}`;
    }
    if (firstInitial) return firstInitial;
    if (lastName) return lastInitial;
    return 'U';
  };

  // Load signed URLs for existing media
  useEffect(() => {
    if (isOpen && existingMediaUrls.length > 0) {
      loadSignedUrls();
    }
  }, [isOpen, existingMediaUrls]);

  // Update story text and media when existingStory changes
  useEffect(() => {
    if (isOpen) {
      if (existingStory?.story_text) {
        setStoryText(existingStory.story_text);
      } else {
        setStoryText('');
      }
      
      if (existingStory?.media_urls) {
        setExistingMediaUrls(existingStory.media_urls);
      } else {
        setExistingMediaUrls([]);
      }
      
      // Reset other states when modal opens
      setMediaFiles([]);
      setFilesToDelete([]);
      setMediaSignedUrls({});
    }
  }, [isOpen, existingStory]);

  const loadSignedUrls = async () => {
    const urls: { [key: string]: string } = {};
    const validUrls: string[] = [];
    
    for (const path of existingMediaUrls) {
      try {
        // Use cache
        const signedUrl = await loadSignedUrl('profile-media', path);

        if (signedUrl) {
          urls[path] = signedUrl;
          validUrls.push(path);
        } else {
          console.warn('File not found in storage, will be removed:', path);
        }
      } catch (err) {
        console.warn('Error loading file, will be removed:', path);
      }
    }

    // Update existingMediaUrls to only include valid files
    if (validUrls.length !== existingMediaUrls.length) {
      console.log('Cleaning up orphaned file references...');
      console.log('Valid files:', validUrls.length, 'out of', existingMediaUrls.length);
      setExistingMediaUrls(validUrls);
      
      // Auto-save to database to clean up orphaned references
      if (existingStory?.id) {
        try {
          const { error } = await supabase
            .from('user_stories')
            .update({
              media_urls: validUrls.length > 0 ? validUrls : null,
            })
            .eq('id', existingStory.id);
          
          if (error) {
            console.error('Failed to clean up database:', error);
          } else {
            console.log('Database successfully cleaned up');
            // Refresh the story data in parent to prevent stale data on next open
            onSave();
          }
        } catch (err) {
          console.error('Error cleaning up database:', err);
        }
      }
    }
    
    setMediaSignedUrls(urls);
  };

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    
    // Reset input
    if (e.target) {
      e.target.value = '';
    }
  };

  const processFiles = (files: File[]) => {
    // Check total file count
    if (existingMediaUrls.length + mediaFiles.length + files.length > MAX_FILES) {
      toast.error(t.profile.maxFilesReached);
      return;
    }

    // Validate files
    const validFiles: File[] = [];
    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error(t.profile.invalidFileType);
        continue;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(t.profile.fileTooLarge);
        continue;
      }

      validFiles.push(file);
    }

    setMediaFiles([...mediaFiles, ...validFiles]);
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only show drag UI if we're dragging files from outside (not reordering)
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if we're leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropFiles = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Only process if we're dropping files from outside (not reordering)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    }
  };

  const handleRemoveNewFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleRemoveExistingMedia = async (index: number) => {
    const urlToRemove = existingMediaUrls[index];
    
    // Add to delete list
    setFilesToDelete([...filesToDelete, urlToRemove]);
    
    // Remove from display
    setExistingMediaUrls(existingMediaUrls.filter((_, i) => i !== index));
    
    // Delete from bucket immediately
    const { error } = await supabase.storage
      .from('profile-media')
      .remove([urlToRemove]);
    
    if (error) {
      console.error('Error deleting file from bucket:', error);
      toast.error(t.profile.errorDeletingMedia || 'Failed to delete media file');
    }
  };

  // Drag and drop handlers for reordering
  const handleDragStartReorder = (e: React.DragEvent, index: number, type: 'existing' | 'new') => {
    e.stopPropagation(); // Prevent file drop handler from firing
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', 'reorder'); // Mark this as a reorder operation
    setDraggedIndex(type === 'existing' ? index : index + existingMediaUrls.length);
    setIsDragging(false); // Don't show file drop UI for reordering
  };

  const handleDragOverReorder = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropReorder = (e: React.DragEvent, dropIndex: number, type: 'existing' | 'new') => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Drop reorder - draggedIndex:', draggedIndex, 'dropIndex:', dropIndex, 'type:', type);
    
    if (draggedIndex === null) {
      console.log('No dragged index, aborting');
      return;
    }

    const actualDropIndex = type === 'existing' ? dropIndex : dropIndex + existingMediaUrls.length;

    if (draggedIndex === actualDropIndex) {
      console.log('Same position, aborting');
      setDraggedIndex(null);
      return;
    }

    console.log('Reordering from', draggedIndex, 'to', actualDropIndex);

    // Combine all media for reordering
    const allMedia = [
      ...existingMediaUrls.map((url, i) => ({ type: 'existing' as const, data: url, originalIndex: i })),
      ...mediaFiles.map((file, i) => ({ type: 'new' as const, data: file, originalIndex: i }))
    ];

    console.log('Before reorder:', allMedia.map(m => m.type + ':' + (typeof m.data === 'string' ? m.data.split('/').pop() : m.data.name)));

    // Reorder
    const [removed] = allMedia.splice(draggedIndex, 1);
    allMedia.splice(actualDropIndex, 0, removed);

    console.log('After reorder:', allMedia.map(m => m.type + ':' + (typeof m.data === 'string' ? m.data.split('/').pop() : m.data.name)));

    // Separate back into existing and new
    const newExisting = allMedia.filter(m => m.type === 'existing').map(m => m.data as string);
    const newFiles = allMedia.filter(m => m.type === 'new').map(m => m.data as File);

    console.log('Setting new existing:', newExisting.length, 'new files:', newFiles.length);

    setExistingMediaUrls(newExisting);
    setMediaFiles(newFiles);
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    if (!storyText && mediaFiles.length === 0 && existingMediaUrls.length === 0) {
      toast.error('Please add some content to your story');
      return;
    }

    if (!userId) {
      toast.error('User not authenticated');
      console.error('userId is undefined');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload new media files
      const uploadedUrls: string[] = [];
      
      if (mediaFiles.length > 0) {
        const storyId = existingStory?.id || crypto.randomUUID();
        
        for (let i = 0; i < mediaFiles.length; i++) {
          const file = mediaFiles[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${i}.${fileExt}`;
          const filePath = `${userId}/${storyId}/${fileName}`;

          console.log('Uploading file to:', filePath);

          const { error: uploadError } = await supabase.storage
            .from('profile-media')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
            });

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            toast.error(`Failed to upload ${file.name}: ${uploadError.message}`);
            continue;
          }

          uploadedUrls.push(filePath);
          setUploadProgress(((i + 1) / mediaFiles.length) * 100);
        }

        if (uploadedUrls.length === 0 && mediaFiles.length > 0) {
          toast.error('Failed to upload any media files');
          setUploading(false);
          return;
        }
      }

      // Combine existing and new media URLs
      const allMediaUrls = [...existingMediaUrls, ...uploadedUrls];

      // Save or update story in database
      if (existingStory) {
        // Update existing story
        const { error } = await supabase
          .from('user_stories')
          .update({
            story_text: storyText || null,
            media_urls: allMediaUrls.length > 0 ? allMediaUrls : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingStory.id);

        if (error) {
          console.error('Error updating story:', error);
          toast.error(`Failed to update story: ${error.message}`);
          setUploading(false);
          return;
        }

        toast.success(t.profile.storyUpdated);
      } else {
        // Create new story
        console.log('Creating story with user_id:', userId);
        const { error } = await supabase
          .from('user_stories')
          .insert({
            user_id: userId,
            story_text: storyText || null,
            media_urls: allMediaUrls.length > 0 ? allMediaUrls : null,
          });

        if (error) {
          console.error('Error creating story:', error);
          toast.error(`Failed to create story: ${error.message}`);
          setUploading(false);
          return;
        }

        toast.success(t.profile.storyCreated);
      }

      setUploading(false);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving story:', error);
      toast.error('Failed to save story');
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingStory) return;

    if (!confirm(t.profile.deleteStoryConfirm)) {
      return;
    }

    try {
      // Delete media files from storage
      if (existingStory.media_urls && existingStory.media_urls.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('profile-media')
          .remove(existingStory.media_urls);

        if (storageError) {
          console.error('Error deleting media files:', storageError);
        }
      }

      // Delete story from database
      const { error } = await supabase
        .from('user_stories')
        .delete()
        .eq('id', existingStory.id);

      if (error) {
        console.error('Error deleting story:', error);
        toast.error('Failed to delete story');
        return;
      }

      toast.success('Story deleted successfully');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error deleting story:', error);
      toast.error('Failed to delete story');
    }
  };

  return (
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
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '30px',
          maxWidth: '651px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '32px',
                fontWeight: 500,
                lineHeight: '40px',
                color: '#000000',
                margin: 0,
              }}
            >
              {t.profile.shareYourStory || 'Share Your Story'}
            </h2>
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#000000',
                margin: '0',
              }}
            >
              {t.profile.inspireOthers || 'Inspire others. Connect through shared journeys'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f2f2f7',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50px',
              width: '48px',
              height: '48px',
              boxShadow: '0px 0px 10px 0px #dddddd',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#505050" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '0 20px 20px 20px' }}>
          {/* Profile Section */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            {user?.profile_picture_url ? (
              <img
                src={user.profile_picture_url}
                alt={getDisplayName()}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(rgb(105, 181, 124) 0%, rgb(56, 136, 150) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {getInitials()}
              </div>
            )}
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
                color: '#000000',
                margin: 0,
              }}
            >
              {getDisplayName()}
            </p>
          </div>

          {/* Story Text Editor */}
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder={t.profile.storyPlaceholder || "What's your story? Share your journey, challenges you have overcome, or what motivates you...."}
            disabled={uploading}
            style={{
              width: '100%',
              height: '236px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '22px',
              color: '#505050',
              border: '0.5px solid #979797',
              borderRadius: '30px',
              padding: '18px',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: '20px',
            }}
          />

          {/* Media Upload Area */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDropFiles}
            style={{
              border: `0.5px solid ${isDragging ? '#388896' : '#979797'}`,
              borderRadius: '30px',
              padding: '38px 20px',
              marginBottom: '20px',
              background: isDragging ? 'rgba(56, 136, 150, 0.05)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {(existingMediaUrls.length > 0 || mediaFiles.length > 0) ? (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '12px',
                    marginBottom: (existingMediaUrls.length + mediaFiles.length < MAX_FILES) ? '20px' : '0',
                  }}
                >
              {/* Existing media */}
              {existingMediaUrls.map((url, index) => {
                const signedUrl = mediaSignedUrls[url];
                const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                
                return (
                <div
                  key={`existing-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStartReorder(e, index, 'existing')}
                  onDragOver={handleDragOverReorder}
                  onDrop={(e) => handleDropReorder(e, index, 'existing')}
                  style={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#f2f2f7',
                    cursor: 'move',
                  }}
                >
                  {signedUrl ? (
                    <>
                      {isVideo ? (
                        <video
                          src={signedUrl}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none',
                          }}
                        />
                      ) : (
                        <img
                          src={signedUrl}
                          alt={`Media ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0, 0, 0, 0.6)',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="3" y1="15" x2="21" y2="15" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '12px', color: '#979797' }}>
                      Loading...
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveExistingMedia(index)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                );
              })}

              {/* New media files */}
              {mediaFiles.map((file, index) => {
                const isVideo = file.type.startsWith('video/');
                
                return (
                <div
                  key={`new-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStartReorder(e, index, 'new')}
                  onDragOver={handleDragOverReorder}
                  onDrop={(e) => handleDropReorder(e, index, 'new')}
                  style={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#f2f2f7',
                    cursor: 'move',
                  }}
                >
                  {isVideo ? (
                    <video
                      src={URL.createObjectURL(file)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                      }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '6px',
                      padding: '4px 6px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="3" y1="15" x2="21" y2="15" />
                    </svg>
                  </div>
                  <button
                    onClick={() => handleRemoveNewFile(index)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                );
              })}
            </div>
            
            {/* Add More Button */}
            {(existingMediaUrls.length + mediaFiles.length < MAX_FILES) && (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '20px',
                  border: '2px dashed #979797',
                  borderRadius: '20px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#388896';
                  e.currentTarget.style.background = 'rgba(56, 136, 150, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#979797';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#388896" strokeWidth="1.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    color: '#388896',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {t.profile.addMore || 'Add more photos/videos'}
                </p>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '18px',
                    color: '#979797',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {existingMediaUrls.length + mediaFiles.length} / {MAX_FILES}
                </p>
              </div>
            )}
          </>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    color: '#000000',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {t.profile.addPhotosVideos || 'Add photos/videos'}
                </p>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    color: '#979797',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {t.profile.orDragAndDrop || 'or drag and drop'}
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {/* Upload Progress */}
          {uploading && mediaFiles.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  background: '#f2f2f7',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${uploadProgress}%`,
                    height: '100%',
                    background: '#388896',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#979797',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                {t.profile.uploadingMedia} {Math.round(uploadProgress)}%
              </p>
            </div>
          )}

          {/* Footer Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {existingStory && (
              <button
                onClick={handleDelete}
                disabled={uploading}
                style={{
                  background: '#ffffff',
                  color: '#388896',
                  border: 'none',
                  borderRadius: '28px',
                  padding: '15px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '24px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.5 : 1,
                  boxShadow: '0px 0px 10px 0px #dddddd',
                  minWidth: '200px',
                }}
              >
                {t.profile.deleteStory || 'Delete Story'}
              </button>
            )}
            <button
              onClick={onClose}
              disabled={uploading}
              style={{
                background: '#ffffff',
                color: '#388896',
                border: 'none',
                borderRadius: '28px',
                padding: '15px 24px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.5 : 1,
                boxShadow: '0px 0px 10px 0px #dddddd',
                minWidth: '200px',
              }}
            >
              {t.profile.saveDraft || 'Save Draft'}
            </button>
            <button
              onClick={handleSave}
              disabled={uploading}
              style={{
                background: '#388896',
                color: '#ffffff',
                border: 'none',
                borderRadius: '28px',
                padding: '15px 24px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.5 : 1,
                boxShadow: '0px 0px 10px 0px #dddddd',
                minWidth: '200px',
              }}
            >
              {uploading ? t.profile.saving : (t.profile.publishStory || 'Publish Story')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
