import { useState } from 'react';
import { physicsCalc } from '../utils/calculatorEngine';

const categories = [
  {
    id: 'kinematika',
    label: 'Kinematika',
    formulas: [
      {
        id: 'velocity',
        title: 'Kecepatan (v)',
        formula: 'v = s / t',
        fields: [
          { key: 'distance', label: 'Jarak (s)', unit: 'm' },
          { key: 'time', label: 'Waktu (t)', unit: 's' },
        ],
        calc: (v) => physicsCalc.velocity(v.distance, v.time),
      },
      {
        id: 'acceleration',
        title: 'Percepatan (a)',
        formula: 'a = (v - v₀) / t',
        fields: [
          { key: 'vf', label: 'Kecepatan Akhir (v)', unit: 'm/s' },
          { key: 'vi', label: 'Kecepatan Awal (v₀)', unit: 'm/s' },
          { key: 'time', label: 'Waktu (t)', unit: 's' },
        ],
        calc: (v) => physicsCalc.acceleration(v.vf, v.vi, v.time),
      },
      {
        id: 'displacement',
        title: 'Perpindahan (s)',
        formula: 's = v₀t + ½at²',
        fields: [
          { key: 'v0', label: 'Kecepatan Awal (v₀)', unit: 'm/s' },
          { key: 'time', label: 'Waktu (t)', unit: 's' },
          { key: 'acc', label: 'Percepatan (a)', unit: 'm/s²' },
        ],
        calc: (v) => physicsCalc.displacement(v.v0, v.time, v.acc),
      },
    ]
  },
  {
    id: 'gaya',
    label: 'Gaya & Energi',
    formulas: [
      {
        id: 'force',
        title: 'Gaya (F)',
        formula: 'F = m × a',
        fields: [
          { key: 'mass', label: 'Massa (m)', unit: 'kg' },
          { key: 'acc', label: 'Percepatan (a)', unit: 'm/s²' },
        ],
        calc: (v) => physicsCalc.force(v.mass, v.acc),
      },
      {
        id: 'weight',
        title: 'Berat (W)',
        formula: 'W = m × g',
        fields: [
          { key: 'mass', label: 'Massa (m)', unit: 'kg' },
          { key: 'gravity', label: 'Gravitasi (g)', unit: 'm/s²', default: 9.8 },
        ],
        calc: (v) => physicsCalc.weight(v.mass, v.gravity),
      },
      {
        id: 'kineticEnergy',
        title: 'Energi Kinetik (Ek)',
        formula: 'Ek = ½mv²',
        fields: [
          { key: 'mass', label: 'Massa (m)', unit: 'kg' },
          { key: 'velocity', label: 'Kecepatan (v)', unit: 'm/s' },
        ],
        calc: (v) => physicsCalc.kineticEnergy(v.mass, v.velocity),
      },
      {
        id: 'potentialEnergy',
        title: 'Energi Potensial (Ep)',
        formula: 'Ep = mgh',
        fields: [
          { key: 'mass', label: 'Massa (m)', unit: 'kg' },
          { key: 'height', label: 'Tinggi (h)', unit: 'm' },
          { key: 'gravity', label: 'Gravitasi (g)', unit: 'm/s²', default: 9.8 },
        ],
        calc: (v) => physicsCalc.potentialEnergy(v.mass, v.height, v.gravity),
      },
      {
        id: 'work',
        title: 'Usaha (W)',
        formula: 'W = F × s × cos(θ)',
        fields: [
          { key: 'force', label: 'Gaya (F)', unit: 'N' },
          { key: 'distance', label: 'Jarak (s)', unit: 'm' },
          { key: 'angle', label: 'Sudut (θ)', unit: '°', default: 0 },
        ],
        calc: (v) => physicsCalc.work(v.force, v.distance, v.angle),
      },
      {
        id: 'power',
        title: 'Daya (P)',
        formula: 'P = W / t',
        fields: [
          { key: 'work', label: 'Usaha (W)', unit: 'J' },
          { key: 'time', label: 'Waktu (t)', unit: 's' },
        ],
        calc: (v) => physicsCalc.power(v.work, v.time),
      },
    ]
  },
  {
    id: 'listrik',
    label: 'Listrik',
    formulas: [
      {
        id: 'ohmsLaw',
        title: 'Hukum Ohm (I)',
        formula: 'I = V / R',
        fields: [
          { key: 'voltage', label: 'Tegangan (V)', unit: 'V' },
          { key: 'resistance', label: 'Hambatan (R)', unit: 'Ω' },
        ],
        calc: (v) => physicsCalc.ohmsLaw(v.voltage, v.resistance),
      },
      {
        id: 'electricPower',
        title: 'Daya Listrik (P)',
        formula: 'P = V × I',
        fields: [
          { key: 'voltage', label: 'Tegangan (V)', unit: 'V' },
          { key: 'current', label: 'Arus (I)', unit: 'A' },
        ],
        calc: (v) => physicsCalc.electricPower(v.voltage, v.current),
      },
      {
        id: 'resistance',
        title: 'Hambatan (R)',
        formula: 'R = V / I',
        fields: [
          { key: 'voltage', label: 'Tegangan (V)', unit: 'V' },
          { key: 'current', label: 'Arus (I)', unit: 'A' },
        ],
        calc: (v) => physicsCalc.resistance(v.voltage, v.current),
      },
    ]
  },
  {
    id: 'gelombang',
    label: 'Gelombang',
    formulas: [
      {
        id: 'waveSpeed',
        title: 'Kecepatan Gelombang (v)',
        formula: 'v = f × λ',
        fields: [
          { key: 'frequency', label: 'Frekuensi (f)', unit: 'Hz' },
          { key: 'wavelength', label: 'Panjang Gelombang (λ)', unit: 'm' },
        ],
        calc: (v) => physicsCalc.waveSpeed(v.frequency, v.wavelength),
      },
      {
        id: 'frequency',
        title: 'Frekuensi (f)',
        formula: 'f = v / λ',
        fields: [
          { key: 'speed', label: 'Kecepatan (v)', unit: 'm/s' },
          { key: 'wavelength', label: 'Panjang Gelombang (λ)', unit: 'm' },
        ],
        calc: (v) => physicsCalc.frequency(v.speed, v.wavelength),
      },
    ]
  },
  {
    id: 'tekanan',
    label: 'Tekanan & Momentum',
    formulas: [
      {
        id: 'pressure',
        title: 'Tekanan (P)',
        formula: 'P = F / A',
        fields: [
          { key: 'force', label: 'Gaya (F)', unit: 'N' },
          { key: 'area', label: 'Luas (A)', unit: 'm²' },
        ],
        calc: (v) => physicsCalc.pressure(v.force, v.area),
      },
      {
        id: 'hydrostaticPressure',
        title: 'Tekanan Hidrostatis',
        formula: 'P = ρ × g × h',
        fields: [
          { key: 'density', label: 'Massa Jenis (ρ)', unit: 'kg/m³' },
          { key: 'gravity', label: 'Gravitasi (g)', unit: 'm/s²', default: 9.8 },
          { key: 'height', label: 'Kedalaman (h)', unit: 'm' },
        ],
        calc: (v) => physicsCalc.hydrostaticPressure(v.density, v.gravity, v.height),
      },
      {
        id: 'momentum',
        title: 'Momentum (p)',
        formula: 'p = m × v',
        fields: [
          { key: 'mass', label: 'Massa (m)', unit: 'kg' },
          { key: 'velocity', label: 'Kecepatan (v)', unit: 'm/s' },
        ],
        calc: (v) => physicsCalc.momentum(v.mass, v.velocity),
      },
      {
        id: 'impulse',
        title: 'Impuls (J)',
        formula: 'J = F × t',
        fields: [
          { key: 'force', label: 'Gaya (F)', unit: 'N' },
          { key: 'time', label: 'Waktu (t)', unit: 's' },
        ],
        calc: (v) => physicsCalc.impulse(v.force, v.time),
      },
    ]
  },
];

