# LivePalakkad - Hyperlocal News Platform

**Palakkad First** - A professional, production-ready hyperlocal news website for Palakkad district, Kerala.

![LivePalakkad](public/logo/livepalakkad-icon.png)

- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/desk
- **Email**: mailstudiocity@gmail.com
- **Phone**: 90745 00360
- **Admin Email**: srr6vv@gmail.com

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Backend**: Node.js (Next.js API routes)
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Prisma (25+ data models)
- **Auth**: NextAuth.js with bcryptjs
- **Icons**: Lucide React
- **Utilities**: date-fns
- **Styling**: Tailwind CSS v4 with dark mode
- **Deployment**: Vercel, VPS, or self-hosted

---

## Quick Start (5 Minutes)

See [START_HERE.md](START_HERE.md) for step-by-step setup.

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Start dev server
pnpm dev

# Visit http://localhost:3000
```

**Admin Access:**
- Email: `srr6vv@gmail.com`
- Password: Check `.env.local` for `ADMIN_PASSWORD`
- URL: http://localhost:3000/desk

---

## Project Structure

```
LivePalakkad/
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout with metadata
│   ├── articles/[slug]/       # Article detail pages
│   ├── category/[slug]/       # Category pages
│   ├── location/[slug]/       # Location pages
│   ├── auth/signin/           # Sign-in page
│   ├── desk/                  # Admin panel (protected)
│   │   ├── page.tsx          # Admin dashboard
│   │   └── articles/page.tsx  # Article management
│   ├── api/auth/[...nextauth]/ # NextAuth handler
│   └── globals.css            # Global styles
│
├── components/                # Reusable components
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   └── ArticleCard.tsx       # Article card (2 layouts)
│
├── lib/                       # Utilities & config
│   ├── auth.ts               # NextAuth setup
│   ├── db.ts                 # Prisma client
│   └── permissions.ts        # RBAC helpers
│
├── prisma/                   # Database
│   ├── schema.prisma         # Data models (560+ lines)
│   ├── seed.mjs              # Sample data
│   └── migrations/           # DB migrations
│
├── public/                   # Static files
│   ├── logo/
│   │   ├── livepalakkad-icon.png
│   │   └── livepalakkad-branding.jpg
│   └── images/
│
├── START_HERE.md             # 5-minute quick start
├── BUILD_COMPLETE.md         # Full build summary
├── .env.example              # Environment template
├── next.config.mjs           # Next.js config
├── tailwind.config.ts        # Tailwind config
├── package.json
├── tsconfig.json
└── README.md                 # This file
```

---

## Setup Instructions

### 1. Prerequisites

Ensure you have installed:
- Node.js 20+ (`node --version`)
- PostgreSQL 14+ (`psql --version`)
- pnpm (`pnpm --version`) - or use npm/yarn
- Git

### 2. Clone & Install Dependencies

```bash
git clone <repo-url> livepalakkad
cd livepalakkad
pnpm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in the required variables:

```bash
cp .env.example .env
```

**Critical variables to set:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/livepalakkad"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin account (will be created by seed script)
ADMIN_EMAIL="srr6vv@gmail.com"
ADMIN_PASSWORD="secure-password-here"

# Site info
SITE_NAME="LivePalakkad"
SITE_URL="https://livepalakkad.com"

# Admin panel hidden URL
NEXT_PUBLIC_ADMIN_PATH="/desk"
```

### 4. Database Setup

#### Option A: Create PostgreSQL database locally

```bash
# Create database
createdb livepalakkad

# Update DATABASE_URL in .env to point to it
```

#### Option B: Use Vercel Postgres or Neon.tech (free tier available)

Get a connection string from [Neon.tech](https://neon.tech) and update `.env`:

```env
DATABASE_URL="postgresql://user:password@host/dbname"
```

### 5. Initialize Database

```bash
# Run migrations
pnpm db:migrate

# Seed with initial data (categories, locations, permissions, default admin user)
pnpm db:seed
```

This will:
- Create all database tables
- Seed 16 categories and 25 Palakkad locations
- Create permissions and default roles
- Create the default admin user with email from `ADMIN_EMAIL`

### 6. Generate NextAuth Secret

If not already set in `.env`:

```bash
openssl rand -base64 32
```

Copy the output and paste into `NEXTAUTH_SECRET` in `.env`.

---

## Local Development

### Start Dev Server

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

### Access Admin Dashboard

1. Open `http://localhost:3000/auth/signin`
2. Enter credentials:
   - Email: `srr6vv@gmail.com` (from `ADMIN_EMAIL`)
   - Password: (from `ADMIN_PASSWORD`)
