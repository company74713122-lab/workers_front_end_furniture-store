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
      title: 'جودة عالية ',
      description: 'نختار بجودة عالية  ',
    },
    {
      icon: Users,
      title: ' شغل احترافي',
      description: '  حبرة كبيرة ',
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
    { value: 'سنوات خبرة', label: ' ' },
    { value: 'الاهم', label: ' سعادة العملاء' },
    { value: ' ما تحتاج ', label: ' من قطع الاثاث ' },
    { value: '100%', label: 'ضمان الجودة' },
  ];

  const values = [
    'أثاث مصنوع من خامات عالية ',
    'تصاميم عصرية تجمع بين الأناقة والوظيفية',
    'أسعار تنافسية    ',
    'توصيل وتركيب احترافي',
    ' جودة عالية',
    'خدمة عملاء متميزة على مدار الساعة',
  ];

  return (
    <>
      <SEO
        title="من نحن | أمير للأثاث الراقي - قصة التميز"
        description="تعرف على قصة أمير، أكثر من 10 سنوات خبرة في عالم الأثاث المنزلي الفاخر في مصر. نقدم لك أفضل القطع المصنوعة بعناية."
        keywords="من نحن, أمير, قصة المعرض, أثاث مصر, معرض أثاث فاخر"
        canonicalUrl="https://furniture-store-5d3.pages.dev/about"
      />
      
      <div className="bg-black min-h-screen">
     {/* Hero Section */}
<section className="relative py-20 md:py-32 bg-gradient-to-br from-royal-950 via-black to-amir-950 text-white overflow-hidden">
  {/* ✅ تم إزالة الدوائر الضوئية */}

  <Container className="relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm px-6 py-2.5 rounded-full mb-6">
        <Award className="w-4 h-4 text-gold-400" />
        <span className="text-sm font-semibold text-gold-300">
          من نحن
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight text-white">
        قصة <span className="text-gold-500">أمير</span>
      </h1>

      <p className="text-lg md:text-2xl text-cream-200 leading-relaxed max-w-3xl mx-auto">
        معرض متخصص في الأثاث المنزلي الراقي، نقدم لك تجربة تسوق فريدة
        تجمع بين الجودة العالية والتصاميم العصرية
      </p>
    </div>
  </Container>
</section>
        {/* Story Section */}
        <section className="py-20 bg-black">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-gold-500"></div>
                  <Heart className="w-5 h-5 text-gold-500" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                  قصتنا <span className="text-gold-500">تبدأ من هنا</span>
                </h2>
                <p className="text-lg text-cream-200 leading-relaxed mb-6">
                  بدات رحلتنا منذ وقت طويل ومازالنا مستمرين ل
                </p>
                <p className="text-lg text-cream-200 leading-relaxed mb-6">
                  نؤمن بأن كل منزل يستحق أثاثاً يعكس شخصية صاحبه ويوفر الراحة
                  والأناقة. لذلك نختار كل قطعة بعناية فائقة، ونتأكد من أنها
                  مصنوعةة.
                </p>
                <p className="text-lg text-cream-200 leading-relaxed">
                  فريقنا من المصممين والحرفيين يعمل بشغف لتقديم قطع أثاث فريدة
                  تلبي تطلعاتك وتتجاوز توقعاتك.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600"
                  alt="Our Story"
                  className="rounded-3xl shadow-luxury border border-white/10"
                />
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-gold-600 to-gold-800 text-black p-6 rounded-2xl shadow-glow">
                  {/* <div className="text-4xl font-bold mb-1">2016</div> */}
                  {/* <div className="text-sm font-semibold text-black/80">سنة التأسيس</div> */}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gradient-to-r from-royal-950 to-black border-y border-gold-500/20">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-5xl md:text-6xl font-bold text-gold-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-cream-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Features */}
        <section className="py-20 bg-black">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-3">
                لماذا <span className="text-gold-500">أمير</span>؟
              </h2>
              <p className="text-cream-300 text-lg">
                ما يميزنا عن غيرنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold-500/30 hover:bg-white/10 transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="font-bold text-xl text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-cream-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="py-20 bg-royal-950">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"
                  alt="Our Values"
                  className="rounded-3xl shadow-luxury border border-white/10"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-gold-500"></div>
                  <Star className="w-5 h-5 text-gold-500" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                  قيمنا <span className="text-gold-500">ومبادئنا</span>
                </h2>
                <p className="text-lg text-cream-200 leading-relaxed mb-8">
                  نلتزم بتقديم أفضل تجربة تسوق لعملائنا من خلال:
                </p>
                <ul className="space-y-4">
                  {values.map((value, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-cream-100">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Services */}
        <section className="py-20 bg-black">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-3">
                خدماتنا <span className="text-gold-500">المتميزة</span>
              </h2>
              <p className="text-cream-300 text-lg">
                نقدم لك خدمات شاملة لتجربة تسوق مثالية
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <Truck className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">
                  توصيل وتركيب
                </h3>
                <p className="text-cream-300 leading-relaxed">
                  خدمة توصيل وتركيب احترافية لجميع المنتجات مع ضمان سلامة الأثاث
                  أثناء النقل
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">
                  جودة عالية 
                </h3>
                <p className="text-cream-300 leading-relaxed">
                  ""
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">
                  استشارة من اشخاص ذو خبرة
                </h3>
                <p className="text-cream-300 leading-relaxed">
                  فريق من المصممين المتخصصين لمساعدتك في اختيار الأثاث المناسب
                  لمنزلك
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gold-900 via-royal-950 to-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-[150px]" />
          </div>
          <Container className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
              جاهز لتزيين منزلك؟
            </h2>
            <p className="text-xl text-cream-200 mb-8 max-w-2xl mx-auto">
              تصفح مجموعتنا الواسعة من الأثاث المنزلي واختر ما يناسب ذوقك
              وميزانيتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-black px-10 py-5 rounded-2xl font-bold shadow-glow transition-all duration-300"
              >
                تسوق الآن
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Link>
              <a
                href="https://wa.me/201020353179"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black px-10 py-5 rounded-2xl font-bold transition-all duration-300"
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