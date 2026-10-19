# Ejemplos de Python: sesiones 3 y 4

Material basado exclusivamente en `Presentaciones_de_clase/Diapositiva - Sesion 03.md` y `Diapositiva - Sesion 04.md`. La numeración `dNN` corresponde a las diapositivas de esos guiones. Los PDF de Odoo de la misma carpeta tienen otros contenidos.

Requieren **Python 3.13 o superior** y únicamente la biblioteca estándar. Las funciones, métodos, atributos y colecciones tienen tipos concretos. Se utilizan `TypedDict`, `Protocol`, `Self`, `Literal[False]` y `typing.override` donde corresponde, sin `Any` ni diccionarios sin parametrizar.

Cada sesión contiene `ejemplos/` para explicar en clase, `alumnado/` para repartir el mini-reto y `docente/` para mostrar la solución. Distribuye al alumnado la carpeta de ejemplos y la base de su reto. Conserva las soluciones docentes por separado.

## Ejecución

Desde la raíz del proyecto, por ejemplo:

```powershell
python ejercicios/python_sesiones_03_04/sesion_03/ejemplos/d07_protocol.py
python ejercicios/python_sesiones_03_04/sesion_04/ejemplos/d14_ensamblado_final.py
python ejercicios/python_sesiones_03_04/sesion_03/docente/d16_transacciones_solucion.py
python ejercicios/python_sesiones_03_04/sesion_04/docente/d16_nomina_solucion.py
```

También puedes abrir y ejecutar cada archivo en el IDE. Algunos ejemplos importan contratos de otros archivos de su propia carpeta: conserva juntos todos los archivos de `ejemplos/`. No hace falta ejecutar los anteriores primero. Todas las operaciones de base de datos se simulan con diccionarios en memoria o mensajes por consola, sin conexiones reales. Los ejemplos específicos de ficheros usan archivos temporales y los limpian al terminar.

## Sesión 3: contratos y gestores de contexto

| Diapositiva | Archivo dentro de `sesion_03/` | Qué explicar |
| --- | --- | --- |
| 3 | `ejemplos/d03_abstraccion.py` | Base abstracta, subclase incompleta y clase concreta |
| 4 | `ejemplos/d04_clase_abstracta.py` | Contrato del repositorio, `TypedDict` y resultado opcional |
| 5 | `ejemplos/d05_implementacion_concreta.py` | Implementación en memoria, `override`, guardado, búsqueda y ausencia |
| 6 | `ejemplos/d06_tipado_estructural.py` | Clases compatibles sin heredar del protocolo |
| 7 | `ejemplos/d07_protocol.py` | `Imprimible` y un consumidor desacoplado |
| 8 | `ejemplos/d08_abc_vs_protocol.py` | Herencia nominal frente a compatibilidad estructural |
| 9 | `ejemplos/d09_fuga_de_recursos.py` | Un fallo evita el cierre manual, con limpieza al terminar la demo |
| 10 | `ejemplos/d10_with.py` | Cierre automático ante una excepción |
| 11 | `ejemplos/d11_protocolo_context_manager.py` | Orden de `__enter__`, cuerpo y `__exit__`, firmas completas |
| 12 | `ejemplos/d12_transacciones.py` | BEGIN, COMMIT y ROLLBACK simulados y propagación del error |
| 13 | `ejemplos/d13_contextmanager.py` | Generador con un `yield` y limpieza en `finally` |
| 14 | `ejemplos/d14_almacen_transaccion.py` | Contrato de stock y transacciones simuladas con copia del estado |
| 15 | `alumnado/d15_transacciones_base.py` | Mini-reto `GestorConexionERP`: firmas y TODO para completar |
| 16 | `docente/d16_transacciones_solucion.py` | Solución del mini-reto, cierre normal y tras excepción |

Las diapositivas 1 y 2 son portada y hoja de ruta, sin ejemplo adicional.

En la diapositiva 14 se reserva stock de 10 a 5 y se confirma. La siguiente transacción reserva 2 y después falla al reservar 99: el rollback deja el stock en 5, deshaciendo también la reserva de 2.

La base del reto conserva deliberadamente `NotImplementedError`: no funcionará hasta completar los TODO. La demostración ya incluye los escenarios normal y con excepción. La solución propaga el error y lo captura fuera del `with`.

## Sesión 4: principios SOLID

