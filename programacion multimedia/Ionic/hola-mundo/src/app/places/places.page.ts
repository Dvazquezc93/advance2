import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
  standalone: false,
})
export class PlacesPage implements OnInit {
  //titulo de mi página
  titulo: string = "LUGARES DEL MUNDO"
  //Array de lugares mockeado
  places = [{
    id: '1',
    title: 'Torre Eiffel',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs82eBcP9ttK5yoscHgwD1PsImOi_uRI6szQ&usqp=CAU',
    comments: ['Maravillosa torre, preciosa', 'una belleza, impresionante altura']
  },
  {
    id: '2',
    title: 'Estatua de la libertad',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCan76xKnQStQwYTKyi8EUl0vXpuiefc-6Ow&usqp=CAU',
    comments: ['Increibles las vistas desde la bahía', 'Las vistas desde arriba son una pasada']
  }
  ]
  constructor() { }

  ngOnInit() {
  }

}
