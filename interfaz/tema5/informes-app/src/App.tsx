import InformeVentas from './componentes/InformeVentas';
import './App.css';
import InformeVentasExtras from './componentes/InformeVentasExtras';

export default function App() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Informe de ventas</h1>
      <InformeVentas />
      <InformeVentasExtras></InformeVentasExtras>
    </main>
  );
}