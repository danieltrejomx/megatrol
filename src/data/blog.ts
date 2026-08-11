export interface BlogArticle {
  id: number;
  slug: string;
  date: string;
  category: string;
  emoji: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  heroColor: string;
  content: {
    type: 'paragraph' | 'heading' | 'list' | 'tip' | 'warning' | 'product-cta';
    text?: string;
    items?: string[];
    productSlug?: string;
    productName?: string;
  }[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: 'como-identificar-si-mi-perro-tiene-pulgas',
    date: '15 Jul 2026',
    category: 'Salud Canina',
    emoji: '🐶',
    title: '¿Cómo identificar si mi perro tiene pulgas?',
    excerpt: 'Aprende las señales más comunes para detectar a tiempo una infestación y cómo tratarla rápidamente con soluciones naturales.',
    readTime: '5 min',
    author: 'Dra. Mariana Valdés',
    authorRole: 'Médico Veterinario Zootecnista',
    authorAvatar: '👩‍⚕️',
    heroColor: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
    content: [
      {
        type: 'paragraph',
        text: 'Las pulgas son uno de los parásitos externos más comunes que afectan a los perros en México y el mundo. Detectarlas a tiempo es clave para evitar una infestación tanto en tu mascota como en tu hogar.'
      },
      {
        type: 'heading',
        text: '¿Cuáles son las señales de alerta?'
      },
      {
        type: 'paragraph',
        text: 'Tu perro puede tener pulgas incluso si no las ves directamente. Las pulgas se mueven rápidamente y prefieren esconderse en zonas cálidas y con poca luz. Aquí te dejamos los síntomas más frecuentes:'
      },
      {
        type: 'list',
        items: [
          '🔴 Rascado excesivo, especialmente en la cabeza, cuello y base de la cola',
          '🔴 Mordisqueo constante de la piel o intentos de lamerse en zonas específicas',
          '🔴 Pelaje con "puntitos negros" (heces de pulga, también llamadas "tierra de pulgas")',
          '🔴 Costras o rojeces en la piel, especialmente en el abdomen',
          '🔴 Pérdida de pelo en zonas localizadas',
          '🔴 Inquietud, nerviosismo o agitación sin causa aparente',
          '🔴 Anemia en cachorros o perros pequeños (encías pálidas)'
        ]
      },
      {
        type: 'heading',
        text: '¿Cómo confirmar la presencia de pulgas?'
      },
      {
        type: 'paragraph',
        text: 'Existe un truco sencillo y efectivo: coloca a tu perro sobre una tela blanca o papel blanco y pásale un peine fino o cepillo. Si observas pequeñas partículas oscuras que al humedecerse con agua dejan manchas rojizas, se trata de heces de pulga (sangre digerida). Este es un indicador definitivo de infestación.'
      },
      {
        type: 'tip',
        text: '💡 Tip de experta: Revisa especialmente detrás de las orejas, la ingle, la axila y la base de la cola. Son las zonas favoritas de las pulgas por ser cálidas y menos accesibles para que el perro se rasque.'
      },
      {
        type: 'heading',
        text: '¿Por qué usar una solución natural?'
      },
      {
        type: 'paragraph',
        text: 'Muchos antiparasitarios convencionales contienen organofosforados y piretroides sintéticos que, aunque efectivos, pueden generar toxicidad en animales sensibles, cachorros, hembras gestantes o razas con predisposición. La tendencia global en medicina veterinaria se orienta hacia formulaciones botánicas de grado farmacéutico que eliminan los parásitos sin dañar al animal.'
      },
      {
        type: 'paragraph',
        text: 'Las formulaciones a base de monoterpenos cíclicos como el D-Limoneno, el Linalol y el aceite de Neem actúan disolviendo la cutícula del parásito y bloqueando su sistema neuroendocrino, sin generar resistencia ni afectar a la mascota.'
      },
      {
        type: 'heading',
        text: '¿Cómo tratar la infestación?'
      },
      {
        type: 'list',
        items: [
          '✅ Aplica un spray antiparasitario de grado veterinario directamente sobre el pelaje',
          '✅ Lava la cama, cojines y ropa de cama del perro con agua caliente',
          '✅ Aspira alfombras, muebles y rincones de la casa',
          '✅ Aplica un producto ambiental en tu hogar para eliminar huevos y larvas',
          '✅ Repite el tratamiento a los 15 y 30 días para romper el ciclo biológico completo',
          '✅ Consulta a tu veterinario si observas síntomas de alergia severa o anemia'
        ]
      },
      {
        type: 'warning',
        text: '⚠️ Importante: Las pulgas pueden sobrevivir en tu hogar hasta 3 meses sin alimentarse. Tratar solo al perro sin desinfectar el ambiente puede generar reinfestaciones constantes. ¡Trata a la mascota y el entorno al mismo tiempo!'
      },
      {
        type: 'product-cta',
        productSlug: 'spray-antipulgas',
        productName: 'Megatrol Spray Antiparasitario'
      }
    ]
  },

  {
    id: 2,
    slug: 'el-poder-del-aceite-de-neem-en-veterinaria',
    date: '02 Jul 2026',
    category: 'Ciencia & Naturaleza',
    emoji: '🌿',
    title: 'El poder del Aceite de Neem en veterinaria',
    excerpt: 'Descubre por qué este extracto natural es la clave para la prevención ecológica contra parásitos en perros y gatos.',
    readTime: '6 min',
    author: 'Dr. Roberto Castañeda',
    authorRole: 'Farmacéutico Veterinario – Inobazz Pharma',
    authorAvatar: '👨‍🔬',
    heroColor: 'linear-gradient(135deg, #d9f99d 0%, #bef264 50%, #a3e635 100%)',
    content: [
      {
        type: 'paragraph',
        text: 'El Azadirachta indica, conocido popularmente como árbol de Neem, ha sido utilizado durante milenios en la medicina ayurvédica de la India. Sus semillas producen un aceite extraordinariamente rico en azadirachtina, nimbin y nimbidina, compuestos que han revolucionado la agricultura orgánica y, más recientemente, la medicina veterinaria moderna.'
      },
      {
        type: 'heading',
        text: '¿Cómo actúa el Neem sobre los parásitos?'
      },
      {
        type: 'paragraph',
        text: 'El mecanismo de acción del aceite de Neem es fascinante y multidimensional. A diferencia de los insecticidas sintéticos que atacan un único blanco biológico, el Neem actúa en varios frentes simultáneamente:'
      },
      {
        type: 'list',
        items: [
          '🌱 Inhibición de la ecdisona: bloquea la hormona que regula la muda de los insectos, impidiendo que huevos y larvas completen su desarrollo',
          '🌱 Efecto antialimentario: las pulgas y garrapatas rechazan alimentarse en animales tratados con Neem',
          '🌱 Esterilidad inducida: reduce la fertilidad de adultos que logran sobrevivir el contacto inicial',
          '🌱 Repelencia: crea una barrera olfativa y cuticular que aleja nuevos parásitos',
          '🌱 Acción antiinflamatoria: alivia la irritación de la piel producida por las picaduras'
        ]
      },
      {
        type: 'tip',
        text: '🔬 Dato científico: La azadirachtina (principio activo del Neem) está clasificada en la categoría de riesgo más baja por la EPA (Agencia de Protección Ambiental de EE.UU.) y es biodegradable al 100%, sin dejar residuos tóxicos en el medioambiente.'
      },
      {
        type: 'heading',
        text: '¿Es seguro para perros y gatos?'
      },
      {
        type: 'paragraph',
        text: 'En formulaciones de grado veterinario y con las concentraciones adecuadas, el aceite de Neem es completamente seguro para caninos y felinos. La clave está en la purificación del aceite y la correcta formulación farmacéutica. Un aceite de Neem crudo puede irritar la piel o generar toxicidad si no se procesa adecuadamente. Por eso, los productos veterinarios que lo contienen deben estar desarrollados en laboratorios certificados con estándares farmacéuticos.'
      },
      {
        type: 'warning',
        text: '⚠️ Precaución: Los gatos son más sensibles a los terpenos. Si tienes felinos en casa, asegúrate de usar exclusivamente productos formulados y aprobados específicamente para gatos. Nunca apliques en gatos productos diseñados solo para perros.'
      },
      {
        type: 'heading',
        text: 'Neem + Monoterpenos: La combinación ganadora'
      },
      {
        type: 'paragraph',
        text: 'En Inobazz Pharma hemos desarrollado una fórmula que potencia los beneficios del Neem combinándolo con monoterpenos cíclicos como el D-Limoneno (de cítricos), el Linalol (de lavanda) y el Terpinen-4-ol (de árbol de té). Esta combinación genera una acción sinérgica que amplifica el efecto antiparasitario hasta 3 veces comparado con el uso individual de cada componente.'
      },
      {
        type: 'heading',
        text: '¿Para qué parásitos funciona?'
      },
      {
        type: 'list',
        items: [
          '🎯 Pulgas (Ctenocephalides felis y C. canis) – adultos, huevos y larvas',
          '🎯 Garrapatas (Rhipicephalus, Amblyomma, Dermacentor)',
          '🎯 Piojos masticadores y chupadores',
          '🎯 Ácaros de la sarna (Sarcoptes scabiei)',
          '🎯 Mosca de los establos (Stomoxys calcitrans)',
          '🎯 Mosquitos y jejenes (acción repelente)'
        ]
      },
      {
        type: 'product-cta',
        productSlug: 'spray-antipulgas',
        productName: 'Megatrol Spray con Neem & Monoterpenos'
      }
    ]
  },

  {
    id: 3,
    slug: 'protegiendo-a-tu-gato-lo-que-debes-saber',
    date: '20 Jun 2026',
    category: 'Salud Felina',
    emoji: '🐱',
    title: 'Protegiendo a tu gato: lo que debes saber',
    excerpt: 'Los gatos son más sensibles a ciertos químicos. Conoce cómo protegerlos de forma segura con la línea Megatrol.',
    readTime: '7 min',
    author: 'MVZ Sofía Guerrero',
    authorRole: 'Especialista en Medicina Felina',
    authorAvatar: '👩‍⚕️',
    heroColor: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
    content: [
      {
        type: 'paragraph',
        text: 'Los gatos son criaturas extraordinariamente sensibles desde el punto de vista farmacológico. A diferencia de los perros, los felinos carecen de ciertas enzimas hepáticas —especialmente la glucuronil transferasa— que metabolizan y eliminan compuestos que son inocuos para otras especies. Esta particularidad los hace vulnerables a muchos productos que se consideran seguros para perros.'
      },
      {
        type: 'heading',
        text: '¿Por qué los gatos son tan sensibles?'
      },
      {
        type: 'paragraph',
        text: 'La biología única del gato tiene origen evolutivo. Al ser carnívoros estrictos, sus ancestros nunca tuvieron contacto con plantas que producen ciertos compuestos fenólicos, por lo que jamás desarrollaron las enzimas necesarias para procesarlos. Esto significa que sustancias comunes como la aspirina, el paracetamol, o incluso algunos aceites esenciales pueden ser letales para ellos en dosis que serían completamente seguras para un perro o un humano.'
      },
      {
        type: 'warning',
        text: '⚠️ NUNCA uses en gatos: productos con Permetrina (muy común en antiparasitarios caninos), aceite de árbol de té sin diluir, aceite de eucalipto, citronela en altas concentraciones, ni cualquier producto que no especifique expresamente "apto para gatos".'
      },
      {
        type: 'heading',
        text: 'Señales de intoxicación en gatos'
      },
      {
        type: 'paragraph',
        text: 'Si aplicaste accidentalmente un producto inadecuado o tu gato tuvo contacto con uno, reconoce estos síntomas de emergencia:'
      },
      {
        type: 'list',
        items: [
          '🚨 Temblores musculares o convulsiones',
          '🚨 Salivación excesiva o espuma en la boca',
          '🚨 Dificultad para caminar o pérdida de coordinación',
          '🚨 Dilatación de pupilas',
          '🚨 Vómitos repetidos',
          '🚨 Letargo extremo o pérdida de conciencia',
          '🚨 Respiración dificultosa'
        ]
      },
      {
        type: 'tip',
        text: '🆘 Si sospechas intoxicación: lava inmediatamente la zona con agua tibia y jabón neutro, SIN frotar. Lleva a tu gato al veterinario de emergencia. No induzcas el vómito sin supervisión veterinaria. El tiempo es crítico.'
      },
      {
        type: 'heading',
        text: '¿Cómo proteger a tu gato correctamente?'
      },
      {
        type: 'paragraph',
        text: 'La buena noticia es que existen excelentes opciones formuladas específicamente para felinos. En Inobazz Pharma desarrollamos productos con formulaciones que respetan la bioquímica del gato, usando concentraciones controladas de principios activos botánicos que han sido probados en estudios de seguridad felina.'
      },
      {
        type: 'list',
        items: [
          '✅ Usa solo productos etiquetados específicamente para gatos',
          '✅ Consulta siempre a tu veterinario antes de cambiar de tratamiento',
          '✅ Mantén al día las visitas preventivas y la revisión de parásitos',
          '✅ Revisa regularmente el pelaje, especialmente detrás de orejas y axilas',
          '✅ Desinfecta el entorno: camas, rascadores, transportadoras',
          '✅ Si tienes perros y gatos, nunca uses el producto del perro en el gato'
        ]
      },
      {
        type: 'heading',
        text: 'El tratamiento del hogar es igual de importante'
      },
      {
        type: 'paragraph',
        text: 'Recuerda que el 95% de una infestación de pulgas no está en tu mascota, sino en el ambiente: en alfombras, muebles, grietas del piso y camas. Tratar solo al gato sin desinfectar el hogar asegura una reinfestación en cuestión de días. Usa un producto ambiental compatible mientras el gato no esté en la habitación y ventila bien antes de permitir su regreso.'
      },
      {
        type: 'product-cta',
        productSlug: 'spray-antipulgas',
        productName: 'Megatrol Spray (apto para mascotas y ambiente)'
      }
    ]
  }
];
