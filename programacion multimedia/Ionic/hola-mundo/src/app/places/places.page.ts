import { Component, OnInit } from '@angular/core';
import { Places } from './places';
import { place} from './place.model'


@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
  standalone: false,
})
export class PlacesPage implements OnInit {
  //titulo de mi página
  titulo:string = "LUGARES DEL MUNDO"
  //variable de lugares del mundo
  places:place[]=[]
  
  constructor(private placeServices: Places) { }
//se lanza al abir la pagina
  ngOnInit() {
    this.places =this.placeServices.getPlaces()
  }

}
