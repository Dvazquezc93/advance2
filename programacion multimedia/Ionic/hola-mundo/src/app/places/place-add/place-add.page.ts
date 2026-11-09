import { Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular/lazy';
import { Places } from '../places';
import { Router } from '@angular/router';
@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.page.html',
  styleUrls: ['./place-add.page.scss'],
  standalone: false,
})
export class PlaceAddPage implements OnInit {
  titulo:string="Añadir lugar"
  constructor(private places:Places,
    private router:Router){
  }
  ngOnInit() {
  }
saveNewPlace(title:IonInput,
  image:IonInput){
    alert(title.value)
  this.places.addPlace(title.value as string,image.value as string)
  this.router.navigate(['/places'])
}
}
