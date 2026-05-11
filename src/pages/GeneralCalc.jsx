import { useState, useCallback } from 'react';
import { basicCalc } from '../utils/calculatorEngine';

const buttons = [
  ['C', '⌫', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['±', '0', '.', '='],
];

const scientificBtns = [
  ['sin', 'cos', 'tan', 'π'],
  ['log', 'ln', '√', '^'],
  ['(', ')', 'n!', 'e'],
];

export default function GeneralCalc() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [history, setHistory] = useState([]);
  const [showScientific, setShowScientific] = useState(false);

  const mapSymbol = (sym) => {
    const map = { '÷': '/', '×': '*', '−': '-', 'π': 'pi', 'e': 'e' };
    return map[sym] || sym;
  };

  const handleButton = useCallback((btn) => {
    switch (btn) {
      case 'C':
        setExpression('');
        setResult('0');
        break;

      case '⌫':
        setExpression(prev => prev.slice(0, -1));
        break;

      case '=': {
        if (!expression) return;
        const res = basicCalc.evaluate(expression);
        if (res.success) {
          setResult(String(res.result));
          setHistory(prev => [{expr: expression, res: String(res.result)}, ...prev.slice(0, 9)]);
        } else {
          setResult('Error');
        }
        break;
      }

      case '±':
        setExpression(prev => {
          if (prev.startsWith('-')) return prev.slice(1);
          return '-' + prev;
        });
        break;

      case '%':
        setExpression(prev => prev + '/100');
        break;

      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
        setExpression(prev => prev + btn + '(');
        break;

      case '√':
        setExpression(prev => prev + 'sqrt(');
        break;

      case '^':
        setExpression(prev => prev + '^');
        break;

      case 'n!':
        setExpression(prev => prev + '!');
        break;

      default:
        setExpression(prev => prev + mapSymbol(btn));
    }
  }, [expression]);

  const getButtonClass = (btn) => {
    if (btn === 'C' || btn === '⌫') return 'calc-btn danger';
    if (btn === '=') return 'calc-btn equals';
    if (['÷', '×', '−', '+', '%', '^'].includes(btn)) return 'calc-btn operator';
    if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'n!', '(', ')', 'π', 'e'].includes(btn)) return 'calc-btn operator';
    return 'calc-btn';
  };

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Kalkulator Umum</h1>
        <p className="page-subtitle">Kalkulator saintifik lengkap untuk semua kebutuhan</p>
      </div>

      <div className="card-grid">
        <div className="fade-in-up fade-in-up-delay-1">
          <div className="card">
            <div className="calc-display">
              <div className="calc-expression">{expression || '\u00A0'}</div>
              <div className="calc-result">{result}</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <button
                className={`tab ${showScientific ? 'active' : ''}`}
                onClick={() => setShowScientific(!showScientific)}
                style={{ fontSize: 12, padding: '6px 14px' }}
              >
                {showScientific ? 'Sembunyikan' : 'Mode Saintifik'}
              </button>
            </div>

            {showScientific && (
              <div className="calc-grid" style={{ marginBottom: 8 }}>
                {scientificBtns.flat().map(btn => (
                  <button
                    key={btn}
                    className={getButtonClass(btn)}
                    onClick={() => handleButton(btn)}
                    style={{ padding: 12, fontSize: 13 }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            )}

            <div className="calc-grid">
              {buttons.flat().map((btn, i) => (
                <button
                  key={`${btn}-${i}`}
                  className={getButtonClass(btn)}
                  onClick={() => handleButton(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-in-up fade-in-up-delay-2">
          <div className="card">
            <div className="card-title">Riwayat</div>
            <div className="card-description">10 kalkulasi terakhir</div>
            
            {history.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: 20 }}>
                Belum ada riwayat
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {history.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: 'var(--bg-input)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setExpression(h.res);
                      setResult(h.res);
                    }}
                  >
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {h.expr}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
                      = {h.res}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
