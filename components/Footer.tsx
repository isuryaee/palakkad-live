import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

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
              <a href="#" className="text-slate-400 hover:text-white transition-colors">f</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">𝕏</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">📷</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">▶</a>
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
          <p>Designed & Developed in Palakkad</p>
        </div>
      </div>
    </footer>
  )
}
