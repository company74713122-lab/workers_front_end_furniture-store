import { Helmet } from 'react-helmet-async';

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'العباسياسي',
    alternateName: 'العباسياسي Furniture Gallery',
    url: 'https://furniture-store-5d3.pages.dev',
    logo: 'https://Al Abbasicom/logo.png',
    description: 'معرض متخصص في الأثاث المنزلي الراقي - نقدم لك أفضل القطع المصنوعة بعناية لتناسب ذوقك الرفيع',
    // foundingDate: '2016',
    founder: {
      '@type': 'Person',
      name: 'AlAbbasiTeam',
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
      'https://facebook.com/Al Abbasi ',
      'https://instagram.com/Al Abbasi ',
      'https://twitter.com/Al Abbasi ',
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