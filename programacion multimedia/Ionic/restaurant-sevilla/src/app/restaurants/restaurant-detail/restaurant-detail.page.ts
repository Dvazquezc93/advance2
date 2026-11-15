import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { restaurant } from '../restaurant.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/lazy';
@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  standalone: false,
})
export class RestaurantDetailPage implements OnInit {
 private restaurant: restaurant ={id:'',title:'',imageURL:'',comments:[]}
  constructor(private activatedRouted: ActivatedRoute, 
    private restaurantService:RestaurantService, 
    private router:Router,
    private alertCtrl:AlertController) { }

  ngOnInit() {
    this.activatedRouted.paramMap.subscribe(paraMap=>{
      const recipeId = paraMap.get('restaurantID')
      this.restaurant = this.restaurantService.getRestaurant(recipeId)
    })
  }
async deletePlace() {
  const element = await this.alertCtrl.create(
     {
        header:'¿Estas seguro de eliminar este restaurante',
        message: 'ten cuidado',
        buttons:[{
          text:'Cancelar',
          role:'cancel'
        },{
          text:'Borrar',
          handler:()=>{
           this.restaurantService.deleteRestaurant(this.restaurant.id);
            this.router.navigate(['/restaurants'])
          }
        }
      ]
    }
  )
  await element.present()
}
}
