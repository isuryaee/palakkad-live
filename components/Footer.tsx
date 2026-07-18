import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.195-6.791-5.966 6.791h-3.31l7.73-8.835L.424 2.25h6.7l4.713 6.231 5.405-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.626c-.79.297-1.51.703-2.15 1.34-.637.64-1.043 1.361-1.342 2.15-.295.789-.497 1.659-.558 3.067-.06 1.281-.073 1.689-.073 4.948 0 3.259.015 3.668.072 4.948.06 1.408.262 2.278.556 3.068.297.79.703 1.509 1.34 2.149.64.637 1.359 1.043 2.15 1.342.789.296 1.659.499 3.067.558 1.281.06 1.69.073 4.949.073 3.259 0 3.668-.015 4.948-.072 1.408-.06 2.279-.262 3.068-.556.79-.297 1.51-.703 2.15-1.34.637-.64 1.043-1.361 1.342-2.15.296-.79.499-1.66.558-3.068.06-1.281.073-1.689.073-4.948 0-3.259-.015-3.668-.072-4.948-.06-1.408-.262-2.278-.556-3.068-.297-.79-.703-1.509-1.34-2.149-.64-.637-1.359-1.043-2.15-1.342-.789-.297-1.659-.499-3.067-.558C15.668.015 15.259 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.070 1.171.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.355 1.056.41 2.227.061 1.264.07 1.645.07 4.849 0 3.203-.009 3.584-.07 4.849-.054 1.171-.244 1.806-.408 2.228-.217.561-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.355-2.227.41-1.264.061-1.645.07-4.849.07-3.203 0-3.584-.009-4.849-.07-1.171-.054-1.806-.244-2.228-.408-.561-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.355-1.056-.41-2.227-.061-1.264-.07-1.645-.07-4.849 0-3.203.009-3.584.07-4.849.054-1.171.244-1.806.408-2.228.217-.561.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.056-.355 2.227-.41 1.264-.061 1.645-.07 4.849-.07zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
                <span>+91 491 2500000</span>
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
