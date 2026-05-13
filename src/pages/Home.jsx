import { useNavigate } from 'react-router-dom';
import { 
  FiHash, FiZap, FiTriangle, FiRepeat, 
  FiPercent, FiBarChart2, FiGrid, FiUsers 
} from 'react-icons/fi';

const features = [
  {
    path: '/umum',
    icon: <FiHash />,
    title: 'Kalkulator Umum',
    desc: 'Operasi aritmatika dasar, pangkat, akar, logaritma, dan lainnya.',
    color: 'rgba(108, 99, 255, 0.15)',
    iconColor: '#6c63ff'
  },
  {
    path: '/fisika',
    icon: <FiZap />,
    title: 'Fisika',
    desc: 'Kinematika, gaya, energi, listrik, gelombang, tekanan, dan momentum.',
    color: 'rgba(255, 107, 157, 0.15)',
    iconColor: '#ff6b9d'
  },
  {
    path: '/matematika',
    icon: <FiTriangle />,
    title: 'Matematika',
    desc: 'Persamaan kuadrat, trigonometri, deret aritmatika & geometri.',
    color: 'rgba(80, 250, 123, 0.15)',
    iconColor: '#50fa7b'
  },
  {
    path: '/konversi',
    icon: <FiRepeat />,
    title: 'Konversi Satuan',
    desc: 'Panjang, massa, suhu, waktu, kecepatan, luas, volume, data.',
    color: 'rgba(139, 233, 253, 0.15)',
    iconColor: '#8be9fd'
  },
  {
    path: '/statistik',
    icon: <FiBarChart2 />,
    title: 'Statistik',
    desc: 'Mean, median, modus, standar deviasi, varians, dan range.',
    color: 'rgba(255, 184, 108, 0.15)',
    iconColor: '#ffb86c'
  },
  {
    path: '/geometri',
    icon: <FiGrid />,
    title: 'Geometri',
    desc: 'Luas & keliling bangun datar, volume bangun ruang.',
    color: 'rgba(241, 250, 140, 0.15)',
    iconColor: '#f1fa8c'
  },
  {
    path: '/persentase',
    icon: <FiPercent />,
    title: 'Persentase',
    desc: 'Hitung persentase, diskon, kenaikan, dan perbandingan.',
    color: 'rgba(192, 132, 252, 0.15)',
    iconColor: '#c084fc'
  },
  {
    path: '/p3ap2kb',
    icon: <FiUsers />,
    title: 'P3AP2KB',
    desc: 'TFR, ASFR, mCPR, CPR, unmet need, dan indikator KB lainnya.',
    color: 'rgba(80, 250, 123, 0.12)',
    iconColor: '#50fa7b'
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header fade-in-up">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Pilih kalkulator yang ingin kamu gunakan
        </p>
      </div>

      <div className="home-grid">
        {features.map((f, i) => (
          <div
            key={f.path}
            className={`home-card fade-in-up fade-in-up-delay-${(i % 4) + 1}`}
            onClick={() => navigate(f.path)}
          >
            <div 
              className="home-card-icon" 
              style={{ background: f.color, color: f.iconColor }}
            >
              {f.icon}
            </div>
            <div className="home-card-title">{f.title}</div>
            <div className="home-card-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
