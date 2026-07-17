# LivePalakkad - Quick Start Guide

**Start here to get the application running in 5 minutes.**

---

## Prerequisites

- Node.js 20+ (check with `node --version`)
- pnpm (install with `npm install -g pnpm`)
- A modern web browser

---

## Step 1: Install Dependencies

```bash
cd /vercel/share/v0-project
pnpm install
```

**Time:** ~30 seconds

---

## Step 2: Create Environment File

```bash
cp .env.example .env.local
```

The `.env.local` file is now created with default values. No additional configuration needed for development.

---

## Step 3: Start Development Server

```bash
pnpm dev
```

The server will start on **http://localhost:3000** (or 3001 if 3000 is in use).

**Expected output:**
```
✓ Ready in 400ms
- Local:    http://localhost:3000
- Network:  http://100.64.xx.xx:3000
```

---

## Step 4: Visit the Application

### Public Site
- **Homepage:** http://localhost:3000
- **Sample Article:** http://localhost:3000/articles/civic-body-launches-monsoon-preparedness
- **Category:** http://localhost:3000/category/weather
- **Location:** http://localhost:3000/location/palakkad-town

### Admin Panel
- **Dashboard:** http://localhost:3000/desk
- **Sign In Email:** `srr6vv@gmail.com`
- **Default Password:** Check `.env.example` for ADMIN_PASSWORD (default: "LivePalakkad2024!")

---

## Step 5: Explore the Application

### Public Features
- Click the logo to go home
- Browse categories in the header (mobile: tap menu icon)
- Click any article card to read the full article
- Use social sharing buttons (WhatsApp, Facebook, Copy Link)
- Subscribe to newsletter in the sidebar

### Admin Features
- Go to /desk and sign in
- View dashboard with statistics
- Click "All Articles" to manage content
- Filter articles by status (draft, published, scheduled)
- Edit or delete articles

---

## What's Working

✅ Homepage with hero section and categories  
✅ Article detail pages with rich content  
✅ Category and location pages  
✅ Admin authentication and dashboard  
✅ Article management interface  
✅ Social sharing  
✅ Comments UI (backend coming)  
✅ Responsive mobile design  
✅ Dark/light theme structure  

---

## What's Mock Data

Currently using hardcoded articles. To use real data:

1. Create articles in the admin panel (Phase 4)
2. Articles will be stored in the database
3. Public pages will automatically load real data

---

## Common Issues

### Port Already in Use
If port 3000 is in use, the dev server will automatically use 3001.

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Admin Login Not Working
Verify `.env.local` has `ADMIN_EMAIL` and `ADMIN_PASSWORD` set.

### Images Not Loading
Ensure `/public/logo/` has the logo files. If missing, copy:
```bash
cp public/logo/livepalakkad-icon.png public/logo/livepalakkad-icon.png
```

---

## Directory Structure

```
app/              # Next.js pages and routes
├── page.tsx      # Homepage
├── articles/[slug]/page.tsx    # Article detail
├── category/[slug]/page.tsx    # Category pages
├── location/[slug]/page.tsx    # Location pages
└── desk/         # Admin panel
    ├── page.tsx  # Dashboard
    └── articles/ # Article management

components/       # Reusable React components
├── Header.tsx    # Navigation
├── Footer.tsx    # Footer
└── ArticleCard.tsx # Article card

lib/              # Utilities and configuration
├── auth.ts       # NextAuth setup
├── db.ts         # Database client
└── permissions.ts # Authorization

prisma/           # Database schema
├── schema.prisma # Data models
└── seed.mjs      # Sample data

public/           # Static files
├── logo/         # Logo files
└── images/       # Image assets
```

---

## Database

**Development:** SQLite (`dev.db` file created automatically)

**Production:** PostgreSQL (switch in `prisma.config.ts` and set `DATABASE_URL`)

---

## Building for Production

```bash
# Create optimized build
pnpm build

# Start production server
pnpm start
```

---

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel dashboard
3. Set environment variables
4. Deploy with one click

### Self-Hosted VPS
1. Set up Node.js, PostgreSQL, Nginx
2. Clone repository
3. Install dependencies: `pnpm install`
4. Build: `pnpm build`
5. Start with PM2: `pm2 start ecosystem.config.js`

---

## File You Edited Last

Check `BUILD_COMPLETE.md` for the full list of what was created.

---

## Need Help?

- **Email:** mailstudiocity@gmail.com
- **Phone:** 90745 00360
- **Documentation:** See README.md for comprehensive guide

---

## Next Steps

1. **Explore the code** - Start with `app/page.tsx` to understand structure
2. **Customize** - Update colors in Tailwind config, change logo in Header component
3. **Add content** - Use admin panel to create real articles
4. **Deploy** - Follow production setup when ready

---

**Happy building! 🚀**
