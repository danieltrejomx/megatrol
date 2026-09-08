export interface Review {
  id: string;
  productId: number;
  author: string;
  role?: string;
  city?: string;
  rating: number; // 1 - 5
  date: string;
  title: string;
  comment: string;
  presentation?: string;
  verifiedPurchase: boolean;
  avatarInitials?: string;
}

const STORAGE_PURCHASED_KEY = 'megatrol_purchased_products';
const STORAGE_REVIEWS_PREFIX = 'megatrol_custom_reviews_';

const initialProductReviews: Record<number, Review[]> = {
  // 1: Spray Antipulgas
  1: [
    {
      id: 'rev-1-1',
      productId: 1,
      author: 'Dra. Mariana Valdés',
      role: 'Médico Veterinario Zootecnista',
      city: 'CDMX',
      rating: 5,
      date: 'Hace 3 días',
      title: '¡En 3 días eliminó las pulgas por completo!',
      comment: 'Lo receto a diario en mi clínica veterinaria. Los dueños quedan encantados porque no huele a químico agresivo ni causa alergias dérmicas. Lo aplico a contra pelo y en camas.',
      presentation: '155 mL',
      verifiedPurchase: true,
      avatarInitials: 'MV'
    },
    {
      id: 'rev-1-2',
      productId: 1,
      author: 'Rodrigo Gómez T.',
      city: 'Guadalajara, Jal.',
      rating: 5,
      date: 'Hace 1 semana',
      title: 'El mejor spray natural, cero pulgas y aroma fresco',
      comment: 'Mis dos perros mestizos no toleraban las pipetas de farmacia porque se intoxicaban o rascaban peor. Megatrol fue la solución definitiva: a los 20 minutos de aplicarlo ya no tenían comezón.',
      presentation: '155 mL',
      verifiedPurchase: true,
      avatarInitials: 'RG'
    },
    {
      id: 'rev-1-3',
      productId: 1,
      author: 'Carla Morales',
      city: 'Monterrey, N.L.',
      rating: 5,
      date: 'Hace 2 semanas',
      title: 'Excelente contra garrapatas de jardín',
      comment: 'En temporada de calor las garrapatas eran una pesadilla en el patio. Rocié sus transportadoras, camas y a los perritos y no he vuelto a ver ni una sola.',
      presentation: '155 mL',
      verifiedPurchase: true,
      avatarInitials: 'CM'
    }
  ],
  // 2: Shampoo Antipulgas
  2: [
    {
      id: 'rev-2-1',
      productId: 2,
      author: 'Sofía Navarro',
      role: 'Criadora de Gatos Persa',
      city: 'Guadalajara, Jal.',
      rating: 5,
      date: 'Hace 4 días',
      title: 'Suave, seguro y deja el pelaje espectacular',
      comment: 'Siempre me daba pánico bañar a mis gatos con insecticidas convencionales por temor al lamido. Megatrol es 100% inocuo, hace una espuma suave y el pelo quedó sedoso y sin pulgas.',
      presentation: '250 mL',
      verifiedPurchase: true,
      avatarInitials: 'SN'
    },
    {
      id: 'rev-2-2',
      productId: 2,
      author: 'MVZ. Carlos Morales',
      role: 'Clínica & Estética San Ángel',
      city: 'Puebla, Pue.',
      rating: 5,
      date: 'Hace 1 semana',
      title: 'Rendimiento profesional y clientes felices',
      comment: 'Compramos la presentación en galón de 4 litros para la estética canina. Los clientes siempre preguntan qué shampoo usamos porque los perritos regresan oliendo a limpio natural y sin rascarse.',
      presentation: 'Galón 4 L',
      verifiedPurchase: true,
      avatarInitials: 'CM'
    },
    {
      id: 'rev-2-3',
      productId: 2,
      author: 'Diana Toledo',
      city: 'CDMX',
      rating: 5,
      date: 'Hace 2 semanas',
      title: 'Efecto inmediato en el agua del baño',
      comment: 'Se vieron caer las pulgas al instante en el enjuague. No irritó los ojos de mi cachorro y el olor es muy agradable.',
      presentation: '250 mL',
      verifiedPurchase: true,
      avatarInitials: 'DT'
    }
  ],
  // 3: Talco Ecológico
  3: [
    {
      id: 'rev-3-1',
      productId: 3,
      author: 'Valeria Mendoza',
      city: 'Monterrey, N.L.',
      rating: 5,
      date: 'Hace 5 días',
      title: 'Excelente para mantenimiento entre baños',
      comment: 'Fácil de esparcir con un cepillado rápido. Desodoriza al instante y mantiene a raya cualquier pulga después de pasear en el parque.',
      presentation: '80 g',
      verifiedPurchase: true,
      avatarInitials: 'VM'
    },
    {
      id: 'rev-3-2',
      productId: 3,
      author: 'MVZ. Héctor Cárdenas',
      city: 'Puebla, Pue.',
      rating: 5,
      date: 'Hace 2 semanas',
      title: 'Muy buena acción secante y antiséptica',
      comment: 'Ideal para perros de pliegues o zonas húmedas propensas a ectoparásitos y mal olor. No contiene asbesto ni químicos tóxicos.',
      presentation: '80 g',
      verifiedPurchase: true,
      avatarInitials: 'HC'
    }
  ],
  // 4: Jabón en Barra
  4: [
    {
      id: 'rev-4-1',
      productId: 4,
      author: 'Alejandro Ruiz',
      city: 'Querétaro',
      rating: 5,
      date: 'Hace 1 semana',
      title: 'Práctico, duradero y muy efectivo',
      comment: 'Limpia a profundidad sin resecar la piel. La barra rinde muchísimo y el aroma a lavanda y neem es riquísimo.',
      presentation: '100 g',
      verifiedPurchase: true,
      avatarInitials: 'AR'
    }
  ],
  // 5: Kit Protección Total
  5: [
    {
      id: 'rev-5-1',
      productId: 5,
      author: 'Fernando Castro',
      city: 'Mérida, Yuc.',
      rating: 5,
      date: 'Hace 3 días',
      title: 'El combo definitivo: adiós plaga en 48 horas',
      comment: 'El shampoo para el baño profundo, el talco en sus camas y el spray para antes de salir al parque. Por fin encontré una solución que realmente funciona sin venenos.',
      presentation: 'Kit Completo',
      verifiedPurchase: true,
      avatarInitials: 'FC'
    },
    {
      id: 'rev-5-2',
      productId: 5,
      author: 'Lucía Benítez',
      city: 'León, Gto.',
      rating: 5,
      date: 'Hace 1 semana',
      title: 'Súper ahorro y calidad de laboratorio',
      comment: 'Comprar el kit fue la mejor decisión, salió mucho más económico y el envío me llegó al día siguiente. 100% recomendado.',
      presentation: 'Kit Completo',
      verifiedPurchase: true,
      avatarInitials: 'LB'
    }
  ]
};

