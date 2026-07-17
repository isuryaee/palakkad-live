# LivePalakkad Deployment Guide

Complete checklist for deploying LivePalakkad to production on livepalakkad.com.

---

## Pre-Deployment Checklist

### 1. Environment & Code
- [ ] All code committed to git
- [ ] `.env` file created with production values
- [ ] `NEXTAUTH_SECRET` generated: `openssl rand -base64 32`
- [ ] `DATABASE_URL` points to production PostgreSQL
- [ ] `ADMIN_PASSWORD` set to a strong password
- [ ] No sensitive data in git (check `.gitignore`)
- [ ] TypeScript builds without errors: `pnpm build`

### 2. Database
- [ ] PostgreSQL database created on production server
- [ ] Database user created with appropriate permissions
- [ ] Test connection: `psql "$DATABASE_URL"`
- [ ] Migrations prepared: `pnpm db:migrate:prod` (tested locally first)

### 3. SSL/TLS Certificate
- [ ] Domain `livepalakkad.com` DNS pointing to server IP
- [ ] Let's Encrypt certificate obtained: `certbot certonly --standalone -d livepalakkad.com -d www.livepalakkad.com`
- [ ] Certificate renewal auto-setup: `certbot renew --dry-run`

### 4. Server Infrastructure
- [ ] VPS provisioned (Ubuntu 20.04+, Node.js 20+, PostgreSQL 14+)
- [ ] Firewall configured (allow 80, 443, restrict 3000 to localhost)
- [ ] SSH key-based authentication enabled (no root password login)
- [ ] `/var/www` directory created with proper ownership
- [ ] Nginx installed and tested

### 5. Nginx Configuration
- [ ] `/etc/nginx/sites-available/livepalakkad` copied and edited
- [ ] SSL certificate paths updated in Nginx config
- [ ] Project root paths updated in Nginx config
- [ ] Config tested: `sudo nginx -t` (no errors)
- [ ] Site enabled: `sudo ln -s /etc/nginx/sites-available/livepalakkad /etc/nginx/sites-enabled/`

### 6. PM2 Configuration
- [ ] PM2 installed globally: `npm install -g pm2`
- [ ] `ecosystem.config.js` reviewed and updated if needed
- [ ] `logs/` directory created and writable

---

## Deployment Steps

### Step 1: SSH into Production Server

```bash
ssh deploy@your-vps-ip
cd /var/www/livepalakkad
```

### Step 2: Pull Latest Code

```bash
git pull origin main
# or if first time:
git clone <repo-url> /var/www/livepalakkad
```

### Step 3: Install Dependencies

```bash
pnpm install --prod
# (use --prod to skip dev dependencies)
```

### Step 4: Configure Environment

```bash
# Copy .env.example and edit with production values
cp .env.example .env
nano .env

# Critical values:
# DATABASE_URL="postgresql://user:password@localhost:5432/livepalakkad"
# NEXTAUTH_SECRET="<generated-secret>"
# NEXTAUTH_URL="https://livepalakkad.com"
# NODE_ENV="production"
```

### Step 5: Database Initialization

```bash
# First deployment only:
pnpm db:migrate:prod   # Apply all migrations
pnpm db:seed           # Seed categories, locations, admin user

# Subsequent deployments (if schema changed):
pnpm db:migrate:prod   # Apply new migrations only
```

### Step 6: Build Application

```bash
pnpm build
```

If build fails, check:
- TypeScript errors: `pnpm tsc --noEmit`
- Missing environment variables
- Database connectivity

### Step 7: Start with PM2

```bash
# Start the application
sudo pm2 start ecosystem.config.js --env production --user www-data

# Save PM2 state (so it restarts on server reboot)
sudo pm2 save

# Enable PM2 startup hook
sudo pm2 startup systemd -u www-data --hp /var/www

# Verify it's running
pm2 list
pm2 logs livepalakkad
```

### Step 8: Restart Nginx

```bash
sudo nginx -t  # Verify config
sudo systemctl restart nginx
```

### Step 9: Verify Deployment

