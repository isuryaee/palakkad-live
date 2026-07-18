import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M18 2h-3a6 6 0 0 0-6 6v4h-2v4h2v6h4v-6h3l1-4h-4v-2a2 2 0 0 1 2-2h1z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.195-6.791-5.966 6.791h-3.31l7.73-8.835L.424 2.25h6.7l4.713 6.231 5.405-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17.5" cy="6.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans mt-12 pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/livepalakkad-icon.png"
                alt="LivePalakkad"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="flex flex-col text-white">
                <span className="font-serif font-bold text-xl leading-tight">LivePalakkad</span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-slate-400 leading-none">Palakkad First</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-6">
              Palakkad's most trusted bilingual news portal, bringing you the latest updates, breaking news, and local stories that matter.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/livepalakkad" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://x.com/livepalakkad" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="X (Twitter)">
                <XIcon />
              </a>
              <a href="https://instagram.com/livepalakkad" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com/@livepalakkad" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Sections</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/politics" className="hover:text-white transition-colors">Politics</Link></li>
              <li><Link href="/category/crime" className="hover:text-white transition-colors">Crime & Accidents</Link></li>
              <li><Link href="/category/education" className="hover:text-white transition-colors">Education</Link></li>
              <li><Link href="/category/sports" className="hover:text-white transition-colors">Sports</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Palakkad</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles" className="hover:text-white transition-colors">Live Updates</Link></li>
              <li><Link href="/page/emergency" className="hover:text-white transition-colors">Emergency Contacts</Link></li>
              <li><Link href="/page/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-slate-400" />
                <span>LivePalakkad Media<br />Stadium Bypass Road<br />Palakkad, Kerala 678001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-slate-400" />
                <span>+91 90745 00360</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-slate-400" />
                <span>news@livepalakkad.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} LivePalakkad Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