3. Redirects to `http://localhost:3000/desk`

### Database GUI (Optional)

View and edit data directly:

```bash
pnpm db:studio
```

Opens Prisma Studio at `http://localhost:5555`

---

## Production Deployment

### 1. Build the App

```bash
pnpm build
```

Creates optimized Next.js production bundle in `.next/`

### 2. Set Production Environment Variables

Update `.env` for production:

```env
NODE_ENV=production
NEXTAUTH_URL="https://livepalakkad.com"
DATABASE_URL="<production-postgres-url>"
# etc.
```

### 3. Run Database Migrations

```bash
pnpm db:migrate:prod
```

### 4. Start with PM2

```bash
# Install PM2 globally (if not already)
npm install -g pm2

# Start the app
pm2 start ecosystem.config.js --env production

# Save PM2 state so it auto-restarts on server reboot
pm2 save

# Setup auto-restart on boot
pm2 startup
```

### 5. Configure Nginx

Copy Nginx config and update paths:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/livepalakkad
sudo ln -s /etc/nginx/sites-available/livepalakkad /etc/nginx/sites-enabled/livepalakkad
```

Edit `/etc/nginx/sites-available/livepalakkad` and update:

- `ssl_certificate` path
- `ssl_certificate_key` path
- `root` path to your project's `/public` directory
- `/path/to/livepalakkad/` references

Test Nginx config:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

### 6. Enable HTTPS with Let's Encrypt

```bash
sudo certbot certonly --standalone -d livepalakkad.com -d www.livepalakkad.com
```

Update the certificate paths in `/etc/nginx/sites-available/livepalakkad`.

### 7. Monitor Application

```bash
# View live logs
pm2 logs livepalakkad

# Monitor CPU/memory
pm2 monit

# List running apps
pm2 list

# Restart app
pm2 restart livepalakkad

# View PM2 status
pm2 status
```

---

## Database Schema

### Core Models

**Users & Auth:**
- `User` - Staff/admin accounts (email, hashed password, metadata)
- `Role` - Permission groups (Full Admin, Reporter, Sub-Editor, etc.)
- `Permission` - Individual capabilities (can:create:articles, can:publish:articles, etc.)
- `UserRole` - Maps users to roles
- `RolePermission` - Maps permissions to roles

**Content:**
- `Article` - News articles (title, content, status, SEO fields, author, category, location)
- `Category` - Article categories (16 pre-seeded: Politics, Crime, Health, etc.)
- `Location` - Palakkad towns/panchayats (25 pre-seeded)
- `Tag` - Article tags for flexible categorization
- `ArticleImage` - Images within articles
- `ArticleVideo` - YouTube/Facebook/Instagram embeds
- `Comment` - Reader comments (moderation queue)

**Live Updates:**
- `LiveUpdateThread` - Event/incident live coverage thread
- `LiveUpdateEntry` - Individual updates within a thread

**Other:**
- `Advertisement` - Ad placements (header, sidebar, footer, in-feed)
- `Reporter` - Author profiles
- `MediaLibrary` - Uploaded media with search/tagging
- `NewsletterSubscriber` - Email newsletter signups
- `PushNotification` - Web push notifications
- `Poll` - Daily polls
- `PlaceToVisit` - Tourism/attractions
- `TravelGuide` - Travel guides and culture articles
- `PageView` - Analytics data
- `SiteSetting` - Global configuration

---

## Role-Based Access Control (RBAC)

### Built-in Roles

1. **Full Admin** - All permissions; reserved for site founders
2. **Reporter** - Can create articles, edit own, manage media (not publish)
3. **Sub-Editor** - Can create, edit, and publish articles
4. **Category Editor** - Limited to specific category
5. **Location Correspondent** - Limited to specific location

### Permissions

The system uses Discord-style custom roles. Any role can be assigned any combination of permissions:

- `can:create:articles`
- `can:publish:articles`
- `can:edit:own:articles`
- `can:edit:all:articles`
- `can:delete:articles`
- `can:manage:comments`
- `can:manage:categories`
- `can:manage:locations`
- `can:manage:tags`
- `can:manage:advertisements`
- `can:manage:users`
- `can:send:notifications`
- `can:access:analytics`
- `can:manage:seo`
- `can:manage:media`
- `can:manage:live-updates`
- `can:manage:reporters`
- `can:scope:location` (restrict to specific location)
- `can:scope:category` (restrict to specific category)

### Usage in Code

```typescript
import { auth } from "@/lib/auth";
import { hasPermission, requirePermission } from "@/lib/permissions";

