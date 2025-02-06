import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from '../utils/i18n';
import ArticleTemplate from '../components/ArticleTemplate';
import { getAllDocuments } from '../lib/mongodb';
import { syncAllContent } from '../lib/sync-prismic';

// This function gets called at build time
export async function getStaticProps({ locale, previewData }) {
  try {
    // Get all blog posts for the current language from MongoDB
    const posts = await getAllDocuments('blog_post', locale);

    return {
      props: {
        posts: posts.map(post => ({
          uid: post.uid,
          title: post.data.title,
          excerpt: post.data.excerpt,
          publishedAt: post.first_publication_date,
        })),
        isAdmin: process.env.NODE_ENV === 'development', // Only show sync button in development
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
        isAdmin: process.env.NODE_ENV === 'development',
      },
      revalidate: 60,
    };
  }
}

export default function BlogPosts({ posts, isAdmin }) {
  const router = useRouter();
  const { t, locale } = useTranslations();
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  useEffect(() => {
    // Fetch comments when a post is selected
    if (selectedPost) {
      fetch(`/api/posts/${selectedPost.uid}?locale=${locale}`)
        .then(res => res.json())
        .then(data => {
          setComments(data.comments);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
  }, [selectedPost, locale]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleAddComment = async (content) => {
    if (!selectedPost) return;

    try {
      const response = await fetch(`/api/posts/${selectedPost.uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          author: 'Anonymous', // You might want to get this from user session
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments(prevComments => [newComment, ...prevComments]);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const response = await fetch('/api/prismic/sync', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Sync failed');
      }

      // Refresh the page to show new content
      router.reload();
    } catch (error) {
      console.error('Error syncing content:', error);
      setSyncError('Failed to sync content');
    } finally {
      setIsSyncing(false);
    }
  };

  if (router.isFallback) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('blog.title')}</h1>
      
      {/* Admin Controls */}
      {isAdmin && (
        <div className="mb-8">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`px-4 py-2 rounded ${
              isSyncing
                ? 'bg-gray-400'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isSyncing ? 'Syncing...' : 'Sync Prismic Content'}
          </button>
          {syncError && (
            <p className="text-red-500 mt-2">{syncError}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Posts List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('blog.recentPosts')}</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.uid}
                className="p-4 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => handlePostClick(post)}
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString(locale)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Post and Comments */}
        {selectedPost && (
          <div>
            <ArticleTemplate
              title={selectedPost.title}
              publishedAt={selectedPost.publishedAt}
            />
            
            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">{t('blog.comments')}</h3>
              
              {/* Add Comment Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const content = e.target.comment.value;
                  if (content.trim()) {
                    handleAddComment(content);
                    e.target.comment.value = '';
                  }
                }}
                className="mb-6"
              >
                <textarea
                  name="comment"
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder={t('blog.addComment')}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {t('blog.submit')}
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded">
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {comment.author} - {new Date(comment.createdAt).toLocaleDateString(locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}