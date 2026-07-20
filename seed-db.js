const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.section.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user/author
  const user = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@livepalakkad.com',
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });

  // Create categories
  const politics = await prisma.category.create({
    data: {
      name: 'Politics',
      nameMal: 'രാഷ്ട്രീയം',
      slug: 'politics',
      icon: 'politics',
      description: 'Political news and developments in Palakkad',
      descriptionMal: 'പാലക്കാടിലെ രാഷ്ട്രീയ വാർത്തകൾ',
      order: 1,
    },
  });

  const crime = await prisma.category.create({
    data: {
      name: 'Crime',
      nameMal: 'കുറ്റകൃത്യം',
      slug: 'crime',
      icon: 'crime',
      description: 'Crime reports and law enforcement updates',
      descriptionMal: 'കുറ്റകൃത്യ വിവരണങ്ങൾ',
      order: 2,
    },
  });

  const weather = await prisma.category.create({
    data: {
      name: 'Weather',
      nameMal: 'കാലാവസ്ഥ',
      slug: 'weather',
      icon: 'weather',
      description: 'Weather forecasts and alerts for Palakkad',
      descriptionMal: 'കാലാവസ്ഥ പ്രവചനം',
      order: 3,
    },
  });

  const sports = await prisma.category.create({
    data: {
      name: 'Sports',
      nameMal: 'കായികം',
      slug: 'sports',
      icon: 'sports',
      description: 'Sports news and events',
      descriptionMal: 'കായികവാർത്തകൾ',
      order: 4,
    },
  });

  const education = await prisma.category.create({
    data: {
      name: 'Education',
      nameMal: 'വിദ്യാഭ്യാസം',
      slug: 'education',
      icon: 'education',
      description: 'Education news and updates',
      descriptionMal: 'വിദ്യാഭ്യാസ വിവരണങ്ങൾ',
      order: 5,
    },
  });

  const breaking = await prisma.category.create({
    data: {
      name: 'Breaking',
      nameMal: 'അടിയന്തരം',
      slug: 'breaking',
      icon: 'breaking',
      description: 'Latest breaking news and urgent updates',
      descriptionMal: 'അടിയന്തര വാർത്തകൾ',
      order: 0,
    },
  });

  // Create articles for Weather category
  await prisma.article.create({
    data: {
      title: 'Yellow Alert: Heavy Rains Expected This Week',
      titleMal: 'മഞ്ഞ മുന്നറിപ്പ്: ഈ വാരം കനത്ത മഴ നിലനില്കും',
      slug: 'yellow-alert-heavy-rains',
      excerpt: 'IMD issues warning for potential flooding. Residents advised to stay alert.',
      excerptMal: 'ദുരന്തയോഗ്യ പ്രതിഭാസങ്ങളുടെ സാധ്യത',
      content: 'The India Meteorological Department has issued a yellow alert for Palakkad district due to the possibility of heavy rainfall.',
      contentMal: 'ഇന്ത്യ കാലാവസ്ഥ വകുപ്പ് പാലക്കാട് ജില്ലയ്ക്ക് മഞ്ഞ മുന്നറിപ്പ് പുറപ്പെടുവിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&h=400&fit=crop',
      categoryId: weather.id,
      published: true,
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      authorId: user.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Civic Body Launches Monsoon Preparedness Drive',
      titleMal: 'ദേശീയ സ്ഥാപനം പ്രതിരോധ പദ്ധതി ആരംഭിച്ചു',
      slug: 'monsoon-preparedness',
      excerpt: 'Municipal corporation takes proactive measures.',
      excerptMal: 'മൂന്നോണ്ണി സീസണ്ണിനു പ്രസ്തുതം',
      content: 'The Palakkad Municipal Corporation has launched monsoon preparedness.',
      contentMal: 'പാലക്കാട് നഗരസഭ ദഫ്തരം ഒരു സകലാ്യ പദ്ധതി ആരംഭിച്ചു.',
      featuredImage: 'https://images.unsplash.com/photo-1601912348674-6d5a3af0f6a6?w=800&h=400&fit=crop',
      categoryId: weather.id,
      published: true,
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      authorId: user.id,
    },
  });

  // Create articles for Education category
  await prisma.article.create({
    data: {
      title: 'New Engineering College Gets NBA Accreditation',
      titleMal: 'എഞ്ചിനീയറിങ് കോളേജ് എൻബിഎ അനുമതി ലഭിച്ചു',
      slug: 'engineering-college-accreditation',
      excerpt: 'Institution becomes the second in the district.',
      excerptMal: 'രണ്ടാമത്തെ സ്ഥാപനം',
      content: 'The engineering college has successfully achieved NBA accreditation.',
      contentMal: 'കോളേജ് യശസ്വിയായി അനുമതി ലഭിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
      categoryId: education.id,
      published: true,
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      authorId: user.id,
    },
  });

  // Create articles for Politics category
  await prisma.article.create({
    data: {
      title: 'Collector Directs Swift Action on Pothole Repairs',
      titleMal: 'കളേക്ടർ പെരുതരം നിരുത്സാഹം നിരുത്സാഹിച്ചു',
      slug: 'collector-pothole-repairs',
      excerpt: 'District collector orders immediate repairs.',
      excerptMal: 'നിവാസികൾ പരാതി നൽകിയതിനെത്തുടർന്ന്',
      content: 'District Collector has ordered immediate action on repairs.',
      contentMal: 'കളേക്ടർ നിരുത്സാഹം സമ്മതിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop',
      categoryId: politics.id,
      published: true,
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      authorId: user.id,
    },
  });

  // Create articles for Breaking category
  await prisma.article.create({
    data: {
      title: 'Major Infrastructure Development Project Approved',
      titleMal: 'അടിസ്ഥാന കെട്ടിട പദ്ധതി അനുമോദിതമായിരിക്കുന്നു',
      slug: 'infrastructure-project-approved',
      excerpt: 'Government approves major infrastructure development.',
      excerptMal: 'സർക്കാർ അനുമതി നൽകിയിരിക്കുന്നു',
      content: 'Major infrastructure development project approved for Palakkad district.',
      contentMal: 'പാലക്കാട് ജില്ലയ്ക്കായി ഒരു വലിയ അടിസ്ഥാന പദ്ധതി അനുമോദിതമായിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop',
      categoryId: breaking.id,
      published: true,
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      authorId: user.id,
      isBreaking: true,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
