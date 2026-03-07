# GeoGuide Architecture

## System Overview

GeoGuide, modular monolith mimarisi ile tasarlanmış, Docker ile konteynerize edilmiş bir sosyal platform.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        Nginx Gateway                     │
│                    (Port 80/443)                        │
└────────────┬────────────────────────────┬───────────────┘
             │                            │
             ▼                            ▼
    ┌────────────────┐          ┌─────────────────┐
    │   Frontend     │          │    Backend      │
    │   (Next.js)    │◄────────►│   (NestJS)      │
    │   Port 3000    │          │   Port 3001     │
    └────────────────┘          └────────┬────────┘
                                         │
                    ┌────────────────────┼────────────────┐
                    ▼                    ▼                ▼
            ┌──────────────┐    ┌──────────────┐  ┌──────────┐
            │  PostgreSQL  │    │    Redis     │  │  MinIO   │
            │  Port 5432   │    │  Port 6379   │  │ Port 9000│
            └──────────────┘    └──────────────┘  └──────────┘
```

## Technology Stack

### Frontend Layer
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Maps**: Leaflet / React-Leaflet

### Backend Layer
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **API Documentation**: Swagger/OpenAPI

### Data Layer
- **Primary Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Object Storage**: MinIO
- **File System**: Docker Volumes

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Gateway**: Nginx
- **Environment**: Multi-stage builds

## Domain Model

### Core Entities

```typescript
User {
  id: UUID
  email: String
  username: String
  role: UserRole (TOURIST | GUIDE | VERIFIED_GUIDE)
  posts: Post[]
  routes: Route[]
  followers: Follow[]
  following: Follow[]
}

Post {
  id: UUID
  content: String
  mediaUrls: String[]
  user: User
  comments: Comment[]
  ratings: Rating[]
}

Route {
  id: UUID
  title: String
  description: String
  geoJson: JSON
  price: Float
  region: String
  category: String
  guide: User
  ratings: Rating[]
  purchases: Purchase[]
}
```

## Module Structure

### Backend Modules

```
src/
├── auth/           # Authentication & Authorization
├── users/          # User management
├── posts/          # Social posts & feed
├── routes/         # Travel routes
├── comments/       # Post comments
├── ratings/        # Rating system
├── follows/        # Follow relationships
├── purchases/      # Route purchases
└── prisma/         # Database service
```

### Frontend Structure

```
src/
├── app/            # Next.js pages (App Router)
│   ├── auth/       # Login, Register
│   ├── feed/       # Social feed
│   ├── routes/     # Route discovery
│   └── guide/      # Guide dashboard
├── components/     # Reusable components
│   ├── Feed/       # Feed components
│   ├── Route/      # Route components
│   └── UI/         # UI primitives
├── store/          # Zustand stores
└── lib/            # Utilities & API client
```

## Data Flow

### Authentication Flow
```
1. User submits credentials
2. Frontend → POST /api/auth/login
3. Backend validates credentials
4. Backend generates JWT token
5. Frontend stores token in localStorage
6. Frontend includes token in subsequent requests
```

### Feed Generation Flow
```
1. User opens feed page
2. Frontend → GET /api/posts/feed (with auth token)
3. Backend queries PostgreSQL
4. Backend checks Redis cache
5. Backend returns posts with user data
6. Frontend renders PostCard components
```

### Route Creation Flow
```
1. Guide fills route form
2. Frontend → POST /api/routes (with auth token)
3. Backend validates guide role
4. Backend stores route in PostgreSQL
5. Backend uploads media to MinIO
6. Backend returns created route
```

## Security

### Authentication
- JWT tokens with 1-day expiration
- Refresh token mechanism
- Password hashing with bcrypt (10 rounds)

### Authorization
- Role-based access control (RBAC)
- Route guards on protected endpoints
- JWT strategy with Passport

### Data Protection
- Input validation with class-validator
- SQL injection prevention (Prisma ORM)
- XSS protection (React escaping)
- CORS configuration

## Performance Optimization

### Caching Strategy
- Redis for session storage
- Feed caching (5-minute TTL)
- Static asset caching

### Database Optimization
- Indexed columns (userId, postId, createdAt)
- Connection pooling
- Query optimization with Prisma

### Frontend Optimization
- Code splitting (Next.js automatic)
- Image optimization
- Lazy loading components

## Scalability

### Horizontal Scaling
- Stateless backend services
- Load balancing with Nginx
- Redis for shared session state

### Vertical Scaling
- Database connection pooling
- Resource limits in Docker
- Efficient query patterns

## Monitoring & Logging

### Logging
- Structured logging (JSON format)
- Log levels (error, warn, info, debug)
- Docker logs aggregation

### Health Checks
- Database health check
- Redis health check
- MinIO health check
- Application health endpoint

## Future Enhancements

- [ ] WebSocket for real-time notifications
- [ ] Elasticsearch for advanced search
- [ ] CDN integration for media
- [ ] Microservices migration path
- [ ] GraphQL API option
- [ ] Mobile app (React Native)
