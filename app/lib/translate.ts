// Free translation API using MyMemory (no API key required)
export async function translateText(text: string, targetLang: 'en' | 'ml'): Promise<string> {
  try {
    // Skip if text is empty or too short
    if (!text || text.length < 2) return text;

    // MyMemory API endpoint
    const langCode = targetLang === 'ml' ? 'ml' : 'en';
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langCode === 'ml' ? 'en|ml' : 'ml|en'}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LivePalakkad/1.0',
      },
    });

    if (!response.ok) return text;

    const data = await response.json();

    // Check if translation was successful
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }

    return text;
  } catch (error) {
    console.error('[v0] Translation error:', error);
    return text;
  }
}

// Cache translations to avoid repeated API calls
const translationCache = new Map<string, string>();

export async function translateTextCached(text: string, targetLang: 'en' | 'ml'): Promise<string> {
  const cacheKey = `${text}:${targetLang}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey) || text;
  }

  const translated = await translateText(text, targetLang);
  translationCache.set(cacheKey, translated);

  return translated;
}
