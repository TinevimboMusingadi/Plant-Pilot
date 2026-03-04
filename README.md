<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f3aedbcb-1cbd-44a4-8642-931c1762c689

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   - **With AI features (Crop Advisor, Pest Detector):** `npm run dev:vercel` — uses Vercel dev server so API routes work
   - **Frontend only:** `npm run dev`

## Deploy on Vercel

1. Push your code to GitHub and [import the project](https://vercel.com/new) in Vercel
2. Add `GEMINI_API_KEY` as an [Environment Variable](https://vercel.com/docs/environment-variables) (Project Settings → Environment Variables)
3. Deploy — Vercel auto-detects the Vite setup
