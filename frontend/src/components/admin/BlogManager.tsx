import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Calendar, User, BarChart3 } from 'lucide-react';
import { blogApi } from '../../services/blogApi';
import { Blog } from '../../types/blog';
import BlogEditor from './BlogEditor';

const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    archivedBlogs: 0,
    totalViews: 0
  });

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getAdminBlogs({
        page: currentPage,
        limit: 10,
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchTerm || undefined
      });

      setBlogs(response.data.blogs);
      setTotalPages(response.data.pagination.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await blogApi.getBlogStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch blog stats:', err);
    }
  };

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  const handleEditBlog = (blogId: string) => {
    setEditingBlog(blogId);
    setShowEditor(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      await blogApi.deleteBlog(blogId);
      fetchBlogs();
      fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog');
    }
  };

  const handlePublishToggle = async (blog: Blog) => {
    try {
      if (blog.status === 'published') {
        await blogApi.unpublishBlog(blog._id!);
      } else {
        await blogApi.publishBlog(blog._id!);
      }
      fetchBlogs();
      fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (showEditor) {
    return (
      <BlogEditor 
        mode={editingBlog ? 'edit' : 'create'}
        blogId={editingBlog || undefined}
        onSaved={() => {
          setShowEditor(false);
          setEditingBlog(null);
          fetchBlogs();
          fetchStats();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
        </div>
        <button
          onClick={handleCreateBlog}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Blogs</p>
              <p className="text-xl font-semibold text-gray-900">{stats.totalBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-xl font-semibold text-gray-900">{stats.publishedBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Edit className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-xl font-semibold text-gray-900">{stats.draftBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <EyeOff className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Archived</p>
              <p className="text-xl font-semibold text-gray-900">{stats.archivedBlogs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-xl font-semibold text-gray-900">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No blogs found.</p>
            <button
              onClick={handleCreateBlog}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Create your first blog post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {blog.title}
                        </div>
                        {blog.excerpt && (
                          <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {blog.excerpt}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{blog.author.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{blog.viewCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {blog.createdAt && formatDate(blog.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditBlog(blog._id!)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handlePublishToggle(blog)}
                          className={`p-1 ${
                            blog.status === 'published'
                              ? 'text-yellow-600 hover:text-yellow-800'
                              : 'text-green-600 hover:text-green-800'
                          }`}
                          title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {blog.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteBlog(blog._id!)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogManager; 