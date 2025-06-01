import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  X, 
  Upload, 
  Star, 
  Image as ImageIcon,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { testimonialsApi, type Testimonial } from '../../services/testimonialsApi';

interface TestimonialEditorProps {
  testimonial?: Testimonial | null;
  onSaved: () => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
  location: string;
  industry: string;
  companySize: string;
  videoUrl: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  tags: string[];
}

interface FormErrors {
  [key: string]: string;
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({
  testimonial,
  onSaved,
  onCancel
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    company: '',
    quote: '',
    image: '',
    rating: 5,
    location: '',
    industry: '',
    companySize: '',
    videoUrl: '',
    featured: false,
    active: true,
    displayOrder: 0,
    tags: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // Initialize form data
  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || '',
        role: testimonial.role || '',
        company: testimonial.company || '',
        quote: testimonial.quote || '',
        image: testimonial.image || '',
        rating: testimonial.rating || 5,
        location: testimonial.location || '',
        industry: testimonial.industry || '',
        companySize: testimonial.companySize || '',
        videoUrl: testimonial.videoUrl || '',
        featured: testimonial.featured || false,
        active: testimonial.active !== undefined ? testimonial.active : true,
        displayOrder: testimonial.displayOrder || 0,
        tags: testimonial.tags || []
      });
    }
  }, [testimonial]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    } else if (formData.role.length < 2) {
      newErrors.role = 'Role must be at least 2 characters';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    } else if (formData.company.length < 2) {
      newErrors.company = 'Company must be at least 2 characters';
    }

    if (!formData.quote.trim()) {
      newErrors.quote = 'Quote is required';
    } else if (formData.quote.length < 10) {
      newErrors.quote = 'Quote must be at least 10 characters';
    } else if (formData.quote.length > 1000) {
      newErrors.quote = 'Quote cannot exceed 1000 characters';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image is required';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    if (formData.videoUrl && !isValidUrl(formData.videoUrl)) {
      newErrors.videoUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log('🚫 No file selected');
      return;
    }

    console.log('📁 File selected:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('❌ Invalid file type:', file.type);
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.error('❌ File too large:', file.size);
      setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
      return;
    }

    try {
      console.log('🚀 Starting image upload...');
      setUploading(true);
      const response = await testimonialsApi.uploadImage(file);
      if (response.success) {
        console.log('✅ Image uploaded successfully:', response.data.url);
        handleInputChange('image', response.data.url);
      } else {
        console.error('❌ Upload failed: success = false');
        setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
      }
    } catch (err) {
      console.error('💥 Upload error:', err);
      setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
    } finally {
      setUploading(false);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      handleInputChange('tags', [...formData.tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const testimonialData = {
        ...formData,
        tags: formData.tags.filter(tag => tag.trim() !== '')
      };

      if (testimonial?._id) {
        await testimonialsApi.updateTestimonial(testimonial._id, testimonialData);
      } else {
        await testimonialsApi.createTestimonial(testimonialData);
      }

      onSaved();
    } catch (err) {
      console.error('Error saving testimonial:', err);
      setErrors({ submit: 'Failed to save testimonial. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const companySizeOptions = [
    { value: '', label: 'Select company size' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {testimonial ? 'Update testimonial information' : 'Create a new customer testimonial'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Customer name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white ${
                  errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Job title"
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.role}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white ${
                  errors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Company name"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.company}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white"
                placeholder="City, Country"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white"
                placeholder="Technology, Healthcare, etc."
              />
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white"
              >
                {companySizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Testimonial Quote *
            </label>
            <textarea
              value={formData.quote}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white ${
                errors.quote ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Customer testimonial..."
            />
            <div className="flex justify-between mt-1">
              {errors.quote ? (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.quote}
                </p>
              ) : (
                <span></span>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formData.quote.length}/1000
              </span>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Media & Assets
          </h2>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image *
            </label>
            <div className="flex items-center space-x-4">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-700 text-gray-700 dark:text-gray-300"
                >
                  {uploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                  ) : (
                    <Upload size={16} className="mr-2" />
                  )}
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.image}
              </p>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video URL (Optional)
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white ${
                errors.videoUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="https://youtube.com/watch?v=..."
            />
            {errors.videoUrl && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.videoUrl}
              </p>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Settings & Metadata
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleInputChange('rating', rating)}
                    className={`p-1 ${
                      rating <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <Star size={24} className="fill-current" />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white"
                min="0"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Lower numbers appear first
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-gray-900 dark:text-white"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Status Toggles */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Show this testimonial on the website
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange('active', !formData.active)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.active ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.active ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Highlight this testimonial in featured sections
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange('featured', !formData.featured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.featured ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.featured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle size={16} className="mr-2" />
              {errors.submit}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg transition-colors"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {loading ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Create Testimonial'}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialEditor; 