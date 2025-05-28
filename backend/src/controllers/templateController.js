import { validationResult } from 'express-validator';
import Template from '../models/Template.js';
import User from '../models/User.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

export const getAllTemplates = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Build filter query
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.type) filter.type = req.query.type;
  if (req.query.creator) filter.creator = req.query.creator;
  
  // For non-admin users, only show public and their own templates
  if (req.user.role !== 'admin') {
    filter.$or = [
      { isPublic: true, isActive: true },
      { creator: req.user.id }
    ];
  }

  const templates = await Template.find(filter)
    .sort({ usageStats: { totalUses: -1 }, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('creator', 'firstName lastName')
    .lean();

  const total = await Template.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: templates.length,
    data: {
      templates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

export const getTemplate = catchAsync(async (req, res, next) => {
  const template = await Template.findById(req.params.id)
    .populate('creator', 'firstName lastName avatar')
    .populate('relatedTemplates', 'name description category');

  if (!template) {
    return next(new AppError('Template not found', 404));
  }

  // Check access permissions
  if (!template.isPublic && template.creator._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Access denied', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      template
    }
  });
});

export const createTemplate = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const templateData = {
    ...req.body,
    creator: req.user.id
  };

  const template = await Template.create(templateData);

  res.status(201).json({
    status: 'success',
    message: 'Template created successfully',
    data: {
      template
    }
  });
});

export const updateTemplate = catchAsync(async (req, res, next) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return next(new AppError('Template not found', 404));
  }

  // Check ownership or admin rights
  if (template.creator.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Access denied', 403));
  }

  // Update template
  Object.assign(template, req.body);
  await template.save();

  res.status(200).json({
    status: 'success',
    message: 'Template updated successfully',
    data: {
      template
    }
  });
});

export const deleteTemplate = catchAsync(async (req, res, next) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return next(new AppError('Template not found', 404));
  }

  // Check ownership or admin rights
  if (template.creator.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Access denied', 403));
  }

  await Template.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Template deleted successfully'
  });
});

export const getFeaturedTemplates = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const templates = await Template.getFeatured(limit);

  res.status(200).json({
    status: 'success',
    results: templates.length,
    data: {
      templates
    }
  });
});

export const getPopularTemplates = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const templates = await Template.getPopular(limit);

  res.status(200).json({
    status: 'success',
    results: templates.length,
    data: {
      templates
    }
  });
});

export const getTemplatesByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit) || 20;
  const templates = await Template.getByCategory(category, limit);

  res.status(200).json({
    status: 'success',
    results: templates.length,
    data: {
      templates
    }
  });
});

export const searchTemplates = catchAsync(async (req, res, next) => {
  const { q, category, type, difficulty } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  if (!q) {
    return next(new AppError('Search query is required', 400));
  }

  const filters = {};
  if (category) filters.category = category;
  if (type) filters.type = type;
  if (difficulty) filters.difficulty = difficulty;

  const templates = await Template.searchTemplates(q, filters)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    status: 'success',
    results: templates.length,
    data: {
      templates
    }
  });
});

export const useTemplate = catchAsync(async (req, res, next) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    return next(new AppError('Template not found', 404));
  }

  // Check if template is accessible
  if (!template.isPublic && template.creator.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  // Check subscription requirements
  if (template.isPremium || template.requiredPlan !== 'free') {
    const user = await User.findById(req.user.id);
    const planHierarchy = { free: 0, basic: 1, premium: 2, enterprise: 3 };
    const userPlanLevel = planHierarchy[user.subscription?.plan || 'free'];
    const requiredPlanLevel = planHierarchy[template.requiredPlan];

    if (userPlanLevel < requiredPlanLevel) {
      return next(new AppError(`${template.requiredPlan} plan required for this template`, 402));
    }
  }

  const { inputData, customSettings } = req.body;

  // Validate input data
  const validationErrors = template.validateInput(inputData || {});
  if (validationErrors.length > 0) {
    return next(new AppError('Input validation failed', 400, validationErrors));
  }

  // Generate content using template
  const generationData = template.generateContent(inputData, customSettings);

  // Record template usage
  await template.recordUse(req.user.id);

  res.status(200).json({
    status: 'success',
    message: 'Template processed successfully',
    data: {
      template: {
        id: template._id,
        name: template.name,
        prompt: generationData.prompt,
        settings: generationData.settings
      },
      generationData
    }
  });
});

export const rateTemplate = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const template = await Template.findById(req.params.id);

  if (!template) {
    return next(new AppError('Template not found', 404));
  }

  if (!template.isPublic) {
    return next(new AppError('Can only rate public templates', 400));
  }

  const { rating } = req.body;
  await template.addRating(rating);

  res.status(200).json({
    status: 'success',
    message: 'Rating added successfully',
    data: {
      template
    }
  });
});

export const duplicateTemplate = catchAsync(async (req, res, next) => {
  const originalTemplate = await Template.findById(req.params.id);

  if (!originalTemplate) {
    return next(new AppError('Template not found', 404));
  }

  // Check access permissions
  if (!originalTemplate.isPublic && originalTemplate.creator.toString() !== req.user.id) {
    return next(new AppError('Access denied', 403));
  }

  const { name } = req.body;
  const duplicatedTemplate = await originalTemplate.duplicate(name);

  // Set the current user as creator of the duplicate
  duplicatedTemplate.creator = req.user.id;
  await duplicatedTemplate.save();

  res.status(201).json({
    status: 'success',
    message: 'Template duplicated successfully',
    data: {
      template: duplicatedTemplate
    }
  });
}); 