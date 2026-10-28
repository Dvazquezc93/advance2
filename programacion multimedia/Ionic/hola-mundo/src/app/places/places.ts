import { Service } from '@angular/core';
import { place} from './place.model'




@Service()
export class Places {
   private places: place[] = [{
    id: '1',
    title: 'Torre Eiffel',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs82eBcP9ttK5yoscHgwD1PsImOi_uRI6szQ&usqp=CAU',
    comments: ['Maravillosa torre, preciosa', 'una belleza, impresionante altura']
  },
  {
    id: '2',
    title: 'Estatua de la libertad',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCan76xKnQStQwYTKyi8EUl0vXpuiefc-6Ow&usqp=CAU',
    comments: ['Increibles las vistas desde la bahía', 'Las vistas desde arriba son una pasada']},
  {id: '3',
    title: 'Giralda de Sevilla',
    imageURL: 'https://th.bing.com/th/id/OIP.i63CHu7Am0_mzeRShJsRJwHaGB?w=218&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
    comments: []}]
    constructor(){ }

    getPlaces() { 
      return[...this.places]}

    getplace(placeId:String|null) { return{...this.places.find(place=> {return place.id===placeId})}}

    adPlace(title:string, imageURL:string) {
      this.places.push({
        title,
        imageURL,
        comments:[],
        id:(this.places.length+1).toString()
      })
    }

    deletePlace(placeId:String|undefined) {
     this.places= this.places.filter(place=> {return place.id!=placeId})
    }
}
