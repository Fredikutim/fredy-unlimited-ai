# Deployment Guide - Fredy Unlimited AI

## 🚀 Deploy to Production (FREE OPTIONS)

### Option 1: Firebase Hosting + Cloud Functions (RECOMMENDED)

**Why:** Free tier generous, auto-scaling, easy to use

#### Setup Backend on Firebase

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
```

2. **Initialize Firebase Project**
```bash
cd backend
firebase init
```

Select:
- ✅ Functions
- ✅ Hosting

3. **Deploy**
```bash
firebase deploy
```

**Backend URL:** `https://your-project.cloudfunctions.net`

#### Deploy Mobile to Firebase Hosting

1. **Build Mobile App**
```bash
cd ../mobile
npm run build:web
```

2. **Deploy**
```bash
cd ../
firebase deploy --only hosting:mobile
```

**Mobile URL:** `https://your-project.web.app`

---

### Option 2: Render (Free Tier - 10GB/month)

**URL:** https://render.com

#### Deploy Backend

1. **Push to GitHub**
```bash
git add .
git commit -m "Production ready"
git push origin main
```

2. **Create Render Account** and link GitHub

3. **Create New Web Service**
- Select repository
- Root directory: `backend`
- Build: `npm install`
- Start: `npm start`
- Environment variables: Add all from `.env`

4. **Deploy** - Render auto-deploys on push

**Backend URL:** `https://your-service.onrender.com`

#### Deploy Mobile

1. **Build Web Version**
```bash
cd mobile
npm run build:web
```

2. **Create Static Site on Render**
- Root directory: `mobile/web-build`
- Auto-deploys on push

**Mobile URL:** `https://your-mobile.onrender.com`

---

### Option 3: Vercel (Free - 10GB bandwidth/month)

**URL:** https://vercel.com

#### Deploy Mobile Frontend

1. **Connect GitHub** to Vercel

2. **Create New Project**
- Select repository
- Framework: React
- Root directory: `mobile`

3. **Add Environment Variables**
```
REACT_NATIVE_API_URL=https://your-backend.onrender.com/api
```

4. **Deploy** - Auto-deploys on push

**Mobile URL:** `https://your-project.vercel.app`

---

## 📱 Build APK for Android

### Option A: EAS Build (Expo - Recommended)

**Setup:**
```bash
npm install -g eas-cli
eas login
cd mobile
eas build:configure --platform android
```

**Build:**
```bash
npm run build:android
```

**Download APK:**
1. Go to EAS Dashboard
2. Find build
3. Click "Download" for APK

**Install on Android:**
```bash
adb install -r fredy-unlimited-ai.apk
```

### Option B: Android Studio (Local Build)

```bash
cd mobile
expo prebuild --clean
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🌍 Domain & SSL

### Add Custom Domain

**Firebase:**
1. Go to Hosting settings
2. Add custom domain
3. Follow DNS instructions

**Render:**
1. Go to Settings
2. Add custom domain
3. Update DNS records

**Vercel:**
1. Project Settings → Domains
2. Add domain
3. Update DNS

---

## 📊 Monitor & Logs

### Firebase
```bash
firebase functions:log
firebase hosting:log
```

### Render
- Dashboard → Service → Logs tab

### Vercel
- Dashboard → Project → Deployments → Logs

---

## 🔐 Environment Variables for Production

**Update all API keys for production:**

```env
NODE_ENV=production
PORT=3001

# Firebase
FIREBASE_PROJECT_ID=fredy-unlimited-ai

# JWT (change this!)
JWT_SECRET=your-super-secret-production-key-change-this

# AI Services (use production keys)
GROQ_API_KEY=your-production-key
GOOGLE_GEMINI_KEY=your-production-key
OPENAI_API_KEY=your-production-key

# CORS
CORS_ORIGIN=https://your-domain.com,https://your-mobile.com
```

---

## ✅ Deployment Checklist

- [ ] Firebase/Render/Vercel account created
- [ ] Repository pushed to GitHub
- [ ] Environment variables set
- [ ] Backend deployed and running
- [ ] Mobile app deployed
- [ ] Custom domain configured
- [ ] SSL certificate working
- [ ] Tested from Android device
- [ ] Logs monitoring configured

---

## 💰 Free Tier Limits

**Firebase:**
- 1GB Firestore storage
- 50K read/day
- 20K write/day

**Render:**
- 10GB/month bandwidth
- Auto-sleep after 15 min inactivity

**Vercel:**
- 10GB bandwidth/month
- Unlimited deployments

**EAS Build:**
- 30 build minutes/month free
- Then pay per build

---

## 🚀 Going to Google Play Store

1. **Create Google Play Developer Account** ($25 one-time)
2. **Build Release APK** via EAS
3. **Create App Listing**
4. **Upload APK** to Play Store
5. **Set pricing** (Free or Paid)
6. **Submit for review** (~24 hours)

See Google Play docs for details.

---

Need help? Check the main README.md or create an issue on GitHub!