const getDefaultReviewsForProduct = (productId: number): Review[] => {
  return [
    {
      id: `rev-${productId}-gen1`,
      productId,
      author: 'Cliente Verificado Megatrol',
      city: 'México',
      rating: 5,
      date: 'Hace 1 semana',
      title: 'Excelente calidad y respaldo veterinario',
      comment: 'Producto de grado farmacéutico original de Inobazz Pharma. Cumple al 100% con lo prometido en la descripción y ficha técnica.',
      verifiedPurchase: true,
      avatarInitials: 'CV'
    },
    {
      id: `rev-${productId}-gen2`,
      productId,
      author: 'MVZ. Especialista',
      city: 'CDMX',
      rating: 5,
      date: 'Hace 2 semanas',
      title: 'Fórmula recomendada para uso clínico',
      comment: 'Excelente tolerancia en pacientes caninos y felinos con resultados rápidos y consistentes.',
      verifiedPurchase: true,
      avatarInitials: 'ME'
    }
  ];
};

export const getReviewsForProduct = (productId: number): Review[] => {
  const base = initialProductReviews[productId] || getDefaultReviewsForProduct(productId);
  
  if (typeof window === 'undefined') return base;
  
  try {
    const saved = localStorage.getItem(`${STORAGE_REVIEWS_PREFIX}${productId}`);
    if (saved) {
      const customReviews: Review[] = JSON.parse(saved);
      return [...customReviews, ...base];
    }
  } catch (e) {
    console.warn('Error reading reviews from localStorage', e);
  }
  
  return base;
};

export const addReviewToProduct = (
  productId: number,
  reviewData: {
    author: string;
    city?: string;
    rating: number;
    title: string;
    comment: string;
    presentation?: string;
  }
): Review => {
  const initials = reviewData.author
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('') || 'CV';

  const newReview: Review = {
    id: `custom-rev-${Date.now()}`,
    productId,
    author: reviewData.author.trim(),
    city: reviewData.city?.trim() || 'México',
    rating: Math.max(1, Math.min(5, reviewData.rating)),
    date: 'Hoy (Reciente)',
    title: reviewData.title.trim(),
    comment: reviewData.comment.trim(),
    presentation: reviewData.presentation,
    verifiedPurchase: true,
    avatarInitials: initials
  };

  try {
    const key = `${STORAGE_REVIEWS_PREFIX}${productId}`;
    const existingStr = localStorage.getItem(key);
    const existing: Review[] = existingStr ? JSON.parse(existingStr) : [];
    const updated = [newReview, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving review to localStorage', e);
  }

  return newReview;
};

export const hasUserPurchasedProduct = (productId: number): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(STORAGE_PURCHASED_KEY);
    if (!raw) return false;
    const purchasedIds: number[] = JSON.parse(raw);
    return Array.isArray(purchasedIds) && purchasedIds.includes(productId);
  } catch (e) {
    return false;
  }
};

export const markProductsAsPurchased = (productIds: number | number[]): void => {
  if (typeof window === 'undefined') return;
  try {
    const idsToAdd = Array.isArray(productIds) ? productIds : [productIds];
    const raw = localStorage.getItem(STORAGE_PURCHASED_KEY);
    const current: number[] = raw ? JSON.parse(raw) : [];
    const set = new Set([...current, ...idsToAdd]);
    localStorage.setItem(STORAGE_PURCHASED_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.error('Error marking products as purchased', e);
  }
};

export const verifyPastPurchase = (identifier: string, productId: number): boolean => {
  const clean = identifier.trim();
  if (clean.length >= 4) {
    markProductsAsPurchased(productId);
    return true;
  }
  return false;
};
