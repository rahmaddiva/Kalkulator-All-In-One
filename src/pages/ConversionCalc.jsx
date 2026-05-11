import { useState } from 'react';
import { conversionCalc } from '../utils/calculatorEngine';
import { FiRepeat } from 'react-icons/fi';

const categoryLabels = {
  length: 'Panjang',
  mass: 'Massa',
  temperature: 'Suhu',
  time: 'Waktu',
  speed: 'Kecepatan',
  area: 'Luas',
  volume: 'Volume',
  data: 'Data Digital',
};

const categoryIcons = {
  length: '📏',
  mass: '⚖️',
  temperature: '🌡️',
  time: '⏱️',
  speed: '💨',
  area: '📐',
  volume: '🧪',
  data: '💾',
};

export default function ConversionCalc() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const currentCalc = conversionCalc[category];
  const units = currentCalc.units;

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const newCalc = conversionCalc[cat];
    setFromUnit(newCalc.units[0]);
    setToUnit(newCalc.units[1] || newCalc.units[0]);
    setInputValue('');
    setResult(null);
  };

  const handleSwap = () => {
    const temp = fromUnit || units[0];
    setFromUnit(toUnit || units[1]);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(String(result));
      const val = result;
      const from = toUnit || units[1];
      const to = temp;
      const res = currentCalc.convert(val, from, to);
      setResult(res);
    }
  };

  // Auto-calculate on input change
  const handleInputChange = (val) => {
    setInputValue(val);
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      const from = fromUnit || units[0];
      const to = toUnit || units[1];
      const res = currentCalc.convert(numVal, from, to);
      setResult(res);
    } else {
      setResult(null);
    }
  };

  // Initialize units on first render
  if (!fromUnit && units.length > 0) {
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Konversi Satuan</h1>
        <p className="page-subtitle">Konversi antar satuan dengan cepat dan akurat</p>
      </div>

      <div className="tabs fade-in-up fade-in-up-delay-1" style={{ flexWrap: 'wrap' }}>
        {Object.keys(categoryLabels).map(cat => (
          <button
            key={cat}
            className={`tab ${category === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="fade-in-up fade-in-up-delay-2" style={{ maxWidth: 500 }}>
        <div className="card">
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{categoryIcons[category]}</span>
            Konversi {categoryLabels[category]}
          </div>
          <div className="card-description">Masukkan nilai dan pilih satuan</div>

          <div className="input-group">
            <label className="input-label">Nilai</label>
            <input
              type="number"
              className="input-field"
              placeholder="Masukkan nilai..."
              value={inputValue}
              onChange={e => handleInputChange(e.target.value)}
              style={{ fontSize: 18, padding: '14px' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Dari</label>
            <select
              className="input-field"
              value={fromUnit || units[0]}
              onChange={e => {
                setFromUnit(e.target.value);
                if (inputValue) {
                  const res = currentCalc.convert(parseFloat(inputValue), e.target.value, toUnit || units[1]);
                  setResult(res);
                }
              }}
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div style={{ textAlign: 'center', margin: '8px 0' }}>
            <button className="swap-btn" onClick={handleSwap}>
              <FiRepeat />
            </button>
          </div>

          <div className="input-group">
            <label className="input-label">Ke</label>
            <select
              className="input-field"
              value={toUnit || units[1]}
              onChange={e => {
                setToUnit(e.target.value);
                if (inputValue) {
                  const res = currentCalc.convert(parseFloat(inputValue), fromUnit || units[0], e.target.value);
                  setResult(res);
                }
              }}
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          {result !== null && (
            <div className="result-box">
              <div className="result-label">Hasil Konversi</div>
              <div className="result-value">
                {result % 1 !== 0 ? result.toFixed(6).replace(/\.?0+$/, '') : result}
                <span className="result-unit">{toUnit || units[1]}</span>
              </div>
              <div className="result-formula">
                {inputValue} {fromUnit || units[0]} = {result % 1 !== 0 ? result.toFixed(6).replace(/\.?0+$/, '') : result} {toUnit || units[1]}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
