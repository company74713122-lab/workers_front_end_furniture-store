import { Helmet } from 'react-helmet-async';

export default function MetaTags({
  title = 'BLAL - أثاث منزلي فاخر',
  description = 'اكتشف أفخم قطع الأثاث المنزلي في BLAL. غرف معيشة، نوم، سفرة، ومكاتب بأعلى جودة وأفضل الأسعار. توصيل مجاني وضمان 5 سنوات.',
  keywords = 'أثاث منزلي, أثاث فاخر, معرض أثاث, BLAL, اثاث,غرف معيشة, غرف نوم, أثاث مصر,موبايليا', 
  canonicalUrl = 'https://furniture-store-5d3.pages.dev', 
  robots = 'index, follow',
  author = 'ALFEIN Furniture Gallery',
  viewport = 'width=device-width, initial-scale=1.0',
  charset = 'UTF-8',
  language = 'ar',
  geo = {
    region: 'EG-C',
    position: '31.4165,31.8133', // دمياط
    placename: 'دمياط , مصر',

  },
}) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <meta charSet={charset} />
      <meta name="viewport" content={viewport} />
      <meta name="language" content={language} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      
      {/* SEO Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content={geo.region} />
      <meta name="geo.position" content={geo.position} />
      <meta name="geo.placename" content={geo.placename} />
      
      {/* Additional SEO */}
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
    </Helmet>
  );
}