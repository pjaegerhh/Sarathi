/**
 * Image resizing utilities for creating thumbnails
 */

export interface ResizedImages {
  thumbnail: File;  // Small version for fast display in feed
  full: File;       // Full size for lightbox
}

/**
 * Resize an image to two sizes: thumbnail and full
 * @param file Original image file
 * @param maxThumbnailSize Maximum size for thumbnail (KB)
 * @param maxFullSize Maximum size for full image (MB)
 * @returns Promise with both resized versions
 */
export async function resizeImage(
  file: File,
  maxThumbnailSize: number = 200, // 200KB for thumbnails
  maxFullSize: number = 2 // 2MB for full size
): Promise<ResizedImages> {
  // If it's a video, return as-is
  if (file.type.startsWith('video/')) {
    return {
      thumbnail: file,
      full: file,
    };
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = async () => {
      try {
        // Create thumbnail (max 800px width, optimized for feed)
        const thumbnail = await resizeToSize(
          img,
          800,
          maxThumbnailSize * 1024,
          0.7 // Lower quality for thumbnail
        );

        // Create full size (max 1920px width for lightbox)
        const full = await resizeToSize(
          img,
          1920,
          maxFullSize * 1024 * 1024,
          0.85 // Higher quality for full size
        );

        resolve({ thumbnail, full });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Resize image to target width and file size
 */
async function resizeToSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxSizeBytes: number,
  initialQuality: number
): Promise<File> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // Calculate dimensions maintaining aspect ratio
  let width = img.width;
  let height = img.height;

  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  canvas.width = width;
  canvas.height = height;

  // Draw image
  ctx.drawImage(img, 0, 0, width, height);

  // Try to meet the size requirement by adjusting quality
  let quality = initialQuality;
  let blob: Blob | null = null;

  for (let i = 0; i < 5; i++) {
    blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', quality);
    });

    if (!blob) break;

    // If size is acceptable or quality is already very low, stop
    if (blob.size <= maxSizeBytes || quality <= 0.3) {
      break;
    }

    // Reduce quality for next iteration
    quality -= 0.1;
  }

  if (!blob) {
    throw new Error('Failed to create image blob');
  }

  // Convert blob to File
  return new File([blob], 'image.jpg', { type: 'image/jpeg' });
}

/**
 * Batch resize multiple images
 */
export async function resizeImages(
  files: File[],
  onProgress?: (current: number, total: number) => void
): Promise<{ thumbnails: File[]; fulls: File[] }> {
  const thumbnails: File[] = [];
  const fulls: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (file.type.startsWith('video/')) {
      // Videos are not resized
      thumbnails.push(file);
      fulls.push(file);
    } else {
      const { thumbnail, full } = await resizeImage(file);
      thumbnails.push(thumbnail);
      fulls.push(full);
    }

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return { thumbnails, fulls };
}
