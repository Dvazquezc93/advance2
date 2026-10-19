import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Places } from '../places';
import{place} from '../place.model'
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: false,
})
export class PlaceDetailPage implements OnInit {
  place: place ={id:'',title:'',imageURL:'', comments:[]};
    
  constructor(private activatedRouted: ActivatedRoute,private Places: Places) { }

  ngOnInit() {
    this.activatedRouted.paramMap.subscribe(paramMap=>{const recipeId = paramMap.get('placeID');
      console.log("Id lugar pulsado: "+recipeId);
      this.place =this.Places.getplace(recipeId);
      console.log('Objeto recibido: '+ this.place)
    })
  }

}
