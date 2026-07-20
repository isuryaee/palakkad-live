import { prisma } from '../lib/db'

async function main() {
  // Clear existing data
  await prisma.article.deleteMany()
  await prisma.category.deleteMany()
  await prisma.section.deleteMany()

  // Create categories
  const politics = await prisma.category.create({
    data: {
      name: 'Politics',
      nameMal: 'രാഷ്ട്രീയം',
      slug: 'politics',
      icon: '🏛️',
      description: 'Political news and developments in Palakkad',
      descriptionMal: 'പാലക്കാടിലെ രാഷ്ട്രീയ വാർത്തകൾ',
      order: 1,
    },
  })

  const crime = await prisma.category.create({
    data: {
      name: 'Crime',
      nameMal: 'കുറ്റകൃത്യം',
      slug: 'crime',
      icon: '🚨',
      description: 'Crime reports and law enforcement updates',
      descriptionMal: 'കുറ്റകൃത്യ വിവരണങ്ങൾ',
      order: 2,
    },
  })

  const weather = await prisma.category.create({
    data: {
      name: 'Weather',
      nameMal: 'കാലാവസ്ഥ',
      slug: 'weather',
      icon: '🌤️',
      description: 'Weather forecasts and alerts for Palakkad',
      descriptionMal: 'കാലാവസ്ഥ പ്രവചനം',
      order: 3,
    },
  })

  const sports = await prisma.category.create({
    data: {
      name: 'Sports',
      nameMal: 'കായികം',
      slug: 'sports',
      icon: '⚽',
      description: 'Sports news and events',
      descriptionMal: 'കായികവാർത്തകൾ',
      order: 4,
    },
  })

  const education = await prisma.category.create({
    data: {
      name: 'Education',
      nameMal: 'വിദ്യാഭ്യാസം',
      slug: 'education',
      icon: '📚',
      description: 'Education news and updates',
      descriptionMal: 'വിദ്യാഭ്യാസ വിവരണങ്ങൾ',
      order: 5,
    },
  })

  const breaking = await prisma.category.create({
    data: {
      name: 'Breaking',
      nameMal: 'അടിയന്തരം',
      slug: 'breaking',
      icon: '🔴',
      description: 'Latest breaking news and urgent updates',
      descriptionMal: 'അടിയന്തര വാർത്തകൾ',
      order: 0,
    },
  })

  // Create articles for Weather category
  await prisma.article.create({
    data: {
      title: 'Yellow Alert: Heavy Rains Expected This Week',
      titleMal: 'മഞ്ഞ മുന്നറിപ്പ്: ഈ വാരം കനത്ത മഴ നിലനില്കും',
      slug: 'yellow-alert-heavy-rains',
      excerpt: 'IMD issues warning for potential flooding. Residents advised to stay alert.',
      excerptMal: 'ദുരന്തയോഗ്യ പ്രതിഭാസങ്ങളുടെ സാധ്യത',
      content: 'The India Meteorological Department has issued a yellow alert for Palakkad district due to the possibility of heavy rainfall. Residents are advised to stay alert and take necessary precautions.',
      contentMal: 'ഇന്ത്യ കാലാവസ്ഥ വകുപ്പ് പാലക്കാട് ജില്ലയ്ക്ക് മഞ്ഞ മുന്നറിപ്പ് പുറപ്പെടുവിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&h=400&fit=crop',
      categoryId: weather.id,
      published: true,
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
  })

  await prisma.article.create({
    data: {
      title: 'Civic Body Launches Monsoon Preparedness Drive in Palakkad',
      titleMal: 'ദേശീയ സ്ഥാപനം പ്രതിരോധ പദ്ധതി ആരംഭിച്ചു',
      slug: 'monsoon-preparedness',
      excerpt: 'Municipal corporation takes proactive measures to prepare for monsoon season.',
      excerptMal: 'മൂന്നോണ്ണി സീസണ്ണിനു പ്രസ്തുതം',
      content: 'The Palakkad Municipal Corporation has launched a comprehensive monsoon preparedness drive.',
      contentMal: 'പാലക്കാട് നഗരസഭ ദഫ്തരം ഒരു സകലാ്യ പ്രതിരോധ പദ്ധതി ആരംഭിച്ചുവെന്ന് അറിയിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1601912348674-6d5a3af0f6a6?w=800&h=400&fit=crop',
      categoryId: weather.id,
      published: true,
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
  })

  // Create articles for Education category
  await prisma.article.create({
    data: {
      title: 'New Engineering College in Mannarkkad Gets NBA Accreditation',
      titleMal: 'മന്നർക്കാട് എഞ്ചിനീയറിങ് കോളേജ് എൻബിഎ അനുമതി ലഭിച്ചു',
      slug: 'engineering-college-accreditation',
      excerpt: 'The institution becomes the second in the district to achieve accreditation.',
      excerptMal: 'രണ്ടാമത്തെ സ്ഥാപനം',
      content: 'The engineering college has successfully achieved NBA accreditation.',
      contentMal: 'കോളേജ് യശസ്വിയായി അനുമതി ലഭിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
      categoryId: education.id,
      published: true,
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    },
  })

  // Create articles for Politics category
  await prisma.article.create({
    data: {
      title: 'Collector Directs Swift Action on Pothole Repairs',
      titleMal: 'കളേക്ടർ കാരണ് ഭ്രമണത്ത് പെരുതരം നിരുത്സാഹം',
      slug: 'collector-pothole-repairs',
      excerpt: 'Following complaints from residents, district collector orders immediate repairs.',
      excerptMal: 'നിവാസികൾ പരാതി നൽകിയതിനെത്തുടർന്ന്',
      content: 'District Collector has ordered immediate action on pothole repairs across Palakkad.',
      contentMal: 'കളേക്ടർ പാലക്കാടിൽ കാരണ് കെട്ടാൻ നിരുത്സാഹം സമ്മതിച്ചിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop',
      categoryId: politics.id,
      published: true,
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    },
  })

  // Create articles for Breaking category
  await prisma.article.create({
    data: {
      title: 'Major Infrastructure Development Project Approved',
      titleMal: 'അടിസ്ഥാന കെട്ടിട മേശ പദ്ധതി അനുമോദിതമായിരിക്കുന്നു',
      slug: 'infrastructure-project-approved',
      excerpt: 'Government approves major infrastructure development for Palakkad district.',
      excerptMal: 'സർക്കാർ അനുമതി നൽകിയിരിക്കുന്നു',
      content: 'Major infrastructure development project approved for Palakkad district.',
      contentMal: 'പാലക്കാട് ജില്ലയ്ക്കായി ഒരു വലിയ അടിസ്ഥാന പദ്ധതി അനുമോദിതമായിരിക്കുന്നു.',
      featuredImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop',
      categoryId: breaking.id,
      published: true,
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      isBreaking: true,
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