| Diapositiva | Archivo dentro de `sesion_04/` | Qué explicar |
| --- | --- | --- |
| 3 | `ejemplos/d03_servicio_monolitico.py` | Antipatrón: persistencia, cálculo, documento y correo mezclados |
| 5 | `ejemplos/d05_responsabilidad_unica.py` | Separación de cálculo, exportación y almacenamiento |
| 6 | `ejemplos/d06_calculo_puro.py` | `dataclass` inmutable, cálculo puro y base negativa |
| 7 | `ejemplos/d07_descuentos_condicionales.py` | Condicionales que deben cambiar al añadir descuentos |
| 8 | `ejemplos/d08_estrategias_descuento.py` | Nuevas estrategias sin cambiar la función consumidora |
| 9 | `ejemplos/d09_sustitucion_liskov.py` | Violación de LSP y corrección de la factura exenta |
| 10 | `ejemplos/d10_interfaces_segregadas.py` | Protocolos pequeños para carga y guardado |
| 11 | `ejemplos/d11_inversion_dependencias.py` | Contrato compartido y repositorio en memoria |
| 12 | `ejemplos/d12_inyeccion_constructor.py` | Inyección por constructor y dos repositorios intercambiables |
| 14 | `ejemplos/d14_ensamblado_final.py` | Composición final y lectura del repositorio en memoria |
| 15 | `alumnado/d15_nomina_base.py` | Código monolítico original, instrucciones y esqueletos tipados |
| 16 | `docente/d16_nomina_solucion.py` | Solución SRP y DIP, con repositorios en memoria y consola |

Las diapositivas 1 y 2 son portada y hoja de ruta. La 4 presenta el acrónimo y la 13 resume su impacto: puedes apoyarte en los ejemplos de los principios respectivos, sin añadir otro programa que repita el contenido.

La base del reto de nóminas ejecuta el código monolítico original y deja pendiente construir el flujo refactorizado. El caso de referencia es Ana, base 2000.0, retención didáctica del 19 % y neto 1620.0. La solución permite sustituir el repositorio sin modificar el servicio.

## Precisiones al explicar los guiones

- `ABC` impide instanciar clases con métodos abstractos pendientes. No valida por sí sola las firmas ni el comportamiento de sus implementaciones.
- `Protocol` describe la compatibilidad estructural para el analizador. Con `@runtime_checkable`, `isinstance` comprueba la presencia de miembros, pero no sus firmas. Un protocolo también puede incluir métodos concretos reutilizables por herencia explícita.
- `__exit__` se ejecuta al abandonar el cuerpo si `__enter__` terminó correctamente. Si `__enter__` falla, debe encargarse de su propia limpieza. Devolver `False` o `None` propaga la excepción. Devolver `True` la suprime, lo cual se evita en estas transacciones.
- El gestor de stock simula la transacción guardando una copia del diccionario al entrar. Si hay un error, restaura la copia; si todo va bien, conserva los cambios. Es una demostración didáctica sin un motor de base de datos.
- Los bytes de los ejemplos de PDF y los mensajes de correo son simulaciones. No se genera un PDF válido ni se envía correo. Ninguna cadena SQL se ejecuta: cuando aparece, solo se imprime para explicar la operación.
- Los importes `float` y las tasas fijas reproducen el contenido didáctico de las diapositivas. La nómina es una simplificación del ejercicio. Los tipos no garantizan el contrato de comportamiento de LSP.

## Comprobación del tipado

Los 22 ejemplos y las 2 soluciones se han ejecutado con Python 3.13.2. Tras sustituir las conexiones por simulaciones, se han vuelto a ejecutar los tres ejemplos modificados, comprobando el guardado y la consulta en memoria y el rollback del stock. Las 2 bases mantienen los TODO pendientes para el alumnado.

`mypy.ini` configura el modo estricto para Python 3.13. Mypy es opcional para el alumnado y no es una dependencia de ejecución de los ejemplos. Si ya lo tienes instalado, desde la raíz del proyecto:

```powershell
$env:MYPYPATH = ((Resolve-Path 'ejercicios/python_sesiones_03_04/sesion_03/ejemplos').Path + ';' + (Resolve-Path 'ejercicios/python_sesiones_03_04/sesion_04/ejemplos').Path)
python -m mypy --config-file ejercicios/python_sesiones_03_04/mypy.ini ejercicios/python_sesiones_03_04
Remove-Item Env:MYPYPATH
```
