# API Documentation - Fredy Unlimited AI

## 📡 Base URL
```
http://localhost:3001/api
```

## 🔐 Authentication

All requests (except `/auth/register` and `/auth/login`) require JWT token:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔑 Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Login User
```
POST /auth/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** (Same as register)

### Get Current User
```
GET /auth/me
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer TOKEN
```

---

## 📤 Upload Endpoints

### Upload File
```
POST /upload
Authorization: Bearer TOKEN
Content-Type: multipart/form-data
```

**Request (form-data):**
- `file`: Image/PDF file (max 50MB)

**Response:**
```json
{
  "message": "File uploaded successfully",
  "upload": {
    "id": "upload123",
    "filename": "doc.jpg",
    "originalName": "document.jpg",
    "fileSize": 1024000,
    "mimeType": "image/jpeg",
    "uploadedAt": "2026-06-21T10:00:00Z",
    "expiresAt": "2026-07-21T10:00:00Z"
  }
}
```

### Get Uploads
```
GET /upload
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "uploads": [
    {
      "id": "upload123",
      "filename": "doc.jpg",
      "uploadedAt": "2026-06-21T10:00:00Z"
    }
  ]
}
```

### Delete Upload
```
DELETE /upload/:id
Authorization: Bearer TOKEN
```

---

## 🧠 Analysis Endpoints

### Analyze Image
```
POST /analyze/:uploadId
Authorization: Bearer TOKEN
```

**Request:**
```json
{
  "prompt": "Extract all text and data from this document"
}
```

**Response:**
```json
{
  "message": "Analysis completed",
  "analysis": {
    "id": "analysis123",
    "visionData": {
      "text": "Extracted text from image...",
      "confidence": 0.95,
      "detections": []
    },
    "aiAnalysis": {
      "text": "AI-generated analysis...",
      "provider": "Groq",
      "model": "mixtral-8x7b-32768"
    }
  }
}
```

### Get Analysis
```
GET /analyze/:analysisId
Authorization: Bearer TOKEN
```

### Get Analysis History
```
GET /analyze
Authorization: Bearer TOKEN
```

---

## 📄 Letter Endpoints

### Create Letter
```
POST /letters
Authorization: Bearer TOKEN
```

**Request:**
```json
{
  "title": "My Report",
  "template": "report",
  "analysisId": "analysis123",
  "customData": {
    "executive_summary": "Summary text",
    "conclusion": "Conclusion text"
  }
}
```

**Response:**
```json
{
  "message": "Letter created successfully",
  "letter": {
    "id": "letter123",
    "title": "My Report",
    "status": "draft",
    "createdAt": "2026-06-21T10:00:00Z"
  }
}
```

### Get Letters
```
GET /letters
Authorization: Bearer TOKEN
```

### Get Letter Details
```
GET /letters/:letterId
Authorization: Bearer TOKEN
```

### Update Letter
```
PUT /letters/:letterId
Authorization: Bearer TOKEN
```

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "status": "completed"
}
```

### Delete Letter
```
DELETE /letters/:letterId
Authorization: Bearer TOKEN
```

### Download Letter
```
GET /letters/:letterId/download
Authorization: Bearer TOKEN
```

Returns text file with letter content.

---

## 📋 Letter Templates

**Available templates:**
- `basic` - Simple letter format
- `formal` - Formal business letter
- `report` - Detailed report
- `certificate` - Certificate format

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": "Email and password required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token",
  "timestamp": "2026-06-21T10:00:00Z"
}
```

### 403 Forbidden
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Letter not found"
}
```

### 500 Server Error
```json
{
  "error": "An error occurred",
  "timestamp": "2026-06-21T10:00:00Z"
}
```

---

## 🧪 Test with cURL

### Register
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "pass123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "pass123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

For more info, check the backend README.md
