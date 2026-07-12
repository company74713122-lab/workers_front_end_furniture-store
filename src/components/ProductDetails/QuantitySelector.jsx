import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector({ quantity, setQuantity, maxStock = 99 }) {
  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-charcoal">الكمية:</span>
      <div className="flex items-center bg-sage-50 rounded-xl p-1">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4 text-charcoal" />
        </button>
        <span className="w-12 text-center font-bold text-charcoal text-lg">
          {quantity}
        </span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= maxStock}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 text-charcoal" />
        </button>
      </div>
      {maxStock < 10 && (
        <span className="text-xs text-terracotta-600 font-medium">
          متوفر {maxStock} فقط
        </span>
      )}
    </div>
  );
}