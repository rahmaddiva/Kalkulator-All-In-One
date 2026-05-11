import { useState } from 'react';
import { basicCalc } from '../utils/calculatorEngine';

export default function PercentageCalc() {
  const [value, setValue] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState(null);

  const v = Number(value);
  const p = Number(percent);

  const calculate = (type) => {
    if (Number.isNaN(v) || Number.isNaN(p)) return;
    const base = basicCalc.percentage(v, p);
    const results = {
      percentOf: { label: `${p}% dari ${v}`, value: base },
      increase: { label: `${v} naik ${p}%`, value: v + base },
      decrease: { label: `${v} turun ${p}%`, value: v - base },
      ratio: { label: `${v} adalah berapa % dari ${p}`, value: p === 0 ? 'Tidak terdefinisi' : `${((v / p) * 100).toFixed(4)}%` },
    };
    setResult(results[type]);
  };

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Persentase</h1>
        <p className="page-subtitle">Hitung diskon, kenaikan, penurunan, dan rasio persentase</p>
      </div>

      <div className="fade-in-up fade-in-up-delay-1" style={{ maxWidth: 620 }}>
        <div className="card">
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Nilai</label>
              <input className="input-field" type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Contoh: 250000" />
            </div>
            <div className="input-group">
              <label className="input-label">Persen / Pembanding</label>
              <input className="input-field" type="number" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="Contoh: 15" />
            </div>
          </div>

          <div className="btn-group" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => calculate('percentOf')}>Persen Dari</button>
            <button className="btn btn-primary" onClick={() => calculate('increase')}>Kenaikan</button>
            <button className="btn btn-primary" onClick={() => calculate('decrease')}>Penurunan</button>
            <button className="btn btn-secondary" onClick={() => calculate('ratio')}>Rasio</button>
          </div>

          {result && (
            <div className="result-box">
              <div className="result-label">{result.label}</div>
              <div className="result-value">{typeof result.value === 'number' ? Number(result.value.toFixed(6)).toString() : result.value}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