// In Server Components or API routes:
const session = await auth();

// Check permission
if (!hasPermission(session, "can:publish:articles")) {
  throw new Error("Unauthorized");
}

// Or require permission (throws if missing)
requirePermission(session, "can:publish:articles");
```

---

## Managing Admin Access

### View Users

```bash
# Using Prisma Studio
pnpm db:studio
# Navigate to User table and search
```

### Promote User to Full Admin

```bash
# Via Prisma Studio:
# 1. Open pnpm db:studio
# 2. Go to User table, find user
# 3. Go to UserRole relation, add the "Full Admin" role

# Or via database query:
psql livepalakkad
```

```sql
-- Add Full Admin role to user
INSERT INTO "UserRole" ("id", "userId", "roleId")
SELECT 
  gen_random_uuid(),
  u.id,
  r.id
FROM "User" u, "Role" r
WHERE u.email = 'user@example.com'
AND r.name = 'Full Admin'
ON CONFLICT DO NOTHING;
```

### Recover Locked-Out Admin

If you can't access the admin panel:

```bash
# Generate new password hash
node -e "const b = require('bcryptjs'); console.log(b.hashSync('new-password-123', 10))"

# Update user password in database
psql livepalakkad
```

```sql
UPDATE "User" 
SET password = '$2a$10$...' 
WHERE email = 'srr6vv@gmail.com';
```

Then sign in with the new password.

---

## Deployment to VPS

### Prerequisites

Your VPS should have:
- Ubuntu 20.04+ or similar
- Node.js 20+
- PostgreSQL 14+
- Nginx
- Git

### Step-by-Step

1. **SSH into server**
   ```bash
   ssh root@your-vps-ip
   ```

2. **Install dependencies**
   ```bash
   # Node.js (using NodeSource)
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # PostgreSQL
   sudo apt-get install -y postgresql postgresql-contrib

   # Nginx
   sudo apt-get install -y nginx

   # PM2
   sudo npm install -g pm2

   # pnpm
   npm install -g pnpm

   # Git
   sudo apt-get install -y git
   ```

3. **Clone repository**
   ```bash
   cd /var/www
   sudo git clone <repo-url> livepalakkad
   cd livepalakkad
   ```

4. **Create PostgreSQL database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE livepalakkad;
   CREATE USER livepalakkad_user WITH PASSWORD 'secure-password';
   GRANT ALL PRIVILEGES ON DATABASE livepalakkad TO livepalakkad_user;
   \q
   ```

5. **Set up environment**
   ```bash
   cd /var/www/livepalakkad
   sudo cp .env.example .env
   sudo nano .env
   # Update DATABASE_URL, ADMIN_PASSWORD, etc.
   ```

6. **Install dependencies**
   ```bash
   sudo pnpm install
   ```

7. **Initialize database**
   ```bash
   sudo pnpm db:migrate
   sudo pnpm db:seed
   ```

8. **Build app**
   ```bash
   sudo pnpm build
   ```

9. **Start with PM2**
   ```bash
   sudo pm2 start ecosystem.config.js --env production --user www-data
   sudo pm2 save
   sudo pm2 startup systemd -u www-data --hp /var/www
   ```

10. **Configure Nginx**
    ```bash
    sudo cp nginx.conf /etc/nginx/sites-available/livepalakkad
    sudo nano /etc/nginx/sites-available/livepalakkad
    # Update paths and SSL certificate paths
    sudo ln -s /etc/nginx/sites-available/livepalakkad /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

11. **Enable HTTPS**
    ```bash
    sudo certbot certonly --standalone -d livepalakkad.com -d www.livepalakkad.com
    # Follow prompts
    ```

12. **Verify**
    ```bash
    pm2 logs livepalakkad
    # Visit https://livepalakkad.com in browser
    ```

---

## Available npm Scripts

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:migrate       # Create/apply migrations (interactive)
pnpm db:migrate:prod  # Apply migrations in production
pnpm db:push          # Sync schema to database (without migrations)
pnpm db:seed          # Seed database with initial data
pnpm db:reset         # DROP & recreate database (dev only!)
pnpm db:studio        # Open Prisma Studio (GUI at localhost:5555)

# Linting
pnpm lint             # Run ESLint
```

---

## Dependencies

