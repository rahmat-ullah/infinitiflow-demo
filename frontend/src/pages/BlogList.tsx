import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Eye, Clock, Tag, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogApi } from '../services/blogApi';
import { Blog, BlogCategory, BlogTag } from '../types/blog';

interface BlogListProps {
  onBlogClick?: (slug: string) => void;
  onBackToHome?: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ onBlogClick, onBackToHome }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    fetchTags();
  }, [currentPage, searchTerm, selectedCategory, selectedTag, sortBy, sortOrder]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getBlogs({
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
        tag: selectedTag || undefined,
        sortBy,
        sortOrder
      });

      setBlogs(response.data.blogs);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await blogApi.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await blogApi.getTags();
      setTags(response.data.slice(0, 20)); // Limit to top 20 tags
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
    setSortBy('publishedAt');
    setSortOrder('desc');
    setCurrentPage(1);
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

  const handleBlogClick = (blog: Blog) => {
    if (onBlogClick && blog.slug) {
      onBlogClick(blog.slug);
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </button>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tutorials, and updates from our team
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="flex items-center gap-4">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  handleSortChange(newSortBy, newSortOrder as 'asc' | 'desc');
                }}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="publishedAt-desc">Latest First</option>
                <option value="publishedAt-asc">Oldest First</option>
                <option value="viewCount-desc">Most Popular</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => handleTagChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag.name} value={tag.name}>
                      {tag.name} ({tag.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(searchTerm || selectedCategory || selectedTag) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Search: {searchTerm}
                </span>
              )}
              {selectedCategory && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedTag && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  Tag: {selectedTag}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-red-600 hover:text-red-800 ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {pagination.totalItems} blog{pagination.totalItems !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear filters to see all blogs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.map((blog) => (
              <article key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Featured Image */}
                {blog.featuredImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.featuredImage.url}
                      alt={blog.featuredImage.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Categories */}
                  {blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <button
                      onClick={() => handleBlogClick(blog)}
                      className="hover:text-blue-600 transition-colors text-left"
                    >
                      {blog.title}
                    </button>
                  </h2>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  )}

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.publishedAt && formatDate(blog.publishedAt)}
                      </div>
                      {blog.readingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatReadingTime(blog.readingTime)}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blog.viewCount}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{blog.author.name}</span>
                  </div>

                  {/* Tags */}
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.total > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={!pagination.hasPrev}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {[...Array(pagination.total)].map((_, i) => {
                const page = i + 1;
                const isCurrentPage = page === currentPage;
                
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === pagination.total ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                      }}
                      className={`px-3 py-2 border rounded-md ${
                        isCurrentPage
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="px-2">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={!pagination.hasNext}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList; 