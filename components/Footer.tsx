import Link from 'next/link'
import Image from 'next/image'
import { Share2, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src="/logo/livepalakkad-icon.png"
              alt="LivePalakkad"
              width={40}
              height={40}
              className="w-10 h-10 mb-4"
            />
            <h3 className="font-black text-lg mb-2">LivePalakkad</h3>
            <p className="text-sm text-slate-400">Palakkad First - Hyperlocal news and breaking updates from Palakkad district, Kerala.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/category/breaking-news" className="hover:text-white transition">Breaking News</Link></li>
              <li><Link href="/category/politics" className="hover:text-white transition">Politics</Link></li>
              <li><Link href="/category/weather" className="hover:text-white transition">Weather</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} /> <a href="tel:9074500360" className="hover:text-white transition">90745 00360</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> <a href="mailto:mailstudiocity@gmail.com" className="hover:text-white transition">mailstudiocity@gmail.com</a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com/livepalakkadnews" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition text-lg">
                f
              </a>
              <a href="https://instagram.com/livepalakkad" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition text-lg">
                📷
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2024 LivePalakkad. All rights reserved.</p>
          <p className="mt-2">Palakkad First</p>
        </div>
      </div>
    </footer>
  )
}
