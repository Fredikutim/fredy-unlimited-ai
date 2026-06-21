# 🚀 Fredy Unlimited AI

> Aplikasi mobile dengan unlimited AI tokens menggunakan 9router, FreeLLMAPI, dan Ollama

## 📋 Deskripsi

**Fredy Unlimited AI** adalah aplikasi mobile yang memungkinkan pengguna untuk:

1. ✅ **Upload Foto/Dokumen** - Upload surat atau foto dokumen
2. ✅ **AI Analysis** - Aplikasi menganalisis data menggunakan AI unlimited tokens
3. ✅ **Generate Surat** - Menghasilkan surat berdasarkan data yang dianalisis
4. ✅ **Download/Share** - Download atau share surat yang sudah dibuat

## 🎯 Fitur Utama

- 🤖 **Multi-Provider AI**: 9router + FreeLLMAPI + Ollama
- 🎨 **Mobile UI**: React Native + Expo
- 📸 **Vision API**: Google Cloud Vision untuk OCR
- 💾 **Database**: Firebase/MongoDB untuk simpan data
- 🔄 **Auto Failover**: Routing otomatis antar AI providers
- 📦 **Docker Support**: Easy deployment dengan Docker Compose
- 🔐 **Secure**: Environment variables & authentication

## 📁 Project Structure

```
fredy-unlimited-ai/
├── backend/                    # Node.js Backend Server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── upload.js
│   │   │   ├── analyze.js
│   │   │   └── letters.js
│   │   ├── services/
│   │   │   ├── aiRouter.js
│   │   │   ├── visionAPI.js
│   │   │   ├── letterGenerator.js
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── config/
│   │   │   └── constants.js
│   │   └── index.js
│   ├── .env.example
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── mobile/                     # React Native + Expo
│   ├── app/
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── UploadScreen.js
│   │   │   ├── AnalyzeScreen.js
│   │   │   ├── LetterScreen.js
│   │   │   └── SettingsScreen.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── PhotoUpload.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── LetterPreview.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── storage.js
│   │   ├── context/
│   │   │   └── AppContext.js
│   │   ├── app.json
│   │   └── index.js
│   ├── .env.example
│   ├── package.json
│   ├── babel.config.js
│   └── README.md
│
├── ai-services/                # AI Services Configuration
│   ├── 9router/
│   │   ├── config.js
│   │   ├── providers.js
│   │   ├── .env.example
│   │   └── README.md
│   ├── freellmapi/
│   │   ├── config.js
│   │   ├── models.js
│   │   ├── .env.example
│   │   └── README.md
│   ├── ollama/
│   │   ├── config.js
│   │   ├── models.js
│   │   ├── .env.example
│   │   └── README.md
│   └── README.md
│
├── docs/                       # Documentation
│   ├── SETUP.md               # Setup guide
│   ├── API.md                 # API documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── ARCHITECTURE.md        # System architecture
│   └── AI_PROVIDERS.md        # AI providers guide
│
├── .github/
│   └── workflows/
│       ├── ci.yml             # CI/CD pipeline
│       └── deploy.yml         # Deployment workflow
│
├── docker-compose.yml          # Main Docker Compose
├── .env.example                # Example environment variables
├── CONTRIBUTING.md             # Contributing guidelines
└── LICENSE                     # MIT License
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+ (optional untuk Ollama)
- Docker & Docker Compose (optional)
- Git

### 1. Clone & Install

```bash
git clone https://github.com/Fredikutim/fredy-unlimited-ai.git
cd fredy-unlimited-ai

# Backend
cd backend
npm install
cp .env.example .env

# Mobile
cd ../mobile
npm install
cp .env.example .env

# Back to root
cd ..
```

### 2. Setup Environment Variables

**backend/.env**
```
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/fredy-ai
FIREBASE_API_KEY=your-firebase-key

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GEMINI_KEY=...
GROQ_API_KEY=...

