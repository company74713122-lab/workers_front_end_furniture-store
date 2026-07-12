import { Helmet } from 'react-helmet-async';

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'BLAL Furniture Gallery',
    // image: 'hhttps://furniture-store-5d3.pages.dev/store-image.jpg',
    '@id': 'https://furniture-store-5d3.pages.dev',
    url: 'https://furniture-store-5d3.pages.dev',
    telephone: '+20-101-234-5678',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'شارع التسعين',
      addressLocality: 'التجمع الخامس',
      addressRegion: 'القاهرة',
      postalCode: '11835',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0444,
      longitude: 31.2357,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '14:00',
        closes: '22:00',
      },
    ],
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