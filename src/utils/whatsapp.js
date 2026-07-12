import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * يولد رابط واتساب لمنتج واحد
 */
export const generateSingleProductMessage = (product) => {
  const message = `
مرحباً ALFEIN 

أنا مهتم بهذا المنتج:

 *${product.name}*

 الفئة: ${product.category}
 السعر: LE ${product.price.toLocaleString()}
${product.offerPrice ? ` سعر العرض: LE ${product.offerPrice.toLocaleString()}` : ''}
 المادة: ${product.material}
 اللون: ${product.color}
 الأبعاد: ${product.dimensions?.width}x${product.dimensions?.height} ${product.dimensions?.unit}
 الرابط: ${window.location.origin}/products/${product.slug}

أرجو إفادتي بتفاصيل أكثر. شكراً! 
  `.trim();

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * يولد رابط واتساب للسلة كاملة - مع تفاصيل كل منتج
 */
export const generateCartMessage = (cartItems, total) => {
  const itemsList = cartItems
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;
      const offerTotal = item.offerPrice ? item.offerPrice * item.quantity : null;
      
      return `
${'━'.repeat(30)}
${index + 1}.  *${item.name}*

 الفئة: ${item.category}
 المادة: ${item.material}
 اللون: ${item.color}
 الأبعاد: ${item.dimensions?.width}x${item.dimensions?.height} ${item.dimensions?.unit}

 الكمية: ${item.quantity}
 السعر: LE ${item.price.toLocaleString()}
${item.offerPrice ? ` سعر العرض: LE ${item.offerPrice.toLocaleString()}` : ''}
${offerTotal ? ` الإجمالي (بعد الخصم): LE ${offerTotal.toLocaleString()}` : ` الإجمالي: LE ${itemTotal.toLocaleString()}`}

🔗 الرابط: ${window.location.origin}/products/${item.slug}
      `.trim();
    })
    .join('\n\n');

  const message = `
مرحباً ALFEIN 

أريد طلب المنتجات التالية:

${itemsList}

${'━'.repeat(30)}
 *المجموع الكلي: LE ${total.toLocaleString()}*
${'━'.repeat(30)}

أرجو تأكيد الطلب وإفادتي بطريقة الدفع والتوصيل. شكراً! 🙏
  `.trim();

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * يفتح واتساب في نافذة جديدة
 */
export const openWhatsApp = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};