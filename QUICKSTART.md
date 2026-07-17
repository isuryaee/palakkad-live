# LivePalakkad - Quick Start Guide

Get LivePalakkad running in 5 minutes.

---

## Prerequisites

- Node.js 20+ installed
- pnpm installed (`npm install -g pnpm`)
- A PostgreSQL database (local or cloud)

---

## Step 1: Install Dependencies (30 seconds)

```bash
cd /path/to/livepalakkad
pnpm install
```

---

## Step 2: Set Up Environment (1 minute)

```bash
# Copy template
cp .env.example .env

# Edit with your database URL
nano .env
```

**Minimal required values:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/livepalakkad"
NEXTAUTH_SECRET="paste-the-output-of-openssl-rand-base64-32-here"
ADMIN_EMAIL="srr6vv@gmail.com"
ADMIN_PASSWORD="change-me-123"
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

---

## Step 3: Initialize Database (1 minute)

```bash
# Create tables
pnpm db:migrate

# Seed with initial data
pnpm db:seed
```

---

## Step 4: Start Development Server (30 seconds)

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

## Step 5: Sign In to Admin (1 minute)

1. Visit `http://localhost:3000/auth/signin`
2. Enter credentials:
   - Email: `srr6vv@gmail.com`
   - Password: `change-me-123` (or what you set in `.env`)
3. You're now in the admin dashboard at `http://localhost:3000/desk`

---

## That's It! 🎉

LivePalakkad is running locally.

---

## What's Ready?

- ✅ Admin sign-in page
- ✅ Admin dashboard
- ✅ Role-based access control
- ✅ 16 categories (English + Malayalam)
- ✅ 25 Palakkad locations
- ✅ Database with all models
- ✅ NextAuth authentication
- ✅ Permission system

---

## Next Steps

### For Development

1. **Check the code structure**
   - `/app` - Next.js pages and API routes
   - `/lib` - Utilities (auth, permissions, database)
   - `/prisma` - Database schema and seed

2. **Explore the database**
   ```bash
   pnpm db:studio
   ```
   Opens Prisma Studio at `http://localhost:5555`

3. **View logs**
   ```bash
   pnpm dev
   # Watch console for errors
   ```

### For Production Deployment

1. **Read DEPLOYMENT.md** - Complete deployment guide
2. **Prepare server** - Ubuntu 20.04+, Node.js 20+, PostgreSQL 14+
3. **Set production .env** - Update DATABASE_URL, NEXTAUTH_URL, etc.
4. **Build & deploy** - `pnpm build` then PM2 start

### For Building Phase 2

Next phase is Article Management. Check `PHASE1_SUMMARY.md` for what's ready, then start building:

```bash
# Create article components
mkdir -p app/desk/articles
touch app/desk/articles/page.tsx
# ... build article list, create, edit pages
```

---

## Useful Commands

```bash
# Development
pnpm dev                # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server

# Database
pnpm db:migrate         # Create/apply migrations
pnpm db:seed            # Seed database
pnpm db:studio          # Open Prisma Studio GUI
pnpm db:reset           # Reset database (dev only)

# Linting
pnpm lint               # Run ESLint
```

---

## Troubleshooting

### "Database connection error"

```bash
# Verify DATABASE_URL in .env
echo $DATABASE_URL

# Test connection
psql "$DATABASE_URL" -c "SELECT 1"
```

### "Can't sign in"

```bash
# Check admin user exists
pnpm db:studio
# Go to User table, search for admin email

# If missing, re-seed
pnpm db:seed
```

### "Port 3000 already in use"

```bash
# Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev
```

### "TypeScript errors"

```bash
# Check types
pnpm tsc --noEmit

# Check ESLint
pnpm lint
```

---

## File Structure Overview

```
livepalakkad/
├── app/
│   ├── auth/               # Authentication pages
│   │   └── signin/
│   ├── api/auth/           # NextAuth API
│   ├── desk/               # Admin dashboard (protected)
│   └── layout.tsx          # Root layout
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── db.ts               # Prisma client
│   └── permissions.ts      # Permission helpers
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── public/
│   ├── logo/               # Logo files
│   └── uploads/            # User uploads
├── .env.example
├── .env                    # ← Create this, don't commit
├── package.json
├── README.md               # Full documentation
├── DEPLOYMENT.md           # Production guide
├── PHASE1_SUMMARY.md       # What was built
└── QUICKSTART.md           # This file
```

---

## Key Features Ready

### Authentication
- Email/password sign-in for admin/staff
- NextAuth.js with JWT sessions
- Protected admin panel at `/desk`

### Role-Based Access Control
- 5 built-in roles (Full Admin, Reporter, Sub-Editor, etc.)
- 19 granular permissions
- Custom Discord-style role creation
- Per-user permission assignments

### Database
- 25+ models fully designed
- 16 categories pre-seeded
- 25 Palakkad locations pre-seeded
- PostgreSQL with Prisma ORM
- Migration system ready

### Infrastructure
- Nginx reverse proxy config (for production)
- PM2 cluster mode config (for production)
- Environment-based configuration
- Development and production modes

---

## Next Phase: Article Management

Phase 2 will add:
- Article CRUD interface
- Rich text editor
- Image uploads
- Video embeds (YouTube, Facebook, Instagram)
- Publishing workflow
- Comments moderation
- SEO fields per article

---

## Documentation

- **README.md** - Comprehensive 700+ line guide
- **DEPLOYMENT.md** - Production deployment checklist
- **PHASE1_SUMMARY.md** - What was built in Phase 1
- **QUICKSTART.md** - This file

---

## Support

- Email: mailstudiocity@gmail.com
- Phone: 90745 00360
- Admin: srr6vv@gmail.com

---

**Happy coding! Ready to build amazing news platform for Palakkad.** 📰
