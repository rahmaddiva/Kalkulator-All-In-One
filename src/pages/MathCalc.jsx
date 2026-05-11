import { useState } from 'react';
import { mathCalc } from '../utils/calculatorEngine';

const tabs = ['Persamaan Kuadrat', 'Trigonometri', 'Deret'];

export default function MathCalc() {
  const [activeTab, setActiveTab] = useState('Persamaan Kuadrat');

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Matematika</h1>
        <p className="page-subtitle">Persamaan kuadrat, trigonometri, dan deret</p>
      </div>

      <div className="tabs fade-in-up fade-in-up-delay-1">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Persamaan Kuadrat' && <QuadraticSection />}
      {activeTab === 'Trigonometri' && <TrigSection />}
      {activeTab === 'Deret' && <SequenceSection />}
    </div>
  );
}

function QuadraticSection() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    if (!a) return;
    const res = mathCalc.quadratic(parseFloat(a), parseFloat(b) || 0, parseFloat(c) || 0);
    setResult(res);
  };

  return (
    <div className="card-grid">
      <div className="fade-in-up fade-in-up-delay-2">
        <div className="card">
          <div className="card-title">Persamaan Kuadrat</div>
          <div className="card-description">ax² + bx + c = 0</div>

          <div className="input-row-3">
            <div className="input-group">
              <label className="input-label">Nilai a</label>
              <input type="number" className="input-field" placeholder="a" value={a} onChange={e => setA(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Nilai b</label>
              <input type="number" className="input-field" placeholder="b" value={b} onChange={e => setB(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Nilai c</label>
              <input type="number" className="input-field" placeholder="c" value={c} onChange={e => setC(e.target.value)} />
            </div>
          </div>

          <div className="btn-group">
            <button className="btn btn-primary btn-block" onClick={handleCalc}>Hitung</button>
            <button className="btn btn-secondary" onClick={() => { setA(''); setB(''); setC(''); setResult(null); }}>Reset</button>
          </div>

          {result && (
            <div className="result-box">
              <div className="result-label">Hasil - {result.type}</div>
              <div className="result-value" style={{ fontSize: 18 }}>
                {result.roots.map((r, i) => (
                  <span key={i}>
                    x{result.roots.length > 1 ? (i + 1) : ''} = {typeof r === 'number' ? r.toFixed(4) : r}
                    {i < result.roots.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="result-formula">
                Diskriminan (D) = {result.discriminant}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TrigSection() {
  const [angle, setAngle] = useState('');
  const [results, setResults] = useState(null);
  const [invValue, setInvValue] = useState('');
  const [invResults, setInvResults] = useState(null);

  const handleCalc = () => {
    const a = parseFloat(angle);
    if (isNaN(a)) return;
    setResults({
      sin: mathCalc.trig.sin(a),
      cos: mathCalc.trig.cos(a),
      tan: a % 90 === 0 && a % 180 !== 0 ? 'Tidak terdefinisi' : mathCalc.trig.tan(a),
    });
  };

  const handleInverse = () => {
    const v = parseFloat(invValue);
    if (isNaN(v)) return;
    setInvResults({
      asin: v >= -1 && v <= 1 ? mathCalc.trig.asin(v).toFixed(4) + '°' : 'N/A',
      acos: v >= -1 && v <= 1 ? mathCalc.trig.acos(v).toFixed(4) + '°' : 'N/A',
      atan: mathCalc.trig.atan(v).toFixed(4) + '°',
    });
  };

  return (
    <div className="card-grid">
      <div className="fade-in-up fade-in-up-delay-2">
        <div className="card">
          <div className="card-title">Trigonometri</div>
          <div className="card-description">Hitung sin, cos, tan dari sudut (derajat)</div>

          <div className="input-group">
            <label className="input-label">Sudut (°)</label>
            <input type="number" className="input-field" placeholder="Masukkan sudut dalam derajat" value={angle} onChange={e => setAngle(e.target.value)} />
          </div>

          <button className="btn btn-primary btn-block" onClick={handleCalc}>Hitung</button>

          {results && (
            <div className="stat-results-grid" style={{ marginTop: 16 }}>
              {Object.entries(results).map(([key, val]) => (
                <div className="stat-item" key={key}>
                  <div className="stat-item-label">{key}</div>
                  <div className="stat-item-value" style={{ fontSize: 15 }}>
                    {typeof val === 'number' ? val.toFixed(6) : val}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fade-in-up fade-in-up-delay-3">
        <div className="card">
          <div className="card-title">Invers Trigonometri</div>
          <div className="card-description">Hitung arcsin, arccos, arctan</div>

          <div className="input-group">
            <label className="input-label">Nilai</label>
            <input type="number" className="input-field" step="0.01" placeholder="Masukkan nilai (-1 s.d. 1 untuk sin/cos)" value={invValue} onChange={e => setInvValue(e.target.value)} />
          </div>

          <button className="btn btn-primary btn-block" onClick={handleInverse}>Hitung</button>

          {invResults && (
            <div className="stat-results-grid" style={{ marginTop: 16 }}>
              {Object.entries(invResults).map(([key, val]) => (
                <div className="stat-item" key={key}>
                  <div className="stat-item-label">{key}</div>
                  <div className="stat-item-value" style={{ fontSize: 15 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SequenceSection() {
  const [seqType, setSeqType] = useState('arithmetic');
  const [a, setA] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const aVal = parseFloat(a);
    const dVal = parseFloat(d);
    const nVal = parseFloat(n);
    if (isNaN(aVal) || isNaN(dVal) || isNaN(nVal)) return;

    if (seqType === 'arithmetic') {
      setResult(mathCalc.arithmeticSequence(aVal, dVal, nVal));
    } else {
      setResult(mathCalc.geometricSequence(aVal, dVal, nVal));
    }
  };

  return (
    <div className="card-grid">
      <div className="fade-in-up fade-in-up-delay-2">
        <div className="card">
          <div className="card-title">Deret</div>
          <div className="card-description">
            {seqType === 'arithmetic' ? 'Un = a + (n-1)b, Sn = n/2(2a + (n-1)b)' : 'Un = a × r^(n-1), Sn = a(r^n - 1)/(r - 1)'}
          </div>

          <div className="input-group">
            <label className="input-label">Jenis Deret</label>
            <select className="input-field" value={seqType} onChange={e => { setSeqType(e.target.value); setResult(null); }}>
              <option value="arithmetic">Aritmatika</option>
              <option value="geometric">Geometri</option>
            </select>
          </div>

          <div className="input-row-3">
            <div className="input-group">
              <label className="input-label">Suku Pertama (a)</label>
              <input type="number" className="input-field" placeholder="a" value={a} onChange={e => setA(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">{seqType === 'arithmetic' ? 'Beda (b)' : 'Rasio (r)'}</label>
              <input type="number" className="input-field" placeholder={seqType === 'arithmetic' ? 'b' : 'r'} value={d} onChange={e => setD(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Suku ke-n</label>
              <input type="number" className="input-field" placeholder="n" value={n} onChange={e => setN(e.target.value)} />
            </div>
          </div>

          <div className="btn-group">
            <button className="btn btn-primary btn-block" onClick={handleCalc}>Hitung</button>
            <button className="btn btn-secondary" onClick={() => { setA(''); setD(''); setN(''); setResult(null); }}>Reset</button>
          </div>

          {result && (
            <div className="stat-results-grid" style={{ marginTop: 16 }}>
              <div className="stat-item">
                <div className="stat-item-label">Suku ke-n (Un)</div>
                <div className="stat-item-value">{result.nthTerm.toFixed(4)}</div>
              </div>
              <div className="stat-item">
                <div className="stat-item-label">Jumlah n suku (Sn)</div>
                <div className="stat-item-value">{result.sum.toFixed(4)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
