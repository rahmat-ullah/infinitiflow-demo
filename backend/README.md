# InfinitiFlow Backend API

A comprehensive Node.js backend for the InfinitiFlow AI content generation platform, built with Express.js, MongoDB, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Authentication & Authorization**: JWT-based auth with refresh tokens, email verification, password reset
- **User Management**: Complete user profiles, preferences, usage tracking, subscription management
- **Content Generation**: AI-powered content creation with templates and customization
- **Template System**: Flexible template creation with custom fields and validation
- **Subscription Management**: Multi-tier subscription plans with usage limits and billing
- **Analytics**: Usage statistics, content performance tracking
- **Admin Panel**: User management, system statistics, template approval

### Technical Features
- **Security**: Rate limiting, helmet protection, input validation, account locking
- **Email Service**: Transactional emails with HTML templates
- **File Uploads**: Avatar uploads with Cloudinary integration
- **Logging**: Comprehensive logging with file rotation
- **Error Handling**: Centralized error handling with detailed logging
- **Database**: MongoDB with Mongoose ODM, indexes, and data validation
- **API Documentation**: RESTful API design with consistent response format

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User management
│   │   ├── contentController.js # Content operations
│   │   └── templateController.js# Template management
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   ├── errorHandler.js     # Error handling
│   │   └── notFound.js         # 404 handler
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Content.js          # Content schema
│   │   ├── Template.js         # Template schema
│   │   └── Subscription.js     # Subscription schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── users.js            # User routes
│   │   ├── content.js          # Content routes
│   │   ├── templates.js        # Template routes
│   │   ├── subscriptions.js    # Billing routes
│   │   ├── analytics.js        # Analytics routes
│   │   └── admin.js            # Admin routes
│   ├── services/
│   │   ├── emailService.js     # Email functionality
│   │   ├── aiService.js        # AI integration
│   │   └── fileService.js      # File handling
│   ├── utils/
│   │   └── logger.js           # Logging utility
│   ├── scripts/
│   │   └── seedDatabase.js     # Database seeding
│   └── index.js                # Main server file
├── logs/                       # Application logs
├── package.json
├── env.example                 # Environment template
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

### 1. Clone and Install
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env` and configure:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/infinitiflow

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d
JWT_COOKIE_EXPIRES_IN=7

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@infinitiflow.com

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Security & Rate Limiting
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=900000
```

### 3. Database Setup
```bash
# Start MongoDB
mongod

# Seed the database with sample data
npm run seed -- --seed
```

### 4. Start the Server
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "company": {
    "name": "Tech Corp",
    "position": "Developer"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Content Endpoints

#### Generate Content
```http
POST /api/content/generate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "prompt": "Write a blog post about AI in marketing",
  "type": "blog-post",
  "title": "AI in Marketing",
  "generationSettings": {
    "tone": "professional",
    "language": "en",
    "maxTokens": 1000
  }
}
```

#### Get User Content
```http
GET /api/content?page=1&limit=10&type=blog-post&status=published
Authorization: Bearer <jwt_token>
```

#### Update Content
```http
PATCH /api/content/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}
```

### Template Endpoints

#### Get Public Templates
```http
GET /api/templates/featured
```

#### Get Template Details
```http
GET /api/templates/:id
Authorization: Bearer <jwt_token>
```

#### Use Template
```http
POST /api/templates/:id/use
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "inputData": {
    "topic": "Digital Marketing",
    "tone": "professional",
    "audience": "business owners"
  },
  "customSettings": {
    "maxTokens": 800
  }
}
```

### User Management

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PATCH /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "company": {
    "name": "New Company",
    "position": "Manager"
  }
}
```

#### Upload Avatar
```http
POST /api/users/avatar
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

avatar: <file>
```

### Subscription Management

#### Get Subscription Info
```http
GET /api/subscriptions
Authorization: Bearer <jwt_token>
```

#### Upgrade Subscription
```http
PATCH /api/subscriptions/upgrade
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "plan": "premium",
  "paymentMethodId": "pm_1234567890"
}
```

## 🔒 Authentication & Authorization

### JWT Token Structure
- **Access Token**: Short-lived (7 days), used for API requests
- **Refresh Token**: Long-lived (30 days), used to refresh access tokens
- **Secure Cookies**: Tokens stored in httpOnly cookies for web clients

### User Roles
- **User**: Standard user with content creation access
- **Admin**: Full system access including user management
- **Moderator**: Template approval and content moderation

### Subscription Plans
- **Free**: 10 content pieces, 5k words/month
- **Basic**: 100 content pieces, 50k words/month, premium templates
- **Premium**: 500 content pieces, 250k words/month, API access, priority support
- **Enterprise**: Unlimited usage, custom integrations, dedicated support

## 📊 Data Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'admin', 'moderator'],
  avatar: { url, publicId },
  company: { name, position, size, industry },
  subscription: { plan, isActive, startDate, endDate },
  usageStats: { contentGenerated, wordsGenerated, templatesUsed },
  preferences: { language, timezone, theme, notifications },
  isEmailVerified: Boolean,
  lastLoginAt: Date
}
```

### Content Model
```javascript
{
  title: String,
  content: String,
  type: ['blog-post', 'social-media-post', 'email', ...],
  category: ['marketing', 'sales', 'content', ...],
  user: ObjectId (ref: User),
  template: ObjectId (ref: Template),
  prompt: String,
  generationSettings: { model, temperature, maxTokens, tone },
  versions: [{ content, generatedAt, settings }],
  status: ['draft', 'published', 'archived'],
  analytics: { views, likes, shares, avgRating },
  tags: [String],
  wordCount: Number,
  readingTime: Number
}
```

### Template Model
```javascript
{
  name: String,
  description: String,
  prompt: String,
  category: ['blog-writing', 'social-media', 'email-marketing', ...],
  fields: [{ name, label, type, required, options, validation }],
  defaultSettings: { model, temperature, maxTokens, tone },
  creator: ObjectId (ref: User),
  isPublic: Boolean,
  isPremium: Boolean,
  usageStats: { totalUses, averageRating, lastUsed },
  requiredPlan: ['free', 'basic', 'premium', 'enterprise']
}
```

## 🔧 Configuration

### Environment Variables
All configuration is handled through environment variables. See `env.example` for the complete list.

### Database Indexes
- User email (unique)
- Content user + createdAt (compound)
- Template category + isPublic
- Full-text search on content and templates

### Security Features
- Password hashing with bcrypt
- JWT token validation
- Rate limiting (100 requests per 15 minutes)
- Account locking after failed login attempts
- Input validation and sanitization
- CORS protection
- Helmet security headers

## 🚦 Development

### Running Tests
```bash
npm test
npm run test:watch
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Database Operations
```bash
# Seed database
npm run seed -- --seed

# Clear database
npm run seed -- --clear
```

### Logging
Logs are written to:
- `logs/error.log` - Error level logs
- `logs/combined.log` - All logs
- Console - Development mode

## 🌐 Deployment

### Production Checklist
1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT secrets
4. Configure email service
5. Set up Cloudinary for file uploads
6. Configure Stripe for payments
7. Set up SSL/TLS
8. Configure reverse proxy (nginx)
9. Set up monitoring and logging
10. Configure backup strategy

### Docker Deployment
```dockerfile
# Dockerfile included for containerized deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**InfinitiFlow Backend** - Powering AI content generation with robust, scalable infrastructure. 