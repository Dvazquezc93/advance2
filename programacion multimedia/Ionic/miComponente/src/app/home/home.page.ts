import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  nombre:string ="Daniel"
  apellidos:string ="Vázquez Chinchilla"
  usuarios: any=[
    {nombre:'Eduardo',
      edad:37
    },
    {nombre:'Pedro',
      edad:25
    },
    {nombre:'Francisco',
      edad:23
    },
    {nombre:'Carmen',
      edad:20
    },
  ]
  constructor() {}

}