# Vision API
GOOGLE_CLOUD_VISION_KEY=...

# 9router
NINE_ROUTER_URL=http://localhost:8000
NINE_ROUTER_API_KEY=...

# JWT
JWT_SECRET=your-jwt-secret-key
```

### 3. Start Services

**Option A: Using Docker Compose (Recommended)**
```bash
docker-compose up -d
```

**Option B: Manual Start**

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Mobile
cd mobile
npm start

# Terminal 3: 9router (optional)
cd ai-services/9router
npm start

# Terminal 4: Ollama (optional)
ollama serve
```

### 4. Access Applications

- **Backend API**: http://localhost:3001
- **Mobile App**: http://localhost:19000 (Expo)
- **9router Dashboard**: http://localhost:8000
- **Ollama API**: http://localhost:11434

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [API Documentation](./docs/API.md) - API endpoints & usage
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment
- [System Architecture](./docs/ARCHITECTURE.md) - How it works
- [AI Providers](./docs/AI_PROVIDERS.md) - Configure AI services

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Upload & Analysis
- `POST /api/upload` - Upload photo/document
- `POST /api/analyze` - Analyze uploaded image
- `GET /api/analyze/:id` - Get analysis result

### Letters
- `GET /api/letters` - Get user's letters
- `POST /api/letters` - Create new letter
- `GET /api/letters/:id` - Get letter details
- `PUT /api/letters/:id` - Update letter
- `DELETE /api/letters/:id` - Delete letter
- `GET /api/letters/:id/download` - Download letter (PDF)

## 🤖 AI Services Configuration

### Using 9router
9router automatically routes requests to available AI providers with fallback support.

```javascript
const aiRouter = require('./services/aiRouter');

const result = await aiRouter.chat({
  prompt: 'Analyze this document...',
  model: 'auto' // Automatically selects best provider
});
```

### Using Ollama (Local)
Run open-source models locally without API keys.

```javascript
const ollama = require('./services/ollama');

const result = await ollama.generate({
  model: 'llama2',
  prompt: 'Analyze this...',
  stream: false
});
```

### Using FreeLLMAPI
Aggregate multiple free LLM providers.

```javascript
const freeLLM = require('./services/freeLLMAPI');

const result = await freeLLM.chat({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Analyze...' }]
});
```

## 🔒 Security

- ✅ JWT Authentication
- ✅ Environment variables for sensitive data
- ✅ Input validation & sanitization
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Secure file upload handling

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Uploads Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  filename: String,
  originalName: String,
  fileSize: Number,
  mimeType: String,
  uploadedAt: Date,
  expiresAt: Date
}
```

### Analysis Results Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  uploadId: ObjectId,
  aiProvider: String,
  extractedData: Object,
  confidence: Number,
  analyzedAt: Date
}
```

### Letters Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  template: String,
  content: String,
  analysisId: ObjectId,
  status: String (draft/completed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Using Docker
```bash
# Build images
docker-compose build

# Run containers
docker-compose up -d
```

### Using Heroku
```bash
heroku create fredy-unlimited-ai
heroku config:set NODE_ENV=production
git push heroku main
```

### Using AWS/GCP
See [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## 📝 License

MIT License - see [LICENSE](./LICENSE) file

## 👨‍💻 Author

**Fredy Kutim** - [@Fredikutim](https://github.com/Fredikutim)

## 📞 Support

- 📧 Email: support@fredyai.com
- 💬 Issues: GitHub Issues
- 📖 Docs: See `/docs` folder

## 🙏 Acknowledgments

- [9router](https://github.com/decolua/9router) - AI provider routing
- [FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) - Free LLM aggregation
- [Ollama](https://ollama.com/) - Local LLM running
- [Expo](https://expo.dev/) - React Native framework
- [Express.js](https://expressjs.com/) - Backend framework

---

**Last Updated**: 2026-06-21
