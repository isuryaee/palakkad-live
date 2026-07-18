export const translations = {
  en: {
    // Navigation
    categories: 'Categories',
    home: 'Home',
    breaking: 'Breaking',
    politics: 'Politics',
    crime: 'Crime',
    education: 'Education',
    sports: 'Sports',
    weather: 'Weather',
    explore: 'Explore',
    admin: 'Admin',
    
    // Home page
    breakingNews: 'Breaking News',
    stayUpdated: 'Stay Updated',
    latestNews: 'Latest News',
    mostViewed: 'Most Viewed',
    weather: 'Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    
    // Comments
    comments: 'Comments',
    leaveComment: 'Leave a Comment',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit',
    
    // General
    loading: 'Loading...',
    noData: 'No data available',
    error: 'Something went wrong',
  },
  ml: {
    // Navigation
    categories: 'വിഭാഗങ്ങൾ',
    home: 'ഹോം',
    breaking: 'തകർപ്പ് വാർത്ത',
    politics: 'രാഷ്ട്രീയം',
    crime: 'കുറ്റകൃത്യം',
    education: 'വിദ്യാഭ്യാസം',
    sports: 'കായിക',
    weather: 'കാലാവസ്ഥ',
    explore: 'പര്യവേക്ഷണം ചെയ്യുക',
    admin: 'അഡ്മിൻ',
    
    // Home page
    breakingNews: 'പ്രധാന വാർത്ത',
    stayUpdated: 'അപ്ഡേറ്റ് ചെയ്ത നിലയിൽ തുടരുക',
    latestNews: 'സമീപകാല വാർത്ത',
    mostViewed: 'ഏറ്റവും കൂടുതൽ കാണപ്പെടുന്നത്',
    weather: 'കാലാവസ്ഥ',
    temperature: 'താപനില',
    humidity: 'ആർദ്രത',
    windSpeed: 'കാറ്റിന്റെ വേഗത',
    
    // Comments
    comments: 'അഭിപ്രായങ്ങൾ',
    leaveComment: 'അഭിപ്രായം രേഖപ്പെടുത്തുക',
    name: 'പേര്',
    email: 'ഇമെയിൽ',
    message: 'സന്ദേശം',
    submit: 'സമർപ്പിക്കുക',
    
    // General
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    noData: 'ഡാറ്റ ലഭ്യമല്ല',
    error: 'എന്തോ കുഴപ്പം സംഭവിച്ചു',
  },
}

export function t(key: keyof typeof translations.en, lang: 'en' | 'ml'): string {
  return translations[lang][key as keyof typeof translations[lang]] || translations.en[key]
}
