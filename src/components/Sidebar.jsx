import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiHash, FiZap, FiTriangle, FiRepeat, 
  FiPercent, FiBarChart2, FiGrid, FiUsers
} from 'react-icons/fi';

const navItems = [
  {
    section: 'Menu',
    items: [
      { path: '/', label: 'Dashboard', icon: <FiHome /> },
    ]
  },
  {
    section: 'Kalkulator',
    items: [
      { path: '/umum', label: 'Kalkulator Umum', icon: <FiHash /> },
      { path: '/fisika', label: 'Fisika', icon: <FiZap /> },
      { path: '/matematika', label: 'Matematika', icon: <FiTriangle /> },
      { path: '/konversi', label: 'Konversi Satuan', icon: <FiRepeat /> },
    ]
  },
  {
    section: 'Tools',
    items: [
      { path: '/statistik', label: 'Statistik', icon: <FiBarChart2 /> },
      { path: '/geometri', label: 'Geometri', icon: <FiGrid /> },
      { path: '/persentase', label: 'Persentase', icon: <FiPercent /> },
      { path: '/p3ap2kb', label: 'P3AP2KB', icon: <FiUsers /> },
    ]
  }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">K</div>
          <div className="sidebar-logo-text">
            <h1>Kalkulator</h1>
            <span>Scientific Calculator</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section} className="sidebar-section">
            <div className="sidebar-section-title">{section.section}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Kalkulator v1.0</p>
      </div>
    </aside>
  );
}
