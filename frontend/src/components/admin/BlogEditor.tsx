import React, { useState, useEffect } from 'react';
import { Save, Eye, Upload, X, Plus, Trash2, FileText, Code } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogApi } from '../../services/blogApi';
import { Blog, BlogImage } from '../../types/blog';

interface BlogEditorProps {
  mode?: 'create' | 'edit';
  blogId?: string;
  onClose?: () => void;
  onSaved?: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ mode = 'create', blogId, onClose, onSaved }) => {
  
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    contentType: 'rich-text',
    featuredImage: undefined,
    images: [],
    author: {
      name: '',
      email: '',
      bio: ''
    },
    categories: [],
    tags: [],
    status: 'draft',
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    if (mode === 'edit' && blogId) {
      fetchBlog(blogId);
    }
  }, [mode, blogId]);

  const fetchBlog = async (id: string) => {
    try {
      setLoading(true);
      const response = await blogApi.getBlogById(id);
      setBlog(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setBlog(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleContentChange = (content: string) => {
    setBlog(prev => ({ ...prev, content }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      const response = await blogApi.uploadImage(file);
      
      if (response.success && 'url' in response.data) {
        const imageData: BlogImage = {
          url: response.data.url,
          alt: file.name,
          caption: ''
        };
        
        setBlog(prev => ({
          ...prev,
          images: [...(prev.images || []), imageData]
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFeaturedImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      const response = await blogApi.uploadImage(file);
      
      if (response.success && 'url' in response.data) {
        const imageData: BlogImage = {
          url: response.data.url,
          alt: file.name,
          caption: ''
        };
        
        setBlog(prev => ({
          ...prev,
          featuredImage: imageData
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload featured image');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setBlog(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const removeFeaturedImage = () => {
    setBlog(prev => ({
      ...prev,
      featuredImage: undefined
    }));
  };

  const addCategory = () => {
    if (newCategory.trim() && !blog.categories?.includes(newCategory.trim())) {
      setBlog(prev => ({
        ...prev,
        categories: [...(prev.categories || []), newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setBlog(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || []
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !blog.tags?.includes(newTag.trim())) {
      setBlog(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setBlog(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !blog.seo?.metaKeywords?.includes(newKeyword.trim())) {
      setBlog(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaKeywords: [...(prev.seo?.metaKeywords || []), newKeyword.trim()]
        }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setBlog(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaKeywords: prev.seo?.metaKeywords?.filter(k => k !== keyword) || []
      }
    }));
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    try {
      setSaving(true);
      setError(null);

      // Client-side validation
      if (!blog.title || blog.title.trim().length < 5) {
        setError('Title must be at least 5 characters long');
        return;
      }

      if (!blog.content || blog.content.trim().length < 50) {
        setError('Content must be at least 50 characters long');
        return;
      }

      if (!blog.author?.name || blog.author.name.trim().length < 2) {
        setError('Author name must be at least 2 characters long');
        return;
      }

      const blogData = {
        ...blog,
        status,
        viewCount: blog.viewCount || 0,
        // Ensure required fields are properly set
        title: blog.title.trim(),
        content: blog.content.trim(),
        author: {
          ...blog.author,
          name: blog.author.name.trim(),
          email: blog.author.email?.trim() || '',
          bio: blog.author.bio?.trim() || ''
        }
      };

      console.log('Sending blog data:', blogData);

      let response;
      if (mode === 'edit' && blogId) {
        response = await blogApi.updateBlog(blogId, blogData);
      } else {
        response = await blogApi.createBlog(blogData as Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'viewCount'>);
      }

      if (response.success) {
        if (onSaved) {
          onSaved();
        }
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (onSaved) {
      onSaved(); // Use onSaved to go back to the blog list
    }
  };

  const handlePublish = () => {
    handleSave('published');
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Blog' : 'Create New Blog'}
          </h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Back
            </button>
            
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={blog.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter blog title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={blog.slug || ''}
                    onChange={(e) => setBlog(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="blog-url-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={blog.excerpt || ''}
                    onChange={(e) => setBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the blog post..."
                  />
                </div>
              </div>
            </div>

            {/* Content Type Toggle */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Content</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBlog(prev => ({ ...prev, contentType: 'rich-text' }))}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
                      blog.contentType === 'rich-text'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Rich Text
                  </button>
                  <button
                    onClick={() => setBlog(prev => ({ ...prev, contentType: 'markdown' }))}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
                      blog.contentType === 'markdown'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    Markdown
                  </button>
                </div>
              </div>

              {blog.contentType === 'rich-text' ? (
                <ReactQuill
                  value={blog.content || ''}
                  onChange={handleContentChange}
                  modules={quillModules}
                  theme="snow"
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              ) : (
                <textarea
                  value={blog.content || ''}
                  onChange={(e) => handleContentChange(e.target.value)}
                  rows={20}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Write your markdown content here..."
                />
              )}
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
              
              {/* Featured Image */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Featured Image</h3>
                {blog.featuredImage ? (
                  <div className="relative">
                    <img
                      src={blog.featuredImage.url}
                      alt={blog.featuredImage.alt}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button
                      onClick={removeFeaturedImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 mb-2">Upload featured image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFeaturedImageUpload(file);
                      }}
                      className="hidden"
                      id="featured-image-upload"
                    />
                    <label
                      htmlFor="featured-image-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>

              {/* Additional Images */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Additional Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {blog.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </label>
              </div>

              {uploadingImage && (
                <div className="mt-4 text-center">
                  <p className="text-blue-600">Uploading image...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Author</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={blog.author?.name || ''}
                    onChange={(e) => setBlog(prev => ({
                      ...prev,
                      author: { 
                        name: e.target.value,
                        email: prev.author?.email || '',
                        bio: prev.author?.bio || ''
                      }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={blog.author?.email || ''}
                    onChange={(e) => setBlog(prev => ({
                      ...prev,
                      author: { 
                        name: prev.author?.name || '',
                        email: e.target.value,
                        bio: prev.author?.bio || ''
                      }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={blog.author?.bio || ''}
                    onChange={(e) => setBlog(prev => ({
                      ...prev,
                      author: { 
                        name: prev.author?.name || '',
                        email: prev.author?.email || '',
                        bio: e.target.value
                      }
                    }))}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add category..."
                  />
                  <button
                    onClick={addCategory}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {blog.categories?.map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {category}
                      <button
                        onClick={() => removeCategory(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={addTag}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={blog.seo?.metaTitle || ''}
                    onChange={(e) => setBlog(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaTitle: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(blog.seo?.metaTitle || '').length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={blog.seo?.metaDescription || ''}
                    onChange={(e) => setBlog(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaDescription: e.target.value }
                    }))}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(blog.seo?.metaDescription || '').length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add keyword..."
                    />
                    <button
                      onClick={addKeyword}
                      className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {blog.seo?.metaKeywords?.map((keyword) => (
                      <span
                        key={keyword}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {keyword}
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor; 