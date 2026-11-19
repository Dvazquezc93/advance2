CREATE TABLE ventas (
  fecha date,
  categoria text,
  producto text,
  importe numeric(8,2),
  unidades integer
);
INSERT INTO ventas (fecha, categoria, producto, importe, unidades) VALUES
  ('2026-01-05', 'Electrónica', 'Auriculares', 45.90, 3),
  ('2026-01-12', 'Hogar', 'Lámpara LED', 22.50, 5),
  ('2026-01-18', 'Electrónica', 'Cargador USB-C', 15.00, 8),
  ('2026-01-22', 'Deporte', 'Botella térmica', 18.90, 4),
  ('2026-02-02', 'Hogar', 'Set de toallas', 34.00, 2),
  ('2026-02-09', 'Electrónica', 'Ratón inalámbrico', 19.99, 6),
  ('2026-02-14', 'Deporte', 'Esterilla yoga', 24.90, 3),
  ('2026-02-21', 'Hogar', 'Lámpara LED', 22.50, 7),
  ('2026-03-03', 'Electrónica', 'Auriculares', 45.90, 5),
  ('2026-03-10', 'Deporte', 'Mancuernas 2kg', 29.90, 2),
  ('2026-03-15', 'Hogar', 'Set de toallas', 34.00, 4),
  ('2026-03-25', 'Electrónica', 'Cargador USB-C', 15.00, 10),
  ('2026-04-02', 'Deporte', 'Botella térmica', 18.90, 6),
  ('2026-04-08', 'Electrónica', 'Ratón inalámbrico', 19.99, 3),
  ('2026-04-19', 'Hogar', 'Lámpara LED', 22.50, 4),
  ('2026-04-27', 'Deporte', 'Esterilla yoga', 24.90, 5);
-- Un año de ventas (3.000 filas), generado sin azar: sale siempre lo mismo.
-- Hay más unidades en noviembre y diciembre, y el deporte repunta en enero y septiembre.
CREATE TABLE ventas_2026 AS
WITH productos (n, categoria, producto, precio) AS (VALUES
  (0, 'Electrónica', 'Auriculares', 45.90), (1, 'Electrónica', 'Cargador USB-C', 15.00),
  (2, 'Electrónica', 'Ratón inalámbrico', 19.99), (3, 'Electrónica', 'Teclado', 39.90),
  (4, 'Hogar', 'Lámpara LED', 22.50), (5, 'Hogar', 'Set de toallas', 34.00),
  (6, 'Hogar', 'Cafetera', 59.90), (7, 'Hogar', 'Cojín', 12.50),
  (8, 'Deporte', 'Botella térmica', 18.90), (9, 'Deporte', 'Esterilla yoga', 24.90),
  (10, 'Deporte', 'Mancuernas 2kg', 29.90), (11, 'Deporte', 'Comba', 9.90)),
base AS (
  SELECT i, DATE '2026-01-01' + ((i * 37) % 365) AS fecha, p.categoria, p.producto, p.precio
  FROM generate_series(1, 3000) AS i
  JOIN productos p ON p.n = (i * 5) % 12)
SELECT i AS id,
       fecha,
       categoria,
       producto,
       precio::numeric(8,2) AS importe,
       1 + ((i * 11) % 9)
         + CASE WHEN EXTRACT(MONTH FROM fecha) IN (11, 12) THEN 4
                WHEN categoria = 'Deporte' AND EXTRACT(MONTH FROM fecha) IN (1, 9) THEN 3
                ELSE 0 END AS unidades,
       (ARRAY['Sevilla', 'Madrid', 'Valencia', 'Bilbao', 'Málaga'])[1 + (i * 13) % 5] AS ciudad
FROM base;