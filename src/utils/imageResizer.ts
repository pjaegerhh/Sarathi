/**
 * Image resizing utilities for creating thumbnails and upload-safe full images.
 * Keeps full-size images well below 5MB for storage/upload limits.
 */

export interface ResizedImages {
  thumbnail: File;  // Small version for fast display in feed
  full: File;       // Full size for lightbox, capped well below 5MB
}

/** Max full-image size in MB (kept well below 5MB upload/storage limits). */
const DEFAULT_MAX_FULL_SIZE_MB = 4;

/**
 * Resize an image to two sizes: thumbnail and full (full capped well below 5MB).
 * @param file Original image file
 * @param maxThumbnailSize Maximum size for thumbnail (KB)
 * @param maxFullSize Maximum size for full image (MB); default 4MB to stay under 5MB
 * @returns Promise with both resized versions
 */
export async function resizeImage(
  file: File,
  maxThumbnailSize: number = 200, // 200KB for thumbnails
  maxFullSize: number = DEFAULT_MAX_FULL_SIZE_MB
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

        // Create full size (max 1920px width, hard cap well below 5MB for uploads)
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

const MIN_WIDTH = 400;

/**
 * Resize image to target width and enforce max file size (never exceed maxSizeBytes).
 */
async function resizeToSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxSizeBytes: number,
  initialQuality: number
): Promise<File> {
  let width = img.width;
  let height = img.height;

  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  let blob: Blob | null = null;
  let quality = initialQuality;

  while (width >= MIN_WIDTH) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    quality = initialQuality;
    for (let i = 0; i < 8; i++) {
      blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', quality);
      });

      if (!blob) break;
      if (blob.size <= maxSizeBytes) break;
      quality -= 0.1;
    }

    if (blob && blob.size <= maxSizeBytes) break;
    if (width <= MIN_WIDTH) break;

    width = Math.max(MIN_WIDTH, Math.floor(width * 0.75));
    height = Math.round((img.height * width) / img.width);
  }

  if (!blob) {
    throw new Error('Failed to create image blob');
  }

  // If still over limit (e.g. very dense image), reduce quality further
  if (blob.size > maxSizeBytes) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    for (let q = 0.4; q >= 0.2; q -= 0.05) {
      const b = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', q);
      });
      if (b && b.size <= maxSizeBytes) {
        blob = b;
        break;
      }
      if (b) blob = b;
    }
  }

  return new File([blob!], 'image.jpg', { type: 'image/jpeg' });
}

/**
 * Batch resize multiple images. Every image is resized; full size is capped at 4MB so uploads stay under 5MB.
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
