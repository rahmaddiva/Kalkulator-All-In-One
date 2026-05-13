import { useState } from 'react';

const calculators = {
  asfr: {
    title: 'ASFR',
    description: 'Age Specific Fertility Rate per 1.000 perempuan pada kelompok umur tertentu.',
    fields: [
      { key: 'births', label: 'Jumlah kelahiran', placeholder: 'Contoh: 120' },
      { key: 'women', label: 'Jumlah perempuan kelompok umur', placeholder: 'Contoh: 8500' },
    ],
    calculate: ({ births, women }) => ({
      value: (births / women) * 1000,
      unit: 'per 1.000 perempuan',
      formula: 'ASFR = kelahiran / perempuan kelompok umur x 1.000',
    }),
  },
  tfr: {
    title: 'TFR',
    description: 'Total Fertility Rate dari jumlah ASFR seluruh kelompok umur reproduksi.',
    fields: [
      { key: 'sumAsfr', label: 'Jumlah seluruh ASFR', placeholder: 'Contoh: 420' },
      { key: 'interval', label: 'Interval kelompok umur', placeholder: 'Umumnya: 5', defaultValue: '5' },
    ],
    calculate: ({ sumAsfr, interval }) => ({
      value: (sumAsfr * interval) / 1000,
      unit: 'anak per perempuan',
      formula: 'TFR = jumlah ASFR x interval umur / 1.000',
    }),
  },
  mcpr: {
    title: 'mCPR',
    description: 'Modern Contraceptive Prevalence Rate terhadap jumlah Pasangan Usia Subur.',
    fields: [
      { key: 'modernUsers', label: 'Peserta KB modern aktif', placeholder: 'Contoh: 5600' },
      { key: 'pus', label: 'Jumlah PUS', placeholder: 'Contoh: 9000' },
    ],
    calculate: ({ modernUsers, pus }) => ({
      value: (modernUsers / pus) * 100,
      unit: '%',
      formula: 'mCPR = peserta KB modern aktif / PUS x 100',
    }),
  },
  cpr: {
    title: 'CPR',
    description: 'Contraceptive Prevalence Rate untuk seluruh peserta KB aktif.',
    fields: [
      { key: 'activeUsers', label: 'Seluruh peserta KB aktif', placeholder: 'Contoh: 6200' },
      { key: 'pus', label: 'Jumlah PUS', placeholder: 'Contoh: 9000' },
    ],
    calculate: ({ activeUsers, pus }) => ({
      value: (activeUsers / pus) * 100,
      unit: '%',
      formula: 'CPR = seluruh peserta KB aktif / PUS x 100',
    }),
  },
  unmetNeed: {
    title: 'Unmet Need',
    description: 'Persentase PUS yang ingin menunda atau tidak ingin anak lagi tetapi belum ber-KB.',
    fields: [
      { key: 'unmet', label: 'Jumlah PUS unmet need', placeholder: 'Contoh: 740' },
      { key: 'pus', label: 'Jumlah PUS', placeholder: 'Contoh: 9000' },
    ],
    calculate: ({ unmet, pus }) => ({
      value: (unmet / pus) * 100,
      unit: '%',
      formula: 'Unmet Need = PUS unmet need / PUS x 100',
    }),
  },
  mkjp: {
    title: 'Persentase MKJP',
    description: 'Proporsi peserta KB aktif yang menggunakan Metode Kontrasepsi Jangka Panjang.',
    fields: [
      { key: 'mkjpUsers', label: 'Peserta MKJP aktif', placeholder: 'Contoh: 1800' },
      { key: 'activeUsers', label: 'Seluruh peserta KB aktif', placeholder: 'Contoh: 6200' },
    ],
    calculate: ({ mkjpUsers, activeUsers }) => ({
      value: (mkjpUsers / activeUsers) * 100,
      unit: '%',
      formula: 'Persentase MKJP = peserta MKJP aktif / seluruh peserta KB aktif x 100',
    }),
  },
};

const formatNumber = (value) => Number(value.toFixed(4)).toString();

export default function P3ap2kbCalc() {
  const [type, setType] = useState('asfr');
  const [values, setValues] = useState({ interval: '5' });
  const [result, setResult] = useState(null);

  const calculator = calculators[type];

  const updateValue = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setResult(null);
  };

  const changeType = (nextType) => {
    const defaults = calculators[nextType].fields.reduce((acc, field) => {
      if (field.defaultValue) acc[field.key] = field.defaultValue;
      return acc;
    }, {});

    setType(nextType);
    setValues(defaults);
    setResult(null);
  };

  const calculate = () => {
    const numbers = calculator.fields.reduce((acc, field) => {
      acc[field.key] = Number(values[field.key]);
      return acc;
    }, {});

    if (Object.values(numbers).some((value) => Number.isNaN(value) || value <= 0)) {
      setResult({ error: 'Semua input harus berupa angka lebih dari 0.' });
      return;
    }

    setResult(calculator.calculate(numbers));
  };

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Dinas P3AP2KB</h1>
        <p className="page-subtitle">Hitung indikator kependudukan dan KB seperti TFR, ASFR, mCPR, CPR, unmet need, dan MKJP.</p>
      </div>

      <div className="fade-in-up fade-in-up-delay-1" style={{ maxWidth: 780 }}>
        <div className="card">
          <div className="input-group">
            <label className="input-label">Pilih indikator</label>
            <select className="input-field" value={type} onChange={(e) => changeType(e.target.value)}>
              {Object.entries(calculators).map(([key, item]) => (
                <option key={key} value={key}>{item.title}</option>
              ))}
            </select>
          </div>

          <div className="card-title">{calculator.title}</div>
          <div className="card-description">{calculator.description}</div>

          <div className="input-row">
            {calculator.fields.map((field) => (
              <div className="input-group" key={field.key}>
                <label className="input-label">{field.label}</label>
                <input
                  className="input-field"
                  type="number"
                  min="0"
                  value={values[field.key] ?? ''}
                  onChange={(e) => updateValue(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          <div className="btn-group">
            <button className="btn btn-primary" onClick={calculate}>Hitung {calculator.title}</button>
            <button className="btn btn-secondary" onClick={() => { setValues({ interval: '5' }); setResult(null); }}>Reset</button>
          </div>

          {result && (
            <div className={`result-box ${result.error ? 'result-error' : ''}`}>
              <div className="result-label">{result.error ? 'Input tidak valid' : 'Hasil'}</div>
              <div className="result-value">
                {result.error ? result.error : `${formatNumber(result.value)} ${result.unit}`}
              </div>
              {!result.error && <div className="result-formula">{result.formula}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
