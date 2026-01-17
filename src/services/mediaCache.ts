/**
 * Media Cache Service
 * Caches signed URLs for media files to prevent repeated fetching
 */

interface CachedMedia {
  url: string;
  expiresAt: number;
}

interface CacheStorage {
  [key: string]: CachedMedia;
}

class MediaCacheService {
  private memoryCache: Map<string, CachedMedia> = new Map();
  private readonly CACHE_KEY = 'sarathi_media_cache';
  private readonly CACHE_DURATION = 3000000; // 50 minutes (URLs expire in 1 hour, refresh before)

  constructor() {
    this.loadFromLocalStorage();
    this.startCleanupInterval();
  }

  /**
   * Load cache from localStorage on initialization
   */
  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (stored) {
        const cache: CacheStorage = JSON.parse(stored);
        const now = Date.now();
        
        // Only load non-expired items
        Object.entries(cache).forEach(([key, value]) => {
          if (value.expiresAt > now) {
            this.memoryCache.set(key, value);
          }
        });
        
        console.log(`📦 Loaded ${this.memoryCache.size} cached media items from storage`);
      }
    } catch (error) {
      console.error('Error loading media cache from localStorage:', error);
    }
  }

  /**
   * Save cache to localStorage
   */
  private saveToLocalStorage(): void {
    try {
      const cache: CacheStorage = {};
      this.memoryCache.forEach((value, key) => {
        cache[key] = value;
      });
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('Error saving media cache to localStorage:', error);
    }
  }

  /**
   * Start periodic cleanup of expired items
   */
  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanup();
    }, 300000); // Clean up every 5 minutes
  }

  /**
   * Remove expired items from cache
   */
  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    this.memoryCache.forEach((value, key) => {
      if (value.expiresAt <= now) {
        this.memoryCache.delete(key);
        cleaned++;
      }
    });
    
    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired media items from cache`);
      this.saveToLocalStorage();
    }
  }

  /**
   * Generate a cache key from bucket and path
   */
  private getCacheKey(bucket: string, path: string): string {
    return `${bucket}:${path}`;
  }

  /**
   * Get a cached URL if available and not expired
   */
  get(bucket: string, path: string): string | null {
    const key = this.getCacheKey(bucket, path);
    const cached = this.memoryCache.get(key);
    
    if (cached && cached.expiresAt > Date.now()) {
      console.log(`✅ Cache HIT: ${key}`);
      return cached.url;
    }
    
    if (cached) {
      console.log(`⏰ Cache EXPIRED: ${key}`);
      this.memoryCache.delete(key);
    } else {
      console.log(`❌ Cache MISS: ${key}`);
    }
    
    return null;
  }

  /**
   * Store a URL in the cache
   */
  set(bucket: string, path: string, url: string): void {
    const key = this.getCacheKey(bucket, path);
    const expiresAt = Date.now() + this.CACHE_DURATION;
    
    this.memoryCache.set(key, { url, expiresAt });
    console.log(`💾 Cache SET: ${key} (expires in ${Math.round(this.CACHE_DURATION / 60000)} min)`);
    
    // Save to localStorage (debounced in a real app, but ok for now)
    this.saveToLocalStorage();
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
    localStorage.removeItem(this.CACHE_KEY);
    console.log('🗑️ Media cache cleared');
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; items: string[] } {
    return {
      size: this.memoryCache.size,
      items: Array.from(this.memoryCache.keys()),
    };
  }
}

// Export singleton instance
export const mediaCache = new MediaCacheService();
