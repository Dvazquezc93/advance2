import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saluda',
  templateUrl: './saluda.component.html',
  styleUrls: ['./saluda.component.scss'],
  standalone: false,
})
export class SaludaComponent  implements OnInit {
texto:string =""
@Input('nombre') nombre:string|undefined;
  constructor() { }

  ngOnInit() {
    this.texto ="hola "+this.nombre
  }

}
