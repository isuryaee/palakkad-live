const { PrismaClient } = require("@prisma/client");
const { adapter } = require("@prisma/adapter-sqlite");
const bcryptjs = require("bcryptjs");
const Database = require("better-sqlite3");

const db = new Database(process.env.DATABASE_URL?.replace("file:", "") || "dev.db");
const prisma = new PrismaClient({
  adapter: adapter(db),
});

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // ========================================================================
    // 1. CREATE PERMISSIONS
    // ========================================================================
    console.log("📋 Creating permissions...");

    const permissions = [
      { name: "can:create:articles", description: "Create new articles" },
      { name: "can:publish:articles", description: "Publish articles (vs. draft-only)" },
      { name: "can:edit:own:articles", description: "Edit own articles" },
      { name: "can:edit:all:articles", description: "Edit any article" },
      { name: "can:delete:articles", description: "Delete articles" },
      { name: "can:manage:comments", description: "Moderate comments" },
      { name: "can:manage:categories", description: "Manage categories" },
      { name: "can:manage:locations", description: "Manage locations" },
      { name: "can:manage:tags", description: "Manage tags" },
      { name: "can:manage:advertisements", description: "Manage advertisements" },
      { name: "can:manage:users", description: "Manage users and roles" },
      { name: "can:send:notifications", description: "Send push notifications" },
      { name: "can:access:analytics", description: "Access analytics" },
      { name: "can:manage:seo", description: "Manage SEO settings" },
      { name: "can:manage:media", description: "Manage media library" },
      { name: "can:manage:live-updates", description: "Manage live updates" },
      { name: "can:manage:reporters", description: "Manage reporter profiles" },
      { name: "can:scope:location", description: "Scoped to specific location only" },
      { name: "can:scope:category", description: "Scoped to specific category only" },
      { name: "admin:full:access", description: "Full admin access (all permissions)" },
    ];

    const permissionMap: Record<string, string> = {};
    for (const perm of permissions) {
      const created = await prisma.permission.upsert({
        where: { name: perm.name },
        update: {},
        create: { name: perm.name, description: perm.description },
      });
      permissionMap[perm.name] = created.id;
    }
    console.log(`✅ Created ${permissions.length} permissions`);

    // ========================================================================
    // 2. CREATE ROLES WITH PERMISSIONS
    // ========================================================================
    console.log("👥 Creating roles...");

    // Full Admin Role
    const fullAdminRole = await prisma.role.upsert({
      where: { name: "Full Admin" },
      update: {},
      create: {
        name: "Full Admin",
        description: "Complete access to all features",
        isSystem: true,
      },
    });

    // Assign all permissions to Full Admin
    for (const perm of permissions) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: fullAdminRole.id, permissionId: permissionMap[perm.name] } },
        update: {},
        create: { roleId: fullAdminRole.id, permissionId: permissionMap[perm.name] },
      });
    }

    // Reporter Role
    const reporterRole = await prisma.role.upsert({
      where: { name: "Reporter" },
      update: {},
      create: {
        name: "Reporter",
        description: "Can create and submit articles for approval",
        isSystem: true,
      },
    });

    const reporterPerms = [
      "can:create:articles",
      "can:edit:own:articles",
      "can:manage:media",
    ];
    for (const permName of reporterPerms) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: reporterRole.id, permissionId: permissionMap[permName] } },
        update: {},
        create: { roleId: reporterRole.id, permissionId: permissionMap[permName] },
      });
    }

    // Sub-Editor Role
    const subEditorRole = await prisma.role.upsert({
      where: { name: "Sub-Editor" },
      update: {},
      create: {
        name: "Sub-Editor",
        description: "Can create, edit, and publish articles",
        isSystem: true,
      },
    });

    const subEditorPerms = [
      "can:create:articles",
      "can:publish:articles",
      "can:edit:all:articles",
      "can:manage:media",
      "can:manage:comments",
    ];
    for (const permName of subEditorPerms) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: subEditorRole.id, permissionId: permissionMap[permName] } },
        update: {},
        create: { roleId: subEditorRole.id, permissionId: permissionMap[permName] },
      });
    }

    console.log("✅ Created 3 default roles");

    // ========================================================================
    // 3. CREATE DEFAULT ADMIN USER
    // ========================================================================
    console.log("👤 Creating default admin user...");
    const adminEmail = process.env.ADMIN_EMAIL || "srr6vv@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "LivePalakkad2024!";

    const hashedPassword = await bcryptjs.hash(adminPassword, 12);
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        name: "Admin",
        password: hashedPassword,
        emailVerified: new Date(),
      },
    });

    // Assign Full Admin role to admin user
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: fullAdminRole.id } },
      update: {},
      create: { userId: adminUser.id, roleId: fullAdminRole.id },
    });

    console.log(`✅ Admin user created: ${adminEmail}`);

    // ========================================================================
    // 4. CREATE CATEGORIES (16)
    // ========================================================================
    console.log("📰 Creating categories...");

    const categories = [
      { name: "Breaking News", nameMal: "വേഗതയുള്ള വാര്‍ത്തകൾ", slug: "breaking-news", icon: "🔥", order: 0 },
      { name: "Politics", nameMal: "രാഷ്ട്രീയം", slug: "politics", icon: "🏛", order: 1 },
      { name: "Crime", nameMal: "കുറ്റകൃത്യം", slug: "crime", icon: "🚔", order: 2 },
      { name: "Accidents", nameMal: "അപകടങ്ങൾ", slug: "accidents", icon: "🚑", order: 3 },
      { name: "Weather", nameMal: "കാലാവസ്ഥ", slug: "weather", icon: "🌧", order: 4 },
      { name: "Agriculture", nameMal: "കൃഷി", slug: "agriculture", icon: "🚜", order: 5 },
      { name: "Education", nameMal: "വിദ്യാഭ്യാസം", slug: "education", icon: "🎓", order: 6 },
      { name: "Jobs", nameMal: "ജോലി", slug: "jobs", icon: "💼", order: 7 },
      { name: "Health", nameMal: "ആരോഗ്യം", slug: "health", icon: "🏥", order: 8 },
      { name: "Religion", nameMal: "മതം", slug: "religion", icon: "🕌", order: 9 },
      { name: "Festivals", nameMal: "ഉത്സവങ്ങൾ", slug: "festivals", icon: "🎉", order: 10 },
      { name: "Sports", nameMal: "കായികം", slug: "sports", icon: "⚽", order: 11 },
      { name: "Entertainment", nameMal: "വിനോദം", slug: "entertainment", icon: "🎭", order: 12 },
      { name: "Business", nameMal: "ബിസിനസ്സ്", slug: "business", icon: "💰", order: 13 },
      { name: "Transport", nameMal: "ഗതാഗതം", slug: "transport", icon: "🚍", order: 14 },
      { name: "Environment", nameMal: "പരിസ്ഥിതി", slug: "environment", icon: "🌱", order: 15 },
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }

    console.log(`✅ Created 16 categories`);

    // ========================================================================
    // 5. CREATE LOCATIONS (25 Palakkad towns)
    // ========================================================================
    console.log("📍 Creating locations...");

    const locations = [
      { name: "Palakkad Town", nameMal: "പാലക്കാട് നഗരം", slug: "palakkad-town", order: 0 },
      { name: "Ottapalam", nameMal: "ഓട്ടപ്പാലം", slug: "ottapalam", order: 1 },
      { name: "Pattambi", nameMal: "പട്ടംബി", slug: "pattambi", order: 2 },
      { name: "Mannarkkad", nameMal: "മണ്ണാർക്കാട്", slug: "mannarkkad", order: 3 },
      { name: "Chittur", nameMal: "ചിത്തൂർ", slug: "chittur", order: 4 },
      { name: "Alathur", nameMal: "അളത്തൂർ", slug: "alathur", order: 5 },
      { name: "Shoranur", nameMal: "ശോരണൂർ", slug: "shoranur", order: 6 },
      { name: "Cherpulassery", nameMal: "ചെരുപുലാസേരി", slug: "cherpulassery", order: 7 },
      { name: "Nenmara", nameMal: "നെന്മാര", slug: "nenmara", order: 8 },
      { name: "Koduvayur", nameMal: "കോടുവയൂർ", slug: "koduvayur", order: 9 },
      { name: "Kongad", nameMal: "കോങ്കാട്", slug: "kongad", order: 10 },
      { name: "Sreekrishnapuram", nameMal: "ശ്രീകൃഷ്ണപുരം", slug: "sreekrishnapuram", order: 11 },
      { name: "Kollengode", nameMal: "കോല്ലെങ്കോട്", slug: "kollengode", order: 12 },
      { name: "Vadakkencherry", nameMal: "വടക്കെഞ്ചേരി", slug: "vadakkencherry", order: 13 },
      { name: "Mundur", nameMal: "മുണ്ടൂർ", slug: "mundur", order: 14 },
      { name: "Kuzhalmannam", nameMal: "കുഴൽമണ്ണം", slug: "kuzhalmannam", order: 15 },
      { name: "Malampuzha", nameMal: "മലമ്പുഴ", slug: "malampuzha", order: 16 },
      { name: "Parli", nameMal: "പരളി", slug: "parli", order: 17 },
      { name: "Elappully", nameMal: "എലാപ്പുള്ളി", slug: "elappully", order: 18 },
      { name: "Vaniyamkulam", nameMal: "വനിയാമ്കുളം", slug: "vaniyamkulam", order: 19 },
      { name: "Thrithala", nameMal: "തൃത്തല", slug: "thrithala", order: 20 },
      { name: "Pudussery", nameMal: "പുതുശ്ശേരി", slug: "pudussery", order: 21 },
      { name: "Agali", nameMal: "അഗലി", slug: "agali", order: 22 },
      { name: "Sholayur", nameMal: "ശോലയൂർ", slug: "sholayur", order: 23 },
      { name: "Kannadi", nameMal: "കണ്ണാടി", slug: "kannadi", order: 24 },
    ];

    for (const loc of locations) {
      await prisma.location.upsert({
        where: { slug: loc.slug },
        update: {},
        create: loc,
      });
    }

    console.log(`✅ Created 25 locations`);

    // ========================================================================
    // 6. CREATE SITE SETTINGS
    // ========================================================================
    console.log("⚙️  Creating site settings...");

    const settings = [
      { key: "site_name", value: "LivePalakkad" },
      { key: "site_tagline", value: "Palakkad First" },
      { key: "site_phone", value: "90745 00360" },
      { key: "site_email", value: "mailstudiocity@gmail.com" },
      { key: "facebook_url", value: "https://www.facebook.com/livepalakkadnews/" },
      { key: "instagram_handle", value: "@livepalakkad" },
      { key: "timezone", value: "Asia/Kolkata" },
      { key: "default_language", value: "ml" },
      { key: "admin_path", value: "/desk" },
    ];

    for (const setting of settings) {
      await prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      });
    }

    console.log("✅ Site settings created");

    // ========================================================================
    // 7. CREATE DEFAULT REPORTER
    // ========================================================================
    console.log("👨‍💼 Creating default reporter...");

    await prisma.reporter.upsert({
      where: { id: "reporter-lp" },
      update: {},
      create: {
        id: "reporter-lp",
        name: "LivePalakkad News Team",
        bio: "Delivering hyperlocal news from Palakkad district, Kerala. Breaking stories. Trusted reporting.",
        order: 0,
      },
    });

    console.log("✅ Default reporter created");

    console.log("\n✨ 🌱 DATABASE SEEDED SUCCESSFULLY! 🌱");
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔐 DEFAULT ADMIN CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Email: ${adminEmail}
  Password: ${adminPassword}
  
  ⚠️  CHANGE THIS PASSWORD IMMEDIATELY!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Data Created:
   ✓ 20 Permissions
   ✓ 3 Default Roles (Full Admin, Reporter, Sub-Editor)
   ✓ 16 Categories with Malayalam names
   ✓ 25 Palakkad Locations
   ✓ Site Settings
   ✓ Default Reporter Profile

🚀 Next Steps:
   1. pnpm dev          (start dev server)
   2. Open http://localhost:3000/desk
   3. Log in with admin credentials above
   4. Start creating articles!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