```bash
# Check that the app is running
pm2 list

# Check Nginx is proxying correctly
curl -I http://localhost:3000  # Direct to Node.js
curl -I https://livepalakkad.com  # Through Nginx

# Visit in browser
https://livepalakkad.com
https://livepalakkad.com/auth/signin  # Should load signin page
https://livepalakkad.com/desk  # Should redirect to signin if not logged in
```

### Step 10: Monitor Logs

```bash
# Real-time logs
pm2 logs livepalakkad

# View last 100 lines of error log
pm2 logs livepalakkad --err

# View Nginx access/error logs
tail -f /var/log/nginx/livepalakkad_access.log
tail -f /var/log/nginx/livepalakkad_error.log
```

---

## Post-Deployment

### Admin Access

1. Visit `https://livepalakkad.com/auth/signin`
2. Log in with:
   - Email: (from `ADMIN_EMAIL` in .env)
   - Password: (from `ADMIN_PASSWORD` in .env)
3. You're redirected to `/desk` admin dashboard
4. **Change the password immediately** in the database or user profile

### Enable Backup & Monitoring

```bash
# Set up daily database backup
# Add to crontab:
# 0 2 * * * /path/to/backup-db.sh

# Enable PM2 monitoring
pm2 web  # Starts web dashboard at localhost:9615

# Set up uptime monitoring (Uptime Robot, Healthchecks.io, etc.)
```

### Performance Optimization

```bash
# Enable gzip compression in Nginx (already in config)
# Already enabled in ecosystem.config.js

# Monitor performance
pm2 monit  # CPU/memory
pm2 logs livepalakkad  # Application errors
```

---

## Update & Maintenance

### Apply Code Updates

```bash
# On production server
cd /var/www/livepalakkad
git pull origin main
pnpm install
pnpm build

# If database schema changed:
pnpm db:migrate:prod

# Restart app
pm2 restart livepalakkad
```

### Database Backup

```bash
# Manual backup
pg_dump "$DATABASE_URL" > livepalakkad_backup_$(date +%Y%m%d_%H%M%S).sql

# Restore (if needed)
psql "$DATABASE_URL" < livepalakkad_backup_YYYYMMDD_HHMMSS.sql
```

### SSL Certificate Renewal

Let's Encrypt certificates expire after 90 days. Auto-renewal:

```bash
# Certbot auto-renewal runs via systemd timer
# To check renewal status:
sudo certbot renew --dry-run

# Manual renewal if needed:
sudo certbot renew --force-renewal
sudo systemctl restart nginx
```

---

## Troubleshooting Production Issues

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs livepalakkad

# Verify environment variables
echo $DATABASE_URL
echo $NEXTAUTH_SECRET

# Try starting manually to see errors
NODE_ENV=production pnpm start

# Check if port 3000 is in use
sudo lsof -i :3000
```

### Database Connection Error

```bash
# Test PostgreSQL connection
psql "$DATABASE_URL" -c "SELECT 1"

# Verify DATABASE_URL format:
# postgresql://user:password@host:port/dbname

# Check PostgreSQL is running
sudo systemctl status postgresql

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql.log
```

### Nginx 502 Bad Gateway

```bash
# Check if Node.js app is running
pm2 list
pm2 logs livepalakkad

# Check Nginx can reach localhost:3000
sudo curl localhost:3000

# View Nginx error log
sudo tail -f /var/log/nginx/livepalakkad_error.log

# Restart Nginx
sudo systemctl restart nginx
```

### High Memory Usage

```bash
# Check PM2 resource usage
pm2 monit

# PM2 can auto-restart at memory limit
# Already configured in ecosystem.config.js: max_memory_restart: "500M"

# Check for memory leaks in logs
pm2 logs livepalakkad | grep -i "memory"
```

### Site Returning 404

```bash
# Check Nginx config
sudo nginx -t

# Verify app is responding
curl -I http://localhost:3000

# Check DNS is resolving
nslookup livepalakkad.com

