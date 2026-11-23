import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
  standalone: false,
})
export class CabeceraComponent  implements OnInit {
  texto:string =""
 @Input("nombre") nombre:string|undefined
  @Input("apellidos") apellidos:string|undefined
  constructor() { }

  ngOnInit() {
    this.texto =this.nombre+ " "+this.apellidos
  }

}
