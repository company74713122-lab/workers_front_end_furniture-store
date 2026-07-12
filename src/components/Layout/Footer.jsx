import Container from '../UI/Container';
import { Link } from 'react-router-dom';
import { STORE_INFO, CATEGORIES } from '../../config/constants';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-wood-900 text-cream-100">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-wood-600 to-gold-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl font-display">
                  A
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-white">
                  ALFEIN
                </span>
                <p className="text-xs text-cream-300">أثاث منزلي فاخر</p>
              </div>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed mb-6">
              {STORE_INFO.description}
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-10 h-10 bg-white/10 hover:bg-wood-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold-400">روابط سريعة</h4>
            <ul className="space-y-3 text-cream-300 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-400 transition-colors">
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold-400 transition-colors">
                  سلة التسوق
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold-400">الفئات</h4>
            <ul className="space-y-3 text-cream-300 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.value}>
                  <Link
                    to={`/products?category=${cat.value}`}
                    className="hover:text-gold-400 transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold-400">تواصل معنا</h4>
            <ul className="space-y-3 text-cream-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-gold-400">
                  {STORE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="hover:text-gold-400"
                >
                  {STORE_INFO.email}
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold text-sm mb-2">اشترك في النشرة</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-gold-400"
                />
                <button className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-sm font-medium transition-colors">
                  اشترك
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-cream-400 text-sm">
          <p>&copy; 2026 ALFEIN. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-gold-400 transition-colors">
              الشروط والأحكام
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}