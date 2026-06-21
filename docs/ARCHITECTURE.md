# System Architecture - Fredy Unlimited AI

## 🏗️ High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      MOBILE APP (React Native)               │
│  ┌────────────┬────────────┬────────────┬────────────┐       │
│  │   Home     │  Upload    │  Letters   │ Settings   │       │
│  └────────────┴────────────┴────────────┴────────────┘       │
└──────────────────────────────────────────────────────────────┘
                            ↓
                   (HTTP REST API)
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                   BACKEND SERVER (Express.js)                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  API Routes (Auth, Upload, Analyze, Letters)         │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Middleware (Auth, Error Handling, CORS)             │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Services (AI Router, Vision API, Letter Generator)  │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
    ↓                        ↓                      ↓
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│  Firebase    │    │  AI Services     │    │ Vision API   │
│  Firestore   │    │ (Groq/OpenAI/    │    │  (Google)    │
│  Database    │    │  Google/Claude)  │    │              │
└──────────────┘    └──────────────────┘    └──────────────┘
```

---

## 🔄 Request Flow

### 1. User Upload
```
Mobile App
    ↓ (Selects image)
Camera/Gallery
    ↓ (User taps Upload)
API: POST /upload
    ↓ (With JWT token)
Backend Auth Middleware
    ↓ (Validates token)
Multer (File upload)
    ↓ (Saves file locally)
Firebase Storage
    ↓ (Optional cloud backup)
Firestore: Save upload metadata
    ↓ (Returns upload ID)
Mobile App: Shows success
```

### 2. Image Analysis
```
Mobile App
    ↓ (User taps Analyze)
API: POST /analyze/:uploadId
    ↓ (Sends upload ID)
Backend Auth Middleware
    ↓ (Validates token)
Vision API Service
    ↓ (Extract text from image)
AI Router Service
    ↓ (Route to best AI provider)
Groq/OpenAI/Google API
    ↓ (Generate analysis)
Firestore: Save analysis result
    ↓ (Store with upload reference)
Mobile App: Display analysis
```

### 3. Letter Generation
```
Mobile App
    ↓ (User creates letter)
API: POST /letters
    ↓ (Sends template + data)
Backend Auth Middleware
    ↓ (Validates token)
Letter Generator Service
    ↓ (Format using template)
Generate letter content
    ↓
Firestore: Save letter
    ↓ (Link to analysis if applicable)
Mobile App: Display preview
    ↓ (User can edit/download)
```

---

## 💾 Database Schema

### Users Collection
```
users/
├── uid/
│   ├── email: string
│   ├── password: string (hashed)
│   ├── name: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

### Uploads Collection
```
uploads/
├── id/
│   ├── userId: string (ref to users)
│   ├── filename: string
│   ├── originalName: string
│   ├── fileSize: number
│   ├── mimeType: string
│   ├── uploadedAt: timestamp
│   ├── expiresAt: timestamp
│   └── filePath: string
```

### Analysis Collection
```
analysis/
├── id/
│   ├── userId: string (ref to users)
│   ├── uploadId: string (ref to uploads)
│   ├── visionData: object
│   │   ├── text: string
│   │   ├── confidence: number
│   │   └── detections: array
│   ├── aiAnalysis: object
│   │   ├── text: string
│   │   ├── provider: string
│   │   └── model: string
│   └── analyzedAt: timestamp
```

### Letters Collection
```
letters/
├── id/
│   ├── userId: string (ref to users)
│   ├── title: string
│   ├── template: string
│   ├── content: string
│   ├── analysisId: string (optional ref to analysis)
│   ├── status: string (draft/completed)
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

---

## 🔐 Security Architecture

### Authentication Flow
```
1. User registers/logs in
   ↓
2. Backend hashes password (bcryptjs)
   ↓
3. Stores in Firestore
   ↓
4. Generates JWT token (valid for 7 days)
   ↓
5. Returns token to mobile app
   ↓
6. Mobile app stores token locally (MMKV)
   ↓
7. Sends token in Authorization header on each request
   ↓
8. Backend verifies JWT before processing
```

### Protection Measures
- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens with expiration
- ✅ CORS validation
- ✅ Input sanitization
- ✅ Rate limiting (can be added)
- ✅ HTTPS in production

---

## 🤖 AI Services Architecture

### AI Router (Automatic Fallback)
```
Request to AI Router
    ↓
Try Groq (Free & Fast)
    ✓ Success? → Return
    ✗ Failed/Rate limited?
        ↓
Try OpenAI
    ✓ Success? → Return
    ✗ Failed/Rate limited?
        ↓
Try Google Gemini
    ✓ Success? → Return
    ✗ Failed/Rate limited?
        ↓
Try Anthropic Claude
    ✓ Success? → Return
    ✗ Failed/Rate limited?
        ↓
Try Ollama (Local)
    ✓ Success? → Return
    ✗ Failed?
        ↓
Return Error
```

### Vision API Flow
```
Image Upload
    ↓
Google Cloud Vision API
    ↓ (if key configured)
Extract text (OCR)
    ↓
Return: text + confidence
    ↓
Fallback to local analysis
    (if no API key)
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────┐
│   Mobile App        │
│  (React Native)     │
└──────────┬──────────┘
           │
           │ HTTP/REST
           ↓
┌─────────────────────────────────┐
│  Backend Server (Express.js)    │
│  ┌───────────────────────────┐  │
│  │ Routes & Controllers      │  │
│  └───────┬───────────────────┘  │
│          │                       │
│  ┌───────↓───────────────────┐  │
│  │ Business Logic Services   │  │
│  │ - AI Router              │  │
│  │ - Vision API             │  │
│  │ - Letter Generator       │  │
│  └───────┬───────────────────┘  │
│          │                       │
│  ┌───────↓───────────────────┐  │
│  │ Database Access Layer     │  │
│  │ (Firebase SDK)            │  │
│  └───────┬───────────────────┘  │
└──────────┼─────────────────────┘
           │
           └─────┬──────────────┬──────────┐
                 ↓              ↓          ↓
        ┌──────────────┐ ┌────────────┐ ┌─────────┐
        │  Firebase    │ │ Groq API   │ │ Google  │
        │  Firestore   │ │ OpenAI API │ │ Vision  │
        └──────────────┘ │ Google API │ │ API     │
                         │ Claude API │ └─────────┘
                         └────────────┘
```

---

## 🚀 Scaling Considerations

### Current (Small Scale)
- Single backend instance
- Firebase Firestore (auto-scaling)
- Local file storage

### Future (Large Scale)
- Load balancer
- Multiple backend instances
- CDN for static assets
- Cloud storage (AWS S3)
- Redis cache
- Database replication
- API gateway

---

## 🔄 Deployment Architecture

### Development
```
Local Machine
├── Backend (localhost:3001)
├── Mobile (Expo on device/emulator)
├── Firebase Emulator (optional)
└── Ollama (localhost:11434)
```

### Production
```
Firebase Hosting/Cloud Functions
├── Backend API
├── Database (Firestore)
└── Storage

CDN
├── Mobile app (web version)
└── Static assets

Android Devices
├── APK installed
└── Connect to API
```

---

## 📈 Performance Optimization

1. **Caching**: Redis for frequent queries
2. **Compression**: gzip for API responses
3. **Image Optimization**: Sharp for image processing
4. **Lazy Loading**: Load data on demand
5. **Connection Pooling**: Reuse DB connections
6. **Rate Limiting**: Prevent abuse
7. **Monitoring**: Track performance metrics

---

For implementation details, see individual service documentation.
