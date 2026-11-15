import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular/lazy';
@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.page.html',
  styleUrls: ['./restaurant-add.page.scss'],
  standalone: false,
})
export class RestaurantAddPage implements OnInit {
 titulo:string ="Añadir restaurante"
  constructor(private restaurantService:RestaurantService,
    private router:Router
  ) { }

  ngOnInit() {
  }
saveNewRestaurant(title:IonInput,image:IonInput){
   this.restaurantService.addRestaurant(title.value as string, image.value as string)
   this.router.navigate(['/restaurants'])
}
}
