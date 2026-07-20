import {
  AlertCircle,
  Gavel,
  Shield,
  Cloud,
  Zap,
  BookOpen,
  Users,
  TrendingUp,
  Camera,
  Radio,
  LucideIcon,
} from 'lucide-react'

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  breaking: AlertCircle,
  'breaking-news': AlertCircle,
  politics: Gavel,
  crime: Shield,
  weather: Cloud,
  sports: Zap,
  education: BookOpen,
  community: Users,
  business: TrendingUp,
  photos: Camera,
  videos: Radio,
}

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug.toLowerCase()] || AlertCircle
}
