import { MessageCircle } from 'lucide-react';
import { generateSingleProductMessage, openWhatsApp } from '../../utils/whatsapp';

export default function WhatsAppButton({ product, className = '' }) {
  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = generateSingleProductMessage(product);
    openWhatsApp(url);
  };

  return (
    <button
      onClick={handleWhatsApp}
      className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-md ${className}`}
      title="تواصل عبر واتساب"
    >
      <MessageCircle className="w-4 h-4" />
      <span className="text-sm font-medium">واتساب</span>
    </button>
  );
}