# GeoGuide API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

Tüm korumalı endpoint'ler için Bearer token gereklidir:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "role": "TOURIST" // or "GUIDE"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "role": "TOURIST"
  },
  "access_token": "jwt_token"
}
```

### Posts

#### Get Feed
```http
GET /posts/feed
Authorization: Bearer <token>
```

#### Create Post
```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Post content",
  "mediaUrls": ["url1", "url2"]
}
```

### Routes

#### Search Routes
```http
GET /routes?region=Istanbul&category=Historical&maxPrice=100
```

#### Create Route (Guide only)
```http
POST /routes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Route title",
  "description": "Route description",
  "geoJson": {},
  "price": 50,
  "region": "Istanbul",
  "category": "Historical",
  "mediaUrls": [],
  "isPublished": false
}
```

### Users

#### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

## Error Responses

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:3001/api/docs
```