export default function PhysicsCalc() {
  const [activeTab, setActiveTab] = useState('kinematika');
  const [values, setValues] = useState({});
  const [results, setResults] = useState({});

  const activeCategory = categories.find(c => c.id === activeTab);

  const handleChange = (formulaId, key, value) => {
    setValues(prev => ({
      ...prev,
      [formulaId]: { ...prev[formulaId], [key]: parseFloat(value) || 0 }
    }));
  };

  const handleCalculate = (formula) => {
    const vals = values[formula.id] || {};
    // Apply defaults
    formula.fields.forEach(f => {
      if (vals[f.key] === undefined && f.default !== undefined) {
        vals[f.key] = f.default;
      }
    });
    const res = formula.calc(vals);
    setResults(prev => ({ ...prev, [formula.id]: res }));
  };

  const handleReset = (formulaId) => {
    setValues(prev => ({ ...prev, [formulaId]: {} }));
    setResults(prev => ({ ...prev, [formulaId]: null }));
  };

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Fisika</h1>
        <p className="page-subtitle">Hitung berbagai rumus fisika dengan mudah</p>
      </div>

      <div className="tabs fade-in-up fade-in-up-delay-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`tab ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {activeCategory.formulas.map((formula, idx) => (
          <div key={formula.id} className={`fade-in-up fade-in-up-delay-${(idx % 4) + 1}`}>
            <div className="card">
              <div className="card-title">{formula.title}</div>
              <div className="card-description">{formula.formula}</div>

              {formula.fields.map(field => (
                <div className="input-group" key={field.key}>
                  <label className="input-label">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder={field.default !== undefined ? `Default: ${field.default}` : `Masukkan ${field.label.split('(')[0].trim()}`}
                    value={values[formula.id]?.[field.key] ?? ''}
                    onChange={(e) => handleChange(formula.id, field.key, e.target.value)}
                  />
                </div>
              ))}

              <div className="btn-group">
                <button 
                  className="btn btn-primary btn-block" 
                  onClick={() => handleCalculate(formula)}
                >
                  Hitung
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleReset(formula.id)}
                >
                  Reset
                </button>
              </div>

              {results[formula.id] && (
                <div className="result-box">
                  <div className="result-label">Hasil</div>
                  <div className="result-value">
                    {typeof results[formula.id].result === 'number' 
                      ? results[formula.id].result % 1 !== 0 
                        ? results[formula.id].result.toFixed(4) 
                        : results[formula.id].result
                      : results[formula.id].result}
                    <span className="result-unit">{results[formula.id].unit}</span>
                  </div>
                  <div className="result-formula">Rumus: {results[formula.id].formula}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
