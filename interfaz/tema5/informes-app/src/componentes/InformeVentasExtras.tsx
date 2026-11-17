import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import datos from '../datos/datos.json';
import type { Venta } from '../datos/tipos';



function totalPorFecha(lista: Venta[]) {
  const totales = new Map<string, number>();
  for (const v of lista) {
    totales.set(v.fecha, (totales.get(v.fecha) ?? 0) + v.importe * v.unidades);
  }
  return Array.from(totales, ([fecha, total]) => ({ fecha, total: Number(total.toFixed(2)) }));
}

function unidadesPorMes(lista: Venta[]) {
  const totales = new Map<string, number>();
  for (const v of lista) {
    const mes = v.fecha.slice(0, 7);
    totales.set(mes, (totales.get(mes) ?? 0) + v.unidades);
  }
  return Array.from(totales, ([mes, total]) => ({ mes, total }));
}

function mesMayorVentaPorCategoria(lista: Venta[]) {
  const porCategoriaYMes = new Map<string, Map<string, number>>();
  for (const v of lista) {
    const mes = v.fecha.slice(0, 7);
    if (!porCategoriaYMes.has(v.categoria)) {
      porCategoriaYMes.set(v.categoria, new Map());
    }
    const meses = porCategoriaYMes.get(v.categoria)!;
    meses.set(mes, (meses.get(mes) ?? 0) + v.importe * v.unidades);
  }

  return Array.from(porCategoriaYMes, ([categoria, meses]) => {
    let mejorMes = "";
    let maxTotal = -1;
    for (const [mes, total] of meses) {
      if (total > maxTotal) {
        maxTotal = total;
        mejorMes = mes;
      }
    }
    return {
      etiqueta: `${categoria} (${mejorMes})`,
      total: Number(maxTotal.toFixed(2)),
    };
  });
}

export default function InformeTemporalVentas() {
  const resumen3 = totalPorFecha(datos);
  const resumen4 = unidadesPorMes(datos);
  const resumen5 = mesMayorVentaPorCategoria(datos);

  return (
    <section>
      <h2>Ventas por fecha</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={resumen3}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" interval={0} />
          <YAxis />
          <Tooltip formatter={(valor: any) => `${valor.toFixed(2)} €`} />
          <Line type="monotone" dataKey="total" stroke="#2ea838" fill="#000000" isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>

      <h2>Unidades compradas por mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={resumen4}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" interval={0} />
          <YAxis />
          <Tooltip formatter={(valor: any) => `${valor} uds.`} />
          <Area type="monotone" dataKey="total" stroke="#edeef0" fill="#9203cf" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>

      <h2>Mes de mayor venta por categoría</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip formatter={(valor: any) => `${valor.toFixed(2)} €`} />
          <Pie data={resumen5} dataKey="total" nameKey="etiqueta" fill="#38b422" isAnimationActive={false} label />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}