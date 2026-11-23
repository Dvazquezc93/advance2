import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaludaComponent } from './saluda/saluda.component';
import { CabeceraComponent } from './cabecera/cabecera.component';


@NgModule({
  declarations: [SaludaComponent,CabeceraComponent],
  imports: [
    CommonModule
  ],
  exports:[CommonModule, SaludaComponent, CabeceraComponent]
})
export class ComponentesModule { }
