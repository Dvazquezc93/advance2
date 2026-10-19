let infoCurso = {
   "titulo": "Aprende Node.js",
    "numVistas": 45642 ,
    "numLikes": 21123,
    "temas":[
        "JavaScript",
        "Node.js"
    ],
    "esPublico":true
}
let  infoCursoJSON =JSON.stringify(infoCurso);
console.log(infoCursoJSON);
console.log(typeof(infoCursoJSON));
let infoCursoObjeto =JSON.parse(infoCursoJSON);
console.log(infoCursoObjeto);
console.log(typeof(infoCursoObjeto));