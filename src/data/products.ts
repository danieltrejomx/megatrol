export interface AromaOption {
  name: string;
  image?: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  tag: string | null;
  emoji: string;
  image: string;
  desc: string;
  longDesc: string;
  howToUse: string;
  benefits: string[];
  category: 'control' | 'limpieza' | 'prevencion' | 'kit' | 'multivitaminicos' | 'garrapaticidas' | 'farmaceuticos' | 'dermocosmeticos' | 'dermatologicos' | 'urbanidad' | 'aves';
  line: 'Línea Megatrol' | 'Grandes Especies' | 'Pequeñas Especies' | 'Línea Aves' | 'Línea Urbanidad' | 'Higiene y Salud';
  presentation?: string;
  formula?: string;
  administration?: string;
  indications?: string;
  species?: string;
  aromas?: string[];
  aromaImages?: Record<string, string>;
  presentationImages?: Record<string, string>;
  presentationPrices?: Record<string, number | string>;
}

export const products: Product[] = [
  // ── 1. LÍNEA MEGATROL (Antiparasitarios Naturales para Perros y Gatos) ─────────────
  {
    id: 1,
    slug: 'spray-antipulgas',
    name: 'Spray Antipulgas Megatrol (Oficial)',
    price: 349,
    tag: 'Más Vendido',
    emoji: '💧',
    image: '/images/megatrol-spray-oficial.png',
    desc: 'Aplicación directa a contra pelo en el animal y alojamientos contra pulgas, garrapatas y ácaros.',
    longDesc: 'El Spray Antipulgas Megatrol ofrece una solución rápida y efectiva para combatir pulgas, garrapatas, ácaros y piojos. Su fórmula nanoparticulada a base de monoterpenos y Azadirachtina (Neem) actúa directamente sobre el sistema neuroendocrino del parásito adulto y sus larvas. Ideal para aplicar tanto en tu mascota como en su entorno.',
    howToUse: 'Rociar a contra pelo sobre el dorso del animal, asegurándose de que el producto entre en contacto directo con la piel y distribuir suavemente con las manos. Repetir en camas y alojamientos.',
    benefits: ['Eliminación rápida de parásitos adultos y larvas', 'Nanopartículas de Azadirachtina (Neem) de alta penetración', 'Fórmula a base de monoterpenos cíclicos vegetales', 'Sin pesticidas dañinos para la familia', 'Apto para perros, gatos y alojamientos'],
    category: 'control',
    line: 'Línea Megatrol',
    presentation: '30 mL y 155 mL',
    presentationImages: {
      '30 mL': '/images/megatrol-spray-30ml.png',
      '155 mL': '/images/megatrol-spray-155ml.png'
    },
    presentationPrices: {
      '30 mL': 'pendiente',
      '155 mL': 349
    },
    formula: 'Agua, monoterpenos cíclicos de extracción vegetal, aceites totales de neem (Azadirachtina en nanopartículas), surfactantes activos etoxilados, alcohol hexa-hidroxílico, potenciador de penetrancia y antioxidantes.',
    administration: 'Tópica directa a contra pelo y ambiental.',
    indications: 'Indicado para infestaciones por ectoparásitos como pulgas, garrapatas, ácaros, piojos, etc. Para uso directo en el animal y en los alojamientos.',
    species: 'Perros y Gatos'
  },
  {
    id: 2,
    slug: 'shampoo-antipulgas',
    name: 'Shampoo Antipulgas Megatrol (Oficial)',
    price: 249,
    tag: 'Ecológico Sustentable',
    emoji: '🧴',
    image: '/images/megatrol-shampoo-portada.png',
    desc: 'Complejo nanoparticulado de neem, monoterpenos vegetales, ceramidas y vitamina E.',
    longDesc: 'El Shampoo Antipulgas Megatrol combina la higiene regular con el poder antiparasitario de su complejo nanoparticulado de extracto de neem y monoterpenos botánicos. Enriquecido con ceramidas y vitamina E para fortalecer la barrera dérmica y dejar el pelaje suave, brillante y protegido.',
    howToUse: 'Moja completamente el pelaje con agua tibia. Aplica shampoo dando masaje en círculos por todo el cuerpo. Deja actuar 5 minutos y enjuaga con abundante agua.',
    benefits: ['Limpieza profunda y acción antiparasitaria en el acto', 'Enriquecido con Ceramidas y Vitamina E', 'Complejo nanoparticulado de extracto de Neem', 'Deja el pelaje suave, nutrido y con brillo sedoso', 'Apto para infestaciones leves, moderadas y graves'],
    category: 'limpieza',
    line: 'Línea Megatrol',
    presentation: '250 mL y Galón 4 L',
    presentationImages: {
      '250 mL': '/images/megatrol-shampoo-250ml.png',
      'Galón 4 L': '/images/megatrol-shampoo-4l.png'
    },
    presentationPrices: {
      '250 mL': 249,
      'Galón 4 L': 1697
    },
    formula: 'Complejo nanoparticulado de extracto de neem, monoterpenos de extracción vegetal, ceramidas y vitamina E.',
    administration: 'Tópica en baño regular.',
    indications: 'Está indicado para infestaciones leves, moderadas y graves por ectoparásitos como pulgas, piojos, garrapatas, ácaros, etc. Para uso regular en la higiene de la mascota.',
    species: 'Perros y Gatos'
  },
  {
    id: 3,
    slug: 'talco-ecologico',
    name: 'Talco Ecológico Megatrol (80 g)',
    price: 199,
    tag: 'Ecológico',
    emoji: '🌿',
    image: '/images/megatrol-talco-80g.png',
    desc: 'Talco de aplicación directa sin necesidad de baño contra pulgas, garrapatas y ácaros.',
    longDesc: 'El Talco Ecológico Megatrol es la opción ideal para mascotas con pieles delicadas o para quienes prefieren una aplicación en seco. Formulado en microesferas sólidas con nanopartículas de Neem y terpenoides botánicos, protege de forma prolongada sin mojar a tu mascota.',
    howToUse: 'Aplicar el talco directamente sobre el pelaje seco de tu mascota, distribuyéndolo desde la raíz hasta las puntas. Masajear suavemente para asegurar un cubrimiento uniforme.',
    benefits: ['Protección prolongada de larga duración', 'Ideal para cachorros y mascotas con aversión al agua', 'Con Nanopartículas de Azadirachtina en microesferas', 'Absorbe humedad y previene olores', 'Fácil de aplicar en seco'],
    category: 'prevencion',
    line: 'Línea Megatrol',
    presentation: 'Bote talquera con 80 g',
    formula: 'Terpenoides cíclicos de extracción vegetal, aceites totales de neem (Azadirachtina en nanopartículas) formulado en microesferas sólidas.',
    administration: 'Tópica en seco.',
    indications: 'Indicado para el tratamiento y protección de perros y gatos contra infestaciones de pulgas, garrapatas y piojos.',
    species: 'Perros y Gatos'
  },
  {
    id: 4,
    slug: 'jabon-antipulgas',
    name: 'Jabón Antipulgas Megatrol (120 g)',
    price: 129,
    tag: 'Ecológico Sustentable',
    emoji: '🧼',
    image: '/images/megatrol-jabon-oficial.png',
    desc: 'Jabón antiparasitario con práctica jabonera. Elimina eficazmente pulgas, piojos y ácaros.',
    longDesc: 'El Jabón Antipulgas Megatrol Oficial está formulado con monoterpenos botánicos, nanopartículas de Neem y manteca de karité. Ofrece una limpieza profunda dejando el pelaje suave, sedoso y con un aroma fresco y natural. Incluye práctica jabonera que reduce el desperdicio.',
    howToUse: 'Moja el pelaje con agua tibia. Frota el jabón generando abundante espuma cremosa. Deja actuar de 3 a 5 minutos y enjuaga con abundante agua.',
    benefits: ['Elimina eficazmente pulgas, piojos y ácaros', 'Pelaje sedoso y suave con manteca de karité', 'Agradable aroma herbal natural', 'Incluye práctica jabonera que evita desperdicios', '100% ecológico y biodegradable'],
    category: 'limpieza',
    line: 'Línea Megatrol',
    presentation: 'Pastilla de 120 g con jabonera',
    formula: 'Monoterpenos cíclicos de extracción vegetal, aceites totales de neem (Azadirachtina en nanopartículas), surfactantes etoxilados, potenciador de penetrancia, antioxidantes y manteca de karité.',
    administration: 'Tópica en baño.',
    indications: 'Indicado en infestaciones leves, moderadas y graves por ectoparásitos como pulgas, ácaros y piojos.',
    species: 'Perros y Gatos'
  },
  {
    id: 5,
    slug: 'kit-proteccion-total',
    name: 'Kit Protección Total Megatrol',
    price: 599,
    tag: 'Oferta Especial',
    emoji: '📦',
    image: '/images/5.png',
    desc: 'Spray + Shampoo + Jabón. La protección completa para tu mascota al mejor precio.',
    longDesc: 'El Kit Protección Total Megatrol reúne los tres productos más poderosos de la línea en un solo paquete de máximo valor. Spray para el control activo diario, Shampoo para el baño y Jabón para la rutina clásica. Juntos rompen el ciclo de vida del parásito de forma integral y definitiva.',
    howToUse: 'Usa el Jabón o Shampoo en el baño semanal. Aplica el Spray 2-3 veces por semana sobre el pelaje y el entorno (cama, jaula). Combina los tres productos para una protección 360°.',
    benefits: ['Incluye Spray + Shampoo + Jabón', 'Protección 360° contra todos los ectoparásitos', 'Ahorra hasta 30% vs compra individual', 'Rompe el ciclo completo del parásito', 'Recomendado por veterinarios'],
    category: 'kit',
    line: 'Línea Megatrol',
    presentation: 'Kit 3 Piezas (Spray 155mL + Shampoo 250mL + Jabón 120g)',
    formula: 'Línea completa vegetal antiparasitaria con monoterpenos y Neem.',
    administration: 'Tratamiento integral.',
    species: 'Perros y Gatos'
  },

  // ── 2. GRANDES ESPECIES (Ganadería y Equinos) ─────────────────,

  // ── 2. PEQUEÑAS ESPECIES (Salud, Nutrición y Cuidado para Perros y Gatos) ───────────
  {
    id: 22,
    slug: 'megadoxi',
    name: 'Megadoxi (Suspensión Oral)',
    price: 220,
    tag: 'Antibiótico Oral',
    emoji: '🐶',
    image: '/images/megadoxi.png',
    desc: 'Suspensión oral de Doxiciclina 10mg/mL para infecciones bacterianas y Erliquiosis.',
    longDesc: 'MEGADOXI es un antibiótico oral en suspensión a base de Doxiciclina formulado específicamente para perros y gatos. Indicado para el tratamiento de infecciones bacterianas del tracto respiratorio, gastrointestinal, genitourinario, erliquiosis canina y enfermedades dérmicas.',
    howToUse: 'Administrar por vía oral directamente en el hocico con la jeringa graduada dosificadora.',
    benefits: [
      'Antibiótico oral de amplio espectro de alta absorción',
      'Tratamiento de primera línea para Ehrlichia canis (Erliquiosis)',
      'Excelente penetración en vías respiratorias y urogenitales',
      'Sabor altamente palatable para perros y gatos',
      'Incluye jeringa graduada dosificadora'
    ],
    category: 'farmaceuticos',
    line: 'Pequeñas Especies',
    presentation: 'Frasco de 60 mL con jeringa dosificadora',
    formula: 'Cada mL contiene Doxiciclina 10 mg y excipientes c.b.p. 1 mL.',
    administration: 'Oral.',
    indications: 'Indicado para infecciones bacterianas en perros y gatos, del tracto respiratorio, gastrointestinal, genitourinario y enfermedades dérmicas.',
    species: 'Perros y Gatos'
  },
  {
    id: 23,
    slug: 'megadoxi-plus',
    name: 'Megadoxi Plus',
    price: 250,
    tag: 'Antibiótico & Mucolítico',
    emoji: '🐱',
    image: '/images/megadoxi-plus.png',
    desc: 'Doxiciclina 10mg + Bromhexina 1mg. Antibiótico, mucolítico y expectorante oral.',
    longDesc: 'MEGADOXI PLUS combina la potencia antimicrobiana de la Doxiciclina con la acción mucolítica y expectorante de la Bromhexina. Indicado para neumonía, bronconeumonía, traqueobronquitis (tos de las perreras) y cuadros respiratorios infecciosos con secreción y congestión bronquial.',
    howToUse: 'Administrar por vía oral con la jeringa dosificadora según el peso de la mascota.',
    benefits: [
      'Doble acción: Antibiótico + Mucolítico / Expectorante',
      'Disuelve flemas y secreciones bronquiales facilitando la respiración',
      'Efectivo contra Bordetella, Micoplasma y bacterias respiratorias',
      'Alivio rápido de tos, congestión y dificultad respiratoria',
      'Fácil administración con jeringa graduada'
    ],
    category: 'farmaceuticos',
    line: 'Pequeñas Especies',
    presentation: 'Frasco de 60 mL con jeringa dosificadora',
    formula: 'Cada mL contiene Doxiciclina 10 mg, Bromhexina 1 mg, Excipiente c.b.p. 1 mL.',
    administration: 'Oral.',
    indications: 'Para el tratamiento de neumonía, bronconeumonía, bronquitis y traqueobronquitis causadas por bacterias sensibles a la doxiciclina y síntomas congestivos.',
    species: 'Perros y Gatos'
  },
  {
    id: 24,
    slug: 'dermapet-shampoo',
    name: 'Dermapet Shampoo Dermatológico',
    price: 270,
    tag: 'Medicamento Dermatológico',
    emoji: '🧴',
    image: '/images/dermapet-shampoo.png',
    desc: 'Shampoo medicado con Ácido Salicílico, Azufre Orgánico y Timol para afecciones de la piel.',
    longDesc: 'DERMAPET SHAMPOO DERMATOLÓGICO es un shampoo medicado formulado para el tratamiento integral de dermatitis seborreica, atópica, micótica, piotraumática, eccemas, dermatofitosis, acné canino y pioderma.',
    howToUse: 'Mojar el pelaje con agua tibia. Aplicar shampoo dando masaje suave. Dejar actuar de 5 a 10 minutos y enjuagar.',
    benefits: [
      'Eficaz contra dermatitis seborreica, atópica, micótica y pioderma',
      'Con Ácido Salicílico queratolítico y Azufre Orgánico purificante',
      'Timol, Eucaliptol y Aceite de Neem con potente acción antiséptica',
      'Alivia comezón intensa, enrojecimiento y descamaciones',
      'Enriquecido con Vitamina E y emolientes hidratantes'
    ],
    category: 'dermatologicos',
    line: 'Pequeñas Especies',
    presentation: '250 mL y Galón 4 L',
    presentationImages: {
      '250 mL': '/images/dermapet-250ml.png',
      'Galón 4 L': '/images/dermapet-4l.png'
    },
    presentationPrices: {
      '250 mL': 270,
      'Galón 4 L': 'pendiente'
    },
    formula: 'Ácido salicílico, eucaliptol, aceite de neem, azufre orgánico, cocamidopropil betaína, timol, EDTA, vitamina E, emolientes, hidratantes y agua desionizada.',
    administration: 'Tópica.',
    indications: 'Indicado para dermatitis seborreica, atópica, micótica, piotraumática, heridas, eccemas, dermatofitosis, acné y pioderma.',
    species: 'Perros y Gatos con problemas dérmicos'
  },
  {
    id: 25,
    slug: 'megastrin',
    name: 'Megastrin Suspensión Oral',
    price: 260,
    tag: 'Antidiarreico & Antimicrobiano',
    emoji: '🥣',
    image: '/images/megastrin.png',
    desc: 'Suspensión oral antidiarreica de amplio espectro con Gentamicina, Loperamida, Caolín y Pectina.',
    longDesc: 'MEGASTRIN es una suspensión oral antimicrobiana y antidiarreica de amplio espectro para perros y gatos. Su fórmula de alta tecnología combina Gentamicina y Colistina bactericidas, Loperamida regulador de motilidad, y Caolín-Pectina protectores de la mucosa gastrointestinal.',
    howToUse: 'Administrar por vía oral directamente en la cavidad bucal con la jeringa dosificadora incluida.',
    benefits: [
      'Alivio rápido de diarreas bacterianas, infecciosas y mecánicas',
      'Gentamicina y Colistina contra bacterias Gram positivas y Gram negativas',
      'Loperamida regulador del tránsito intestinal',
      'Caolín y Pectina protectores y adsorbentes de toxinas entéricas',
      'Incluye jeringa dosificadora para administración exacta'
    ],
    category: 'farmaceuticos',
    line: 'Pequeñas Especies',
    presentation: 'Frasco de 60 mL con jeringa dosificadora',
    formula: 'Cada mL contiene Gentamicina (base) 12 mg, Loperamida HCl 0.5 mg, Caolín 100 mg, Pectina 10 mg, Colistina (sulfato) 250,000 U.I. y Vehículo 1 mL.',
    administration: 'Oral.',
    indications: 'Suspensión oral antidiarreica para enteritis y diarreas mecánicas e infecciosas, a la vez que protege la mucosa gastrointestinal.',
    species: 'Perros y Gatos'
  },
  {
    id: 26,
    slug: 'balance-pet-adultos',
    name: 'Balance Pet Adultos',
    price: 330,
    tag: 'Adultos & Articulaciones',
    emoji: '🐕',
    image: '/images/balance-pet-adultos.png',
    desc: 'Suplemento nutricional con Omega 3 (EPA/DHA), Colina, Vitaminas y Minerales.',
    longDesc: 'BALANCE PET ADULTOS es un suplemento nutricional de grado premium para perros y gatos adultos. Su fórmula optimizada con ácidos grasos Omega 3 (EPA, DHA, DPA), Complejo B completo, Vitaminas A, D3, E, C, K y minerales quelatados mantiene la piel sana, el pelaje brillante y apoya en la prevención de artritis.',
    howToUse: 'Administrar diariamente directamente en el hocico de la mascota o mezclado con su alimento habitual.',
    benefits: [
      'Piel sana y pelaje brillante y sedoso',
      'Con ácidos grasos Omega 3 (EPA, DHA, DPA) antiinflamatorios',
      'Apoyo preventivo y terapéutico para articulaciones y artritis',
      'Refuerza el sistema inmunológico en etapa adulta',
      'Tabletas masticables de exquisito sabor cárnico'
    ],
    category: 'multivitaminicos',
    line: 'Pequeñas Especies',
    presentation: 'Frasco con 60 tabletas',
    formula: 'Vitamina A, D3, E, C, K, B1, B2, B3, B5, B6, B7, B9, B12, Colina, Hierro, Zinc, Cobalto, Magnesio, Selenio, Calcio, Sodio, Fósforo, Cobre, Omega 3 (EPA, DHA, DPA).',
    administration: 'Oral (solo o con alimento).',
    indications: 'Complemento dietético para mejorar piel y pelaje, sistema inmune, y coadyuvante en artritis y problemas dermatológicos.',
    species: 'Perros y Gatos Adultos'
  },
  {
    id: 27,
    slug: 'vita-pet',
    name: 'Vita-Pet',
    price: 280,
    tag: 'Pequeñas Especies',
    emoji: '🐶',
    image: '/images/vitapet.png',
    desc: 'Suplemento nutricional y regenerador de cartílago en pasta oral para perros y gatos.',
    longDesc: 'VITA-PET es un suplemento energético y nutricional altamente palatable en pasta oral para perros y gatos. Su fórmula balanceada integra multivitaminas, minerales quelatados, aminoácidos esenciales, polifenoles naturales antioxidantes y Colágeno Bioactivo.',
    howToUse: 'Administrar directamente en el hocico de la mascota o mezclado con su alimento.',
    benefits: [
      'Alta palatabilidad: fácil de administrar a perros y gatos',
      'Contiene Colágeno Bioactivo para regeneración articular y movilidad',
      'Polifenoles naturales con potente acción antioxidante',
      'Complejo multivitamínico A, D3, E y vitaminas del complejo B',
      'Refuerza defensas, vitalidad y brillo en el pelaje'
    ],
    category: 'multivitaminicos',
    line: 'Pequeñas Especies',
    presentation: 'Pasta Oral 120 g',
    formula: 'Vitamina A, D3, E, B1, B2, B3, B6, B9, B12, Minerales quelatados (I, Na, Co, Mg, Ca, Zn), 10 Aminoácidos, Colágeno bioactivo, Polifenoles.',
    administration: 'Oral.',
    indications: 'Suplemento energético, nutricional y dietético para el sistema inmune y regeneración del cartílago.',
    species: 'Perros y Gatos'
  },
  {
    id: 28,
    slug: 'shower-shampoo-aromas',
    name: 'Shower Shampoo Aromas',
    price: 210,
    tag: 'Ecológico',
    emoji: '🍑',
    image: '/images/shower-shampoo-aromas.png',
    desc: 'Shampoo ecológico para perros y gatos en 4 aromas: Durazno, Baby, Fresa y Chicle.',
    aromas: ['🍑 Durazno', '👶 Baby', '🍓 Fresa', '🍬 Chicle'],
    aromaImages: {
      '🍑 Durazno': '/images/shower-shampoo-durazno.png',
      '👶 Baby': '/images/shower-shampoo-baby.png',
      '🍓 Fresa': '/images/shower-shampoo-fresa.png',
      '🍬 Chicle': '/images/shower-shampoo-chicle.png'
    },
    longDesc: 'SHOWER SHAMPOO AROMAS es una línea dermatológica biodegradable diseñada para perros y gatos de todas las razas y edades. Formulado con extractos de aloe vera, avena y manteca de karité.',
    howToUse: 'Mojar el pelaje con agua tibia. Aplicar shampoo y masajear de 3 a 5 minutos y enjuagar.',
    benefits: [
      'Disponible en 4 deliciosos aromas: Durazno, Baby, Fresa y Chicle',
      'Enriquecido con Avena, Aloe Vera y Manteca de Karité',
      'No remueve la grasa protectora natural del pelaje',
      '100% libre de sulfatos agresivos e hipoalergénico',
      'Producto ecológico y sustentable'
    ],
    category: 'dermocosmeticos',
    line: 'Pequeñas Especies',
    presentation: '250 mL y Galón 4 L',
    formula: 'Agua desionizada, tensoactivos anfóteros de origen natural, extracto de aloe vera, avena, manteca de karité, fragancia.',
    administration: 'Tópica.',
    indications: 'Indicado para perros y gatos de cualquier raza y edad. No provoca irritaciones.',
    species: 'Perros y Gatos'
  },
  {
    id: 29,
    slug: 'pet-shower-shampoo',
    name: 'Pet-Shower Shampoo (Piel Sensible)',
    price: 250,
    tag: 'Bajo Potencial Alergénico',
    emoji: '🛁',
    image: '/images/pet-shower-shampoo.png',
    desc: 'Shampoo dermatológico hidratante para dermatitis alérgica, remoción de costras y pelaje fuerte.',
    longDesc: 'PET-SHOWER SHAMPOO está especialmente formulado para mascotas con dermatitis alérgica, resequedad o sensibilidad cutánea extrema. Su microemulsión con manteca de karité, proteína de seda, vitamina E y germen de trigo reestructura la barrera dérmica.',
    howToUse: 'Aplicar sobre pelaje húmedo, masajear 5 minutos y enjuagar con agua tibia.',
    benefits: [
      'Fórmula de bajo potencial alergénico para dermatitis y alergias',
      'Hidrata la capa más superficial de la piel y restaura la barrera cutánea',
      'Con Proteína de Seda, Manteca de Karité, Vitamina E y Germen de Trigo',
      'Facilita la remoción mecánica de costras y descamaciones',
      'Deja el pelaje fuerte, sedoso y brillante en un solo paso'
    ],
    category: 'dermocosmeticos',
    line: 'Pequeñas Especies',
    presentation: '200 mL, 250 mL y Galón 4 L',
    formula: 'Base de microemulsión de tensioactivos anfotéricos naturales, manteca de karité, proteína de seda, vitamina E, germen de trigo.',
    administration: 'Tópica.',
    indications: 'Restaura la salud de la piel en casos de dermatitis alérgica, hidratación y fortalecimiento del pelaje.',
    species: 'Perros y Gatos con Piel Sensible'
  },
  {
    id: 30,
    slug: 'desmugrass-pet-shampoo',
    name: 'Desmugrass Pet Shampoo',
    price: 230,
    tag: 'Limpieza Profunda',
    emoji: '🧼',
    image: '/images/desmugrass.png',
    desc: 'Shampoo desengrasante auxiliar para manchas difíciles de grasa, aceite, lodo y tierra.',
    longDesc: 'DESMUGRASS PET SHAMPOO es un shampoo de uso ocasional formulado para eliminar suciedad extrema, manchas de grasa mecánica, aceite, savia, tierra y lodo rebelde del pelaje de perros y gatos.',
    howToUse: 'Aplicar directamente sobre las áreas con grasa o lodo, masajear vigorosamente y enjuagar.',
    benefits: [
      'Disuelve y remueve manchas difíciles de grasa, aceite y lodo',
      'Fórmula con nanoemulsión de terpenos y tensoactivos anfóteros',
      'Enriquecido con aloe vera y manteca de karité para dar brillo y fortaleza',
      'Inocuo y seguro para perros y gatos de todas las razas',
      'Ideal para mascotas activas o de campo'
    ],
    category: 'dermocosmeticos',
    line: 'Pequeñas Especies',
    presentation: '60 mL, 200 mL, 250 mL y 1 L',
    formula: 'Agua desionizada, tensoactivas anfifílicas, nanoemulsión de terpenos, extracto de aloe vera, acondicionador y manteca de karité.',
    administration: 'Tópica. Uso ocasional.',
    indications: 'Auxiliar para el pelaje de tu mascota, dejándolo limpio de manchas de aceite, grasa, lodo y tierra.',
    species: 'Perros y Gatos'
  },
  {
    id: 31,
    slug: 'balsamo-silkpaw',
    name: 'Bálsamo SilkPaw',
    price: 190,
    tag: 'Reparador',
    emoji: '🐾',
    image: '/images/silkpaw.png',
    desc: 'Bálsamo ultra-humectante y reparador para almohadillas, nariz reseca y pliegues.',
    longDesc: 'SILKPAW® es un bálsamo dermocosmético ultra-nutritivo formulado para regenerar almohadillas plantares agrietadas, trufas (narices) resecas, callosidades en codos y pliegues cutáneos en perros y gatos.',
    howToUse: 'Limpiar el área y masajear una cantidad generosa sobre la zona afectada de 1 a 3 veces al día.',
    benefits: [
      'Repara y previene grietas en almohadillas y nariz',
      'Con Manteca de Karité, Cera de Soya, Aceite de Coco y Vitamina E',
      'Adicionado con D-Pantenol regenerador celular',
      'Alivio inmediato para callosidades en codos y pliegues faciales',
      'Fórmula 100% no tóxica y segura para mascotas'
    ],
    category: 'dermocosmeticos',
    line: 'Pequeñas Especies',
    presentation: 'Stick de 30 g',
    formula: 'Manteca de Karité, vaselina grado USP, vitamina E, D-pantenol, cera de soya, aceite de coco.',
    administration: 'Vía tópica cutánea.',
    indications: 'Para zona nasal o podal afectada, cojinetes, arrugas, uñas, callosidades y puntos de presión.',
    species: 'Perros y Gatos'
  },
  {
    id: 32,
    slug: 'doxy-10',
    name: 'Doxy-10 (Inyectable)',
    price: 290,
    tag: 'Antibiótico Inyectable',
    emoji: '💊',
    image: '/images/doxy-10.png',
    desc: 'Antibiótico bacteriostático inyectable a base de Doxiciclina 100mg para perros y gatos.',
    longDesc: 'DOXY-10 es un antibiótico bacteriostático de amplio espectro inyectable para pequeñas especies. Indicado en infecciones bacterianas del tracto respiratorio, gastrointestinal, genitourinario y Erliquiosis canina.',
    howToUse: 'Administrar por vía intramuscular o subcutánea bajo supervisión veterinaria.',
    benefits: [
      'Eficacia comprobada contra bacterias Gram positivas y Gram negativas',
      'Tratamiento de elección para Ehrlichia canis (Erliquiosis)',
      'Excelente difusión en tejido respiratorio, dérmico y urogenital',
      'Presentación inyectable de rápida acción sistémica',
      'Alta pureza farmacéutica veterinaria'
    ],
    category: 'farmaceuticos',
    line: 'Pequeñas Especies',
    presentation: 'Frascos de 25 mL y 100 mL',
    formula: 'Cada mL contiene Doxiciclina 100 mg y vehículo c.b.p. 1 mL.',
    administration: 'Intramuscular y subcutánea.',
    indications: 'Infecciones bacterianas del tracto respiratorio, gastrointestinal, genitourinario y enfermedades dérmicas.',
    species: 'Perros y Gatos'
  },
  {
    id: 33,
    slug: 'balance-pet-cachorros',
    name: 'Balance Pet Cachorros',
    price: 320,
    tag: 'Cachorros',
    emoji: '🍼',
    image: '/images/balance-pet-cachorros.png',
    desc: 'Suplemento en tabletas palatables para crecimiento óseo, inmunidad y desarrollo.',
    longDesc: 'BALANCE PET CACHORROS es un suplemento nutricional completo para cachorros y gatitos en crecimiento. Contiene 13 vitaminas, minerales quelatados, 10 aminoácidos esenciales y colágeno bioactivo.',
    howToUse: 'Administrar diariamente directamente en el hocico o triturado sobre el alimento.',
    benefits: [
      'Estimula el crecimiento saludable y la osificación',
      'Refuerza las defensas naturales y el sistema inmune temprano',
      'Con Colágeno Bioactivo y polifenoles antioxidantes',
      'Tabletas masticables de alta palatabilidad',
      'Fórmula balanceada con complejo vitamínico completo'
    ],
    category: 'multivitaminicos',
    line: 'Pequeñas Especies',
    presentation: 'Frasco con 60 tabletas',
    formula: 'Vitamina A, D3, E, C, K, Complejo B, Minerales esenciales, Colágeno bioactivo, Polifenoles y 10 Aminoácidos.',
    administration: 'Oral.',
    indications: 'Suplemento nutricional para crecimiento y sistema inmune.',
    species: 'Perros y Gatos Cachorros'
  },
  {
    id: 34,
    slug: 'balance-pet-geriatricos',
    name: 'Balance Pet Geriátricos',
    price: 350,
    tag: 'Senior / Geriátrico',
    emoji: '🦴',
    image: '/images/balance-pet-geriatricos.png',
    desc: 'Suplemento senior con Silimarina, Omega 3 (EPA/DHA), Probióticos y Colágeno.',
    longDesc: 'BALANCE PET GERIÁTRICOS está formulado específicamente para perros y gatos mayores. Su mezcla con Silimarina, Omega 3, Probióticos, Papaína, L-Carnitina y Colágeno combate el envejecimiento celular.',
    howToUse: 'Administrar diariamente directamente en el hocico o mezclado con el alimento regular.',
    benefits: [
      'Retarda los signos de envejecimiento y deterioro celular',
      'Con Silimarina para protección y regeneración hepática',
      'Ácidos grasos Omega 3 (EPA, DHA, DPA, GLA) para salud cerebral',
      'Con Probióticos y Papaína para digestión óptima en mascotas senior',
      'Colágeno Bioactivo para alivio articular y movilidad'
    ],
    category: 'multivitaminicos',
    line: 'Pequeñas Especies',
    presentation: 'Frasco con 60 tabletas',
    formula: 'Vitamina A, E, C, Complejo B, Minerales, Colágeno bioactivo, Polifenoles, Silimarina, EPA, DHA, DPA, GLA, Probióticos, Papaína, Carnitina.',
    administration: 'Oral.',
    indications: 'Suplemento nutricional para mascotas adultas y mayores. Reduce desgaste por estrés y retarda envejecimiento.',
    species: 'Perros y Gatos Senior'
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
