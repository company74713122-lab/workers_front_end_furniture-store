import { Helmet } from 'react-helmet-async';

export default function ProductSchema({ product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.primImg || product.images?.[0]?.url || '',
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'BLAL',
    },
    offers: {
      '@type': 'Offer',
      url: `https://furniture-store-5d3.pages.dev/products/${product.slug}`,
      priceCurrency: 'EGP',
      price: product.offerPrice || product.price,
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '128',
    },
    material: product.material,
    color: product.color,
    category: product.category,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}