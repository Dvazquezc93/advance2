import  { useEffect, useState } from 'react'

   
    
function Click() {
     const [clicks, setClicks] = useState(0)
    useEffect(() => {
      document.title=`Clicks:${clicks}`
    }, [clicks])
  return (
    <div><h1>Mira tambien la pestaña del título</h1>
     <button onClick={()=>{setClicks(clicks+1)}}>+1</button>
    <p>Clicks: {clicks}</p>
    </div>
  )
}

export default Click