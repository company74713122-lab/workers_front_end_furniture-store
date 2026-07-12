import MetaTags from './MetaTags';
import OpenGraph from './OpenGraph';
import OrganizationSchema from './Schema/OrganizationSchema';
import LocalBusinessSchema from './Schema/LocalBusinessSchema';

export default function SEO({
  // Meta Tags Props
  title,
  description,
  keywords,
  canonicalUrl,
  // Open Graph Props
  ogImage,
  ogType,
  // Schema
  includeOrganization = true,
  includeLocalBusiness = true,
}) {
  const defaultTitle = title || 'BLAL - أثاث منزلي فاخر | معرض الأثاث الراقي في مصر';
  const defaultDescription = description || 'اكتشف أفخم قطع الأثاث المنزلي في BLAL. غرف معيشة، نوم، سفرة، ومكاتب بأعلى جودة وأفضل الأسعار. توصيل مجاني وضمان 5 سنوات.';
  const defaultKeywords = keywords || 'أثاث منزلي, أثاث فاخر, معرض أثاث, BLAL, غرف معيشة, غرف نوم, أثاث مصر, أثاث راقي';
  const defaultUrl = canonicalUrl || 'https://furniture-store-5d3.pages.dev';
  const defaultImage = ogImage || 'https://furniture-store-5d3.pages.dev/og-image.jpg';

  return (
    <>
      <MetaTags
        title={defaultTitle}
        description={defaultDescription}
        keywords={defaultKeywords}
        canonicalUrl={defaultUrl}
      />
      
      <OpenGraph
        title={defaultTitle}
        description={defaultDescription}
        url={defaultUrl}
        image={defaultImage}
        type={ogType || 'website'}
      />
      
      {includeOrganization && <OrganizationSchema />}
      {includeLocalBusiness && <LocalBusinessSchema />}
    </>
  );
}