### Production
- `next@16` - React framework
- `react@19` - UI library
- `@prisma/client@^7` - ORM for PostgreSQL
- `next-auth@5.0.0-beta` - Authentication
- `bcryptjs` - Password hashing
- `zod@^4` - Schema validation
- `react-hook-form@^7` - Form handling
- `jose@^6` - JWT handling
- `tailwindcss@^4` - Styling

### Development
- `prisma@^7` - Database toolkit
- `typescript@5` - Type safety
- `eslint` - Code linting
- `tsx` - TypeScript executor
- `dotenv` - Environment variables

### Optional (for future features)
- `recharts` - Charts/analytics
- `cloudinary` - Cloud image storage
- `firebase-admin` - Push notifications
- `meilisearch` - Advanced search
- `stripe` - Payments (if monetization later)

---

## Features Roadmap

### Phase 1 ✅ (Complete)
- [x] Database schema with Prisma
- [x] NextAuth.js authentication (admin/staff only)
- [x] Role-based access control (RBAC) with custom role system
- [x] Seed script with 16 categories, 25 locations, and default admin
- [x] Admin sign-in page
- [x] Basic admin dashboard

### Phase 2 (Article Management)
- [ ] Article CRUD (create, edit, publish, schedule)
- [ ] Per-article SEO fields (title, meta description, OG image, schema)
- [ ] Rich text editor for article content
- [ ] Image upload and gallery
- [ ] Manual video embed (YouTube, Facebook, Instagram)
- [ ] Comment moderation queue

### Phase 3 (Public Pages)
- [ ] Homepage with hero story + top stories + category sections
- [ ] Category pages (filtered by category)
- [ ] Location pages (filtered by Palakkad town)
- [ ] Live Updates page and functionality
- [ ] Photo gallery with lightbox

### Phase 4 (Admin Dashboard)
- [ ] Analytics dashboard (page views, trending)
- [ ] Scheduled posts management
- [ ] Push notification system
- [ ] Advertisement management
- [ ] Users and roles management

### Phase 5 (Advanced Features)
- [ ] Explore Palakkad (tourism/culture section)
- [ ] Theme toggle (dark/light)
- [ ] Language toggle (Malayalam/English)
- [ ] Newsletter signup
- [ ] Mobile bottom navigation
- [ ] PWA/offline support

### Phase 6 (SEO & Performance)
- [ ] sitemap.xml generation
- [ ] robots.txt
- [ ] JSON-LD NewsArticle schema
- [ ] Open Graph + Twitter Card tags
- [ ] Image optimization and lazy loading
- [ ] Core Web Vitals optimization

### Future Enhancements
- [ ] S3/Cloudinary integration (replace local uploads)
- [ ] Meilisearch for advanced search
- [ ] Firebase Cloud Messaging for push notifications
- [ ] Google AdSense integration
- [ ] Paywall/subscription system
- [ ] Multi-language support beyond Malayalam/English

---

## SEO Readiness

The platform is architected to be ready for:
- **Google News** - Includes NewsArticle schema, accurate timestamps, author info
- **Google Discover** - Optimized images, engaging headlines, quality content signals
- **Google AdSense** - Ad slot infrastructure built in, ready for insertion without redesign

---

## Troubleshooting

### "Database connection error"
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify DATABASE_URL in .env is correct
# Test connection
psql "$DATABASE_URL"
```

### "Can't sign in to admin"
```bash
# Check if admin user was created
pnpm db:studio
# Go to User table, search for admin email

# If missing, re-run seed
pnpm db:seed
```

### "Admin panel showing 404"
```bash
# Check session JWT token
# Clear browser cookies and sign in again

# Verify NEXTAUTH_SECRET is set
echo $NEXTAUTH_SECRET
```

### "Uploads folder not found"
```bash
# Create uploads folder
mkdir -p public/uploads
chmod 755 public/uploads
```

### "PM2 won't start"
```bash
# Check logs
pm2 logs livepalakkad

# Verify .env is loaded
# Try starting with explicit env:
NODE_ENV=production pnpm start

# Check port 3000 is not in use
lsof -i :3000
```

---

## Support

For issues or questions:
- Email: `mailstudiocity@gmail.com`
- Admin: `srr6vv@gmail.com`
- Phone: `90745 00360`

---

## License

Proprietary - LivePalakkad News Platform

---

## Contributors

- Built with v0 AI assistant
- Architecture: Full-stack Next.js + PostgreSQL
- Target: Hyperlocal news platform for Palakkad district, Kerala
