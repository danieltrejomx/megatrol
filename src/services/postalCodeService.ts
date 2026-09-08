export interface PostalCodeResult {
  cp: string;
  estado: string;
  ciudad: string;
  colonias: string[];
}

export const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 
  'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

// CDMX Alcaldías mapped by postal code prefix (first 2 digits)
const CDMX_ALCALDIAS: Record<string, string> = {
  '01': 'Álvaro Obregón',
  '02': 'Azcapotzalco',
  '03': 'Benito Juárez',
  '04': 'Coyoacán',
  '05': 'Cuajimalpa de Morelos',
  '06': 'Cuauhtémoc',
  '07': 'Gustavo A. Madero',
  '08': 'Iztacalco',
  '09': 'Iztapalapa',
  '10': 'La Magdalena Contreras',
  '11': 'Miguel Hidalgo',
  '12': 'Milpa Alta',
  '13': 'Tláhuac',
  '14': 'Tlalpan',
  '15': 'Venustiano Carranza',
  '16': 'Xochimilco',
};

// Fallback state by 2-digit CP prefix
const CP_PREFIX_STATE: Record<string, string> = {
  '01': 'Ciudad de México', '02': 'Ciudad de México', '03': 'Ciudad de México', '04': 'Ciudad de México',
  '05': 'Ciudad de México', '06': 'Ciudad de México', '07': 'Ciudad de México', '08': 'Ciudad de México',
  '09': 'Ciudad de México', '10': 'Ciudad de México', '11': 'Ciudad de México', '12': 'Ciudad de México',
  '13': 'Ciudad de México', '14': 'Ciudad de México', '15': 'Ciudad de México', '16': 'Ciudad de México',
  '20': 'Aguascalientes',
  '21': 'Baja California', '22': 'Baja California',
  '23': 'Baja California Sur',
  '24': 'Campeche',
  '25': 'Coahuila', '26': 'Coahuila', '27': 'Coahuila',
  '28': 'Colima',
  '29': 'Chiapas', '30': 'Chiapas',
  '31': 'Chihuahua', '32': 'Chihuahua', '33': 'Chihuahua',
  '34': 'Durango', '35': 'Durango',
  '36': 'Guanajuato', '37': 'Guanajuato', '38': 'Guanajuato',
  '39': 'Guerrero', '40': 'Guerrero', '41': 'Guerrero',
  '42': 'Hidalgo', '43': 'Hidalgo',
  '44': 'Jalisco', '45': 'Jalisco', '46': 'Jalisco', '47': 'Jalisco', '48': 'Jalisco', '49': 'Jalisco',
  '50': 'Estado de México', '51': 'Estado de México', '52': 'Estado de México', '53': 'Estado de México',
  '54': 'Estado de México', '55': 'Estado de México', '56': 'Estado de México', '57': 'Estado de México',
  '58': 'Michoacán', '59': 'Michoacán', '60': 'Michoacán', '61': 'Michoacán',
  '62': 'Morelos',
  '63': 'Nayarit',
  '64': 'Nuevo León', '65': 'Nuevo León', '66': 'Nuevo León', '67': 'Nuevo León',
  '68': 'Oaxaca', '69': 'Oaxaca', '70': 'Oaxaca', '71': 'Oaxaca',
  '72': 'Puebla', '73': 'Puebla', '74': 'Puebla', '75': 'Puebla',
  '76': 'Querétaro',
  '77': 'Quintana Roo',
  '78': 'San Luis Potosí', '79': 'San Luis Potosí',
  '80': 'Sinaloa', '81': 'Sinaloa', '82': 'Sinaloa',
  '83': 'Sonora', '84': 'Sonora', '85': 'Sonora',
  '86': 'Tabasco',
  '87': 'Tamaulipas', '88': 'Tamaulipas', '89': 'Tamaulipas',
  '90': 'Tlaxcala',
  '91': 'Veracruz', '92': 'Veracruz', '93': 'Veracruz', '94': 'Veracruz', '95': 'Veracruz', '96': 'Veracruz',
  '97': 'Yucatán',
  '98': 'Zacatecas', '99': 'Zacatecas',
};

function normalizeState(rawState: string): string {
  const clean = rawState
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (clean.includes('distrito federal') || clean.includes('cdmx') || clean.includes('ciudad de mexico')) {
    return 'Ciudad de México';
  }
  if (clean.includes('mexico') && !clean.includes('ciudad')) {
    return 'Estado de México';
  }
  if (clean.includes('nuevo leon')) return 'Nuevo León';
  if (clean.includes('queretaro')) return 'Querétaro';
  if (clean.includes('michoacan')) return 'Michoacán';
  if (clean.includes('yucatan')) return 'Yucatán';
  if (clean.includes('san luis potosi')) return 'San Luis Potosí';

  const match = MEXICAN_STATES.find(st => {
    const stClean = st.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return stClean === clean || clean.includes(stClean) || stClean.includes(clean);
  });

  return match || rawState;
}

export async function lookupPostalCode(cp: string): Promise<PostalCodeResult | null> {
  const cleanCp = cp.trim().padStart(5, '0');
  if (!/^\d{5}$/.test(cleanCp)) return null;

  const prefix = cleanCp.substring(0, 2);
  const fallbackState = CP_PREFIX_STATE[prefix] || '';
  const fallbackCiudad = CDMX_ALCALDIAS[prefix] || '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://api.zippopotam.us/mx/${cleanCp}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.places && data.places.length > 0) {
        const rawState = data.places[0].state || fallbackState;
        const estado = normalizeState(rawState);

        // Derive city/municipality
        let ciudad = fallbackCiudad;
        if (!ciudad) {
          const firstPlace = data.places[0]['place name'] || '';
          ciudad = firstPlace.replace(/\s+Centro$/i, '').trim();
          if (!ciudad) ciudad = estado;
        }

        const colonias = Array.from(
          new Set(data.places.map((p: { 'place name': string }) => p['place name'].trim()))
        ).filter(Boolean) as string[];

        return {
          cp: cleanCp,
          estado,
          ciudad,
          colonias,
        };
      }
    }
  } catch {
    // Network or timeout error - use fallback prefix matching
  }

  // Fallback if API was unavailable but we have state/city from CP prefix
  if (fallbackState) {
    return {
      cp: cleanCp,
      estado: fallbackState,
      ciudad: fallbackCiudad,
      colonias: [],
    };
  }

  return null;
}
