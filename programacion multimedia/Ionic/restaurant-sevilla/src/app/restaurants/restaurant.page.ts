import { Component, OnInit } from '@angular/core';

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

  constructor(private restaurantsService :RestaurantService
  ) { }

  ngOnInit() {
    this.restaurants =this.restaurantsService.getRestaurants()
  }

}
