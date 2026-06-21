# Setup Guide - Fredy Unlimited AI

## 🚀 Complete Setup Instructions

### Phase 1: Prerequisites Installation

#### 1. Install Node.js
- Download from https://nodejs.org/ (v16+)
- Verify: `node --version && npm --version`

#### 2. Install Git
- Download from https://git-scm.com/
- Verify: `git --version`

#### 3. Install Expo CLI (for Mobile)
```bash
npm install -g expo-cli
expo --version
```

#### 4. Install Docker (Optional but Recommended)
- Download from https://www.docker.com/
- Verify: `docker --version`

---

### Phase 2: Clone Repository

```bash
git clone https://github.com/Fredikutim/fredy-unlimited-ai.git
cd fredy-unlimited-ai
```

---

### Phase 3: Backend Setup

#### 1. Install Dependencies
```bash
cd backend
npm install
```

#### 2. Setup Firebase (FREE)

**Get Free Firebase Account:**
1. Go to https://firebase.google.com
2. Click "Get Started"
3. Create new project (name: `fredy-unlimited-ai`)
4. Wait for project creation (~1 min)
5. Enable Firestore Database:
   - Go to "Firestore Database"
   - Click "Create database"
   - Start in test mode
   - Choose region (closest to you)

**Create Service Account Key:**
1. Go to Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save file as `firebase-key.json` in `backend/` folder

#### 3. Setup AI API Keys (ALL FREE)

**Groq (Recommended - Free & Fast):**
1. Go to https://console.groq.com/
2. Sign up (free)
3. Go to "API Keys"
4. Create new key
5. Copy key

**Google Gemini (Free Tier):**
1. Go to https://makersuite.google.com/app/apikey
2. Click "Get API Key"
3. Create new key
4. Copy key

**OpenAI (Free Trial):**
1. Go to https://platform.openai.com/api-keys
2. Sign up
3. Create new key
4. Copy key (note: free trial only $5)

#### 4. Create .env File
```bash
cp .env.example .env
```

**Edit backend/.env:**
```env
PORT=3001
NODE_ENV=development

FIREBASE_PROJECT_ID=fredy-unlimited-ai
FIREBASE_KEY_PATH=./firebase-key.json

JWT_SECRET=your-secret-key-12345

GROQ_API_KEY=gsk_your_groq_key_here
GOOGLE_GEMINI_KEY=your_gemini_key_here
OPENAI_API_KEY=sk-your_openai_key_here
```

#### 5. Test Backend
```bash
npm run dev
```

**Expected Output:**
```
🚀 Backend running on http://localhost:3001
✅ Backend ready to receive requests!
```

Test in browser: http://localhost:3001/health

---

### Phase 4: Mobile App Setup

#### 1. Install Dependencies
```bash
cd ../mobile
npm install

# Install additional packages
xpo install expo-image-picker
expo install @react-native-async-storage/async-storage
```

#### 2. Configure API URL
```bash
cp .env.example .env
```

**Edit mobile/.env:**
```env
REACT_NATIVE_API_URL=http://localhost:3001/api
```

#### 3. Run Mobile App

**On Android:**
```bash
npm run android
```

**Or Start Expo:**
```bash
npm start
```

Then:
- Scan QR code with Expo Go app (Android/iOS)
- Or press `a` for Android emulator

---

### Phase 5: Verify Everything

#### Check Backend
```bash
curl http://localhost:3001/health
```

Expected:
```json
{"status":"ok","timestamp":"2026-06-21T..."}
```

#### Test Login (Backend)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

#### Test Mobile App
1. Open Fredy app
2. Register with test account
3. Upload a photo
4. View letters

---

## 🐳 Using Docker (Optional)

### Start All Services
```bash
docker-compose up
```

Services available:
- Backend: http://localhost:3001
- Mobile: http://localhost:19000

### Stop Services
```bash
docker-compose down
```

---

## 🔧 Troubleshooting

### Backend won't start
- Check Node version: `node --version` (must be 16+)
- Delete node_modules: `rm -rf node_modules && npm install`
- Check port 3001 not in use: `lsof -i :3001`

### Firebase connection error
- Verify `firebase-key.json` exists in `backend/`
- Check `FIREBASE_PROJECT_ID` in .env matches Firebase project

### Mobile app can't connect to backend
- Make sure backend is running: `npm run dev` in backend folder
- Check `REACT_NATIVE_API_URL` in mobile/.env
- On Android emulator, use `http://10.0.2.2:3001/api`

### API key errors
- Verify all keys are correct in .env
- Check provider hasn't revoked key
- Try different provider (9router will auto-fallback)

---

## ✅ Next Steps

1. ✅ Backend running on port 3001
2. ✅ Mobile app connects to backend
3. ✅ Can register/login
4. ✅ Can upload photos
5. ✅ Ready for deployment!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup.
