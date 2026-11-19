import ExcelJS from 'exceljs'
import { readFile } from 'node:fs/promises'

// 1. Los datos: de ventas.json a una lista de objetos
const ventas = JSON.parse(await readFile('datos/ventas.json', 'utf8'))

// 2. El libro y la hoja «Ventas»
const libro = new ExcelJS.Workbook()
const hoja = libro.addWorksheet('Ventas')
hoja.columns = [
  { header: 'Fecha', key: 'fecha', width: 12 },
  { header: 'Categoría', key: 'categoria', width: 14 },
  { header: 'Producto', key: 'producto', width: 22 },
  { header: 'Importe', key: 'importe', width: 12, style: { numFmt: '#,##0.00' } },
  { header: 'Unidades', key: 'unidades', width: 10 },
  { header: 'Subtotal', key: 'subtotal', width: 14, style: { numFmt: '#,##0.00 "€"' } },
]

// 3. Una fila por venta; el subtotal es una fórmula de Excel
ventas.forEach((v, i) => {
  const fila = i + 2
  hoja.addRow({ ...v, subtotal: { formula: `D${fila}*E${fila}` } })
})

// 4. Cabecera con estilo, filtro y fila fija
const cabecera = hoja.getRow(1)
cabecera.font = { bold: true }
cabecera.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8E8E8' } }
hoja.autoFilter = 'A1:F1'
hoja.views = [{ state: 'frozen', ySplit: 1 }]

// 5. Fila de totales
const ultima = ventas.length + 1
const total = hoja.addRow({ fecha: 'Total' })
total.getCell('E').value = { formula: `SUM(E2:E${ultima})` }
total.getCell('F').value = { formula: `SUM(F2:F${ultima})` }
total.getCell('F').numFmt = '#,##0.00 "€"'
total.font = { bold: true }

// 6. Segunda hoja «Resumen»: total por categoría con SUMIF
const resumen = libro.addWorksheet('Resumen')
resumen.columns = [
  { header: 'Categoría', key: 'categoria', width: 16 },
  { header: 'Total', key: 'total', width: 14, style: { numFmt: '#,##0.00 "€"' } },
]
resumen.getRow(1).font = { bold: true }
resumen.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8E8E8' } }
const categorias = [...new Set(ventas.map((v) => v.categoria))]
categorias.forEach((c, i) => {
  resumen.addRow({
    categoria: c,
    total: { formula: `SUMIF(Ventas!B2:B${ultima},A${i + 2},Ventas!F2:F${ultima})` },
  })
})

await libro.xlsx.writeFile('ventas.xlsx')
console.log(`Informe generado: ventas.xlsx (${ventas.length} ventas)`)