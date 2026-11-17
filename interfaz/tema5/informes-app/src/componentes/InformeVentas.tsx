import { useMemo, useState } from "react";

export default function InformeVentas() {
  const [categoria, setCategoria] = useState<string>('Todas');
  const categorias = useMemo(() => ['Todas', ...new Set(datos.map((v) => v.categoria))], []);

  const filtradas = useMemo(
    () => (categoria === 'Todas' ? datos : datos.filter((v) => v.categoria === categoria)),
    [categoria],
  );
  // ...
  return (
    <section>
      <h2>Filtro</h2>
      <label>
        Categoría:{' '}
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>