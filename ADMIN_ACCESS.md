# Admin Dashboard Access

## Overview

The admin dashboard is available at `/desk` and is **fully protected by authentication**. Only logged-in users can access the admin panel.

## Access Information

**Admin URL:** `https://your-domain.com/desk`

**Demo Credentials:**
- Email: `admin@livepalakkad.com`
- Password: `admin123`

## Authentication Flow

1. **Unauthenticated users** trying to access `/desk` are automatically redirected to `/auth/signin`
2. **Sign In page** (`/auth/signin`) shows a professional login form with demo credentials displayed
3. **After successful login**, users are redirected to the admin dashboard at `/desk`
4. **Session persists** using NextAuth JWT strategy for 30 days
5. **Sign Out** button in the dashboard header redirects users back to homepage

## Admin Features

### Dashboard Overview
- **Stats Grid**: Total articles, views, comments, active users
- **Quick Actions**: New article, all articles, comments queue
- **Recent Articles**: Top 24-hour articles with view counts
- **Navigation Sidebar**: Quick links to key admin sections

### Admin Menu Items
- **Articles** - `/desk/articles` - Manage content
- **Comments** - `/desk/comments` - Moderate discussions
- **Users & Roles** - `/desk/users` - User management
- **Analytics** - `/desk/analytics` - Statistics and insights

## Security Notes

- The admin dashboard uses NextAuth with credential-based authentication
- Sessions are JWT-based with 30-day expiration
- Unauthenticated access attempts are automatically redirected to login
- Sign out clears the session and redirects to homepage

## Demo Credentials

These demo credentials are displayed on the sign-in page for development:
```
Email: admin@livepalakkad.com
Password: admin123
```

In production, replace with actual database-backed authentication and hide demo credentials.

## File Locations

- Admin Dashboard: `/app/desk/page.tsx`
- Sign In Page: `/app/auth/signin/page.tsx`
- Auth Config: `/lib/auth.ts`
- NextAuth API: `/app/api/auth/[...nextauth]/route.ts`

## Production Setup

For production deployment:

1. **Set up a proper database** (Neon, Supabase, PostgreSQL)
2. **Update authentication** in `lib/auth.ts` to use database
3. **Set environment variables**:
   - `NEXTAUTH_URL` - Your domain
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
4. **Remove demo credentials** from sign-in page
5. **Implement proper user management** in admin panel

## Protected Routes

The following routes are protected by authentication:
- `/desk` - Admin dashboard (main)
- `/desk/articles` - Article management
- `/desk/comments` - Comment moderation
- `/desk/users` - User management
- `/desk/analytics` - Analytics dashboard
