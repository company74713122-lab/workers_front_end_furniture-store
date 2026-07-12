import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-sage-100 rounded-3xl flex items-center justify-center">
        <p className="text-charcoal/40">لا توجد صور</p>
      </div>
    );
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-soft group">
        <img
          src={images[selectedImage]?.url}
          alt={`${productName} - صورة ${selectedImage + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Icon */}
        {!isZoomed && (
          <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-5 h-5 text-charcoal" />
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="w-5 h-5 text-charcoal" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur text-white rounded-full text-sm font-medium">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.public_id || index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-xl overflow-hidden transition-all ${
                selectedImage === index
                  ? 'ring-2 ring-sage-500 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={`صورة مصغرة ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}