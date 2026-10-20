import { Link } from 'react-router-dom';
import { Share2, Globe, Users, Play, MessageCircle } from 'lucide-react';
import Container from '../ui/Container';
import { BRAND, WHATSAPP, NAV_LINKS, CONTACT, LOCATIONS } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/50 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">{BRAND}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Expert coaching at {LOCATIONS}. Matric, CBSE, ICSE, NCERT and engineering programmes with individual care and project consultancy.
            </p>
            <div className="flex gap-3 mt-4">
              {[Share2, Globe, Users, Play].map((Icon, i) => (
                <a key={i} href="#" className="p-2 glass rounded-lg text-slate-400 hover:text-emerald-400 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>{CONTACT.email}</li>
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.address}</li>
              <li className="text-emerald-400/80">Kelambakkam centre also available</li>
            </ul>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 text-sm"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Policies</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              <li><Link to="/contact" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
