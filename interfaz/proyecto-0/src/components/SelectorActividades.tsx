import { useState } from "react"


function SelectorActividades() {
  const [texto, setTexto] = useState('')
  const [nombreF, setNombreF] = useState('')
  const [actividad, setActividad] = useState('')
  const [energia, setEnergia] = useState('bajo')
  const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
  const [tiempo, setTiempo] = useState(0)
    const recoActividad:Record<string, string[]> = {
        Deporte:["Recueda hidratarte","Haz calentamiento"],
        Lectura:["Busca un lugar cómodo","Ajusta la luz"],
        Musica:["Usa auriculares","Prueba géneros nuevos"],
        Cocina:["Lee la receta completa","Ten los ingredientes listos"]
      }
  return (
    <div>
      <h1>Selector de actividades</h1>
      <p>Nombre</p>
      <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTexto(e.target.value) }} placeholder='Tu nombre...'></input>
      <button onClick={() => (setNombreF(texto))}>Guardar</button>
      <button onClick={() => (setNombreF(''))}>reset</button><br></br>
      <p>¿Qué quieres hacer?</p>
      <button onClick={() => { setActividad('Deporte'); setVisible(true); }}>Deporte</button>
      <button onClick={() => { setActividad('Lectura'); setVisible(true); }}>Lectura</button>
      <button onClick={() => { setActividad('Musica'); setVisible(true); }}>Música</button>
      <button onClick={() => { setActividad('Cocina'); setVisible(true); }}>Cocina</button>
      <button onClick={() => { setActividad(''); setVisible(false); }}>Reset</button><br></br>
      {actividad &&
        (<>
          <p>Selecciona el nivel de energia de tu actividad</p>
          <button onClick={() => (setEnergia('Alto'))}>Alto</button>
          <button onClick={() => (setEnergia('Medio'))}>Medio</button>
          <button onClick={() => (setEnergia('Bajo'))}>Bajo</button>
          <p>Nivel energía seleccionado: {energia}</p>
          <strong>Tiempo disponible {tiempo} minutos</strong>
          <input type="range" min={15} max={180} step={15} onChange={(e) => (setTiempo(Number(e.target.value)))} defaultValue={15}></input>
        </>)}
        {nombreF!==''&&(<p>Hola {nombreF}, no tienes actividad recomendada con nivel de energía {energia}</p>)}
        {visible &&<p>Hola {nombreF}, tu actividad recomendada es {actividad} durante {tiempo} minutos al dia con nivel de energía {energia}</p>}
         {!visible2?(<button onClick={() => (setVisible2(true))}>Mostrar Recomendaciones</button>):
         <button onClick={() => (setVisible2(false))}>Ocultar Recomendaciones</button>}
         <br></br>
         {visible2&&actividad!=='Deporte' &&(
            <><strong>Recomendaciones para la práctica de la {actividad} </strong>
            <li>
              <ul>{recoActividad[actividad][0]}</ul>
              <ul>{recoActividad[actividad][1]}</ul>
            </li>
            </>
         )}
         {visible2&&actividad==='Deporte' &&(
            <><strong>Recomendaciones para la práctica del {actividad} </strong>
            <li>
              <ul>{recoActividad[actividad]?.[0]}</ul>
              <ul>{recoActividad[actividad]?.[1]}</ul>
            </li>
            </>
         )}
        


    </div>

  )
}

export default SelectorActividades