import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CreatePost } from './community/CreatePost';
import { PostCard } from './community/PostCard';
import { CommunityHeader } from './community/CommunityHeader';
import { HeroBanner } from './community/HeroBanner';
import { UserStoriesPreview } from './community/UserStoriesPreview';

interface CommunityPageProps {
  onNavigate: (page: string) => void;
  scrollToPostId?: string;
  isMobile?: boolean;
}

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
  location?: string | null;
  reaction_type?: string | null;
}

export function CommunityPage({ onNavigate, scrollToPostId, isMobile: isMobileProp }: CommunityPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const POSTS_PER_PAGE = 10;
  const [isMobileLocal, setIsMobileLocal] = useState(window.innerWidth <= 768);
  const isMobile = isMobileProp ?? isMobileLocal;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLocal(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user]);

  // Scroll to post when scrollToPostId is provided
  useEffect(() => {
    if (scrollToPostId && posts.length > 0) {
      const timer = setTimeout(() => {
        const postElement = document.getElementById(`post-${scrollToPostId}`);
        if (postElement) {
          postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300); // Small delay to ensure posts are rendered
      return () => clearTimeout(timer);
    }
  }, [scrollToPostId, posts]);

  const loadPosts = async (pageNum: number = 0) => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Get posts with user information
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          user_id,
          post_text,
          media_urls,
          like_count,
          comment_count,
          repost_count,
          created_at,
          location,
          reaction_type,
          user:user_id (
            name,
            first_name,
            profile_picture_url
          )
        `)
        .order('created_at', { ascending: false })
        .range(pageNum * POSTS_PER_PAGE, (pageNum + 1) * POSTS_PER_PAGE - 1);

      if (error) throw error;

      // Transform data
      const transformedPosts: Post[] = (data || []).map((post: any) => ({
        id: post.id,
        user_id: post.user_id,
        post_text: post.post_text,
        media_urls: post.media_urls,
        like_count: post.like_count,
        comment_count: post.comment_count || 0,
        repost_count: post.repost_count || 0,
        created_at: post.created_at,
        location: post.location,
        reaction_type: post.reaction_type || null,
        user_name: post.user?.name || '',
        user_first_name: post.user?.first_name || '',
        user_profile_picture: post.user?.profile_picture_url || null,
      }));

      if (pageNum === 0) {
        setPosts(transformedPosts);
      } else {
        setPosts([...posts, ...transformedPosts]);
      }

      setHasMore(transformedPosts.length === POSTS_PER_PAGE);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading posts:', error);
      alert(t.community.failedToLoadPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostCreated = () => {
    // Reload posts from the beginning
    loadPosts(0);
  };

  const handlePostDeleted = () => {
    // Reload posts from the beginning
    loadPosts(0);
  };

  const handleLoadMore = () => {
    loadPosts(page + 1);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const postText = (post.post_text || '').toLowerCase();
    const userName = `${post.user_first_name} ${post.user_name}`.toLowerCase();
    const location = (post.location || '').toLowerCase();
    
    return postText.includes(query) || 
           userName.includes(query) || 
           location.includes(query);
  });

  // Check if user is allowed to access community
  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f9fa',
          padding: '20px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h2
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '24px',
              fontWeight: 600,
              color: '#192126',
              marginBottom: '12px',
            }}
          >
            {t.nav.community}
          </h2>
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              color: '#979797',
              marginBottom: '24px',
            }}
          >
            Please login to access the community.
          </p>
          <button
            onClick={() => onNavigate('auth')}
            style={{
              padding: '12px 32px',
              background: '#388896',
              border: 'none',
              borderRadius: '24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            {t.auth.login}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        padding: isMobile ? '12px' : '20px',
        paddingTop: isMobile ? '70px' : '61px',
        paddingBottom: '100px',
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? '100%' : '800px',
          margin: '0 auto',
        }}
      >
        {/* Community Header */}
        <CommunityHeader 
          onSearch={setSearchQuery}
          onNotificationClick={() => {
            // TODO: Implement notifications
            console.log('Notifications clicked');
          }}
          hasNotifications={false}
          isMobile={isMobile}
        />

        {/* Hero Banner - 30px gap from header */}
        <div style={{ marginTop: isMobile ? '20px' : '30px' }}>
          <HeroBanner isMobile={isMobile} />
        </div>

        {/* User Stories Preview - 30px gap from hero banner */}
        <div style={{ marginTop: isMobile ? '20px' : '30px' }}>
          <UserStoriesPreview onNavigate={onNavigate} isMobile={isMobile} />
        </div>

        {/* Create Post - 24px gap from user stories */}
        <div style={{ marginTop: isMobile ? '16px' : '24px' }}>
          <CreatePost onPostCreated={handlePostCreated} isMobile={isMobile} />
        </div>

        {/* Posts Feed */}
        {isLoading && posts.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              color: '#979797',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {t.common.loading}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '60px 40px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}
            >
              {searchQuery ? '🔍' : '📝'}
            </div>
            <h3
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#192126',
                marginBottom: '8px',
              }}
            >
              {searchQuery ? 'No results found' : t.community.noPosts}
            </h3>
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                color: '#979797',
              }}
            >
              {searchQuery 
                ? 'Try different keywords or clear your search' 
                : t.community.noPostsDescription}
            </p>
          </div>
        ) : (
          <>
            {filteredPosts.map((post) => (
              <div key={post.id} id={`post-${post.id}`}>
                <PostCard
                  post={post}
                  onPostDeleted={handlePostDeleted}
                  onNavigate={onNavigate}
                  isMobile={isMobile}
                />
              </div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  style={{
                    padding: '12px 32px',
                    background: isLoading ? '#cccccc' : 'transparent',
                    border: '1px solid #e0e0e0',
                    borderRadius: '24px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: isLoading ? '#ffffff' : '#388896',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isLoading ? t.common.loading : t.community.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
