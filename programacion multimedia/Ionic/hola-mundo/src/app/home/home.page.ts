import { Component, signal } from '@angular/core';
import { Photos } from './photos';
import { photo } from './photo.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  photos= signal<photo[]>([])

  titulo:string ="Listado de Imágenes"
  constructor(private photosServices:Photos) {}
 ngOnInit(){
   this.photosServices.getPhotos().subscribe(data=>{
    console.log(data)
    this.photos.set(data as [])
  })
 }
 ionViewDidEnter(){
 }
}
