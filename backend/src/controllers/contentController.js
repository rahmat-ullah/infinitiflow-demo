import { validationResult } from 'express-validator';
import Content from '../models/Content.js';
import User from '../models/User.js';
import Template from '../models/Template.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

export const getAllContent = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build filter query
  const filter = { user: req.user.id };
  if (req.query.type) filter.type = req.query.type;
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;

  // Build sort query
  let sort = { createdAt: -1 };
  if (req.query.sort) {
    const sortField = req.query.sort.startsWith('-') ? req.query.sort.slice(1) : req.query.sort;
    const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
    sort = { [sortField]: sortOrder };
  }

  const content = await Content.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('template', 'name category')
    .lean();

  const total = await Content.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: content.length,
    data: {
      content,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

export const getContent = catchAsync(async (req, res, next) => {
  const content = await Content.findById(req.params.id)
    .populate('template', 'name category')
    .populate('user', 'firstName lastName');

  if (!content) {
    return next(new AppError('Content not found', 404));
  }

  // Check if user owns the content or if it's public
  if (content.user._id.toString() !== req.user.id && !content.isPublic) {
    return next(new AppError('Access denied', 403));
  }

  // Increment view count
  if (content.user._id.toString() !== req.user.id) {
    await content.addView();
  }

  res.status(200).json({
    status: 'success',
    data: {
      content
    }
  });
});

export const createContent = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  // Check user limits
  const user = await User.findById(req.user.id);
  if (user.hasReachedLimit('contentGenerated')) {
    return next(new AppError('Content limit reached for your plan', 402));
  }

  const contentData = {
    ...req.body,
    user: req.user.id
  };

  const content = await Content.create(contentData);

  // Update user usage stats
  await user.updateUsageStats({ contentGenerated: 1 });

  res.status(201).json({
    status: 'success',
    message: 'Content created successfully',
    data: {
      content
    }
  });
});

export const updateContent = catchAsync(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new AppError('Content not found', 404));
  }

  // Check ownership
  if (content.user.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  // Update content
  Object.assign(content, req.body);
  await content.save();

  res.status(200).json({
    status: 'success',
    message: 'Content updated successfully',
    data: {
      content
    }
  });
});

export const deleteContent = catchAsync(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new AppError('Content not found', 404));
  }

  // Check ownership
  if (content.user.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  await Content.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Content deleted successfully'
  });
});

export const generateContent = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const user = await User.findById(req.user.id);
  
  // Check user limits
  if (user.hasReachedLimit('contentGenerated')) {
    return next(new AppError('Content limit reached for your plan', 402));
  }

  const { prompt, type, title, templateId, generationSettings = {} } = req.body;

  // Default settings
  const defaultSettings = {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    tone: 'professional',
    language: 'en'
  };

  const finalSettings = { ...defaultSettings, ...generationSettings };

  // This is a placeholder for AI content generation
  // In production, this would call the OpenAI API
  const generatedContent = `Generated content for: ${prompt}\n\nThis is a placeholder for AI-generated content. In production, this would be generated using the OpenAI API with the following settings:\n- Model: ${finalSettings.model}\n- Temperature: ${finalSettings.temperature}\n- Max Tokens: ${finalSettings.maxTokens}\n- Tone: ${finalSettings.tone}\n- Language: ${finalSettings.language}`;

  // Create content record
  const content = await Content.create({
    title: title || `Generated ${type}`,
    content: generatedContent,
    type,
    user: req.user.id,
    template: templateId,
    prompt,
    generationSettings: finalSettings,
    wordCount: generatedContent.split(' ').length
  });

  // Update user usage stats
  await user.updateUsageStats({ 
    contentGenerated: 1,
    wordsGenerated: content.wordCount 
  });

  res.status(201).json({
    status: 'success',
    message: 'Content generated successfully',
    data: {
      content
    }
  });
});

export const duplicateContent = catchAsync(async (req, res, next) => {
  const originalContent = await Content.findById(req.params.id);

  if (!originalContent) {
    return next(new AppError('Content not found', 404));
  }

  // Check ownership
  if (originalContent.user.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  const duplicatedContent = await originalContent.duplicate();

  res.status(201).json({
    status: 'success',
    message: 'Content duplicated successfully',
    data: {
      content: duplicatedContent
    }
  });
});

export const revertToVersion = catchAsync(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new AppError('Content not found', 404));
  }

  // Check ownership
  if (content.user.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  const versionIndex = parseInt(req.params.versionIndex);
  
  try {
    await content.revertToVersion(versionIndex);
    res.status(200).json({
      status: 'success',
      message: 'Content reverted successfully',
      data: {
        content
      }
    });
  } catch (error) {
    return next(new AppError('Invalid version index', 400));
  }
});

export const toggleFavorite = catchAsync(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new AppError('Content not found', 404));
  }

  // Check ownership
  if (content.user.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  content.isFavorite = !content.isFavorite;
  await content.save();

  res.status(200).json({
    status: 'success',
    message: `Content ${content.isFavorite ? 'added to' : 'removed from'} favorites`,
    data: {
      content
    }
  });
});

export const addRating = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const content = await Content.findById(req.params.id);

  if (!content) {
    return next(new AppError('Content not found', 404));
  }

  if (!content.isPublic) {
    return next(new AppError('Can only rate public content', 400));
  }

  const { rating } = req.body;
  await content.addRating(rating);

  res.status(200).json({
    status: 'success',
    message: 'Rating added successfully',
    data: {
      content
    }
  });
});

export const searchContent = catchAsync(async (req, res, next) => {
  const { q, type, category, status } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!q) {
    return next(new AppError('Search query is required', 400));
  }

  const filters = { user: req.user.id };
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (status) filters.status = status;

  const content = await Content.searchContent(q, filters)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    status: 'success',
    results: content.length,
    data: {
      content
    }
  });
});

export const getPopularContent = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const content = await Content.getPopularContent(limit);

  res.status(200).json({
    status: 'success',
    results: content.length,
    data: {
      content
    }
  });
});

export const getTrendingContent = catchAsync(async (req, res, next) => {
  const days = parseInt(req.query.days) || 7;
  const limit = parseInt(req.query.limit) || 10;
  const content = await Content.getTrendingContent(days, limit);

  res.status(200).json({
    status: 'success',
    results: content.length,
    data: {
      content
    }
  });
}); 