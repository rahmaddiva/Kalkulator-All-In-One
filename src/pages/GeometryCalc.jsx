import { useState } from 'react';
import { mathCalc } from '../utils/calculatorEngine';

const shapes = [
  { id: 'circleArea', label: 'Luas Lingkaran', fields: ['r'], calc: (v) => mathCalc.geometry.circleArea(v.r) },
  { id: 'circlePerimeter', label: 'Keliling Lingkaran', fields: ['r'], calc: (v) => mathCalc.geometry.circlePerimeter(v.r) },
  { id: 'rectangleArea', label: 'Luas Persegi Panjang', fields: ['p', 'l'], calc: (v) => mathCalc.geometry.rectangleArea(v.p, v.l) },
  { id: 'rectanglePerimeter', label: 'Keliling Persegi Panjang', fields: ['p', 'l'], calc: (v) => mathCalc.geometry.rectanglePerimeter(v.p, v.l) },
  { id: 'triangleArea', label: 'Luas Segitiga', fields: ['alas', 'tinggi'], calc: (v) => mathCalc.geometry.triangleArea(v.alas, v.tinggi) },
  { id: 'trapezoidArea', label: 'Luas Trapesium', fields: ['a', 'b', 'tinggi'], calc: (v) => mathCalc.geometry.trapezoidArea(v.a, v.b, v.tinggi) },
  { id: 'sphereVolume', label: 'Volume Bola', fields: ['r'], calc: (v) => mathCalc.geometry.sphereVolume(v.r) },
  { id: 'sphereSurface', label: 'Luas Permukaan Bola', fields: ['r'], calc: (v) => mathCalc.geometry.sphereSurface(v.r) },
  { id: 'cylinderVolume', label: 'Volume Tabung', fields: ['r', 'tinggi'], calc: (v) => mathCalc.geometry.cylinderVolume(v.r, v.tinggi) },
  { id: 'coneVolume', label: 'Volume Kerucut', fields: ['r', 'tinggi'], calc: (v) => mathCalc.geometry.coneVolume(v.r, v.tinggi) },
  { id: 'cubeVolume', label: 'Volume Kubus', fields: ['sisi'], calc: (v) => mathCalc.geometry.cubeVolume(v.sisi) },
  { id: 'cuboidVolume', label: 'Volume Balok', fields: ['p', 'l', 'tinggi'], calc: (v) => mathCalc.geometry.cuboidVolume(v.p, v.l, v.tinggi) },
];

export default function GeometryCalc() {
  const [selected, setSelected] = useState(shapes[0].id);
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const shape = shapes.find((item) => item.id === selected);

  const calculate = () => {
    const parsed = Object.fromEntries(shape.fields.map((field) => [field, Number(values[field]) || 0]));
    setResult(shape.calc(parsed));
  };

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Geometri</h1>
        <p className="page-subtitle">Hitung luas, keliling, dan volume bangun geometri</p>
      </div>

      <div className="fade-in-up fade-in-up-delay-1" style={{ maxWidth: 620 }}>
        <div className="card">
          <div className="input-group">
            <label className="input-label">Pilih Rumus</label>
            <select className="input-field" value={selected} onChange={(e) => { setSelected(e.target.value); setValues({}); setResult(null); }}>
              {shapes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </div>

          <div className="input-row-3">
            {shape.fields.map((field) => (
              <div className="input-group" key={field}>
                <label className="input-label">{field}</label>
                <input className="input-field" type="number" value={values[field] || ''} onChange={(e) => setValues((prev) => ({ ...prev, [field]: e.target.value }))} placeholder={`Nilai ${field}`} />
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-block" onClick={calculate}>Hitung</button>

          {result && (
            <div className="result-box">
              <div className="result-label">Hasil</div>
              <div className="result-value">{Number(result.result.toFixed(6)).toString()}</div>
              <div className="result-formula">Rumus: {result.formula}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
