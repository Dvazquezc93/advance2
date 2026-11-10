import { useRef } from "react"


function Comentario() {
    const comentarioRef = useRef<HTMLTextAreaElement>(null)
  return (
    <div> 
        <button onClick={()=>{comentarioRef.current?.focus()}}>Escribir un comentario</button>
        <textarea ref={comentarioRef} rows={3} cols={36} placeholder='Tu comentario'></textarea>
        </div>
  )
}

export default Comentario