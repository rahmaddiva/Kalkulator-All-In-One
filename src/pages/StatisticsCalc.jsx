import { useState } from 'react';
import { mathCalc } from '../utils/calculatorEngine';

export default function StatisticsCalc() {
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);

  const parseData = () => data.split(new RegExp('[,\\s]+')).map(Number).filter((n) => !Number.isNaN(n));

  const calculate = () => {
    const values = parseData();
    if (!values.length) return;
    setResult({
      count: values.length,
      mean: mathCalc.statistics.mean(values),
      median: mathCalc.statistics.median(values),
      mode: mathCalc.statistics.mode(values).join(', '),
      stdDev: mathCalc.statistics.stdDev(values),
      variance: mathCalc.statistics.variance(values),
      range: mathCalc.statistics.range(values),
      min: Math.min(...values),
      max: Math.max(...values),
    });
  };

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Statistik</h1>
        <p className="page-subtitle">Hitung ringkasan data numerik dengan cepat</p>
      </div>

      <div className="fade-in-up fade-in-up-delay-1" style={{ maxWidth: 760 }}>
        <div className="card">
          <div className="card-title">Data Statistik</div>
          <div className="card-description">Pisahkan angka dengan koma, spasi, atau baris baru</div>
          <textarea
            className="data-input-area"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Contoh: 10, 12, 14, 14, 18, 21"
          />
          <div className="btn-group">
            <button className="btn btn-primary" onClick={calculate}>Hitung Statistik</button>
            <button className="btn btn-secondary" onClick={() => { setData(''); setResult(null); }}>Reset</button>
          </div>

          {result && (
            <div className="stat-results-grid">
              {Object.entries(result).map(([label, value]) => (
                <div className="stat-item" key={label}>
                  <div className="stat-item-label">{label}</div>
                  <div className="stat-item-value">
                    {typeof value === 'number' ? Number(value.toFixed(6)).toString() : value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