# Restart everything
sudo systemctl restart nginx
pm2 restart livepalakkad
```

---

## Scaling Considerations

### When You Need More Performance

**Option 1: Vertical Scaling**
- Increase server resources (CPU, RAM, storage)
- Requires no code changes
- PM2 already configured for cluster mode

**Option 2: Horizontal Scaling**
- Multiple servers behind load balancer
- Update PM2 config for each server instance
- Use managed database (Neon, RDS, etc.)
- Add Redis for session sharing

**Option 3: CDN**
- Cloudflare, Bunny CDN, or AWS CloudFront
- Serves static assets from edge locations
- Reduces server load

### Database Optimization

As traffic grows:

```bash
# Add indexes to frequently queried fields (already in schema)
# Check slow query log
# Consider read replicas
# Use connection pooling (Prisma handles this)
```

### Caching Strategy

Already implemented in Nginx config:
- Static assets: 365 days
- Public pages: 5 minutes (ISR)
- API/admin: No cache

Consider adding:
- Redis for session/data cache
- Cloudflare Workers for edge caching
- Next.js ISR (Incremental Static Regeneration)

---

## Security Hardening

### Before Going Live

- [ ] NEXTAUTH_SECRET is strong (32+ bytes)
- [ ] All user inputs validated server-side
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Security headers set (Nginx config includes them)
- [ ] Rate limiting configured on admin login
- [ ] CORS configured appropriately
- [ ] SQL injection prevented (using Prisma)
- [ ] XSS protection enabled
- [ ] Admin panel not linked in public site
- [ ] Regular backups scheduled

### Ongoing

- [ ] Monitor for security updates (Node.js, dependencies)
- [ ] Review access logs for suspicious activity
- [ ] Enable 2FA on admin accounts (Phase 4)
- [ ] Update SSL certificate before expiry
- [ ] Keep dependencies updated (`pnpm audit`, `pnpm update`)

---

## Useful Commands

```bash
# PM2
pm2 list
pm2 logs livepalakkad
pm2 logs livepalakkad --err  # Just errors
pm2 monit
pm2 restart livepalakkad
pm2 stop livepalakkad
pm2 start livepalakkad
pm2 delete livepalakkad

# Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl status nginx

# PostgreSQL
psql -U postgres -d livepalakkad
\dt  # List tables
\du  # List users
SELECT * FROM "Article" LIMIT 5;

# Database backups
pg_dump "$DATABASE_URL" > backup.sql
psql "$DATABASE_URL" < backup.sql

# System monitoring
top  # CPU/memory
df -h  # Disk space
free -h  # RAM
ps aux | grep node  # Node.js processes
```

---

## Support & Escalation

### Get Help

1. **Check logs first**
   ```bash
   pm2 logs livepalakkad
   sudo tail -f /var/log/nginx/livepalakkad_error.log
   ```

2. **Contact admin**
   - Email: mailstudiocity@gmail.com
   - Phone: 90745 00360

3. **Emergency (site down)**
   - SSH in and check `pm2 list`
   - Try `pm2 restart all`
   - Check database connectivity

---

## Rollback Plan

If deployment breaks production:

```bash
# 1. Stop the broken app
pm2 stop livepalakkad

# 2. Revert code to last known good
git checkout main  # or specific commit
git pull

# 3. Rebuild
pnpm build

# 4. If database schema changed, revert migrations
# Only if absolutely necessary - back up first!
# pnpm db:migrate:prod  (runs migrations forward)

# 5. Restart
pm2 restart livepalakkad

# 6. Verify
pm2 logs livepalakkad
curl https://livepalakkad.com/auth/signin
```

---

## Success Criteria

Your deployment is successful when:

- [ ] `https://livepalakkad.com` loads (redirects from HTTP)
- [ ] `/auth/signin` page loads and accepts credentials
- [ ] Admin can log in and access `/desk` dashboard
- [ ] No errors in `pm2 logs livepalakkad`
- [ ] No errors in Nginx logs
- [ ] Database connection working
- [ ] SSL certificate is valid (green lock in browser)
- [ ] Performance is acceptable (< 3s page load)

---

## Next Steps

Once deployed:

1. **Verify admin access works** - log in and change password
2. **Start Phase 2** - build article management interface
3. **Set up monitoring** - uptime alerts, error tracking
4. **Plan marketing** - social media, partnerships
5. **Gather feedback** - from reporters and editors
