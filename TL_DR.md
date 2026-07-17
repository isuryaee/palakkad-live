# LivePalakkad - TL;DR

**Phase 1 Complete. Everything Below Works.**

---

## 30-Second Setup

```bash
pnpm install
cp .env.example .env
# Edit .env: Add DATABASE_URL
pnpm db:migrate
pnpm db:seed
pnpm dev
# Visit http://localhost:3000/auth/signin
```

---

## Sign In Credentials

```
Email: srr6vv@gmail.com
Password: (from ADMIN_PASSWORD in .env)
URL: http://localhost:3000/auth/signin
Dashboard: http://localhost:3000/desk
```

---

## What's Done (Phase 1)

✅ Database schema (25+ models)  
✅ Authentication (NextAuth.js + JWT)  
✅ Role-based access control (19 permissions)  
✅ Admin sign-in page  
✅ Admin dashboard  
✅ 16 categories (English + Malayalam)  
✅ 25 Palakkad locations  
✅ Production deployment config (Nginx + PM2)  
✅ Comprehensive documentation  

---

## What's NOT Done (Coming Soon)

Article CRUD, Public pages, Live updates, Analytics, etc.

---

## Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database design |
| `lib/auth.ts` | Authentication |
| `lib/permissions.ts` | Permission checks |
| `app/auth/signin/page.tsx` | Sign-in page |
| `app/desk/page.tsx` | Admin dashboard |

---

## Key Commands

```bash
pnpm dev                # Start dev server
pnpm db:migrate         # Create/apply migrations
pnpm db:seed            # Seed database
pnpm db:studio          # Open database GUI
pnpm build              # Build for production
pnpm start              # Start production server
```

---

## Documentation

| Document | Purpose | Time |
|----------|---------|------|
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup | 5 min |
| [README.md](./README.md) | Full reference | 20 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production guide | 15 min |
| [PHASE1_SUMMARY.md](./PHASE1_SUMMARY.md) | What was built | 10 min |
| [PROJECT_COMPLETION_SUMMARY.md](./PROJECT_COMPLETION_SUMMARY.md) | Overview | 10 min |
| [DOCS_INDEX.md](./DOCS_INDEX.md) | Documentation map | 5 min |

---

## Production Deployment

```bash
# On production server
cd /var/www/livepalakkad
git clone <repo>
pnpm install
cp .env.example .env
# Edit .env with production values
pnpm db:migrate:prod
pnpm build
pm2 start ecosystem.config.js --env production
sudo systemctl restart nginx
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full checklist.

---

## Architecture

```
Nginx (SSL) → PM2 Cluster → Next.js App → PostgreSQL
```

- **Nginx**: Reverse proxy, SSL termination, caching, compression
- **PM2**: Process management, auto-restart, clustering
- **Next.js**: Frontend + API routes
- **PostgreSQL**: Database with Prisma ORM

---

## Permissions (19 Total)

```
can:create:articles
can:publish:articles
can:edit:own:articles
can:edit:all:articles
can:delete:articles
can:manage:comments
can:manage:categories
can:manage:locations
can:manage:tags
can:manage:advertisements
can:manage:users
can:send:notifications
can:access:analytics
can:manage:seo
can:manage:media
can:manage:live-updates
can:manage:reporters
can:scope:location
can:scope:category
```

---

## Roles (5 Built-in)

1. **Full Admin** - All permissions (srr6vv@gmail.com)
2. **Reporter** - Create articles, manage media
3. **Sub-Editor** - Create, edit, publish articles
4. **Category Editor** - Limited to one category
5. **Location Correspondent** - Limited to one location

---

## Database Models (25+)

**Auth**: User, Role, Permission, Session, Account  
**Content**: Article, Category, Location, Tag, Comment  
**Media**: ArticleImage, ArticleVideo, MediaLibrary  
**Live**: LiveUpdateThread, LiveUpdateEntry  
**Ads**: Advertisement  
**Polls**: Poll, PollOption, PollVote  
**Tourism**: PlaceToVisit, TravelGuide  
**Other**: NewsletterSubscriber, PushNotification, PageView, SiteSetting  

---

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/livepalakkad
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=srr6vv@gmail.com
ADMIN_PASSWORD=change-me-123
NEXT_PUBLIC_ADMIN_PATH=/desk
NODE_ENV=development
```

---

## Common Issues

### "Database connection error"
```bash
# Check DATABASE_URL in .env
psql "$DATABASE_URL" -c "SELECT 1"
```

### "Can't sign in"
```bash
# Re-seed database
pnpm db:seed
```

### "Port 3000 in use"
```bash
# Kill process or use different port
PORT=3001 pnpm dev
```

### "TypeScript errors"
```bash
pnpm tsc --noEmit
```

---

## Next Phase (Phase 2)

Article CRUD interface:
- Create/edit articles
- Rich text editor
- Image upload
- Video embeds
- Publish/schedule

---

## Support

- Email: mailstudiocity@gmail.com
- Phone: 90745 00360
- Admin: srr6vv@gmail.com

---

## Success Checklist

- [x] Database migrated
- [x] Database seeded
- [x] Admin user created
- [x] Sign-in page works
- [x] Admin dashboard loads
- [x] 16 categories in DB
- [x] 25 locations in DB
- [x] All permissions in DB
- [x] NextAuth working
- [x] Nginx config ready
- [x] PM2 config ready
- [x] Documentation complete

---

## Quick Links

- **Sign In**: http://localhost:3000/auth/signin
- **Admin Dashboard**: http://localhost:3000/desk
- **Prisma Studio**: `pnpm db:studio`
- **Docs Index**: [DOCS_INDEX.md](./DOCS_INDEX.md)

---

**Status: Phase 1 Complete ✅**  
**Ready for: Phase 2 - Article Management**  
**Production Ready: Yes**

---
