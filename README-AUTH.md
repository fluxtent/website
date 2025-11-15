# Google Sign-In Setup

This application uses NextAuth.js for Google authentication. Follow these steps to set up Google sign-in:

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for local development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
   - Copy the Client ID and Client Secret

## 2. Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID=your_actual_client_id
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_a_random_secret_here
   ```

3. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```
   Or use any random string generator.

## 3. User Progress Storage

User progress is stored in `data/user-progress.json`. This file is automatically created when users complete lessons.

## Features

- ✅ Google Sign-In authentication
- ✅ Progress tracking across lessons
- ✅ Progress saved automatically when lessons are completed
- ✅ Progress synced across devices (when signed in)
- ✅ Visual indicators for completed lessons
- ✅ Overall progress percentage

## Usage

1. Click "Sign in with Google" button (in the header or settings)
2. Complete lessons - your progress will be saved automatically
3. Sign out anytime - your progress remains saved
4. Sign in again on any device to access your saved progress

