import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Zap, Camera, BarChart3, Heart, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-black text-white mt-16 border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Newsletter */}
        <div className="mb-12 p-8 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border border-blue-500/30 rounded-xl">
          <h3 className="text-2xl font-black mb-2">Stay Updated</h3>
          <p className="text-blue-200 mb-4">Get breaking news, weather alerts, and updates from Palakkad delivered to your inbox.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition">Subscribe</button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo/livepalakkad-icon.png"
                alt="LivePalakkad"
                width={44}
                height={44}
                className="w-11 h-11"
              />
              <h3 className="font-black text-xl">LivePalakkad</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">Palakkad First - Hyperlocal news, breaking updates, and community stories from Palakkad district, Kerala.</p>
          </div>

          {/* News Categories */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-blue-300">Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/category/breaking-news" className="hover:text-blue-300 transition">Breaking News</Link></li>
              <li><Link href="/category/politics" className="hover:text-blue-300 transition">Politics</Link></li>
              <li><Link href="/category/weather" className="hover:text-blue-300 transition">Weather</Link></li>
              <li><Link href="/category/crime" className="hover:text-blue-300 transition">Crime</Link></li>
              <li><Link href="/category/education" className="hover:text-blue-300 transition">Education</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-blue-300">Features</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/live" className="hover:text-blue-300 transition flex items-center gap-2"><Zap size={14} /> Live Updates</Link></li>
              <li><Link href="/photos" className="hover:text-blue-300 transition flex items-center gap-2"><Camera size={14} /> Photo Gallery</Link></li>
              <li><Link href="/videos" className="hover:text-blue-300 transition">Video Gallery</Link></li>
              <li><Link href="/explore" className="hover:text-blue-300 transition">Explore Palakkad</Link></li>
              <li><Link href="/analytics" className="hover:text-blue-300 transition flex items-center gap-2"><BarChart3 size={14} /> Analytics</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-blue-300">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-blue-300 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-300 transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-300 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-300 transition">Terms of Service</Link></li>
              <li><Link href="/advertise" className="hover:text-blue-300 transition">Advertise</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-blue-300">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-blue-400" /> 
                <a href="tel:9074500360" className="hover:text-blue-300 transition">+91 90745 00360</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-blue-400" /> 
                <a href="mailto:mailstudiocity@gmail.com" className="hover:text-blue-300 transition break-all">mailstudiocity@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-blue-400" /> 
                <span>Palakkad, Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            <a href="https://facebook.com/livepalakkadnews" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition text-blue-300 hover:text-white font-black text-lg">
              f
            </a>
            <a href="https://instagram.com/livepalakkad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition text-pink-300 hover:text-white">
              <Share2 size={18} />
            </a>
          </div>
          <div className="text-center sm:text-right text-sm text-slate-500">
            <p>&copy; 2024 LivePalakkad. All rights reserved.</p>
            <p className="text-xs text-slate-600 mt-1">Made with care for Palakkad</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
