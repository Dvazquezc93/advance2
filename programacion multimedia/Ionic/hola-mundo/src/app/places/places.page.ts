import { Component, OnInit, signal } from '@angular/core';
import { Places } from './places';
import { place} from './place.model'
import { Router } from '@angular/router';


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
  places=signal<place[]>([])
  
  constructor(private placeServices: Places,
    private router:Router
  ) { }
//se lanza al abir la pagina
  ngOnInit() {
    this.places.set(this.placeServices.getPlaces())  
  }
  //método que se ejecuta cada vez que se abre esta pagina
  ionVieWillEnter(){
this.places.set(this.placeServices.getPlaces()) 
}
newPlace(){

this.router.navigate(['/places/place-add'])
}
goToHome(){
  this.router.navigate(['/home'])
}
}
