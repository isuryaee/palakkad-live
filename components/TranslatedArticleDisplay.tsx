'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { translateTextCached } from '@/app/lib/translate'
import { t } from '@/app/lib/translations'
import { Loader } from 'lucide-react'

interface TranslatedArticleDisplayProps {
  title: string
  excerpt?: string
  content: string
}

export function TranslatedArticleDisplay({
  title,
  excerpt,
  content,
}: TranslatedArticleDisplayProps) {
  const { language } = useLanguage()
  const lang = language as 'en' | 'ml'
  
  const [translatedTitle, setTranslatedTitle] = useState(title)
  const [translatedContent, setTranslatedContent] = useState(content)
  const [translatedExcerpt, setTranslatedExcerpt] = useState(excerpt || '')
  const [isTranslating, setIsTranslating] = useState(false)
  const [showOriginal, setShowOriginal] = useState(lang === 'ml')

  useEffect(() => {
    const translateContent = async () => {
      if (lang === 'ml') {
        // If Malayalam is selected, keep original
        setTranslatedTitle(title)
        setTranslatedContent(content)
        setTranslatedExcerpt(excerpt || '')
        setShowOriginal(true)
      } else {
        // Translate to English
        setIsTranslating(true)
        try {
          const [newTitle, newContent, newExcerpt] = await Promise.all([
            translateTextCached(title, 'en'),
            translateTextCached(content, 'en'),
            excerpt ? translateTextCached(excerpt, 'en') : Promise.resolve(''),
          ])

          setTranslatedTitle(newTitle)
          setTranslatedContent(newContent)
          setTranslatedExcerpt(newExcerpt)
          setShowOriginal(false)
        } finally {
          setIsTranslating(false)
        }
      }
    }

    translateContent()
  }, [lang, title, content, excerpt])

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
        {translatedTitle}
        {isTranslating && <Loader className="w-5 h-5 inline animate-spin ml-2" />}
      </h1>

      {translatedExcerpt && (
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 italic">
          {translatedExcerpt}
        </p>
      )}

      {lang === 'en' && (
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
        >
          {showOriginal ? t('originalText' as any, lang) : t('translatedTo' as any, lang)}
        </button>
      )}

      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {translatedContent}
        </p>
      </div>
    </article>
  )
}
