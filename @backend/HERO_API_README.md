# Hero Section API Documentation

## Overview
The Hero Section API provides complete management for dynamic hero section content on the Infinitiflow Tools landing page. This API supports all the visual elements, content, and interactive features from the current frontend implementation.

## Base URL
```
http://localhost:3001/api/hero
```

## Data Structure

### Complete Hero Section Model
```typescript
interface IHeroSection {
  badge?: string;                    // Badge text above title
  title: string;                     // Main title (first part)
  titleHighlight?: string;           // Highlighted part of title
  subtitle: string;                  // Subtitle text
  description: string;               // Main description
  primaryCTA: {
    text: string;                    // Button text
    url: string;                     // Button URL
    style: 'primary' | 'secondary' | 'outline';
    icon?: string;                   // Icon name/component
  };
  secondaryCTA?: {
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline';
    icon?: string;
  };
  additionalInfo?: string;           // Text below buttons
  heroImage?: string;                // Main hero image URL
  floatingElements?: Array<{
    text: string;                    // Element text
    type: 'badge' | 'indicator' | 'feature';
    position: string;                // Position description
    color?: string;                  // Color theme
    icon?: string;                   // Icon name
  }>;
  stats?: Array<{
    label: string;                   // Stat label
    value: string;                   // Stat value
    description?: string;            // Stat description
  }>;
  features?: Array<{
    icon: string;                    // Feature icon
    title: string;                   // Feature title
    description: string;             // Feature description
  }>;
  theme?: {
    particles?: boolean;             // Enable particles background
    animations?: boolean;            // Enable animations
    gradientEffects?: boolean;       // Enable gradient effects
  };
  isActive: boolean;                 // Active status
  version: string;                   // Version number
}
```

## API Endpoints

### 1. Get Active Hero Section
**GET** `/api/hero`

Returns the currently active hero section for frontend display.

**Response:**
```json
{
  "success": true,
  "data": {
    "badge": "AI-Powered Content Generation",
    "title": "Create",
    "titleHighlight": "exceptional content",
    "subtitle": "in seconds",
    "description": "Leverage AI to produce high-quality, engaging content 10x faster than traditional methods.",
    "primaryCTA": {
      "text": "Start Free Trial",
      "url": "/auth/register",
      "style": "primary",
      "icon": "ChevronRightIcon"
    },
    "secondaryCTA": {
      "text": "Watch Demo",
      "url": "/demo",
      "style": "outline"
    },
    "additionalInfo": "No credit card required • Free 14-day trial",
    "heroImage": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    "floatingElements": [
      {
        "text": "AI Writing",
        "type": "badge",
        "position": "top-right",
        "color": "primary",
        "icon": "circle"
      }
    ],
    "stats": [
      {
        "label": "Content Creation Time",
        "value": "10x",
        "description": "faster than traditional methods"
      }
    ],
    "features": [
      {
        "icon": "Sparkles",
        "title": "AI-Powered Content Creation",
        "description": "Generate high-quality, engaging content in seconds with our advanced AI algorithms."
      }
    ],
    "theme": {
      "particles": true,
      "animations": true,
      "gradientEffects": true
    },
    "isActive": true,
    "version": "2.0.0"
  }
}
```

### 2. Get All Hero Sections (Admin)
**GET** `/api/hero/all?page=1&limit=10&isActive=true`

Returns paginated list of all hero sections.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `isActive` (optional): Filter by active status

### 3. Get Hero Section by ID
**GET** `/api/hero/:id`

Returns specific hero section by ID.

### 4. Create New Hero Section
**POST** `/api/hero`

Creates a new hero section.

**Request Body:** Full hero section object (see data structure above)

### 5. Update Hero Section
**PUT** `/api/hero/:id`

Updates existing hero section by ID.

**Request Body:** Updated hero section object

### 6. Activate Hero Section
**PATCH** `/api/hero/:id/activate`

Activates a specific hero section (deactivates all others).

### 7. Delete Hero Section
**DELETE** `/api/hero/:id`

Deletes a hero section by ID.

## Frontend Integration

### Current Frontend Mapping
The backend data maps to the frontend Hero.tsx component as follows:

```typescript
// Frontend usage example
const heroData = await fetch('http://localhost:3001/api/hero').then(r => r.json());

// Badge
<span className="bg-primary-100 dark:bg-primary-800">
  {heroData.data.badge}
</span>

// Title with highlight
<h1>
  {heroData.data.title} 
  <span className="text-primary-500">{heroData.data.titleHighlight}</span> 
  {heroData.data.subtitle}
</h1>

// Description
<p>{heroData.data.description}</p>

// Primary CTA
<Button size="lg" rightIcon={heroData.data.primaryCTA.icon}>
  {heroData.data.primaryCTA.text}
</Button>

// Secondary CTA
<Button variant="outline" size="lg">
  {heroData.data.secondaryCTA.text}
</Button>

// Additional Info
<div className="text-sm text-gray-500">
  {heroData.data.additionalInfo}
</div>

// Hero Image
<img src={heroData.data.heroImage} alt="AI Content Generation" />

// Floating Elements
{heroData.data.floatingElements.map(element => (
  <div className={`floating-${element.position} bg-${element.color}-50`}>
    {element.text}
  </div>
))}
```

## Seeding

### Initialize with Frontend Data
```bash
npm run seed:hero-frontend
```

This command populates the database with the exact hero section content currently used in the frontend.

### Original Demo Data
```bash
npm run seed:hero
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error 1", "Validation error 2"]
}
```

## Validation Rules

- **badge**: Max 100 characters
- **title**: Required, max 200 characters  
- **titleHighlight**: Max 100 characters
- **subtitle**: Required, max 300 characters
- **description**: Required, max 500 characters
- **primaryCTA.text**: Required, max 50 characters
- **primaryCTA.url**: Required
- **additionalInfo**: Max 200 characters
- **floatingElements.text**: Max 50 characters each
- **stats.label**: Max 50 characters each
- **stats.value**: Max 20 characters each
- **features.title**: Max 100 characters each
- **features.description**: Max 200 characters each

## Version History

- **v2.0.0**: Complete frontend-based implementation with all visual elements
- **v1.0.0**: Basic hero section structure

## Frontend Components Supported

The API fully supports all elements from the current `Hero.tsx` component:
- ✅ Badge text
- ✅ Title with highlighted text
- ✅ Subtitle
- ✅ Description
- ✅ Primary/Secondary CTAs with icons
- ✅ Additional info text
- ✅ Hero image
- ✅ Floating elements (AI Writing, Smart Templates, SEO Optimizer)
- ✅ Statistics data
- ✅ Features data
- ✅ Theme configuration (particles, animations, gradients)

## Notes

- Only one hero section can be active at a time
- All floating elements, stats, and features are optional arrays
- Theme settings control frontend visual effects
- All URLs and images should be properly formatted
- The API maintains backward compatibility with existing frontend code 