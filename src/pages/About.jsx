import { Link } from 'react-router-dom';
import Container from '../components/UI/Container';
import {
  Award,
  Users,
  Target,
  Heart,
  Truck,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import SEO from '../components/SEO/SEO';

export default function About() {
  const features = [
    {
      icon: Award,
      title: 'جودة لا تُضاهى',
      description: 'نختار أفضل الخامات من مصادر موثوقة حول العالم',
    },
    {
      icon: Users,
      title: 'فريق محترف',
      description: 'خبراء متخصصون في تصميم وتصنيع الأثاث',
    },
    {
      icon: Target,
      title: 'دقة في التنفيذ',
      description: 'اهتمام بأدق التفاصيل في كل قطعة أثاث',
    },
    {
      icon: Heart,
      title: 'رضا العملاء',
      description: 'نضع رضا عملائنا في مقدمة أولوياتنا',
    },
  ];

  const stats = [
    { value: '10+', label: 'سنوات خبرة' },
    { value: '5000+', label: 'عميل سعيد' },
    { value: '10000+', label: 'قطعة أثاث' },
    { value: '100%', label: 'ضمان الجودة' },
  ];

  const values = [
    'أثاث مصنوع من أجود الخامات',
    'تصاميم عصرية تجمع بين الأناقة والوظيفية',
    'أسعار تنافسية بدون تنازل عن الجودة',
    'توصيل وتركيب احترافي',
    'ضمان شامل على جميع المنتجات',
    'خدمة عملاء متميزة على مدار الساعة',
  ];

  return (
    <>
    <SEO
      title="من نحن | BLAL - قصة معرض الأثاث الفاخر"
      description="تعرف على قصة BLAL أكثر من 10 سنوات خبرة في عالم الأثاث المنزلي الفاخر في مصر. نقدم لك أفضل القطع المصنوعة بعناية."
      keywords="من نحن, BLAL, قصة المعرض, أثاث مصر, معرض أثاث"
      canonicalUrl="https://furniture-store-5d3.pages.dev/about"
      // ogImage="https://alfein.com/about-og.jpg"
    />
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-wood-800 via-wood-900 to-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold-400 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur px-6 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-semibold text-gold-300">
                من نحن
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 leading-tight">
              قصة <span className="text-gold-400">ALFEIN</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              معرض متخصص في الأثاث المنزلي الراقي، نقدم لك تجربة تسوق فريدة
              تجمع بين الجودة العالية والتصاميم العصرية
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="luxury-divider mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal mb-6">
                قصتنا <span className="gradient-text">تبدأ من هنا</span>
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
                بدأت رحلة ALFEIN قبل أكثر من 10 سنوات بحلم بسيط: تقديم أثاث
                منزلي يجمع بين الجمال والجودة والسعر العادل. اليوم، نفخر بأننا
                أصبحنا واحدة من أبرز المعارض المتخصصة في الأثاث المنزلي.
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
                نؤمن بأن كل منزل يستحق أثاثاً يعكس شخصية صاحبه ويوفر الراحة
                والأناقة. لذلك نختار كل قطعة بعناية فائقة، ونتأكد من أنها
                مصنوعة من أفضل الخامات وبأعلى معايير الجودة.
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                فريقنا من المصممين والحرفيين يعمل بشغف لتقديم قطع أثاث فريدة
                تلبي تطلعاتك وتتجاوز توقعاتك.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600"
                alt="Our Story"
                className="rounded-3xl shadow-luxury"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-wood-700 to-wood-900 text-white p-6 rounded-2xl shadow-luxury">
                <div className="text-4xl font-bold mb-1">2016</div>
                <div className="text-sm text-white/80">سنة التأسيس</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-wood-700 to-wood-900 text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gold-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 bg-cream-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal mb-3">
              لماذا <span className="gradient-text">ALFEIN</span>؟
            </h2>
            <p className="text-charcoal/60 text-lg">
              ما يميزنا عن غيرنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-luxury transition-all text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-wood-100 to-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-wood-700" />
                </div>
                <h3 className="font-bold text-xl text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"
                alt="Our Values"
                className="rounded-3xl shadow-luxury"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="luxury-divider mb-4">
                <Star className="w-5 h-5" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal mb-6">
                قيمنا <span className="gradient-text">ومبادئنا</span>
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                نلتزم بتقديم أفضل تجربة تسوق لعملائنا من خلال:
              </p>
              <ul className="space-y-4">
                {values.map((value, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal/80">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 bg-cream-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal mb-3">
              خدماتنا <span className="gradient-text">المتميزة</span>
            </h2>
            <p className="text-charcoal/60 text-lg">
              نقدم لك خدمات شاملة لتجربة تسوق مثالية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-luxury transition-all">
              <div className="w-14 h-14 bg-wood-100 rounded-2xl flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-wood-700" />
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">
                توصيل وتركيب
              </h3>
              <p className="text-charcoal/60 leading-relaxed">
                خدمة توصيل وتركيب احترافية لجميع المنتجات مع ضمان سلامة الأثاث
                أثناء النقل
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-luxury transition-all">
              <div className="w-14 h-14 bg-gold-100 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">
                ضمان شامل
              </h3>
              <p className="text-charcoal/60 leading-relaxed">
                ضمان يصل إلى 5 سنوات على جميع المنتجات مع خدمة صيانة دورية
                مجانية
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-luxury transition-all">
              <div className="w-14 h-14 bg-wood-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-wood-700" />
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">
                استشارة مجانية
              </h3>
              <p className="text-charcoal/60 leading-relaxed">
                فريق من المصممين المتخصصين لمساعدتك في اختيار الأثاث المناسب
                لمنزلك
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-wood-800 to-wood-900 text-white">
        <Container className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            جاهز لتزيين منزلك؟
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            تصفح مجموعتنا الواسعة من الأثاث المنزلي واختر ما يناسب ذوقك
            وميزانيتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-white px-10 py-5 rounded-2xl font-bold shadow-luxury transition-all"
            >
              تسوق الآن
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Link>
            <a
              href="https://wa.me/201012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold shadow-luxury transition-all"
            >
              تواصل معنا
            </a>
          </div>
        </Container>
      </section>
    </div>
    </>
  );
}