import { Helmet } from 'react-helmet-async';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BLAL',
    alternateName: 'BLAL Furniture Gallery',
    url: 'https://furniture-store-5d3.pages.dev',
    logo: 'https://alfein.com/logo.png',
    description: 'معرض متخصص في الأثاث المنزلي الراقي - نقدم لك أفضل القطع المصنوعة بعناية لتناسب ذوقك الرفيع',
    // foundingDate: '2016',
    founder: {
      '@type': 'Person',
      name: 'ALFEIN Team',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'دمياط',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-101-234-5678',
      contactType: 'Customer Service',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [
      'https://facebook.com/alfein',
      'https://instagram.com/alfein',
      'https://twitter.com/alfein',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}