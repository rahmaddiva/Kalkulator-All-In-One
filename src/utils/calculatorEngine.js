import { evaluate } from 'mathjs';

// ==================== KALKULATOR UMUM ====================
export const basicCalc = {
  evaluate: (expression) => {
    try {
      const result = evaluate(expression);
      return { success: true, result: typeof result === 'object' ? result.toString() : result };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  percentage: (value, percent) => (value * percent) / 100,
  
  power: (base, exp) => Math.pow(base, exp),
  
  sqrt: (value) => {
    if (value < 0) return { success: false, error: 'Tidak bisa akar dari bilangan negatif' };
    return { success: true, result: Math.sqrt(value) };
  },

  factorial: (n) => {
    if (n < 0) return { success: false, error: 'Tidak bisa faktorial bilangan negatif' };
    if (n === 0 || n === 1) return { success: true, result: 1 };
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return { success: true, result };
  },

  log: (value, base = 10) => {
    if (value <= 0) return { success: false, error: 'Logaritma hanya untuk bilangan positif' };
    return { success: true, result: Math.log(value) / Math.log(base) };
  },

  ln: (value) => {
    if (value <= 0) return { success: false, error: 'Ln hanya untuk bilangan positif' };
    return { success: true, result: Math.log(value) };
  }
};

// ==================== KALKULATOR FISIKA ====================
export const physicsCalc = {
  // Kinematika
  velocity: (distance, time) => ({
    result: distance / time,
    unit: 'm/s',
    formula: 'v = s / t'
  }),

  acceleration: (velocityFinal, velocityInitial, time) => ({
    result: (velocityFinal - velocityInitial) / time,
    unit: 'm/s²',
    formula: 'a = (v - v₀) / t'
  }),

  displacement: (v0, t, a) => ({
    result: v0 * t + 0.5 * a * t * t,
    unit: 'm',
    formula: 's = v₀t + ½at²'
  }),

  // Gaya
  force: (mass, acceleration) => ({
    result: mass * acceleration,
    unit: 'N',
    formula: 'F = m × a'
  }),

  weight: (mass, gravity = 9.8) => ({
    result: mass * gravity,
    unit: 'N',
    formula: 'W = m × g'
  }),

  // Energi
  kineticEnergy: (mass, velocity) => ({
    result: 0.5 * mass * velocity * velocity,
    unit: 'J',
    formula: 'Ek = ½mv²'
  }),

  potentialEnergy: (mass, height, gravity = 9.8) => ({
    result: mass * gravity * height,
    unit: 'J',
    formula: 'Ep = mgh'
  }),

  work: (force, distance, angle = 0) => ({
    result: force * distance * Math.cos(angle * Math.PI / 180),
    unit: 'J',
    formula: 'W = F × s × cos(θ)'
  }),

  power: (work, time) => ({
    result: work / time,
    unit: 'W',
    formula: 'P = W / t'
  }),

  // Listrik
  ohmsLaw: (voltage, resistance) => ({
    result: voltage / resistance,
    unit: 'A',
    formula: 'I = V / R'
  }),

  electricPower: (voltage, current) => ({
    result: voltage * current,
    unit: 'W',
    formula: 'P = V × I'
  }),

  resistance: (voltage, current) => ({
    result: voltage / current,
    unit: 'Ω',
    formula: 'R = V / I'
  }),

  // Gelombang
  waveSpeed: (frequency, wavelength) => ({
    result: frequency * wavelength,
    unit: 'm/s',
    formula: 'v = f × λ'
  }),

  frequency: (waveSpeed, wavelength) => ({
    result: waveSpeed / wavelength,
    unit: 'Hz',
    formula: 'f = v / λ'
  }),

  wavelength: (waveSpeed, frequency) => ({
    result: waveSpeed / frequency,
    unit: 'm',
    formula: 'λ = v / f'
  }),

  // Tekanan
  pressure: (force, area) => ({
    result: force / area,
    unit: 'Pa',
    formula: 'P = F / A'
  }),

  hydrostaticPressure: (density, gravity, height) => ({
    result: density * gravity * height,
    unit: 'Pa',
    formula: 'P = ρ × g × h'
  }),

  // Momentum
  momentum: (mass, velocity) => ({
    result: mass * velocity,
    unit: 'kg·m/s',
    formula: 'p = m × v'
  }),

  impulse: (force, time) => ({
    result: force * time,
    unit: 'N·s',
    formula: 'J = F × t'
  }),
};

// ==================== KALKULATOR MATEMATIKA ====================
export const mathCalc = {
  // Persamaan Kuadrat
  quadratic: (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      return {
        discriminant,
        roots: [`${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`, `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`],
        type: 'Akar Imajiner'
      };
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      return { discriminant, roots: [root], type: 'Akar Kembar' };
    } else {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return { discriminant, roots: [root1, root2], type: 'Dua Akar Real' };
    }
  },

  // Luas & Keliling
  geometry: {
    circleArea: (r) => ({ result: Math.PI * r * r, formula: 'A = πr²' }),
    circlePerimeter: (r) => ({ result: 2 * Math.PI * r, formula: 'K = 2πr' }),
    rectangleArea: (p, l) => ({ result: p * l, formula: 'A = p × l' }),
    rectanglePerimeter: (p, l) => ({ result: 2 * (p + l), formula: 'K = 2(p + l)' }),
    triangleArea: (base, height) => ({ result: 0.5 * base * height, formula: 'A = ½ × a × t' }),
    trapezoidArea: (a, b, h) => ({ result: 0.5 * (a + b) * h, formula: 'A = ½(a + b) × t' }),
    sphereVolume: (r) => ({ result: (4 / 3) * Math.PI * Math.pow(r, 3), formula: 'V = 4/3 πr³' }),
    sphereSurface: (r) => ({ result: 4 * Math.PI * r * r, formula: 'L = 4πr²' }),
    cylinderVolume: (r, h) => ({ result: Math.PI * r * r * h, formula: 'V = πr²h' }),
    coneVolume: (r, h) => ({ result: (1 / 3) * Math.PI * r * r * h, formula: 'V = ⅓πr²h' }),
    cubeVolume: (s) => ({ result: Math.pow(s, 3), formula: 'V = s³' }),
    cuboidVolume: (p, l, t) => ({ result: p * l * t, formula: 'V = p × l × t' }),
  },

  // Trigonometri
  trig: {
    sin: (angle) => Math.sin(angle * Math.PI / 180),
    cos: (angle) => Math.cos(angle * Math.PI / 180),
    tan: (angle) => Math.tan(angle * Math.PI / 180),
    asin: (value) => (Math.asin(value) * 180) / Math.PI,
    acos: (value) => (Math.acos(value) * 180) / Math.PI,
    atan: (value) => (Math.atan(value) * 180) / Math.PI,
  },

  // Statistik
  statistics: {
    mean: (arr) => arr.reduce((a, b) => a + b, 0) / arr.length,
    median: (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    },
    mode: (arr) => {
      const freq = {};
      arr.forEach(n => freq[n] = (freq[n] || 0) + 1);
      const maxFreq = Math.max(...Object.values(freq));
      return Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
    },
    stdDev: (arr) => {
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
      return Math.sqrt(variance);
    },
    variance: (arr) => {
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    },
    range: (arr) => Math.max(...arr) - Math.min(...arr),
  },

  // Deret
  arithmeticSequence: (a, b, n) => ({
    nthTerm: a + (n - 1) * b,
    sum: (n / 2) * (2 * a + (n - 1) * b)
  }),

  geometricSequence: (a, r, n) => ({
    nthTerm: a * Math.pow(r, n - 1),
    sum: r === 1 ? a * n : a * (Math.pow(r, n) - 1) / (r - 1)
  }),
};

// ==================== KONVERSI SATUAN ====================
export const conversionCalc = {
  length: {
    units: ['mm', 'cm', 'm', 'km', 'inch', 'feet', 'yard', 'mile'],
    toBase: {
      mm: 0.001, cm: 0.01, m: 1, km: 1000,
      inch: 0.0254, feet: 0.3048, yard: 0.9144, mile: 1609.344
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  },

  mass: {
    units: ['mg', 'g', 'kg', 'ton', 'ounce', 'pound'],
    toBase: {
      mg: 0.000001, g: 0.001, kg: 1, ton: 1000,
      ounce: 0.0283495, pound: 0.453592
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  },

  temperature: {
    units: ['celsius', 'fahrenheit', 'kelvin'],
    convert: function (value, from, to) {
      let celsius;
      if (from === 'celsius') celsius = value;
      else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
      else celsius = value - 273.15;

      if (to === 'celsius') return celsius;
      if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
      return celsius + 273.15;
    }
  },

  time: {
    units: ['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun'],
    toBase: {
      detik: 1, menit: 60, jam: 3600, hari: 86400,
      minggu: 604800, bulan: 2592000, tahun: 31536000
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  },

  speed: {
    units: ['m/s', 'km/h', 'mph', 'knot'],
    toBase: {
      'm/s': 1, 'km/h': 0.277778, mph: 0.44704, knot: 0.514444
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  },

  area: {
    units: ['mm²', 'cm²', 'm²', 'km²', 'hektar', 'are'],
    toBase: {
      'mm²': 0.000001, 'cm²': 0.0001, 'm²': 1, 'km²': 1000000,
      hektar: 10000, are: 100
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  },

  volume: {
    units: ['ml', 'liter', 'cm³', 'm³', 'gallon'],
    toBase: {
      ml: 0.000001, liter: 0.001, 'cm³': 0.000001, 'm³': 1, gallon: 0.00378541
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  },

  data: {
    units: ['bit', 'byte', 'KB', 'MB', 'GB', 'TB'],
    toBase: {
      bit: 0.125, byte: 1, KB: 1024, MB: 1048576,
      GB: 1073741824, TB: 1099511627776
    },
    convert: function (value, from, to) {
      const baseValue = value * this.toBase[from];
      return baseValue / this.toBase[to];
    }
  }
};
