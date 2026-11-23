// Datos de ejemplo que consume la API de cursos.
let infoCursos = { 
    // Cursos relacionados con programación.
    "programacion": 
    [ { id: 1, titulo: 'Aprende Python', lenguaje: 'Python', vistas: 15000, nivel: 'básico' }, 
    { id: 2, titulo: 'Python Intermedio', lenguaje: 'Python', vistas: 13553, nivel: 'intermedio' },
     { id: 3, titulo: 'Aprende JavaScript', lenguaje: 'javascript', vistas: 102223, nivel: 'básico' } 
    ], 
    // Cursos relacionados con matemáticas.
    'matematicas': 
    [ { id: 1, titulo: 'Aprende Cálculo', tema: 'calculo', vistas: 12427, nivel: 'básico' },
        { id: 2, titulo: 'Aprende Álgebra', tema: 'álgebra', vistas: 15722, nivel: 'intermedio' } ] }
        
// Exporta los datos para que puedan importarse desde otros módulos.
        module.exports.infoCursos =infoCursos;