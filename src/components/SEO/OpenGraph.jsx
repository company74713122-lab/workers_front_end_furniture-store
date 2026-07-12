import { Helmet } from 'react-helmet-async';

export default function OpenGraph({
  title = 'BLAL - أثاث منزلي فاخر',
  description = 'اكتشف أفخم قطع الأثاث المنزلي في BLAL. غرف معيشة، نوم، سفرة، ومكاتب بأعلى جودة وأفضل الأسعار.',
  url = 'https://furniture-store-5d3.pages.dev',
  image = 'hhttps://furniture-store-5d3.pages.dev/og-image.jpg',
  type = 'website',
  siteName = 'BLAL',
  locale = 'ar_AR',
  alternateLocale = ['en_US'],
}) {
  return (
    <Helmet>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {alternateLocale.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@alfein_furniture" />
      <meta property="twitter:creator" content="@alfein_furniture" />
    </Helmet>
  );
}