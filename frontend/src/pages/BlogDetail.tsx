import React, { useState, useEffect } from 'react';
import { Calendar, User, Eye, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogApi } from '../services/blogApi';
import { Blog } from '../types/blog';

interface BlogDetailProps {
  slug: string;
  onBackToBlogList?: () => void;
  onBackToHome?: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ slug, onBackToBlogList, onBackToHome }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlog(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (blog) {
      fetchRelatedBlogs();
    }
  }, [blog]);

  const fetchBlog = async (blogSlug: string) => {
    try {
      setLoading(true);
      const response = await blogApi.getBlogBySlug(blogSlug);
      setBlog(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    if (!blog) return;

    try {
      // Fetch blogs from the same category
      const category = blog.categories[0];
      if (category) {
        const response = await blogApi.getBlogs({
          category,
          limit: 3
        });
        
        // Filter out the current blog
        const filtered = response.data.blogs.filter(b => b._id !== blog._id);
        setRelatedBlogs(filtered.slice(0, 3));
      }
    } catch (err) {
      console.error('Failed to fetch related blogs:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReadingTime = (minutes?: number) => {
    if (!minutes) return '';
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || blog.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBackClick = () => {
    if (onBackToBlogList) {
      onBackToBlogList();
    } else if (onBackToHome) {
      onBackToHome();
    }
  };

  const handleRelatedBlogClick = (relatedBlog: Blog) => {
    if (relatedBlog.slug) {
      // For now, we'll just reload the current component with new slug
      // In a real router setup, this would navigate to the new blog
      fetchBlog(relatedBlog.slug);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Blog not found'}
            </h1>
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          {/* Categories */}
          {blog.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories.map((category) => (
                <span
                  key={category}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.author.name}</span>
            </div>
            
            {blog.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            )}

            {blog.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{formatReadingTime(blog.readingTime)}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{blog.viewCount} views</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={blog.featuredImage.url}
                alt={blog.featuredImage.alt}
                className="w-full h-full object-cover"
              />
              {blog.featuredImage.caption && (
                <p className="text-sm text-gray-500 text-center py-2 px-4 bg-gray-50">
                  {blog.featuredImage.caption}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {blog.contentType === 'markdown' ? (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {blog.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>
        </article>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {blog.author.bio && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              {blog.author.avatar && (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{blog.author.name}</h4>
                <p className="text-gray-600">{blog.author.bio}</p>
                {blog.author.email && (
                  <a
                    href={`mailto:${blog.author.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                  >
                    Contact Author
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <article key={relatedBlog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {relatedBlog.featuredImage && (
                    <div className="h-32 overflow-hidden">
                      <img
                        src={relatedBlog.featuredImage.url}
                        alt={relatedBlog.featuredImage.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <button
                        onClick={() => handleRelatedBlogClick(relatedBlog)}
                        className="hover:text-blue-600 transition-colors text-left"
                      >
                        {relatedBlog.title}
                      </button>
                    </h4>
                    
                    {relatedBlog.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {relatedBlog.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedBlog.author.name}</span>
                      {relatedBlog.publishedAt && (
                        <span>{formatDate(relatedBlog.publishedAt)}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail; 