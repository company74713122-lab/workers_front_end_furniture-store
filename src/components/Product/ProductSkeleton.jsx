export default function ProductSkeleton() {
    return (
      <div className="product-card">
        {/* Image Skeleton */}
        <div className="skeleton skeleton-image" />
        
        {/* Content Skeleton */}
        <div className="p-3 space-y-2">
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{ width: '80%' }} />
          <div className="skeleton skeleton-text-short" />
          <div className="skeleton skeleton-text" style={{ height: '36px', marginTop: '8px' }} />
          <div className="skeleton skeleton-text" style={{ height: '36px' }} />
        </div>
      </div>
    );
  }