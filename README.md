# HALLHA Platform — Starter v1

This is the first structured HALLHA platform build. It includes a responsive React/Vite frontend and working browser-side tools:
- Merge PDF files
- Compress images
- Profit and discount calculator
- QR code generator
- Text counter and case conversion
- Printable resume builder
- Arabic/English interface
- Optional Supabase Auth integration (requires configuration)
- Starter Supabase schema with Row Level Security

## Requirements
- Node.js 20 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Build
```bash
npm run build
```
The production site is generated in `dist/`.

## Deploy to Cloudflare Pages
1. Push this project to a GitHub repository.
2. In Cloudflare Pages, connect the repository.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Build output directory: `dist`
6. Add the environment variables below only after creating a Supabase project.

## Enable accounts with Supabase
1. Create a Supabase project.
2. Open Project Settings → API.
3. Copy the Project URL and anon/public key.
4. Set these in your deployment environment:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Run `backend/supabase/schema.sql` in Supabase SQL Editor.
6. Configure the allowed redirect URLs in Supabase Auth.

Never put a Supabase `service_role` key in frontend code.

## Current limitations
- AI assistant is a placeholder. Real AI requires a secure server-side API function and usually a paid API key.
- Premium membership is a presentation placeholder. Do not collect payments until a payment provider, server-side verification, webhook handling, and legal/tax requirements are configured.
- Favorites/profile UI and admin dashboard are not yet connected.
- Free hosting/database plans have quotas and can change.
- PDF and QR libraries are downloaded as app dependencies during build; no external CDN is needed at runtime.

## Next development milestones
1. Connect Supabase and test signup/login.
2. Add user profile and favorites.
3. Add admin role and protected admin routes.
4. Add secure AI backend function with rate limits.
5. Add payment provider and subscription webhooks.
6. Add analytics, SEO pages, accessibility and privacy/legal pages.
