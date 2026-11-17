import json

import xlsxwriter

# 1. Los datos: de ventas.json a una lista de diccionarios
with open("datos/ventas.json", encoding="utf-8") as f:
    ventas = json.load(f)

# 2. El libro, la hoja «Ventas» y los formatos
libro = xlsxwriter.Workbook("ventas.xlsx")
hoja = libro.add_worksheet("Ventas")
negrita_gris = libro.add_format({"bold": True, "bg_color": "#E8E8E8"})
numero = libro.add_format({"num_format": "#,##0.00"})
euros = libro.add_format({"num_format": '#,##0.00 "€"'})
euros_negrita = libro.add_format({"num_format": '#,##0.00 "€"', "bold": True})
negrita = libro.add_format({"bold": True})

# 3. Cabecera, anchos, filtro y fila fija
cabecera = ["Fecha", "Categoría", "Producto", "Importe", "Unidades", "Subtotal"]
hoja.write_row(0, 0, cabecera, negrita_gris)
for columna, ancho in enumerate([12, 14, 22, 12, 10, 14]):
    hoja.set_column(columna, columna, ancho)
hoja.autofilter(0, 0, len(ventas), 5)
hoja.freeze_panes(1, 0)

# 4. Una fila por venta; el subtotal es una fórmula de Excel
for i, v in enumerate(ventas, start=1):
    hoja.write(i, 0, v["fecha"])
    hoja.write(i, 1, v["categoria"])
    hoja.write(i, 2, v["producto"])
    hoja.write(i, 3, v["importe"], numero)
    hoja.write(i, 4, v["unidades"])
    subtotal = round(v["importe"] * v["unidades"], 2)
    hoja.write_formula(i, 5, f"=D{i + 1}*E{i + 1}", euros, subtotal)

# 5. Fila de totales
ultima = len(ventas) + 1
hoja.write(ultima, 0, "Total", negrita)
total_unidades = sum(v["unidades"] for v in ventas)
total_euros = round(sum(v["importe"] * v["unidades"] for v in ventas), 2)
hoja.write_formula(ultima, 4, f"=SUM(E2:E{ultima})", negrita, total_unidades)
hoja.write_formula(ultima, 5, f"=SUM(F2:F{ultima})", euros_negrita, total_euros)

# 6. Segunda hoja «Resumen»: total por categoría con SUMIF
resumen = libro.add_worksheet("Resumen")
resumen.write_row(0, 0, ["Categoría", "Total"], negrita_gris)
resumen.set_column(0, 0, 16)
resumen.set_column(1, 1, 14)
categorias = list(dict.fromkeys(v["categoria"] for v in ventas))
for i, c in enumerate(categorias, start=1):
    resumen.write(i, 0, c)
    total_categoria = round(sum(v["importe"] * v["unidades"] for v in ventas if v["categoria"] == c), 2)
    resumen.write_formula(i, 1, f"=SUMIF(Ventas!B2:B{ultima},A{i + 1},Ventas!F2:F{ultima})", euros, total_categoria)

libro.close()
print(f"Informe generado: ventas.xlsx ({len(ventas)} ventas)")