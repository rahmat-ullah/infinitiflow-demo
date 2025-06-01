# Infinitiflow Tools Backend API

A robust Node.js/Express backend for the Infinitiflow Tools Landing Page with MongoDB database.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Navigate to the backend directory:
```bash
cd @backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update the `.env` file with your configuration values (especially MongoDB URI)

5. Start your MongoDB server (if running locally):
```bash
mongod
```

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run clean` - Clean build directory

## 🛠 API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Tools Management
- `GET /api/tools` - Get all tools (with filtering, pagination, search)
- `GET /api/tools/featured` - Get featured tools
- `GET /api/tools/categories` - Get tool categories with counts
- `GET /api/tools/:id` - Get specific tool details
- `POST /api/tools` - Create new tool (requires auth)
- `PUT /api/tools/:id` - Update tool (requires auth)
- `DELETE /api/tools/:id` - Delete tool (requires auth)
- `POST /api/tools/:id/like` - Like/Unlike tool

## 🔧 Environment Variables

Copy `env.example` to `.env` and configure:

```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/infinitiflow
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

### Database Configuration

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/infinitiflow
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/infinitiflow
```

## 🏗 Project Structure

```
@backend/
├── src/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB models (User, Tool)
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── utils/          # Utility functions
│   └── index.ts        # Main server file
├── dist/               # Compiled TypeScript
├── logs/              # Application logs
├── package.json
├── tsconfig.json
└── README.md
```

## 📊 Database Models

### User Model
- Authentication and user management
- Roles (user, admin)
- Profile information (avatar, bio, website)

### Tool Model
- Tool information and metadata
- Categories and tags
- Statistics (views, likes, users)
- Featured tools system
- Pricing information

## 🔒 Security Features

- Rate limiting
- CORS protection
- Helmet security headers
- Request compression
- Input validation with express-validator
- JWT authentication
- Bcrypt password hashing
- MongoDB injection protection

## 📊 Logging

The application uses Winston for structured logging:
- Console output in development
- File logging for production
- Error tracking and monitoring

## 🔍 API Features

### Tools API
- **Filtering**: By category, status, featured
- **Search**: Full-text search across name, description, tags
- **Pagination**: Configurable page size
- **Sorting**: By date, views, likes, name
- **Statistics**: View tracking, like system
- **Categories**: Dynamic category listing with counts

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Profile management

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Set production environment variables

3. Ensure MongoDB is accessible

4. Start the production server:
```bash
npm start
```

## 📝 Sample Tool Object

```json
{
  "name": "Task Manager Pro",
  "description": "A comprehensive task management tool with collaboration features",
  "category": "productivity",
  "status": "active",
  "featured": true,
  "url": "https://taskmanagerpro.com",
  "tags": ["productivity", "collaboration", "tasks"],
  "features": ["Real-time collaboration", "Task tracking", "Team management"],
  "pricing": {
    "type": "freemium",
    "price": 9.99,
    "currency": "USD"
  }
}
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add tests for new features
3. Update documentation
4. Follow the existing code style
5. Use meaningful commit messages

## 📄 License

MIT License - see LICENSE file for details 