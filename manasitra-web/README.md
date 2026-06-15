# 🌸 Manasitra Frontend

> **Multilingual React 19 + Vite 8 Emotional Companion Web App**

This is the frontend component of Manasitra, built with a "Deep Tech" aesthetic, focusing on performance, smooth animations, and multilingual support.

## 📱 Platforms
- **Web:** Responsive SPA.
- **Android:** Native wrapper via Capacitor.
- **Desktop:** Native window via Electron.

## 🛠️ Logic Stack
- **Framework:** React 19 (Strict Mode)
- **State Management:** Zustand (Stores for Session, Language, Mood, Progress, Safety, Theme)
- **Styling:** Tailwind CSS 4 + Modern CSS Variables
- **Animations:** Framer Motion (High-performance transitions)
- **Charts:** Recharts (Mood trends and resilience tracking)
- **i18n:** i18next (10 Indian languages: HI, GU, MR, BN, TA, TE, KN, ML, PA, EN)

## 📁 Key Features
- **Soul Garden:** Gamified SVG growth system based on XP.
- **10 Calming Tools:** Fully offline interactive mini-games for anxiety relief.
- **Crisis Matrix:** Real-time risk detection and helpline foregrounding.
- **Privacy Audit:** On-screen transparency for all local storage.

## 🚀 Development

```bash
npm install
npm run dev
```

## 📦 Production Builds

### PWA / Web
```bash
npm run build
```

### Android APK
```bash
npm run build
npx cap sync android
npx cap open android
```

### Desktop
Building is controlled from the root level via the Electron scripts.

---
*Part of the Manasitra Ecosystem.*
