# Pomodoro+ Ultra — Android APK Build Guide
# Using Capacitor (Free, Official Ionic solution)

## Prerequisites
- Node.js 18+ (https://nodejs.org)
- Android Studio (https://developer.android.com/studio)
- JDK 17+ (bundled with Android Studio)

---

## Step 1 — Set up project folder

```bash
mkdir pomodoro-ultra-app
cd pomodoro-ultra-app
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
```

---

## Step 2 — Initialize Capacitor

```bash
npx cap init "Pomodoro Ultra" com.yourname.pomodoro --web-dir www
```

---

## Step 3 — Put your app in the www/ folder

```bash
mkdir www
cp /path/to/pomodoro-ultra-pwa.html  www/index.html
cp /path/to/manifest.json            www/manifest.json
cp /path/to/icon-512.svg             www/icon-512.svg
cp /path/to/icon-192.svg             www/icon-192.svg
```

---

## Step 4 — Add Android platform

```bash
npx cap add android
```

---

## Step 5 — Sync files

```bash
npx cap sync android
```

---

## Step 6 — Open in Android Studio

```bash
npx cap open android
```

Android Studio will open. Wait for Gradle to finish syncing (first time ~2-3 min).

---

## Step 7 — Build Debug APK (for testing)

In Android Studio:
1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Find the APK at:
   `android/app/build/outputs/apk/debug/app-debug.apk`
3. Send to your phone via USB, email, or Google Drive
4. On phone: Settings → Security → Enable "Unknown sources" → Open APK

---

## Step 8 — Build Release APK (for Play Store or sharing)

1. **Build** → **Generate Signed Bundle / APK**
2. Choose **APK**
3. Create a new keystore (save the password securely!)
4. Choose **release** build variant
5. APK saved to: `android/app/build/outputs/apk/release/app-release.apk`

---

## Step 9 (Optional) — Customize app icon

Replace the icon by editing:
`android/app/src/main/res/mipmap-*/ic_launcher.png`

Or use Android Studio's **Image Asset Studio**:
Right-click `res/` → New → Image Asset → paste your SVG

---

## capacitor.config.json (auto-generated, customize here)

```json
{
  "appId": "com.yourname.pomodoro",
  "appName": "Pomodoro Ultra",
  "webDir": "www",
  "bundledWebRuntime": false,
  "android": {
    "allowMixedContent": true,
    "backgroundColor": "#ede9fe"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#7c3aed",
      "showSpinner": false
    }
  }
}
```

---

## Online APK Builders (no coding needed)

If you want a quick APK without setting up Android Studio:

1. **WebIntoApp** — https://webintoapp.com
   - Upload your HTML or paste a hosted URL
   - Configure icon, name, splash screen
   - Download APK instantly (free tier available)

2. **AppMaker** — https://appmaker.xyz
   - Similar to WebIntoApp, very beginner-friendly

3. **Gonative.io** — https://gonative.io
   - More polished, best for production apps
   - Paid ($99 one-time for APK+IPA)

---

## Host on GitHub Pages (free, then use any wrapper)

```bash
# 1. Create a GitHub repo
# 2. Upload all 4 files: index.html, manifest.json, icon-512.svg, icon-192.svg
# 3. Settings → Pages → Deploy from main branch
# 4. Your app URL: https://yourusername.github.io/pomodoro-ultra/
# 5. Paste that URL into WebIntoApp → get APK
```

---

## Files in this package

| File                        | Purpose                          |
|-----------------------------|----------------------------------|
| pomodoro-ultra-pwa.html     | Main app (works offline as PWA)  |
| manifest.json               | PWA/Android metadata             |
| icon-512.svg                | App icon (512×512)               |
| icon-192.svg                | App icon (192×192)               |
| BUILD_GUIDE.txt             | This file                        |
