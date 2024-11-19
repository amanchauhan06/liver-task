# Recently Viewed Products Service

A containerized Node.js microservice that integrates Firebase and Redis to track and manage users' recently viewed products. This service enhances e-commerce platforms by maintaining a history of product interactions and providing fast access to viewing history.

## 🎯 Project Overview

### Purpose
This service tracks and manages users' recently viewed products in an e-commerce platform, providing fast access to viewing history and enabling personalized user experiences.

### Key Features
- User-specific product view tracking
- Redis-based caching for fast access
- Firebase Authentication integration
- Firestore data persistence
- Docker containerization
- Comprehensive logging system
- API versioning
- Swagger documentation

## 🏗 Technical Stack

### Backend Infrastructure
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Cache**: Redis
- **Authentication**: Firebase Auth
- **Container**: Docker & Docker Compose

### Development Tools
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Testing**: Jest
- **API Testing**: Supertest
- **Security**: Helmet, CORS

## 🚀 Getting Started

### Prerequisites
1. Node.js (v14 or higher)
2. Docker and Docker Compose
3. Firebase Account
4. Redis (included in Docker setup)
5. Git

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/recently-viewed-products.git
cd recently-viewed-products
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the project root:
```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Application Settings
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Docker Deployment**
```bash
# Build and start containers
npm run docker:build
npm run docker:up

# Stop containers
npm run docker:down
```

## 📁 Project Structure

```
recently-viewed-products/
├── src/
│   ├── config/
│   │   ├── firebase.js     # Firebase configuration
│   │   └── redis.js        # Redis client setup
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── routes/
│   │   └── v1/
│   │       └── userRoutes.js # API routes
│   ├── services/
│   │   └── productService.js # Business logic
│   ├── utils/
│   │   └── logger.js       # Logging utility
│   └── index.js            # Application entry point
├── logs/                   # Log files
├── tests/                  # Test files
├── Dockerfile
├── docker-compose.yml
└── swagger.yaml
```

## 📡 API Endpoints

### Recently Viewed Products
```http
GET /api/v1/users/{userId}/recentlyViewed
Authorization: Bearer {firebase-token}
```

### Log Product View
```http
POST /api/v1/users/{userId}/productView
Authorization: Bearer {firebase-token}
Content-Type: application/json

{
    "productId": "string"
}
```

## 🔒 Authentication

### Firebase Authentication
1. Initialize Firebase project
2. Configure Firebase credentials
3. Implement token verification
4. Protect routes with auth middleware

### Example Authentication Flow
```javascript
// Request Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 💾 Data Storage

### Firestore Structure
```
users/
  ├── {userId}/
  │   └── recentlyViewed/
  │       ├── {viewId}/
  │       │   ├── productId
  │       │   ├── timestamp
  │       │   └── viewCount
```

### Redis Caching
- Cache recently viewed products
- 1-hour expiration
- Automatic invalidation on updates

## 📝 Logging System

### Log Levels
- **ERROR**: Application errors
- **INFO**: Operational information
- **DEBUG**: Development details

### Log Files
- `logs/error.log`: Error-level logs
- `logs/combined.log`: All logs

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Test Categories
- Unit Tests
- Integration Tests
- API Tests
- Authentication Tests

## 🐳 Docker Configuration

### Services
1. Node.js Application
2. Redis Cache

### Volumes
- Log Persistence
- Redis Data

### Networks
- Internal Service Communication
- External API Access

## 📊 Monitoring

### Metrics Tracked
- Request Response Times
- Cache Hit/Miss Rates
- Error Rates
- API Usage Patterns

### Health Checks
- Redis Connection
- Firebase Connection
- API Endpoints

## 🛠 Development

### Code Style Guidelines
- Use ES6+ features
- Async/await for async operations
- Proper error handling
- Comprehensive logging

### Best Practices
- Service Layer Pattern
- Environment-based Config
- Error Handling
- Security First

## 🚀 Deployment

### Production Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment
```bash
# Build and deploy
docker-compose up --build -d

# View logs
docker-compose logs -f
```

## 🔄 CI/CD Pipeline

### Workflow
1. Code Push
2. Automated Tests
3. Build Docker Image
4. Deploy to Staging
5. Production Deployment

## 🔜 Future Enhancements

- [ ] Rate Limiting Implementation
- [ ] Email Notifications
- [ ] Enhanced Caching Strategy
- [ ] User Preferences
- [ ] Product Recommendations
- [ ] Metrics Collection
- [ ] Performance Optimization

## 🐛 Troubleshooting

### Common Issues
1. Firebase Connection Issues
   - Check credentials
   - Verify project configuration

2. Redis Connection Issues
   - Verify Redis server status
   - Check connection configuration

3. Authentication Errors
   - Validate token format
   - Check Firebase configuration