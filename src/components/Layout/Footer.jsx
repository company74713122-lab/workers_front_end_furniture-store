import Container from '../UI/Container';
import { Link } from 'react-router-dom';
import { STORE_INFO, CATEGORIES } from '../../config/constants';
import { Phone, Mail, MapPin, MessageCircle, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-cream-100 border-t border-gold-900/30">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-400 rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-black font-bold text-2xl font-display">
                  أ
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold font-display text-white">
                  العباسي
                </span>
                <p className="text-xs text-gold-500 font-medium">للأثاث الراقي</p>
              </div>
            </div>
            <p className="text-cream-200 text-sm leading-relaxed mb-6">
              {STORE_INFO.description || "نقدم لكم أرقى قطع الأثاث المنزلي والمكتبي بتصاميم عصرية، خامات فاخرة، وجودة لا تضاهى."}
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-cream-100" />
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-10 h-10 bg-white/5 hover:bg-gold-600 border border-white/10 hover:border-gold-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-cream-100" />
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="w-10 h-10 bg-white/5 hover:bg-gold-600 border border-white/10 hover:border-gold-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-cream-100" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold-500">روابط سريعة</h4>
            <ul className="space-y-3 text-cream-200 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full"></span>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full"></span>
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full"></span>
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full"></span>
                  سلة التسوق
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold-500">الفئات</h4>
            <ul className="space-y-3 text-cream-200 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.value}>
                  <Link
                    to={`/products?category=${cat.value}`}
                    className="hover:text-gold-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-gold-600">{cat.icon}</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gold-500">تواصل معنا</h4>
            <ul className="space-y-4 text-cream-200 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-gold-400 transition-colors dir-ltr text-right">
                  {STORE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-gold-400 transition-colors">
                  {STORE_INFO.email}
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold text-sm mb-3 text-white">اشترك في النشرة البريدية</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-cream-400 focus:outline-none focus:border-gold-500 focus:bg-white/10 transition-all"
                />
                <button className="px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded-lg text-sm transition-colors shadow-gold">
                  اشترك
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Developer Credit */}
        <div className="border-t border-white/10 mt-12 pt-8">
          
          {/* ✅ قسم حقوق المطور (منمق وفاخر) */}
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-3 mb-6">
            <span className="text-cream-400 text-sm flex items-center gap-1">
              تم التطوير  بواسطة
            </span>
            <a 
              href="tel:01020353179" 
              className="group flex items-center gap-2 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 hover:border-gold-500/50 px-4 py-1.5 rounded-full transition-all duration-300"
            >
              <Code2 className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
              <span className="text-gold-400 font-bold text-sm tracking-wide group-hover:text-gold-300">
                BLAL SHAHEEN
              </span>
              <span className="w-px h-4 bg-gold-500/30"></span>
              <span className="flex items-center gap-1.5 text-cream-200 text-sm font-medium group-hover:text-white">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                01020353179
              </span>
            </a>
          </div>

          {/* حقوق الموقع والروابط السفلية */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-cream-400 text-sm border-t border-white/5 pt-6">
            <p>
              &copy; {new Date().getFullYear()} <span className="text-gold-500 font-semibold">العباسي للأثاث الراقي</span>. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold-400 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-gold-400 transition-colors">الشروط والأحكام</a>
            </div>
          </div>
        </div>

      </Container>
    </footer>
  );
}