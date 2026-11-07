import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: false,
})
export class RestaurantDetailPage implements OnInit {
 private restaurant: restaurant ={id:'',title:'',imageURL:'',comments:[]}
  constructor(private activatedRouted: ActivatedRoute, private restaurantService:RestaurantService) { }

  ngOnInit() {
    this.activatedRouted.paramMap.subscribe(paraMap=>{
      const recipeId = paraMap.get('restaurantID')
      this.restaurant = this.restaurantService.getRestaurant(recipeId)
    })
  }

}
