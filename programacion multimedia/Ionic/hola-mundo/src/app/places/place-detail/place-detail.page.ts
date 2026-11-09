import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Places } from '../places';
import{place} from '../place.model'
import { Title } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular/lazy';




@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: false,
})
export class PlaceDetailPage implements OnInit {
  place: place ={id:'',title:'',imageURL:'', comments:[]};
    
  constructor(private activatedRouted: ActivatedRoute,
    private Places: Places,
     private router:Router,
      private alertCtrl : AlertController) { }

  ngOnInit() {
    this.activatedRouted.paramMap.subscribe(paramMap=>{
      const recipeId = paramMap.get('placeID');
      console.log("Id lugar pulsado: "+recipeId);
      this.place =this.Places.getplace(recipeId);
      console.log('Objeto recibido: '+ JSON.stringify(this.place))
    })
   
  }
 async deletePlace() {
    const element = await this.alertCtrl.create(
      {
        header:'¿Estas seguro de eliminar este lugar?',
        message: 'ten cuidado',
        buttons:[{
          text:'Cancelar',
          role:'cancel'
        },{
          text:'Borrar',
          handler:()=>{
           this.Places.deletePlace(this.place.id);
            this.router.navigate(['/places'])
          }
        }
      ]
    }
  )
  await element.present();
  
        
      
    
  
   

}
}
