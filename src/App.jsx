import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GeneralCalc from './pages/GeneralCalc';
import PhysicsCalc from './pages/PhysicsCalc';
import MathCalc from './pages/MathCalc';
import ConversionCalc from './pages/ConversionCalc';
import StatisticsCalc from './pages/StatisticsCalc';
import GeometryCalc from './pages/GeometryCalc';
import PercentageCalc from './pages/PercentageCalc';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'umum', element: <GeneralCalc /> },
      { path: 'fisika', element: <PhysicsCalc /> },
      { path: 'matematika', element: <MathCalc /> },
      { path: 'konversi', element: <ConversionCalc /> },
      { path: 'statistik', element: <StatisticsCalc /> },
      { path: 'geometri', element: <GeometryCalc /> },
      { path: 'persentase', element: <PercentageCalc /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
