import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
  standalone: false,
})
export class RestaurantPage implements OnInit {
  private titulo ="Restaurantes de Sevilla"
  private restaurants: restaurant[] =[]

  constructor(private restaurantsService :RestaurantService, private router:Router
  ) { }

  ngOnInit() {
    this.restaurants =this.restaurantsService.getRestaurants()
  }
  ionViewWillEnter(){
    this.restaurants = this.restaurantsService.getRestaurants()
  }
  newRestaurant(){
    this.router.navigate(['/restaurants/restaurant-add'])
  }
}
